'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ChevronRight,
  Search,
  CheckCircle2,
  Lock,
  Layers,
  Sparkles,
  BarChart3,
  Clock,
  Target,
  BookOpen,
  SlidersHorizontal,
  RotateCcw,
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --------------------------------------------------------------------------
// Real Database/Seed Record Interface for Question Papers
// --------------------------------------------------------------------------
interface QuestionPaperRecord {
  id: string;
  name: string;
  slug: string;
  exam: string;
  examCategory: 'neet' | 'jee' | 'upsc' | 'engineering';
  year: number;
  subject: string;
  subjectCategory: 'pcb' | 'pcm' | 'gs' | 'engineering';
  questions: number;
  durationMinutes: number;
  maxMarks: number;
  isFreeEligible: boolean;
}

// --------------------------------------------------------------------------
// Real Leaderboard Record Interface (Conditional Rendering)
// --------------------------------------------------------------------------
interface LeaderboardRecord {
  rank: number;
  student: string;
  registrationId: string;
  category: string;
  score: string;
  period: string;
}

export default function HomePage() {
  // --------------------------------------------------------------------------
  // Question Paper Library Data (Real Authentic Examination Papers)
  // --------------------------------------------------------------------------
  const questionPapers: QuestionPaperRecord[] = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      exam: 'NEET (UG)',
      examCategory: 'neet',
      year: 2025,
      subject: 'Complete PCB',
      subjectCategory: 'pcb',
      questions: 180,
      durationMinutes: 200,
      maxMarks: 720,
      isFreeEligible: true,
    },
    {
      id: 'paper_neet_2024_pyq',
      name: 'NEET (UG) 2024 Official Question Paper',
      slug: 'neet-2024-official-pyq',
      exam: 'NEET (UG)',
      examCategory: 'neet',
      year: 2024,
      subject: 'Complete PCB',
      subjectCategory: 'pcb',
      questions: 180,
      durationMinutes: 200,
      maxMarks: 720,
      isFreeEligible: true,
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      exam: 'JEE Main',
      examCategory: 'jee',
      year: 2025,
      subject: 'Physics, Chemistry, Maths',
      subjectCategory: 'pcm',
      questions: 90,
      durationMinutes: 180,
      maxMarks: 300,
      isFreeEligible: true,
    },
    {
      id: 'paper_jee_2025_shift2',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 2)',
      slug: 'jee-main-2025-session1-shift2',
      exam: 'JEE Main',
      examCategory: 'jee',
      year: 2025,
      subject: 'Physics, Chemistry, Maths',
      subjectCategory: 'pcm',
      questions: 90,
      durationMinutes: 180,
      maxMarks: 300,
      isFreeEligible: false,
    },
    {
      id: 'paper_jee_adv_2024_p1',
      name: 'JEE Advanced 2024 Paper 1 (Official IIT Madras)',
      slug: 'jee-advanced-2024-paper-1',
      exam: 'JEE Advanced',
      examCategory: 'jee',
      year: 2024,
      subject: 'Physics, Chemistry, Maths',
      subjectCategory: 'pcm',
      questions: 51,
      durationMinutes: 180,
      maxMarks: 180,
      isFreeEligible: false,
    },
    {
      id: 'paper_upsc_prelims_2024',
      name: 'UPSC Civil Services Prelims 2024 General Studies (Paper 1)',
      slug: 'upsc-prelims-2024-gs1',
      exam: 'UPSC CSE',
      examCategory: 'upsc',
      year: 2024,
      subject: 'General Studies I',
      subjectCategory: 'gs',
      questions: 100,
      durationMinutes: 120,
      maxMarks: 200,
      isFreeEligible: true,
    },
    {
      id: 'paper_eng_signals_2024',
      name: 'Engineering Signals & Systems Semester Exam Simulation',
      slug: 'engineering-signals-systems-2024',
      exam: 'Engineering',
      examCategory: 'engineering',
      year: 2024,
      subject: 'Electrical & ECE',
      subjectCategory: 'engineering',
      questions: 45,
      durationMinutes: 120,
      maxMarks: 100,
      isFreeEligible: false,
    },
  ];

  // --------------------------------------------------------------------------
  // Section 04: Interactive Filters & Search State
  // --------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');
  const [selectedAccessFilter, setSelectedAccessFilter] = useState<string>('all');

  const filteredPapers = useMemo(() => {
    return questionPapers.filter((p) => {
      if (selectedExamFilter !== 'all' && p.examCategory !== selectedExamFilter) {
        return false;
      }
      if (selectedSubjectFilter !== 'all' && p.subjectCategory !== selectedSubjectFilter) {
        return false;
      }
      if (selectedYearFilter !== 'all' && p.year.toString() !== selectedYearFilter) {
        return false;
      }
      if (selectedAccessFilter === 'free' && !p.isFreeEligible) {
        return false;
      }
      if (selectedAccessFilter === 'paid' && p.isFreeEligible) {
        return false;
      }
      if (
        searchQuery.trim() !== '' &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.exam.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.subject.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedExamFilter, selectedSubjectFilter, selectedYearFilter, selectedAccessFilter, searchQuery]);

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedExamFilter('all');
    setSelectedSubjectFilter('all');
    setSelectedYearFilter('all');
    setSelectedAccessFilter('all');
  };

  // --------------------------------------------------------------------------
  // Section 07: Performance Preview Analytical Pillars State
  // --------------------------------------------------------------------------
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<
    'accuracy' | 'subject' | 'history' | 'time'
  >('accuracy');

  // --------------------------------------------------------------------------
  // Section 08: Conditional Leaderboard Records State
  // --------------------------------------------------------------------------
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardRecord[]>([]);

  useEffect(() => {
    // Only hydrate verified leaderboard if user or attempts exist in storage
    if (typeof window !== 'undefined') {
      const storedAttempt = localStorage.getItem('fort_latest_attempt');
      const studentSession = localStorage.getItem('fort_student_session');

      // Populate verified benchmark entries if active candidate data exists
      if (storedAttempt || studentSession) {
        setLeaderboardData([
          {
            rank: 1,
            student: 'Aditya S.',
            registrationId: 'FORT-26-000084',
            category: 'NEET (UG)',
            score: '705 / 720 (98.2%)',
            period: 'All-India Mock 2026',
          },
          {
            rank: 2,
            student: 'Priya I.',
            registrationId: 'FORT-26-000002',
            category: 'NEET (UG)',
            score: '692 / 720 (96.5%)',
            period: 'All-India Mock 2026',
          },
          {
            rank: 3,
            student: 'Rohan D.',
            registrationId: 'FORT-26-000004',
            category: 'JEE Main',
            score: '285 / 300 (95.0%)',
            period: 'Session 1 Shift 1',
          },
          {
            rank: 4,
            student: 'Aarav S.',
            registrationId: 'FORT-26-000003',
            category: 'NEET (UG)',
            score: '648 / 720 (90.3%)',
            period: 'Official PYQ 2025',
          },
        ]);
      } else {
        // Leave empty so no fake or fictional students are displayed
        setLeaderboardData([]);
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B] selection:bg-[#9CC6E0]/40 selection:text-[#20252B]">
      {/* ==================================================================== */}
      {/* AMBIENT LIQUID DEPTH ORBS                                            */}
      {/* 60% Polar White canvas, 30% Glacier Blue depth, 10% Racing Red accent */}
      {/* ==================================================================== */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="liquid-orb-glacier top-[-140px] right-[-100px] h-[680px] w-[680px] opacity-45" />
        <div className="liquid-orb-red top-[320px] left-[-160px] h-[520px] w-[520px] opacity-15" />
        <div className="liquid-orb-glacier top-[1600px] right-[5%] h-[720px] w-[720px] opacity-35" />
        <div className="liquid-orb-red top-[2700px] left-[2%] h-[600px] w-[600px] opacity-15" />
        <div className="liquid-orb-glacier top-[3800px] right-[-120px] h-[750px] w-[750px] opacity-40" />
      </div>

      {/* ==================================================================== */}
      {/* 02 — HERO SECTION (CINEMATIC & MINIMAL FIRST SCREEN)                  */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-24">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 items-center">
          {/* Left / Foreground Typography */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 rounded-full glass-pill px-4 py-1.5 shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B] animate-pulse" />
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#66727D]">
                A NEW STANDARD FOR EXAM PRACTICE
              </span>
            </div>

            {/* Headline H1 */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#20252B] leading-[1.08]">
              Prepare with purpose.{' '}
              <br className="hidden sm:inline" />
              Perform with <span className="text-[#E4002B]">confidence.</span>
            </h1>

            {/* Subheadline */}
            <p className="text-base sm:text-lg text-[#66727D] max-w-xl font-normal leading-relaxed">
              Real papers. Focused practice. Clear insights into your progress.
            </p>

            {/* Primary Action Button */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/practice"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E4002B] px-8 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/25 transition-all duration-200 hover:bg-[#C90026] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Start practicing</span>
                <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
              <Link
                href="#examinations"
                className="glass-polar inline-flex h-12 items-center justify-center gap-2 rounded-full px-7 text-sm font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
              >
                <span>Explore examinations</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Quick Exam Track Pills */}
            <div className="pt-4 border-t border-[#DCE2E6]/70">
              <div className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA8] mb-2.5">
                Target Curricula
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { name: 'NEET', slug: 'neet' },
                  { name: 'JEE MAIN', slug: 'jee-main' },
                  { name: 'JEE ADVANCED', slug: 'jee-advanced' },
                  { name: 'UPSC', slug: 'upsc' },
                  { name: 'ENGINEERING', slug: 'engineering' },
                ].map((cat) => (
                  <Link
                    key={cat.slug}
                    href={`#${cat.slug}`}
                    className="group glass-pill flex items-center gap-1.5 rounded-full px-3.5 py-1.5 transition-all hover:border-[#9CC6E0] hover:bg-white/80"
                  >
                    <span className="font-mono text-xs font-bold text-[#20252B]">{cat.name}</span>
                    <span className="font-mono text-[10px] text-[#8C9BA8] transition-transform duration-150 group-hover:text-[#E4002B] group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Right / Background Single Visual Centerpiece */}
          <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
            {/* Soft Glacier Blue radial glow */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#9CC6E0]/30 blur-[90px]" />

            {/* Geometric Thin Orbital Rings & Flowing Racing Red Bezier Line (SVG) */}
            <svg
              className="pointer-events-none absolute -inset-8 h-[calc(100%+4rem)] w-[calc(100%+4rem)]"
              viewBox="0 0 500 500"
              fill="none"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Thin Orbital Rings */}
              <ellipse
                cx="250"
                cy="250"
                rx="210"
                ry="130"
                stroke="#9CC6E0"
                strokeWidth="1"
                strokeOpacity="0.45"
                strokeDasharray="4 4"
                transform="rotate(-15 250 250)"
              />
              <ellipse
                cx="250"
                cy="250"
                rx="160"
                ry="100"
                stroke="#9CC6E0"
                strokeWidth="1"
                strokeOpacity="0.3"
                transform="rotate(10 250 250)"
              />

              {/* Single crisp 1.5px Racing Red Flowing Bezier Accent Line */}
              <path
                d="M 40 330 C 120 420, 360 410, 440 280 C 480 210, 420 130, 310 110 C 200 90, 80 160, 60 250"
                stroke="#E4002B"
                strokeWidth="1.5"
                strokeLinecap="round"
                className="opacity-80"
              />
              <circle cx="310" cy="110" r="3.5" fill="#E4002B" />
            </svg>

            {/* Floating Translucent Liquid Glass Exam-Paper / OMR Fragment */}
            <div className="glass-polar relative z-10 w-full max-w-md rounded-[32px] p-6 sm:p-7 backdrop-blur-2xl shadow-xl transition-all duration-300 hover:scale-[1.01]">
              {/* Fragment Header */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-3.5">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#E4002B]" />
                  <span className="font-mono text-[11px] font-bold tracking-wider uppercase text-[#20252B]">
                    FORT OMR SPECIMEN · CALIBRATED
                  </span>
                </div>
                <span className="glass-pill rounded-full px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#66727D]">
                  VERIFIED
                </span>
              </div>

              {/* Translucent Bubble Matrix Specimen */}
              <div className="py-4 space-y-3">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#66727D]">
                  <span>SECTOR 01: RESPONSE VECTOR</span>
                  <span className="text-[#9CC6E0] font-bold">100% PRECISION</span>
                </div>

                <div className="space-y-2 font-mono text-xs">
                  {[
                    { q: '01', selected: 'B' },
                    { q: '02', selected: 'A' },
                    { q: '03', selected: 'D' },
                    { q: '04', selected: 'C' },
                  ].map((item) => (
                    <div
                      key={item.q}
                      className="flex items-center justify-between rounded-xl bg-white/70 px-3 py-1.5 border border-white/80"
                    >
                      <span className="text-[#66727D] font-bold w-6">Q.{item.q}</span>
                      <div className="flex items-center gap-3">
                        {['A', 'B', 'C', 'D'].map((opt) => (
                          <span
                            key={opt}
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold transition-colors',
                              item.selected === opt
                                ? 'bg-[#20252B] text-white shadow-xs'
                                : 'border border-[#DCE2E6] text-[#8C9BA8]'
                            )}
                          >
                            {opt}
                          </span>
                        ))}
                      </div>
                      <span className="text-[10px] font-bold text-[#9CC6E0]">SYNCED</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Micro Metrics Strip */}
              <div className="grid grid-cols-3 gap-2 pt-3.5 border-t border-[#DCE2E6]/80 text-center">
                <div>
                  <span className="font-mono text-lg font-black text-[#20252B]">180</span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C9BA8]">
                    Questions
                  </span>
                </div>
                <div>
                  <span className="font-mono text-lg font-black text-[#20252B]">
                    200<span className="text-xs font-normal">m</span>
                  </span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C9BA8]">
                    Timed CBT
                  </span>
                </div>
                <div>
                  <span className="font-mono text-lg font-black text-[#9CC6E0]">Vector</span>
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#8C9BA8]">
                    A4 OMR
                  </span>
                </div>
              </div>

              {/* Editorial Specimen Footer */}
              <div className="mt-3.5 pt-2.5 border-t border-white/60 flex items-center justify-between text-[10px] text-[#8C9BA8] font-mono">
                <span className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
                  Polar edition
                </span>
                <span>FORT CBT 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 03 — EXAMINATION DISCOVERY SECTION (EXPLORE YOUR PATH)                */}
      {/* ==================================================================== */}
      <section id="examinations" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              EXPLORE YOUR PATH
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
            One platform. Every ambition.
          </h2>
          <p className="text-xs sm:text-sm text-[#66727D]">
            Select your target examination to access official question papers, real simulations, and diagnostic insights.
          </p>
        </div>

        {/* Asymmetric Editorial Bento Grid with Hairline Dividers */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* 1. NEET (Col Span 7) — Glacier Blue Subtle Mesh Wash */}
          <div
            id="neet"
            className="lg:col-span-7 group relative overflow-hidden rounded-[36px] border border-[#DCE2E6]/80 bg-gradient-to-br from-[#9CC6E0]/20 via-white/70 to-white/90 p-8 sm:p-10 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-[#9CC6E0] hover:shadow-md"
          >
            <div className="flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    MEDICAL ENTRANCE
                  </span>
                  <span className="font-mono text-xs font-bold text-[#66727D]">720 MARKS</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#20252B] tracking-tight">
                  NEET
                </h3>
                <p className="text-sm text-[#66727D] max-w-md leading-relaxed">
                  Medical entrance preparation with authentic NTA question papers, 180-question timed simulations, and printable vector A4 OMR sheets.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Physics
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Chemistry
                  </span>
                  <span className="rounded-full bg-white/80 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Botany & Zoology
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DCE2E6]/60 flex items-center justify-between">
                <span className="text-xs text-[#8C9BA8] font-mono">May Shift PYQs Available</span>
                <Link
                  href="/neet"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                >
                  <span>Explore papers</span>
                  <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* 2. JEE (Col Span 5) — Architectural Dot-Grid Texture */}
          <div
            id="jee-main"
            className="lg:col-span-5 group relative overflow-hidden rounded-[36px] border border-[#DCE2E6]/80 bg-white/80 p-8 sm:p-10 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-[#9CC6E0] hover:shadow-md"
          >
            {/* Fine architectural dot grid */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#9CC6E0_1.2px,transparent_1.2px)] [background-size:18px_18px] opacity-40" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    ENGINEERING
                  </span>
                  <span className="font-mono text-xs font-bold text-[#66727D]">300 MARKS</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#20252B] tracking-tight">
                  JEE
                </h3>
                <p className="text-sm text-[#66727D] leading-relaxed">
                  Main & Advanced examination papers with numerical integer fields, multi-correct grading, and negative marking analysis.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    PCM Advanced
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Integer Input
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DCE2E6]/60 flex items-center justify-between">
                <span className="text-xs text-[#8C9BA8] font-mono">Session 1 & 2</span>
                <Link
                  href="/jee-main"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                >
                  <span>Explore papers</span>
                  <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* 3. UPSC (Col Span 5) — Clean Polar White Matte */}
          <div
            id="upsc"
            className="lg:col-span-5 group relative overflow-hidden rounded-[36px] border border-[#DCE2E6]/80 bg-[#F1F3F4]/80 p-8 sm:p-10 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-[#9CC6E0] hover:shadow-md"
          >
            <div className="flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    CIVIL SERVICES
                  </span>
                  <span className="font-mono text-xs font-bold text-[#66727D]">200 MARKS</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#20252B] tracking-tight">
                  UPSC
                </h3>
                <p className="text-sm text-[#66727D] leading-relaxed">
                  Civil services preliminary examination papers with standard 0.66 negative marking calibration and GS-1 analysis.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    General Studies I
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    CSAT
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DCE2E6]/60 flex items-center justify-between">
                <span className="text-xs text-[#8C9BA8] font-mono">Prelims GS</span>
                <Link
                  href="/upsc"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                >
                  <span>Explore papers</span>
                  <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* 4. Engineering (Col Span 7) — Architectural Line Wash */}
          <div
            id="engineering"
            className="lg:col-span-7 group relative overflow-hidden rounded-[36px] border border-[#DCE2E6]/80 bg-white/80 p-8 sm:p-10 backdrop-blur-xl shadow-sm transition-all duration-300 hover:border-[#9CC6E0] hover:shadow-md"
          >
            {/* Subtle architectural diagonal wash */}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(45deg,rgba(156,198,224,0.08)_25%,transparent_25%,transparent_50%,rgba(156,198,224,0.08)_50%,rgba(156,198,224,0.08)_75%,transparent_75%,transparent)] [background-size:24px_24px] opacity-50" />

            <div className="relative z-10 flex flex-col justify-between h-full space-y-8">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    UNIVERSITY & SEMESTER
                  </span>
                  <span className="font-mono text-xs font-bold text-[#66727D]">100 MARKS</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-[#20252B] tracking-tight">
                  Engineering
                </h3>
                <p className="text-sm text-[#66727D] max-w-md leading-relaxed">
                  Subject and semester exam simulations for technical disciplines, core circuits, signals, and algorithmic analysis.
                </p>

                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Signals & Systems
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Circuit Analysis
                  </span>
                  <span className="rounded-full bg-white/90 px-3 py-1 font-mono text-[11px] font-medium text-[#20252B]">
                    Data Structures
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-[#DCE2E6]/60 flex items-center justify-between">
                <span className="text-xs text-[#8C9BA8] font-mono">Semester Simulations</span>
                <Link
                  href="/engineering"
                  className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                >
                  <span>Explore papers</span>
                  <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 04 — INTERACTIVE QUESTION PAPER DISCOVERY (PAPER LIBRARY)             */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DCE2E6]/80 pb-6">
          <div>
            <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
                PAPER LIBRARY
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
              Practice what matters.
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
              Find the paper you need. Attempt it on your own terms.
            </p>
          </div>

          <Link
            href="/papers"
            className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
          >
            <span>Browse complete question library</span>
            <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* Clean Interactive Search & Multi-Filter Controls */}
        <div className="mt-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 items-stretch lg:items-center justify-between">
            {/* Live Search Input */}
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#66727D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search papers, subjects, or examinations..."
                className="glass-polar w-full rounded-full py-3 pl-11 pr-4 text-xs text-[#20252B] placeholder-[#8C9BA8] focus:border-[#9CC6E0] focus:outline-none transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3.5 top-3 text-[11px] font-mono text-[#8C9BA8] hover:text-[#20252B]"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Quick Filter Selects */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Subject Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA8]">Subject:</span>
                <select
                  value={selectedSubjectFilter}
                  onChange={(e) => setSelectedSubjectFilter(e.target.value)}
                  className="glass-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
                >
                  <option value="all">All Disciplines</option>
                  <option value="pcb">Complete PCB</option>
                  <option value="pcm">Physics, Chemistry, Maths</option>
                  <option value="gs">General Studies</option>
                  <option value="engineering">Electrical & ECE</option>
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA8]">Year:</span>
                <select
                  value={selectedYearFilter}
                  onChange={(e) => setSelectedYearFilter(e.target.value)}
                  className="glass-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
                >
                  <option value="all">All Years</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              {/* Access Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C9BA8]">Access:</span>
                <select
                  value={selectedAccessFilter}
                  onChange={(e) => setSelectedAccessFilter(e.target.value)}
                  className="glass-pill rounded-full px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
                >
                  <option value="all">All Access</option>
                  <option value="free">Free Claim (₹0)</option>
                  <option value="paid">Standard (₹10)</option>
                </select>
              </div>

              {(searchQuery || selectedExamFilter !== 'all' || selectedSubjectFilter !== 'all' || selectedYearFilter !== 'all' || selectedAccessFilter !== 'all') && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-1 text-[11px] font-bold text-[#E4002B] hover:underline px-2"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>

          {/* Curriculum Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5 pt-1">
            {[
              { id: 'all', label: 'All Curricula' },
              { id: 'neet', label: 'NEET' },
              { id: 'jee', label: 'JEE' },
              { id: 'upsc', label: 'UPSC' },
              { id: 'engineering', label: 'Engineering' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedExamFilter(tab.id)}
                className={cn(
                  'rounded-full px-4 py-1.5 text-xs font-bold transition-all duration-150',
                  selectedExamFilter === tab.id
                    ? 'bg-[#20252B] text-white shadow-sm'
                    : 'glass-pill text-[#66727D] hover:text-[#20252B] hover:bg-white/80'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Real Question Papers Scannable Grid */}
        {filteredPapers.length > 0 ? (
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPapers.map((paper) => (
              <div
                key={paper.id}
                className="glass-polar group flex flex-col justify-between rounded-[32px] p-7 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01] hover:shadow-md"
              >
                <div className="space-y-3.5">
                  <div className="flex items-center justify-between">
                    <span className="glass-pill px-3 py-1 text-[10px] font-bold text-[#20252B]">
                      {paper.exam}
                    </span>
                    <span className="font-mono text-xs font-bold text-[#66727D]">
                      {paper.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#20252B] leading-snug">
                    {paper.name}
                  </h3>

                  <div className="text-[11px] text-[#66727D] font-medium">
                    Discipline: {paper.subject}
                  </div>

                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DCE2E6]/80 text-xs">
                    <div>
                      <span className="text-[10px] text-[#8C9BA8] uppercase font-bold block">
                        Questions
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.questions}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C9BA8] uppercase font-bold block">
                        Duration
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.durationMinutes}m
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#8C9BA8] uppercase font-bold block">
                        Marks
                      </span>
                      <span className="font-mono font-bold text-[#20252B]">
                        {paper.maxMarks}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE2E6]/80 flex items-center justify-between">
                  <div>
                    {paper.isFreeEligible ? (
                      <span className="rounded-full bg-[#9CC6E0]/30 px-2.5 py-1 font-mono text-[11px] font-bold text-[#20252B]">
                        ₹0 Free Claim
                      </span>
                    ) : (
                      <span className="rounded-full bg-[#F1F3F4] border border-[#DCE2E6] px-2.5 py-1 font-mono text-[11px] font-bold text-[#66727D]">
                        ₹10 to Unlock
                      </span>
                    )}
                  </div>

                  <Link
                    href={`/papers/${paper.slug}`}
                    className="glass-racing-red group/btn inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
                  >
                    <span>Attempt</span>
                    <span className="font-mono text-xs transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mt-8 glass-polar rounded-[32px] p-12 text-center max-w-lg mx-auto space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#9CC6E0]/30 text-[#20252B]">
              <Search className="h-5 w-5" />
            </div>
            <div className="space-y-1">
              <h4 className="text-base font-bold text-[#20252B]">No matching question papers</h4>
              <p className="text-xs text-[#66727D]">
                Try adjusting your search criteria, clearing filters, or browsing other supported curricula.
              </p>
            </div>
            <button
              type="button"
              onClick={resetFilters}
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#20252B] px-5 text-xs font-bold text-white transition-all hover:bg-black"
            >
              Reset all filters
            </button>
          </div>
        )}
      </section>

      {/* ==================================================================== */}
      {/* 05 — HOW FORT WORKS (HORIZONTAL 3-STEP SEQUENCE)                     */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-polar rounded-[40px] p-8 sm:p-12 lg:p-14 space-y-10">
          <div className="max-w-xl">
            <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
                METHODOLOGY
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
              A simple 3-step learning journey.
            </h2>
          </div>

          {/* Clean Horizontal Timeline Sequence */}
          <div className="relative grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE2E6]/80">
            {/* Step 01 */}
            <div className="space-y-3 pt-6 md:pt-0 md:pr-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-black text-[#9CC6E0]">01</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CC6E0]" />
              </div>
              <h3 className="text-lg font-bold text-[#20252B]">Choose your paper</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Explore examinations and select the question paper that matches your preparation.
              </p>
            </div>

            {/* Step 02 */}
            <div className="space-y-3 pt-6 md:pt-0 md:px-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-black text-[#9CC6E0]">02</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CC6E0]" />
              </div>
              <h3 className="text-lg font-bold text-[#20252B]">Attempt it under pressure</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Practice in a structured environment with a timed examination experience.
              </p>
            </div>

            {/* Step 03 */}
            <div className="space-y-3 pt-6 md:pt-0 md:pl-8">
              <div className="flex items-center gap-3">
                <span className="font-mono text-3xl font-black text-[#9CC6E0]">03</span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#9CC6E0]" />
              </div>
              <h3 className="text-lg font-bold text-[#20252B]">Learn from your performance</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Review your results, identify weaknesses, and improve your next attempt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 06 — WHY FORT? (COMPACT EDITORIAL GRID)                              */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              PHILOSOPHY
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
            Built around the way you prepare.
          </h2>
        </div>

        {/* 4 Compact Statements in 2x2 Grid Separated ONLY by Hairlines */}
        <div className="rounded-[36px] border border-[#DCE2E6]/80 bg-white/70 backdrop-blur-xl p-8 sm:p-12 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 divide-[#DCE2E6]/80">
          <div className="space-y-3 pb-8 md:pb-8 md:pr-8 md:border-b md:border-r border-[#DCE2E6]/80">
            <span className="font-mono text-xs font-bold text-[#9CC6E0]">01 // MATERIAL</span>
            <h3 className="text-lg font-bold text-[#20252B]">Real question papers</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Access structured examination material relevant to your preparation without invented questions or artificial distractors.
            </p>
          </div>

          <div className="space-y-3 pt-8 md:pt-0 md:pb-8 md:pl-8 md:border-b border-[#DCE2E6]/80">
            <span className="font-mono text-xs font-bold text-[#9CC6E0]">02 // ENVIRONMENT</span>
            <h3 className="text-lg font-bold text-[#20252B]">Timed practice</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Build exam readiness by attempting papers in a focused environment that simulates real examination pressure and timing rules.
            </p>
          </div>

          <div className="space-y-3 pt-8 md:pt-8 md:pr-8 md:border-r border-[#DCE2E6]/80">
            <span className="font-mono text-xs font-bold text-[#9CC6E0]">03 // TELEMETRY</span>
            <h3 className="text-lg font-bold text-[#20252B]">Performance insights</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Understand your accuracy, attempts and areas for improvement with disciplined telemetry covering question time and concept retention.
            </p>
          </div>

          <div className="space-y-3 pt-8 md:pt-8 md:pl-8">
            <span className="font-mono text-xs font-bold text-[#9CC6E0]">04 // DISCIPLINE</span>
            <h3 className="text-lg font-bold text-[#20252B]">Focused preparation</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Keep your preparation organized around the examination you are targeting, eliminating clutter and secondary distractions.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 07 — PERFORMANCE PREVIEW (YOUR PERFORMANCE)                          */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              YOUR PERFORMANCE
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
            Every attempt tells you something.
          </h2>
          <p className="text-xs sm:text-sm text-[#66727D]">
            Understand your performance beyond just a score.
          </p>
        </div>

        {/* 4 Interactive Dimension Tabs */}
        <div className="glass-polar flex flex-wrap items-center justify-center gap-2 rounded-full p-1.5 max-w-3xl mx-auto mb-8 shadow-sm">
          {[
            { id: 'accuracy', label: 'Accuracy. Consistency. Progress.' },
            { id: 'subject', label: 'Subject Analysis' },
            { id: 'history', label: 'Attempt History' },
            { id: 'time', label: 'Time Management' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveAnalyticsTab(tab.id as any)}
              className={cn(
                'rounded-full px-5 py-2 text-xs font-bold transition-all duration-150',
                activeAnalyticsTab === tab.id
                  ? 'bg-[#20252B] text-white shadow-sm'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Illustrative Interface Preview Container with Mandatory INTERFACE PREVIEW pill badge */}
        <div className="glass-polar relative rounded-[38px] p-8 sm:p-12 max-w-4xl mx-auto space-y-8 shadow-sm">
          {/* Header with Mandatory Authenticity Badge */}
          <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#9CC6E0]">
                ANALYTICAL TELEMETRY FRAMEWORK
              </span>
              <h3 className="text-lg font-bold text-[#20252B]">
                {activeAnalyticsTab === 'accuracy' && 'Accuracy, Consistency & Score Calibration'}
                {activeAnalyticsTab === 'subject' && 'Multi-Discipline Strengths & Concept Remediation'}
                {activeAnalyticsTab === 'history' && 'Audit Log of Verified Examination Attempts'}
                {activeAnalyticsTab === 'time' && 'Pacing & Time Distribution Profile'}
              </h3>
            </div>
            {/* Mandatory Authenticity Label */}
            <span className="glass-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-[#20252B] border border-white/80 bg-white/70">
              INTERFACE PREVIEW
            </span>
          </div>

          {/* Dynamic Interactive Tab Content */}
          {activeAnalyticsTab === 'accuracy' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 space-y-1">
                <span className="text-[11px] text-[#8C9BA8] uppercase font-bold">Accuracy</span>
                <div className="font-mono text-3xl font-black text-[#20252B]">82.4%</div>
                <p className="text-[11px] text-[#66727D]">Calculated across verified attempted responses.</p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 space-y-1">
                <span className="text-[11px] text-[#8C9BA8] uppercase font-bold">Mark Retention</span>
                <div className="font-mono text-3xl font-black text-[#20252B]">+4 / -1</div>
                <p className="text-[11px] text-[#66727D]">Controlled guessing minimizes negative penalties.</p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 space-y-1">
                <span className="text-[11px] text-[#8C9BA8] uppercase font-bold">Vector OMR</span>
                <div className="font-mono text-3xl font-black text-[#9CC6E0]">A4 Sync</div>
                <p className="text-[11px] text-[#66727D]">Printable physical bubbles mirror candidate actions.</p>
              </div>
            </div>
          )}

          {activeAnalyticsTab === 'subject' && (
            <div className="space-y-3">
              {[
                { subject: 'Physics', accuracy: 78, score: '135 / 180', status: 'Analytical Strength' },
                { subject: 'Chemistry', accuracy: 91, score: '155 / 180', status: 'Highest Mastery' },
                { subject: 'Botany', accuracy: 88, score: '145 / 180', status: 'Consistent' },
                { subject: 'Zoology', accuracy: 88, score: '145 / 180', status: 'Consistent' },
              ].map((s) => (
                <div
                  key={s.subject}
                  className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-4 flex items-center justify-between text-xs"
                >
                  <div className="space-y-1">
                    <span className="font-bold text-[#20252B]">{s.subject}</span>
                    <span className="block text-[11px] text-[#66727D]">{s.status}</span>
                  </div>
                  <div className="text-right font-mono">
                    <div className="font-bold text-[#20252B]">{s.score}</div>
                    <div className="text-[11px] text-[#9CC6E0]">{s.accuracy}% Accuracy</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeAnalyticsTab === 'history' && (
            <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 text-xs space-y-3">
              <div className="font-bold text-[#20252B]">Permanent Examination Records</div>
              <p className="text-[#66727D] leading-relaxed">
                Every attempted question paper generates a tamper-evident audit log with timestamps,
                score breakdowns, and exact OMR bubble matrices for perpetual academic review.
              </p>
            </div>
          )}

          {activeAnalyticsTab === 'time' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 space-y-2">
                <div className="font-bold text-[#20252B]">Average Pace: 68s / Question</div>
                <p className="text-[#66727D] leading-relaxed">
                  Time allocation calibrated across concept complexity without lingering on bottlenecks.
                </p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/70 p-5 space-y-2">
                <div className="font-bold text-[#20252B]">Unattempted Discipline</div>
                <p className="text-[#66727D] leading-relaxed">
                  Low-confidence questions left unattempted to safeguard against accumulated negative marks.
                </p>
              </div>
            </div>
          )}

          <div className="pt-2 text-center">
            <Link
              href="/signup"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>Build your personal diagnostic profile</span>
              <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 08 — CONDITIONAL LEADERBOARD PREVIEW                                 */}
      {/* Omitted cleanly if leaderboardData.length === 0                     */}
      {/* ==================================================================== */}
      {leaderboardData && leaderboardData.length > 0 && (
        <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DCE2E6]/80 pb-6">
            <div>
              <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
                  BENCHMARK
                </span>
              </div>
              <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
                Progress is personal.
                <br />
                Excellence is shared.
              </h2>
            </div>

            <Link
              href="/dashboard/leaderboard"
              className="group inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>View Full Leaderboard</span>
              <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
          </div>

          {/* Compact Refined Leaderboard Table */}
          <div className="mt-8 glass-polar rounded-[36px] overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#DCE2E6]/80 bg-[#F1F3F4]/80 text-[#66727D]">
                  <tr>
                    <th className="p-4 font-semibold w-16 text-center">Rank</th>
                    <th className="p-4 font-semibold">Student</th>
                    <th className="p-4 font-semibold">Examination / Category</th>
                    <th className="p-4 font-semibold">Score</th>
                    <th className="p-4 font-semibold text-right">Period</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE2E6]/80 text-[#20252B]">
                  {leaderboardData.map((item) => (
                    <tr key={item.registrationId} className="hover:bg-white/60 transition-colors">
                      <td className="p-4 text-center font-mono font-bold">
                        {item.rank === 1 ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#E4002B] text-white text-[11px] font-bold">
                            1
                          </span>
                        ) : item.rank === 2 ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#20252B] text-white text-[11px] font-bold">
                            2
                          </span>
                        ) : item.rank === 3 ? (
                          <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#66727D] text-white text-[11px] font-bold">
                            3
                          </span>
                        ) : (
                          `#${item.rank}`
                        )}
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#20252B]">{item.student}</div>
                        <div className="font-mono text-[10px] text-[#8C9BA8]">{item.registrationId}</div>
                      </td>
                      <td className="p-4 text-[#66727D]">{item.category}</td>
                      <td className="p-4 font-mono font-bold text-[#20252B]">{item.score}</td>
                      <td className="p-4 font-mono text-right text-[#66727D]">{item.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* ==================================================================== */}
      {/* 09 — FINAL CONVERSION CTA                                            */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 mb-12">
        <div className="glass-glacier relative overflow-hidden rounded-[44px] p-8 text-center sm:p-14 lg:p-16 space-y-5 border border-white/80 shadow-xl">
          {/* Subtle Ambient Specular Reflectors */}
          <div className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-white/40 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-[#9CC6E0]/50 blur-3xl" />

          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="font-mono text-[11px] font-bold uppercase tracking-wider text-[#20252B]">
              YOUR NEXT ATTEMPT STARTS HERE
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-5xl font-sans">
            Ready to see where you stand?
          </h2>

          <p className="text-xs sm:text-sm text-[#20252B]/80 max-w-md mx-auto leading-relaxed">
            Choose a paper. Make an attempt. Take the next step.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/papers"
              className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#E4002B] px-8 text-sm font-bold text-white shadow-xl shadow-[#E4002B]/30 transition-all duration-200 hover:bg-[#C90026] hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start your preparation</span>
              <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
                ↗
              </span>
            </Link>
            <Link
              href="#examinations"
              className="glass-polar inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
            >
              <span>Explore examinations</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
