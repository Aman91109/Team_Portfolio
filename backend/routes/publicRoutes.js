const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const { upload, uploadToCloudinary } = require('../middleware/uploadMiddleware');
const mockDb = require('../utils/mockDb');

// Models
const TeamMember = require('../models/TeamMember');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Pricing = require('../models/Pricing');
const Blog = require('../models/Blog');
const Lead = require('../models/Lead');
const Subscriber = require('../models/Subscriber');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');

// Helper: Send email notification
const sendEmailAlert = async (lead) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    console.log(`[MOCK EMAIL ALERT] SMTP not configured. Lead submitted:`, lead);
    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.mailtrap.io',
      port: process.env.EMAIL_PORT || 2525,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || 'noreply@agency.com',
      to: process.env.EMAIL_TO || 'admin@agency.com',
      subject: `New Lead Submitted: ${lead.projectType} from ${lead.name}`,
      html: `
        <h2>New Project Inquiry Details</h2>
        <p><strong>Name:</strong> ${lead.name}</p>
        <p><strong>Email:</strong> ${lead.email}</p>
        <p><strong>Phone:</strong> ${lead.phone || 'N/A'}</p>
        <p><strong>Company:</strong> ${lead.company || 'N/A'}</p>
        <p><strong>ProjectType:</strong> ${lead.projectType}</p>
        <p><strong>Budget Range:</strong> ${lead.budget}</p>
        <p><strong>Message:</strong></p>
        <p>${lead.message}</p>
        <p><strong>Attachment:</strong> ${lead.fileAttachment || 'None'}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email alert sent successfully.');
  } catch (error) {
    console.error('Nodemailer error:', error.message);
  }
};

// @desc    Get all services
router.get('/services', async (req, res) => {
  try {
    if (global.useMockDB) {
      const services = mockDb.find('Service');
      // Sort alphabetically by name
      services.sort((a, b) => a.name.localeCompare(b.name));
      return res.status(200).json({ success: true, count: services.length, data: services });
    }
    const services = await Service.find().sort({ name: 1 });
    res.status(200).json({ success: true, count: services.length, data: services });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get all FAQs
router.get('/faqs', async (req, res) => {
  try {
    if (global.useMockDB) {
      const faqs = mockDb.find('FAQ');
      faqs.sort((a, b) => a.order - b.order);
      return res.status(200).json({ success: true, count: faqs.length, data: faqs });
    }
    const faqs = await FAQ.find().sort({ order: 1 });
    res.status(200).json({ success: true, count: faqs.length, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get all Team Members
router.get('/team', async (req, res) => {
  try {
    if (global.useMockDB) {
      const team = mockDb.find('TeamMember');
      return res.status(200).json({ success: true, count: team.length, data: team });
    }
    const team = await TeamMember.find();
    res.status(200).json({ success: true, count: team.length, data: team });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get Portfolio items
router.get('/portfolio', async (req, res) => {
  try {
    const { category } = req.query;
    
    if (global.useMockDB) {
      let query = {};
      if (category && category !== 'All') {
        query.category = category;
      }
      const projects = mockDb.find('Project', query);
      // Sort by date (descending)
      projects.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ success: true, count: projects.length, data: projects });
    }

    let query = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    const projects = await Project.find(query).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get Testimonials
router.get('/testimonials', async (req, res) => {
  try {
    if (global.useMockDB) {
      const testimonials = mockDb.find('Testimonial');
      return res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
    }
    const testimonials = await Testimonial.find();
    res.status(200).json({ success: true, count: testimonials.length, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get Pricing
router.get('/pricing', async (req, res) => {
  try {
    if (global.useMockDB) {
      const pricing = mockDb.find('Pricing');
      pricing.sort((a, b) => parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, '')));
      return res.status(200).json({ success: true, count: pricing.length, data: pricing });
    }
    const pricing = await Pricing.find().sort({ price: 1 });
    res.status(200).json({ success: true, count: pricing.length, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get Blogs
router.get('/blogs', async (req, res) => {
  try {
    if (global.useMockDB) {
      const blogs = mockDb.find('Blog');
      blogs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ success: true, count: blogs.length, data: blogs });
    }
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Get single Blog by slug
router.get('/blogs/:slug', async (req, res) => {
  try {
    if (global.useMockDB) {
      const blog = mockDb.findOne('Blog', { slug: req.params.slug });
      if (!blog) {
        return res.status(404).json({ success: false, error: 'Blog post not found' });
      }
      return res.status(200).json({ success: true, data: blog });
    }
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ success: false, error: 'Blog post not found' });
    }
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Submit Contact Lead (with dynamic attachment)
router.post('/lead', upload.single('fileAttachment'), async (req, res) => {
  try {
    const { name, email, phone, company, budget, projectType, message } = req.body;

    let fileUrl = '';
    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      fileUrl = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      const lead = mockDb.create('Lead', {
        name,
        email,
        phone,
        company,
        budget,
        projectType,
        message,
        fileAttachment: fileUrl,
        status: 'New',
      });

      sendEmailAlert(lead);

      return res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully! Our team will contact you shortly.',
        data: lead,
      });
    }

    // Mongoose execution
    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      budget,
      projectType,
      message,
      fileAttachment: fileUrl,
    });

    sendEmailAlert(lead);

    res.status(201).json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will contact you shortly.',
      data: lead,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// @desc    Subscribe to Newsletter
router.post('/newsletter', async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, error: 'Please provide an email address' });
    }

    if (global.useMockDB) {
      const existing = mockDb.findOne('Subscriber', { email });
      if (existing) {
        return res.status(400).json({ success: false, error: 'Email already subscribed!' });
      }

      mockDb.create('Subscriber', { email });

      return res.status(201).json({
        success: true,
        message: 'Subscribed to newsletter successfully!',
      });
    }

    // Mongoose execution
    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, error: 'Email already subscribed!' });
    }

    await Subscriber.create({ email });

    res.status(201).json({
      success: true,
      message: 'Subscribed to newsletter successfully!',
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
