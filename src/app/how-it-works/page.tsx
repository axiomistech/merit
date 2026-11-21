import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';

export const metadata = {
  title: 'How It Works — FORT Learning',
  description:
    'Understand the FORT Learning methodology: Learn, Practice, Simulate, Analyze, and Continuously Improve.',
};

export default function HowItWorksPage() {
  const steps = [
    {
      num: '01',
      title: 'Target Onboarding',
      desc: 'Specify your target examination (NEET, JEE Main, JEE Advanced, UPSC, or Engineering), target examination year, and preparation stage.',
    },
    {
      num: '02',
      title: 'Atomic Concept Practice',
      desc: 'Move past broad chapter memorization. Practice at the atomic concept level where specific mathematical formulas and chemical mechanisms are tested.',
    },
    {
      num: '03',
      title: 'Server-Authoritative Mock Simulations',
      desc: 'Simulate high-stakes tests under rigorous conditions with server-authoritative countdown timers, autosaved answers, and live physical OMR bubble grids.',
    },
    {
      num: '04',
      title: 'Transparent Evaluation & Explanations',
      desc: 'Instant server-side grading calculating exact score, negative penalties, accuracy rate, attempt rate, and KaTeX-formatted solutions.',
    },
    {
      num: '05',
      title: 'Evidence-Based Remediation Queue',
      desc: 'Weak concepts and repeated errors are prioritized into your custom revision queue with plain explanations of why each item was recommended.',
    },
  ];

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-10">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Sage Green */}
        <div className="rounded-[32px] bg-[#9CAF88] p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="h-px w-6 bg-white/60" />
              <span>THE FIVE-STAGE METHODOLOGY</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight leading-[1.1] text-white">
              Preparation worth{' '}
              <span className="relative inline-block italic">
                trusting.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#E8412C] overflow-visible"
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

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
              A serious learning and examination practice infrastructure built around measurable accuracy, authentic simulation, physical OMR sheets, and continuous improvement. Zero vanity metrics.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
              >
                Begin Your Preparation
              </Link>
            </div>
          </div>
        </div>

        {/* Steps List */}
        <div className="space-y-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start gap-6 rounded-[28px] border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-sm transition-all hover:border-[#9CAF88]"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E9EEE3] font-mono text-xl font-bold text-[#758B62]">
                {s.num}
              </div>
              <div>
                <h3 className="text-xl font-bold font-serif text-[#263126]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#73786E]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#263126]">
            Start Your First Free Mock Now
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#73786E]">
            Get 1 full examination paper credited automatically on registration.
          </p>
          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all"
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
