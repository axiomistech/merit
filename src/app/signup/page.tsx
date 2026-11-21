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
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#263554] bg-[#11182A] p-8 shadow-2xl">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-[#F5F7FB]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#F5F7FB]">Create Your Account</h1>
          <p className="mt-1 text-xs text-[#A7B0C0]">
            Generate your verified FORT registration ID & claim your free paper.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#A7B0C0]">Full Name *</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Candidate Full Name"
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 pl-9 pr-3 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A7B0C0]">Email Address *</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 pl-9 pr-3 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#A7B0C0]">Password *</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#7C8799]" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="Minimum 8 characters"
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 pl-9 pr-3 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#A7B0C0]">Date of Birth</label>
              <div className="relative mt-1">
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 px-3 text-xs text-[#F5F7FB] focus:border-[#6486C6] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#A7B0C0]">Country</label>
              <div className="relative mt-1">
                <select
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2 px-3 text-xs text-[#F5F7FB] focus:border-[#6486C6] focus:outline-none"
                >
                  <option value="India">India</option>
                  <option value="United Arab Emirates">UAE</option>
                  <option value="Singapore">Singapore</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 pt-2">
            <input
              type="checkbox"
              id="terms"
              checked={formData.termsAccepted}
              onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
              className="mt-1 rounded border-[#263554] bg-[#172033] text-[#6486C6] focus:ring-0"
            />
            <label htmlFor="terms" className="text-[11px] leading-snug text-[#A7B0C0]">
              I accept the{' '}
              <Link href="/terms-and-conditions" className="text-[#6486C6] underline">
                Terms & Conditions
              </Link>{' '}
              and acknowledge the{' '}
              <Link href="/privacy-policy" className="text-[#6486C6] underline">
                Privacy Policy
              </Link>
              .
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#6486C6] py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-md shadow-[#6486C6]/20 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register & Continue to Onboarding'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#263554] pt-4 text-center text-xs text-[#A7B0C0]">
          Already have a FORT account?{' '}
          <Link href="/login" className="font-semibold text-[#6486C6] hover:underline">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
