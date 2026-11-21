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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white px-4 py-1.5 text-xs font-semibold text-[#758B62] shadow-soft">
            Transparent Monetization Model
          </div>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl text-[#263126]">
            Pay Per Paper. No Subscription Traps.
          </h1>
          <p className="mt-4 text-base text-[#73786E] leading-relaxed">
            We believe examination practice infrastructure should be accessible to every student in
            India. Your first full examination paper is free. Every subsequent paper costs just ₹10.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-soft">
            <div>
              <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                COMPLIMENTARY ACCESS
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#263126]">First Question Paper</h3>
              <div className="mt-2 text-4xl font-black text-[#263126]">₹0</div>
              <p className="mt-3 text-xs text-[#73786E]">
                Granted atomically to every newly verified student account.
              </p>

              <div className="mt-6 border-t border-[#ECEAE4] pt-6 space-y-3 text-xs text-[#73786E]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Full National-level paper simulation</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Live OMR response sheet synchronization</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Downloadable high-resolution A4 OMR PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Detailed concept solutions & performance analytics</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-xl bg-[#9CAF88] py-3.5 text-center text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
            >
              Claim Complimentary Paper
            </Link>
          </div>

          {/* Standard ₹10 Tier */}
          <div className="rounded-3xl border-2 border-[#9CAF88] bg-white p-8 sm:p-10 flex flex-col justify-between shadow-card relative">
            <div className="absolute -top-3.5 right-8 rounded-full bg-[#9CAF88] px-3.5 py-1 text-[11px] font-bold text-[#263126]">
              STANDARD ACCESS
            </div>
            <div>
              <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                PAY-PER-ATTEMPT
              </span>
              <h3 className="mt-4 text-2xl font-bold text-[#263126]">Subsequent Papers</h3>
              <div className="mt-2 text-4xl font-black text-[#263126]">
                ₹10 <span className="text-xs font-normal text-[#73786E]">/ paper</span>
              </div>
              <p className="mt-3 text-xs text-[#73786E]">
                Per examination paper or custom practice test. No recurring charges.
              </p>

              <div className="mt-6 border-t border-[#ECEAE4] pt-6 space-y-3 text-xs text-[#73786E]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Direct checkout via Razorpay (UPI, Cards, NetBanking)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Instant verified server-side entitlement granting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Permanent access to results, OMR and solutions</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                  <span>Contribution to longitudinal concept mastery graph</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="mt-8 block w-full rounded-xl border border-[#9CAF88] bg-[#F7F5EF] py-3.5 text-center text-xs font-bold text-[#263126] hover:bg-[#9CAF88] transition-colors"
            >
              Register & Begin
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
