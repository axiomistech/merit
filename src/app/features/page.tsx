import React from 'react';
import Link from 'next/link';
import { ArrowRight, Cpu, Layers, ShieldCheck, Zap, FileSpreadsheet, Lock } from 'lucide-react';

export const metadata = {
  title: 'Platform Features — MERITWISE',
  description:
    'Core product architecture of MERITWISE: server-authoritative timer, live OMR synchronization, centralized scoring engine, and KaTeX mathematical rendering.',
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
      desc: 'Crisp mathematical equations, chemical formulas, and scientific notation rendered cleanly across devices.',
      tag: 'Typography',
    },
    {
      title: 'Idempotent Payment Settlement',
      desc: 'HMAC SHA256 verified payment webhooks, preventing duplicate entitlement grants and race conditions on free paper claims.',
      tag: 'Security',
    },
    {
      title: 'Authentic Performance Diagnostics',
      desc: 'Sectional speed, accuracy, and sub-concept breakdown derived purely from genuine test attempts without simulated scores.',
      tag: 'Analytics',
    },
  ];

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#52525B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
            PLATFORM ARCHITECTURE & CAPABILITIES
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316]">
            Engineered for academic seriousness.
          </h1>

          <p className="text-base sm:text-lg text-[#52525B] max-w-2xl mx-auto leading-relaxed">
            Every feature on MERITWISE is designed to solve a specific engineering challenge in competitive examination preparation. Built for performance, security, and truth in measurement.
          </p>

          <div className="pt-2">
            <Link
              href="/signup"
              className="btn-merit-primary inline-flex px-8 py-3 text-xs font-bold uppercase tracking-wider"
            >
              <span>Experience Platform</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f) => (
            <div key={f.title} className="merit-card p-8 shadow-xs space-y-3 flex flex-col justify-between">
              <div className="space-y-2">
                <span className="rounded-full bg-[#F7F3EB] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6E5328]">
                  {f.tag}
                </span>
                <h3 className="text-base font-bold text-[#121316]">{f.title}</h3>
                <p className="text-xs text-[#52525B] leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
