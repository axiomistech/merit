'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';

export default function ExamsHubPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DCE2E6] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
          Curricula Directory
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold font-serif text-[#20252B]">
          Supported Competitive Examinations
        </h1>
        <p className="text-xs text-[#66727D]">
          Select an examination to view syllabus trees, exam blueprints, marking schemes, and past papers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMINATIONS.map((exam) => (
          <div
            key={exam.slug}
            className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm hover:border-[#9CC6E0] transition-all flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
                  {exam.shortName}
                </span>
                <span className="text-xs font-mono text-[#66727D]">
                  {exam.subjects.length} Disciplines
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold font-serif text-[#20252B]">
                {exam.name}
              </h3>
              <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
                {exam.description}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-[#20252B]">
                <div className="flex justify-between">
                  <span className="text-[#66727D]">Subjects:</span>
                  <span className="font-mono font-bold text-[#20252B]">
                    {exam.subjects.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66727D]">Focus:</span>
                  <span className="font-semibold text-[#20252B] truncate max-w-[200px]">{exam.tagline}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#DCE2E6] flex gap-2">
              <Link
                href={`/dashboard/${exam.slug}`}
                className="flex-1 rounded-full bg-[#9CC6E0] py-2.5 text-center text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#C90026] transition-all"
              >
                Enter Module
              </Link>
              <Link
                href="/dashboard/practice"
                className="rounded-full border border-[#DCE2E6] bg-[#F1F3F4] px-4 py-2.5 text-xs font-semibold text-[#20252B] hover:bg-[#E9EEF1] transition-all"
              >
                Practice
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
