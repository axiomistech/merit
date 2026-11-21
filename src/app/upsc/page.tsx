import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Feather, Compass, BookOpen } from 'lucide-react';

export const metadata = {
  title: 'FORT UPSC Civil Services — Prelims & Mains Answer Writing Studio',
  description:
    'Dedicated UPSC CSE preparation with timed GS & CSAT tests, negative marking, and rich-text Mains descriptive answer writing with rubric analytics.',
};

export default function UpscLandingPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-16 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>UNION PUBLIC SERVICE COMMISSION • CIVIL SERVICES (CSE)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight leading-[1.1] text-[#20252B]">
              Analytical depth &{' '}
              <span className="relative inline-block italic">
                articulation.
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
              Prelims objective accuracy with fractional negative marking (-0.66 / -0.83) alongside an advanced Mains descriptive answer-writing studio featuring live word counters, autosave, and rubric-based structural evaluation.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-xl bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
              >
                Enter UPSC Portal
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[#20252B]/20 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-[#20252B] hover:bg-white transition-all shadow-sm"
              >
                Explore CSE Curricula
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
              Dual-Stage Civil Services Preparation
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Stage 1: Prelims GS-I', value: '200 Marks', detail: '100 Questions • -0.66 Negative' },
              { label: 'Stage 1: CSAT GS-II', value: '200 Marks', detail: '80 Questions • 33% Qualifying' },
              { label: 'Stage 2: Mains Studio', value: '1750 Marks', detail: 'Descriptive Answer Writing' },
              { label: 'Evaluation Format', value: 'Rubric Criteria', detail: 'Structure, Facts & Analysis' },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-[#66727D]">{stat.label}</div>
                <div className="mt-2 text-3xl font-extrabold font-sans text-[#20252B]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#66727D]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Stages Deep Dive */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
              Stage 1 • Prelims Examination
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#20252B] font-sans">General Studies & CSAT Precision</h3>
            <p className="mt-2 text-sm text-[#66727D] leading-relaxed">
              Master the elimination technique across multi-statement questions (Statements I & II correct, Pair Matching, Assertion-Reasoning). Detailed historical cutoff analytics.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-[#20252B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                <span>Precision negative marking calculation</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                <span>Polity, Economy, Environment, History, and Current Affairs mastery</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FDEDF0] px-3 py-1 text-xs font-bold text-[#E4002B]">
              Stage 2 • Mains Studio
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#20252B] font-sans">Descriptive Answer Writing Studio</h3>
            <p className="mt-2 text-sm text-[#66727D] leading-relaxed">
              Craft 150-word and 250-word structured answers with live word counter indicators, markdown support for subheadings and bullet points, and automatic cloud draft persistence.
            </p>
            <ul className="mt-6 space-y-3 text-xs text-[#20252B]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E4002B]" />
                <span>Multi-parameter rubric breakdown (Introduction, Content, Conclusion)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CC6E0]" />
                <span>Model answers written by former civil service rankers</span>
              </li>
            </ul>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#20252B]">
            Begin Your Civil Services Journey
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#66727D]">
            Start practicing with genuine Prelims mock papers and Mains answer writing prompts.
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
