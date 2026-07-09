const mongoose = require('mongoose');

const PricingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a plan name'],
    trim: true,
  },
  price: {
    type: String, // e.g. "$999" or "Custom"
    required: [true, 'Please add a plan price'],
  },
  period: {
    type: String, // e.g. "project" or "month"
    default: 'project',
  },
  features: [
    {
      type: String,
      required: true,
    }
  ],
  highlighted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Pricing', PricingSchema);
