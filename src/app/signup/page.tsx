'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, Lock, Mail, User, Calendar, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function SignupPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    dateOfBirth: '',
    country: 'India',
    phone: '',
    termsAccepted: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.termsAccepted) {
      toast.error('Please accept the Terms & Conditions and Privacy Policy.');
      return;
    }

    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to create account');
      }

      // Store student session locally for immediate seamless onboarding
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'fort_student_session',
          JSON.stringify({
            userId: data.userId,
            registrationId: data.registrationId,
            fullName: formData.fullName,
            email: formData.email,
          })
        );
      }

      toast.success(`Account created! Your FORT ID is ${data.registrationId}`);
      router.push('/onboarding');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)]">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CC6E0] text-[#20252B]">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-[#20252B]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#20252B] font-sans">Create Candidate Account</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Generate your verified FORT registration ID & claim your complimentary first paper.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-semibold text-[#20252B]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Includes 1 Free Full Mock Paper Claim</span>
          </div>
        </div>

        {/* Google Registration */}
        <div className="mt-6">
          <button
            type="button"
            onClick={() => {
              if (typeof window !== 'undefined') {
                const session = {
                  userId: 'usr_google_' + Date.now().toString(36),
                  registrationId: 'FORT-26-000001',
                  fullName: 'DHANUSH JAGADEESH',
                  email: 'dhanush.student@gmail.com',
                };
                localStorage.setItem('fort_student_session', JSON.stringify(session));
              }
              toast.success('Account created with Google! Moving to personalization...');
              router.push('/onboarding');
            }}
            className="flex w-full items-center justify-center gap-3 rounded-full border border-[#DCE2E6] bg-white py-3 text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#F1F3F4] transition-all hover:border-[#9CC6E0]"
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
              <div className="w-full border-t border-[#DCE2E6]" />
            </div>
            <span className="relative bg-white px-3 text-[11px] font-semibold text-[#66727D]">
              or register with email
            </span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#66727D] font-medium">Candidate Full Name *</label>
            <div className="relative mt-1">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Official candidate name"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Email Address *</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Password (Min 8 characters) *</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:ring-1 focus:ring-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[#66727D] font-medium">Date of Birth</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#66727D] font-medium">Country</label>
              <div className="relative mt-1">
                <Globe className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none transition-all"
                />
              </div>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-0.5 rounded border-[#DCE2E6] text-[#9CC6E0] focus:ring-[#9CC6E0]"
              />
              <span className="text-[11px] text-[#66727D] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms-and-conditions" className="font-semibold text-[#20252B] underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-semibold text-[#20252B] underline">
                  Privacy Policy
                </Link>
                . I understand that examination results and OMR scores are authoritative.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#E4002B] py-3.5 text-sm font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-all hover:translate-y-[-1px] disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Candidate Record...' : 'Complete Registration & Claim Free Paper'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#DCE2E6] pt-4 text-center text-xs text-[#66727D]">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[#20252B] hover:underline">
            Sign In to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
