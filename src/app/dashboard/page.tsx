'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Shield,
  ArrowRight,
  BookOpen,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Flame,
  BarChart3,
  Sparkles,
  FileText,
  Activity,
  Layers,
  Compass,
} from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';
import { generateRecommendations, ConceptPerformanceRecord } from '@/lib/analytics/engine';
import { cn } from '@/lib/utils';

export default function StudentDashboardPage() {
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
  });

  const [hasAttempts, setHasAttempts] = useState(false);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession = localStorage.getItem('fort_student_session');
      if (storedSession) {
        try {
          const parsed = JSON.parse(storedSession);
          setCandidate({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'FORT-26-000001',
          });
        } catch {}
      }

      const storedAttempt = localStorage.getItem('fort_latest_attempt');
      if (storedAttempt) {
        try {
          const parsedAttempt = JSON.parse(storedAttempt);
          setLatestAttempt(parsedAttempt);
          setHasAttempts(true);
        } catch {}
      }
    }
  }, []);

  const sampleConcepts: ConceptPerformanceRecord[] = [
    {
      conceptId: 'c1',
      conceptName: 'Electrostatics & Gauss Law',
      subjectName: 'Physics',
      totalAttempts: 14,
      correctCount: 5,
      accuracy: 35.71,
      masteryScore: 35.71,
    },
    {
      conceptId: 'c2',
      conceptName: 'Chemical Bonding & Hybridization',
      subjectName: 'Chemistry',
      totalAttempts: 12,
      correctCount: 11,
      accuracy: 91.67,
      masteryScore: 91.67,
    },
    {
      conceptId: 'c3',
      conceptName: 'Photosynthesis C4 Pathway',
      subjectName: 'Botany',
      totalAttempts: 10,
      correctCount: 8,
      accuracy: 80.0,
      masteryScore: 80.0,
    },
  ];

  const recommendations = generateRecommendations(sampleConcepts, 'neet');

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Top Greeting & Registration Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Aspirant Workspace
            </span>
            <span className="rounded-lg bg-[#E9EEE3] px-2 py-0.5 font-mono text-[11px] font-bold text-[#758B62]">
              ENROLLED
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126]">
            Welcome, {candidate.fullName}
          </h1>
          <p className="text-xs text-[#73786E]">
            Registration ID: <span className="font-mono font-bold text-[#263126]">{candidate.registrationId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Free Paper</span>
          </Link>
        </div>
      </div>

      {/* Selective Floating Glass Widget: Preparation Focus */}
      <div className="glass-panel rounded-3xl p-6 sm:p-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-white">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9EEE3] text-[#758B62]">
            <Compass className="h-6 w-6 stroke-[2.2]" />
          </div>
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Preparation Focus • Recommended Next Step
            </div>
            <h3 className="mt-1 text-base sm:text-lg font-bold text-[#263126]">
              Electrostatics & Gauss Law (Current Accuracy: 35.7%)
            </h3>
            <p className="mt-1 text-xs text-[#73786E] max-w-2xl">
              14 questions attempted. Review the 6-face flux symmetry rules to eliminate recurring errors.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard/neet"
          className="rounded-xl bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all shrink-0"
        >
          Practice Concept
        </Link>
      </div>

      {/* KPI Stats Overview (Matte White Cards) */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Questions Answered', value: hasAttempts ? '20' : '0', sub: 'Timed examinations' },
          { label: 'Attempts Completed', value: hasAttempts ? '1' : '0', sub: 'Evaluated mocks' },
          { label: 'Average Accuracy', value: hasAttempts ? `${latestAttempt?.accuracy || 75}%` : '--', sub: 'Correct / Attempted' },
          { label: 'Active Curricula', value: '1', sub: 'FORT NEET (UG)' },
        ].map((kpi, idx) => (
          <div key={idx} className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-soft">
            <div className="text-xs text-[#73786E]">{kpi.label}</div>
            <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#263126]">
              {kpi.value}
            </div>
            <div className="mt-1 text-[11px] text-[#92958D]">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Active Examination Practice Hubs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
            Enrolled Curricula
          </h2>
          <Link href="/dashboard/neet" className="text-xs font-bold text-[#758B62] hover:underline">
            View All Curricula
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft flex flex-col justify-between hover:border-[#9CAF88] transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-0.5 text-xs font-bold text-[#758B62]">
                  PRIMARY TARGET
                </span>
                <span className="font-mono text-xs text-[#92958D]">4 Disciplines</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#263126]">FORT NEET (UG)</h3>
              <p className="mt-1 text-xs text-[#73786E] leading-relaxed">
                Physics, Chemistry, Botany, Zoology with live physical-grade OMR simulation.
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href="/exam/neet-demo"
                className="flex-1 rounded-xl bg-[#9CAF88] py-2.5 text-center text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a]"
              >
                Simulate Paper
              </Link>
              <Link
                href="/dashboard/neet"
                className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] px-3.5 py-2.5 text-xs font-semibold text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                Practice
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft flex flex-col justify-between hover:border-[#9CAF88] transition-colors">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-lg bg-[#F0EFEA] px-2.5 py-0.5 text-xs font-bold text-[#73786E]">
                  SECONDARY
                </span>
                <span className="font-mono text-xs text-[#92958D]">3 Disciplines</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#263126]">FORT JEE Main</h3>
              <p className="mt-1 text-xs text-[#73786E] leading-relaxed">
                CBT speed and accuracy tests with numerical questions.
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href="/dashboard/jee-main"
                className="flex-1 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] py-2.5 text-center text-xs font-semibold text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                Enter Module
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Remediation & Recommendation Queue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-[#758B62]" />
              <h3 className="text-sm font-bold text-[#263126]">Targeted Revision Queue</h3>
            </div>
            <span className="text-[11px] text-[#92958D]">Evidence-based</span>
          </div>

          <div className="mt-4 space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-2xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#263126]">{rec.title}</span>
                    <span
                      className={cn(
                        'rounded-lg px-2 py-0.5 text-[10px] font-bold uppercase',
                        rec.priority === 'high'
                          ? 'bg-[#FCE8E4] text-[#E8412C]'
                          : 'bg-[#E9EEE3] text-[#758B62]'
                      )}
                    >
                      {rec.priority === 'high' ? 'Needs Attention' : 'Strengthen'}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#73786E]">{rec.explanation}</p>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    href="/dashboard/neet"
                    className="text-xs font-bold text-[#758B62] hover:underline flex items-center gap-1"
                  >
                    <span>Practice Concept</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Concept Mastery Radar / Breakdown */}
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-7 shadow-soft">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#758B62]" />
              <h3 className="text-sm font-bold text-[#263126]">Concept Mastery Health</h3>
            </div>
            <span className="text-[11px] text-[#92958D]">Accuracy Calibrated</span>
          </div>

          <div className="mt-5 space-y-4">
            {sampleConcepts.map((c) => (
              <div key={c.conceptId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#263126]">{c.conceptName}</span>
                  <span className="font-mono font-bold text-[#758B62]">{c.accuracy}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#E9E6DF]">
                  <div
                    className={cn(
                      'h-2 rounded-full transition-all',
                      c.accuracy >= 75
                        ? 'bg-[#9CAF88]'
                        : c.accuracy >= 50
                        ? 'bg-[#DCE5D3]'
                        : 'bg-[#E8412C]'
                    )}
                    style={{ width: `${c.accuracy}%` }}
                  />
                </div>
                <div className="text-[11px] text-[#92958D]">
                  {c.totalAttempts} questions attempted • {c.correctCount} correct
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
