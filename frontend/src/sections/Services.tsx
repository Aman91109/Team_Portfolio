'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';
import { API_BASE_URL } from '@/config';

// Fallback services if API is offline
const fallbackServices = [
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
  { name: 'UI/UX Design', description: 'Premium digital designs mapped in Figma utilizing futuristic Awwwards-style standards.', iconName: 'Layers', features: ['Figma Prototypes', 'User Journey Mapping', 'High-Fidelity Mockups', 'Component Libraries'] },
  { name: 'Graphic Design', description: 'High-end branding, custom vectors, promotional material, and corporate logos.', iconName: 'Palette', features: ['Vector Graphics', 'Branding Booklets', 'Digital Artwork', 'Social Kits'] },
  { name: 'SEO Optimization', description: 'Rigorous keyword research, speed auditing, and schema mappings to reach Page 1.', iconName: 'Search', features: ['Site Audit', 'Schema Mappings', 'PageSpeed Boost', 'Keyword Rank Tracking'] },
  { name: 'Hosting & Deployment', description: 'Vercel, Render, AWS, or Docker setup with CI/CD triggers and automated backups.', iconName: 'Cloud', features: ['GitHub Actions', 'Zero Downtime', 'SSL Certificate Config', 'Scalable Cluster Setup'] },
  { name: 'Maintenance', description: 'Round-the-clock support, dependency patches, speed audits, and content updates.', iconName: 'ShieldAlert', features: ['Daily Backups', 'Package Audits', 'Bug Resolutions', '24x7 Monitor Alerts'] },
];

export default function Services() {
  const [services, setServices] = useState(fallbackServices);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/services`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setServices(data.data);
        }
      } catch (err) {
        console.warn('Could not connect to services API. Using local fallbacks.');
      }
    };
    fetchServices();
  }, []);

  // Icon mapping helper
  const renderIcon = (iconName: string) => {
    // Check if Icon exists in Lucide Icons list, otherwise fallback to HelpCircle
    const IconComponent = (Icons as any)[iconName] || Icons.HelpCircle;
    return <IconComponent className="w-5 h-5 text-[#06B6D4]" />;
  };

  return (
    <section id="services" className="py-24 px-6 bg-[#0B1120]/30 relative">
      {/* Background spotlights */}
      <div className="absolute top-[20%] right-0 w-[450px] h-[450px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono tracking-widest text-[#8B5CF6] uppercase mb-2">// CAPABILITIES</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Next-Gen Services We Deliver
          </h2>
        </div>

        {/* Grid: 16 cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((svc, idx) => (
            <motion.div
              key={svc.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
            >
              <TiltCard className="p-6 h-full flex flex-col justify-between border border-white/5 bg-[#111720]/45">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                    {renderIcon(svc.iconName)}
                  </div>
                  <h3 className="font-space text-base font-bold text-white mb-2 tracking-wide">
                    {svc.name}
                  </h3>
                  <p className="font-poppins text-xs text-[#EDEDED]/50 leading-relaxed mb-4">
                    {svc.description}
                  </p>
                </div>
                {/* List of sub-features */}
                <div className="flex flex-wrap gap-1.5 mt-auto pt-4 border-t border-white/5">
                  {(svc.features || []).slice(0, 3).map((feat: string) => (
                    <span
                      key={feat}
                      className="text-[9px] font-mono uppercase tracking-wider text-[#06B6D4] bg-[#06B6D4]/5 border border-[#06B6D4]/10 px-2 py-0.5 rounded"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
