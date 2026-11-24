'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers, Shield, CheckCircle2, AlertTriangle, Sparkles, BookOpen } from 'lucide-react';
import { JeeAdvancedSyllabusExplorer } from '@/components/syllabus/JeeAdvancedSyllabusExplorer';

export default function StudentJeeAdvancedDashboardPage() {
  const paperTypes = [
    {
      title: 'Paper 1 Full Simulation',
      subtitle: 'Physics • Chemistry • Mathematics',
      marks: 180,
      duration: '180 Mins',
      sections: [
        'Section 1: Single-Option Correct (+3 / -1)',
        'Section 2: Multi-Option Correct with Strict Partial Marking (+4 / +3 / +2 / +1 / -2)',
        'Section 3: Non-Negative Numerical Values (+4 / 0)',
      ],
    },
    {
      title: 'Paper 2 Full Simulation',
      subtitle: 'Physics • Chemistry • Mathematics',
      marks: 180,
      duration: '180 Mins',
      sections: [
        'Section 1: Multi-Correct Questions with Strict Negative Scoring (+4 / -2)',
        'Section 2: Paragraph Comprehension & Stem Questions (+3 / 0)',
        'Section 3: Matrix Match List-I & List-II Matching (+3 / -1)',
      ],
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-semibold text-[#20252B]">
            <span>IIT Rigor & Partial Scoring Standard</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            JEE Advanced Simulation Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Exact partial scoring algorithms, negative penalty risk modelling, and complex multi-concept problems.
          </p>
        </div>

        <Link
          href="/exam/jee-advanced-demo"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-5 py-2.5 text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#C90026] transition-all"
        >
          <span>Launch Paper 1 Simulation</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Partial Scoring Matrix Callout */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <h2 className="text-base font-bold text-[#20252B]">Strict Partial Marking Engine Rulebook</h2>
        <p className="mt-1 text-xs text-[#66727D]">
          MERITWISE implements the exact mathematical partial-credit algorithm specified by Joint Admission Board (JAB).
        </p>

        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-4 text-xs">
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B] font-mono">+4 Full Marks</div>
            <p className="mt-1 text-[11px] text-[#66727D]">
              All correct options are chosen and zero incorrect options are selected.
            </p>
          </div>
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B] font-mono">+3 / +2 Partial</div>
            <p className="mt-1 text-[11px] text-[#66727D]">
              Subset of correct options chosen when 3 or 4 options are correct, and no wrong option is marked.
            </p>
          </div>
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B] font-mono">+1 Partial</div>
            <p className="mt-1 text-[11px] text-[#66727D]">
              Only one correct option is chosen when two or more correct options exist, without wrong options.
            </p>
          </div>
          <div className="rounded-xl bg-[#FDEDF0] p-4">
            <div className="font-bold text-[#E4002B] font-mono">-2 Negative Mark</div>
            <p className="mt-1 text-[11px] text-[#66727D]">
              If ANY incorrect option is marked, full negative penalty (-2) is applied immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Papers Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {paperTypes.map((paper, idx) => (
          <div
            key={idx}
            className="flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-[#66727D]">
                <span className="font-semibold text-[#20252B]">Full Length Mock</span>
                <span className="font-mono">{paper.duration} • {paper.marks} Marks</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#20252B] font-sans">{paper.title}</h3>
              <p className="mt-1 text-xs text-[#66727D]">{paper.subtitle}</p>

              <div className="mt-4 space-y-2 border-t border-[#DCE2E6] pt-4 text-xs text-[#66727D]">
                <div className="font-bold text-[#20252B]">Sectional Composition:</div>
                {paper.sections.map((sec, sIdx) => (
                  <div key={sIdx} className="flex items-start gap-2 text-[11px]">
                    <div className="mt-1 h-1.5 w-1.5 rounded-full bg-[#9CC6E0] shrink-0" />
                    <span>{sec}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/exam/jee-advanced-demo"
              className="mt-6 flex items-center justify-between rounded-xl bg-[#F1F3F4] px-4 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#E9EEF1] transition-colors"
            >
              <span>Attempt {paper.title}</span>
              <ArrowRight className="h-4 w-4 text-[#20252B]" />
            </Link>
          </div>
        ))}
      </div>

      {/* Official Syllabus Section */}
      <div className="pt-6 border-t border-[#DCE2E6]">
        <div className="mb-4">
          <h2 className="text-xl font-bold font-sans text-[#20252B]">
            Official IIT JEE (Advanced) Syllabus Explorer
          </h2>
          <p className="text-xs text-[#66727D]">
            Track every unit and check the 14 classical topics retained exclusively in JEE Advanced.
          </p>
        </div>
        <JeeAdvancedSyllabusExplorer />
      </div>
    </div>
  );
}
