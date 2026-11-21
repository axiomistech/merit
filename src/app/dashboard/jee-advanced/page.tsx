'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function StudentJeeAdvancedDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <span className="rounded bg-[#F59E0B]/20 px-2 py-0.5 text-xs font-bold text-[#F59E0B]">
            FORT JEE Advanced
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            JEE Advanced Rigor & Partial Scoring
          </h1>
        </div>

        <Link
          href="/dashboard"
          className="rounded-xl bg-[#6486C6] px-4 py-2.5 text-xs font-bold text-[#0B1020]"
        >
          View Question Blueprints
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6">
          <h3 className="text-base font-bold text-[#F5F7FB]">Paper 1 Simulation</h3>
          <p className="mt-2 text-xs text-[#A7B0C0]">
            Physics, Chemistry, Math. Section 1 (Single Correct), Section 2 (Multi-Correct with
            partial marking), Section 3 (Numerical Grids).
          </p>
        </div>
        <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6">
          <h3 className="text-base font-bold text-[#F5F7FB]">Paper 2 Simulation</h3>
          <p className="mt-2 text-xs text-[#A7B0C0]">
            Physics, Chemistry, Math. Matrix matching, paragraph comprehension, and non-negative
            integers.
          </p>
        </div>
      </div>
    </div>
  );
}
