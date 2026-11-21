'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaperItem {
  id: string;
  name: string;
  slug: string;
  exam: string;
  year: number;
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  unlockType?: 'free' | 'paid';
  unlockedAt?: string;
  isUnlocked: boolean;
  hasAttempt: boolean;
  score?: number;
  accuracy?: number;
  attemptId?: string;
}

export default function MyQuestionPapersPage() {
  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'attempted'>('all');
  const [examFilter, setExamFilter] = useState('all');
  const [studentSession, setStudentSession] = useState<any>(null);
  const [unlockedSlugs, setUnlockedSlugs] = useState<string[]>([]);
  const [attemptsMap, setAttemptsMap] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  const basePapers = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      exam: 'NEET (UG)',
      year: 2025,
      durationMinutes: 200,
      totalQuestions: 180,
      maxMarks: 720,
    },
    {
      id: 'paper_neet_2024_pyq',
      name: 'NEET (UG) 2024 Official Question Paper',
      slug: 'neet-2024-official-pyq',
      exam: 'NEET (UG)',
      year: 2024,
      durationMinutes: 200,
      totalQuestions: 180,
      maxMarks: 720,
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      exam: 'JEE Main',
      year: 2025,
      durationMinutes: 180,
      totalQuestions: 90,
      maxMarks: 300,
    },
    {
      id: 'paper_jee_2025_shift2',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 2)',
      slug: 'jee-main-2025-session1-shift2',
      exam: 'JEE Main',
      year: 2025,
      durationMinutes: 180,
      totalQuestions: 90,
      maxMarks: 300,
    },
    {
      id: 'paper_jee_adv_2024_p1',
      name: 'JEE Advanced 2024 Paper 1 (Official IIT Madras)',
      slug: 'jee-advanced-2024-paper-1',
      exam: 'JEE Advanced',
      year: 2024,
      durationMinutes: 180,
      totalQuestions: 51,
      maxMarks: 180,
    },
    {
      id: 'paper_upsc_prelims_2024',
      name: 'UPSC Civil Services Prelims 2024 GS-1',
      slug: 'upsc-prelims-2024-gs1',
      exam: 'UPSC CSE',
      year: 2024,
      durationMinutes: 120,
      totalQuestions: 100,
      maxMarks: 200,
    },
  ];

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setStudentSession(parsed);

          // Fetch student entitlements
          fetch(`/api/entitlements?registrationId=${parsed.registrationId || 'FORT-26-000001'}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success && data.unlockedPapers) {
                setUnlockedSlugs(data.unlockedPapers);
              }
            })
            .catch(() => {});

          // Fetch student attempts
          fetch(`/api/test-attempts?registrationId=${parsed.registrationId || 'FORT-26-000001'}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success && data.data) {
                const map: Record<string, any> = {};
                data.data.forEach((att: any) => {
                  map[att.paperName] = att;
                });
                setAttemptsMap(map);
              }
            })
            .catch(() => {});
        } catch {}
      }
      setLoading(false);
    }
  }, []);

  const papers: PaperItem[] = basePapers.map((p) => {
    const isUnlocked = unlockedSlugs.includes('all') || unlockedSlugs.includes(p.slug);
    const attempt = attemptsMap[p.name];
    return {
      ...p,
      isUnlocked,
      hasAttempt: !!attempt,
      score: attempt?.score,
      accuracy: attempt?.accuracy,
      attemptId: attempt?.id,
    };
  });

  const filtered = papers.filter((p) => {
    if (examFilter !== 'all' && !p.exam.toLowerCase().includes(examFilter.toLowerCase())) {
      return false;
    }
    if (activeTab === 'unlocked' && !p.isUnlocked) {
      return false;
    }
    if (activeTab === 'attempted' && !p.hasAttempt) {
      return false;
    }
    return true;
  });

  const unlockedCount = papers.filter((p) => p.isUnlocked).length;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
            Candidate Library
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            My Question Papers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Access your unlocked question papers, launch timed simulations, and review evaluated scorecards.
          </p>
        </div>

        <Link
          href="/papers"
          className="inline-flex items-center gap-2 rounded-xl bg-[#20252B] px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#343D46] transition-colors"
        >
          <span>Explore All Papers</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 rounded-xl border border-[#DCE2E6] bg-white p-1">
          {[
            { label: 'All Papers', value: 'all' },
            { label: `Unlocked (${unlockedCount})`, value: 'unlocked' },
            { label: 'Attempted', value: 'attempted' },
          ].map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setActiveTab(tab.value as any)}
              className={cn(
                'px-4 py-1.5 text-xs font-semibold rounded-lg transition-colors duration-150',
                activeTab === tab.value
                  ? 'bg-[#20252B] text-white'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Exam Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#66727D] font-medium">Exam:</span>
          {['all', 'NEET', 'JEE'].map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setExamFilter(ex)}
              className={cn(
                'px-2.5 py-1 rounded-md border text-xs font-semibold transition-colors',
                examFilter === ex
                  ? 'bg-[#20252B] text-white border-[#20252B]'
                  : 'bg-white text-[#66727D] border-[#DCE2E6] hover:bg-[#F1F3F4]'
              )}
            >
              {ex === 'all' ? 'All' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
            <FileText className="h-6 w-6" />
          </div>
          <h3 className="text-base font-bold text-[#20252B]">Your question papers will appear here</h3>
          <p className="text-xs text-[#66727D] leading-relaxed">
            {activeTab === 'unlocked'
              ? 'You have not unlocked any question papers yet. Explore the catalog and unlock your first paper for free.'
              : 'No question papers found matching your current filter.'}
          </p>
          <div className="pt-2">
            <Link
              href="/papers"
              className="inline-flex items-center gap-2 rounded-xl bg-[#E4002B] px-6 py-2.5 text-xs font-semibold text-white hover:bg-[#C90026] transition-colors"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Paper Cards Grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm flex flex-col justify-between space-y-5 hover:border-[#9CC6E0] transition-colors duration-150"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold uppercase tracking-wider bg-[#F1F3F4] text-[#20252B] border border-[#DCE2E6]">
                    {paper.exam} • {paper.year}
                  </span>

                  {paper.isUnlocked ? (
                    <span className="flex items-center gap-1 text-[11px] font-bold text-[#27835A] bg-[#E9F5EF] px-2.5 py-0.5 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#66727D] bg-[#F1F3F4] px-2.5 py-0.5 rounded-full">
                      <Lock className="h-3 w-3" />
                      <span>Locked (₹10)</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-[#20252B] leading-snug">
                  {paper.name}
                </h3>

                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#DCE2E6] text-xs">
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                      Questions
                    </span>
                    <span className="font-mono font-bold text-[#20252B]">
                      {paper.totalQuestions}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                      Duration
                    </span>
                    <span className="font-mono font-bold text-[#20252B]">
                      {paper.durationMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                      Max Marks
                    </span>
                    <span className="font-mono font-bold text-[#20252B]">
                      {paper.maxMarks}
                    </span>
                  </div>
                </div>

                {paper.hasAttempt && (
                  <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-2.5 text-xs flex items-center justify-between">
                    <span className="text-[#66727D]">Last Score:</span>
                    <span className="font-mono font-bold text-[#20252B]">
                      {paper.score} / {paper.maxMarks} ({paper.accuracy}%)
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-between">
                <Link
                  href={`/papers/${paper.slug}`}
                  className="text-xs font-semibold text-[#66727D] hover:text-[#20252B] transition-colors"
                >
                  Details
                </Link>

                {paper.isUnlocked ? (
                  <Link
                    href={`/exam/${paper.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#27835A] text-white text-xs font-semibold hover:bg-[#1E6746] transition-colors shadow-sm"
                  >
                    <span>{paper.hasAttempt ? 'Re-attempt' : 'Start Attempt'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#E4002B] text-white text-xs font-semibold hover:bg-[#C90026] transition-colors shadow-sm"
                  >
                    <span>Unlock Paper</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
