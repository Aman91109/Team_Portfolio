'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, MessageSquare, Upload, Calendar as CalendarIcon, CheckCircle2, AlertCircle, Clock, MapPin } from 'lucide-react';
import confetti from 'canvas-confetti';

const budgets = [
  '$1,000 - $3,000',
  '$3,000 - $7,000',
  '$7,000 - $15,000',
  '$15,000+',
];

const projectTypes = [
  'Web Development',
  'AI/ML Solutions',
  'UI/UX Design',
  'Automation',
  'Mobile Apps',
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    budget: '$3,000 - $7,000',
    projectType: 'Web Development',
    message: '',
  });

  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setFeedbackMsg('Please complete all required fields (Name, Email, Message).');
      return;
    }

    setStatus('submitting');
    try {
      // Use FormData to allow file attachments
      const bodyData = new FormData();
      bodyData.append('name', formData.name);
      bodyData.append('email', formData.email);
      bodyData.append('phone', formData.phone);
      bodyData.append('company', formData.company);
      bodyData.append('budget', formData.budget);
      bodyData.append('projectType', formData.projectType);
      
      // Append booking info if selected
      let finalMessage = formData.message;
      if (selectedDate && selectedTime) {
        finalMessage += `\n\n[SIMULATED DISCOVERY CALL SCHEDULED: ${selectedDate} at ${selectedTime}]`;
      }
      bodyData.append('message', finalMessage);

      if (file) {
        bodyData.append('fileAttachment', file);
      }

      const res = await fetch('http://localhost:5000/api/public/lead', {
        method: 'POST',
        body: bodyData, // Multi-part form-data
      });

      const data = await res.json();
      if (data.success) {
        setStatus('success');
        setFeedbackMsg(data.message || 'Inquiry submitted successfully!');
        
        // Trigger celebratory fireworks confetti!
        confetti({
          particleCount: 150,
          spread: 80,
          origin: { y: 0.6 }
        });

        // Reset Form
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          budget: '$3,000 - $7,000',
          projectType: 'Web Development',
          message: '',
        });
        setFile(null);
        setSelectedDate('');
        setSelectedTime('');
      } else {
        setStatus('error');
        setFeedbackMsg(data.error || 'Submission failed.');
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setFeedbackMsg('Could not connect to the API server. Form offline.');
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-[#0B1120]/30 relative overflow-hidden">
      {/* Background spotlights */}
      <div className="absolute top-[30%] left-[5%] w-[450px] h-[450px] rounded-full bg-[#8B5CF6]/5 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[5%] w-[450px] h-[450px] rounded-full bg-[#06B6D4]/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        {/* Section title */}
        <div className="flex flex-col mb-16 text-center items-center">
          <span className="text-xs font-mono tracking-widest text-[#06B6D4] uppercase mb-2">// HIRE US</span>
          <h2 className="text-3xl md:text-5xl font-bold font-space text-white tracking-tight">
            Initiate Project Request
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Coordinates & Calendar scheduler */}
          <div className="lg:col-span-5 flex flex-col gap-8">
            <h3 className="font-space text-xl font-bold text-white">
              Connect Directly with the Directors
            </h3>
            
            {/* CTA channel nodes */}
            <div className="flex flex-col gap-4">
              <a
                href="mailto:hello@vortexlabs.agency"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#111720]/45 hover:border-[#8B5CF6]/40 hover:bg-[#8B5CF6]/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center text-[#8B5CF6]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#EDEDED]/40 uppercase tracking-widest">Send Email</span>
                  <span className="text-xs font-space text-white">hello@vortexlabs.agency</span>
                </div>
              </a>

              <a
                href="https://wa.me/15557329099"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#111720]/45 hover:border-green-500/40 hover:bg-green-500/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-400">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#EDEDED]/40 uppercase tracking-widest">WhatsApp Direct</span>
                  <span className="text-xs font-space text-white">+1 (555) 732-9099</span>
                </div>
              </a>

              <a
                href="tel:+15557329099"
                className="flex items-center gap-4 p-4 rounded-xl border border-white/5 bg-[#111720]/45 hover:border-[#06B6D4]/40 hover:bg-[#06B6D4]/5 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center text-[#06B6D4]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="block text-[10px] font-mono text-[#EDEDED]/40 uppercase tracking-widest">Direct Line</span>
                  <span className="text-xs font-space text-white">+1 (555) 732-9099</span>
                </div>
              </a>
            </div>

            {/* Calendar Booking Simulation */}
            <div className="rounded-2xl glass-card p-6 border border-white/5 bg-[#111720]/45 flex flex-col gap-4">
              <h4 className="font-space text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                <CalendarIcon className="w-4 h-4 text-[#8B5CF6]" />
                Schedule Discovery Call
              </h4>
              <p className="font-poppins text-xs text-[#EDEDED]/50 leading-relaxed">
                Choose a preferred date and time block. We will send a calendar link to your email upon form submission.
              </p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/40 uppercase">Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/40 uppercase">Time Block</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="w-full bg-[#050816] border border-white/10 rounded-lg py-2 px-3 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                  >
                    <option value="">Select Time</option>
                    <option value="10:00 AM - 10:30 AM EST">10:00 AM EST</option>
                    <option value="01:30 PM - 02:00 PM EST">01:30 PM EST</option>
                    <option value="04:00 PM - 04:30 PM EST">04:00 PM EST</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Simulated Server/Routing Map */}
            <div className="rounded-2xl glass-card p-6 border border-white/5 bg-[#111720]/45 flex flex-col gap-3 relative h-[180px] justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#06B6D4]" />
                <span className="font-space text-xs font-semibold text-white uppercase tracking-wider">Agency Server Map</span>
              </div>
              <div className="absolute inset-x-0 bottom-4 h-[100px] flex items-center justify-center opacity-30 select-none">
                {/* SVG vector wireframe grid representing a futuristic global hub */}
                <svg className="w-[85%] h-full text-[#06B6D4]" fill="none" viewBox="0 0 200 100">
                  <path d="M20,50 Q60,20 100,50 T180,50" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
                  <path d="M20,50 Q60,80 100,50 T180,50" stroke="currentColor" strokeWidth="1" />
                  <circle cx="20" cy="50" r="4" fill="#8B5CF6" />
                  <circle cx="100" cy="50" r="5" fill="#06B6D4" className="animate-pulse" />
                  <circle cx="180" cy="50" r="4" fill="#3B82F6" />
                </svg>
              </div>
              <span className="font-mono text-[9px] text-right text-[#06B6D4] mt-auto z-10 uppercase tracking-widest">
                ACTIVE SERVERS // SILICON VALLEY - SEOUL
              </span>
            </div>

          </div>

          {/* Right Column: Dynamic Lead submission Form */}
          <div className="lg:col-span-7 rounded-2xl glass-card p-8 border border-white/5 bg-[#111720]/45">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Your Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. John Doe"
                    className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="e.g. john@company.com"
                    className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Phone (Optional)</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="e.g. +1 (555) 019-2834"
                    className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    placeholder="e.g. Acme Corp"
                    className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                  />
                </div>
              </div>

              {/* Toggles: Project Type and Budget */}
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Scope of Work</label>
                  <div className="flex flex-wrap gap-2">
                    {projectTypes.map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, projectType: type }))}
                        className={`px-4 py-2 rounded-lg font-space text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
                          formData.projectType === type
                            ? 'bg-[#06B6D4]/15 border-[#06B6D4] text-[#06B6D4]'
                            : 'bg-[#050816] border-white/5 text-[#EDEDED]/60 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Estimated Budget</label>
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((bud) => (
                      <button
                        key={bud}
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, budget: bud }))}
                        className={`px-4 py-2 rounded-lg font-space text-[10px] uppercase tracking-wider border cursor-pointer transition-colors ${
                          formData.budget === bud
                            ? 'bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6]'
                            : 'bg-[#050816] border-white/5 text-[#EDEDED]/60 hover:text-white hover:border-white/20'
                        }`}
                      >
                        {bud}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Detailed Message *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  placeholder="Outline client specifications, model triggers, or features desired..."
                  className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors resize-none"
                  required
                />
              </div>

              {/* File Attachment Upload */}
              <div className="flex flex-col gap-2">
                <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider">Attachment (PDF, images, specs)</label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border border-dashed border-white/15 rounded-xl py-6 px-4 flex flex-col items-center justify-center cursor-pointer hover:bg-white/[0.02] hover:border-[#06B6D4]/35 transition-colors text-center"
                >
                  <Upload className="w-5 h-5 text-[#06B6D4] mb-2" />
                  <span className="text-[10px] font-mono text-[#EDEDED]/60">
                    {file ? `SELECTED: ${file.name} (${(file.size / 1024 / 1024).toFixed(2)}MB)` : 'DRAG & DROP OR CHOOSE FILE'}
                  </span>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <button
                type="submit"
                disabled={status === 'submitting'}
                className="neon-button w-full py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-space text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_20px_rgba(139,92,246,0.35)] transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                {status === 'submitting' ? (
                  <>
                    <Clock className="w-4 h-4 animate-spin text-[#06B6D4]" />
                    SUBMITTING PROPOSAL...
                  </>
                ) : (
                  'LAUNCH REQUEST'
                )}
              </button>

              {/* Form Feedback banners */}
              <AnimatePresence>
                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3 p-4 rounded-xl border border-green-500/20 bg-green-500/5 text-xs text-green-400 font-poppins"
                  >
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                    <span>{feedbackMsg}</span>
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="flex gap-3 p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-poppins"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{feedbackMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
