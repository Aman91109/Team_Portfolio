'use client';

import React, { useState, useEffect } from 'react';
import { ReactLenis } from 'lenis/react';
import Preloader from '../ui/Preloader';
import CustomCursor from '../ui/CustomCursor';
import ThreeBackground from '../canvas/ThreeBackground';

interface ClientLayoutProps {
  children: React.ReactNode;
}

export default function ClientLayout({ children }: ClientLayoutProps) {
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-[#050816] flex items-center justify-center">
        <div className="text-[#8B5CF6] text-xl font-mono tracking-widest animate-pulse">
          BOOTING PINAKI_
        </div>
      </div>
    );
  }

  return (
    <ReactLenis root options={{ duration: 1.2, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true }}>
      {/* Cinematic Load Overlay */}
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      
      {/* 3D Interactive WebGL Layer (underneath elements) */}
      <div className="fixed inset-0 -z-50 pointer-events-none w-screen h-screen">
        <ThreeBackground />
      </div>

      {/* Global Aesthetics Overlay: Cyber Grid + Noise */}
      <div className="fixed inset-0 -z-40 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,3px_100%]" />
      <div className="fixed inset-0 -z-40 pointer-events-none opacity-[0.15] bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.15),transparent_70%)]" />

      {/* Mouse Spotlights/Followers */}
      <CustomCursor />

      {/* Main Content Node */}
      <div className={`transition-opacity duration-1000 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        {children}
      </div>
    </ReactLenis>
  );
}
