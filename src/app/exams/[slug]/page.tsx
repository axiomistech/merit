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
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';
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
              href="/papers"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              Explore Official Question Papers
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

        {/* Sample Question Card with KaTeX rendering */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#9CC6E0]">Sample Examination Question</span>
              <h3 className="text-base font-bold text-[#20252B]">Physics: Laws of Motion & Friction</h3>
            </div>
            <span className="text-xs font-mono font-bold text-[#66727D]">+4 / -1 Marks</span>
          </div>

          <div className="text-xs text-[#20252B] leading-relaxed pt-2">
            <MathText text="A block of mass $m = 2\\text{ kg}$ rests on a rough horizontal surface with coefficient of static friction $\\mu_s = 0.4$. A horizontal force $F = 6\\text{ N}$ is applied to the block. Taking $g = 10\\text{ m/s}^2$, what is the magnitude of the frictional force exerted by the surface on the block?" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {[
              { key: 'A', text: '$8\\text{ N}$' },
              { key: 'B', text: '$6\\text{ N}$ (Correct)' },
              { key: 'C', text: '$0\\text{ N}$' },
              { key: 'D', text: '$2\\text{ N}$' },
            ].map((opt) => (
              <div
                key={opt.key}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-[#DCE2E6] text-xs bg-[#F1F3F4]/60"
              >
                <span className="font-bold font-mono w-5 text-[#66727D]">{opt.key}.</span>
                <MathText text={opt.text} />
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-[#DCE2E6] text-[11px] text-[#66727D]">
            <span className="font-bold text-[#20252B]">Explanation: </span>
            <MathText text="Maximum static friction $f_{s,\\max} = \\mu_s N = 0.4 \\times (2 \\times 10) = 8\\text{ N}$. Since the applied force $F = 6\\text{ N} < f_{s,\\max}$, the block does not slip, and static friction self-adjusts to exactly balance the applied force: $f_s = 6\\text{ N}$." />
          </div>
        </div>
      </div>
    </div>
  );
}
