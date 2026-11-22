'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Shield, ArrowRight, Mail, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setTimeout(() => {
      setSubmitted(true);
      setLoading(false);
      toast.success('Password reset instructions sent to your email.');
    }, 600);
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)]">
        <div className="text-center flex flex-col items-center">
          <Link href="/" className="inline-flex items-center focus-visible:outline-none mb-3">
            <MeritwiseLogo variant="gold" size="lg" />
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#20252B] font-sans">Reset Password</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="mt-8 rounded-2xl border border-[#9CC6E0]/40 bg-[#9CC6E0]/10 p-5 text-center space-y-3">
            <CheckCircle2 className="h-8 w-8 text-[#3B4C30] mx-auto" />
            <h2 className="text-sm font-bold text-[#20252B]">Check Your Inbox</h2>
            <p className="text-xs text-[#52584E] leading-relaxed">
              We have sent a secure password reset link to <strong>{email}</strong>. The link expires in 30 minutes.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 text-xs font-semibold text-[#20252B] hover:underline"
            >
              Return to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Registered Email</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] pl-10 pr-4 py-2.5 text-xs text-[#20252B] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#20252B] py-3 text-xs font-semibold text-white hover:bg-[#344034] transition-all disabled:opacity-50 shadow-sm"
            >
              {loading ? 'Sending link...' : 'Send Reset Link'}
              <ArrowRight className="h-4 w-4" />
            </button>

            <div className="text-center pt-2 text-xs text-[#66727D]">
              Remember your credentials?{' '}
              <Link href="/login" className="font-semibold text-[#20252B] hover:underline">
                Sign in
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
