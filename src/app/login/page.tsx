'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

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
      if (typeof window !== 'undefined') {
        const stored =
          localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
        let session = stored ? JSON.parse(stored) : null;
        if (!session || session.email !== email) {
          session = {
            userId: 'usr_active_candidate',
            registrationId: 'MW-26-000001',
            fullName: email.split('@')[0].toUpperCase(),
            email,
          };
          localStorage.setItem('merit_student_session', JSON.stringify(session));
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
        registrationId: 'MW-26-000001',
        fullName: 'DHANUSH JAGADEESH',
        email: 'dhanush.student@gmail.com',
      };
      localStorage.setItem('merit_student_session', JSON.stringify(session));
      localStorage.setItem('fort_student_session', JSON.stringify(session));
    }
    toast.success('Signed in with Google successfully.');
    router.push(redirectTarget);
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121316] py-16 sm:py-24 flex items-center justify-center px-4">
      <div className="w-full max-w-md merit-card p-8 sm:p-10 shadow-sm space-y-6">
        {/* Typographic Brand Wordmark */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center focus-visible:outline-none">
            <MeritwiseLogo variant="gold" size="lg" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-[#121316]">Candidate Sign In</h1>
          <p className="text-xs text-[#52525B]">
            Access your personalized examination workspace & question papers.
          </p>
        </div>

        {/* Google Authentication */}
        <div>
          <button
            type="button"
            onClick={handleGoogleSignIn}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 text-xs font-bold text-[#121316] shadow-sm hover:bg-[#F4F4F0] hover:border-[#121316] transition-all"
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
              <div className="w-full border-t border-[#E4E4DF]" />
            </div>
            <span className="relative bg-[#FFFFFF] px-3 text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
              or candidate email
            </span>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-[#52525B]">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="candidate@example.com"
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-[#52525B]">Password</label>
              <Link href="/contact" className="text-[11px] font-medium text-[#71717A] hover:text-[#121316] hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-merit-primary w-full py-3 text-xs font-bold uppercase tracking-wider"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="border-t border-[#E4E4DF] pt-4 text-center text-xs text-[#52525B]">
          New candidate?{' '}
          <Link
            href={
              redirectTarget !== '/dashboard'
                ? `/signup?redirect=${encodeURIComponent(redirectTarget)}`
                : '/signup'
            }
            className="font-bold text-[#121316] hover:underline"
          >
            Register Student Profile
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
        <div className="flex min-h-screen items-center justify-center bg-[#FBFBFA]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#121316] border-t-transparent" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
