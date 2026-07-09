const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure local uploads folder exists if not using Cloudinary or as local backup
const uploadsDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Local Storage Engine
const localStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

// Configure Multer with local storage by default
const upload = multer({
  storage: localStorage,
  limits: { fileSize: 50 * 1024 * 1024 }, // 50MB limit
  fileFilter: function (req, file, cb) {
    // Accept images, pdfs, word docs, videos
    const filetypes = /jpeg|jpg|png|webp|gif|pdf|doc|docx|mp4|webm/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Only images, PDFs, word docs, and videos are allowed!'));
    }
  },
});

// Cloudinary Uploader function (called after multer receives the file locally)
const uploadToCloudinary = async (filePath) => {
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    !process.env.CLOUDINARY_API_KEY ||
    !process.env.CLOUDINARY_API_SECRET
  ) {
    // Cloudinary config not set, return null to signify local fallback path
    return null;
  }

  const cloudinary = require('cloudinary').v2;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      folder: 'agency_portfolio',
      resource_type: 'auto', // Auto detect if video or image
    });
    // Remove local file after successful Cloudinary upload
    fs.unlinkSync(filePath);
    return result.secure_url;
  } catch (error) {
    console.error('Cloudinary Upload Error:', error);
    // On error, we keep the local file and return the local path instead
    return null;
  }
};

module.exports = { upload, uploadToCloudinary };
