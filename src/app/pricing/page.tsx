import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Pricing — MERITWISE',
  description:
    'Transparent examination practice pricing: First question paper complimentary. Subsequent full mock papers at ₹10 per paper.',
};

export default function PricingPage() {
  return (
    <div className="bg-[#FBFBFA] min-h-screen py-16 sm:py-20 text-[#121316]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#52525B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
            EXAMINATION PRACTICE ECONOMICS
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316]">
            Transparent pricing. Zero lock-in.
          </h1>

          <p className="text-base sm:text-lg text-[#52525B] max-w-xl mx-auto leading-relaxed">
            First question paper complimentary. ₹10 per paper thereafter. No recurring subscriptions, no coaching commitments.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 max-w-4xl mx-auto">
          {/* Free Tier */}
          <div className="merit-card p-8 sm:p-10 flex flex-col justify-between shadow-xs">
            <div>
              <span className="rounded-full bg-[#F7F3EB] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
                COMPLIMENTARY ACCESS
              </span>
              <h2 className="mt-4 text-2xl font-bold text-[#121316]">First Question Paper</h2>
              <div className="mt-2 text-4xl font-extrabold text-[#121316]">₹0</div>
              <p className="mt-2 text-xs text-[#52525B]">
                Granted atomically to every newly registered candidate profile.
              </p>

              <div className="mt-6 border-t border-[#E4E4DF] pt-6 space-y-3 text-xs text-[#52525B]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Full National examination simulation (NEET, JEE, UPSC, GATE)</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Server-authoritative timer with wall-clock enforcement</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Instant downloadable high-resolution vector A4 OMR PDF</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Authoritative sectional scorecards and solution explanations</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="btn-merit-secondary mt-8 block w-full py-3 text-center text-xs font-bold uppercase tracking-wider"
            >
              Claim Complimentary Paper
            </Link>
          </div>

          {/* Standard ₹10 Tier */}
          <div className="merit-card border-[#121316] p-8 sm:p-10 flex flex-col justify-between shadow-sm relative">
            <div className="absolute -top-3.5 right-8 rounded-full bg-[#121316] px-3.5 py-1 text-[11px] font-bold text-white shadow-xs uppercase tracking-wider">
              STANDARD ACCESS
            </div>
            <div>
              <span className="rounded-full bg-[#F4F4F0] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#121316]">
                PAY-PER-PAPER
              </span>
              <h2 className="mt-4 text-2xl font-bold text-[#121316]">Subsequent Papers</h2>
              <div className="mt-2 text-4xl font-extrabold text-[#121316]">
                ₹10 <span className="text-xs font-normal text-[#52525B]">/ paper</span>
              </div>
              <p className="mt-2 text-xs text-[#52525B]">
                Per examination paper or mock test. Permanent access once unlocked.
              </p>

              <div className="mt-6 border-t border-[#E4E4DF] pt-6 space-y-3 text-xs text-[#52525B]">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Unlimited practice attempts and re-evaluations</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Instant verified server-side entitlement granting</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Personalized vector A4 OMR answer sheet generated automatically</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B]" />
                  <span>Permanent access to past scorecards and performance records</span>
                </div>
              </div>
            </div>

            <Link
              href="/signup"
              className="btn-merit-primary mt-8 block w-full py-3 text-center text-xs font-bold uppercase tracking-wider"
            >
              Get Started with ₹10 Papers
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
