const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a project title'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a project description'],
  },
  images: [
    {
      type: String, // Cloudinary URLs or local paths
    }
  ],
  video: {
    type: String, // Video URL if available
    default: '',
  },
  technology: [
    {
      type: String,
      required: true,
    }
  ],
  category: {
    type: String,
    required: [true, 'Please specify a category'],
    enum: [
      'Web Apps',
      'AI Projects',
      'ML Projects',
      'Business Websites',
      'Mobile Apps',
      'Dashboards',
      'Admin Panels',
    ],
  },
  client: {
    type: String,
    default: 'Internal Project',
  },
  duration: {
    type: String, // e.g. "2 Months"
    default: '',
  },
  github: {
    type: String,
    default: '',
  },
  liveDemo: {
    type: String,
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
