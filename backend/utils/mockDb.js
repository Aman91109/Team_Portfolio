const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

const DATA_DIR = path.join(__dirname, '../data');

// Ensure data folder exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// In-Memory fallback data templates (same as seed values)
const DEFAULT_SEEDS = {
  Admin: [
    {
      _id: 'admin_id_1337',
      username: 'admin',
      email: 'admin@agency.com',
      password: '', // Will be hashed in initialization
      role: 'admin',
      isVerified: true,
      createdAt: new Date().toISOString(),
    }
  ],
  Service: [
    { _id: 's1', name: 'Website Development', description: 'Custom, blazing-fast, and secure website development using Next.js & React.', iconName: 'Layout', features: ['Responsive Design', 'Next.js & React', 'SEO Friendly', 'High Performance'] },
    { _id: 's2', name: 'Landing Pages', description: 'Conversion-optimized landing pages that turn traffic into leads and customers.', iconName: 'Compass', features: ['Clear CTAs', 'A/B Tested Layouts', 'Super Fast Load', 'Analytics Integrated'] },
    { _id: 's3', name: 'Business Websites', description: 'High-end websites that establish trust and command market authority.', iconName: 'Building', features: ['Corporate Design', 'CMS Integration', 'Secure Hosting', 'Lead Capturing'] },
    { _id: 's4', name: 'Portfolio Websites', description: 'Premium showcase portfolios featuring modern animations and glassmorphism styling.', iconName: 'Briefcase', features: ['Cinematic Effects', 'Dark/Light Theme', 'Custom Curators', 'Smooth Scroll'] },
    { _id: 's5', name: 'E-Commerce', description: 'Fully featured shopping experiences with custom checkouts, subscriptions, and panel boards.', iconName: 'ShoppingBag', features: ['Stripe Integration', 'Order Dashboards', 'Infinite Products', 'Inventory Control'] },
    { _id: 's6', name: 'AI Chatbots', description: 'Intelligent, automated agents using ChatGPT / Claude APIs to engage visitors 24/7.', iconName: 'MessageSquareCode', features: ['Context Retention', 'API Integrations', 'Custom Embeds', 'Human Handover'] },
    { _id: 's7', name: 'Machine Learning', description: 'Advanced ML modeling, data analytics, predictive regression, and segmentation systems.', iconName: 'Cpu', features: ['Python & PyTorch', 'Data Pipeline Dev', 'Model Optimization', 'Custom APIs'] },
    { _id: 's8', name: 'Deep Learning', description: 'Complex neural networks for vision classification, text analysis, and NLP workloads.', iconName: 'Brain', features: ['CNNs & RNNs', 'Image Processing', 'Transformers Dev', 'High Accuracy Models'] },
    { _id: 's9', name: 'Python Automation', description: 'Custom web scrapers, data entry bots, reports automation, and workflow scripts.', iconName: 'Terminal', features: ['Web Scraping', 'Zapier Automation', 'API Syncs', 'Custom Cron Jobs'] },
    { _id: 's10', name: 'API Development', description: 'Robust, fast, and scalable Node/Express REST & GraphQL endpoints with authentication.', iconName: 'Share2', features: ['JWT & OAuth', 'API Documentation', 'Rate Limiting', 'Highly Extensible'] },
    { _id: 's11', name: 'Dashboard Development', description: 'Aesthetic, interactive monitoring consoles showcasing leads, analytics, and CRM charts.', iconName: 'PieChart', features: ['Recharts Visuals', 'Real-time Feeds', 'Export Options', 'Custom Access Level'] },
    { _id: 's12', name: 'UI/UX Design', description: 'Premium digital designs mapped in Figma utilizing futuristic Awwwards-style standards.', iconName: 'Figma', features: ['Figma Prototypes', 'User Journey Mapping', 'High-Fidelity Mockups', 'Component Libraries'] },
    { _id: 's13', name: 'Graphic Design', description: 'High-end branding, custom vectors, promotional material, and corporate logos.', iconName: 'Palette', features: ['Vector Graphics', 'Branding Booklets', 'Digital Artwork', 'Social Kits'] },
    { _id: 's14', name: 'SEO Optimization', description: 'Rigorous keyword research, speed auditing, and schema mappings to reach Page 1.', iconName: 'Search', features: ['Site Audit', 'Schema Mappings', 'PageSpeed Boost', 'Keyword Rank Tracking'] },
    { _id: 's15', name: 'Hosting & Deployment', description: 'Vercel, Render, AWS, or Docker setup with CI/CD triggers and automated backups.', iconName: 'Cloud', features: ['GitHub Actions', 'Zero Downtime', 'SSL Certificate Config', 'Scalable Cluster Setup'] },
    { _id: 's16', name: 'Maintenance', description: 'Round-the-clock support, dependency patches, speed audits, and content updates.', iconName: 'ShieldAlert', features: ['Daily Backups', 'Package Audits', 'Bug Resolutions', '24x7 Monitor Alerts'] },
  ],
  TeamMember: [
    {
      _id: 't1',
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
      image: '/somesh.jpg',
      socialLinks: { github: 'https://github.com/Somesh-Mishra-9', linkedin: 'https://www.linkedin.com/in/somesh-mishra-ba2358219/', twitter: 'https://twitter.com' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: 't2',
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
      image: '/nishant.jpg',
      socialLinks: { github: 'https://github.com/nishant946', linkedin: 'https://www.linkedin.com/in/nishant-kumar-a5b9a3258/', twitter: 'https://twitter.com' },
      createdAt: new Date().toISOString(),
    },
    {
      _id: 't3',
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
      createdAt: new Date().toISOString(),
    },
  ],
  Project: [
    {
      _id: 'p1',
      title: 'Aura: AI-Driven CRM Engine',
      description: 'A fully interactive, premium dashboard utilizing Deep Learning NLP models to scan consumer emails, predict churn, and suggest auto-responses via Express APIs. The frontend features glassmorphic widgets, charts, and real-time sockets.',
      images: ['https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'React', 'MongoDB', 'Python/Flask', 'Tailwind CSS', 'Recharts'],
      category: 'AI Projects',
      client: 'Aura Analytics Corp',
      duration: '3 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'p2',
      title: 'Veridian: Carbon Offset Ledger',
      description: 'Futuristic blockchain-enabled business tool representing Carbon Offsets across dynamic SVG maps. Built using Node.js backend with JWT authentication and strict admin verification channels.',
      images: ['https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'Express.js', 'MongoDB', 'Web3.js', 'Framer Motion'],
      category: 'Web Apps',
      client: 'Veridian Ecology Inc',
      duration: '2 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'p3',
      title: 'E-Pulse: Next-Gen Shopify Engine',
      description: 'E-commerce interface with custom floating checkout modules, Stripe integrations, dynamic invoice generators, and a luxury admin metrics dashboard loaded with framer animations.',
      images: ['https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'Express', 'Mongoose', 'Stripe API', 'GSAP ScrollTrigger'],
      category: 'Business Websites',
      client: 'Pulse Brand Group',
      duration: '2.5 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'p4',
      title: 'Optima: Supply Chain Forecaster',
      description: 'Advanced machine learning interface training multivariate regressions and LSTM models in Python, served via secured Express REST endpoints displaying predictive graphs.',
      images: ['https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'Python/Tensorflow', 'Express.js', 'Tailwind', 'MongoDB'],
      category: 'ML Projects',
      client: 'Optima Logistics',
      duration: '4 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'p5',
      title: 'Nova: Crypto Wallet & Portfolio',
      description: 'Mobile cryptocurrency web application supporting transaction exports, live currency graphs, localized JWT auth, and customizable glassmorphic border elements.',
      images: ['https://images.unsplash.com/photo-1621761191319-c6fb62004040?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'CoinGecko API'],
      category: 'Mobile Apps',
      client: 'Nova Labs',
      duration: '1.5 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'p6',
      title: 'Specter: Security Command Board',
      description: 'Highly secure, custom admin command panel featuring real-time firewall block rates, active sessions monitor, role-based controls, and quick leads pipelines.',
      images: ['https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800'],
      technology: ['Next.js', 'Express.js', 'JWT', 'MongoDB', 'ChartJS', 'Lenis Scroll'],
      category: 'Admin Panels',
      client: 'Specter Cyber Security',
      duration: '3 Months',
      github: 'https://github.com',
      liveDemo: 'https://example.com',
      createdAt: new Date().toISOString(),
    },
  ],
  Testimonial: [
    {
      _id: 'tes1',
      name: 'Marcus Thorne',
      rating: 5,
      review: 'The AI CRM portal this team built has completely streamlined our inbox management. Churn predictions are sitting at 92% accuracy, and customer satisfaction is up by 30%. Absolutely premium engineering.',
      company: 'CEO, Aura Analytics Corp',
      photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'tes2',
      name: 'Sarah Jenkins',
      rating: 5,
      review: 'Working with them felt like hiring an elite design lab. The Next.js landing layouts they designed convert at a massive 18.5%, and the 3D scroll effects blew our board away.',
      company: 'Product Director, Jenkins Retail',
      photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'tes3',
      name: 'Rajesh Nair',
      rating: 5,
      review: 'The Python web scrapers and lead bots they wrote automated what used to be a full-time 4-person job. They deployed it on AWS, and it runs like a clock. Extremely worth the investment.',
      company: 'Operations VP, Nair Logistic Solutions',
      photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'tes4',
      name: 'Lara Croft',
      rating: 5,
      review: "Elena's Figma designs and UI mockups were breath-taking. They translated a highly complex cryptocurrency concept into a sleek, clean mobile application.",
      company: 'Creative Lead, Croft Cryptology',
      photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
      createdAt: new Date().toISOString(),
    },
  ],
  Pricing: [
    {
      _id: 'pr1',
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
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'pr2',
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
      highlighted: true,
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'pr3',
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
      createdAt: new Date().toISOString(),
    },
  ],
  FAQ: [
    { _id: 'f1', question: 'How long does a typical full-stack project take?', answer: 'Simple Next.js landing portfolios or corporate websites take 2-4 weeks. Complex full-stack applications with database panels take 6-12 weeks.', order: 1, createdAt: new Date().toISOString() },
    { _id: 'f2', question: 'Do you design in Figma before coding?', answer: 'Yes! Elena Rostova, our Creative Director, maps user flows, wireframes, and complete high-fidelity desktop and mobile layouts in Figma.', order: 2, createdAt: new Date().toISOString() },
    { _id: 'f3', question: 'Can we edit the website content after launch?', answer: 'Absolutely. We deliver a custom-tailored Admin Dashboard CMS where you can manage portfolio projects, blogs, team profiles, and FAQs.', order: 3, createdAt: new Date().toISOString() },
    { _id: 'f4', question: 'What happens to file attachments sent via contact form?', answer: 'They are routed through our secure Multer pipeline and hosted on Cloudinary or served locally from our uploads folder.', order: 4, createdAt: new Date().toISOString() },
    { _id: 'f5', question: 'Do you offer hosting setup and cloud support?', answer: 'Yes, we deploy Next.js to Vercel, Node/Express to Render, and database to MongoDB Atlas by default, or setting up custom Docker/AWS.', order: 5, createdAt: new Date().toISOString() },
  ],
  Blog: [
    {
      _id: 'b1',
      title: 'Mastering Framer Motion in Next.js App Router',
      slug: 'mastering-framer-motion-in-next-js-app-router',
      excerpt: 'Learn how to construct buttery-smooth scroll-triggered entrance clips and responsive glass overlays.',
      content: `
# Core Scroll Physics with Framer Motion

Framer motion has revolutionized visual development in React. By using standard \`motion.div\` wrappers and attaching them to scroll states, we can build Awwwards-level components.

## Getting Started
First, install the motion package:
\`\`\`bash
npm i framer-motion
\`\`\`

## Tips for High Performance
- Avoid animating layout triggers like width, height, top, or left.
- Stick to transform matrices (\`x\`, \`y\`, \`scale\`, \`rotate\`) and \`opacity\`.
      `,
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
      author: 'Zephyr Croft',
      readTime: '4 Min Read',
      tags: ['Next.js', 'Framer Motion', 'Web Design'],
      createdAt: new Date().toISOString(),
    },
    {
      _id: 'b2',
      title: 'Serving Machine Learning Models via Node.js Rest APIs',
      slug: 'serving-machine-learning-models-via-node-js-rest-apis',
      excerpt: 'An in-depth guide on deploying Python NLP scripts and using Express child process streams.',
      content: `
# Interfacing Express and Python

Machine learning engineers often run into bottlenecks when attempting to host predictive neural nets on JavaScript environments.

## Microservices
Keep the environments separated. Deploy your Python code using a FastAPI microservice and query from Express.
      `,
      image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
      author: 'Aiden Vance',
      readTime: '6 Min Read',
      tags: ['Express', 'Python', 'Machine Learning'],
      createdAt: new Date().toISOString(),
    },
  ],
  Lead: [],
  Subscriber: []
};

// Initialize Admin Password Hashing
const initializeSeeds = () => {
  const salt = bcrypt.genSaltSync(10);
  DEFAULT_SEEDS.Admin[0].password = bcrypt.hashSync('admin123', salt);
};
initializeSeeds();

const getFilePath = (collection) => path.join(DATA_DIR, `${collection}.json`);

const readCollection = (collection) => {
  const filePath = getFilePath(collection);
  if (!fs.existsSync(filePath)) {
    const defaultData = DEFAULT_SEEDS[collection] || [];
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2));
    return defaultData;
  }
  try {
    const raw = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`Error reading ${collection}.json, resetting.`, err);
    return [];
  }
};

const writeCollection = (collection, data) => {
  const filePath = getFilePath(collection);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

const mockDb = {
  find: (collection, query = {}) => {
    let list = readCollection(collection);
    // Basic filter match
    return list.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  findOne: (collection, query = {}) => {
    const list = readCollection(collection);
    return list.find(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    }) || null;
  },

  findById: (collection, id) => {
    const list = readCollection(collection);
    return list.find(item => item._id === id) || null;
  },

  create: (collection, doc) => {
    const list = readCollection(collection);
    const newDoc = {
      _id: collection[0].toLowerCase() + Math.random().toString(36).substr(2, 9),
      ...doc,
      createdAt: new Date().toISOString()
    };
    list.push(newDoc);
    writeCollection(collection, list);
    return newDoc;
  },

  findByIdAndUpdate: (collection, id, update) => {
    const list = readCollection(collection);
    const index = list.findIndex(item => item._id === id);
    if (index === -1) return null;
    
    // Merge update
    list[index] = { ...list[index], ...update };
    writeCollection(collection, list);
    return list[index];
  },

  findByIdAndDelete: (collection, id) => {
    let list = readCollection(collection);
    const doc = list.find(item => item._id === id);
    if (!doc) return null;
    list = list.filter(item => item._id !== id);
    writeCollection(collection, list);
    return doc;
  },

  countDocuments: (collection, query = {}) => {
    const list = readCollection(collection);
    if (Object.keys(query).length === 0) return list.length;
    return list.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    }).length;
  }
};

module.exports = mockDb;
