import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'FORT UPSC Civil Services — Prelims & Mains Answer Writing Studio',
  description:
    'Dedicated UPSC CSE preparation with timed GS & CSAT tests, negative marking, and rich-text Mains descriptive answer writing with rubric analytics.',
};

export default function UpscLandingPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen">
      <section className="border-b border-[#263554] bg-[#11182A]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#8B5CF6]/15 px-3 py-1 text-xs font-semibold text-[#8B5CF6]">
              Union Public Service Commission (CSE)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              FORT UPSC Civil Services
            </h1>
            <p className="mt-4 text-lg text-[#A7B0C0] leading-relaxed">
              Prelims objective rigor with negative marking (-0.66 / -0.83) alongside an advanced
              Mains descriptive answer-writing studio featuring live word counters, autosave, and
              rubric-based evaluation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
              >
                <span>Enter UPSC Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-6">
              <span className="rounded bg-[#8B5CF6]/20 px-2 py-0.5 text-xs font-bold text-[#8B5CF6]">
                STAGE 1
              </span>
              <h3 className="mt-3 text-xl font-bold text-[#F5F7FB]">Prelims GS & CSAT</h3>
              <p className="mt-2 text-xs text-[#A7B0C0]">
                Timed objective papers, negative marking calculation, statement-type questions, and
                subject-wise accuracy breakdowns.
              </p>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-6">
              <span className="rounded bg-[#8B5CF6]/20 px-2 py-0.5 text-xs font-bold text-[#8B5CF6]">
                STAGE 2
              </span>
              <h3 className="mt-3 text-xl font-bold text-[#F5F7FB]">Mains Answer Writing Studio</h3>
              <p className="mt-2 text-xs text-[#A7B0C0]">
                Draft 150-word and 250-word GS responses with live word counts, timer pacing, rubric
                criteria evaluation, and draft history.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
