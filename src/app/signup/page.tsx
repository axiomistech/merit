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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-[28px] border border-[#E6E5DE] bg-white p-8 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)]">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CAF88] text-white">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <span className="font-mono text-xl font-bold tracking-wider text-[#263126]">FORT</span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold text-[#263126] font-serif">Create Candidate Account</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Generate your verified FORT registration ID & claim your complimentary first paper.
          </p>

          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>Includes 1 Free Full Mock Paper Claim</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-xs">
          <div>
            <label className="block text-[#73786E] font-medium">Candidate Full Name *</label>
            <div className="relative mt-1">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Official candidate name"
                className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:ring-1 focus:ring-[#9CAF88] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#73786E] font-medium">Email Address *</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="name@example.com"
                className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:ring-1 focus:ring-[#9CAF88] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#73786E] font-medium">Password (Min 8 characters) *</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:ring-1 focus:ring-[#9CAF88] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[#73786E] font-medium">Date of Birth</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] focus:border-[#9CAF88] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#73786E] font-medium">Country</label>
              <div className="relative mt-1">
                <Globe className="absolute left-3.5 top-3 h-4 w-4 text-[#92958D]" />
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] bg-white py-2.5 pl-10 pr-3 text-sm text-[#263126] focus:border-[#9CAF88] focus:outline-none transition-all"
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
                className="mt-0.5 rounded border-[#E6E5DE] text-[#9CAF88] focus:ring-[#9CAF88]"
              />
              <span className="text-[11px] text-[#73786E] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms-and-conditions" className="font-semibold text-[#758B62] underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-semibold text-[#758B62] underline">
                  Privacy Policy
                </Link>
                . I understand that examination results and OMR scores are authoritative.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-full bg-[#E8412C] py-3.5 text-sm font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all hover:translate-y-[-1px] disabled:opacity-50 mt-4"
          >
            {loading ? 'Creating Candidate Record...' : 'Complete Registration & Claim Free Paper'}
          </button>
        </form>

        <div className="mt-6 border-t border-[#ECEAE4] pt-4 text-center text-xs text-[#73786E]">
          Already registered?{' '}
          <Link href="/login" className="font-bold text-[#758B62] hover:underline">
            Sign In to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
