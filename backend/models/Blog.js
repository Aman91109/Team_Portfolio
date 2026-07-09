const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a blog title'],
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
  excerpt: {
    type: String,
    required: [true, 'Please add an excerpt'],
  },
  content: {
    type: String, // Rich text content / Markdown
    required: [true, 'Please add content'],
  },
  image: {
    type: String, // Image URL
    default: '',
  },
  author: {
    type: String,
    required: true,
    default: 'Agency Team',
  },
  readTime: {
    type: String, // e.g. "5 Min Read"
    default: '3 Min Read',
  },
  tags: [
    {
      type: String,
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create slug before saving (if not provided)
BlogSchema.pre('validate', function (next) {
  if (this.title && !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
  }
  next();
});

module.exports = mongoose.model('Blog', BlogSchema);
