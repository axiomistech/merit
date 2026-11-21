'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create session for candidate
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('fort_student_session');
        let session = stored ? JSON.parse(stored) : null;
        if (!session || session.email !== email) {
          session = {
            userId: 'usr_active_candidate',
            registrationId: 'FORT-26-000001',
            fullName: email.split('@')[0].toUpperCase(),
            email,
          };
          localStorage.setItem('fort_student_session', JSON.stringify(session));
        }
      }

      toast.success('Signed in successfully.');
      router.push('/dashboard');
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[28px] border border-[#E6E5DE] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)]">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CAF88] text-white">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-[#263126]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#263126] font-serif">Welcome Back</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Sign in to your candidate dashboard & practice records.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#73786E]">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:ring-1 focus:ring-[#9CAF88] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-[#73786E]">Password</label>
              <Link href="/contact" className="text-[11px] text-[#758B62] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:ring-1 focus:ring-[#9CAF88] focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#E8412C] py-3.5 text-sm font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all hover:translate-y-[-1px] disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#ECEAE4] pt-4 text-center text-xs text-[#73786E]">
          Don't have a FORT registration yet?{' '}
          <Link href="/signup" className="font-bold text-[#758B62] hover:underline">
            Register Candidate Account
          </Link>
        </div>
      </div>
    </div>
  );
}
