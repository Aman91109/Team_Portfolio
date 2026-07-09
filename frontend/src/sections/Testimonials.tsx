'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Image from 'next/image';
import TiltCard from '../components/ui/TiltCard';
import { API_BASE_URL } from '@/config';

const fallbackTestimonials = [
  {
    _id: 'tes1',
    name: 'Marcus Thorne',
    rating: 5,
    review: 'The AI CRM portal this team built has completely streamlined our inbox management. Churn predictions are sitting at 92% accuracy, and customer satisfaction is up by 30%. Absolutely premium engineering.',
    company: 'CEO, Aura Analytics Corp',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150',
  },
  {
    _id: 'tes2',
    name: 'Sarah Jenkins',
    rating: 5,
    review: 'Working with them felt like hiring an elite design lab. The Next.js landing layouts they designed convert at a massive 18.5%, and the 3D scroll effects blew our board away.',
    company: 'Product Director, Jenkins Retail',
    photo: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=150',
  },
  {
    _id: 'tes3',
    name: 'Rajesh Nair',
    rating: 5,
    review: 'The Python web scrapers and lead bots they wrote automated what used to be a full-time 4-person job. They deployed it on AWS, and it runs like a clock. Extremely worth the investment.',
    company: 'Operations VP, Nair Logistic Solutions',
    photo: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=150',
  },
  {
    _id: 'tes4',
    name: 'Lara Croft',
    rating: 5,
    review: "Elena's Figma designs and UI mockups were breath-taking. They translated a highly complex cryptocurrency concept into a sleek, clean mobile application. Client reviews are excellent.",
    company: 'Creative Lead, Croft Cryptology',
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=150',
  },
];

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState(fallbackTestimonials);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/testimonials`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setTestimonials(data.data);
        }
      } catch (err) {
        console.warn('Could not connect to testimonials API. Using local fallbacks.');
      }
    };
    fetchTestimonials();
  }, []);

  const handleNext = () => {
    setActive((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-white/10'}`}
        />
      );
    }
    return stars;
  };

  const current = testimonials[active];

  return (
    <section className="py-24 px-6 bg-[#050816] relative overflow-hidden">
      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-[#3B82F6]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col items-center">
        
        {/* Section title */}
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// TESTIMONIALS</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Trusted By Elite Innovators
          </h2>
        </div>

        {/* Carousel Container */}
        <div className="w-full relative flex items-center justify-between gap-6 min-h-[360px]">
          
          {/* Left Arrow */}
          <button
            onClick={handlePrev}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#06B6D4] transition-colors cursor-pointer shrink-0 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Testimonial Active Slide (Framer animated) */}
          <div className="w-full max-w-2xl mx-auto">
            <AnimatePresence mode="wait">
              {current && (
                <motion.div
                  key={current._id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <TiltCard className="p-8 md:p-12 border border-white/5 bg-[#111720]/45 relative">
                    <Quote className="absolute top-8 right-8 w-10 h-10 text-white/5 pointer-events-none" />
                    
                    {/* Stars */}
                    <div className="flex gap-1 mb-6">
                      {renderStars(current.rating)}
                    </div>

                    {/* Review text */}
                    <p className="font-poppins text-sm md:text-base text-[#EDEDED]/80 leading-relaxed mb-8 italic">
                      &ldquo;{current.review}&rdquo;
                    </p>

                    {/* Client meta details */}
                    <div className="flex items-center gap-4">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden border border-white/10">
                        <Image
                          src={current.photo || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'}
                          alt={current.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="font-space text-sm font-bold text-white">{current.name}</span>
                        <span className="font-mono text-[9px] text-[#06B6D4] uppercase tracking-widest mt-0.5">
                          {current.company}
                        </span>
                      </div>
                    </div>
                  </TiltCard>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Right Arrow */}
          <button
            onClick={handleNext}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-[#06B6D4] transition-colors cursor-pointer shrink-0 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Mobile slide toggles (visible on small viewports) */}
        <div className="flex items-center gap-4 mt-8 md:hidden">
          <button onClick={handlePrev} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 cursor-pointer">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="font-mono text-[10px] text-white/30">
            {(active + 1).toString().padStart(2, '0')} / {testimonials.length.toString().padStart(2, '0')}
          </span>
          <button onClick={handleNext} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white/50 cursor-pointer">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
}
