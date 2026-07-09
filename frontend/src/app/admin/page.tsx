'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldAlert, KeyRound, Mail, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { API_BASE_URL } from '@/config';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('vortex_admin_token');
    if (token) {
      router.push('/admin/dashboard');
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please provide all credentials.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (data.success && data.token) {
        localStorage.setItem('vortex_admin_token', data.token);
        localStorage.setItem('vortex_admin_user', JSON.stringify(data.admin));
        router.push('/admin/dashboard');
      } else {
        setError(data.error || 'Invalid credentials.');
      }
    } catch (err) {
      console.error(err);
      setError('Could not connect to API server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050816] flex flex-col justify-between p-6 select-none relative overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#8B5CF6]/5 blur-[120px] pointer-events-none" />

      {/* Header back link */}
      <div className="max-w-7xl mx-auto w-full pt-4 z-10">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-[#06B6D4] uppercase hover:text-white transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Public Site
        </Link>
      </div>

      {/* Center login box */}
      <div className="my-auto mx-auto w-full max-w-md z-10">
        <div className="rounded-2xl glass-card p-8 border border-white/5 bg-[#111720]/45">
          {/* Headline header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-xl bg-[#8B5CF6]/10 border border-[#8B5CF6]/20 flex items-center justify-center text-[#8B5CF6] mb-4">
              <ShieldAlert className="w-6 h-6 animate-pulse" />
            </div>
            <h1 className="font-space text-2xl font-bold text-white tracking-wider">
              VORTEX CONTROL PANEL
            </h1>
            <p className="font-mono text-[9px] tracking-widest text-[#EDEDED]/40 uppercase mt-1">
              SECURE AUTHORIZATION GATEWAY
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-[#06B6D4]" />
                Security Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@agency.com"
                className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#06B6D4] transition-colors"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-[9px] text-[#EDEDED]/55 uppercase tracking-wider flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-[#8B5CF6]" />
                Encrypted Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#050816] border border-white/10 rounded-xl py-3.5 px-4 text-xs text-white focus:outline-none focus:border-[#8B5CF6] transition-colors"
                required
              />
            </div>

            {/* Error tag */}
            {error && (
              <div className="p-3 rounded-xl border border-red-500/20 bg-red-500/5 text-xs text-red-400 font-poppins flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl bg-[#8B5CF6] hover:bg-[#7C3AED] text-white font-space text-xs uppercase tracking-widest font-bold hover:shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Clock className="w-4 h-4 animate-spin text-[#06B6D4]" />
                  DECRYPTING SESSION...
                </>
              ) : (
                'ENTER TERMINAL'
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center">
            <p className="text-[10px] font-mono text-white/30">
              DEFAULT DEV USER: admin@agency.com / admin123
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="max-w-7xl mx-auto w-full text-center text-[10px] font-mono text-[#EDEDED]/30 pb-4">
        VORTEX CONTROL PANEL // ALL CONNECTIONS ENCRYPTED OVER SSL-JWT
      </div>
    </div>
  );
}
