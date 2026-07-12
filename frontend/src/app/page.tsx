'use client';

import React, { useState, useEffect } from 'react';
import { ArrowUp, MessageCircle, X, Send } from 'lucide-react';
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

export default function Home() {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Greetings, human. I am Pinaki-AI. How can I assist your digital engineering journey today?' },
  ]);
  const [inputVal, setInputVal] = useState('');

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

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const userMsg = inputVal.trim();
    setChatMessages((prev) => [...prev, { sender: 'user', text: userMsg }]);
    setInputVal('');

    // Simulate high-tech bot response
    setTimeout(() => {
      let botText = "Processing data nodes... Let me fetch Elena or Aiden to coordinate this request. What is your email?";
      if (userMsg.toLowerCase().includes('price') || userMsg.toLowerCase().includes('cost')) {
        botText = "Our full-stack implementation blocks start at $4,999, fully integrated. Tell me your email so we can quote your spec.";
      } else if (userMsg.toLowerCase().includes('portfolio') || userMsg.toLowerCase().includes('work')) {
        botText = "We have delivered over 120 custom builds. Explore the /#portfolio grid, or send your requirements file to Hello@pinaki.agency.";
      } else if (userMsg.toLowerCase().includes('email') || userMsg.includes('@')) {
        botText = "Coordinates locked. Aiden Vance will follow up shortly at your email to arrange our discovery meeting.";
      }
      setChatMessages((prev) => [...prev, { sender: 'bot', text: botText }]);
    }, 1000);
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
         FLOATING LAYER: INTERACTIVE COMM CHANNELS
         ========================================== */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-4 items-center">
        
        {/* A. Back To Top (Framer fade-in) */}
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

        {/* B. Simulated Live Chat Widget Toggle */}
        <button
          onClick={() => setChatOpen(!chatOpen)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 active:scale-95 transition-transform cursor-pointer relative"
        >
          {chatOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
          
          {/* Notification bubble indicator */}
          {!chatOpen && (
            <span className="absolute top-0 right-0 w-3.5 h-3.5 bg-[#06B6D4] rounded-full border-2 border-[#050816] animate-pulse" />
          )}
        </button>

        {/* C. Live Chat Panel box Drawer */}
        <AnimatePresence>
          {chatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.95 }}
              className="absolute bottom-16 right-0 w-[320px] h-[400px] rounded-2xl border border-white/10 bg-[#0B1120]/95 backdrop-blur-xl flex flex-col justify-between overflow-hidden shadow-2xl"
            >
              {/* Header */}
              <div className="bg-[#111720] border-b border-white/5 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="font-space text-xs font-bold text-white tracking-widest uppercase">PINAKI NEURAL BOT</span>
                </div>
                <button onClick={() => setChatOpen(false)} className="text-white/40 hover:text-white transition-colors cursor-pointer">
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Message Log */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3 scrollbar-hide text-xs font-poppins">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`max-w-[80%] p-3 rounded-xl leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#8B5CF6]/20 border border-[#8B5CF6]/30 text-white ml-auto rounded-tr-none'
                        : 'bg-white/5 border border-white/5 text-[#EDEDED]/80 mr-auto rounded-tl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                ))}
              </div>

              {/* Input Form */}
              <form onSubmit={handleSendChat} className="bg-[#111720] border-t border-white/5 p-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Ask Pinaki-AI..."
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="flex-1 bg-[#050816] border border-white/5 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                />
                <button type="submit" className="w-8 h-8 rounded-xl bg-[#06B6D4] text-white flex items-center justify-center hover:scale-105 transition-transform cursor-pointer">
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
}
