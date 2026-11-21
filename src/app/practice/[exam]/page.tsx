'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  Clock,
  Sparkles,
  Zap,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';

export default function ExamPracticePage() {
  const params = useParams();
  const examSlug = (params?.exam as string) || 'neet';
  const exam = EXAMINATIONS.find((e) => e.slug === examSlug) || EXAMINATIONS[0];

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/practice" className="hover:text-[#20252B]">Practice</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B]">{exam.name}</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold font-sans text-[#20252B]">
            {exam.name} Practice Hub
          </h1>
          <p className="mt-1 text-sm text-[#66727D]">
            Select a subject discipline to browse units, chapters, and targeted concept question banks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {exam.subjects.map((sub, idx) => (
            <div
              key={sub.slug}
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CC6E0] transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs text-[#66727D] font-mono mb-2">
                  <span>DISCIPLINE 0{idx + 1}</span>
                  <span className="font-bold text-[#9CC6E0]">Active Curriculum</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-[#20252B]">{sub.name}</h3>
                <p className="mt-1 text-xs text-[#66727D] leading-relaxed">
                  Rigorous practice problems with KaTeX solutions, instant 15-second standard feedback, and diagnostic velocity telemetry.
                </p>
              </div>

              <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-between">
                <span className="text-xs text-[#66727D]">45+ Chapters</span>
                <Link
                  href={`/practice/${exam.slug}/${sub.slug}`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
                >
                  Browse Chapters
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
