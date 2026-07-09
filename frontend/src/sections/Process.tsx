'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, MessageSquare, Cpu, Palette, Code2, ShieldAlert, Cloud, HelpCircle } from 'lucide-react';

const processSteps = [
  {
    step: '01',
    name: 'Requirement Discussion',
    icon: MessageSquare,
    description: 'We hold exhaustive consultation sessions to examine your goals, establish scopes, define project deadlines, and formulate the budget tier.',
    lead: 'Elena Rostova (Creative Director)',
    color: '#06B6D4'
  },
  {
    step: '02',
    name: 'Planning & Architecture',
    icon: Cpu,
    description: 'Aiden structures database tables (Mongoose collections), outlines REST controllers, and plans AI/ML models to guarantee clean layouts.',
    lead: 'Aiden Vance (Systems Architect)',
    color: '#3B82F6'
  },
  {
    step: '03',
    name: 'UI/UX Visual Design',
    icon: Palette,
    description: 'Elena builds interactive prototypes in Figma, mapping user flows and creating glassmorphic dark-theme layouts that command premium authority.',
    lead: 'Elena Rostova (Creative Director)',
    color: '#8B5CF6'
  },
  {
    step: '04',
    name: 'Code Development',
    icon: Code2,
    description: 'Zephyr compiles the responsive Next.js 15 frontend with Framer Motion, and Aiden builds the Node/Express backend endpoints with JWT.',
    lead: 'Zephyr Croft (Lead Developer)',
    color: '#EC4899'
  },
  {
    step: '05',
    name: 'Rigorous Testing',
    icon: ShieldAlert,
    description: 'We run security checks on auth middlewares, debug files upload pipelines, audit API query speeds, and compile TS build checks.',
    lead: 'Zephyr & Aiden (Engineering)',
    color: '#F59E0B'
  },
  {
    step: '06',
    name: 'Deployment & Launch',
    icon: Cloud,
    description: 'Your frontend is deployed to Vercel, the Express server is hosted on Render, and MongoDB databases are mapped on Atlas CDN configurations.',
    lead: 'Aiden Vance (Systems Architect)',
    color: '#10B981'
  },
  {
    step: '07',
    name: 'Dedicated Support',
    icon: HelpCircle,
    description: 'Vortex provides round-the-clock maintenance agreements, dependency updates, weekly database backups, and feature enhancements.',
    lead: 'Vortex Support Engineers',
    color: '#6366F1'
  }
];

export default function Process() {
  return (
    <section id="process" className="py-24 px-6 bg-[#050816] relative overflow-hidden">
      {/* Aurora spotlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[150px] pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Section title */}
        <div className="flex flex-col mb-20 text-center items-center">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// METHODOLOGY</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            How We Translate Ideas To Production
          </h2>
        </div>

        {/* Timeline Path */}
        <div className="relative border-l border-white/10 ml-4 md:ml-32 pl-8 md:pl-16 flex flex-col gap-16">
          
          {processSteps.map((proc, idx) => {
            const IconComp = proc.icon;
            return (
              <motion.div
                key={proc.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative flex flex-col items-start"
              >
                {/* Step Circle Pin on the line */}
                <div
                  style={{ backgroundColor: proc.color }}
                  className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 md:w-8 md:h-8 rounded-full border-4 border-[#050816] flex items-center justify-center shadow-[0_0_15px_rgba(255,255,255,0.1)] z-10"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" />
                </div>

                {/* Floating Step Number Label (Desktop only) */}
                <div className="absolute -left-[140px] md:-left-[200px] top-0 hidden md:flex flex-col text-right w-24">
                  <span className="font-space text-3xl font-extrabold text-white/10 tracking-wider">
                    {proc.step}
                  </span>
                  <span className="font-mono text-[9px] text-[#EDEDED]/40 uppercase tracking-widest mt-1">
                    Phase {proc.step}
                  </span>
                </div>

                {/* Content Card */}
                <div className="w-full rounded-2xl glass-card p-6 md:p-8 bg-[#111720]/45 border border-white/5 relative">
                  {/* Decorative corner tag */}
                  <div
                    style={{ backgroundColor: `${proc.color}15`, color: proc.color, borderColor: `${proc.color}25` }}
                    className="absolute top-6 right-6 inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-mono uppercase tracking-widest"
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    Step {proc.step}
                  </div>

                  <h3 className="font-space text-lg md:text-xl font-bold text-white mb-3">
                    {proc.name}
                  </h3>

                  <p className="font-poppins text-xs md:text-sm text-[#EDEDED]/60 leading-relaxed mb-4 max-w-2xl">
                    {proc.description}
                  </p>

                  {/* Leader Node */}
                  <div className="flex items-center gap-2 text-[10px] md:text-xs font-mono text-[#06B6D4] bg-[#06B6D4]/5 px-3 py-1.5 rounded-lg w-max border border-[#06B6D4]/15">
                    <span className="text-[#EDEDED]/40">PHASE LEAD:</span>
                    {proc.lead}
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
