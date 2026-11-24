'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, BookOpen, Layers, CheckCircle2, Award, Zap } from 'lucide-react';
import { SAMPLE_JEE_MAIN_PAPER } from '@/data/otherExamsData';

export default function StudentJeeMainDashboardPage() {
  const subjects = [
    {
      name: 'Physics',
      slug: 'physics',
      totalUnits: '20 Units',
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: [
        'Units 1-6: Classical Mechanics, Momentum & Rotational Motion',
        'Units 11-16: Electrostatics, Current, Magnetism & Optics',
        'Unit 20: 18 Practical Lab Experimental Skills (Vernier, Metre Bridge, etc.)',
      ],
      mastery: 72,
    },
    {
      name: 'Chemistry',
      slug: 'chemistry',
      totalUnits: '20 Units',
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: [
        'Units 1-8: Physical Chemistry (Equilibrium, Kinetics, Thermodynamics)',
        'Units 9-12: Inorganic (Periodicity, p-block, d/f-block, Coordination)',
        'Units 13-20: Organic (GOC, Oxygen/Nitrogen, Practical Analysis)',
      ],
      mastery: 80,
    },
    {
      name: 'Mathematics',
      slug: 'mathematics',
      totalUnits: '14 Units',
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: [
        'Units 1-6: Sets, Relations, Complex Numbers, Matrices & Series',
        'Units 7-9: Differential & Integral Calculus (10 Standard Forms)',
        'Units 10-13: Conic Sections, 3D Geometry, Vectors & Probability',
      ],
      mastery: 68,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-semibold text-[#20252B]">
            <span>NTA CBT Pattern Standard</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            JEE Main CBT Practice Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            300-Mark Full Simulation with strict Section A (MCQ) and Section B (Numerical Grid) evaluation.
          </p>
        </div>

        <Link
          href="/exam/jee-main-demo"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-5 py-2.5 text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#C90026] transition-all"
        >
          <span>Start 300-Mark Full Simulation</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Blueprint Banner */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">Paper Blueprint</div>
            <h2 className="text-base font-bold text-[#20252B]">Standard NTA CBT Architecture</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#66727D]">
            <span>Total: <strong>75 Questions</strong></span>
            <span>Marks: <strong>300</strong></span>
            <span>Duration: <strong>180 Mins</strong></span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-[#66727D]">
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B]">Section A: Multiple Choice</div>
            <p className="mt-1 text-[11px] leading-relaxed">
              20 Single-Correct Questions per subject. +4 for correct option, -1 for incorrect option, 0 for unattempted.
            </p>
          </div>
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B]">Section B: Numerical Value (NVQ)</div>
            <p className="mt-1 text-[11px] leading-relaxed">
              05 Questions per subject — all 5 are mandatory. Answers entered via on-screen virtual keypad and rounded to nearest integer. +4 for correct, -1 for incorrect.
            </p>
          </div>
          <div className="rounded-xl bg-[#F1F3F4] p-4">
            <div className="font-bold text-[#20252B]">Server Time Enforcement</div>
            <p className="mt-1 text-[11px] leading-relaxed">
              Server-authoritative timer prevents local clock tampering. Responses sealed automatically upon expiration.
            </p>
          </div>
        </div>
      </div>

      {/* Subject Studios */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        {subjects.map((sub) => (
          <div
            key={sub.name}
            className="flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] transition-all hover:border-[#9CC6E0]/60"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#20252B] uppercase tracking-wider">
                  25 Questions
                </span>
                <span className="font-mono text-xs font-bold text-[#20252B]">{sub.mastery}% Mastery</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#20252B] font-sans">{sub.name}</h3>
              <p className="mt-1 text-xs text-[#66727D]">{sub.sections}</p>

              <div className="mt-4">
                <div className="h-1.5 w-full rounded-full bg-[#E9EEF1]">
                  <div
                    className="h-1.5 rounded-full bg-[#9CC6E0]"
                    style={{ width: `${sub.mastery}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-[#DCE2E6] pt-4">
                <div className="text-[11px] font-bold text-[#20252B]">High-Yield Syllabus Clusters:</div>
                {sub.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#66727D]">
                    <CheckCircle2 className="h-3 w-3 text-[#20252B] shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/exam/jee-main-demo"
              className="mt-6 flex items-center justify-between rounded-xl bg-[#F1F3F4] px-4 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#E9EEF1] transition-colors"
            >
              <span>Practice {sub.name} CBT</span>
              <ArrowRight className="h-4 w-4 text-[#20252B]" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
