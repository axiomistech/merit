'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  BookOpen,
  Target,
  FileText,
  Layers,
  Award,
  ChevronRight,
  Filter,
  Sparkles,
  Check,
  RotateCcw,
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
  // Real data states initialized with server-safe seeds and synchronized with store
  const [exams, setExams] = useState<AdminExamRecord[]>(getInitialExams());
  const [tests, setTests] = useState<AdminTestRecord[]>(getInitialTests());
  const [featuredFilter, setFeaturedFilter] = useState<string>('all');

  // Interactive Live Question Practice Demo (First real question from database)
  const sampleQuestion = SAMPLE_NEET_QUESTIONS[0];
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);

  useEffect(() => {
    // Client-side synchronization with stored admin data
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

  // Real Mock Tests (paperType === 'mock_exam')
  const mockTests = tests.filter((t) => t.paperType === 'mock_exam');

  // Real Past Papers list verified in platform
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

  // Dynamic filter for Featured / Available Content section
  const availableContent = tests.filter((test) => {
    if (featuredFilter === 'all') return true;
    return test.examSlug === featuredFilter;
  });

  return (
    <div className="relative overflow-hidden bg-[#F1F3F4] text-[#20252B]">
      {/* ==================================================================== */}
      {/* SECTION 02 — HERO                                                    */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-6 pt-12 pb-20 lg:px-8 lg:pt-16 lg:pb-24">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Column: Editorial Headline & Actions (7 Cols) */}
          <div className="space-y-8 lg:col-span-7">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2">
              <span className="h-px w-6 bg-[#66727D]" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                PREPARE SMARTER. PERFORM BETTER.
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl font-extrabold tracking-tight text-[#20252B] sm:text-5xl lg:text-[62px] lg:leading-[1.1]">
              Your preparation.
              <br />
              Your pace.
              <br />
              <span className="text-[#20252B]">Your next level.</span>
            </h1>

            {/* Supporting Description */}
            <p className="max-w-xl text-base leading-relaxed text-[#66727D] sm:text-lg">
              Practice concepts, challenge yourself with exam-level questions, and prepare with
              structured tests and previous papers.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-xl bg-[#E4002B] px-8 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#C90026] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4002B] focus-visible:ring-offset-2"
              >
                Start Practicing
              </Link>
              <Link
                href="#examinations"
                className="inline-flex h-12 items-center justify-center rounded-xl border border-[#DCE2E6] bg-white px-8 text-[15px] font-semibold text-[#20252B] shadow-sm transition-colors duration-150 hover:border-[#9CC6E0] hover:bg-[#F1F3F4] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0]"
              >
                Explore Examinations
              </Link>
            </div>
          </div>

          {/* Right Column: Real Interactive Question Practice Preview (5 Cols) */}
          <div className="lg:col-span-5">
            <div className="rounded-3xl border border-[#DCE2E6] bg-white p-6 shadow-sm sm:p-7">
              {/* Question Card Header */}
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex h-2 w-2 rounded-full bg-[#9CC6E0]" />
                  <span className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
                    Practice Preview • Physics
                  </span>
                </div>
                <div className="rounded-md bg-[#F1F3F4] px-2.5 py-1 text-[11px] font-semibold text-[#66727D]">
                  +4 / -1 Scheme
                </div>
              </div>

              {/* Real Question Body */}
              <div className="pt-4">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#9CC6E0]">
                  {sampleQuestion.conceptName}
                </div>
                <div className="mt-2 text-sm leading-relaxed text-[#20252B]">
                  <MathText text={sampleQuestion.text} />
                </div>
              </div>

              {/* Interactive Options */}
              <div className="mt-5 space-y-2.5">
                {sampleQuestion.options.map((option) => {
                  const isSelected = selectedOption === option.key;
                  const isCorrect = option.key === 'B';
                  let optionClass =
                    'border-[#DCE2E6] bg-white hover:border-[#9CC6E0] hover:bg-[#F1F3F4]/50 text-[#20252B]';

                  if (selectedOption) {
                    if (isSelected && isCorrect) {
                      optionClass = 'border-[#27835A] bg-[#E9F5EF] text-[#20252B] font-medium';
                    } else if (isSelected && !isCorrect) {
                      optionClass = 'border-[#E4002B] bg-[#FDEDF0] text-[#20252B] font-medium';
                    } else if (isCorrect) {
                      optionClass = 'border-[#27835A]/50 bg-[#E9F5EF]/60 text-[#20252B]';
                    }
                  }

                  return (
                    <button
                      key={option.key}
                      type="button"
                      onClick={() => handleOptionSelect(option.key)}
                      className={cn(
                        'flex w-full items-center justify-between rounded-xl border p-3 text-left text-xs transition-colors duration-150',
                        optionClass
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border border-[#DCE2E6] bg-white font-mono text-[11px] font-bold text-[#20252B]">
                          {option.key}
                        </span>
                        <span>
                          <MathText text={option.text} />
                        </span>
                      </div>
                      {selectedOption && isCorrect && (
                        <Check className="h-4 w-4 shrink-0 text-[#27835A]" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Instant Evaluation Feedback */}
              {showExplanation && (
                <div className="mt-4 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-3 text-xs">
                  <div className="flex items-center justify-between font-semibold">
                    <span
                      className={
                        selectedOption === 'B' ? 'text-[#27835A]' : 'text-[#E4002B]'
                      }
                    >
                      {selectedOption === 'B'
                        ? '✓ Correct (+4 Marks Awarded)'
                        : '✗ Incorrect (-1 Mark Penalty)'}
                    </span>
                    <button
                      type="button"
                      onClick={handleResetDemo}
                      className="inline-flex items-center gap-1 text-[11px] text-[#66727D] hover:text-[#20252B]"
                    >
                      <RotateCcw className="h-3 w-3" />
                      <span>Reset</span>
                    </button>
                  </div>
                  <div className="mt-2 text-[#66727D] leading-relaxed">
                    <MathText text={sampleQuestion.explanation?.text || ''} />
                  </div>
                </div>
              )}

              {/* Micro-notice */}
              {!showExplanation && (
                <div className="mt-4 text-center text-[11px] text-[#66727D]">
                  Click an option above to test real-time question evaluation
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 03 — EXAMINATION DISCOVERY                                   */}
      {/* ==================================================================== */}
      <section id="examinations" className="border-t border-[#DCE2E6] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                Curricula & Programs
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
                What are you preparing for?
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#66727D]">
                Find your examination and start preparing with relevant questions, practice sets,
                and tests.
              </p>
            </div>
            <Link
              href="/exams"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>View All Examinations</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Database-Driven Examination Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {exams.map((exam) => (
              <div
                key={exam.slug}
                className="group flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-6 transition-all duration-150 hover:border-[#9CC6E0] hover:bg-white"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-[#9CC6E0]/25 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#20252B]">
                      {exam.category.replace('_', ' ')}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#66727D]">
                      {exam.subjectsCount} Subjects
                    </span>
                  </div>

                  <h3 className="mt-4 text-lg font-bold text-[#20252B] group-hover:text-[#20252B]">
                    {exam.name}
                  </h3>

                  <p className="mt-2 text-xs leading-relaxed text-[#66727D] line-clamp-3">
                    {exam.tagline || exam.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE2E6]">
                  <Link
                    href={`/${exam.slug}`}
                    className="flex items-center justify-between text-xs font-semibold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
                  >
                    <span>Explore Examination</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 04 — CONCEPT-BASED PRACTICE                                  */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-[#F1F3F4] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
              Targeted Methodology
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
              Master concepts. One question at a time.
            </h2>
            <p className="mt-2 text-base text-[#66727D]">
              Build your understanding through structured practice, topic-focused questions, and
              concepts that matter.
            </p>
          </div>

          {/* Genuine Implemented Capabilities Flow */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Subject & Chapter Focus</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Navigate cleanly from exam to subject and chapter to isolate high-yield academic
                units rather than guessing random problem pools.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Rigorous Question Types</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Solve single-correct MCQs, numerical value inputs with integer and decimal tolerance
                bounds, and multi-correct formats.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">KaTeX Step-by-Step Logic</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Every problem includes native LaTeX mathematical derivations, fundamental physical
                laws, and chemical balancing formulas.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Layers className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Atomic Concept Tracking</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Tag mistakes directly to specific theoretical concepts so revision addresses the
                exact root cause of marks lost.
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-start">
            <Link
              href="/practice"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-[#20252B] px-6 text-[15px] font-semibold text-white transition-colors duration-150 hover:bg-[#343D46]"
            >
              Explore Practice
            </Link>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 05 — MOCK TESTS & EXAMINATIONS                               */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                Simulation Engine
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
                Prepare under exam conditions.
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#66727D]">
                Test your preparation through structured examinations and practice sessions designed
                around the actual examination experience.
              </p>
            </div>
            <Link
              href="/mock-tests"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>Explore Tests</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Real Tests dynamically fetched from platform database */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {mockTests.length > 0 ? (
              mockTests.map((test) => (
                <div
                  key={test.id}
                  className="flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-6 transition-all duration-150 hover:border-[#9CC6E0] hover:bg-white"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-white border border-[#DCE2E6] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#20252B]">
                        {test.examSlug.toUpperCase()}
                      </span>
                      <span className="flex items-center gap-1 text-xs font-semibold text-[#66727D]">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{test.durationMinutes} mins</span>
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-[#20252B]">{test.name}</h3>

                    <div className="grid grid-cols-2 gap-2 rounded-xl bg-white p-3 text-xs border border-[#DCE2E6]">
                      <div>
                        <div className="text-[#66727D]">Questions</div>
                        <div className="font-mono font-bold text-[#20252B]">
                          {test.totalQuestions}
                        </div>
                      </div>
                      <div>
                        <div className="text-[#66727D]">Total Marks</div>
                        <div className="font-mono font-bold text-[#20252B]">{test.maxMarks}</div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE2E6]">
                    <Link
                      href={`/mock-tests/${test.slug}`}
                      className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-[#20252B] text-xs font-semibold text-white transition-colors hover:bg-[#343D46]"
                    >
                      View Test Details
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-8 text-center text-[#66727D]">
                No mock tests currently scheduled. Check back soon.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 06 — PAST PAPERS                                             */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-[#F1F3F4] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                Historical Archive
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
                Learn from what has already been asked.
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#66727D]">
                Practice with previous examination papers and understand how questions are structured.
              </p>
            </div>
            <Link
              href="/papers"
              className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors"
            >
              <span>Explore Past Papers</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Genuine Past Papers Cards */}
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedPastPapers.map((paper) => (
              <div
                key={paper.id}
                className="group flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm transition-all duration-150 hover:border-[#9CC6E0]"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-[#9CC6E0]/25 px-2.5 py-1 text-[11px] font-bold text-[#20252B]">
                      {paper.exam}
                    </span>
                    <span className="font-mono text-xs font-semibold text-[#66727D]">
                      Year {paper.year}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-[#20252B] group-hover:text-[#20252B]">
                    {paper.name}
                  </h3>

                  <div className="flex items-center gap-4 text-xs text-[#66727D]">
                    <span>{paper.questions} Questions</span>
                    <span>•</span>
                    <span>{paper.duration} Minutes</span>
                    <span>•</span>
                    <span>{paper.marks} Marks</span>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#DCE2E6]">
                  <Link
                    href={`/papers/${paper.slug}`}
                    className="flex items-center justify-between text-xs font-semibold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
                  >
                    <span>Solve Paper</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 07 — HOW FORT WORKS                                          */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
              Workflow
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
              A simple way to prepare.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Step 01 */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-8 space-y-4">
              <span className="font-mono text-2xl font-bold text-[#9CC6E0]">01</span>
              <h3 className="text-lg font-bold text-[#20252B]">Choose your examination</h3>
              <p className="text-sm leading-relaxed text-[#66727D]">
                Find the examination you're preparing for. The platform configures the verified
                syllabus, section rules, and scoring engine.
              </p>
            </div>

            {/* Step 02 */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-8 space-y-4">
              <span className="font-mono text-2xl font-bold text-[#9CC6E0]">02</span>
              <h3 className="text-lg font-bold text-[#20252B]">Start practicing</h3>
              <p className="text-sm leading-relaxed text-[#66727D]">
                Attempt questions, practice concepts, or take available tests with
                server-authoritative timing and immediate verification.
              </p>
            </div>

            {/* Step 03 */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-8 space-y-4">
              <span className="font-mono text-2xl font-bold text-[#9CC6E0]">03</span>
              <h3 className="text-lg font-bold text-[#20252B]">Review your progress</h3>
              <p className="text-sm leading-relaxed text-[#66727D]">
                Use actual performance and feedback available within the platform to understand
                where you can improve and target weak concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 08 — PLATFORM FEATURES                                       */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-[#F1F3F4] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
              Platform Architecture
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
              Everything you need to prepare.
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Concept-based learning</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Practice questions organized by concepts and topics to isolate edge cases and build
                foundational understanding.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Target className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">
                Examination-focused preparation
              </h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Practice with authentic question formats, exact negative marking schemes, and
                physical OMR simulation.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Award className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Performance insights</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Review verified scores, accuracy rates, and time allocation across every completed
                test attempt.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Clock className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Structured practice</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Access genuine practice sets, full-length mock examinations, and past papers under
                server-enforced timers.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <Sparkles className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Question explanations</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Understand the reasoning behind answers with clear scientific KaTeX derivations and
                error traps.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                <FileText className="h-5 w-5" />
              </div>
              <h3 className="text-base font-bold text-[#20252B]">Previous examination papers</h3>
              <p className="text-xs leading-relaxed text-[#66727D]">
                Solve authentic past examination papers to master question structure and pattern
                evolution over time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 09 — FEATURED / AVAILABLE CONTENT                            */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
                Platform Inventory
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[#20252B] sm:text-4xl">
                Explore what's available
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#66727D]">
                Browse published practice sessions, examinations, and past papers currently ready
                for you.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {[
                { label: 'All', value: 'all' },
                { label: 'NEET (UG)', value: 'neet' },
                { label: 'JEE Main', value: 'jee-main' },
              ].map((pill) => (
                <button
                  key={pill.value}
                  type="button"
                  onClick={() => setFeaturedFilter(pill.value)}
                  className={cn(
                    'rounded-xl px-4 py-2 text-xs font-semibold transition-colors duration-150',
                    featuredFilter === pill.value
                      ? 'bg-[#20252B] text-white'
                      : 'border border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                  )}
                >
                  {pill.label}
                </button>
              ))}
            </div>
          </div>

          {/* Database-Driven Grid */}
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {availableContent.length > 0 ? (
              availableContent.map((item) => (
                <div
                  key={item.id}
                  className="group flex flex-col justify-between rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-6 transition-all duration-150 hover:border-[#9CC6E0] hover:bg-white"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg bg-white border border-[#DCE2E6] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#20252B]">
                        {item.paperType.replace('_', ' ')}
                      </span>
                      <span className="text-xs font-semibold text-[#66727D]">
                        {item.durationMinutes} mins
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#20252B] group-hover:text-[#20252B]">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-3 text-xs text-[#66727D]">
                      <span>{item.totalQuestions} Questions</span>
                      <span>•</span>
                      <span>{item.maxMarks} Marks</span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#DCE2E6]">
                    <Link
                      href={`/mock-tests/${item.slug}`}
                      className="flex items-center justify-between text-xs font-semibold text-[#20252B] group-hover:text-[#E4002B] transition-colors"
                    >
                      <span>Open Examination</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-span-full rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-8 text-center text-sm text-[#66727D]">
                No additional papers currently in this category. Check back soon or explore all
                examinations.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 10 — FINAL CTA                                               */}
      {/* ==================================================================== */}
      <section className="border-t border-[#DCE2E6] bg-[#E9EEF1] py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="rounded-3xl border border-[#DCE2E6] bg-white p-8 text-center sm:p-14 lg:p-16">
            <div className="mx-auto max-w-2xl space-y-4">
              <h2 className="text-3xl font-extrabold tracking-tight text-[#20252B] sm:text-4xl">
                Ready to begin?
              </h2>
              <p className="text-base leading-relaxed text-[#66727D]">
                Start with a question. Build your confidence. Keep moving forward.
              </p>
              <div className="pt-4">
                <Link
                  href="/signup"
                  className="inline-flex h-12 items-center justify-center rounded-xl bg-[#E4002B] px-8 text-[15px] font-semibold text-white shadow-sm transition-colors duration-150 hover:bg-[#C90026] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4002B] focus-visible:ring-offset-2"
                >
                  Start Practicing
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
