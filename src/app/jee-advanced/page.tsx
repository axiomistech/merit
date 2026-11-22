import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Layers, Award, Terminal } from 'lucide-react';

export const metadata = {
  title: 'MERITWISE JEE Advanced — Multi-Correct & Partial Marking Architecture',
  description:
    'Advanced examination simulation for IIT aspirants featuring multi-correct questions, variable marking schemes, and Paper 1 & Paper 2 workflows.',
};

export default function JeeAdvancedLandingPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-16 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>IIT JOINT ENTRANCE EXAMINATION (ADVANCED)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight leading-[1.1] text-[#20252B]">
              Mathematical & physical{' '}
              <span className="relative inline-block italic">
                rigor.
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
              Multi-correct selections with strict partial marking (+4, +3, +2, +1, -2), numerical decimal grids, paragraph questions, and complete Paper 1 & Paper 2 examination orchestration.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-xl bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
              >
                Enter JEE Advanced Portal
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[#20252B]/20 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-[#20252B] hover:bg-white transition-all shadow-sm"
              >
                Advanced Paper Packs
              </Link>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-3xl font-bold font-sans text-[#20252B]">
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
              <div key={idx} className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-[#66727D]">{stat.title}</div>
                <div className="mt-2 text-3xl font-extrabold font-sans text-[#20252B]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#66727D]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Highlights */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
              Algorithmic Scoring
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#20252B] font-sans">Multi-Correct Partial Logic</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              Evaluates true subsets of correct options, awarding tiered points while strictly enforcing penalties for selecting even a single incorrect option.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDEDF0] px-3 py-1 text-xs font-bold text-[#E4002B]">
              Endurance Protocol
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#20252B] font-sans">Dual-Session Simulation</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              Recreates the exact morning (09:00 - 12:00) and afternoon (14:30 - 17:30) test conditions to prepare students for mental fatigue management.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
              Root-Cause Breakdown
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#20252B] font-sans">Step-by-Step Derivations</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              Every solution includes verified mathematical derivations, free-body diagrams, and alternative shortcut verification methods.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#20252B]">
            Ready for Advanced Conceptual Practice?
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#66727D]">
            Start practicing with genuine IIT-level question papers and server-evaluated partial marking.
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
