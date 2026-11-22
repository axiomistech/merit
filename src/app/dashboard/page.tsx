'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  RotateCcw,
  BarChart3,
  CheckCircle2,
  Gift,
  Clock,
  Award,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function StudentDashboardPage() {
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
    email: 'candidate@example.com',
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

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedSession =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (storedSession) {
        try {
          const parsed = JSON.parse(storedSession);
          setCandidate({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'MW-26-000001',
            email: parsed.email || 'candidate@example.com',
          });
        } catch {}
      }

      // Load attempts
      let attemptList: any[] = [];
      const storedAttempts =
        localStorage.getItem('merit_student_attempts') || localStorage.getItem('fort_student_attempts');
      if (storedAttempts) {
        try {
          attemptList = JSON.parse(storedAttempts);
        } catch {}
      }

      const storedLatest =
        localStorage.getItem('merit_latest_attempt') || localStorage.getItem('fort_latest_attempt');
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

      // Load entitlements
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
          const storedEnt =
            localStorage.getItem('merit_entitlements') || localStorage.getItem('fort_entitlements');
          if (storedEnt) {
            try {
              const parsed = JSON.parse(storedEnt);
              setEntitlements(parsed);
            } catch {}
          }
        });
    }
  }, []);

  const avgAccuracy =
    attempts.length > 0
      ? Math.round(attempts.reduce((acc, a) => acc + (a.accuracy || 0), 0) / attempts.length)
      : 0;

  const totalQuestionsAttempted = attempts.reduce(
    (acc, a) => acc + (a.totalQuestions || a.attemptedCount || 0),
    0
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#121316]">
      {/* Greeting Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E4DF] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3 py-0.5 text-[11px] font-bold uppercase tracking-wider text-[#52525B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              CANDIDATE DASHBOARD
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
            Welcome, {candidate.fullName}
          </h1>
          <p className="mt-0.5 text-xs text-[#52525B]">
            Candidate ID: <span className="font-mono font-bold text-[#121316]">{candidate.registrationId}</span> • Verified Profile
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/qp-prep"
            className="btn-merit-primary h-10 px-5 text-xs font-bold uppercase tracking-wider"
          >
            <FileText className="h-3.5 w-3.5" />
            <span>Question Papers</span>
            <span className="font-mono text-xs">↗</span>
          </Link>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* COMPLIMENTARY ENTITLEMENT BANNER                                     */}
      {/* ==================================================================== */}
      {entitlements.freePaperAvailable ? (
        <section className="rounded-2xl border border-[#E8E0D0] bg-[#F7F3EB] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFFFFF] text-[#8C6D3B] shadow-xs">
                <Gift className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8C6D3B] px-3 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider">
                  Complimentary Access Available
                </div>
                <h2 className="text-base sm:text-lg font-bold text-[#121316]">
                  Your preparation starts here. Your first examination paper is complimentary.
                </h2>
                <p className="text-xs text-[#52525B] max-w-2xl leading-relaxed">
                  Select any examination paper from our library. Your first paper unlocks free of charge, with complete CBT timed simulation, scorecards, and physical vector A4 OMR sheets.
                </p>
              </div>
            </div>

            <Link
              href="/dashboard/qp-prep"
              className="btn-merit-primary px-6 py-2.5 text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-center"
            >
              <span>Select Free Paper</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      ) : entitlements.freePaperSlug ? (
        <section className="merit-card p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
                <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                  Active Entitlement
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#121316]">
                  Complimentary Paper: {entitlements.freePaperSlug}
                </h2>
                <p className="text-xs text-[#52525B]">
                  Permanent access granted. You can attempt, re-attempt, and review this paper at any time.
                </p>
              </div>
            </div>

            <Link
              href={`/exam/${entitlements.freePaperSlug}`}
              className="btn-merit-primary px-5 py-2 text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-center"
            >
              <span>Practice Paper</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </section>
      ) : null}

      {/* ==================================================================== */}
      {/* PERFORMANCE OVERVIEW METRIC TILES                                    */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
            Performance Snapshot
          </h2>
          <Link href="/dashboard/analytics" className="text-xs font-semibold text-[#121316] hover:underline flex items-center gap-1">
            <span>Detailed Analytics</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {hasAttempts ? (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Average Accuracy</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#121316]">
                {avgAccuracy}%
              </div>
              <div className="mt-1 text-[11px] text-[#52525B]">Evaluated attempts</div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Latest Mock Score</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#121316]">
                {latestAttempt?.totalScore ?? latestAttempt?.score ?? 0}
                <span className="text-xs text-[#71717A] font-normal"> / {latestAttempt?.maxScore || 720}</span>
              </div>
              <div className="mt-1 text-[11px] text-[#52525B]">
                Accuracy: {latestAttempt?.accuracy ?? 0}%
              </div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Questions Attempted</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#121316]">
                {totalQuestionsAttempted}
              </div>
              <div className="mt-1 text-[11px] text-[#52525B]">Across all papers</div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Tests Completed</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#121316]">
                {attempts.length}
              </div>
              <div className="mt-1 text-[11px] text-[#52525B]">Scorecards generated</div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Average Accuracy</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#A1A1AA]">--</div>
              <div className="mt-1 text-[11px] text-[#71717A]">Awaiting first test</div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Latest Mock Score</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#A1A1AA]">--</div>
              <div className="mt-1 text-[11px] text-[#71717A]">Awaiting first test</div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Questions Attempted</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#A1A1AA]">0</div>
              <div className="mt-1 text-[11px] text-[#71717A]">No attempts yet</div>
            </div>

            <div className="merit-card p-5 shadow-xs">
              <div className="text-xs font-semibold text-[#71717A]">Tests Completed</div>
              <div className="mt-2 font-mono text-3xl font-extrabold text-[#A1A1AA]">0</div>
              <div className="mt-1 text-[11px] text-[#71717A]">No tests completed</div>
            </div>
          </div>
        )}
      </section>

      {/* ==================================================================== */}
      {/* 4 CORE EXAMINATION CURRICULA                                         */}
      {/* ==================================================================== */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              Preparation Disciplines
            </h2>
            <p className="text-base font-bold text-[#121316]">
              Target Examination Curricula
            </p>
          </div>
          <Link
            href="/dashboard/qp-prep"
            className="text-xs font-semibold text-[#121316] hover:underline flex items-center gap-1"
          >
            <span>Open Question Papers</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              exam: 'NEET',
              fullName: 'Medical Entrance (UG)',
              desc: 'Authentic 720-mark national medical entrance question papers with vector A4 OMR.',
              spec: '180 Qs • 200m',
            },
            {
              exam: 'JEE',
              fullName: 'Engineering Entrance',
              desc: 'Official sessions with numerical integer fields and multi-select partial marking.',
              spec: 'Main & Advanced',
            },
            {
              exam: 'UPSC',
              fullName: 'Civil Services CSE',
              desc: 'Prelims GS-1 and CSAT simulations calibrated with standard 0.66 negative marking.',
              spec: 'GS-1 & CSAT',
            },
            {
              exam: 'GATE',
              fullName: 'Graduate Aptitude Test',
              desc: 'Branch-specific engineering assessment with MCQ, MSQ, and NAT calculator parity.',
              spec: 'CS, ME, EE, EC, CE',
            },
          ].map((item) => (
            <div
              key={item.exam}
              className="merit-card p-6 shadow-xs flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-lg font-bold text-[#121316] tracking-tight">
                    {item.exam}
                  </span>
                  <span className="font-mono text-[10px] font-bold text-[#71717A] bg-[#F4F4F0] px-2 py-0.5 rounded-full">
                    {item.spec}
                  </span>
                </div>
                <div className="text-xs font-semibold text-[#52525B]">{item.fullName}</div>
                <p className="text-xs text-[#71717A] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <Link
                href="/dashboard/qp-prep"
                className="btn-merit-secondary w-full py-2 text-xs font-bold uppercase tracking-wider"
              >
                <span>Browse Papers</span>
                <span className="font-mono text-xs">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* RECENT ACTIVITY (ATTEMPT HISTORY)                                     */}
      {/* ==================================================================== */}
      <section className="merit-card p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-4">
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-[#8C6D3B]" />
            <h3 className="text-sm font-bold text-[#121316]">
              Recent Activity
            </h3>
          </div>
          <Link href="/dashboard/history" className="text-xs font-semibold text-[#121316] hover:underline flex items-center gap-1">
            <span>View All History</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {hasAttempts ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#E4E4DF] text-[#71717A]">
                  <th className="pb-3 font-semibold">Examination Paper</th>
                  <th className="pb-3 font-semibold">Date Completed</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Accuracy</th>
                  <th className="pb-3 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E4DF]/60">
                {attempts.slice(0, 5).map((att, idx) => (
                  <tr key={att.id || idx}>
                    <td className="py-3 font-semibold text-[#121316]">
                      {att.paperName || att.paperSlug || 'Examination Simulation'}
                    </td>
                    <td className="py-3 text-[#71717A]">
                      {att.completedAt ? new Date(att.completedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="py-3 font-mono font-bold text-[#121316]">
                      {att.totalScore ?? att.score ?? 0} / {att.maxScore || 720}
                    </td>
                    <td className="py-3 font-mono font-bold text-[#121316]">
                      {att.accuracy ? `${att.accuracy}%` : '--'}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        href={`/dashboard/results/${att.id || 'latest'}`}
                        className="font-semibold text-[#121316] hover:text-[#8C6D3B] transition-colors"
                      >
                        Scorecard & OMR →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center space-y-3">
            <p className="text-xs text-[#71717A] max-w-md mx-auto leading-relaxed">
              No examination attempts recorded yet. Papers you complete will appear here with full diagnostic scorecards and vector A4 OMR evaluations.
            </p>
            <Link
              href="/dashboard/qp-prep"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        )}
      </section>
    </div>
  );
}
