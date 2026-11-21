import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, FileDown, BookOpen, Clock, Activity } from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';

export const metadata = {
  title: 'FORT NEET (UG) — Medical Entrance Examination Practice',
  description:
    'Dedicated preparation platform for NEET (UG) aspirants. Physics, Chemistry, Botany, Zoology with exact NTA marking (+4, -1), high-fidelity live OMR sheets, and printable A4 response sheets.',
};

export default function NeetLandingPage() {
  const neetInfo = EXAMINATIONS.find((e) => e.slug === 'neet')!;

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-[#263554] bg-[#11182A]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#10B981]/15 px-3 py-1 text-xs font-semibold text-[#10B981]">
              National Eligibility cum Entrance Test (UG)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              FORT NEET (UG)
            </h1>
            <p className="mt-4 text-lg text-[#A7B0C0] leading-relaxed">
              Precision medical entrance practice with physical-grade live OMR answer sheet
              simulation, exact NTA marking (+4, -1, 0), and concept-level mastery analytics across
              Physics, Chemistry, Botany, and Zoology.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/exam/neet-demo"
                className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
              >
                <span>Start Free Diagnostic Test</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/neet/omr-practice"
                className="flex items-center gap-2 rounded-xl border border-[#263554] bg-[#172033] px-6 py-3 text-sm font-semibold text-[#F5F7FB] hover:border-[#6486C6]"
              >
                <span>Live OMR Practice</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* NEET Blueprint & Pattern */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
            Examination Blueprint
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#F5F7FB]">
            Standard NTA NEET (UG) Format
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '200 Minutes', detail: '3 Hours 20 Minutes' },
              { label: 'Total Marks', value: '720 Marks', detail: '180 Questions to attempt' },
              { label: 'Marking Scheme', value: '+4 / -1', detail: '4 for correct, -1 for wrong' },
              { label: 'Format', value: 'Pen & Paper OMR', detail: 'Live synchronized sheet' },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-xl border border-[#263554] bg-[#11182A] p-5">
                <div className="text-xs text-[#A7B0C0]">{stat.label}</div>
                <div className="mt-2 text-2xl font-extrabold text-[#F5F7FB]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#7C8799]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subjects */}
      <section className="border-t border-[#263554] bg-[#11182A]/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
            Subject Curricula
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#F5F7FB]">
            4 Dedicated Disciplines
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
            {neetInfo.subjects.map((sub) => (
              <div
                key={sub.slug}
                className="rounded-xl border border-[#263554] bg-[#172033] p-6 hover:border-[#6486C6] transition-colors"
              >
                <div className="font-mono text-xs font-bold text-[#6486C6]">45 Questions</div>
                <h3 className="mt-2 text-lg font-bold text-[#F5F7FB]">{sub.name}</h3>
                <div className="mt-4 space-y-1 text-xs text-[#A7B0C0]">
                  <div>Chapters: {sub.chaptersCount} NCERT Units</div>
                  <div>Question Bank: {sub.questionCount}+ Questions</div>
                </div>

                <Link
                  href={`/neet/practice?subject=${sub.slug}`}
                  className="mt-6 flex items-center justify-between text-xs font-semibold text-[#6486C6] hover:underline"
                >
                  <span>Practice {sub.name}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Available Mock Tests */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
                Simulations
              </h2>
              <p className="mt-1 text-2xl font-bold tracking-tight text-[#F5F7FB]">
                All India NEET Mock Papers
              </p>
            </div>
            <Link href="/pricing" className="text-xs font-semibold text-[#6486C6] hover:underline">
              First paper free • ₹10 subsequent
            </Link>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#263554] bg-[#11182A] p-6">
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-bold text-[#10B981]">
                    FREE ELIGIBLE
                  </span>
                  <span className="text-xs text-[#A7B0C0]">200 Mins • 720 Marks</span>
                </div>
                <h3 className="mt-2 text-lg font-bold text-[#F5F7FB]">{SAMPLE_NEET_PAPER.name}</h3>
                <p className="mt-1 text-xs text-[#A7B0C0]">
                  Full syllabus balanced paper with Physics, Chemistry, Botany, and Zoology.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Link
                  href="/exam/neet-demo"
                  className="rounded-lg bg-[#6486C6] px-5 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
                >
                  Start Simulation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
