'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || searchParams.get('returnUrl') || '/dashboard';

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
      router.push(redirectTarget);
    } catch (err: any) {
      toast.error(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
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
    router.push(redirectTarget);
  };

  return (
    <div className="liquid-canvas text-[#20252B] min-h-screen py-20 flex items-center justify-center px-4 relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-16 left-1/3 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-16 right-1/3 h-72 w-72 opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-md glass-polar rounded-[36px] p-8 sm:p-10 shadow-sm">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-black tracking-wider text-[#20252B]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-black text-[#20252B] font-sans">Welcome Back</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Sign in to your candidate dashboard & unlock question papers.
          </p>
        </div>

        {/* Google Authentication */}
        <div className="mt-6">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#DCE2E6]/80 bg-white/80 py-3 text-xs font-bold text-[#20252B] shadow-sm hover:bg-white transition-all hover:border-[#9CC6E0]"
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
              <div className="w-full border-t border-[#DCE2E6]/80" />
            </div>
            <span className="relative glass-pill px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#66727D]">
              or continue with email
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#66727D]">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3.5 h-4 w-4 text-[#66727D]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@example.com"
                className="w-full rounded-2xl border border-[#DCE2E6]/80 bg-white/80 py-3 pl-10 pr-3 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-[#66727D]">Password</label>
              <Link href="/contact" className="text-[11px] text-[#20252B] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3.5 h-4 w-4 text-[#66727D]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-2xl border border-[#DCE2E6]/80 bg-white/80 py-3 pl-10 pr-3 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="glass-racing-red w-full rounded-full py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-50 mt-2"
          >
            {loading ? 'Authenticating...' : 'Sign In'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#DCE2E6]/80 pt-4 text-center text-xs text-[#66727D]">
          Don't have a FORT registration yet?{' '}
          <Link
            href={
              redirectTarget !== '/dashboard'
                ? `/signup?redirect=${encodeURIComponent(redirectTarget)}`
                : '/signup'
            }
            className="font-bold text-[#20252B] hover:underline"
          >
            Register Candidate Account
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F4] flex items-center justify-center">
          <div className="text-sm font-semibold text-[#66727D]">Loading...</div>
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
