'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, X, Calendar, User, Layers } from 'lucide-react';
import Image from 'next/image';
import TiltCard from '../components/ui/TiltCard';
import { API_BASE_URL } from '@/config';

const categories = [
  'All',
  'Web Apps',
  'AI Projects',
  'ML Projects',
  'Business Websites',
  'Mobile Apps',
  'Dashboards',
  'Admin Panels',
];

const fallbackProjects = [
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
  },
];

interface ProjectType {
  _id: string;
  title: string;
  description: string;
  images: string[];
  technology: string[];
  category: string;
  client: string;
  duration: string;
  github: string;
  liveDemo: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<ProjectType[]>(fallbackProjects);
  const [selectedCat, setSelectedCat] = useState('All');
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const url = `${API_BASE_URL}/api/public/portfolio${
          selectedCat !== 'All' ? `?category=${encodeURIComponent(selectedCat)}` : ''
        }`;
        const res = await fetch(url);
        const data = await res.json();
        if (data.success && data.data) {
          setProjects(data.data);
        }
      } catch (err) {
        console.warn('Could not connect to portfolio API. Using local fallbacks.');
      }
    };
    fetchPortfolio();
  }, [selectedCat]);

  return (
    <section id="portfolio" className="py-24 px-6 bg-[#0B1120]/30 relative">
      <div className="max-w-7xl mx-auto">
        
        {/* Section title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// OUR WORK</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Proof of Concept Showcases
          </h2>
        </div>

        {/* Category Filters Carousel (Row scrollable on mobile) */}
        <div className="flex gap-3 overflow-x-auto pb-6 scrollbar-hide select-none mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-5 py-2.5 rounded-full font-space text-xs uppercase tracking-widest border transition-all duration-300 whitespace-nowrap cursor-pointer ${
                selectedCat === cat
                  ? 'bg-[#06B6D4] border-[#06B6D4] text-white shadow-[0_0_15px_rgba(6,182,212,0.3)]'
                  : 'bg-[#111720]/40 border-white/5 text-[#EDEDED]/60 hover:text-white hover:border-white/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid layout */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {projects.map((proj) => (
              <motion.div
                key={proj._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setActiveProject(proj)}
                className="cursor-pointer group"
              >
                <TiltCard className="h-full flex flex-col justify-between border border-white/5 bg-[#111720]/45">
                  <div>
                    {/* Cover photo */}
                    <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-6 border border-white/5">
                      <Image
                        src={proj.images && proj.images[0] ? proj.images[0] : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'}
                        alt={proj.title}
                        fill
                        sizes="(max-w-720px) 100vw, 30vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#050816]/30 group-hover:bg-[#050816]/0 transition-colors" />
                    </div>

                    <span className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase">
                      {proj.category}
                    </span>
                    <h3 className="font-space text-lg font-bold text-white mt-1 mb-3 group-hover:text-[#06B6D4] transition-colors">
                      {proj.title}
                    </h3>
                    <p className="font-poppins text-xs text-[#EDEDED]/50 leading-relaxed line-clamp-3">
                      {proj.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-6 pt-4 border-t border-white/5">
                    {(proj.technology || []).slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[9px] font-mono text-[#EDEDED]/50 bg-white/5 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* 3D Glass Showcase Modal Drawer */}
      <AnimatePresence>
        {activeProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-[#050816]/80 backdrop-blur-md"
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto rounded-2xl border border-white/10 bg-[#0B1120]/90 p-6 md:p-10 shadow-2xl scrollbar-hide"
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveProject(null)}
                className="absolute top-4 right-4 text-[#EDEDED]/60 hover:text-white border border-white/10 p-1.5 rounded-full hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title & Category */}
              <div className="mb-6">
                <span className="text-xs font-mono text-[#06B6D4] uppercase tracking-widest">
                  {activeProject.category}
                </span>
                <h2 className="text-2xl md:text-4xl font-space font-bold text-white mt-1">
                  {activeProject.title}
                </h2>
              </div>

              {/* Cover Image Slider / Single Image */}
              <div className="relative w-full h-[280px] md:h-[400px] rounded-xl overflow-hidden mb-8 border border-white/5">
                <Image
                  src={
                    activeProject.images && activeProject.images[0]
                      ? activeProject.images[0]
                      : 'https://images.unsplash.com/photo-1551288049-bebda4e38f71'
                  }
                  alt={activeProject.title}
                  fill
                  sizes="100vw"
                  className="object-cover"
                />
              </div>

              {/* Info Matrix & Description */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-8">
                {/* Description Column */}
                <div className="md:col-span-8">
                  <h4 className="font-space text-sm font-semibold text-white uppercase tracking-wider mb-3">
                    Project Overview
                  </h4>
                  <p className="font-poppins text-sm text-[#EDEDED]/60 leading-relaxed">
                    {activeProject.description}
                  </p>
                </div>

                {/* Specs Column */}
                <div className="md:col-span-4 flex flex-col gap-4 bg-white/5 border border-white/5 p-5 rounded-xl">
                  <div className="flex items-center gap-3">
                    <User className="w-4 h-4 text-[#06B6D4]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#EDEDED]/45 uppercase">Client</span>
                      <span className="text-xs font-space font-medium text-white">{activeProject.client}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Calendar className="w-4 h-4 text-[#8B5CF6]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#EDEDED]/45 uppercase">Duration</span>
                      <span className="text-xs font-space font-medium text-white">{activeProject.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Layers className="w-4 h-4 text-[#10B981]" />
                    <div className="flex flex-col">
                      <span className="text-[9px] font-mono text-[#EDEDED]/45 uppercase">Tech Stack</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {activeProject.technology.map((tech) => (
                          <span key={tech} className="text-[8px] font-mono bg-white/5 px-1.5 py-0.5 rounded text-[#EDEDED]/80">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons Links */}
              <div className="flex flex-wrap gap-4 pt-6 border-t border-white/5">
                {activeProject.github && (
                  <a
                    href={activeProject.github}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 text-white font-space text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                      <path d="M9 18c-4.51 2-5-2-7-2" />
                    </svg>
                    GitHub Repository
                  </a>
                )}
                {activeProject.liveDemo && (
                  <a
                    href={activeProject.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="neon-button inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#06B6D4] text-white font-space text-xs uppercase tracking-widest hover:bg-[#0891B2] hover:shadow-[0_0_15px_rgba(6,182,212,0.3)] transition-all"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Launch Live Demo
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
