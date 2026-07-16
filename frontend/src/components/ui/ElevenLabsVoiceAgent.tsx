'use client';

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mic, X, Phone } from 'lucide-react';

// ─────────────────────────────────────────────────────────
//  ELEVENLABS VOICE AGENT — AI Voice Assistant Widget
//  Embeds the ElevenLabs Conversational AI widget with
//  a premium floating UI that matches the Pinaki aesthetic.
// ─────────────────────────────────────────────────────────

const AGENT_ID = 'agent_1601kxmrsz2dfp8amphvhg2rbkkr';

export default function ElevenLabsVoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  // Load the ElevenLabs convai widget script once
  useEffect(() => {
    if (document.querySelector('script[src="https://elevenlabs.io/convai-widget/index.js"]')) {
      setScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://elevenlabs.io/convai-widget/index.js';
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => setScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      // Don't remove the script on unmount since the widget may need it
    };
  }, []);

  return (
    <>
      {/* ─── Voice Agent Panel ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.85 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.85 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed bottom-24 left-6 z-50 w-[340px] sm:w-[380px] rounded-2xl border border-white/10 bg-[#0B1120]/98 backdrop-blur-2xl overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.15)]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0B1120] to-[#111720] border-b border-white/5 px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.3)] relative">
                  <Mic className="w-5 h-5 text-white" />
                  {/* Live pulse indicator */}
                  <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-green-400 rounded-full border-[1.5px] border-[#0B1120] animate-pulse" />
                </div>
                <div>
                  <span className="font-space text-sm font-bold text-white tracking-wide flex items-center gap-1.5">
                    Pinaki Voice AI
                    <Phone className="w-3 h-3 text-[#06B6D4]" />
                  </span>
                  <span className="flex items-center gap-1.5 text-[9px] font-mono text-[#06B6D4] tracking-wider uppercase">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
                    Powered by ElevenLabs
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Widget Container */}
            <div className="p-5 flex flex-col items-center gap-4">
              {/* Decorative audio wave visualization */}
              <div className="flex items-end gap-[3px] h-8 mb-1">
                {[...Array(16)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-[3px] rounded-full bg-gradient-to-t from-[#06B6D4] to-[#8B5CF6]"
                    animate={{
                      height: [
                        `${8 + Math.random() * 12}px`,
                        `${16 + Math.random() * 16}px`,
                        `${8 + Math.random() * 12}px`,
                      ],
                    }}
                    transition={{
                      duration: 0.8 + Math.random() * 0.6,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 0.05,
                    }}
                  />
                ))}
              </div>

              {/* Info Text */}
              <div className="text-center space-y-2">
                <p className="text-xs text-white/70 font-poppins leading-relaxed">
                  Talk to our <span className="text-[#06B6D4] font-semibold">AI Voice Assistant</span> to learn about our services, pricing, and process.
                </p>
                <p className="text-[10px] text-white/30 font-mono tracking-wide uppercase">
                  Click the button below to start speaking
                </p>
              </div>

              {/* ElevenLabs Widget */}
              <div
                ref={widgetRef}
                className="w-full flex justify-center items-center min-h-[80px]"
              >
                {scriptLoaded ? (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: `<elevenlabs-convai agent-id="${AGENT_ID}"></elevenlabs-convai>`,
                    }}
                  />
                ) : (
                  <div className="flex items-center gap-2 text-white/30 text-xs font-mono">
                    <motion.div
                      className="w-4 h-4 border-2 border-[#06B6D4]/40 border-t-[#06B6D4] rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                    Loading voice agent...
                  </div>
                )}
              </div>

              {/* Security Badge */}
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.05]">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400/70" />
                <span className="text-[9px] font-mono text-white/25 tracking-wider uppercase">
                  Encrypted • Secure Connection
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Toggle Button (Left side) ─── */}
      <div className="fixed bottom-6 left-6 z-50">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] flex items-center justify-center text-white shadow-[0_0_25px_rgba(6,182,212,0.3)] cursor-pointer relative group"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Mic className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pulse rings when closed */}
          {!isOpen && (
            <>
              <span className="absolute inset-0 rounded-full bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] animate-ping opacity-20" />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-400 rounded-full border-2 border-[#050816] animate-pulse" />
            </>
          )}

          {/* Hover tooltip */}
          <span className="absolute bottom-full left-0 mb-2 px-3 py-1.5 rounded-lg bg-[#111720] border border-white/10 text-[10px] font-mono text-white/70 tracking-wider uppercase whitespace-nowrap opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all pointer-events-none">
            Talk to Pinaki AI
          </span>
        </motion.button>
      </div>
    </>
  );
}
