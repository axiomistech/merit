'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  ArrowRight,
  Search,
  CheckCircle2,
  Lock,
  Sparkles,
  Award,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoredTests, AdminTestRecord } from '@/lib/admin/store';

export default function PublicPapersPage() {
  const [examFilter, setExamFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [tests, setTests] = useState<AdminTestRecord[]>([]);
  const [studentSession, setStudentSession] = useState<any>(null);
  const [entitlements, setEntitlements] = useState<{
    freePaperAvailable: boolean;
    unlockedPapers: string[];
  }>({
    freePaperAvailable: true,
    unlockedPapers: [],
  });

  const allPapers = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      exam: 'neet',
      examLabel: 'NEET (UG)',
      year: 2025,
      questions: 180,
      duration: 200,
      marks: 720,
      paperType: 'previous_year',
      hasOMR: true,
      description:
        'The authentic NTA NEET 2025 examination question paper with official answer keys, KaTeX solutions, and printable A4 OMR sheet.',
    },
    {
      id: 'paper_neet_2024_pyq',
      name: 'NEET (UG) 2024 Official Question Paper',
      slug: 'neet-2024-official-pyq',
      exam: 'neet',
      examLabel: 'NEET (UG)',
      year: 2024,
      questions: 180,
      duration: 200,
      marks: 720,
      paperType: 'previous_year',
      hasOMR: true,
      description:
        'Official 720-mark national medical entrance paper with sub-concept diagnostic analytics and OMR answer sheet.',
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      exam: 'jee-main',
      examLabel: 'JEE Main',
      year: 2025,
      questions: 90,
      duration: 180,
      marks: 300,
      paperType: 'previous_year',
      hasOMR: false,
      description:
        'Full CBT simulation of JEE Main Jan 2025 shift with numerical integer validation and negative marking.',
    },
    {
      id: 'paper_jee_2025_shift2',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 2)',
      slug: 'jee-main-2025-session1-shift2',
      exam: 'jee-main',
      examLabel: 'JEE Main',
      year: 2025,
      questions: 90,
      duration: 180,
      marks: 300,
      paperType: 'previous_year',
      hasOMR: false,
      description:
        'Full CBT simulation of JEE Main Jan 2025 afternoon shift with step-by-step solutions.',
    },
    {
      id: 'paper_jee_adv_2024_p1',
      name: 'JEE Advanced 2024 Paper 1 (Official IIT Madras)',
      slug: 'jee-advanced-2024-paper-1',
      exam: 'jee-advanced',
      examLabel: 'JEE Advanced',
      year: 2024,
      questions: 51,
      duration: 180,
      marks: 180,
      paperType: 'previous_year',
      hasOMR: false,
      description:
        'Multi-correct options (+4/+3/+2/+1/-2), matrix matching, and numerical stem questions with partial marking.',
    },
    {
      id: 'paper_upsc_prelims_2024',
      name: 'UPSC Civil Services Prelims 2024 GS-1',
      slug: 'upsc-prelims-2024-gs1',
      exam: 'upsc',
      examLabel: 'UPSC CSE',
      year: 2024,
      questions: 100,
      duration: 120,
      marks: 200,
      paperType: 'previous_year',
      hasOMR: true,
      description:
        'Authentic UPSC Prelims General Studies Paper I with standard 0.66 negative marking and analytical answer keys.',
    },
  ];

  useEffect(() => {
    // Check local student session
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('fort_student_session');
      if (session) {
        try {
          const parsed = JSON.parse(session);
          setStudentSession(parsed);

          // Fetch student's entitlements
          fetch(`/api/entitlements?registrationId=${parsed.registrationId || 'FORT-26-000001'}`)
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setEntitlements({
                  freePaperAvailable: data.freePaperAvailable ?? true,
                  unlockedPapers: data.unlockedPapers || [],
                });
              }
            })
            .catch(() => {});
        } catch {}
      }
    }
  }, []);

  const filtered = allPapers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesExam = examFilter === 'all' || p.exam === examFilter;
    return matchesSearch && matchesExam;
  });

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B] py-14 px-4 sm:px-6 lg:px-8">
      {/* Ambient Liquid Fluid Backdrop */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-[-100px] right-[-80px] h-[650px] w-[650px]" />
        <div className="liquid-orb-red top-[400px] left-[-100px] h-[550px] w-[550px]" />
        <div className="liquid-orb-glacier bottom-[-100px] right-[10%] h-[700px] w-[700px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#66727D]">
            <FileText className="h-3.5 w-3.5 text-[#20252B]" />
            <span>CENTRALIZED QUESTION PAPER REPOSITORY</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[#20252B] tracking-tight font-sans">
            Question Paper Discovery
          </h1>
          <p className="text-sm sm:text-base text-[#66727D] leading-relaxed max-w-2xl mx-auto">
            Your first question paper unlock is complimentary. Unlock every subsequent paper for ₹10.
            Full-length CBT simulations, server-authoritative scoring, and authentic physical OMR sheets.
          </p>

          {/* Pricing Highlight Pill (3 Colors Only) */}
          <div className="inline-flex flex-wrap items-center justify-center gap-3 pt-2">
            <span className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#20252B]">
              ✨ 1st Paper: <strong className="text-[#E4002B]">Free</strong>
            </span>
            <span className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#20252B]">
              ⚡ Subsequent Papers: <strong className="text-[#20252B]">₹10 Each</strong>
            </span>
            <span className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#20252B]">
              ♾️ Unlocked Papers: <strong className="text-[#20252B]">Retain Access Forever</strong>
            </span>
          </div>
        </div>

        {/* Search & Filters (Liquid Glass Pill) */}
        <div className="glass-polar flex flex-wrap items-center justify-between gap-4 rounded-full p-2.5 sm:p-3 shadow-xl max-w-5xl mx-auto backdrop-blur-2xl">
          <div className="relative flex-1 min-w-[260px] pl-2">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
            <input
              type="text"
              placeholder="Search paper by name, exam, or year..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-full border border-transparent bg-[#F1F3F4] pl-10 pr-4 py-2.5 text-xs text-[#20252B] placeholder-[#66727D] focus:outline-none focus:border-[#9CC6E0]"
            />
          </div>

          <div className="flex flex-wrap items-center gap-1.5 pr-2">
            {[
              { label: 'All Exams', value: 'all' },
              { label: 'NEET (UG)', value: 'neet' },
              { label: 'JEE Main', value: 'jee-main' },
              { label: 'JEE Adv', value: 'jee-advanced' },
              { label: 'UPSC CSE', value: 'upsc' },
            ].map((tab) => (
              <button
                key={tab.value}
                type="button"
                onClick={() => setExamFilter(tab.value)}
                className={cn(
                  'px-3.5 py-2 text-xs font-bold rounded-full transition-colors duration-150',
                  examFilter === tab.value
                    ? 'bg-[#20252B] text-white'
                    : 'bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Question Papers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((paper) => {
            const isUnlocked =
              entitlements.unlockedPapers.includes('all') ||
              entitlements.unlockedPapers.includes(paper.slug);

            return (
              <div
                key={paper.id}
                className="glass-polar rounded-[36px] p-8 shadow-xl flex flex-col justify-between space-y-5 hover:border-[#9CC6E0] transition-all duration-200 backdrop-blur-2xl"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                      {paper.examLabel} • {paper.year}
                    </span>

                    {/* Status Badge */}
                    {isUnlocked ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-[#20252B] bg-[#9CC6E0]/30 px-3 py-0.5 rounded-full">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#E4002B]" />
                        <span>Unlocked</span>
                      </span>
                    ) : studentSession && entitlements.freePaperAvailable ? (
                      <span className="text-[11px] font-bold text-[#20252B] bg-[#9CC6E0]/30 px-3 py-0.5 rounded-full">
                        Free Unlock Eligible
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold text-[#66727D] glass-pill px-3 py-0.5 rounded-full">
                        ₹10 to Unlock
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-[#20252B] leading-snug">
                    {paper.name}
                  </h3>

                  <p className="text-xs text-[#66727D] leading-relaxed line-clamp-2">
                    {paper.description}
                  </p>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-white/60 text-xs">
                    <div>
                      <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                        Questions
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.questions}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                        Duration
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.duration}m
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#66727D] uppercase font-bold block">
                        Max Marks
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.marks}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/60 flex items-center justify-between">
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="text-xs font-semibold text-[#66727D] hover:text-[#20252B] transition-colors"
                  >
                    View Syllabus & Rules
                  </Link>

                  {/* Contextual Action Button */}
                  {!studentSession ? (
                    <Link
                      href={`/login?redirect=${encodeURIComponent(`/papers/${paper.slug}`)}`}
                      className="glass-pill inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[#20252B] text-xs font-bold hover:bg-white transition-colors"
                    >
                      <Lock className="h-3.5 w-3.5" />
                      <span>Sign In to Unlock</span>
                    </Link>
                  ) : isUnlocked ? (
                    <Link
                      href={`/exam/${paper.slug}`}
                      className="glass-polar inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-[#20252B] text-xs font-bold hover:border-[#9CC6E0] transition-colors shadow-sm"
                    >
                      <span>Start Attempt</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  ) : entitlements.freePaperAvailable ? (
                    <Link
                      href={`/papers/${paper.slug}?action=claim_free`}
                      className="glass-racing-red inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-[#E4002B]/25 transition-all hover:translate-y-[-1px]"
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>Unlock Free Paper</span>
                    </Link>
                  ) : (
                    <Link
                      href={`/papers/${paper.slug}?action=buy`}
                      className="glass-racing-red inline-flex items-center gap-1.5 px-5 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-[#E4002B]/25 transition-all hover:translate-y-[-1px]"
                    >
                      <span>Unlock for ₹10</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
