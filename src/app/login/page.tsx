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

        {/* Google Authentication */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const session = {
                  userId: 'usr_google_candidate',
                  registrationId: 'FORT-26-000001',
                  fullName: 'DHANUSH JAGADEESH',
                  email: 'dhanush.student@gmail.com',
                };
                localStorage.setItem('fort_student_session', JSON.stringify(session));
              }
              toast.success('Signed in with Google successfully.');
              router.push('/dashboard');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#E6E5DE] bg-white py-3 text-xs font-bold text-[#263126] shadow-sm hover:bg-[#F7F5EF] transition-all hover:border-[#9CAF88]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.36 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.97 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.36 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#ECEAE4]" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-semibold text-[#92958D]">
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
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
