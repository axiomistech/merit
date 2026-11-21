import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, FileSpreadsheet, Lock } from 'lucide-react';

export const metadata = {
  title: 'Platform Features — FORT Learning',
  description:
    'Core product architecture of FORT Learning: server-authoritative timer, live OMR synchronization, centralized scoring engine, and KaTeX mathematical rendering.',
};

export default function FeaturesPage() {
  const features = [
    {
      title: 'Server-Authoritative Exam Engine',
      desc: 'Timer counts down against a tamper-proof server deadline. Browser sleep, refresh, or tab switching will not restart the timer. Automatic submission fires on zero.',
      tag: 'Core Reliability',
    },
    {
      title: 'Live OMR Response Sheet',
      desc: 'Bidirectional synchronization between clicked options and physical OMR bubbles. Generates high-resolution vector A4 print-ready PDFs with candidate registration barcodes.',
      tag: 'Physical Simulation',
    },
    {
      title: 'Centralized Multi-Scheme Scoring',
      desc: 'Unified engine supporting NEET (+4, -1), JEE Main MCQs and numerical tolerances, JEE Advanced partial marking, and UPSC negative penalties.',
      tag: 'Scoring Engine',
    },
    {
      title: 'KaTeX Mathematical & Chemical Notation',
      desc: 'Crisp mathematical equations, chemical formulas, and scientific notation rendered cleanly on mobile, tablet, and desktop.',
      tag: 'Typography',
    },
    {
      title: 'Idempotent Payment Settlement',
      desc: 'HMAC SHA256 verified Razorpay webhooks, preventing duplicate entitlement grants and race conditions on free paper claims.',
      tag: 'Security',
    },
    {
      title: 'Evidence-Based Remediation Queue',
      desc: 'Recommends revision based purely on candidate data—explaining explicitly why each topic was prioritized without fabricated claims.',
      tag: 'Analytics',
    },
  ];

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-16 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>PLATFORM ARCHITECTURE & CAPABILITIES</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight leading-[1.1] text-[#20252B]">
              Engineered for academic{' '}
              <span className="relative inline-block italic">
                seriousness.
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

            <p className="text-base sm:text-lg text-[#20252B]/90 font-medium leading-relaxed">
              Every feature on FORT Learning is designed to solve a specific engineering challenge in high-stakes competitive examination preparation. Built for performance, security, and truth in measurement.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-xl bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
              >
                Experience Platform
              </Link>
            </div>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div key={idx} className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
              <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
                {f.tag}
              </span>
              <h3 className="mt-4 text-lg font-bold font-serif text-[#20252B]">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#66727D]">{f.desc}</p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#20252B]">
            Start Your Structured Preparation
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#66727D]">
            Get 1 full examination paper credited automatically on registration.
          </p>
          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
