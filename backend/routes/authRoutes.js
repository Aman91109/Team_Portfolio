const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Admin = require('../models/Admin');
const { protect } = require('../middleware/authMiddleware');
const mockDb = require('../utils/mockDb');

// @desc    Register first admin (Protected or restricted to empty db)
// @route   POST /api/auth/register
// @access  Public
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (global.useMockDB) {
      const adminExists = mockDb.findOne('Admin');
      if (adminExists) {
        return res.status(400).json({
          success: false,
          error: 'An admin account already exists. Registration locked.',
        });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);

      const admin = mockDb.create('Admin', {
        username,
        email,
        password: hashedPassword,
        role: 'admin',
        isVerified: true,
      });

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return res.status(201).json({
        success: true,
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // Mongoose execution
    const adminExists = await Admin.findOne();
    if (adminExists) {
      return res.status(400).json({
        success: false,
        error: 'An admin account already exists. Registration locked.',
      });
    }

    const admin = await Admin.create({
      username,
      email,
      password,
      isVerified: true,
    });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(201).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Admin login
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (global.useMockDB) {
      const admin = mockDb.findOne('Admin', { email });
      if (!admin) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const isMatch = bcrypt.compareSync(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ success: false, error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
      });

      return res.status(200).json({
        success: true,
        token,
        admin: {
          id: admin._id,
          username: admin.username,
          email: admin.email,
          role: admin.role,
        },
      });
    }

    // Mongoose execution
    const admin = await Admin.findOne({ email }).select('+password');
    if (!admin) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const isMatch = await admin.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE,
    });

    res.status(200).json({
      success: true,
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get current admin profile
// @route   GET /api/auth/profile
// @access  Private
router.get('/profile', protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.user,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Forgot password
// @route   POST /api/auth/forgot-password
// @access  Public
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (global.useMockDB) {
      const admin = mockDb.findOne('Admin', { email });
      if (!admin) {
        return res.status(404).json({ success: false, error: 'Email not found' });
      }

      const resetToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
        expiresIn: '10m',
      });

      mockDb.findByIdAndUpdate('Admin', admin._id, {
        resetPasswordToken: resetToken,
        resetPasswordExpire: Date.now() + 10 * 60 * 1000,
      });

      console.log(`[MOCK EMAIL] Send to: ${email}`);
      console.log(`[MOCK EMAIL] Reset Token Link: http://localhost:3000/admin/reset-password/${resetToken}`);

      return res.status(200).json({
        success: true,
        message: 'Password reset link simulated in backend terminal console.',
        token: resetToken,
      });
    }

    // Mongoose execution
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ success: false, error: 'Email not found' });
    }

    const resetToken = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: '10m',
    });

    admin.resetPasswordToken = resetToken;
    admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
    await admin.save();

    console.log(`[MOCK EMAIL] Send to: ${email}`);
    console.log(`[MOCK EMAIL] Reset Token Link: http://localhost:3000/admin/reset-password/${resetToken}`);

    res.status(200).json({
      success: true,
      message: 'Password reset link simulated in backend terminal console.',
      token: resetToken,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Reset password
// @route   POST /api/auth/reset-password/:token
// @access  Public
router.post('/reset-password/:token', async (req, res) => {
  try {
    const token = req.params.token;

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(400).json({ success: false, error: 'Invalid or expired token' });
    }

    if (global.useMockDB) {
      const admin = mockDb.findById('Admin', decoded.id);
      if (!admin || admin.resetPasswordToken !== token || admin.resetPasswordExpire < Date.now()) {
        return res.status(400).json({ success: false, error: 'Token is invalid or has expired' });
      }

      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      mockDb.findByIdAndUpdate('Admin', admin._id, {
        password: hashedPassword,
        resetPasswordToken: undefined,
        resetPasswordExpire: undefined,
      });

      return res.status(200).json({
        success: true,
        message: 'Password reset successful',
      });
    }

    // Mongoose execution
    const admin = await Admin.findOne({
      _id: decoded.id,
      resetPasswordToken: token,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!admin) {
      return res.status(400).json({ success: false, error: 'Token is invalid or has expired' });
    }

    admin.password = req.body.password;
    admin.resetPasswordToken = undefined;
    admin.resetPasswordExpire = undefined;
    await admin.save();

    res.status(200).json({
      success: true,
      message: 'Password reset successful',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
