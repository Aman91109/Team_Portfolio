const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
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

// Protect all routes under CMS
router.use(protect);

// ==========================================
// 1. SERVICES CMS
// ==========================================
router.post('/services', async (req, res) => {
  try {
    if (global.useMockDB) {
      const service = mockDb.create('Service', req.body);
      return res.status(201).json({ success: true, data: service });
    }
    const service = await Service.create(req.body);
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/services/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const service = mockDb.findByIdAndUpdate('Service', req.params.id, req.body);
      if (!service) return res.status(404).json({ success: false, error: 'Service not found' });
      return res.status(200).json({ success: true, data: service });
    }
    const service = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ success: false, error: 'Service not found' });
    res.status(200).json({ success: true, data: service });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/services/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const service = mockDb.findByIdAndDelete('Service', req.params.id);
      if (!service) return res.status(404).json({ success: false, error: 'Service not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ success: false, error: 'Service not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 2. FAQs CMS
// ==========================================
router.post('/faqs', async (req, res) => {
  try {
    if (global.useMockDB) {
      const faq = mockDb.create('FAQ', req.body);
      return res.status(201).json({ success: true, data: faq });
    }
    const faq = await FAQ.create(req.body);
    res.status(201).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/faqs/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const faq = mockDb.findByIdAndUpdate('FAQ', req.params.id, req.body);
      if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
      return res.status(200).json({ success: true, data: faq });
    }
    const faq = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
    res.status(200).json({ success: true, data: faq });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/faqs/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const faq = mockDb.findByIdAndDelete('FAQ', req.params.id);
      if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const faq = await FAQ.findByIdAndDelete(req.params.id);
    if (!faq) return res.status(404).json({ success: false, error: 'FAQ not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 3. TEAM CMS
// ==========================================
router.post('/team', upload.single('image'), async (req, res) => {
  try {
    let teamData = { ...req.body };
    
    if (typeof teamData.skills === 'string') {
      try { teamData.skills = JSON.parse(teamData.skills); } catch (e) { teamData.skills = []; }
    }
    if (typeof teamData.socialLinks === 'string') {
      try { teamData.socialLinks = JSON.parse(teamData.socialLinks); } catch (e) { teamData.socialLinks = {}; }
    }

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      teamData.image = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      const member = mockDb.create('TeamMember', teamData);
      return res.status(201).json({ success: true, data: member });
    }

    const member = await TeamMember.create(teamData);
    res.status(201).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/team/:id', upload.single('image'), async (req, res) => {
  try {
    let teamData = { ...req.body };

    if (typeof teamData.skills === 'string') {
      try { teamData.skills = JSON.parse(teamData.skills); } catch (e) {}
    }
    if (typeof teamData.socialLinks === 'string') {
      try { teamData.socialLinks = JSON.parse(teamData.socialLinks); } catch (e) {}
    }

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      teamData.image = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      const member = mockDb.findByIdAndUpdate('TeamMember', req.params.id, teamData);
      if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
      return res.status(200).json({ success: true, data: member });
    }

    const member = await TeamMember.findByIdAndUpdate(req.params.id, teamData, { new: true, runValidators: true });
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    res.status(200).json({ success: true, data: member });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/team/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const member = mockDb.findByIdAndDelete('TeamMember', req.params.id);
      if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const member = await TeamMember.findByIdAndDelete(req.params.id);
    if (!member) return res.status(404).json({ success: false, error: 'Member not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 4. PORTFOLIO CMS
// ==========================================
router.post('/portfolio', upload.array('images', 5), async (req, res) => {
  try {
    let projectData = { ...req.body };

    if (typeof projectData.technology === 'string') {
      try {
        projectData.technology = JSON.parse(projectData.technology);
      } catch (err) {
        projectData.technology = projectData.technology.split(',').map(s => s.trim());
      }
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const cloudUrl = await uploadToCloudinary(file.path);
        return cloudUrl || `/uploads/${file.filename}`;
      });
      projectData.images = await Promise.all(uploadPromises);
    } else {
      projectData.images = [];
    }

    if (global.useMockDB) {
      const project = mockDb.create('Project', projectData);
      return res.status(201).json({ success: true, data: project });
    }

    const project = await Project.create(projectData);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/portfolio/:id', upload.array('images', 5), async (req, res) => {
  try {
    let projectData = { ...req.body };

    if (typeof projectData.technology === 'string') {
      try {
        projectData.technology = JSON.parse(projectData.technology);
      } catch (err) {
        projectData.technology = projectData.technology.split(',').map(s => s.trim());
      }
    }

    if (typeof projectData.existingImages === 'string') {
      try {
        projectData.images = JSON.parse(projectData.existingImages);
      } catch (err) {
        projectData.images = [];
      }
    }

    if (req.files && req.files.length > 0) {
      const uploadPromises = req.files.map(async (file) => {
        const cloudUrl = await uploadToCloudinary(file.path);
        return cloudUrl || `/uploads/${file.filename}`;
      });
      const newImages = await Promise.all(uploadPromises);
      projectData.images = [...(projectData.images || []), ...newImages];
    }

    if (global.useMockDB) {
      const project = mockDb.findByIdAndUpdate('Project', req.params.id, projectData);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: project });
    }

    const project = await Project.findByIdAndUpdate(req.params.id, projectData, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/portfolio/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const project = mockDb.findByIdAndDelete('Project', req.params.id);
      if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 5. TESTIMONIALS CMS
// ==========================================
router.post('/testimonials', upload.single('photo'), async (req, res) => {
  try {
    let testimonialData = { ...req.body };

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      testimonialData.photo = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      const testimonial = mockDb.create('Testimonial', testimonialData);
      return res.status(201).json({ success: true, data: testimonial });
    }

    const testimonial = await Testimonial.create(testimonialData);
    res.status(201).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/testimonials/:id', upload.single('photo'), async (req, res) => {
  try {
    let testimonialData = { ...req.body };

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      testimonialData.photo = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      const testimonial = mockDb.findByIdAndUpdate('Testimonial', req.params.id, testimonialData);
      if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
      return res.status(200).json({ success: true, data: testimonial });
    }

    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, testimonialData, { new: true });
    if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.status(200).json({ success: true, data: testimonial });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/testimonials/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const testimonial = mockDb.findByIdAndDelete('Testimonial', req.params.id);
      if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) return res.status(404).json({ success: false, error: 'Testimonial not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 6. PRICING CMS
// ==========================================
router.post('/pricing', async (req, res) => {
  try {
    let pricingData = { ...req.body };
    if (typeof pricingData.features === 'string') {
      try { pricingData.features = JSON.parse(pricingData.features); } catch (e) {
        pricingData.features = pricingData.features.split(',').map(s => s.trim());
      }
    }

    if (global.useMockDB) {
      const pricing = mockDb.create('Pricing', pricingData);
      return res.status(201).json({ success: true, data: pricing });
    }

    const pricing = await Pricing.create(pricingData);
    res.status(201).json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/pricing/:id', async (req, res) => {
  try {
    let pricingData = { ...req.body };
    if (typeof pricingData.features === 'string') {
      try { pricingData.features = JSON.parse(pricingData.features); } catch (e) {
        pricingData.features = pricingData.features.split(',').map(s => s.trim());
      }
    }

    if (global.useMockDB) {
      const pricing = mockDb.findByIdAndUpdate('Pricing', req.params.id, pricingData);
      if (!pricing) return res.status(404).json({ success: false, error: 'Pricing tier not found' });
      return res.status(200).json({ success: true, data: pricing });
    }

    const pricing = await Pricing.findByIdAndUpdate(req.params.id, pricingData, { new: true });
    if (!pricing) return res.status(404).json({ success: false, error: 'Pricing tier not found' });
    res.status(200).json({ success: true, data: pricing });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/pricing/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const pricing = mockDb.findByIdAndDelete('Pricing', req.params.id);
      if (!pricing) return res.status(404).json({ success: false, error: 'Pricing tier not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const pricing = await Pricing.findByIdAndDelete(req.params.id);
    if (!pricing) return res.status(404).json({ success: false, error: 'Pricing tier not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 7. BLOGS CMS
// ==========================================
router.post('/blogs', upload.single('image'), async (req, res) => {
  try {
    let blogData = { ...req.body };
    if (typeof blogData.tags === 'string') {
      try { blogData.tags = JSON.parse(blogData.tags); } catch (e) {
        blogData.tags = blogData.tags.split(',').map(s => s.trim());
      }
    }

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      blogData.image = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (global.useMockDB) {
      if (blogData.title) {
        blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
      }
      const blog = mockDb.create('Blog', blogData);
      return res.status(201).json({ success: true, data: blog });
    }

    const blog = await Blog.create(blogData);
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/blogs/:id', upload.single('image'), async (req, res) => {
  try {
    let blogData = { ...req.body };
    if (typeof blogData.tags === 'string') {
      try { blogData.tags = JSON.parse(blogData.tags); } catch (e) {
        blogData.tags = blogData.tags.split(',').map(s => s.trim());
      }
    }

    if (req.file) {
      const cloudinaryUrl = await uploadToCloudinary(req.file.path);
      blogData.image = cloudinaryUrl || `/uploads/${req.file.filename}`;
    }

    if (blogData.title) {
      blogData.slug = blogData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    }

    if (global.useMockDB) {
      const blog = mockDb.findByIdAndUpdate('Blog', req.params.id, blogData);
      if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
      return res.status(200).json({ success: true, data: blog });
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, blogData, { new: true });
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.status(200).json({ success: true, data: blog });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/blogs/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const blog = mockDb.findByIdAndDelete('Blog', req.params.id);
      if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ success: false, error: 'Blog not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 8. LEADS CMS
// ==========================================
router.get('/leads', async (req, res) => {
  try {
    if (global.useMockDB) {
      const leads = mockDb.find('Lead');
      leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ success: true, count: leads.length, data: leads });
    }
    const leads = await Lead.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/leads/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (global.useMockDB) {
      const lead = mockDb.findByIdAndUpdate('Lead', req.params.id, { status });
      if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
      return res.status(200).json({ success: true, data: lead });
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.status(200).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/leads/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const lead = mockDb.findByIdAndDelete('Lead', req.params.id);
      if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Export Leads to CSV
router.get('/leads/export', async (req, res) => {
  try {
    let leads = [];
    if (global.useMockDB) {
      leads = mockDb.find('Lead');
      leads.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else {
      leads = await Lead.find().sort({ createdAt: -1 });
    }
    
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads-export.csv');
    
    let csvContent = 'ID,Name,Email,Phone,Company,ProjectType,Budget,Status,Message,Date\n';
    
    leads.forEach((l) => {
      const name = `"${l.name.replace(/"/g, '""')}"`;
      const email = `"${l.email.replace(/"/g, '""')}"`;
      const phone = `"${(l.phone || '').replace(/"/g, '""')}"`;
      const company = `"${(l.company || '').replace(/"/g, '""')}"`;
      const type = `"${l.projectType.replace(/"/g, '""')}"`;
      const budget = `"${l.budget.replace(/"/g, '""')}"`;
      const status = `"${l.status.replace(/"/g, '""')}"`;
      const message = `"${l.message.replace(/[\r\n]+/g, ' ').replace(/"/g, '""')}"`;
      const date = `"${new Date(l.createdAt).toISOString()}"`;
      
      csvContent += `${l._id},${name},${email},${phone},${company},${type},${budget},${status},${message},${date}\n`;
    });
    
    res.status(200).send(csvContent);
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// ==========================================
// 9. NEWSLETTER SUBSCRIBERS CMS
// ==========================================
router.get('/subscribers', async (req, res) => {
  try {
    if (global.useMockDB) {
      const subs = mockDb.find('Subscriber');
      subs.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return res.status(200).json({ success: true, count: subs.length, data: subs });
    }
    const subs = await Subscriber.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: subs.length, data: subs });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/subscribers/:id', async (req, res) => {
  try {
    if (global.useMockDB) {
      const sub = mockDb.findByIdAndDelete('Subscriber', req.params.id);
      if (!sub) return res.status(404).json({ success: false, error: 'Subscriber not found' });
      return res.status(200).json({ success: true, data: {} });
    }
    const sub = await Subscriber.findByIdAndDelete(req.params.id);
    if (!sub) return res.status(404).json({ success: false, error: 'Subscriber not found' });
    res.status(200).json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
