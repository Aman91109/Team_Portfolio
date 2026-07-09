const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Please add a role'],
    trim: true,
  },
  bio: {
    type: String,
    required: [true, 'Please add a bio'],
  },
  skills: [
    {
      name: { type: String, required: true },
      level: { type: Number, required: true, default: 90 }, // e.g. 0 to 100 percentage
    }
  ],
  experience: {
    type: String, // e.g. "5+ Years"
    required: true,
  },
  projectsCount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String, // Cloudinary URL or local path
    default: '',
  },
  socialLinks: {
    github: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('TeamMember', TeamMemberSchema);
