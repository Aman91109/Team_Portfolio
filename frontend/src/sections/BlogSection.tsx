'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TiltCard from '../components/ui/TiltCard';
import { API_BASE_URL } from '@/config';

const fallbackBlogs = [
  {
    _id: 'b1',
    title: 'Mastering Framer Motion in Next.js App Router',
    slug: 'mastering-framer-motion-in-next-js-app-router',
    excerpt: 'Learn how to construct buttery-smooth scroll-triggered entrance clips and responsive glass overlays.',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800',
    author: 'Zephyr Croft',
    readTime: '4 Min Read',
    tags: ['Next.js', 'Framer Motion', 'Web Design'],
    createdAt: new Date().toISOString(),
  },
  {
    _id: 'b2',
    title: 'Serving Machine Learning Models via Node.js Rest APIs',
    slug: 'serving-machine-learning-models-via-node-js-rest-apis',
    excerpt: 'An in-depth guide on deploying Python NLP scripts and using Express child process streams.',
    image: 'https://images.unsplash.com/photo-1527474305487-b87b222841cc?auto=format&fit=crop&q=80&w=800',
    author: 'Aiden Vance',
    readTime: '6 Min Read',
    tags: ['Express', 'Python', 'Machine Learning'],
    createdAt: new Date().toISOString(),
  },
];

interface BlogType {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  author: string;
  readTime: string;
  tags: string[];
  createdAt: string;
}

export default function BlogSection() {
  const [blogs, setBlogs] = useState<BlogType[]>(fallbackBlogs);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch(`${API_BASE_URL}/api/public/blogs`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) {
          setBlogs(data.data);
        }
      } catch (err) {
        console.warn('Could not connect to blogs API. Using local fallbacks.');
      }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-24 px-6 bg-[#0B1120]/30 relative overflow-hidden">
      {/* Background neon spot */}
      <div className="absolute top-[20%] left-[5%] w-[400px] h-[400px] rounded-full bg-[#06B6D4]/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col mb-16">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// INTEL STREAM</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Latest Agency Insights
          </h2>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {blogs.slice(0, 2).map((blog, idx) => (
            <motion.div
              key={blog._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="group"
            >
              <Link href={`/blog/${blog.slug}`}>
                <TiltCard className="p-6 h-full flex flex-col justify-between border border-white/5 bg-[#111720]/45">
                  <div>
                    {/* Cover photo */}
                    <div className="relative w-full h-[220px] rounded-xl overflow-hidden mb-6 border border-white/5">
                      <Image
                        src={blog.image || 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b'}
                        alt={blog.title}
                        fill
                        sizes="(max-w-720px) 100vw, 40vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#050816]/30 group-hover:bg-[#050816]/0 transition-colors" />
                    </div>

                    {/* Metadata line */}
                    <div className="flex flex-wrap items-center gap-4 text-[10px] font-mono text-[#EDEDED]/45 uppercase mb-3">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {blog.readTime}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <User className="w-3.5 h-3.5" />
                        {blog.author}
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-space text-lg md:text-xl font-bold text-white mb-3 group-hover:text-[#06B6D4] transition-colors leading-snug">
                      {blog.title}
                    </h3>
                    
                    {/* Excerpt */}
                    <p className="font-poppins text-xs text-[#EDEDED]/55 leading-relaxed mb-6">
                      {blog.excerpt}
                    </p>
                  </div>

                  {/* Read Article link */}
                  <div className="flex justify-between items-center pt-4 border-t border-white/5">
                    {/* Tag Badges */}
                    <div className="flex gap-1.5">
                      {(blog.tags || []).slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[8px] font-mono text-[#06B6D4] bg-[#06B6D4]/5 border border-[#06B6D4]/10 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <span className="flex items-center gap-1.5 text-xs font-space font-medium text-white uppercase tracking-widest group-hover:text-[#06B6D4] transition-colors">
                      Read Article
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                    </span>
                  </div>
                </TiltCard>
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
