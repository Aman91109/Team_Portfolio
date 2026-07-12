import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Shield } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-between">
      <Navbar />

      {/* Spotlight blur */}
      <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-[#3B82F6]/5 blur-[140px] pointer-events-none" />

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
          <div className="w-10 h-10 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4]">
            <Shield className="w-5 h-5" />
          </div>
          <h1 className="text-3xl md:text-5xl font-space font-bold text-white tracking-tight">
            Privacy Policy
          </h1>
        </div>

        <p className="font-mono text-[9px] tracking-widest text-[#EDEDED]/40 uppercase pb-6 border-b border-white/5 mb-8">
          LAST MODIFIED: JULY 8, 2026 // VERSION 1.0.0
        </p>

        {/* Text Body */}
        <div className="prose prose-invert max-w-none text-xs md:text-sm text-[#EDEDED]/60 leading-relaxed font-poppins flex flex-col gap-6">
          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">1. Data Nodes Collected</h2>
          <p>
            Pinaki Labs collects name, email address, phone, and company name when you voluntarily request project proposals through our contact interfaces or subscribe to our monthly insights letter. If you upload file attachments (like spec PDFs or wireframe images), they are processed using secure uploader pipelines.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">2. Processing & Utilization</h2>
          <p>
            We process lead requests strictly to verify budget tiers, arrange scheduled discovery calls, formulate design drafts, and coordinate code engineering agreements. Subscribers details are utilized solely to deliver insights newsletters. We do not distribute database records to third-party ad entities.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">3. Security Verification Logs</h2>
          <p>
            Our administration panels utilize JSON Web Tokens (JWT) mapped over secure cookies. Passwords are saved utilizing 10-round bcrypt encryption salts. Access level logs are restricted strictly to verified agency developers.
          </p>

          <h2 className="font-space text-lg font-bold text-white uppercase tracking-wider mt-4">4. Cloud Storage Pipelines</h2>
          <p>
            Image assets and file uploads are hosted on secure Cloudinary CDN structures or stored on encrypted local disk arrays. We retain data records only as long as required to coordinate developer agreements.
          </p>
        </div>

      </main>

      <Footer />
    </div>
  );
}
