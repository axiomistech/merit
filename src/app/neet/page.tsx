import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, FileDown, BookOpen, Clock, Activity, Sparkles } from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';

export const metadata = {
  title: 'FORT NEET (UG) — Medical Entrance Examination Practice',
  description:
    'Dedicated preparation platform for NEET (UG) aspirants. Physics, Chemistry, Botany, Zoology with exact NTA marking (+4, -1), high-fidelity live OMR sheets, and printable A4 response sheets.',
};

export default function NeetLandingPage() {
  const neetInfo = EXAMINATIONS.find((e) => e.slug === 'neet')!;

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-16 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>NATIONAL ELIGIBILITY CUM ENTRANCE TEST (UG)</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight leading-[1.1] text-[#20252B]">
              Medical practice worth{' '}
              <span className="relative inline-block italic">
                scoring.
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
              Precision medical entrance simulation with exact 180-question physical-grade OMR sheets, NTA +4 / -1 scoring, and atomic concept analytics across Physics, Chemistry, Botany, and Zoology.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/exam/neet-demo"
                className="rounded-xl bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
              >
                Start Free Diagnostic Mock
              </Link>
              <Link
                href="/neet/omr-practice"
                className="rounded-xl border border-[#20252B]/20 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-[#20252B] hover:bg-white transition-all shadow-sm"
              >
                Physical OMR Practice
              </Link>
            </div>
          </div>
        </div>

        {/* NEET Blueprint & Pattern */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-3xl font-bold font-serif text-[#20252B]">
              Standard NTA NEET (UG) Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '200 Minutes', detail: '3 Hours 20 Minutes countdown' },
              { label: 'Total Marks', value: '720 Marks', detail: '180 Questions to attempt' },
              { label: 'Marking Scheme', value: '+4 / -1', detail: '4 for correct, -1 for wrong' },
              { label: 'Format', value: 'Pen & Paper OMR', detail: 'Auto-downloadable A4 sheet' },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-[#66727D]">{stat.label}</div>
                <div className="mt-2 text-3xl font-extrabold font-serif text-[#20252B]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#66727D]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Subjects Breakdown */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              DISCIPLINE PORTFOLIO
            </div>
            <h2 className="mt-1 text-3xl font-bold font-serif text-[#20252B]">
              NCERT Core Mapping
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {neetInfo.subjects.map((sub) => (
              <div
                key={sub.id}
                className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-[11px] font-bold text-[#20252B]">
                    45 Questions
                  </span>
                  <h3 className="mt-4 text-xl font-bold font-serif text-[#20252B]">{sub.name}</h3>
                  <div className="mt-2 space-y-1 text-xs text-[#66727D]">
                    <div>{sub.chaptersCount} Chapters (Class 11 & 12)</div>
                    <div>{sub.questionCount}+ Curated Questions</div>
                  </div>
                </div>

                <Link
                  href="/exam/neet-demo"
                  className="mt-6 flex items-center justify-between text-xs font-bold text-[#20252B] hover:text-[#20252B]"
                >
                  <span>Practice {sub.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
