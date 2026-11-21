import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock } from 'lucide-react';
import { SAMPLE_JEE_MAIN_PAPER } from '@/data/otherExamsData';
import { EXAMINATIONS } from '@/data/seedData';

export const metadata = {
  title: 'FORT JEE Main — Speed, Accuracy & Numerical Problem Mastery',
  description:
    'CBT examination simulation for JEE Main aspirants across Physics, Chemistry, and Mathematics with NTA pattern (+4, -1 for MCQs and numerical value questions).',
};

export default function JeeMainLandingPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen">
      <section className="border-b border-[#E6E5DE] bg-[#F0EFEA]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white px-3.5 py-1 text-xs font-semibold text-[#758B62] shadow-soft">
              Joint Entrance Examination (Main)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#263126]">
              FORT JEE Main
            </h1>
            <p className="mt-4 text-lg text-[#73786E] leading-relaxed font-medium">
              Speed, accuracy, and numerical question mastery under real Computer-Based Testing
              (CBT) conditions. Featuring MCQs and decimal/integer numerical response evaluations.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/exam/jee-main-demo"
                className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-7 py-3 text-sm font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
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
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
            Examination Blueprint
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#263126]">NTA JEE Main CBT Pattern</p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#73786E]">Physics, Chemistry, Math</div>
              <div className="mt-2 text-2xl font-black text-[#263126]">300 Marks</div>
              <div className="mt-1 text-xs text-[#92958D]">75 Questions to attempt</div>
            </div>
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#73786E]">Duration</div>
              <div className="mt-2 text-2xl font-black text-[#263126]">180 Minutes</div>
              <div className="mt-1 text-xs text-[#92958D]">Server authoritative countdown</div>
            </div>
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#73786E]">Marking</div>
              <div className="mt-2 text-2xl font-black text-[#263126]">+4 / -1</div>
              <div className="mt-1 text-xs text-[#92958D]">Applies to both Section A and B</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
