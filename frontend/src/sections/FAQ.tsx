'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const fallbackFAQs = [
  { _id: 'f1', question: 'How long does a typical full-stack project take?', answer: 'Simple Next.js landing portfolios or corporate websites take 2-4 weeks. Complex full-stack applications with database panels take 6-12 weeks.', order: 1 },
  { _id: 'f2', question: 'Do you design in Figma before coding?', answer: 'Yes! Elena Rostova, our Creative Director, maps user flows, wireframes, and complete high-fidelity desktop and mobile layouts in Figma.', order: 2 },
  { _id: 'f3', question: 'Can we edit the website content after launch?', answer: 'Absolutely. We deliver a custom-tailored Admin Dashboard CMS where you can manage portfolio projects, blogs, team profiles, and FAQs.', order: 3 },
  { _id: 'f4', question: 'What happens to file attachments sent via contact form?', answer: 'They are routed through our secure Multer pipeline and hosted on Cloudinary or served locally from our uploads folder.', order: 4 },
  { _id: 'f5', question: 'Do you offer hosting setup and cloud support?', answer: 'Yes, we deploy Next.js to Vercel, Node/Express to Render, and database to MongoDB Atlas by default, or setting up custom Docker/AWS.', order: 5 },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState(fallbackFAQs);
  const [openIndex, setOpenIndex] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/public/faqs');
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          // Sort by order parameter
          const sorted = data.data.sort((a: any, b: any) => a.order - b.order);
          setFaqs(sorted);
        }
      } catch (err) {
        console.warn('Could not connect to FAQ API. Using local fallbacks.');
      }
    };
    fetchFAQs();
  }, []);

  const toggleFAQ = (id: string) => {
    if (openIndex === id) {
      setOpenIndex(null);
    } else {
      setOpenIndex(id);
    }
  };

  return (
    <section id="faq" className="py-24 px-6 bg-[#050816] relative overflow-hidden">
      {/* Glow spot */}
      <div className="absolute bottom-[10%] right-[10%] w-[350px] h-[350px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// FAQ ACCORDION</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Frequently Asked Queries
          </h2>
        </div>

        {/* Accordion list */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq) => {
            const isOpen = openIndex === faq._id;
            return (
              <div
                key={faq._id}
                className="rounded-2xl border border-white/5 bg-[#111720]/45 overflow-hidden transition-all duration-300"
              >
                {/* Header/Question Trigger */}
                <button
                  onClick={() => toggleFAQ(faq._id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center gap-4 pr-4">
                    <HelpCircle className="w-5 h-5 text-[#06B6D4] shrink-0" />
                    <span className="font-space text-sm md:text-base font-bold text-white tracking-wide">
                      {faq.question}
                    </span>
                  </div>
                  <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center text-[#EDEDED]/60 shrink-0">
                    {isOpen ? <Minus className="w-4 h-4 text-[#8B5CF6]" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Animated expandable content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: 'easeInOut' }}
                    >
                      <div className="p-6 pt-0 border-t border-white/5 font-poppins text-xs md:text-sm text-[#EDEDED]/60 leading-relaxed pl-15">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
