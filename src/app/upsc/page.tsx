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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen">
      <section className="border-b border-[#E6E5DE] bg-[#F0EFEA]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white px-3.5 py-1 text-xs font-semibold text-[#758B62] shadow-soft">
              Union Public Service Commission (CSE)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#263126]">
              FORT UPSC Civil Services
            </h1>
            <p className="mt-4 text-lg text-[#73786E] leading-relaxed font-medium">
              Prelims objective rigor with negative marking (-0.66 / -0.83) alongside an advanced
              Mains descriptive answer-writing studio featuring live word counters, autosave, and
              rubric-based evaluation.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-7 py-3 text-sm font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
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
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
              <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                STAGE 1
              </span>
              <h3 className="mt-4 text-xl font-bold text-[#263126]">Prelims GS & CSAT</h3>
              <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
                Timed objective papers, negative marking calculation, statement-type questions, and
                subject-wise accuracy breakdowns.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
              <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                STAGE 2
              </span>
              <h3 className="mt-4 text-xl font-bold text-[#263126]">Mains Answer Writing Studio</h3>
              <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
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
