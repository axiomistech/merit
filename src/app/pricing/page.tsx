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
    <div className="liquid-canvas min-h-screen py-16 text-[#20252B] relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-16 left-1/4 h-96 w-96 opacity-60" />
        <div className="liquid-orb-red bottom-20 right-1/4 h-80 w-80 opacity-25" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Hero Banner in Liquid Glacier Glass */}
        <div className="glass-glacier rounded-[36px] p-8 sm:p-12 lg:p-14 text-[#20252B] shadow-sm relative overflow-hidden">
          <div className="max-w-2xl space-y-4">
            <div className="glass-pill inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
              <span>DEMOCRATIC EXAMINATION ECONOMICS</span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-black font-sans tracking-tight leading-[1.1] text-[#20252B]">
              Pricing worth{' '}
              <span className="text-[#E4002B]">trusting.</span>
            </h1>

            <p className="text-base sm:text-lg text-[#20252B]/90 font-medium">
              First paper completely free. ₹10 per paper thereafter. No recurring subscriptions, no deceptive auto-renewals, and no hidden coaching fees.
            </p>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="glass-polar rounded-[36px] p-8 sm:p-10 flex flex-col justify-between shadow-sm transition-all hover:border-[#9CC6E0]">
            <div>
              <span className="glass-pill px-3 py-1 text-xs font-bold text-[#20252B]">
                COMPLIMENTARY CLAIM
              </span>
              <h3 className="mt-4 text-2xl font-bold font-sans text-[#20252B]">First Question Paper</h3>
              <div className="mt-2 text-4xl font-black font-sans text-[#20252B]">₹0</div>
              <p className="mt-2 text-xs text-[#66727D]">
                Granted atomically to every newly registered and verified candidate profile.
              </p>

              <div className="mt-6 border-t border-[#DCE2E6]/80 pt-6 space-y-3 text-xs text-[#66727D]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Full National-level paper simulation (NEET / JEE / UPSC)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Live OMR response sheet synchronization</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Downloadable high-resolution A4 vector OMR PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Detailed concept solutions & performance diagnostics</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="glass-polar mt-8 block w-full rounded-full py-3.5 text-center text-xs font-bold text-[#20252B] hover:border-[#9CC6E0] transition-all"
            >
              Claim Complimentary Paper
            </Link>
          </div>

          {/* Standard ₹10 Tier (Highlighted with Racing Red CTA) */}
          <div className="glass-polar rounded-[36px] border-2 border-[#9CC6E0] p-8 sm:p-10 flex flex-col justify-between shadow-sm relative">
            <div className="absolute -top-3.5 right-8 rounded-full bg-[#E4002B] px-3.5 py-1 text-[11px] font-bold text-white shadow-md">
              STANDARD ACCESS
            </div>
            <div>
              <span className="glass-pill px-3 py-1 text-xs font-bold text-[#20252B]">
                PAY-PER-ATTEMPT
              </span>
              <h3 className="mt-4 text-2xl font-bold font-sans text-[#20252B]">Subsequent Papers</h3>
              <div className="mt-2 text-4xl font-black font-sans text-[#20252B]">
                ₹10 <span className="text-xs font-normal font-sans text-[#66727D]">/ paper</span>
              </div>
              <p className="mt-2 text-xs text-[#66727D]">
                Per examination paper or custom practice test. No recurring charges.
              </p>

              <div className="mt-6 border-t border-[#DCE2E6]/80 pt-6 space-y-3 text-xs text-[#66727D]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Direct checkout via Razorpay (UPI, Cards, NetBanking)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Instant verified server-side entitlement granting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Permanent access to results, OMR archive, and solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                  <span>Automated addition to personalized conceptual revision queue</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="glass-racing-red mt-8 block w-full rounded-full py-3.5 text-center text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              Get Started with ₹10 Mocks
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
