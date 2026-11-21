import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Layers, Award, Terminal } from 'lucide-react';

export const metadata = {
  title: 'FORT JEE Advanced — Multi-Correct & Partial Marking Architecture',
  description:
    'Advanced examination simulation for IIT aspirants featuring multi-correct questions, variable marking schemes, and Paper 1 & Paper 2 workflows.',
};

export default function JeeAdvancedLandingPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Sage Green (Sorrel Trattoria Aesthetic) */}
        <div className="rounded-[32px] bg-[#9CAF88] p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="h-px w-6 bg-white/60" />
              <span>IIT JOINT ENTRANCE EXAMINATION (ADVANCED)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight leading-[1.1] text-white">
              Mathematical & physical{' '}
              <span className="relative inline-block italic">
                rigor.
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
              Multi-correct selections with strict partial marking (+4, +3, +2, +1, -2), numerical decimal grids, paragraph questions, and complete Paper 1 & Paper 2 examination orchestration.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
              >
                Enter JEE Advanced Portal
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-white/60 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                Advanced Paper Packs
              </Link>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-3xl font-bold font-serif text-[#263126]">
              IIT JEE Advanced Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Two Shifts Structure',
                value: 'Paper 1 + Paper 2',
                sub: 'Simulate the grueling 6-hour endurance battle',
              },
              {
                title: 'Partial Marking Algorithm',
                value: '+4 / +3 / +2 / +1 / -2',
                sub: 'Server-side subset matching evaluation',
              },
              {
                title: 'Question Typologies',
                value: '6 Format Types',
                sub: 'Multi-correct, NVQ, Matrix Match, Comprehension',
              },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-[#73786E]">{stat.title}</div>
                <div className="mt-2 text-3xl font-extrabold font-serif text-[#263126]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#92958D]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Highlights */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-bold text-[#758B62]">
              Algorithmic Scoring
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#263126] font-serif">Multi-Correct Partial Logic</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#73786E]">
              Evaluates true subsets of correct options, awarding tiered points while strictly enforcing penalties for selecting even a single incorrect option.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FCE8E4] px-3 py-1 text-xs font-bold text-[#E8412C]">
              Endurance Protocol
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#263126] font-serif">Dual-Session Simulation</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#73786E]">
              Recreates the exact morning (09:00 - 12:00) and afternoon (14:30 - 17:30) test conditions to prepare students for mental fatigue management.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-bold text-[#758B62]">
              Root-Cause Breakdown
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#263126] font-serif">Step-by-Step Derivations</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#73786E]">
              Every solution includes verified mathematical derivations, free-body diagrams, and alternative shortcut verification methods.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#263126]">
            Ready for Advanced Conceptual Practice?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#73786E]">
            Start practicing with genuine IIT-level question papers and server-evaluated partial marking.
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
