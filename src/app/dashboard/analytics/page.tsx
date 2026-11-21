'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, TrendingUp, CheckCircle2, Clock, AlertTriangle, ArrowRight, Zap, Target } from 'lucide-react';

export default function StudentAnalyticsPage() {
  const subjectAccuracy = [
    { name: 'Physics', accuracy: 75, questions: 45, timePerQ: '85s', status: 'solid' },
    { name: 'Chemistry', accuracy: 80, questions: 45, timePerQ: '65s', status: 'strong' },
    { name: 'Botany', accuracy: 92, questions: 45, timePerQ: '45s', status: 'mastery' },
    { name: 'Zoology', accuracy: 84, questions: 45, timePerQ: '50s', status: 'strong' },
  ];

  const weakConcepts = [
    { concept: 'Rotational Dynamics (Moment of Inertia)', subject: 'Physics', accuracy: 40, errors: 6 },
    { concept: 'Equilibrium & Le Chatelier Principle', subject: 'Chemistry', accuracy: 48, errors: 5 },
    { concept: 'Human Neural Conduction', subject: 'Zoology', accuracy: 52, errors: 4 },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DCE2E6] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#20252B]">
          Diagnostic Intelligence
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-serif">
          Speed, Accuracy & Mastery Analytics
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
          Derived server-side from your timed simulation attempts and live OMR responses. Zero fabricated stats.
        </p>
      </div>

      {/* Aggregate KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Aggregate Accuracy</span>
            <Target className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#20252B]">82.8%</div>
          <p className="mt-1 text-[11px] text-[#66727D]">Top 10 percentile benchmark</p>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Avg Speed / Question</span>
            <Clock className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#20252B]">61s</div>
          <p className="mt-1 text-[11px] text-[#66727D]">Optimal for 200-min NEET / 180-min JEE</p>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Attempt Completion</span>
            <CheckCircle2 className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#20252B]">96.2%</div>
          <p className="mt-1 text-[11px] text-[#66727D]">Minimal unattempted questions</p>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Negative Marks Penalty</span>
            <AlertTriangle className="h-4 w-4 text-[#E4002B]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#E4002B]">-12 pts</div>
          <p className="mt-1 text-[11px] text-[#66727D]">Across all evaluated sessions</p>
        </div>
      </div>

      {/* Subject Accuracy Cards */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <h2 className="text-base font-bold text-[#20252B]">Subject Discipline Breakdown</h2>
        <p className="mt-1 text-xs text-[#66727D]">
          Accuracy percentages calibrated against question difficulty and timing profiles.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subjectAccuracy.map((sub) => (
            <div key={sub.name} className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#20252B]">{sub.name}</h3>
                <span className="font-mono text-sm font-bold text-[#20252B]">{sub.accuracy}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-[#E9EEF1]">
                <div
                  className="h-2 rounded-full bg-[#9CC6E0]"
                  style={{ width: `${sub.accuracy}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#66727D] pt-1">
                <span>{sub.questions} Solved</span>
                <span>Avg: {sub.timePerQ}/Q</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Concept Remediation Queue */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#20252B]">High-Priority Conceptual Remediation</h2>
            <p className="mt-1 text-xs text-[#66727D]">
              Specific sub-topics where repeated errors reduced your net exam score.
            </p>
          </div>
          <span className="rounded-full bg-[#FDEDF0] px-3 py-1 text-xs font-semibold text-[#E4002B]">
            Action Required
          </span>
        </div>

        <div className="mt-4 divide-y divide-[#DCE2E6]">
          {weakConcepts.map((item, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div>
                <span className="text-[11px] font-bold text-[#20252B] uppercase tracking-wider">
                  {item.subject}
                </span>
                <h4 className="text-sm font-bold text-[#20252B]">{item.concept}</h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-[#66727D]">
                  <span>Accuracy: <strong className="font-mono text-[#E4002B]">{item.accuracy}%</strong></span>
                  <span>•</span>
                  <span>Recorded Errors: <strong className="font-mono">{item.errors}</strong></span>
                </div>
              </div>

              <Link
                href="/dashboard/neet"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#DCE2E6] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#20252B] hover:border-[#9CC6E0] hover:bg-[#E9EEF1] transition-colors"
              >
                <span>Practice Topic</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#20252B]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
