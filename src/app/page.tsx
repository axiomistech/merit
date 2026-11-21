'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Sparkles,
  Award,
  ChevronRight,
  BarChart3,
  BookOpen,
  Target,
  FileText,
  Activity,
  Flame,
  HelpCircle,
} from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';
import { cn } from '@/lib/utils';

export default function HomePage() {
  // Interactive Live OMR Demo state for Section 7
  const [demoOmrAnswers, setDemoOmrAnswers] = useState<Record<number, string>>({
    1: 'B',
    2: 'A',
    3: 'B',
  });

  const handleDemoOmrClick = (qNum: number, opt: string) => {
    setDemoOmrAnswers((prev) => {
      if (prev[qNum] === opt) {
        // Toggle/clear
        const next = { ...prev };
        delete next[qNum];
        return next;
      }
      return { ...prev, [qNum]: opt };
    });
  };

  return (
    <div className="relative overflow-hidden bg-[#0B1020] text-[#F5F7FB]">
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6486C6]/15 via-transparent to-transparent blur-3xl" />

      {/* ==================================================================== */}
      {/* SECTION 1: HERO (Cinematic & Data-Driven) */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#263554] bg-[#11182A]/80 px-3.5 py-1.5 text-xs font-semibold text-[#6486C6] backdrop-blur-sm shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-[#10B981] animate-pulse" />
            <span>Academic Examination Infrastructure</span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Preparation should leave <span className="text-[#6486C6]">proof.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#A7B0C0] sm:text-xl">
            Knowledge. Built Strong.
          </p>

          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-[#7C8799] sm:text-base">
            FORT is institutional examination practice infrastructure. Moving serious aspirants
            through{' '}
            <strong className="text-[#F5F7FB]">
              Learning → Understanding → Practice → Simulation → Analysis → Improvement
            </strong>
            . No fabricated results, no vanity metrics.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3.5 text-sm font-bold text-[#0B1020] shadow-lg shadow-[#6486C6]/25 hover:bg-[#7b9bd7] transition-all"
            >
              <span>Start Practising</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/neet"
              className="flex items-center gap-2 rounded-xl border border-[#263554] bg-[#11182A] px-6 py-3.5 text-sm font-semibold text-[#F5F7FB] hover:border-[#6486C6] hover:bg-[#172033] transition-all"
            >
              <span>Explore Examinations</span>
              <ChevronRight className="h-4 w-4 text-[#A7B0C0]" />
            </Link>
          </div>
        </div>

        {/* Live Examination UI Showcase Component (Real interactive UI, not a screenshot!) */}
        <div className="mt-16 rounded-2xl border border-[#263554] bg-[#11182A] p-4 shadow-2xl sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6486C6]/20 text-[#6486C6] font-mono font-bold text-xs">
                NEET
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#F5F7FB]">
                  All India Full Mock Test • Physics Section
                </h3>
                <p className="text-xs text-[#A7B0C0]">Question 1 of 20 • Single Correct (+4 / -1)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 rounded-lg border border-[#263554] bg-[#0B1020] px-3 py-1.5 text-amber-400">
                <Clock className="h-4 w-4" />
                <span className="tabular-nums font-bold">02:54:18</span>
              </div>
              <div className="rounded-lg bg-[#10B981]/20 px-2.5 py-1.5 font-semibold text-[#10B981]">
                Autosaved
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Question Panel */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-xl border border-[#263554]/80 bg-[#172033] p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
                  Concept: Electrostatics & Gauss Law
                </div>
                <div className="mt-3 text-sm text-[#F5F7FB]">
                  <MathText content="A point charge $q$ is placed at the center of a hollow cubical conductor of edge length $L$. What is the total electric flux passing through any one face of the cube?" />
                </div>

                <div className="mt-5 space-y-2.5">
                  {[
                    { key: 'A', text: '$\\frac{q}{\\varepsilon_0}$' },
                    { key: 'B', text: '$\\frac{q}{6\\varepsilon_0}$' },
                    { key: 'C', text: '$\\frac{q}{24\\varepsilon_0}$' },
                    { key: 'D', text: 'Zero' },
                  ].map((opt) => (
                    <div
                      key={opt.key}
                      onClick={() => handleDemoOmrClick(1, opt.key)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg border p-3 text-xs transition-colors cursor-pointer',
                        demoOmrAnswers[1] === opt.key
                          ? 'border-[#6486C6] bg-[#1D2940] text-[#F5F7FB]'
                          : 'border-[#263554] bg-[#0B1020] text-[#A7B0C0] hover:border-[#6486C6]/60'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono font-bold text-xs',
                          demoOmrAnswers[1] === opt.key
                            ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                            : 'border-[#263554] text-[#A7B0C0]'
                        )}
                      >
                        {opt.key}
                      </span>
                      <MathText content={opt.text} />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex gap-2">
                  <button className="rounded-lg border border-[#263554] bg-[#172033] px-3 py-1.5 text-[#A7B0C0] hover:text-[#F5F7FB]">
                    Mark for Review
                  </button>
                  <button
                    onClick={() => handleDemoOmrClick(1, '')}
                    className="rounded-lg border border-[#263554] bg-[#172033] px-3 py-1.5 text-[#A7B0C0] hover:text-[#EF4444]"
                  >
                    Clear Response
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-lg bg-[#6486C6] px-4 py-1.5 font-bold text-[#0B1020]">
                    Save & Next
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive OMR Mini-Sheet */}
            <div className="rounded-xl border border-[#263554]/80 bg-[#172033] p-4">
              <div className="flex items-center justify-between border-b border-[#263554] pb-2 text-xs font-bold text-[#F5F7FB]">
                <span>LIVE OMR GRID</span>
                <span className="font-mono text-[#6486C6]">FORT-26-000001</span>
              </div>

              <p className="mt-2 text-[11px] text-[#7C8799]">
                Click options or bubbles to synchronize response:
              </p>

              <div className="mt-3 space-y-2">
                {[1, 2, 3, 4, 5].map((qNum) => (
                  <div
                    key={qNum}
                    className={cn(
                      'flex items-center justify-between rounded-lg border px-3 py-1.5',
                      qNum === 1 ? 'border-[#6486C6] bg-[#1D2940]' : 'border-[#263554] bg-[#0B1020]'
                    )}
                  >
                    <span className="font-mono text-xs font-bold text-[#A7B0C0]">
                      {qNum.toString().padStart(2, '0')}.
                    </span>
                    <div className="flex items-center gap-1.5">
                      {['A', 'B', 'C', 'D'].map((opt) => {
                        const isFilled = demoOmrAnswers[qNum] === opt;
                        return (
                          <button
                            key={opt}
                            onClick={() => handleDemoOmrClick(qNum, opt)}
                            className={cn(
                              'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-all',
                              isFilled
                                ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                                : 'border-[#263554] text-[#7C8799] hover:border-[#6486C6]'
                            )}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 rounded-lg bg-[#0B1020] p-2 text-center text-[11px] text-[#A7B0C0]">
                {Object.keys(demoOmrAnswers).length} of 5 questions answered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ==================================================================== */}
      <section className="border-y border-[#263554] bg-[#11182A]/50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              The Core Problem in Entrance Preparation
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-[#F5F7FB] sm:text-4xl">
              Students solve thousands of questions without knowing where marks are actually lost.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Blind Practice',
                desc: 'Solving question banks without atomic concept tagging leads to repeated errors in the exact same theoretical edge cases.',
              },
              {
                title: 'Time Mismanagement',
                desc: 'Spending 4 minutes on a single tricky question leaves easy scoring questions unattempted at the end of the paper.',
              },
              {
                title: 'OMR Shading Fatigue',
                desc: 'Practicing only with computer clicks leaves students vulnerable to misaligned bubbles and bubbling panic on real physical OMR sheets.',
              },
              {
                title: 'Negative Marking Hemorrhage',
                desc: 'Uncontrolled guesswork turns a 600+ NEET score into a 480 due to -1 penalties across 30 unwarranted guesses.',
              },
              {
                title: 'Vanity Metrics',
                desc: 'Measuring preparation by "hours studied" instead of accuracy rate, concept mastery, and error recency.',
              },
              {
                title: 'Lack of Revision Queue',
                desc: 'Mistakes made in mock test 1 are forgotten rather than queued into an automated remedial practice workflow.',
              },
            ].map((prob, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-[#263554] bg-[#172033]/60 p-6 backdrop-blur-sm"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EF4444]/15 text-[#EF4444]">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#F5F7FB]">{prob.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0C0]">{prob.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: THE FORT APPROACH */}
      {/* ==================================================================== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              Methodology
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5F7FB] sm:text-4xl">
              The FORT Learning Cycle
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-5">
            {[
              { step: '01', name: 'Select', desc: 'Target exam, subject & specific atomic concept' },
              { step: '02', name: 'Practice', desc: 'Concept-level untimed & timed practice sets' },
              { step: '03', name: 'Simulate', desc: 'Full CBT & physical-grade OMR mock tests' },
              { step: '04', name: 'Analyze', desc: 'Speed vs accuracy, concept mastery scores' },
              { step: '05', name: 'Improve', desc: 'Data-driven remediation queue for weak areas' },
            ].map((s) => (
              <div
                key={s.step}
                className="relative rounded-xl border border-[#263554] bg-[#11182A] p-5 text-center"
              >
                <div className="font-mono text-2xl font-black text-[#6486C6]">{s.step}</div>
                <h3 className="mt-2 text-base font-bold text-[#F5F7FB]">{s.name}</h3>
                <p className="mt-1 text-xs text-[#A7B0C0]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: EXAMINATIONS SHOWCASE */}
      {/* ==================================================================== */}
      <section className="border-t border-[#263554] bg-[#11182A]/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
                Target Programs
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5F7FB] sm:text-4xl">
                Built for India's Most Rigorous Examinations
              </p>
            </div>
            <Link
              href="/neet"
              className="text-sm font-semibold text-[#6486C6] hover:underline flex items-center gap-1"
            >
              <span>View all curricula</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EXAMINATIONS.map((exam) => (
              <div
                key={exam.slug}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#263554] bg-[#172033] p-6 transition-all hover:border-[#6486C6] hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span
                      className="rounded-lg px-2.5 py-1 text-xs font-bold"
                      style={{ backgroundColor: `${exam.accentColor}20`, color: exam.accentColor }}
                    >
                      {exam.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-[#7C8799]">
                      {exam.subjects.length} Subjects
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#F5F7FB] group-hover:text-[#6486C6] transition-colors">
                    {exam.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#A7B0C0]">{exam.description}</p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {exam.subjects.map((sub) => (
                      <span
                        key={sub.slug}
                        className="rounded-md border border-[#263554] bg-[#11182A] px-2 py-0.5 text-[11px] text-[#A7B0C0]"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#263554] pt-4">
                  <Link
                    href={`/${exam.slug}`}
                    className="flex items-center justify-between text-xs font-semibold text-[#F5F7FB] group-hover:text-[#6486C6]"
                  >
                    <span>Enter {exam.shortName} Portal</span>
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 7: LIVE OMR SYSTEM SHOWCASE */}
      {/* ==================================================================== */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#263554] bg-[#11182A] px-3 py-1 text-xs font-semibold text-[#10B981]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>FORT Signature Capability</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#F5F7FB] sm:text-4xl">
                The Live Physical-Grade OMR Engine
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#A7B0C0]">
                NEET is an offline pen-and-paper examination. Practicing only with click buttons
                leaves students vulnerable to shading errors and panic on exam day.
              </p>

              <ul className="mt-6 space-y-3 text-xs text-[#A7B0C0]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong>Instant Bidirectional Synchronization:</strong> Selecting an answer fills
                    the bubble; changing the option clears the old bubble and fills the new one.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong>Canonical Single Source of Truth:</strong> OMR is never a separate
                    database. It is directly projected from the immutable attempt state.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#10B981] shrink-0 mt-0.5" />
                  <span>
                    <strong>Print-Ready A4 PDF Generation:</strong> Download and print high-resolution
                    OMR response sheets complete with student registration IDs and hashes.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/neet/omr-practice"
                  className="rounded-lg bg-[#6486C6] px-5 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
                >
                  Try Full OMR Simulator
                </Link>
              </div>
            </div>

            {/* OMR Visual Representation */}
            <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#263554] pb-3">
                <div className="font-mono text-xs font-bold text-[#F5F7FB]">FORT-NEET-OMR-2026</div>
                <div className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-[11px] font-semibold text-[#6486C6]">
                  A4 Printable
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between rounded-lg border border-[#263554] bg-[#172033] px-3 py-2"
                  >
                    <span className="font-mono text-xs font-bold text-[#A7B0C0]">
                      {q.toString().padStart(2, '0')}.
                    </span>
                    <div className="flex gap-1.5">
                      {['A', 'B', 'C', 'D'].map((o) => (
                        <div
                          key={o}
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold',
                            q === 1 && o === 'B'
                              ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                              : q === 3 && o === 'A'
                              ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                              : 'border-[#263554] text-[#7C8799]'
                          )}
                        >
                          {o}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 11: TRANSPARENT PRICING */}
      {/* ==================================================================== */}
      <section className="border-t border-[#263554] bg-[#11182A]/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              Simple & Honest Pricing
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5F7FB] sm:text-4xl">
              Pay as you prepare. Zero hidden subscriptions.
            </p>
            <p className="mt-3 text-sm text-[#A7B0C0]">
              Every new candidate gets one full examination paper free of charge. Subsequent mock
              papers cost just ₹10.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            <div className="rounded-2xl border border-[#263554] bg-[#172033] p-8 flex flex-col justify-between">
              <div>
                <span className="rounded-lg bg-[#10B981]/20 px-2.5 py-1 text-xs font-bold text-[#10B981]">
                  COMPLIMENTARY
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[#F5F7FB]">First Question Paper</h3>
                <div className="mt-2 text-4xl font-extrabold text-[#F5F7FB]">₹0</div>
                <p className="mt-3 text-xs text-[#A7B0C0]">
                  Available to every verified student upon account creation.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#A7B0C0]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                    <span>Full National-level paper simulation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                    <span>Live OMR response sheet & A4 PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                    <span>Comprehensive solutions & concept breakdown</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 block rounded-xl bg-[#6486C6] py-3 text-center text-xs font-bold text-[#0B1020]"
              >
                Claim Free Paper
              </Link>
            </div>

            <div className="rounded-2xl border border-[#6486C6] bg-[#172033] p-8 flex flex-col justify-between relative shadow-xl shadow-[#6486C6]/10">
              <div className="absolute -top-3 right-6 rounded-full bg-[#6486C6] px-3 py-0.5 text-[10px] font-bold text-[#0B1020]">
                PAY PER PAPER
              </div>
              <div>
                <span className="rounded-lg bg-[#6486C6]/20 px-2.5 py-1 text-xs font-bold text-[#6486C6]">
                  STANDARD PAPER
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[#F5F7FB]">Subsequent Papers</h3>
                <div className="mt-2 text-4xl font-extrabold text-[#F5F7FB]">₹10</div>
                <p className="mt-3 text-xs text-[#A7B0C0]">
                  Per full mock paper or custom test. No recurring charges.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#A7B0C0]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                    <span>Verified Razorpay gateway checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                    <span>Lifetime entitlement to attempt history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#6486C6]" />
                    <span>Integrated concept mastery analytics</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 block rounded-xl border border-[#6486C6] bg-[#1D2940] py-3 text-center text-xs font-bold text-[#F5F7FB] hover:bg-[#6486C6] hover:text-[#0B1020] transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 13: FAQ */}
      {/* ==================================================================== */}
      <section className="py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              Support & Transparency
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#F5F7FB]">
              Frequently Asked Questions
            </p>
          </div>

          <div className="mt-12 space-y-4">
            {[
              {
                q: 'How does the free question paper claim work?',
                a: 'Every verified registered candidate is eligible to claim their first question paper at no cost. The entitlement is atomically granted server-side and recorded in your account.',
              },
              {
                q: 'How are solutions and explanations released?',
                a: 'To maintain academic integrity and prevent cheating during active tests, correct answers and detailed explanations are sealed until your attempt has been submitted and evaluated.',
              },
              {
                q: 'Can I print my OMR sheet for offline practice?',
                a: 'Yes. Every NEET paper comes with a high-resolution, print-ready A4 OMR PDF formatted with alignment boxes, bubble grids, and registration identification.',
              },
              {
                q: 'How does the server-authoritative timer work?',
                a: 'The examination countdown is calculated relative to a server deadline. If your browser sleeps, refreshes, or loses internet temporarily, the timer does not reset. When the deadline arrives, the test is automatically submitted.',
              },
            ].map((faq, idx) => (
              <div key={idx} className="rounded-xl border border-[#263554] bg-[#11182A] p-5">
                <h3 className="text-sm font-bold text-[#F5F7FB]">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#A7B0C0]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 14: FINAL CONVERSION CTA */}
      {/* ==================================================================== */}
      <section className="border-t border-[#263554] bg-[#11182A] py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#F5F7FB] sm:text-4xl">
            Knowledge. Built Strong.
          </h2>
          <p className="mt-3 text-sm text-[#A7B0C0]">
            Begin with a full diagnostic paper today. Move through structured concept practice and
            leave measurable proof of your preparation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-8 py-3.5 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-lg shadow-[#6486C6]/20"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
