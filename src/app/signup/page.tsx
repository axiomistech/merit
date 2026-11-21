'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Shield, Lock, Mail, User, Calendar, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || searchParams.get('returnUrl');

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
      if (redirectTarget) {
        router.push(redirectTarget);
      } else {
        router.push('/onboarding');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="liquid-canvas text-[#20252B] min-h-screen py-16 flex items-center justify-center px-4 relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-16 left-1/3 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-16 right-1/3 h-72 w-72 opacity-20" />
      </div>

      <div className="relative z-10 w-full max-w-lg glass-polar rounded-[36px] p-8 sm:p-10 shadow-sm">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-black tracking-wider text-[#20252B]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-black text-[#20252B] font-sans">Create Candidate Account</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Generate your verified FORT registration ID & claim your complimentary first paper.
          </p>

          <div className="glass-pill mt-4 inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-[#20252B]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#9CC6E0]" />
            <span>1st Full Question Paper Unlock Included Free</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4 text-xs">
          <div>
            <label className="block text-[#66727D] font-medium">Candidate Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Candidate Name (as per official ID)"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="candidate@example.com"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#66727D] font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-[#DCE2E6] bg-white py-2.5 pl-10 pr-3 text-sm text-[#20252B] focus:border-[#9CC6E0] focus:outline-none transition-all"
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
            className="glass-racing-red w-full rounded-full py-3.5 text-sm font-bold text-white shadow-md transition-transform hover:scale-[1.02] disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Candidate Record...' : 'Complete Registration & Claim Free Paper'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#DCE2E6] pt-4 text-center text-xs text-[#66727D]">
          Already registered?{' '}
          <Link
            href={
              redirectTarget
                ? `/login?redirect=${encodeURIComponent(redirectTarget)}`
                : '/login'
            }
            className="font-bold text-[#20252B] hover:underline"
          >
            Sign In to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F4] flex items-center justify-center">
          <div className="text-sm font-semibold text-[#66727D]">Loading...</div>
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
