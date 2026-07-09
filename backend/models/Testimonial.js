const mongoose = require('mongoose');

const TestimonialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
  },
  rating: {
    type: Number,
    required: [true, 'Please add a rating'],
    min: 1,
    max: 5,
  },
  review: {
    type: String,
    required: [true, 'Please add a review'],
  },
  company: {
    type: String,
    required: [true, 'Please add a company/role'],
  },
  photo: {
    type: String, // Cloudinary URL or local path
    default: '',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Testimonial', TestimonialSchema);
