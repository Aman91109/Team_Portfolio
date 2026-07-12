'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Target, Eye, Users } from 'lucide-react';
import TiltCard from '../components/ui/TiltCard';

const coreValues = [
  {
    icon: Target,
    title: 'Mission Oriented',
    description: 'We translate complex backend workflows and frontend interactive frameworks into straightforward growth vectors for your business operations.',
    color: '#06B6D4'
  },
  {
    icon: Eye,
    title: 'Clear Vision',
    description: 'Aiming to establish the high standard for client-first full stack engineering, providing scalable solutions with zero tech debt.',
    color: '#8B5CF6'
  },
  {
    icon: ShieldCheck,
    title: 'Strict Security',
    description: 'Every project goes through rigorous JWT authentication mapping, secure role checks, and database validation processes.',
    color: '#10B981'
  },
  {
    icon: Users,
    title: 'Transparent Culture',
    description: 'We believe in maintaining documentation integrity, active communication pipelines, and post-delivery maintenance setups.',
    color: '#3B82F6'
  }
];

export default function About() {
  return (
    <section id="about" className="py-24 px-6 bg-[#050816] relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#3B82F6]/5 blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// WHO WE ARE</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            An Elite Collective of Digital Engineers
          </h2>
        </div>

        {/* Grid: Left - Story, Right - Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Text Block */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <h3 className="font-space text-xl font-semibold text-white tracking-wide">
              We design and code digital structures that solve business bottlenecks.
            </h3>
            
            <p className="font-poppins text-sm text-[#EDEDED]/60 leading-relaxed">
              Pinaki Labs was founded by three creative engineers who got tired of cookie-cutter software solutions. We realized that elite agencies were gatekeeping high-end visual designs (Awwwards-tier) from growing enterprises, while traditional software houses delivered boring, slow platforms.
            </p>

            <p className="font-poppins text-sm text-[#EDEDED]/60 leading-relaxed">
              We bridged that gap. By combining next-generation frontend frameworks (Next.js 15, React, Three.js) with robust backend rest endpoints, we build products that look like high-end visual art but operate with high reliability.
            </p>

            {/* Glowing Quote Banner */}
            <div className="border-l-2 border-[#8B5CF6] pl-4 py-2 mt-4 bg-[#8B5CF6]/5 rounded-r-xl">
              <p className="font-space text-xs italic text-[#EDEDED]/80">
                &ldquo;We don&apos;t build minimum viable products. We build digital command consoles that command market authority and instantly lock in client trust.&rdquo;
              </p>
              <span className="block font-mono text-[10px] text-[#8B5CF6] mt-2 uppercase tracking-widest">— PINAKI TEAM FOUNDERS</span>
            </div>
          </div>

          {/* Right Grid: 4 Core Values */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <motion.div
                  key={val.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-100px' }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                >
                  <TiltCard className="p-8 h-full flex flex-col justify-between border border-white/5 bg-[#111720]/40">
                    <div>
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-6 bg-white/5 border border-white/10" style={{ color: val.color }}>
                        <IconComp className="w-5 h-5" />
                      </div>
                      <h4 className="font-space text-lg font-bold text-white mb-3">
                        {val.title}
                      </h4>
                      <p className="font-poppins text-xs text-[#EDEDED]/50 leading-relaxed">
                        {val.description}
                      </p>
                    </div>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
