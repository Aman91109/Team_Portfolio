const mongoose = require('mongoose');

const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  phone: {
    type: String,
    default: '',
  },
  company: {
    type: String,
    default: '',
  },
  budget: {
    type: String, // e.g. "$1k - $5k", "$5k - $10k", "$10k+"
    required: [true, 'Please select a budget range'],
  },
  projectType: {
    type: String, // e.g. "Web Development", "AI/ML Solutions", "UI/UX Design", "Automation"
    required: [true, 'Please select a project type'],
  },
  message: {
    type: String,
    required: [true, 'Please add a message'],
  },
  fileAttachment: {
    type: String, // Path or Cloudinary URL to uploaded file/specification doc
    default: '',
  },
  status: {
    type: String,
    enum: ['New', 'Contacted', 'In Progress', 'Closed'],
    default: 'New',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Lead', LeadSchema);
