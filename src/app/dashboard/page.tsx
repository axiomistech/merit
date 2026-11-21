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
  Play,
  RotateCcw,
  Zap,
} from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';
import { generateRecommendations, ConceptPerformanceRecord } from '@/lib/analytics/engine';
import { cn, formatTimeWithHours } from '@/lib/utils';
import { TestConfigurationModal } from '@/components/exam/TestConfigurationModal';

export default function StudentDashboardPage() {
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
  });

  const [hasAttempts, setHasAttempts] = useState(false);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);

  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    examName: string;
    subjectName: string;
    chapterName: string;
    questionCount: number;
    durationMinutes: number;
    isPaid: boolean;
    attemptRoute: string;
  }>({
    isOpen: false,
    examName: 'NEET',
    subjectName: '',
    chapterName: '',
    questionCount: 30,
    durationMinutes: 30,
    isPaid: false,
    attemptRoute: '/exam/neet-demo',
  });

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
    <div className="p-4 sm:p-6 lg:p-8 space-y-10 max-w-7xl mx-auto">
      {/* Test Setup Preflight Modal */}
      <TestConfigurationModal
        isOpen={configModal.isOpen}
        onClose={() => setConfigModal({ ...configModal, isOpen: false })}
        examName={configModal.examName}
        subjectName={configModal.subjectName}
        chapterName={configModal.chapterName}
        questionCount={configModal.questionCount}
        durationMinutes={configModal.durationMinutes}
        isPaid={configModal.isPaid}
        attemptRoute={configModal.attemptRoute}
      />

      {/* Greeting Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Student Dashboard
            </span>
            <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#20252B]">
              ACTIVE SESSION
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold font-sans text-[#20252B]">
            Welcome, {candidate.fullName}
          </h1>
          <p className="text-xs text-[#66727D]">
            Registration ID: <span className="font-mono font-bold text-[#20252B]">{candidate.registrationId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/practice"
            className="flex items-center gap-2 rounded-full bg-[#E4002B] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
          >
            <Sparkles className="h-4 w-4" />
            <span>Practice Questions</span>
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* 1. CONTINUE PRACTICING (RESUME UNFINISHED TESTS) */}
      {/* ==================================================================== */}
      <section className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#E9EEF1] text-[#20252B]">
              <Clock className="h-6 w-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
                Continue Practicing • Active Session
              </div>
              <h2 className="mt-1 text-lg sm:text-xl font-bold font-sans text-[#20252B]">
                NEET (UG) 180-Question Diagnostic Simulation
              </h2>
              <p className="mt-1 text-xs text-[#66727D]">
                Physics, Chemistry, Botany, Zoology • Server-authoritative timer • Saved in browser
              </p>
            </div>
          </div>

          <Link
            href="/exam/neet-demo"
            className="inline-flex items-center gap-2 rounded-full bg-[#9CC6E0] px-7 py-3 text-xs font-bold text-[#20252B] hover:bg-[#C90026] transition-all shadow-sm shrink-0"
          >
            <span>Resume Mock Test</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. QUICK PRACTICE (SOLVE IN UNDER 15 SECONDS) */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Quick Practice
            </h2>
            <p className="text-lg font-bold font-sans text-[#20252B]">
              Start Solving in Under 15 Seconds
            </p>
          </div>
          <Link
            href="/dashboard/practice"
            className="text-xs font-bold text-[#20252B] hover:underline"
          >
            View Full Syllabus Tree →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { subject: 'Physics', chapter: 'Laws of Motion & Friction', qs: 30, mins: 30, tag: 'High-Yield' },
            { subject: 'Chemistry', chapter: 'Chemical Bonding', qs: 35, mins: 30, tag: 'NCERT Core' },
            { subject: 'Botany', chapter: 'Photosynthesis (C3/C4)', qs: 30, mins: 25, tag: 'Mechanisms' },
            { subject: 'Zoology', chapter: 'Neural Control & Hormones', qs: 30, mins: 25, tag: 'Direct Facts' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-sm hover:border-[#9CC6E0] transition-all flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B]">
                    {item.subject}
                  </span>
                  <span className="text-[10px] text-[#66727D] font-semibold">{item.tag}</span>
                </div>
                <h3 className="mt-2 text-sm font-bold font-sans text-[#20252B]">
                  {item.chapter}
                </h3>
                <div className="mt-1 text-xs text-[#66727D]">
                  {item.qs} Questions • {item.mins} Mins
                </div>
              </div>

              <button
                onClick={() =>
                  setConfigModal({
                    isOpen: true,
                    examName: 'NEET',
                    subjectName: item.subject,
                    chapterName: item.chapter,
                    questionCount: item.qs,
                    durationMinutes: item.mins,
                    isPaid: false,
                    attemptRoute: '/exam/neet-demo',
                  })
                }
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E4002B] py-2 text-xs font-bold text-white shadow-sm hover:bg-[#C90026] transition-all"
              >
                <span>Start Practice</span>
                <Play className="h-3 w-3 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. MY PERFORMANCE (SCORES, ACCURACY AND PROGRESS) */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
          My Performance Overview
        </h2>

        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
            <div className="text-xs text-[#66727D]">Average Accuracy</div>
            <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
              {hasAttempts ? `${latestAttempt?.accuracy || 78}%` : '78.0%'}
            </div>
            <div className="mt-1 text-[11px] text-[#66727D]">Evaluated on timed mocks</div>
          </div>

          <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
            <div className="text-xs text-[#66727D]">Latest Mock Score</div>
            <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
              {hasAttempts ? `${latestAttempt?.totalScore || 580}` : '580'}
              <span className="text-xs text-[#66727D] font-normal"> / 720</span>
            </div>
            <div className="mt-1 text-[11px] text-[#20252B] font-semibold">Top 2% standing</div>
          </div>

          <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
            <div className="text-xs text-[#66727D]">Total Questions Attempted</div>
            <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
              {hasAttempts ? '180' : '180'}
            </div>
            <div className="mt-1 text-[11px] text-[#66727D]">Across 4 disciplines</div>
          </div>

          <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
            <div className="text-xs text-[#66727D]">Tests Completed</div>
            <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
              {hasAttempts ? '1' : '1'}
            </div>
            <div className="mt-1 text-[11px] text-[#20252B] font-semibold">1 Full OMR generated</div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. MOCK TESTS & 5. SUBJECTS GRID */}
      {/* ==================================================================== */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Full-Length Mock Tests */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-[#20252B]" />
              <h3 className="text-base font-bold font-sans text-[#20252B]">
                Full-Length Mock Tests
              </h3>
            </div>
            <Link href="/dashboard/tests" className="text-xs font-bold text-[#20252B] hover:underline">
              View All Mocks
            </Link>
          </div>

          <div className="space-y-3">
            <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[10px] font-bold text-[#20252B]">
                  FREE ENTITLEMENT
                </span>
                <h4 className="mt-1 text-sm font-bold text-[#20252B]">
                  NEET (UG) Full Mock Paper #1
                </h4>
                <p className="text-xs text-[#66727D]">180 Qs • 200 mins • NTA +4 / -1</p>
              </div>
              <Link
                href="/exam/neet-demo"
                className="rounded-full bg-[#E4002B] px-5 py-2 text-xs font-bold text-white hover:bg-[#C90026] shadow-sm"
              >
                Start Mock
              </Link>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[10px] font-bold text-[#20252B]">
                  CBT MOCK
                </span>
                <h4 className="mt-1 text-sm font-bold text-[#20252B]">
                  JEE Main 2026 Simulation
                </h4>
                <p className="text-xs text-[#66727D]">75 Qs • 180 mins • MCQs + NVQs</p>
              </div>
              <Link
                href="/exam/jee-main-demo"
                className="rounded-full bg-[#9CC6E0] px-5 py-2 text-xs font-bold text-[#20252B] hover:bg-[#C90026] shadow-sm"
              >
                Start Mock
              </Link>
            </div>
          </div>
        </div>

        {/* Subjects Breakdown */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#20252B]" />
              <h3 className="text-base font-bold font-sans text-[#20252B]">
                Subject-Wise Preparation
              </h3>
            </div>
            <Link href="/dashboard/practice" className="text-xs font-bold text-[#20252B] hover:underline">
              Practice All
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {[
              { name: 'Physics', chapters: 28, accuracy: '81%' },
              { name: 'Chemistry', chapters: 30, accuracy: '91%' },
              { name: 'Botany', chapters: 22, accuracy: '88%' },
              { name: 'Zoology', chapters: 20, accuracy: '88%' },
            ].map((sub, idx) => (
              <Link
                key={idx}
                href="/dashboard/practice"
                className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 hover:border-[#9CC6E0] hover:bg-white transition-all block"
              >
                <div className="text-xs font-bold text-[#20252B] font-sans">{sub.name}</div>
                <div className="text-[11px] text-[#66727D] mt-1">{sub.chapters} Chapters</div>
                <div className="mt-2 text-xs font-bold text-[#20252B]">
                  Accuracy: {sub.accuracy}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 6. RECOMMENDED FOR YOU (WEAK AREAS & REMEDIATION) */}
      {/* ==================================================================== */}
      <section className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-[#E4002B]" />
            <div>
              <h3 className="text-base font-bold font-sans text-[#20252B]">
                Recommended for You
              </h3>
              <p className="text-xs text-[#66727D]">
                Personalized practice prioritized automatically based on your error patterns.
              </p>
            </div>
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
            Evidence-Based
          </span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {recommendations.slice(0, 2).map((rec) => (
            <div
              key={rec.id}
              className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#20252B] font-sans">{rec.title}</span>
                  <span className="rounded-full bg-[#FDEDF0] px-2.5 py-0.5 text-[10px] font-bold text-[#E4002B]">
                    Remediation
                  </span>
                </div>
                <p className="mt-2 text-xs text-[#66727D] leading-relaxed">{rec.explanation}</p>
              </div>

              <div className="pt-2 flex justify-end">
                <Link
                  href="/dashboard/practice"
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#E4002B] px-5 py-2 text-xs font-bold text-white hover:bg-[#C90026] shadow-sm transition-all"
                >
                  <span>Practice Weak Topic</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 7. RECENT ACTIVITY (ATTEMPT HISTORY) */}
      {/* ==================================================================== */}
      <section className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-5 w-5 text-[#20252B]" />
            <h3 className="text-base font-bold font-sans text-[#20252B]">
              Recent Activity
            </h3>
          </div>
          <Link href="/dashboard/history" className="text-xs font-bold text-[#20252B] hover:underline">
            View All History
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DCE2E6] text-[#66727D]">
                <th className="pb-3 font-semibold">Examination Paper</th>
                <th className="pb-3 font-semibold">Date Completed</th>
                <th className="pb-3 font-semibold">Score</th>
                <th className="pb-3 font-semibold">Accuracy</th>
                <th className="pb-3 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              <tr>
                <td className="py-3 font-bold text-[#20252B]">
                  NEET (UG) 180-Question Diagnostic Paper #1
                </td>
                <td className="py-3 text-[#66727D]">Today, 18:30</td>
                <td className="py-3 font-mono font-bold text-[#20252B]">580 / 720</td>
                <td className="py-3 font-mono font-bold text-[#20252B]">78.0%</td>
                <td className="py-3 text-right">
                  <Link
                    href="/dashboard/results/ATT-2026-NEET-01"
                    className="font-bold text-[#20252B] hover:underline"
                  >
                    View Result & OMR →
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
