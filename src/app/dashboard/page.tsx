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
  RotateCcw,
  Play,
  Lock,
  Gift,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestConfigurationModal } from '@/components/exam/TestConfigurationModal';

export default function StudentDashboardPage() {
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
    email: 'student@example.com',
  });

  const [hasAttempts, setHasAttempts] = useState(false);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [latestAttempt, setLatestAttempt] = useState<any>(null);
  const [entitlements, setEntitlements] = useState<{
    freePaperAvailable: boolean;
    freePaperSlug: string | null;
    unlockedPapers: string[];
  }>({
    freePaperAvailable: true,
    freePaperSlug: null,
    unlockedPapers: [],
  });

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
            email: parsed.email || 'student@example.com',
          });
        } catch {}
      }

      // Load attempts
      let attemptList: any[] = [];
      const storedAttempts = localStorage.getItem('fort_student_attempts');
      if (storedAttempts) {
        try {
          attemptList = JSON.parse(storedAttempts);
        } catch {}
      }

      const storedLatest = localStorage.getItem('fort_latest_attempt');
      if (storedLatest) {
        try {
          const parsedLatest = JSON.parse(storedLatest);
          if (attemptList.length === 0) {
            attemptList = [parsedLatest];
          }
          setLatestAttempt(parsedLatest);
        } catch {}
      }

      if (attemptList.length > 0) {
        setAttempts(attemptList);
        setHasAttempts(true);
        if (!latestAttempt) {
          setLatestAttempt(attemptList[attemptList.length - 1]);
        }
      }

      // Load entitlements from API or fallback
      fetch('/api/entitlements')
        .then((r) => r.json())
        .then((data) => {
          if (data && data.entitlements) {
            setEntitlements({
              freePaperAvailable: data.entitlements.freePaperAvailable ?? true,
              freePaperSlug: data.entitlements.freePaperSlug || null,
              unlockedPapers: data.entitlements.unlockedPapers || [],
            });
          }
        })
        .catch(() => {
          const storedEnt = localStorage.getItem('fort_entitlements');
          if (storedEnt) {
            try {
              const parsed = JSON.parse(storedEnt);
              setEntitlements(parsed);
            } catch {}
          }
        });
    }
  }, []);

  // Compute performance metrics
  const avgAccuracy = attempts.length > 0
    ? Math.round(attempts.reduce((acc, a) => acc + (a.accuracy || 0), 0) / attempts.length)
    : 0;

  const totalQuestionsAttempted = attempts.reduce((acc, a) => acc + (a.totalQuestions || a.attemptedCount || 0), 0);

  const curatedPapers = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      examLabel: 'NEET (UG)',
      questions: 180,
      duration: 200,
      marks: 720,
      hasOMR: true,
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      examLabel: 'JEE Main',
      questions: 90,
      duration: 180,
      marks: 300,
      hasOMR: false,
    },
    {
      id: 'paper_upsc_prelims_2024',
      name: 'UPSC Civil Services Prelims 2024 GS-1',
      slug: 'upsc-prelims-2024-gs1',
      examLabel: 'UPSC CSE',
      questions: 100,
      duration: 120,
      marks: 200,
      hasOMR: true,
    },
  ];

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
            Candidate ID: <span className="font-mono font-bold text-[#20252B]">{candidate.registrationId}</span> • Registered Account
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/papers"
            className="flex items-center gap-2 rounded-full bg-[#E4002B] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
          >
            <FileText className="h-4 w-4" />
            <span>Browse Question Papers</span>
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FREE PAPER STATUS BANNER */}
      {/* ==================================================================== */}
      {entitlements.freePaperAvailable ? (
        <section className="relative overflow-hidden rounded-[28px] border-2 border-[#9CC6E0] bg-white p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
                <Gift className="h-6 w-6 stroke-[2.2] text-[#E4002B]" />
              </div>
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FDEDF0] px-2.5 py-0.5 text-[10px] font-bold text-[#E4002B] uppercase tracking-wider">
                  Complimentary Access Available
                </div>
                <h2 className="mt-1.5 text-lg sm:text-xl font-bold font-sans text-[#20252B]">
                  Your preparation starts here. You have your first question paper waiting.
                </h2>
                <p className="mt-1 text-xs text-[#66727D] max-w-2xl leading-relaxed">
                  Choose any examination paper from our library. Your first paper is completely free, with full CBT simulation, automatic scoring, and physical OMR sheet.
                </p>
              </div>
            </div>

            <Link
              href="/papers"
              className="inline-flex items-center gap-2 rounded-full bg-[#E4002B] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#C90026] transition-all shrink-0"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : entitlements.freePaperSlug ? (
        <section className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
                <CheckCircle2 className="h-6 w-6 stroke-[2.2] text-[#20252B]" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                  Complimentary Entitlement Active
                </div>
                <h2 className="mt-1 text-base sm:text-lg font-bold font-sans text-[#20252B]">
                  Free Paper Unlocked: {entitlements.freePaperSlug}
                </h2>
                <p className="mt-1 text-xs text-[#66727D]">
                  Permanent access granted. You can attempt, re-attempt, and review this paper at any time without fees.
                </p>
              </div>
            </div>

            <Link
              href={`/exam/${entitlements.freePaperSlug}`}
              className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-6 py-3 text-xs font-bold text-white shadow-sm hover:bg-[#20252B]/90 transition-all shrink-0"
            >
              <span>Start Examination</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      ) : null}

      {/* ==================================================================== */}
      {/* PERFORMANCE OVERVIEW (WITH HONEST EMPTY STATE) */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
            My Performance Overview
          </h2>
          <Link href="/dashboard/analytics" className="text-xs font-bold text-[#20252B] hover:underline">
            Detailed Analytics →
          </Link>
        </div>

        {hasAttempts ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#66727D]">Average Accuracy</div>
              <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
                {avgAccuracy}%
              </div>
              <div className="mt-1 text-[11px] text-[#66727D]">Calculated on evaluated mocks</div>
            </div>

            <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#66727D]">Latest Mock Score</div>
              <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
                {latestAttempt?.totalScore ?? latestAttempt?.score ?? 0}
                <span className="text-xs text-[#66727D] font-normal"> / {latestAttempt?.maxScore || 720}</span>
              </div>
              <div className="mt-1 text-[11px] text-[#20252B] font-semibold">
                Accuracy: {latestAttempt?.accuracy ?? 0}%
              </div>
            </div>

            <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#66727D]">Total Questions Attempted</div>
              <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
                {totalQuestionsAttempted}
              </div>
              <div className="mt-1 text-[11px] text-[#66727D]">Across all examination papers</div>
            </div>

            <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
              <div className="text-xs text-[#66727D]">Tests Completed</div>
              <div className="mt-2 font-mono text-3xl font-black text-[#20252B]">
                {attempts.length}
              </div>
              <div className="mt-1 text-[11px] text-[#20252B] font-semibold">Full scorecards generated</div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
                <div className="text-xs text-[#66727D]">Average Accuracy</div>
                <div className="mt-2 font-mono text-3xl font-black text-[#66727D]">--</div>
                <div className="mt-1 text-[11px] text-[#66727D]">Awaiting first test</div>
              </div>

              <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
                <div className="text-xs text-[#66727D]">Latest Mock Score</div>
                <div className="mt-2 font-mono text-3xl font-black text-[#66727D]">--</div>
                <div className="mt-1 text-[11px] text-[#66727D]">Awaiting first test</div>
              </div>

              <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
                <div className="text-xs text-[#66727D]">Questions Attempted</div>
                <div className="mt-2 font-mono text-3xl font-black text-[#66727D]">0</div>
                <div className="mt-1 text-[11px] text-[#66727D]">No attempts yet</div>
              </div>

              <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-soft">
                <div className="text-xs text-[#66727D]">Tests Completed</div>
                <div className="mt-2 font-mono text-3xl font-black text-[#66727D]">0</div>
                <div className="mt-1 text-[11px] text-[#66727D]">No tests completed</div>
              </div>
            </div>

            <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 text-center space-y-3">
              <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-2xl bg-[#F1F3F4] text-[#66727D]">
                <BarChart3 className="h-6 w-6 stroke-[2]" />
              </div>
              <h3 className="text-sm font-bold font-sans text-[#20252B]">
                No Performance Insights Recorded
              </h3>
              <p className="text-xs text-[#66727D] max-w-md mx-auto leading-relaxed">
                Your performance insights will develop as you attempt papers. Complete an examination to begin building your personal analytics.
              </p>
              <div className="pt-2">
                <Link
                  href="/papers"
                  className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-[#20252B]/90 transition-all"
                >
                  <span>Unlock a Question Paper</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* ==================================================================== */}
      {/* CURATED QUESTION PAPERS (DISCOVERY TEASER) */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Question Papers Library
            </h2>
            <p className="text-base font-bold font-sans text-[#20252B]">
              National Entrance Examinations & Previous Years
            </p>
          </div>
          <Link
            href="/papers"
            className="text-xs font-bold text-[#20252B] hover:underline"
          >
            Browse All Question Papers →
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {curatedPapers.map((paper) => {
            const isUnlocked = entitlements.unlockedPapers.includes(paper.slug);
            return (
              <div
                key={paper.id}
                className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-soft hover:border-[#9CC6E0] transition-all flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B]">
                      {paper.examLabel}
                    </span>
                    {paper.hasOMR && (
                      <span className="rounded-full bg-[#9CC6E0]/20 px-2 py-0.5 text-[10px] font-bold text-[#20252B]">
                        OMR SIMULATION
                      </span>
                    )}
                  </div>
                  <h3 className="mt-3 text-sm font-bold font-sans text-[#20252B] line-clamp-2">
                    {paper.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-3 text-xs text-[#66727D]">
                    <span>{paper.questions} Qs</span>
                    <span>•</span>
                    <span>{paper.duration} Mins</span>
                    <span>•</span>
                    <span>{paper.marks} Marks</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#DCE2E6]/60 flex items-center justify-between">
                  <span className="text-xs font-bold text-[#20252B]">
                    {isUnlocked ? (
                      <span className="text-[#20252B]">Unlocked</span>
                    ) : entitlements.freePaperAvailable ? (
                      <span className="text-[#E4002B]">Free for You</span>
                    ) : (
                      '₹10'
                    )}
                  </span>

                  {isUnlocked ? (
                    <Link
                      href={`/exam/${paper.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#20252B] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#20252B]/90 transition-all"
                    >
                      <span>Start Attempt</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : entitlements.freePaperAvailable ? (
                    <Link
                      href={`/papers/${paper.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#E4002B] px-4 py-1.5 text-xs font-bold text-white hover:bg-[#C90026] transition-all"
                    >
                      <span>Unlock Free</span>
                      <Gift className="h-3.5 w-3.5" />
                    </Link>
                  ) : (
                    <Link
                      href={`/papers/${paper.slug}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#9CC6E0] px-4 py-1.5 text-xs font-bold text-[#20252B] hover:bg-[#86b5d4] transition-all"
                    >
                      <span>Unlock ₹10</span>
                      <Lock className="h-3 w-3" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* QUICK PRACTICE (SOLVE IN UNDER 15 SECONDS) */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Quick Practice
            </h2>
            <p className="text-base font-bold font-sans text-[#20252B]">
              Start Solving in Under 15 Seconds
            </p>
          </div>
          <Link
            href="/dashboard/papers"
            className="text-xs font-bold text-[#20252B] hover:underline"
          >
            View Question Papers →
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
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-soft hover:border-[#9CC6E0] transition-all flex flex-col justify-between space-y-4"
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
                className="w-full inline-flex items-center justify-center gap-1.5 rounded-full bg-[#E4002B] py-2 text-xs font-bold text-white shadow-soft hover:bg-[#C90026] transition-all"
              >
                <span>Start Practice</span>
                <Play className="h-3 w-3 fill-current" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* RECENT ACTIVITY (ATTEMPT HISTORY) */}
      {/* ==================================================================== */}
      <section className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-soft space-y-4">
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

        {hasAttempts ? (
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
                {attempts.slice(0, 5).map((att, idx) => (
                  <tr key={att.id || idx}>
                    <td className="py-3 font-bold text-[#20252B]">
                      {att.paperName || att.paperSlug || 'Examination Simulation'}
                    </td>
                    <td className="py-3 text-[#66727D]">
                      {att.completedAt ? new Date(att.completedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3 font-mono font-bold text-[#20252B]">
                      {att.totalScore ?? att.score ?? 0} / {att.maxScore || 720}
                    </td>
                    <td className="py-3 font-mono font-bold text-[#20252B]">
                      {att.accuracy ? `${att.accuracy}%` : '--'}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/dashboard/results/${att.id || 'latest'}`}
                        className="font-bold text-[#20252B] hover:underline"
                      >
                        View Result & OMR →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <p className="text-xs text-[#66727D] max-w-md mx-auto leading-relaxed">
              No examination attempts recorded yet. Papers you complete will appear here with full scorecards and physical OMR evaluations.
            </p>
            <Link
              href="/papers"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:underline"
            >
              <span>Browse Question Papers</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
