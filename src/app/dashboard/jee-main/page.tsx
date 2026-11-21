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
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: ['Mechanics & Rotational Motion', 'Electrodynamics & Optics', 'Thermodynamics & Modern Physics'],
      mastery: 72,
    },
    {
      name: 'Chemistry',
      slug: 'chemistry',
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: ['Physical Chemistry & Thermodynamics', 'Organic Reaction Mechanisms', 'Inorganic & Coordination Chemistry'],
      mastery: 80,
    },
    {
      name: 'Mathematics',
      slug: 'mathematics',
      totalQ: 25,
      sections: '20 Single-Correct MCQs + 5 Numerical Value Questions',
      topics: ['Calculus & Differential Equations', 'Coordinate Geometry & Vectors', 'Algebra, Matrices & Probability'],
      mastery: 68,
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
            <span>NTA CBT Pattern Standard</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
            JEE Main CBT Practice Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
            300-Mark Full Simulation with strict Section A (MCQ) and Section B (Numerical Grid) evaluation.
          </p>
        </div>

        <Link
          href="/exam/jee-main-demo"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#8ea07a] transition-all"
        >
          <span>Start 300-Mark Full Simulation</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Blueprint Banner */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#92958D]">Paper Blueprint</div>
            <h2 className="text-base font-bold text-[#263126]">Standard NTA CBT Architecture</h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-[#73786E]">
            <span>Total: <strong>75 Questions</strong></span>
            <span>Marks: <strong>300</strong></span>
            <span>Duration: <strong>180 Mins</strong></span>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3 text-xs text-[#73786E]">
          <div className="rounded-xl bg-[#F7F5EF] p-4">
            <div className="font-bold text-[#263126]">Section A: Multiple Choice</div>
            <p className="mt-1 text-[11px] leading-relaxed">
              20 Single-Correct Questions per subject. +4 for correct option, -1 for incorrect option, 0 for unattempted.
            </p>
          </div>
          <div className="rounded-xl bg-[#F7F5EF] p-4">
            <div className="font-bold text-[#263126]">Section B: Numerical Value</div>
            <p className="mt-1 text-[11px] leading-relaxed">
              10 Questions provided, candidates attempt any 5. Answers rounded to nearest integer with tolerance verification.
            </p>
          </div>
          <div className="rounded-xl bg-[#F7F5EF] p-4">
            <div className="font-bold text-[#263126]">Server Time Enforcement</div>
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
            className="flex flex-col justify-between rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] transition-all hover:border-[#9CAF88]/60"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[#758B62] uppercase tracking-wider">
                  25 Questions
                </span>
                <span className="font-mono text-xs font-bold text-[#263126]">{sub.mastery}% Mastery</span>
              </div>
              <h3 className="mt-2 text-xl font-bold text-[#263126] font-serif">{sub.name}</h3>
              <p className="mt-1 text-xs text-[#73786E]">{sub.sections}</p>

              <div className="mt-4">
                <div className="h-1.5 w-full rounded-full bg-[#E9E6DF]">
                  <div
                    className="h-1.5 rounded-full bg-[#9CAF88]"
                    style={{ width: `${sub.mastery}%` }}
                  />
                </div>
              </div>

              <div className="mt-4 space-y-1.5 border-t border-[#ECEAE4] pt-4">
                <div className="text-[11px] font-bold text-[#263126]">High-Yield Syllabus Clusters:</div>
                {sub.topics.map((t, idx) => (
                  <div key={idx} className="flex items-center gap-1.5 text-[11px] text-[#73786E]">
                    <CheckCircle2 className="h-3 w-3 text-[#758B62] shrink-0" />
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>

            <Link
              href="/exam/jee-main-demo"
              className="mt-6 flex items-center justify-between rounded-xl bg-[#F7F5EF] px-4 py-2.5 text-xs font-bold text-[#263126] hover:bg-[#E9EEE3] transition-colors"
            >
              <span>Practice {sub.name} CBT</span>
              <ArrowRight className="h-4 w-4 text-[#758B62]" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
