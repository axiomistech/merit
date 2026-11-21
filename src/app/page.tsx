'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  BookOpen,
  Target,
  FileText,
  Layers,
  Award,
  ChevronRight,
  Sparkles,
  Check,
  RotateCcw,
  Shield,
  Search,
  Filter,
  BarChart3,
  TrendingUp,
  CheckCircle2,
  Lock,
} from 'lucide-react';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';
import { cn } from '@/lib/utils';

interface QuestionPaperRecord {
  id: string;
  name: string;
  slug: string;
  exam: string;
  examCategory: 'neet' | 'jee' | 'upsc' | 'engineering';
  year: number;
  subject: string;
  questions: number;
  durationMinutes: number;
  maxMarks: number;
  isFreeEligible: boolean;
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
      subject: 'PCM Advanced',
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
      questions: 100,
      durationMinutes: 120,
      maxMarks: 200,
      isFreeEligible: true,
    },
    {
      id: 'paper_eng_signals_2024',
      name: 'Signals & Systems Semester Examination Simulation',
      slug: 'engineering-signals-systems-2024',
      exam: 'Engineering',
      examCategory: 'engineering',
      year: 2024,
      subject: 'Electrical & ECE',
      questions: 45,
      durationMinutes: 120,
      maxMarks: 100,
      isFreeEligible: false,
    },
  ];

  // --------------------------------------------------------------------------
  // Hero Interactive Question State
  // --------------------------------------------------------------------------
  const sampleQuestion = SAMPLE_NEET_QUESTIONS[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  const handleOptionSelect = (key: string) => {
    setSelectedOption(key);
    setShowExplanation(true);
  };

  const handleResetDemo = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  // --------------------------------------------------------------------------
  // Section 04: Question Paper Discovery Search & Filters
  // --------------------------------------------------------------------------
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExamFilter, setSelectedExamFilter] = useState<string>('all');
  const [selectedYearFilter, setSelectedYearFilter] = useState<string>('all');

  const filteredPapers = useMemo(() => {
    return questionPapers.filter((p) => {
      if (selectedExamFilter !== 'all' && p.examCategory !== selectedExamFilter) {
        return false;
      }
      if (selectedYearFilter !== 'all' && p.year.toString() !== selectedYearFilter) {
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
  }, [selectedExamFilter, selectedYearFilter, searchQuery]);

  // --------------------------------------------------------------------------
  // Section 07: Performance Analytics Preview Dimension Tab State
  // --------------------------------------------------------------------------
  const [activeAnalyticsTab, setActiveAnalyticsTab] = useState<
    'performance' | 'subject' | 'history' | 'time'
  >('performance');

  // --------------------------------------------------------------------------
  // Section 08: Verified Benchmark Leaderboard Records
  // --------------------------------------------------------------------------
  const verifiedLeaderboard = [
    {
      rank: 1,
      displayName: 'Aditya S.',
      registrationId: 'FORT-26-000084',
      exam: 'NEET (UG)',
      score: 705,
      maxMarks: 720,
      accuracy: 98.2,
      duration: '03:10:00',
    },
    {
      rank: 2,
      displayName: 'Priya I.',
      registrationId: 'FORT-26-000002',
      exam: 'NEET (UG)',
      score: 692,
      maxMarks: 720,
      accuracy: 96.5,
      duration: '03:16:40',
    },
    {
      rank: 3,
      displayName: 'Rohan D.',
      registrationId: 'FORT-26-000004',
      exam: 'JEE Main',
      score: 285,
      maxMarks: 300,
      accuracy: 95.0,
      duration: '02:45:00',
    },
    {
      rank: 4,
      displayName: 'Aarav S.',
      registrationId: 'FORT-26-000003',
      exam: 'NEET (UG)',
      score: 648,
      maxMarks: 720,
      accuracy: 90.3,
      duration: '03:19:15',
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B]">
      {/* ==================================================================== */}
      {/* AMBIENT LIQUID FLUID ORBS                                            */}
      {/* Strictly 3 Colors: Polar White (#F1F3F4), Glacier Blue (#9CC6E0), Racing Red (#E4002B) */}
      {/* ==================================================================== */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-[-100px] right-[-80px] h-[650px] w-[650px] opacity-55" />
        <div className="liquid-orb-red top-[350px] left-[-120px] h-[550px] w-[550px] opacity-20" />
        <div className="liquid-orb-glacier top-[1400px] right-[10%] h-[700px] w-[700px] opacity-45" />
        <div className="liquid-orb-red top-[2400px] left-[5%] h-[600px] w-[600px] opacity-20" />
        <div className="liquid-orb-glacier top-[3400px] right-[-100px] h-[750px] w-[750px] opacity-45" />
      </div>

      {/* ==================================================================== */}
      {/* 02 — HERO SECTION                                                    */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-24">
        {/* Seamless Liquid Frosted Glass Frame */}
        <div className="glass-polar relative overflow-hidden rounded-[38px] sm:rounded-[48px] p-6 sm:p-10 lg:p-16">
          {/* Subtle Internal Specular Light Reflection */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#9CC6E0]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#E4002B]/15 blur-3xl" />

          {/* Overline Tag */}
          <div className="relative text-center">
            <div className="glass-pill inline-flex items-center gap-2 rounded-full px-4 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#66727D]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B] animate-pulse" />
              <span>A NEW STANDARD FOR EXAM PRACTICE</span>
            </div>
          </div>

          {/* Headline (Option A) & Subtitle */}
          <div className="relative mt-8 text-center sm:mt-10">
            <h1 className="text-4xl font-black tracking-tight text-[#20252B] sm:text-6xl lg:text-7xl font-sans leading-[1.1]">
              Prepare with purpose.
              <br />
              Perform with <span className="text-[#E4002B]">confidence.</span>
            </h1>
            <p className="mt-4 font-sans text-sm font-semibold tracking-wide text-[#66727D] sm:text-base max-w-2xl mx-auto leading-relaxed">
              Real papers. Focused practice. Clear insights into your progress.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/papers"
              className="glass-racing-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white shadow-xl shadow-[#E4002B]/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Start practicing</span>
              <span className="font-mono text-xs">↗</span>
            </Link>
            <Link
              href="#examinations"
              className="glass-polar inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
            >
              <span>Explore examinations</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Supported Examination Badges */}
          <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-3">
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
                className="glass-pill flex items-center gap-2 rounded-full px-4 py-1.5 transition-all hover:border-[#9CC6E0] hover:bg-white/80"
              >
                <span className="font-mono text-xs font-bold text-[#20252B]">{cat.name}</span>
              </Link>
            ))}
          </div>

          {/* Central Physical Centerpiece with Orbital Ring & Fragment Preview */}
          <div className="relative mt-12 flex flex-col items-center">
            {/* Subtle Orbital Blue Accent Ring */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-full max-w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#9CC6E0]/40" />

            {/* Subtle Flowing Red Accent Line */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[260px] w-full max-w-[580px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E4002B]/20" />

            {/* Floating Translucent CBT Examination Interface Fragment */}
            <div className="glass-panel relative z-10 w-full max-w-2xl rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl shadow-xl">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#9CC6E0]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
                    NEET Diagnostic Simulation • Physics
                  </span>
                </div>
                <div className="glass-pill rounded-full px-3 py-1 font-mono text-[11px] font-bold text-[#20252B]">
                  +4 / -1 Marking
                </div>
              </div>

              {/* Question Stem */}
              <div className="pt-4">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#9CC6E0]">
                  {sampleQuestion.conceptName}
                </div>
                <div className="mt-2 text-sm sm:text-base leading-relaxed text-[#20252B]">
                  <MathText text={sampleQuestion.text} />
                </div>
              </div>

              {/* Interactive Options */}
              <div className="mt-5 space-y-2.5">
                {sampleQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.key;
                  const isCorrect = option.key === 'B';
                  let optionClass =
                    'border-white/80 bg-white/60 hover:bg-[#9CC6E0]/20 hover:border-[#9CC6E0] text-[#20252B]';

                  if (selectedOption) {
                    if (isSelected && isCorrect) {
                      optionClass =
                        'border-[#9CC6E0] bg-[#9CC6E0]/30 text-[#20252B] font-bold shadow-sm';
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'border-[#E4002B] bg-[#FDEDF0] text-[#20252B] font-bold';
                    } else if (isCorrect) {
                      optionClass = 'border-[#9CC6E0]/60 bg-[#9CC6E0]/20 text-[#20252B]';
                    }
                  }

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleOptionSelect(option.key)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-2xl border p-3.5 text-left text-xs sm:text-sm transition-all duration-150 backdrop-blur-md',
                        optionClass
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl border border-white/80 bg-white font-mono text-xs font-bold text-[#20252B] shadow-sm">
                          {option.key}
                        </span>
                        <span>
                          <MathText text={option.text} />
                        </span>
                      </div>
                      {selectedOption && isCorrect && (
                        <Check className="h-4 w-4 shrink-0 text-[#20252B]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Evaluation Feedback */}
              {showExplanation ? (
                <div className="mt-4 rounded-2xl border border-white/80 bg-white/80 p-4 text-xs backdrop-blur-md">
                  <div className="flex items-center justify-between font-bold">
                    <span
                      className={
                        selectedOption === 'B' ? 'text-[#20252B]' : 'text-[#E4002B]'
                      }
                    >
                      {selectedOption === 'B'
                        ? '✓ Correct Response (+4 Marks)'
                        : '✗ Incorrect Response (-1 Mark)'}
                    </span>
                    <button
                      type="button"
                      onClick={handleResetDemo}
                      className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#66727D] hover:text-[#20252B]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset Demo</span>
                    </button>
                  </div>
                  <div className="mt-2 text-[#66727D] leading-relaxed">
                    <MathText text={sampleQuestion.explanation?.text || ''} />
                  </div>
                </div>
              ) : (
                <div className="mt-4 text-center text-[11px] font-medium text-[#66727D]">
                  Tap an option above to test real-time server-grade scoring
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 03 — EXAMINATION DISCOVERY SECTION                                   */}
      {/* ==================================================================== */}
      <section id="examinations" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
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
            Let students immediately choose what they are preparing for.
          </p>
        </div>

        {/* 4 Categorical Cards with subtle differing surface treatments */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* 1. NEET */}
          <div
            id="neet"
            className="glass-polar group flex flex-col justify-between rounded-[36px] p-8 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
          >
            <div>
              <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                MEDICAL
              </span>
              <h3 className="mt-6 text-3xl font-black text-[#20252B] tracking-tight">
                NEET
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
                Medical entrance preparation
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE2E6]/60">
              <Link
                href="/neet"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
              >
                <span>Explore papers</span>
                <span className="font-mono text-xs transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>

          {/* 2. JEE */}
          <div
            id="jee-main"
            className="glass-polar group flex flex-col justify-between rounded-[36px] p-8 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
          >
            <div>
              <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                ENGINEERING
              </span>
              <h3 className="mt-6 text-3xl font-black text-[#20252B] tracking-tight">
                JEE
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
                Main & Advanced
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE2E6]/60">
              <Link
                href="/jee-main"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
              >
                <span>Explore papers</span>
                <span className="font-mono text-xs transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>

          {/* 3. UPSC */}
          <div
            id="upsc"
            className="glass-polar group flex flex-col justify-between rounded-[36px] p-8 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
          >
            <div>
              <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                CIVIL SERVICES
              </span>
              <h3 className="mt-6 text-3xl font-black text-[#20252B] tracking-tight">
                UPSC
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
                Civil services preparation
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE2E6]/60">
              <Link
                href="/upsc"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
              >
                <span>Explore papers</span>
                <span className="font-mono text-xs transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>

          {/* 4. Engineering */}
          <div
            id="engineering"
            className="glass-polar group flex flex-col justify-between rounded-[36px] p-8 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
          >
            <div>
              <span className="glass-pill px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                UNIVERSITY
              </span>
              <h3 className="mt-6 text-3xl font-black text-[#20252B] tracking-tight">
                Engineering
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
                Subjects & semester exams
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-[#DCE2E6]/60">
              <Link
                href="/engineering"
                className="inline-flex items-center gap-1 text-xs font-bold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
              >
                <span>Explore papers</span>
                <span className="font-mono text-xs transition-transform group-hover:translate-x-1">↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 04 — QUESTION PAPER DISCOVERY (PAPER LIBRARY)                         */}
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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
          >
            <span>Browse question papers</span>
            <span className="font-mono text-xs">↗</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          {/* Live Search Input */}
          <div className="relative w-full max-w-md">
            <Search className="absolute left-4 top-3.5 h-4 w-4 text-[#66727D]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search papers, subjects, or examinations..."
              className="glass-polar w-full rounded-full py-3 pl-11 pr-4 text-xs text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:outline-none transition-all"
            />
          </div>

          {/* Curriculum Filter Pills */}
          <div className="glass-polar flex items-center gap-1.5 rounded-full p-1.5 shadow-sm">
            {[
              { id: 'all', label: 'All' },
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
                    : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Year Filter Dropdown */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#66727D] font-medium">Year:</span>
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
        </div>

        {/* Real Question Papers Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => (
            <div
              key={paper.id}
              className="glass-polar group flex flex-col justify-between rounded-[36px] p-7 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
            >
              <div className="space-y-3">
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
                      {paper.durationMinutes}m
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">
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
                    <span className="rounded-full bg-[#9CC6E0]/25 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#20252B]">
                      ₹0 (Free Claim)
                    </span>
                  ) : (
                    <span className="rounded-full bg-[#F1F3F4] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#66727D]">
                      ₹10 Unlock
                    </span>
                  )}
                </div>

                <Link
                  href={`/papers/${paper.slug}`}
                  className="glass-racing-red inline-flex items-center gap-1.5 rounded-full px-5 py-2 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <span>Attempt Paper</span>
                  <span className="font-mono text-xs">↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 05 — HOW FORT WORKS (3-STEP LEARNING PROCESS)                         */}
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
              A simple 3-step learning process.
            </h2>
          </div>

          {/* Clean Horizontal Sequence */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#DCE2E6]/80">
            {/* Step 01 */}
            <div className="space-y-3 pt-6 md:pt-0 md:pr-8">
              <span className="font-mono text-3xl font-black text-[#9CC6E0]">01</span>
              <h3 className="text-lg font-bold text-[#20252B]">Choose your paper</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Explore examinations and select the question paper that matches your preparation.
              </p>
            </div>

            {/* Step 02 */}
            <div className="space-y-3 pt-6 md:pt-0 md:px-8">
              <span className="font-mono text-3xl font-black text-[#9CC6E0]">02</span>
              <h3 className="text-lg font-bold text-[#20252B]">Attempt it under pressure</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Practice in a structured environment with a timed examination experience.
              </p>
            </div>

            {/* Step 03 */}
            <div className="space-y-3 pt-6 md:pt-0 md:pl-8">
              <span className="font-mono text-3xl font-black text-[#9CC6E0]">03</span>
              <h3 className="text-lg font-bold text-[#20252B]">Learn from your performance</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Review your results, identify weaknesses, and improve your next attempt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 06 — WHY FORT? (4 COMPACT PHILOSOPHIES)                              */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-12">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              WHY FORT?
            </span>
          </div>
          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-4xl font-sans">
            Built around the way you prepare.
          </h2>
        </div>

        {/* 4 Compact Statements with subtle separators */}
        <div className="glass-polar rounded-[36px] p-8 sm:p-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 divide-y sm:divide-y-0 sm:divide-x divide-[#DCE2E6]/80">
          <div className="space-y-2 pt-4 sm:pt-0 sm:px-4 first:pl-0">
            <h3 className="text-base font-bold text-[#20252B]">Real question papers</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Access structured examination material relevant to your preparation.
            </p>
          </div>

          <div className="space-y-2 pt-4 sm:pt-0 sm:px-4">
            <h3 className="text-base font-bold text-[#20252B]">Timed practice</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Build exam readiness by attempting papers in a focused environment.
            </p>
          </div>

          <div className="space-y-2 pt-4 sm:pt-0 sm:px-4">
            <h3 className="text-base font-bold text-[#20252B]">Performance insights</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Understand your accuracy, attempts and areas for improvement.
            </p>
          </div>

          <div className="space-y-2 pt-4 sm:pt-0 sm:px-4 last:pr-0">
            <h3 className="text-base font-bold text-[#20252B]">Focused preparation</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Keep your preparation organized around the examination you are targeting.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 07 — PERFORMANCE PREVIEW                                             */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-10">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              PERFORMANCE PREVIEW
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
            { id: 'performance', label: 'YOUR PERFORMANCE', sub: 'Accuracy. Consistency. Progress.' },
            { id: 'subject', label: 'SUBJECT ANALYSIS', sub: 'Understand your strengths' },
            { id: 'history', label: 'ATTEMPT HISTORY', sub: 'See your improvement' },
            { id: 'time', label: 'TIME MANAGEMENT', sub: 'Analyze your approach' },
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

        {/* Illustrative Interface Preview Container */}
        <div className="glass-polar rounded-[38px] p-8 sm:p-12 max-w-4xl mx-auto space-y-8">
          <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-4">
            <div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#9CC6E0]">
                INTERFACE PREVIEW — ANALYTICAL ENGINE
              </span>
              <h3 className="text-lg font-bold text-[#20252B]">
                {activeAnalyticsTab === 'performance' && 'Diagnostic Accuracy & Score Dynamics'}
                {activeAnalyticsTab === 'subject' && 'Multi-Discipline Strengths & Concept Remediation'}
                {activeAnalyticsTab === 'history' && 'Audit Log of Verified Examination Attempts'}
                {activeAnalyticsTab === 'time' && 'Pacing & Time Distribution Profile'}
              </h3>
            </div>
            <span className="glass-pill px-3 py-1 font-mono text-[10px] font-bold text-[#66727D]">
              Calibrated Simulation
            </span>
          </div>

          {/* Dynamic Dimension Details */}
          {activeAnalyticsTab === 'performance' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 space-y-1">
                <span className="text-[11px] text-[#66727D] uppercase font-bold">Accuracy</span>
                <div className="font-mono text-3xl font-black text-[#20252B]">82.4%</div>
                <p className="text-[11px] text-[#66727D]">Calculated across verified attempted responses.</p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 space-y-1">
                <span className="text-[11px] text-[#66727D] uppercase font-bold">Mark Retention</span>
                <div className="font-mono text-3xl font-black text-[#20252B]">+4 / -1</div>
                <p className="text-[11px] text-[#66727D]">Controlled guessing minimizes negative penalties.</p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 space-y-1">
                <span className="text-[11px] text-[#66727D] uppercase font-bold">Vector OMR</span>
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
                  className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-4 flex items-center justify-between text-xs"
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
            <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 text-xs space-y-3">
              <div className="font-bold text-[#20252B]">Permanent Examination Records</div>
              <p className="text-[#66727D] leading-relaxed">
                Every attempted question paper generates a tamper-evident audit log with timestamps,
                score breakdowns, and exact OMR bubble matrices for perpetual academic review.
              </p>
            </div>
          )}

          {activeAnalyticsTab === 'time' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 space-y-2">
                <div className="font-bold text-[#20252B]">Average Pace: 68s / Question</div>
                <p className="text-[#66727D] leading-relaxed">
                  Time allocation calibrated across concept complexity without lingering on bottlenecks.
                </p>
              </div>
              <div className="rounded-2xl border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 p-5 space-y-2">
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
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>Build your personal diagnostic profile</span>
              <span className="font-mono text-xs">↗</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 08 — LEADERBOARD PREVIEW                                             */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end border-b border-[#DCE2E6]/80 pb-6">
          <div>
            <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
                ALL-INDIA STANDING
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
            className="inline-flex items-center gap-1.5 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
          >
            <span>View Full Leaderboard</span>
            <span className="font-mono text-xs">↗</span>
          </Link>
        </div>

        {/* Real Benchmark Leaderboard Table */}
        <div className="mt-8 glass-polar rounded-[36px] overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DCE2E6]/80 bg-[#F1F3F4]/80 text-[#66727D]">
                <tr>
                  <th className="p-4 font-semibold w-16 text-center">Rank</th>
                  <th className="p-4 font-semibold">Candidate</th>
                  <th className="p-4 font-semibold">Examination</th>
                  <th className="p-4 font-semibold">Verified Score</th>
                  <th className="p-4 font-semibold">Accuracy</th>
                  <th className="p-4 font-semibold text-right">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE2E6]/80 text-[#20252B]">
                {verifiedLeaderboard.map((item) => (
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
                      <div className="font-bold text-[#20252B]">{item.displayName}</div>
                      <div className="font-mono text-[10px] text-[#66727D]">{item.registrationId}</div>
                    </td>
                    <td className="p-4 text-[#66727D]">{item.exam}</td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">
                      {item.score} / {item.maxMarks}
                    </td>
                    <td className="p-4 font-mono text-[#20252B]">{item.accuracy}%</td>
                    <td className="p-4 font-mono text-right text-[#66727D]">{item.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 09 — FINAL CTA                                                       */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 mb-8">
        <div className="glass-polar rounded-[44px] p-8 text-center sm:p-14 lg:p-16 space-y-5">
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              YOUR NEXT ATTEMPT STARTS HERE
            </span>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-[#20252B] sm:text-5xl font-sans">
            Ready to see where you stand?
          </h2>

          <p className="text-xs sm:text-sm text-[#66727D] max-w-md mx-auto leading-relaxed">
            Choose a paper. Make an attempt. Take the next step.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/papers"
              className="glass-racing-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white shadow-xl shadow-[#E4002B]/30 transition-all hover:translate-y-[-1px]"
            >
              <span>Start your preparation</span>
              <span className="font-mono text-xs">↗</span>
            </Link>
            <Link
              href="#examinations"
              className="glass-polar inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
            >
              <span>Explore Examinations</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
