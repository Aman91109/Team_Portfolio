import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Clock, Calendar, User } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

const fallbackBlogs = [
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
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'b2',
    title: 'Serving Machine Learning Models via Node.js Rest APIs',
    slug: 'serving-machine-learning-models-via-node-js-rest-apis',
    excerpt: 'An in-depth guide on deploying Python NLP scripts and using Express child process streams.',
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
    author: 'Aiden Vance',
    readTime: '6 Min Read',
    tags: ['Express', 'Python', 'Machine Learning'],
    createdAt: new Date().toISOString(),
  },
];

async function getBlogPost(slug: string) {
  try {
    const res = await fetch(`http://localhost:5000/api/public/blogs/${slug}`, {
      next: { revalidate: 60 } // Cache and revalidate
    });
    const data = await res.json();
    if (data.success && data.data) {
      return data.data;
    }
  } catch (err) {
    console.warn(`Could not connect to blog details API for ${slug}. Loading fallback.`);
  }

  // Fallback match
  return fallbackBlogs.find(b => b.slug === slug) || null;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const blog = await getBlogPost(slug);

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#050816] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto my-auto text-center p-6">
          <h2 className="text-3xl font-space font-bold text-white mb-4">Post Not Found</h2>
          <p className="text-xs text-[#EDEDED]/50 mb-6">The requested insights entry does not exist on our servers.</p>
          <Link href="/#blog" className="px-5 py-2.5 rounded-lg bg-[#06B6D4] text-white font-space text-xs uppercase tracking-widest hover:bg-[#0891B2]">
            Back to Home
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-between">
      <Navbar />

      {/* Floating neon glow */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[150px] pointer-events-none" />

      {/* Article Content Layout */}
      <article className="max-w-3xl mx-auto px-6 pt-32 pb-24 z-10 w-full">
        
        {/* Back Link */}
        <Link
          href="/#blog"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#06B6D4] uppercase hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Intel Stream
        </Link>

        {/* Categories / Tags */}
        <div className="flex gap-2 mb-4">
          {(blog.tags || []).map((tag: string) => (
            <span key={tag} className="text-[9px] font-mono uppercase tracking-widest text-[#8B5CF6] bg-[#8B5CF6]/5 border border-[#8B5CF6]/15 px-2.5 py-0.5 rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-5xl font-space font-bold text-white leading-tight mb-6">
          {blog.title}
        </h1>

        {/* Metadata */}
        <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-[#EDEDED]/45 uppercase pb-8 border-b border-white/5 mb-8">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-[#06B6D4]" />
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric'
            })}
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-[#8B5CF6]" />
            {blog.readTime}
          </div>
          <div className="flex items-center gap-1.5">
            <User className="w-4 h-4 text-white/50" />
            BY {blog.author}
          </div>
        </div>

        {/* Giant Cover photo */}
        <div className="relative w-full h-[250px] md:h-[420px] rounded-2xl overflow-hidden mb-12 border border-white/5">
          <Image
            src={blog.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'}
            alt={blog.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>

        {/* Markdown Rich Body Text */}
        <div className="prose prose-invert max-w-none text-sm md:text-base text-[#EDEDED]/70 leading-relaxed font-poppins flex flex-col gap-6">
          {/* Simple custom renderer for preloaded markdown headings and code blocks */}
          {blog.content.split('\n\n').map((para: string, idx: number) => {
            if (para.startsWith('# ')) {
              return <h2 key={idx} className="font-space text-2xl md:text-3xl font-bold text-white mt-8 mb-2 tracking-tight">{para.replace('# ', '')}</h2>;
            }
            if (para.startsWith('## ')) {
              return <h3 key={idx} className="font-space text-xl md:text-2xl font-semibold text-white mt-6 mb-2 tracking-tight">{para.replace('## ', '')}</h3>;
            }
            if (para.startsWith('```')) {
              const lines = para.split('\n');
              const code = lines.slice(1, -1).join('\n');
              return (
                <pre key={idx} className="bg-[#111720] border border-white/5 rounded-xl p-5 overflow-x-auto font-mono text-xs text-[#06B6D4] my-4 leading-relaxed">
                  <code>{code}</code>
                </pre>
              );
            }
            return <p key={idx} className="mb-4">{para}</p>;
          })}
        </div>

      </article>

      <Footer />
    </div>
  );
}
