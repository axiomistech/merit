'use client';

import React, { useState, useEffect } from 'react';
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
  Gift,
  Zap,
} from 'lucide-react';
import {
  getInitialExams,
  getInitialTests,
  getStoredExams,
  getStoredTests,
  AdminExamRecord,
  AdminTestRecord,
} from '@/lib/admin/store';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const [exams, setExams] = useState<AdminExamRecord[]>(getInitialExams());
  const [tests, setTests] = useState<AdminTestRecord[]>(getInitialTests());
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');

  const sampleQuestion = SAMPLE_NEET_QUESTIONS[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    const storedExams = getStoredExams();
    const storedTests = getStoredTests();
    if (storedExams && storedExams.length > 0) {
      setExams(storedExams);
    }
    if (storedTests && storedTests.length > 0) {
      setTests(storedTests);
    }
  }, []);

  const handleOptionSelect = (key: string) => {
    setSelectedOption(key);
    setShowExplanation(true);
  };

  const handleResetDemo = () => {
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const verifiedPastPapers = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      exam: 'NEET (UG)',
      year: 2025,
      questions: 180,
      duration: 200,
      marks: 720,
    },
    {
      id: 'paper_neet_2024_pyq',
      name: 'NEET (UG) 2024 Official Question Paper',
      slug: 'neet-2024-official-pyq',
      exam: 'NEET (UG)',
      year: 2024,
      questions: 180,
      duration: 200,
      marks: 720,
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      exam: 'JEE Main',
      year: 2025,
      questions: 90,
      duration: 180,
      marks: 300,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B]">
      {/* ==================================================================== */}
      {/* AMBIENT LIQUID FLUID ORBS (BACKGROUND GLASSMORPHISM LIGHT REFRACTION) */}
      {/* Strictly 3 Colors: Polar White (#F1F3F4), Glacier Blue (#9CC6E0), Racing Red (#E4002B) */}
      {/* ==================================================================== */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-[-100px] right-[-80px] h-[650px] w-[650px]" />
        <div className="liquid-orb-red top-[350px] left-[-120px] h-[550px] w-[550px]" />
        <div className="liquid-orb-glacier top-[1100px] right-[10%] h-[700px] w-[700px]" />
        <div className="liquid-orb-red top-[1800px] left-[5%] h-[600px] w-[600px]" />
        <div className="liquid-orb-glacier top-[2600px] right-[-100px] h-[750px] w-[750px]" />
      </div>

      {/* ==================================================================== */}
      {/* SECTION 01 — LIQUID GLASS HERO SHOWCASE                               */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 lg:pt-10 lg:pb-24">
        {/* Seamless Liquid Frosted Glass Frame */}
        <div className="glass-polar relative overflow-hidden rounded-[38px] sm:rounded-[48px] p-6 sm:p-10 lg:p-16">
          {/* Subtle Internal Specular Light Reflection */}
          <div className="pointer-events-none absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#9CC6E0]/25 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#E4002B]/15 blur-3xl" />

          {/* Top Micro-Header: Brand ID + Tech Stamp */}
          <div className="relative flex items-center justify-between border-b border-white/60 pb-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
                <Shield className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-mono text-xl font-extrabold tracking-tight text-[#20252B]">FORT</span>
                <span className="ml-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                  Learning
                </span>
              </div>
            </div>

            <div className="glass-pill flex items-center gap-2 rounded-full px-3.5 py-1 font-mono text-[11px] font-bold uppercase tracking-[0.25em] text-[#66727D]">
              <span className="h-2 w-2 rounded-full bg-[#E4002B] animate-pulse" />
              <span>AIR · 01</span>
            </div>
          </div>

          {/* Dual-Tone Large Headline & Micro-Tracked Subtitle */}
          <div className="relative mt-10 text-center sm:mt-14">
            <h1 className="text-4xl font-black tracking-tight text-[#20252B] sm:text-6xl lg:text-7xl">
              Made to <span className="text-[#E4002B]">fly.</span>
            </h1>
            <p className="mt-3 font-sans text-sm font-semibold tracking-wide text-[#66727D] sm:text-base">
              4K camera. 34 minutes. 249 g.
            </p>
          </div>

          {/* Central Physical Presentation Canvas with Orbital Ring */}
          <div className="relative mt-10 flex flex-col items-center sm:mt-12">
            {/* Soft Ambient Elliptical Red Accent Ring */}
            <div className="pointer-events-none absolute top-1/2 left-1/2 h-[380px] w-full max-w-[680px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#E4002B]/30" />
            
            {/* Floating Racing Red Pill Badge */}
            <div className="relative z-10 mb-4 inline-flex items-center gap-2 rounded-full bg-[#E4002B] px-4 py-1.5 text-xs font-bold text-white shadow-xl shadow-[#E4002B]/30">
              <span className="h-2 w-2 rounded-full bg-white" />
              <span>Racing Red</span>
            </div>

            {/* Central Liquid Glass Examination Preview Terminal */}
            <div className="glass-panel relative z-10 w-full max-w-2xl rounded-[32px] p-6 sm:p-8 backdrop-blur-2xl">
              {/* Question Header */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#9CC6E0]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
                    NEET Diagnostic Preview • Physics
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
                      optionClass = 'border-[#9CC6E0] bg-[#9CC6E0]/30 text-[#20252B] font-bold shadow-sm';
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

              {/* Instant Evaluation Feedback */}
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

            {/* CTAs directly below the terminal */}
            <div className="relative z-10 mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/papers"
                className="glass-racing-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white shadow-xl shadow-[#E4002B]/30 transition-all hover:translate-y-[-1px]"
              >
                <span>Start Practicing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="glass-polar inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
              >
                <span>Claim Free First Paper</span>
                <Gift className="h-4 w-4 text-[#E4002B]" />
              </Link>
            </div>
          </div>

          {/* Bottom Metrics Row (3-Column Division with Thin Hairline Borders) */}
          <div className="relative mt-12 sm:mt-16 border-t border-white/60 pt-8">
            <div className="grid grid-cols-3 divide-x divide-[#DCE2E6]/80 text-center">
              <div className="px-2 sm:px-6">
                <div className="font-mono text-2xl font-black text-[#20252B] sm:text-4xl">
                  34<span className="text-xs sm:text-sm font-semibold text-[#66727D] ml-1">min</span>
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C9BA8]">
                  FLIGHT
                </div>
              </div>

              <div className="px-2 sm:px-6">
                <div className="font-mono text-2xl font-black text-[#20252B] sm:text-4xl">
                  249<span className="text-xs sm:text-sm font-semibold text-[#66727D] ml-1">g</span>
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C9BA8]">
                  WEIGHT
                </div>
              </div>

              <div className="px-2 sm:px-6">
                <div className="font-mono text-2xl font-black text-[#20252B] sm:text-4xl">
                  4K<span className="text-xs sm:text-sm font-semibold text-[#66727D] ml-1">60</span>
                </div>
                <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C9BA8]">
                  VIDEO
                </div>
              </div>
            </div>
          </div>

          {/* Micro-Footer Row: Edition Selector & Technical Watermark */}
          <div className="relative mt-8 flex items-center justify-between border-t border-white/40 pt-4 text-xs">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[#66727D]/30" />
              <span className="h-2 w-2 rounded-full bg-white border border-[#DCE2E6]" />
              <span className="flex h-3 w-3 items-center justify-center rounded-full border border-[#E4002B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
              </span>
              <span className="text-[11px] font-semibold text-[#66727D]">Polar edition</span>
            </div>

            <div className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-[#8C9BA8]">
              LOFTRA . AERO
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 02 — THE 3-COLOR SYSTEM ARCHITECTURE (DIRECT REFERENCE SHOWCASE) */}
      {/* Visual breakdown of Polar White (60%), Glacier Blue (30%), Racing Red (10%) */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Card 1: Polar White (60% Main) */}
          <div className="glass-polar rounded-[32px] p-8 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[#20252B]">Polar White</h3>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-[#20252B]">60%</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#66727D]">MAIN</span>
              </div>
            </div>
            <p className="text-xs text-[#66727D] leading-relaxed">
              Main foundation, neutral canvas, examination paper surfaces, and typography contrast.
            </p>
            <div className="pt-2 font-mono text-[11px] text-[#66727D] space-y-0.5">
              <div>HEX: #F1F3F4</div>
              <div>RGB: 241, 243, 244</div>
              <div>CMYK: 1, 0, 0, 4</div>
            </div>
          </div>

          {/* Card 2: Glacier Blue (30% Secondary) */}
          <div className="glass-glacier rounded-[32px] p-8 space-y-4 text-[#20252B]">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-[#20252B]">Glacier Blue</h3>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-[#20252B]">30%</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-[#20252B]/70">SECOND</span>
              </div>
            </div>
            <p className="text-xs text-[#20252B]/80 leading-relaxed">
              Secondary surfaces, selected states, physical OMR simulation, and analytical depth.
            </p>
            <div className="pt-2 font-mono text-[11px] text-[#20252B]/75 space-y-0.5">
              <div>HEX: #9CC6E0</div>
              <div>RGB: 156, 198, 224</div>
              <div>CMYK: 30, 12, 0, 12</div>
            </div>
          </div>

          {/* Card 3: Racing Red (10% Accent) */}
          <div className="glass-racing-red rounded-[32px] p-8 space-y-4 text-white">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-black text-white">Racing Red</h3>
              <div className="text-right">
                <span className="font-mono text-2xl font-black text-white">10%</span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-white/80">ACCENT</span>
              </div>
            </div>
            <p className="text-xs text-white/90 leading-relaxed">
              Primary CTAs, server-enforced countdown timers, active states, and critical actions.
            </p>
            <div className="pt-2 font-mono text-[11px] text-white/80 space-y-0.5">
              <div>HEX: #E4002B</div>
              <div>RGB: 228, 0, 43</div>
              <div>CMYK: 0, 100, 81, 11</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 03 — EXAMINATION DISCOVERY (LIQUID GLASS CARDS)              */}
      {/* ==================================================================== */}
      <section id="examinations" className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#66727D]">
              Curricula & Programs
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#20252B] sm:text-4xl">
              What are you preparing for?
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#66727D]">
              Choose your examination to access authentic question papers, timed CBT simulations, and physical OMR evaluations.
            </p>
          </div>
          <Link
            href="/papers"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
          >
            <span>Explore All Papers</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Database-Driven Liquid Glass Examination Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {exams.map((exam) => (
            <div
              key={exam.slug}
              className="glass-polar group flex flex-col justify-between rounded-[32px] p-6 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#9CC6E0]/30 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                    {exam.category.replace('_', ' ')}
                  </span>
                  <span className="font-mono text-xs font-semibold text-[#66727D]">
                    {exam.subjectsCount} Subjects
                  </span>
                </div>

                <h3 className="mt-4 text-lg font-bold text-[#20252B]">
                  {exam.name}
                </h3>

                <p className="mt-2 text-xs leading-relaxed text-[#66727D] line-clamp-3">
                  {exam.tagline || exam.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/60">
                <Link
                  href={`/papers?exam=${exam.slug}`}
                  className="flex items-center justify-between text-xs font-bold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
                >
                  <span>View Papers</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 04 — PAST PAPERS & MOCK TESTS                                */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#66727D]">
              Examination Papers
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#20252B] sm:text-4xl">
              Authentic question papers.
            </h2>
            <p className="mt-2 max-w-2xl text-sm sm:text-base text-[#66727D]">
              Practice with real previous year papers and mock tests under full CBT conditions. Your first paper is completely free.
            </p>
          </div>
          <Link
            href="/papers"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
          >
            <span>View All Papers</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Liquid Glass Papers Cards */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {verifiedPastPapers.map((paper) => (
            <div
              key={paper.id}
              className="glass-polar group flex flex-col justify-between rounded-[32px] p-7 transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01]"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#9CC6E0]/30 px-3 py-1 text-[10px] font-bold text-[#20252B]">
                    {paper.exam}
                  </span>
                  <span className="font-mono text-xs font-bold text-[#66727D]">
                    Year {paper.year}
                  </span>
                </div>

                <h3 className="text-base font-bold text-[#20252B]">
                  {paper.name}
                </h3>

                <div className="flex items-center gap-3 text-xs text-[#66727D]">
                  <span>{paper.questions} Qs</span>
                  <span>•</span>
                  <span>{paper.duration} Mins</span>
                  <span>•</span>
                  <span>{paper.marks} Marks</span>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/60 flex items-center justify-between">
                <span className="text-xs font-bold text-[#E4002B]">
                  First Paper Free
                </span>
                <Link
                  href={`/papers/${paper.slug}`}
                  className="inline-flex items-center gap-1 rounded-full bg-[#20252B] px-5 py-2 text-xs font-bold text-white transition-all hover:bg-[#343D46]"
                >
                  <span>View Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 05 — HOW FORT WORKS (WORKFLOW)                               */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-[#66727D]">
            Workflow
          </div>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#20252B] sm:text-4xl">
            A simple way to prepare.
          </h2>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Step 01 */}
          <div className="glass-polar rounded-[32px] p-8 space-y-4">
            <span className="font-mono text-3xl font-black text-[#9CC6E0]">01</span>
            <h3 className="text-lg font-bold text-[#20252B]">Choose your examination</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Find the examination you're preparing for. The platform configures the verified syllabus, section rules, and scoring engine.
            </p>
          </div>

          {/* Step 02 */}
          <div className="glass-polar rounded-[32px] p-8 space-y-4">
            <span className="font-mono text-3xl font-black text-[#9CC6E0]">02</span>
            <h3 className="text-lg font-bold text-[#20252B]">Unlock your paper</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Your first question paper is complimentary. Subsequent papers cost ₹10 each with permanent re-attempt and review access.
            </p>
          </div>

          {/* Step 03 */}
          <div className="glass-polar rounded-[32px] p-8 space-y-4">
            <span className="font-mono text-3xl font-black text-[#9CC6E0]">03</span>
            <h3 className="text-lg font-bold text-[#20252B]">Review your insights</h3>
            <p className="text-xs leading-relaxed text-[#66727D]">
              Receive immediate authoritatively evaluated results, printable A4 OMR sheet, and evidence-based diagnostic recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 06 — FINAL CTA                                               */}
      {/* ==================================================================== */}
      <section className="relative z-10 mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="glass-polar rounded-[44px] p-8 text-center sm:p-14 lg:p-16">
          <div className="mx-auto max-w-2xl space-y-4">
            <h2 className="text-3xl font-extrabold tracking-tight text-[#20252B] sm:text-5xl">
              Ready to begin?
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-[#66727D]">
              Start with a question. Unlock your free examination paper. Elevate your preparation today.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/papers"
                className="glass-racing-red inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-white shadow-xl shadow-[#E4002B]/30 transition-all hover:translate-y-[-1px]"
              >
                <span>Start Practicing</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/signup"
                className="glass-pill inline-flex h-12 items-center justify-center gap-2 rounded-full px-8 text-sm font-bold text-[#20252B] transition-all hover:bg-white"
              >
                <span>Create Account</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
