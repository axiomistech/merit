import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Shield, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'Pricing — FORT Learning',
  description:
    'Honest, transparent examination practice pricing: First question paper complimentary. Subsequent full mock papers at ₹10 per paper.',
};

export default function PricingPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-14 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>DEMOCRATIC EXAMINATION ECONOMICS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold font-serif tracking-tight leading-[1.1] text-[#20252B]">
              Pricing worth{' '}
              <span className="relative inline-block italic">
                trusting.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#E4002B] overflow-visible"
                  viewBox="0 0 100 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C26 3 66 2 98 7C70 11 36 10 5 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#20252B]/90 font-medium">
              First paper completely free. ₹10 per paper thereafter. No recurring subscriptions, no deceptive auto-renewals, and no hidden coaching fees.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-sm">
            <div>
              <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
                COMPLIMENTARY CLAIM
              </span>
              <h3 className="mt-4 text-2xl font-bold font-serif text-[#20252B]">First Question Paper</h3>
              <div className="mt-2 text-4xl font-extrabold font-serif text-[#20252B]">₹0</div>
              <p className="mt-2 text-xs text-[#66727D]">
                Granted atomically to every newly registered and verified candidate profile.
              </p>

              <div className="mt-6 border-t border-[#DCE2E6] pt-6 space-y-3 text-xs text-[#66727D]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Full National-level paper simulation (NEET / JEE / UPSC)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Live OMR response sheet synchronization</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Downloadable high-resolution A4 vector OMR PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Detailed concept solutions & performance diagnostics</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-xl border-2 border-[#9CC6E0] bg-white py-3.5 text-center text-xs font-bold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
            >
              Claim Complimentary Paper
            </Link>
          </div>

          {/* Standard ₹10 Tier (Highlighted with Tomato Red CTA) */}
          <div className="rounded-[28px] border-2 border-[#9CC6E0] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-lg relative">
            <div className="absolute -top-3.5 right-8 rounded-full bg-[#E4002B] px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
              STANDARD ACCESS
            </div>
            <div>
              <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
                PAY-PER-ATTEMPT
              </span>
              <h3 className="mt-4 text-2xl font-bold font-serif text-[#20252B]">Subsequent Papers</h3>
              <div className="mt-2 text-4xl font-extrabold font-serif text-[#20252B]">
                ₹10 <span className="text-xs font-normal font-sans text-[#66727D]">/ paper</span>
              </div>
              <p className="mt-2 text-xs text-[#66727D]">
                Per examination paper or custom practice test. No recurring charges.
              </p>

              <div className="mt-6 border-t border-[#DCE2E6] pt-6 space-y-3 text-xs text-[#66727D]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Direct checkout via Razorpay (UPI, Cards, NetBanking)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Instant verified server-side entitlement granting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Permanent access to results, OMR archive, and solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#27835A]" />
                  <span>Automated addition to personalized conceptual revision queue</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-full bg-[#E4002B] py-3.5 text-center text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-all"
            >
              Get Started with ₹10 Mocks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
