import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Scale } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-between">
      <Navbar />

      {/* Spotlight blur */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#8B5CF6]/5 blur-[140px] pointer-events-none" />

      <main className="max-w-3xl mx-auto px-6 pt-32 pb-24 z-10 w-full">
        
        {/* Back Link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#06B6D4] uppercase hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Title */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6]">
            <Scale className="w-5 h-5" />
          </div>
          <h1 className="text-3xl md:text-5xl font-space font-bold text-white tracking-tight">
            Terms & Conditions
          </h1>
        </div>

        <p className="font-mono text-[9px] tracking-widest text-[#EDEDED]/40 uppercase pb-6 border-b border-white/5 mb-8">
          EFFECTIVE DATE: JULY 8, 2026 // VERSION 1.0.0
        </p>

        {/* Text Body */}
        <div className="prose prose-invert max-w-none text-xs md:text-sm text-[#EDEDED]/60 leading-relaxed font-poppins flex flex-col gap-6">
          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">1. Agreement of Engagements</h2>
          <p>
            By submitting a project inquiry or selecting one of our pricing tiers (Starter, Professional, Enterprise), you agree to initiate a project discussion. No binding code development contracts are established until a scope specification agreement has been co-signed by both the client and a representative of Vortex Labs.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">2. Figma Designs & Wireframes</h2>
          <p>
            Elena Rostova manages all project user journey blueprints and Figma prototypes. All draft wireframes delivered during the design phase remain the property of Vortex Labs until full payment milestones are completed, upon which full Figma file ownership transitions to the client.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">3. Source Code Licenses</h2>
          <p>
            Unless agreed otherwise in writing, we build systems using MIT-compatible next-generation frameworks (Next.js, Express, React, Mongoose). Upon final deployment hand-off (Vercel deployment triggers, Render server maps, Atlas collection seeds), the custom source code license is fully assigned to the client.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">4. Maintenance Commitments</h2>
          <p>
            Starter plans include 3 months support, Professional includes 6 months support, and Enterprise packages offer customizable support matrices. Maintenance support includes library security patches, API endpoint diagnostics, and database query tuning. Any changes to layout shapes or database schemas are subject to incremental hourly coding estimates.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
