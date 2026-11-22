'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Shield,
  Clock,
  Award,
  CheckCircle2,
  FileText,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';

export default function PublicExamDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'neet';

  const exam = EXAMINATIONS.find((e) => e.slug === slug) || EXAMINATIONS[0];
  const isNeet = exam.slug === 'neet';

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-10">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/" className="hover:text-[#20252B]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/exams" className="hover:text-[#20252B]">Exams</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B]">{exam.name}</span>
        </div>

        {/* Hero Card */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#9CC6E0]/20 text-[#3B4C30]">
              {exam.category.replace('_', ' ')}
            </span>
            <span className="text-xs font-mono font-bold text-[#66727D]">Official Specification 2026</span>
          </div>

          <div>
            <h1 className="text-3xl sm:text-4xl font-bold font-sans text-[#20252B]">{exam.name}</h1>
            <p className="mt-2 text-sm text-[#66727D] leading-relaxed max-w-3xl">
              {exam.description}
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#DCE2E6]">
            <div className="p-3.5 rounded-xl bg-[#F1F3F4] border border-[#DCE2E6]">
              <div className="text-[10px] uppercase font-bold text-[#66727D]">Duration</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {isNeet ? '200 Mins' : '180 Mins'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4] border border-[#DCE2E6]">
              <div className="text-[10px] uppercase font-bold text-[#66727D]">Total Marks</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {isNeet ? '720 Marks' : '300 Marks'}
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4] border border-[#DCE2E6]">
              <div className="text-[10px] uppercase font-bold text-[#66727D]">Marking Scheme</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                +4 / -1
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4] border border-[#DCE2E6]">
              <div className="text-[10px] uppercase font-bold text-[#66727D]">OMR Mode</div>
              <div className="mt-1 text-base font-bold text-[#3B4C30]">
                {isNeet ? 'Printable A4' : 'CBT Digital'}
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/practice"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              Start Practice
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/practice/${exam.slug}`}
              className="px-5 py-3 rounded-xl border border-[#DCE2E6] bg-white text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] transition-colors"
            >
              Practice Disciplines
            </Link>
            {isNeet && (
              <Link
                href="/neet/omr-practice"
                className="px-5 py-3 rounded-xl border border-[#9CC6E0] bg-[#9CC6E0]/20 text-xs font-semibold text-[#20252B] hover:bg-[#9CC6E0]/30 transition-colors"
              >
                Physical OMR Practice
              </Link>
            )}
          </div>
        </div>

        {/* Subjects & Syllabus Structure */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <div>
            <h2 className="text-xl font-bold font-sans text-[#20252B]">Syllabus Hierarchy & Disciplines</h2>
            <p className="mt-1 text-xs text-[#66727D]">
              Structured curriculum aligned with current official regulatory guidelines.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exam.subjects.map((sub, idx) => (
              <div
                key={sub.slug}
                className="rounded-2xl border border-[#DCE2E6] p-5 bg-[#F1F3F4]/40 space-y-2 hover:border-[#9CC6E0] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-[#66727D]">Section 0{idx + 1}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white border border-[#DCE2E6] text-[#20252B]">
                    45 Questions
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#20252B]">{sub.name}</h3>
                <p className="text-xs text-[#66727D] leading-relaxed">
                  Rigorous conceptual question sets spanning theoretical principles, numerical analysis, and graphical problem-solving.
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Preparation Gateway */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-4 text-center">
          <div className="max-w-md mx-auto space-y-2">
            <h3 className="text-xl font-bold font-sans text-[#20252B]">
              Ready to Practice {exam.name}?
            </h3>
            <p className="text-xs text-[#66727D] leading-relaxed">
              Access published examination papers, timed CBT simulations, and physical vector A4 OMR sheets in your QP Prep workspace.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/qp-prep"
              className="glass-racing-red inline-flex items-center gap-2 rounded-full px-8 py-3 text-xs font-bold text-white shadow-lg shadow-[#E4002B]/25 transition-transform hover:scale-[1.02]"
            >
              <span>Start Practice in QP Prep</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
