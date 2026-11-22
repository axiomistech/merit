'use client';

import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Lock, Mail, User, Calendar, CheckCircle2, ArrowRight } from 'lucide-react';
import { toast } from 'sonner';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';
import { isAuthorizedAdminEmail, ALL_PERMISSIONS } from '@/lib/admin/auth';
import type { AdminUser } from '@/types/admin';

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

      const normalizedEmail = formData.email.trim().toLowerCase();
      const isAdmin = isAuthorizedAdminEmail(normalizedEmail);

      // Store student session locally for immediate seamless onboarding
      if (typeof window !== 'undefined') {
        const session = {
          userId: data.userId,
          registrationId: data.registrationId,
          fullName: formData.fullName,
          email: normalizedEmail,
          role: isAdmin ? 'admin' : 'student',
        };
        localStorage.setItem('merit_student_session', JSON.stringify(session));
        localStorage.setItem('fort_student_session', JSON.stringify(session));

        // When creating an account with an authorized admin email, automatically initialize the admin session
        if (isAdmin) {
          const adminSession: AdminUser = {
            id: 'adm_meritwise_hq',
            name: formData.fullName || 'Meritwise HQ Admin',
            email: normalizedEmail,
            role: 'admin',
            status: 'active',
            created_at: new Date().toISOString(),
            last_login: new Date().toISOString(),
            permissions: ALL_PERMISSIONS,
          };
          localStorage.setItem('fort_admin_session', JSON.stringify(adminSession));
        }
      }

      toast.success(
        isAdmin
          ? 'Administrator account created successfully!'
          : `Account created! Your Candidate ID is ${data.registrationId}`
      );

      if (isAdmin && !redirectTarget) {
        router.push('/admin');
      } else if (redirectTarget) {
        router.push(redirectTarget);
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFA] text-[#121316] py-16 sm:py-24 flex items-center justify-center px-4">
      <div className="w-full max-w-lg merit-card p-8 sm:p-10 shadow-sm space-y-6">
        {/* Brand Wordmark & Header */}
        <div className="text-center space-y-3 flex flex-col items-center">
          <Link href="/" className="inline-flex items-center focus-visible:outline-none">
            <MeritwiseLogo variant="gold" size="lg" />
          </Link>
          <h1 className="text-2xl font-bold tracking-tight text-[#121316]">Create Candidate Profile</h1>
          <p className="text-xs text-[#52525B]">
            Generate your verified student identity & claim your complimentary first paper.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold text-[#6E5328] border border-[#E8E0D0]">
            <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D3B]" />
            <span>1st Full Question Paper Unlock Included Free</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-[#52525B] font-semibold">Candidate Full Name</label>
            <div className="relative mt-1">
              <User className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="Candidate Name (as per official identity)"
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#52525B] font-semibold">Email Address</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="candidate@example.com"
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-[#52525B] font-semibold">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
              <input
                type="password"
                required
                minLength={8}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="At least 8 characters"
                className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-[#52525B] font-semibold">Date of Birth</label>
              <div className="relative mt-1">
                <Calendar className="absolute left-3.5 top-3 h-4 w-4 text-[#71717A]" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  className="w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 pl-10 pr-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[#52525B] font-semibold">Country</label>
              <select
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                className="mt-1 w-full rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] py-2.5 px-3 text-sm text-[#121316] focus:border-[#121316] focus:outline-none transition-all"
              >
                <option value="India">India</option>
                <option value="United States">United States</option>
                <option value="United Arab Emirates">United Arab Emirates</option>
                <option value="Singapore">Singapore</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <label className="flex items-start gap-2.5 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={formData.termsAccepted}
                onChange={(e) => setFormData({ ...formData, termsAccepted: e.target.checked })}
                className="mt-1 h-4 w-4 rounded border-[#E4E4DF] text-[#121316] focus:ring-[#8C6D3B]"
              />
              <span className="text-xs text-[#52525B] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms-and-conditions" className="font-semibold text-[#121316] underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy-policy" className="font-semibold text-[#121316] underline">
                  Privacy Policy
                </Link>
                .
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-merit-primary w-full py-3.5 text-xs font-bold uppercase tracking-wider mt-4"
          >
            <span>{loading ? 'Initializing Candidate Profile...' : 'Complete Registration'}</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </form>

        <div className="border-t border-[#E4E4DF] pt-4 text-center text-xs text-[#52525B]">
          Already registered?{' '}
          <Link
            href={
              redirectTarget
                ? `/login?redirect=${encodeURIComponent(redirectTarget)}`
                : '/login'
            }
            className="font-bold text-[#121316] hover:underline"
          >
            Sign in to candidate account
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
        <div className="flex min-h-screen items-center justify-center bg-[#FBFBFA]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#121316] border-t-transparent" />
        </div>
      }
    >
      <SignupForm />
    </Suspense>
  );
}
