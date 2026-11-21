import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

export const metadata = {
  title: 'FORT JEE Advanced — Multi-Correct & Partial Marking Architecture',
  description:
    'Advanced examination simulation for IIT aspirants featuring multi-correct questions, variable marking schemes, and Paper 1 & Paper 2 workflows.',
};

export default function JeeAdvancedLandingPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen">
      <section className="border-b border-[#263554] bg-[#11182A]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#F59E0B]/15 px-3 py-1 text-xs font-semibold text-[#F59E0B]">
              IIT Joint Entrance Examination (Advanced)
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              FORT JEE Advanced
            </h1>
            <p className="mt-4 text-lg text-[#A7B0C0] leading-relaxed">
              Multi-correct answers with strict partial marking, numerical integer grids, matching
              matrices, and two-paper comprehensive testing designed specifically for IIT
              aspirants.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
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
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-6">
              <h3 className="text-base font-bold text-[#F5F7FB]">Multi-Correct Partial Scoring</h3>
              <p className="mt-2 text-xs text-[#A7B0C0]">
                Supports full +4, partial +1 / +2 / +3 for subsets of correct options, and -2 for
                wrong selection.
              </p>
            </div>
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-6">
              <h3 className="text-base font-bold text-[#F5F7FB]">Paper 1 & Paper 2 Architecture</h3>
              <p className="mt-2 text-xs text-[#A7B0C0]">
                Simulate the grueling 6-hour two-shift testing environment with consolidated rank
                projections.
              </p>
            </div>
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-6">
              <h3 className="text-base font-bold text-[#F5F7FB]">Numerical Grid Precision</h3>
              <p className="mt-2 text-xs text-[#A7B0C0]">
                Decimal precision up to two places with automated tolerance verification.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
