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
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#263554] bg-[#11182A] p-8 shadow-2xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-[#F5F7FB]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#F5F7FB]">Welcome Back</h1>
          <p className="mt-1 text-xs text-[#A7B0C0]">
            Sign in to your candidate dashboard & practice records.
          </p>
        </div>

        <form onSubmit={handleLogin} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#A7B0C0]">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 pl-9 pr-3 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-[#A7B0C0]">Password</label>
              <Link href="/forgot-password" className="text-[11px] text-[#6486C6] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 pl-9 pr-3 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#6486C6] py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-md shadow-[#6486C6]/20 disabled:opacity-50"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#263554] pt-4 text-center text-xs text-[#A7B0C0]">
          Don't have an account yet?{' '}
          <Link href="/signup" className="font-semibold text-[#6486C6] hover:underline">
            Register now
          </Link>
        </div>
      </div>
    </div>
  );
}
