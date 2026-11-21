import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

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
      desc: 'Simulate high-stakes tests under rigorous conditions with server-authoritative countdown timers, autosaved answers, and live OMR bubble grids.',
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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold sm:text-5xl text-[#263126]">How FORT Works</h1>
          <p className="mt-4 text-base text-[#73786E] max-w-2xl mx-auto">
            A serious learning and examination practice infrastructure built around measurable
            accuracy, authentic simulation, and continuous feedback.
          </p>
        </div>

        <div className="mt-16 space-y-6">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row items-start gap-6 rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-soft"
            >
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E9EEE3] font-mono text-xl font-bold text-[#758B62]">
                {s.num}
              </div>
              <div>
                <h3 className="text-xl font-bold text-[#263126]">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#73786E]">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9CAF88] px-8 py-3.5 text-sm font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
          >
            <span>Begin Your Preparation</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
