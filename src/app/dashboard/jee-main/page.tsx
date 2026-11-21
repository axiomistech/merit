'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SAMPLE_JEE_MAIN_PAPER } from '@/data/otherExamsData';

export default function StudentJeeMainDashboardPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-bold text-[#6486C6]">
            FORT JEE Main
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            JEE Main CBT Practice Studio
          </h1>
          <p className="text-xs text-[#A7B0C0]">Physics • Chemistry • Mathematics</p>
        </div>

        <Link
          href="/exam/jee-main-demo"
          className="rounded-xl bg-[#6486C6] px-4 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
        >
          Start 300-Mark Full Simulation
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {['Physics', 'Chemistry', 'Mathematics'].map((subject, idx) => (
          <div key={idx} className="rounded-xl border border-[#263554] bg-[#11182A] p-6">
            <h3 className="text-lg font-bold text-[#F5F7FB]">{subject}</h3>
            <p className="mt-2 text-xs text-[#A7B0C0]">
              25 Questions (20 MCQs + 5 Numerical Value Questions).
            </p>
            <Link
              href="/exam/jee-main-demo"
              className="mt-6 flex items-center justify-between text-xs font-semibold text-[#6486C6] hover:underline"
            >
              <span>Practice {subject}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
