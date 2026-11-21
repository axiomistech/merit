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
    <div className="liquid-canvas min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-12 left-1/4 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-10 right-1/4 h-72 w-72 opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6]/80 pb-6">
        <div>
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              Candidate Library
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            My Question Papers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Access your unlocked question papers, launch timed simulations, and review evaluated scorecards.
          </p>
        </div>

        <Link
          href="/papers"
          className="glass-polar inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
        >
          <span>Explore All Papers</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Tabs & Filters */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
        {/* Navigation Tabs */}
        <div className="glass-polar flex items-center gap-1.5 rounded-full p-1.5 shadow-sm">
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
                'px-4 py-1.5 text-xs font-bold rounded-full transition-all duration-150',
                activeTab === tab.value
                  ? 'bg-[#20252B] text-white shadow-sm'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Exam Filter */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-[#66727D] font-medium mr-1">Exam:</span>
          {['all', 'NEET', 'JEE'].map((ex) => (
            <button
              key={ex}
              type="button"
              onClick={() => setExamFilter(ex)}
              className={cn(
                'px-3 py-1 rounded-full text-xs font-bold transition-all',
                examFilter === ex
                  ? 'bg-[#20252B] text-white shadow-sm'
                  : 'glass-pill text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {ex === 'all' ? 'All' : ex}
            </button>
          ))}
        </div>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="relative z-10 glass-polar rounded-[32px] p-12 text-center max-w-xl mx-auto space-y-4">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
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
              className="glass-racing-red inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      ) : (
        /* Paper Cards Grid */
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="glass-polar rounded-[32px] p-6 shadow-sm flex flex-col justify-between space-y-5 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    {paper.exam} • {paper.year}
                  </span>

                  {paper.isUnlocked ? (
                    <span className="flex items-center gap-1.5 text-[11px] font-bold text-[#20252B] bg-[#9CC6E0]/25 border border-[#9CC6E0]/40 px-3 py-1 rounded-full">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#20252B]" />
                      <span>Unlocked</span>
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-[#66727D] bg-white/60 px-3 py-1 rounded-full border border-[#DCE2E6]/60">
                      <Lock className="h-3 w-3" />
                      <span>Locked (₹10)</span>
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-base text-[#20252B] leading-snug">
                  {paper.name}
                </h3>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DCE2E6]/80 text-xs">
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
                  <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-3 text-xs flex items-center justify-between">
                    <span className="text-[#66727D]">Last Score:</span>
                    <span className="font-mono font-bold text-[#20252B]">
                      {paper.score} / {paper.maxMarks} ({paper.accuracy}%)
                    </span>
                  </div>
                )}
              </div>

              <div className="pt-4 border-t border-[#DCE2E6]/80 flex items-center justify-between">
                <Link
                  href={`/papers/${paper.slug}`}
                  className="text-xs font-semibold text-[#66727D] hover:text-[#20252B] transition-colors"
                >
                  Details
                </Link>

                {paper.isUnlocked ? (
                  <Link
                    href={`/exam/${paper.slug}`}
                    className="glass-racing-red inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-xs font-bold shadow-md transition-transform hover:scale-[1.02]"
                  >
                    <span>{paper.hasAttempt ? 'Re-attempt' : 'Start Attempt'}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                ) : (
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="glass-racing-red inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-xs font-bold shadow-md transition-transform hover:scale-[1.02]"
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
