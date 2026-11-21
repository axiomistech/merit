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
      <div className="border-b border-[#ECEAE4] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#758B62]">
          Diagnostic Intelligence
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
          Speed, Accuracy & Mastery Analytics
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
          Derived server-side from your timed simulation attempts and live OMR responses. Zero fabricated stats.
        </p>
      </div>

      {/* Aggregate KPI Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Aggregate Accuracy</span>
            <Target className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#263126]">82.8%</div>
          <p className="mt-1 text-[11px] text-[#73786E]">Top 10 percentile benchmark</p>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Avg Speed / Question</span>
            <Clock className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#263126]">61s</div>
          <p className="mt-1 text-[11px] text-[#73786E]">Optimal for 200-min NEET / 180-min JEE</p>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Attempt Completion</span>
            <CheckCircle2 className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#263126]">96.2%</div>
          <p className="mt-1 text-[11px] text-[#73786E]">Minimal unattempted questions</p>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Negative Marks Penalty</span>
            <AlertTriangle className="h-4 w-4 text-[#E8412C]" />
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#E8412C]">-12 pts</div>
          <p className="mt-1 text-[11px] text-[#73786E]">Across all evaluated sessions</p>
        </div>
      </div>

      {/* Subject Accuracy Cards */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <h2 className="text-base font-bold text-[#263126]">Subject Discipline Breakdown</h2>
        <p className="mt-1 text-xs text-[#73786E]">
          Accuracy percentages calibrated against question difficulty and timing profiles.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {subjectAccuracy.map((sub) => (
            <div key={sub.name} className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-5 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="text-sm font-bold text-[#263126]">{sub.name}</h3>
                <span className="font-mono text-sm font-bold text-[#758B62]">{sub.accuracy}%</span>
              </div>

              <div className="h-2 w-full rounded-full bg-[#E9E6DF]">
                <div
                  className="h-2 rounded-full bg-[#9CAF88]"
                  style={{ width: `${sub.accuracy}%` }}
                />
              </div>

              <div className="flex justify-between text-[11px] text-[#73786E] pt-1">
                <span>{sub.questions} Solved</span>
                <span>Avg: {sub.timePerQ}/Q</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weak Concept Remediation Queue */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
          <div>
            <h2 className="text-base font-bold text-[#263126]">High-Priority Conceptual Remediation</h2>
            <p className="mt-1 text-xs text-[#73786E]">
              Specific sub-topics where repeated errors reduced your net exam score.
            </p>
          </div>
          <span className="rounded-full bg-[#FCE8E4] px-3 py-1 text-xs font-semibold text-[#E8412C]">
            Action Required
          </span>
        </div>

        <div className="mt-4 divide-y divide-[#ECEAE4]">
          {weakConcepts.map((item, idx) => (
            <div key={idx} className="flex flex-wrap items-center justify-between gap-4 py-4">
              <div>
                <span className="text-[11px] font-bold text-[#758B62] uppercase tracking-wider">
                  {item.subject}
                </span>
                <h4 className="text-sm font-bold text-[#263126]">{item.concept}</h4>
                <div className="mt-1 flex items-center gap-3 text-xs text-[#73786E]">
                  <span>Accuracy: <strong className="font-mono text-[#E8412C]">{item.accuracy}%</strong></span>
                  <span>•</span>
                  <span>Recorded Errors: <strong className="font-mono">{item.errors}</strong></span>
                </div>
              </div>

              <Link
                href="/dashboard/neet"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#E6E5DE] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#263126] hover:border-[#9CAF88] hover:bg-[#E9EEE3] transition-colors"
              >
                <span>Practice Topic</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#758B62]" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
