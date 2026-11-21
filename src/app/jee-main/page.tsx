import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock, Calculator } from 'lucide-react';
import { SAMPLE_JEE_MAIN_PAPER } from '@/data/otherExamsData';
import { EXAMINATIONS } from '@/data/seedData';

export const metadata = {
  title: 'FORT JEE Main — Speed, Accuracy & Numerical Problem Mastery',
  description:
    'CBT examination simulation for JEE Main aspirants across Physics, Chemistry, and Mathematics with NTA pattern (+4, -1 for MCQs and numerical value questions).',
};

export default function JeeMainLandingPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen">
      <section className="border-b border-[#263554] bg-[#11182A]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#6486C6]/15 px-3 py-1 text-xs font-semibold text-[#6486C6]">
              Joint Entrance Examination (Main)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              FORT JEE Main
            </h1>
            <p className="mt-4 text-lg text-[#A7B0C0] leading-relaxed">
              Speed, accuracy, and numerical question mastery under real Computer-Based Testing
              (CBT) conditions. Featuring MCQs and decimal/integer numerical response evaluations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/exam/jee-main-demo"
                className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
              >
                <span>Start Free JEE Main Mock</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Blueprint */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
            Examination Blueprint
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#F5F7FB]">NTA JEE Main CBT Pattern</p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-xl border border-[#263554] bg-[#11182A] p-5">
              <div className="text-xs text-[#A7B0C0]">Physics, Chemistry, Math</div>
              <div className="mt-2 text-2xl font-extrabold text-[#F5F7FB]">300 Marks</div>
              <div className="mt-1 text-xs text-[#7C8799]">75 Questions to attempt</div>
            </div>
            <div className="rounded-xl border border-[#263554] bg-[#11182A] p-5">
              <div className="text-xs text-[#A7B0C0]">Duration</div>
              <div className="mt-2 text-2xl font-extrabold text-[#F5F7FB]">180 Minutes</div>
              <div className="mt-1 text-xs text-[#7C8799]">Server authoritative countdown</div>
            </div>
            <div className="rounded-xl border border-[#263554] bg-[#11182A] p-5">
              <div className="text-xs text-[#A7B0C0]">Marking</div>
              <div className="mt-2 text-2xl font-extrabold text-[#F5F7FB]">+4 / -1</div>
              <div className="mt-1 text-xs text-[#7C8799]">Applies to both Section A and B</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
