const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Load models
const Admin = require('../models/Admin');
const TeamMember = require('../models/TeamMember');
const Project = require('../models/Project');
const Testimonial = require('../models/Testimonial');
const Pricing = require('../models/Pricing');
const Blog = require('../models/Blog');
const Service = require('../models/Service');
const FAQ = require('../models/FAQ');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected for seeding...');

    // Clear existing data
    await Admin.deleteMany({});
    await TeamMember.deleteMany({});
    await Project.deleteMany({});
    await Testimonial.deleteMany({});
    await Pricing.deleteMany({});
    await Blog.deleteMany({});
    await Service.deleteMany({});
    await FAQ.deleteMany({});
    console.log('Cleared existing collections.');

    // 1. Create Admin
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    await Admin.create({
      username: 'admin',
      email: 'admin@agency.com',
      password: hashedPassword,
      role: 'admin',
      isVerified: true,
    });
    console.log('Seeded Admin account: admin@agency.com / admin123');

    // 2. Create Services (16 Services from list)
    const services = [
      { name: 'Website Development', description: 'Custom, blazing-fast, and secure website development using Next.js & React.', iconName: 'Layout', features: ['Responsive Design', 'Next.js & React', 'SEO Friendly', 'High Performance'] },
      { name: 'Landing Pages', description: 'Conversion-optimized landing pages that turn traffic into leads and customers.', iconName: 'Compass', features: ['Clear CTAs', 'A/B Tested Layouts', 'Super Fast Load', 'Analytics Integrated'] },
      { name: 'Business Websites', description: 'High-end websites that establish trust and command market authority.', iconName: 'Building', features: ['Corporate Design', 'CMS Integration', 'Secure Hosting', 'Lead Capturing'] },
      { name: 'Portfolio Websites', description: 'Premium showcase portfolios featuring modern animations and glassmorphism styling.', iconName: 'Briefcase', features: ['Cinematic Effects', 'Dark/Light Theme', 'Custom Curators', 'Smooth Scroll'] },
      { name: 'E-Commerce', description: 'Fully featured shopping experiences with custom checkouts, subscriptions, and panel boards.', iconName: 'ShoppingBag', features: ['Stripe Integration', 'Order Dashboards', 'Infinite Products', 'Inventory Control'] },
      { name: 'AI Chatbots', description: 'Intelligent, automated agents using ChatGPT / Claude APIs to engage visitors 24/7.', iconName: 'MessageSquareCode', features: ['Context Retention', 'API Integrations', 'Custom Embeds', 'Human Handover'] },
      { name: 'Machine Learning', description: 'Advanced ML modeling, data analytics, predictive regression, and segmentation systems.', iconName: 'Cpu', features: ['Python & PyTorch', 'Data Pipeline Dev', 'Model Optimization', 'Custom APIs'] },
      { name: 'Deep Learning', description: 'Complex neural networks for vision classification, text analysis, and NLP workloads.', iconName: 'Brain', features: ['CNNs & RNNs', 'Image Processing', 'Transformers Dev', 'High Accuracy Models'] },
      { name: 'Python Automation', description: 'Custom web scrapers, data entry bots, reports automation, and workflow scripts.', iconName: 'Terminal', features: ['Web Scraping', 'Zapier Automation', 'API Syncs', 'Custom Cron Jobs'] },
      { name: 'API Development', description: 'Robust, fast, and scalable Node/Express REST & GraphQL endpoints with authentication.', iconName: 'Share2', features: ['JWT & OAuth', 'API Documentation', 'Rate Limiting', 'Highly Extensible'] },
      { name: 'Dashboard Development', description: 'Aesthetic, interactive monitoring consoles showcasing leads, analytics, and CRM charts.', iconName: 'PieChart', features: ['Recharts Visuals', 'Real-time Feeds', 'Export Options', 'Custom Access Level'] },
      { name: 'UI/UX Design', description: 'Premium digital designs mapped in Figma utilizing futuristic Awwwards-style standards.', iconName: 'Figma', features: ['Figma Prototypes', 'User Journey Mapping', 'High-Fidelity Mockups', 'Component Libraries'] },
      { name: 'Graphic Design', description: 'High-end branding, custom vectors, promotional material, and corporate logos.', iconName: 'Palette', features: ['Vector Graphics', 'Branding Booklets', 'Digital Artwork', 'Social Kits'] },
      { name: 'SEO Optimization', description: 'Rigorous keyword research, speed auditing, and schema mappings to reach Page 1.', iconName: 'Search', features: ['Site Audit', 'Schema Mappings', 'PageSpeed Boost', 'Keyword Rank Tracking'] },
      { name: 'Hosting & Deployment', description: 'Vercel, Render, AWS, or Docker setup with CI/CD triggers and automated backups.', iconName: 'Cloud', features: ['GitHub Actions', 'Zero Downtime', 'SSL Certificate Config', 'Scalable Cluster Setup'] },
      { name: 'Maintenance', description: 'Round-the-clock support, dependency patches, speed audits, and content updates.', iconName: 'ShieldAlert', features: ['Daily Backups', 'Package Audits', 'Bug Resolutions', '24x7 Monitor Alerts'] },
    ];
    await Service.create(services);
    console.log('Seeded 16 Services.');

    // 3. Create Team Members (3 members)
    const team = [
      {
        name: 'Somesh Kumar Mishra',
        role: 'Full-Stack & GenAI Architect',
        bio: "National SIH'24 Winner. President of the MIT Coding Club. Specializes in scalable MERN applications, Socket.IO real-time data flow, Redis caches, and custom multi-role validation blocks.",
        skills: [
          { name: 'Next.js / React / TS', level: 98 },
          { name: 'Node.js & Socket.IO', level: 95 },
          { name: 'Docker & Cloud Deployment', level: 90 },
        ],
        experience: '4+ Years',
        projectsCount: 28,
        image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400',
        socialLinks: { github: 'https://github.com/Somesh-Mishra-9', linkedin: 'https://www.linkedin.com/in/somesh-mishra-ba2358219/', twitter: 'https://twitter.com' },
      },
      {
        name: 'Nishant Kumar',
        role: 'Backend & ML Systems Engineer',
        bio: 'TCS NQT Top 5% Ranker. Vice President of the MIT Coding Club. Specializes in Next.js backend routing, REST controllers, Mongoose database models, and PaddleOCR/Ollama pipelines.',
        skills: [
          { name: 'TypeScript & Node API', level: 97 },
          { name: 'Python & NLP Models', level: 95 },
          { name: 'PostgreSQL & MongoDB', level: 93 },
        ],
        experience: '4+ Years',
        projectsCount: 35,
        image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=400',
        socialLinks: { github: 'https://github.com/nishant946', linkedin: 'https://www.linkedin.com/in/nishant-kumar-a5b9a3258/', twitter: 'https://twitter.com' },
      },
      {
        name: 'Aman Kumar',
        role: 'Computer Vision & Data Scientist',
        bio: 'Event Coordinator at DTC Foss Club. Expert in Deep Learning (CNNs), Generative AI models, image preprocessing using OpenCV, and Supabase analytics logging pipelines.',
        skills: [
          { name: 'Deep Learning & CNN', level: 96 },
          { name: 'Python & Data Analytics', level: 94 },
          { name: 'Cloud & Database Mappings', level: 91 },
        ],
        experience: '3+ Years',
        projectsCount: 18,
        image: '/aman-kumar.jpg',
        socialLinks: { github: 'https://github.com/Aman91109', linkedin: 'https://www.linkedin.com/in/aman-kumar-735905321', twitter: 'https://twitter.com' },
      },
    ];
    await TeamMember.create(team);
    console.log('Seeded 3 Team Members.');

    // 4. Create Portfolio Projects
    const projects = [
      {
        title: 'Aura: AI-Driven CRM Engine',
        description: 'A fully interactive, premium dashboard utilizing Deep Learning NLP models to scan consumer emails, predict churn, and suggest auto-responses via Express APIs. The frontend features glassmorphic widgets, charts, and real-time sockets.',
        images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'React', 'MongoDB', 'Python/Flask', 'Tailwind CSS', 'Recharts'],
        category: 'AI Projects',
        client: 'Aura Analytics Corp',
        duration: '3 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
      {
        title: 'Veridian: Carbon Offset Ledger',
        description: 'Futuristic blockchain-enabled business tool representing Carbon Offsets across dynamic SVG maps. Built using Node.js backend with JWT authentication and strict admin verification channels.',
        images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'Express.js', 'MongoDB', 'Web3.js', 'Framer Motion'],
        category: 'Web Apps',
        client: 'Veridian Ecology Inc',
        duration: '2 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
      {
        title: 'E-Pulse: Next-Gen Shopify Engine',
        description: 'E-commerce interface with custom floating checkout modules, Stripe integrations, dynamic invoice generators, and a luxury admin metrics dashboard loaded with framer animations.',
        images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'Express', 'Mongoose', 'Stripe API', 'GSAP ScrollTrigger'],
        category: 'Business Websites',
        client: 'Pulse Brand Group',
        duration: '2.5 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
      {
        title: 'Optima: Supply Chain Forecaster',
        description: 'Advanced machine learning interface training multivariate regressions and LSTM models in Python, served via secured Express REST endpoints displaying predictive graphs.',
        images: ['https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'Python/Tensorflow', 'Express.js', 'Tailwind', 'MongoDB'],
        category: 'ML Projects',
        client: 'Optima Logistics',
        duration: '4 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
      {
        title: 'Nova: Crypto Wallet & Portfolio',
        description: 'Mobile cryptocurrency web application supporting transaction exports, live currency graphs, localized JWT auth, and customizable glassmorphic border elements.',
        images: ['https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'CoinGecko API'],
        category: 'Mobile Apps',
        client: 'Nova Labs',
        duration: '1.5 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
      {
        title: 'Specter: Security Command Board',
        description: 'Highly secure, custom admin command panel featuring real-time firewall block rates, active sessions monitor, role-based controls, and quick leads pipelines.',
        images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'],
        technology: ['Next.js', 'Express.js', 'JWT', 'MongoDB', 'ChartJS', 'Lenis Scroll'],
        category: 'Admin Panels',
        client: 'Specter Cyber Security',
        duration: '3 Months',
        github: 'https://github.com',
        liveDemo: 'https://example.com',
      },
    ];
    await Project.create(projects);
    console.log('Seeded 6 Portfolio Projects.');

    // 5. Create Testimonials (4 entries)
    const testimonials = [
      {
        name: 'Marcus Thorne',
        rating: 5,
        review: 'The AI CRM portal this team built has completely streamlined our inbox management. Churn predictions are sitting at 92% accuracy, and customer satisfaction is up by 30%. Absolutely premium engineering.',
        company: 'CEO, Aura Analytics Corp',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      },
      {
        name: 'Sarah Jenkins',
        rating: 5,
        review: 'Working with them felt like hiring an elite design lab. The Next.js landing layouts they designed convert at a massive 18.5%, and the 3D scroll effects blew our board away.',
        company: 'Product Director, Jenkins Retail',
        photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      },
      {
        name: 'Rajesh Nair',
        rating: 5,
        review: 'The Python web scrapers and lead bots they wrote automated what used to be a full-time 4-person job. They deployed it on AWS, and it runs like a clock. Extremely worth the investment.',
        company: 'Operations VP, Nair Logistic Solutions',
        photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      },
      {
        name: 'Lara Croft',
        rating: 5,
        review: 'Elena' + "'" + 's Figma designs and UI mockups were breath-taking. They translated a highly complex cryptocurrency concept into a sleek, clean mobile application. Client reviews are excellent.',
        company: 'Creative Lead, Croft Cryptology',
        photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      },
    ];
    await Testimonial.create(testimonials);
    console.log('Seeded 4 Testimonials.');

    // 6. Create Pricing Plans (3 tiers)
    const plans = [
      {
        name: 'Starter',
        price: '$1,999',
        period: 'Project',
        features: [
          'High-Fidelity Figma UI/UX Design',
          'Responsive Next.js Frontend Website',
          'Standard Contact Form Integration',
          'Basic On-Page SEO Mapping',
          '3 Months Deployment Support',
        ],
        highlighted: false,
      },
      {
        name: 'Professional',
        price: '$4,999',
        period: 'Project',
        features: [
          'Full-Stack Next.js + Express API Server',
          'Custom MongoDB Database Architecture',
          'Secure JWT Authentication & Panels',
          'Nodemailer SMTP System Alerts',
          'Framer Motion & GSAP Scroll Interactions',
          '6 Months Maintenance & Backups',
        ],
        highlighted: true, // Recommended
      },
      {
        name: 'Enterprise',
        price: 'Custom',
        period: 'Project',
        features: [
          'Custom LLM Integration / Fine-tuning',
          'Deep Learning Predictive Models',
          'Multi-user Role Admin Command CMS',
          'Cloudinary & Multer File Pipelines',
          'Complex Procedural Three.js 3D Scenes',
          'Lifetime Patch Support & AWS Host Setup',
        ],
        highlighted: false,
      },
    ];
    await Pricing.create(plans);
    console.log('Seeded 3 Pricing Plans.');

    // 7. Create FAQs (5 items)
    const faqs = [
      {
        question: 'How long does a typical full-stack project take?',
        answer: 'Simple Next.js landing portfolios or corporate websites take 2-4 weeks. Complex full-stack applications with database panels, dashboards, and AI services typically take 6-12 weeks from visual blueprint to cloud launch.',
        order: 1,
      },
      {
        question: 'Do you design in Figma before coding?',
        answer: 'Yes! Elena Rostova, our Creative Director, maps user flows, wireframes, and complete high-fidelity desktop and mobile layouts in Figma. We share this interactive protoype with you for feedback before writing code.',
        order: 2,
      },
      {
        question: 'Can we edit the website content after launch?',
        answer: 'Absolutely. We deliver a custom-tailored Admin Dashboard CMS where you can create, edit, or delete portfolio projects, blog posts, team profiles, pricing tires, and service descriptions without typing code.',
        order: 3,
      },
      {
        question: 'What happens to file attachments sent via contact form?',
        answer: 'They are routed through our secure Multer pipeline. If Cloudinary environment parameters are configured, they are hosted securely on Cloudinary CDN. Otherwise, they are saved locally in Node uploads folders and linked in the Admin lead logs.',
        order: 4,
      },
      {
        question: 'Do you offer hosting setup and cloud support?',
        answer: 'Yes, we handle end-to-end server configuration. By default, we deploy the frontend Next.js app to Vercel, the Express API to Render, and the database to MongoDB Atlas. We can also configure AWS, Docker clusters, or DigitalOcean droplets.',
        order: 5,
      },
    ];
    await FAQ.create(faqs);
    console.log('Seeded 5 FAQs.');

    // 8. Create Blog posts (3 entries)
    const blogs = [
      {
        title: 'Mastering Framer Motion in Next.js App Router',
        excerpt: 'Learn how to construct buttery-smooth scroll-triggered entrance clips, custom mouse-following glowing nodes, and responsive glass overlays inside Next.js layout structures.',
        content: `
# Core Scroll Physics with Framer Motion

Framer motion has revolutionized visual development in React. By using standard \`motion.div\` wrappers and attaching them to scroll states, we can build Awwwards-level components.

## Getting Started

First, install the motion package:
\`\`\`bash
npm i framer-motion
\`\`\`

Next, wrap your container in an \`AnimatePresence\` component to smoothly fade exit triggers:
\`\`\`javascript
import { motion, AnimatePresence } from 'framer-motion';

export default function SmoothPanel() {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="glass-card"
    >
      <h3>Futuristic Card</h3>
    </motion.div>
  );
}
\`\`\`

## Tips for High Performance
- Avoid animating layout triggers like width, height, top, or left.
- Stick to transform matrices (\`x\`, \`y\`, \`scale\`, \`rotate\`) and \`opacity\`.
- Keep Three.js backgrounds in separate threads or canvas nodes to prevent layout recalculations.
        `,
        image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
        author: 'Zephyr Croft',
        readTime: '4 Min Read',
        tags: ['Next.js', 'Framer Motion', 'Web Design'],
      },
      {
        title: 'Serving Machine Learning Models via Node.js Rest APIs',
        excerpt: 'An in-depth guide on deploying Python NLP scripts, training classification regressions in PyTorch, and using Express child process streams or Flask APIs to serve predictions.',
        content: `
# Interfacing Express and Python

Machine learning engineers often run into bottlenecks when attempting to host predictive neural nets on JavaScript environments. Here are two ways to connect Node.js and Python.

## Approach A: The Microservice Architecture (Recommended)

Keep the environments separated. Deploy your Python code using a Flask or FastAPI microservice, and have Express query the prediction endpoint.

\`\`\`javascript
// Node Express Client calling FastAPI
app.post('/api/predict', async (req, res) => {
  const response = await fetch('https://python-ai-api/predict', {
    method: 'POST',
    body: JSON.stringify(req.body),
    headers: { 'Content-Type': 'application/json' }
  });
  const prediction = await response.json();
  res.status(200).json({ success: true, data: prediction });
});
\`\`\`

## Approach B: Child Process Spawning

If you want single-server execution, spawn a Python subprocess inside the Express router.

\`\`\`javascript
const { spawn } = require('child_process');

app.post('/api/classify', (req, res) => {
  const pythonProcess = spawn('python', ['scripts/classifier.py', JSON.stringify(req.body.text)]);
  
  pythonProcess.stdout.on('data', (data) => {
    res.json({ success: true, classification: data.toString() });
  });
});
\`\`\`
        `,
        image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
        author: 'Nishant Kumar',
        readTime: '6 Min Read',
        tags: ['Express', 'Python', 'Machine Learning'],
      },
      {
        title: 'The Psychology of Glassmorphic Luxury Web Interfaces',
        excerpt: 'Why glowing borders, high backdrop blurs, dark base overlays, and smooth magnetic mouse elements result in high client conversion rates and professional prestige.',
        content: `
# Visual Psychology of Web Aesthetics

When visitors land on your page, you have approximately 2.6 seconds to establish credibility. Luxury layouts leverage deep visual hierarchies to command authority.

## The Pillars of Luxury UI

1. **Depth & Spatial Illusion:** In dark themes, using \`backdrop-filter: blur(15px)\` combined with floating neon particle canvasses creates a virtual depth. Card borders styled with gradient outlines emphasize the geometric edges.
2. **Micro-interactivity:** A cursor follower that deforms on links or magnet elements that pull buttons toward the pointer mimics physical response, giving the interface a sense of life.
3. **Typography Contrast:** Space Grotesk (geometric and wide) for display headers paired with clean Inter for body text yields a futuristic yet readable appearance.

## Spacing and Alignment
Keep grids clean. Pixel-perfect margins are the line between an amateur prototype and an Awwwards winner.
        `,
        image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
        author: 'Elena Rostova',
        readTime: '3 Min Read',
        tags: ['UI/UX', 'Design Systems', 'Framer CSS'],
      },
    ];
    await Blog.create(blogs);
    console.log('Seeded 3 Blog posts.');

    console.log('Database seeding finished successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error.message);
    process.exit(1);
  }
};

seedData();
