import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'FORT JEE Advanced — Multi-Correct & Partial Marking Architecture',
  description:
    'Advanced examination simulation for IIT aspirants featuring multi-correct questions, variable marking schemes, and Paper 1 & Paper 2 workflows.',
};

export default function JeeAdvancedLandingPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen">
      <section className="border-b border-[#E6E5DE] bg-[#F0EFEA]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white px-3.5 py-1 text-xs font-semibold text-[#758B62] shadow-soft">
              IIT Joint Entrance Examination (Advanced)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-[#263126]">
              FORT JEE Advanced
            </h1>
            <p className="mt-4 text-lg text-[#73786E] leading-relaxed font-medium">
              Multi-correct answers with strict partial marking, numerical integer grids, matching
              matrices, and two-paper comprehensive testing designed specifically for IIT
              aspirants.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-7 py-3 text-sm font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
              >
                <span>Enter JEE Advanced Portal</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
              <h3 className="text-base font-bold text-[#263126]">Multi-Correct Partial Scoring</h3>
              <p className="mt-2 text-xs text-[#73786E]">
                Supports full +4, partial +1 / +2 / +3 for subsets of correct options, and -2 for
                wrong selection.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
              <h3 className="text-base font-bold text-[#263126]">Paper 1 & Paper 2 Architecture</h3>
              <p className="mt-2 text-xs text-[#73786E]">
                Simulate the grueling 6-hour two-shift testing environment with consolidated rank
                projections.
              </p>
            </div>
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
              <h3 className="text-base font-bold text-[#263126]">Numerical Grid Precision</h3>
              <p className="mt-2 text-xs text-[#73786E]">
                Decimal precision up to two places with automated tolerance verification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
