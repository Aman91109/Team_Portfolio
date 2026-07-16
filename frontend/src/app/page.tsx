'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Section Imports
import Navbar from '@/components/ui/Navbar';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Services from '@/sections/Services';
import Team from '@/sections/Team';
import Portfolio from '@/sections/Portfolio';
import Process from '@/sections/Process';

import FAQ from '@/sections/FAQ';
import BlogSection from '@/sections/BlogSection';
import Contact from '@/sections/Contact';
import Footer from '@/components/ui/Footer';
import PinakiChatbot from '@/components/ui/PinakiChatbot';
import ElevenLabsVoiceAgent from '@/components/ui/ElevenLabsVoiceAgent';

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* 1. Global Navigation Bar */}
      <Navbar />

      {/* 2. Structured Sections (Sequential Flow) */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Services />
        <Team />
        <Portfolio />
        <Process />
        <FAQ />
        <BlogSection />
        <Contact />
      </main>

      {/* 3. Global Footer */}
      <Footer />

      {/* ==========================================
         FLOATING LAYER: INTERACTIVE ELEMENTS
         ========================================== */}

      {/* A. Back To Top Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              onClick={scrollToTop}
              className="w-11 h-11 rounded-full border border-white/10 bg-[#111720]/80 backdrop-blur-md flex items-center justify-center text-white hover:text-[#06B6D4] hover:border-[#06B6D4] transition-colors cursor-pointer shadow-lg"
            >
              <ArrowUp className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* B. Pinaki AI Chatbot */}
      <PinakiChatbot />

      {/* C. ElevenLabs AI Voice Assistant */}
      <ElevenLabsVoiceAgent />
    </>
  );
}
