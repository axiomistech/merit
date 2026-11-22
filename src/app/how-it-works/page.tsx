import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export const metadata = {
  title: 'How It Works — MERITWISE',
  description:
    'Understand the MERITWISE examination methodology: Account Setup, Examination Selection, Unlock & Attempt, and Performance Tracking.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Create Candidate Account',
      desc: 'Register your candidate profile to receive an atomic, immutable Student ID (MW-26-XXXXXX) and your complimentary first paper.',
    },
    {
      num: '02',
      title: 'Select Examination Curriculum',
      desc: 'Focus on one of four standardized competitive categories: NEET (Medical), JEE (Engineering), UPSC (Civil Services), or GATE (Postgraduate).',
    },
    {
      num: '03',
      title: 'Unlock & Attempt Examination Paper',
      desc: 'Attempt authentic papers under Computer-Based Testing conditions with server-authoritative timers and instant vector A4 OMR sheets.',
    },
    {
      num: '04',
      title: 'Track Performance & Progress',
      desc: 'Access authoritative scorecards, discipline-wise accuracy metrics, and step-by-step verified solutions to eliminate weak areas.',
    },
  ];

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#52525B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
            THE FOUR-STAGE METHODOLOGY
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316]">
            Practice with purpose. Progress with merit.
          </h1>

          <p className="text-base text-[#52525B] leading-relaxed">
            Every feature on MERITWISE is designed to provide high-precision examination simulation and credible performance diagnostics.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {steps.map((s) => (
            <div key={s.num} className="merit-card p-8 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-mono text-2xl font-black text-[#8C6D3B]">{s.num}</span>
                <span className="h-2 w-2 rounded-full bg-[#121316]" />
              </div>
              <h3 className="text-lg font-bold text-[#121316]">{s.title}</h3>
              <p className="text-xs text-[#52525B] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="merit-card p-8 text-center space-y-4 shadow-xs">
          <h2 className="text-xl font-bold text-[#121316]">Ready to measure your genuine readiness?</h2>
          <p className="text-xs text-[#52525B] max-w-md mx-auto">
            Create your account today and unlock your first examination question paper free of charge.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="btn-merit-primary inline-flex px-8 py-3 text-xs font-bold uppercase tracking-wider"
            >
              <span>Start Practice</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
