const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a service name'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Please add a service description'],
  },
  iconName: {
    type: String, // e.g. "Layout", "Brain", "Cpu", "Terminal" (corresponds to Lucide icons)
    required: true,
  },
  features: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Service', ServiceSchema);
