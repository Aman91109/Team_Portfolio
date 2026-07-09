'use client';

import React, { useState, useEffect } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import TiltCard from '../components/ui/TiltCard';

const fallbackPricing = [
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
    highlighted: true,
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

export default function Pricing() {
  const [plans, setPlans] = useState(fallbackPricing);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/pricing');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Sort plans by price
          const sorted = data.data.sort((a: any, b: any) => {
            const pA = parseFloat(a.price.replace(/[^0-9.]/g, '')) || 99999;
            const pB = parseFloat(b.price.replace(/[^0-9.]/g, '')) || 99999;
            return pA - pB;
          });
          setPlans(sorted);
        }
      } catch (err) {
        console.warn('Could not connect to pricing API. Using local fallbacks.');
      }
    };
    fetchPricing();
  }, []);

  const handleSmoothScroll = (selector: string) => {
    const target = document.querySelector(selector);
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 px-6 bg-[#0B1120]/30 relative overflow-hidden">
      {/* Background neon elements */}
      <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[550px] h-[550px] rounded-full bg-[#06B6D4]/5 blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="text-xs font-mono tracking-widest text-[#8B5CF6] uppercase mb-2">// COST TRANSPARENCY</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Select Your Scale
          </h2>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch max-w-6xl mx-auto">
          {plans.map((plan, idx) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="flex"
            >
              <TiltCard
                className={`p-8 w-full flex flex-col justify-between border relative bg-[#111720]/45 ${
                  plan.highlighted
                    ? 'border-[#8B5CF6] shadow-[0_0_30px_rgba(139,92,246,0.15)] ring-1 ring-[#8B5CF6]/50'
                    : 'border-white/5'
                }`}
              >
                {/* Highlights badge */}
                {plan.highlighted && (
                  <div className="absolute top-4 right-4 bg-[#8B5CF6] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1 rounded-full flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    RECOMMENDED
                  </div>
                )}

                <div>
                  <h3 className="font-space text-xl font-bold text-white uppercase tracking-wider mb-2">
                    {plan.name}
                  </h3>
                  
                  {/* Price */}
                  <div className="flex items-baseline gap-1 my-6">
                    <span className="text-4xl md:text-5xl font-extrabold font-space text-white tracking-tight">
                      {plan.price}
                    </span>
                    <span className="text-xs font-mono text-[#EDEDED]/40 uppercase tracking-widest">
                      / {plan.period}
                    </span>
                  </div>

                  <p className="text-[10px] font-mono tracking-widest text-[#06B6D4] uppercase mb-6">
                    INCLUSIONS:
                  </p>

                  {/* Bullet features list */}
                  <ul className="flex flex-col gap-4 mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-3 text-xs text-[#EDEDED]/70 leading-relaxed font-poppins">
                        <Check className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Call-to-action button */}
                <button
                  onClick={() => handleSmoothScroll('#contact')}
                  className={`w-full py-4 rounded-xl font-space text-xs uppercase tracking-widest font-bold transition-all duration-300 cursor-pointer ${
                    plan.highlighted
                      ? 'bg-[#8B5CF6] text-white hover:bg-[#7C3AED] hover:shadow-[0_0_15px_rgba(139,92,246,0.35)]'
                      : 'border border-white/10 bg-white/5 text-white hover:bg-white hover:text-black'
                  }`}
                >
                  Choose {plan.name}
                </button>
              </TiltCard>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
