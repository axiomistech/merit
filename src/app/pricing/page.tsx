import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Pricing — FORT Learning',
  description:
    'Honest, transparent examination practice pricing: First question paper complimentary. Subsequent full mock papers at ₹10 per paper.',
};

export default function PricingPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#263554] bg-[#11182A] px-3.5 py-1 text-xs font-semibold text-[#6486C6]">
            Transparent Monetization Model
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Pay Per Paper. No Subscription Traps.
          </h1>
          <p className="mt-4 text-base text-[#A7B0C0] leading-relaxed">
            We believe examination practice infrastructure should be accessible to every student in
            India. Your first full examination paper is free. Every subsequent paper costs just ₹10.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-2xl border border-[#263554] bg-[#172033] p-8 flex flex-col justify-between">
            <div>
              <span className="rounded bg-[#10B981]/20 px-2.5 py-1 text-xs font-bold text-[#10B981]">
                COMPLIMENTARY ACCESS
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#F5F7FB]">First Question Paper</h3>
              <div className="mt-2 text-4xl font-black text-[#F5F7FB]">₹0</div>
              <p className="mt-3 text-xs text-[#A7B0C0]">
                Granted atomically to every newly verified student account.
              </p>

              <div className="mt-6 border-t border-[#263554] pt-6 space-y-3 text-xs text-[#A7B0C0]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Full simulation of selected national entrance exam</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Live OMR response sheet synchronization</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Downloadable high-resolution A4 OMR PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                  <span>Detailed concept solutions & performance analytics</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-xl bg-[#6486C6] py-3 text-center text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
            >
              Claim Complimentary Paper
            </Link>
          </div>

          {/* Standard ₹10 Tier */}
          <div className="rounded-2xl border border-[#6486C6] bg-[#172033] p-8 flex flex-col justify-between shadow-2xl shadow-[#6486C6]/10 relative">
            <div className="absolute -top-3 right-6 rounded-full bg-[#6486C6] px-3 py-0.5 text-[10px] font-bold text-[#0B1020]">
              STANDARD ACCESS
            </div>
            <div>
              <span className="rounded bg-[#6486C6]/20 px-2.5 py-1 text-xs font-bold text-[#6486C6]">
                PAY-PER-ATTEMPT
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#F5F7FB]">Subsequent Papers</h3>
              <div className="mt-2 text-4xl font-black text-[#F5F7FB]">
                ₹10 <span className="text-xs font-normal text-[#A7B0C0]">/ paper</span>
              </div>
              <p className="mt-3 text-xs text-[#A7B0C0]">
                Per examination paper or custom practice test.
              </p>

              <div className="mt-6 border-t border-[#263554] pt-6 space-y-3 text-xs text-[#A7B0C0]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                  <span>Direct checkout via Razorpay (UPI, Cards, NetBanking)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                  <span>Instant verified server-side entitlement granting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                  <span>Permanent access to results, OMR and solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                  <span>Contribution to longitudinal concept mastery graph</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-xl border border-[#6486C6] bg-[#1D2940] py-3 text-center text-xs font-bold text-[#F5F7FB] hover:bg-[#6486C6] hover:text-[#0B1020] transition-colors"
            >
              Register & Begin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
