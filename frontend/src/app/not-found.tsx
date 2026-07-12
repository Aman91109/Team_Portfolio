import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-between relative overflow-hidden">
      <Navbar />

      {/* Background neon blur */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      {/* Main visual box */}
      <div className="my-auto mx-auto w-full max-w-lg px-6 z-10 text-center flex flex-col items-center">
        <div className="w-14 h-14 rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 flex items-center justify-center text-[#06B6D4] mb-6">
          <Terminal className="w-6 h-6 animate-pulse" />
        </div>
        
        <h1 className="font-space text-8xl font-bold text-white tracking-tighter mb-4">
          404
        </h1>
        
        <h2 className="font-space text-lg font-semibold text-[#06B6D4] uppercase tracking-widest mb-3">
          Error // Directory Node Not Found
        </h2>
        
        <p className="font-poppins text-xs text-[#EDEDED]/50 leading-relaxed mb-8 max-w-sm">
          The server could not resolve the directory path or code segment requested. Ensure you have typed the address correctly or return to base node.
        </p>

        <Link
          href="/"
          className="neon-button inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#8B5CF6] text-white font-space text-xs uppercase tracking-widest hover:bg-[#7C3AED] hover:shadow-[0_0_15px_rgba(139,92,246,0.3)] transition-all"
        >
          <ArrowLeft className="w-4 h-4" />
          Return to Base Node
        </Link>
      </div>

      <Footer />
    </div>
  );
}
