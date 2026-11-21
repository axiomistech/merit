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

      // Check if user has any submitted attempts stored
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

  // Evidence-based concept records
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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              Aspirant Workspace
            </span>
            <span className="rounded bg-[#10B981]/20 px-2 py-0.5 font-mono text-[11px] font-bold text-[#10B981]">
              ACTIVE
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            Welcome, {candidate.fullName}
          </h1>
          <p className="text-xs text-[#A7B0C0]">
            Registration ID: <span className="font-mono text-[#F5F7FB]">{candidate.registrationId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center gap-1.5 rounded-xl bg-[#6486C6] px-4 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-md shadow-[#6486C6]/20"
          >
            <Sparkles className="h-4 w-4" />
            <span>Launch Free Paper</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Overview */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {[
          { label: 'Total Questions Answered', value: hasAttempts ? '20' : '0', sub: 'In timed papers' },
          { label: 'Attempts Completed', value: hasAttempts ? '1' : '0', sub: 'Evaluated tests' },
          { label: 'Average Accuracy', value: hasAttempts ? `${latestAttempt?.accuracy || 65}%` : '--', sub: 'Correct / Attempted' },
          { label: 'Active Exam Programs', value: '1', sub: 'FORT NEET (UG)' },
        ].map((kpi, idx) => (
          <div key={idx} className="rounded-xl border border-[#263554] bg-[#11182A] p-4 sm:p-5">
            <div className="text-xs text-[#A7B0C0]">{kpi.label}</div>
            <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#F5F7FB]">
              {kpi.value}
            </div>
            <div className="mt-1 text-[11px] text-[#7C8799]">{kpi.sub}</div>
          </div>
        ))}
      </div>

      {/* Active Examination Practice Hubs */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6486C6]">
            Your Enrolled Examinations
          </h2>
          <Link href="/dashboard/neet" className="text-xs font-semibold text-[#6486C6] hover:underline">
            Manage Examinations
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-[#263554] bg-[#172033] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-bold text-[#10B981]">
                  PRIMARY TARGET
                </span>
                <span className="font-mono text-xs text-[#7C8799]">4 Subjects</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#F5F7FB]">FORT NEET (UG)</h3>
              <p className="mt-1 text-xs text-[#A7B0C0]">
                Physics, Chemistry, Botany, Zoology with live physical-grade OMR simulation.
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href="/exam/neet-demo"
                className="flex-1 rounded-lg bg-[#6486C6] py-2 text-center text-xs font-bold text-[#0B1020]"
              >
                Simulate Paper
              </Link>
              <Link
                href="/dashboard/neet"
                className="rounded-lg border border-[#263554] px-3 py-2 text-xs text-[#F5F7FB] hover:bg-[#1D2940]"
              >
                Practice
              </Link>
            </div>
          </div>

          <div className="rounded-xl border border-[#263554] bg-[#172033] p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-bold text-[#6486C6]">
                  SECONDARY
                </span>
                <span className="font-mono text-xs text-[#7C8799]">3 Subjects</span>
              </div>
              <h3 className="mt-3 text-lg font-bold text-[#F5F7FB]">FORT JEE Main</h3>
              <p className="mt-1 text-xs text-[#A7B0C0]">
                CBT speed and accuracy tests with numerical questions.
              </p>
            </div>

            <div className="mt-6 flex gap-2">
              <Link
                href="/dashboard/jee-main"
                className="flex-1 rounded-lg border border-[#263554] bg-[#11182A] py-2 text-center text-xs font-semibold text-[#F5F7FB] hover:border-[#6486C6]"
              >
                Enter Module
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Remediation & Recommendation Queue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-6">
          <div className="flex items-center justify-between border-b border-[#263554] pb-4">
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-amber-400" />
              <h3 className="text-sm font-bold text-[#F5F7FB]">Targeted Remediation Queue</h3>
            </div>
            <span className="text-[11px] text-[#7C8799]">Data-driven</span>
          </div>

          <div className="mt-4 space-y-3">
            {recommendations.map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl border border-[#263554] bg-[#172033] p-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#F5F7FB]">{rec.title}</span>
                    <span
                      className={cn(
                        'rounded px-2 py-0.5 text-[10px] font-bold uppercase',
                        rec.priority === 'high'
                          ? 'bg-[#EF4444]/20 text-[#EF4444]'
                          : 'bg-amber-400/20 text-amber-300'
                      )}
                    >
                      {rec.priority} Priority
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-[#A7B0C0]">{rec.explanation}</p>
                </div>

                <div className="mt-3 flex justify-end">
                  <Link
                    href="/dashboard/neet"
                    className="text-xs font-semibold text-[#6486C6] hover:underline flex items-center gap-1"
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
        <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-6">
          <div className="flex items-center justify-between border-b border-[#263554] pb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-[#10B981]" />
              <h3 className="text-sm font-bold text-[#F5F7FB]">Concept Mastery Health</h3>
            </div>
            <span className="text-[11px] text-[#7C8799]">Calibrated</span>
          </div>

          <div className="mt-4 space-y-4">
            {sampleConcepts.map((c) => (
              <div key={c.conceptId} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#F5F7FB]">{c.conceptName}</span>
                  <span className="font-mono text-[#A7B0C0]">{c.accuracy}% Accuracy</span>
                </div>
                <div className="h-2 w-full rounded-full bg-[#0B1020]">
                  <div
                    className={cn(
                      'h-2 rounded-full',
                      c.accuracy >= 75
                        ? 'bg-[#10B981]'
                        : c.accuracy >= 50
                        ? 'bg-amber-400'
                        : 'bg-[#EF4444]'
                    )}
                    style={{ width: `${c.accuracy}%` }}
                  />
                </div>
                <div className="text-[10px] text-[#7C8799]">
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
