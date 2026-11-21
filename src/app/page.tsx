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
        // Clear response
        const next = { ...prev };
        delete next[qNum];
        return next;
      }
      return { ...prev, [qNum]: opt };
    });
  };

  return (
    <div className="relative overflow-hidden bg-[#F7F5EF] text-[#2E332D]">
      {/* Background ambient lighting - soft sage glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#9CAF88]/15 via-transparent to-transparent blur-3xl" />

      {/* ==================================================================== */}
      {/* SECTION 1: HERO (Editorial, Matte & Glassmorphic) */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#758B62] shadow-soft backdrop-blur-md">
            <span className="flex h-2 w-2 rounded-full bg-[#9CAF88]" />
            <span>Digital Examination Infrastructure</span>
          </div>

          <h1 className="mt-8 text-4xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-[#263126]">
            Your preparation.<br className="hidden sm:inline" />{' '}
            <span className="text-[#758B62]">Made measurable.</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-[#73786E] sm:text-xl font-medium">
            Knowledge. Built Strong.
          </p>

          <p className="mx-auto mt-2 max-w-3xl text-sm leading-relaxed text-[#92958D] sm:text-base">
            FORT is a structured examination practice platform designed around concepts,
            server-authoritative simulations, physical-grade OMR sheets, and continuous improvement.
            Zero vanity metrics. No fabricated rankings.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-7 py-3.5 text-sm font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all hover:translate-y-[-1px]"
            >
              <span>Start Practising</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/neet"
              className="flex items-center gap-2 rounded-xl border border-[#E6E5DE] bg-white px-7 py-3.5 text-sm font-semibold text-[#2E332D] shadow-soft hover:bg-[#F0EFEA] hover:border-[#9CAF88] transition-all"
            >
              <span>Explore FORT</span>
              <ChevronRight className="h-4 w-4 text-[#73786E]" />
            </Link>
          </div>
        </div>

        {/* Real Interactive Examination UI Showcase (Matte White Card with Glass Capsule Overlays) */}
        <div className="mt-16 rounded-3xl border border-[#E6E5DE] bg-white p-5 sm:p-8 shadow-card">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E9EEE3] text-[#758B62] font-mono font-bold text-xs shadow-soft">
                NEET
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#263126]">
                  All India Full Mock Test • Physics Section
                </h3>
                <p className="text-xs text-[#73786E]">Question 1 of 20 • Single Correct (+4 / -1)</p>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs">
              <div className="flex items-center gap-1.5 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] px-3.5 py-1.5 text-[#263126] font-semibold">
                <Clock className="h-4 w-4 text-[#758B62]" />
                <span className="tabular-nums font-bold">02:54:18</span>
              </div>
              <div className="rounded-xl bg-[#E9EEE3] px-3 py-1.5 font-bold text-[#758B62]">
                Autosaved
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Question Panel */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-2xl border border-[#E6E5DE] bg-[#F7F5EF]/70 p-6">
                <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
                  Concept: Electrostatics & Gauss Law
                </div>
                <div className="mt-3 text-sm sm:text-base text-[#2E332D] leading-relaxed">
                  <MathText content="A point charge $q$ is placed at the center of a hollow cubical conductor of edge length $L$. What is the total electric flux passing through any one face of the cube?" />
                </div>

                <div className="mt-6 space-y-2.5">
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
                        'flex items-center gap-3.5 rounded-xl border p-3.5 text-xs sm:text-sm transition-all cursor-pointer',
                        demoOmrAnswers[1] === opt.key
                          ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126] font-medium shadow-soft'
                          : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/70 hover:bg-[#F0EFEA]'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-mono font-bold text-xs',
                          demoOmrAnswers[1] === opt.key
                            ? 'border-[#758B62] bg-[#9CAF88] text-white'
                            : 'border-[#E6E5DE] text-[#73786E]'
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
                  <button className="rounded-xl border border-[#E6E5DE] bg-white px-3.5 py-2 text-[#73786E] hover:text-[#263126] hover:bg-[#F0EFEA] transition-colors shadow-soft">
                    Mark for Review
                  </button>
                  <button
                    onClick={() => handleDemoOmrClick(1, '')}
                    className="rounded-xl border border-[#E6E5DE] bg-white px-3.5 py-2 text-[#73786E] hover:text-[#E8412C] hover:bg-[#FCE8E4] transition-colors shadow-soft"
                  >
                    Clear Response
                  </button>
                </div>
                <div className="flex gap-2">
                  <button className="rounded-xl bg-[#9CAF88] px-5 py-2 font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all">
                    Save & Next
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Live OMR Widget */}
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-soft flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3 text-xs font-bold text-[#263126]">
                  <span>LIVE OMR PREVIEW</span>
                  <span className="font-mono text-[#758B62]">FORT-26-000001</span>
                </div>

                <p className="mt-2 text-[11px] text-[#92958D]">
                  Click options or bubbles to synchronize response:
                </p>

                <div className="mt-4 space-y-2.5">
                  {[1, 2, 3, 4, 5].map((qNum) => (
                    <div
                      key={qNum}
                      className={cn(
                        'flex items-center justify-between rounded-xl border px-3 py-2 transition-all',
                        qNum === 1 ? 'border-[#9CAF88] bg-[#E9EEE3]' : 'border-[#ECEAE4] bg-[#F7F5EF]'
                      )}
                    >
                      <span className="font-mono text-xs font-bold text-[#73786E]">
                        {qNum.toString().padStart(2, '0')}.
                      </span>
                      <div className="flex items-center gap-1.5">
                        {['A', 'B', 'C', 'D'].map((opt) => {
                          const isFilled = demoOmrAnswers[qNum] === opt;
                          return (
                            <button
                              key={opt}
                              type="button"
                              onClick={() => handleDemoOmrClick(qNum, opt)}
                              className={cn(
                                'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold transition-all',
                                isFilled
                                  ? 'border-[#758B62] bg-[#9CAF88] text-white shadow-soft'
                                  : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]'
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
              </div>

              <div className="mt-6 rounded-xl bg-[#F0EFEA] p-2.5 text-center text-xs text-[#73786E] font-medium">
                {Object.keys(demoOmrAnswers).length} of 5 questions answered
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: THE PROBLEM */}
      {/* ==================================================================== */}
      <section className="border-y border-[#E6E5DE] bg-[#F0EFEA]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              The Core Problem in Competitive Prep
            </h2>
            <p className="mt-3 text-3xl font-bold tracking-tight text-[#263126] sm:text-4xl">
              Students practice thousands of questions without knowing where marks are actually lost.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: 'Blind Volume Practice',
                desc: 'Solving question banks without atomic concept tagging leads to repeated errors in the exact same theoretical edge cases.',
              },
              {
                title: 'Time Mismanagement',
                desc: 'Spending 4 minutes on a single tricky question leaves easy scoring questions unattempted at the end of the paper.',
              },
              {
                title: 'Physical OMR Fatigue',
                desc: 'Practicing only with computer clicks leaves students vulnerable to misaligned bubbles and bubbling panic on real physical OMR sheets.',
              },
              {
                title: 'Negative Marking Penalty',
                desc: 'Uncontrolled guesswork turns a 600+ NEET score into a 480 due to -1 penalties across 30 unwarranted guesses.',
              },
              {
                title: 'Vanity Metrics',
                desc: 'Measuring preparation by "hours studied" instead of accuracy rate, concept mastery, and error recency.',
              },
              {
                title: 'Absence of Remedial Queues',
                desc: 'Mistakes made in mock test 1 are forgotten rather than queued into an automated remedial practice workflow.',
              },
            ].map((prob, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FCE8E4] text-[#E8412C]">
                  <AlertTriangle className="h-4 w-4" />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#263126]">{prob.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#73786E]">{prob.desc}</p>
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Methodology
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#263126] sm:text-4xl">
              The FORT Learning Cycle
            </p>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-5">
            {[
              { step: '01', name: 'Select', desc: 'Target exam, subject & specific atomic concept' },
              { step: '02', name: 'Practice', desc: 'Concept-level untimed & timed practice sets' },
              { step: '03', name: 'Simulate', desc: 'Full CBT & physical-grade OMR mock tests' },
              { step: '04', name: 'Analyze', desc: 'Speed vs accuracy, concept mastery scores' },
              { step: '05', name: 'Improve', desc: 'Data-driven remediation queue for weak areas' },
            ].map((s) => (
              <div
                key={s.step}
                className="rounded-2xl border border-[#E6E5DE] bg-white p-6 text-center shadow-soft hover:border-[#9CAF88] transition-all"
              >
                <div className="font-mono text-2xl font-black text-[#758B62]">{s.step}</div>
                <h3 className="mt-2 text-base font-bold text-[#263126]">{s.name}</h3>
                <p className="mt-1 text-xs text-[#73786E]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: EXAMINATIONS SHOWCASE */}
      {/* ==================================================================== */}
      <section className="border-t border-[#E6E5DE] bg-[#F0EFEA]/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
                Target Programs
              </h2>
              <p className="mt-2 text-3xl font-bold tracking-tight text-[#263126] sm:text-4xl">
                Built for India's Most Rigorous Examinations
              </p>
            </div>
            <Link
              href="/neet"
              className="text-sm font-semibold text-[#758B62] hover:underline flex items-center gap-1"
            >
              <span>View all curricula</span>
              <ChevronRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EXAMINATIONS.map((exam) => (
              <div
                key={exam.slug}
                className="group relative flex flex-col justify-between rounded-2xl border border-[#E6E5DE] bg-white p-7 transition-all hover:border-[#9CAF88] hover:shadow-card"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                      {exam.category.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-[#92958D]">
                      {exam.subjects.length} Disciplines
                    </span>
                  </div>

                  <h3 className="mt-4 text-xl font-bold text-[#263126] group-hover:text-[#758B62] transition-colors">
                    {exam.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-[#73786E]">{exam.description}</p>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {exam.subjects.map((sub) => (
                      <span
                        key={sub.slug}
                        className="rounded-lg border border-[#E6E5DE] bg-[#F7F5EF] px-2.5 py-1 text-[11px] text-[#73786E]"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-8 border-t border-[#ECEAE4] pt-4">
                  <Link
                    href={`/${exam.slug}`}
                    className="flex items-center justify-between text-xs font-bold text-[#263126] group-hover:text-[#758B62]"
                  >
                    <span>Enter {exam.shortName} Studio</span>
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
              <div className="inline-flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white px-3.5 py-1 text-xs font-semibold text-[#758B62] shadow-soft">
                <Sparkles className="h-3.5 w-3.5 text-[#9CAF88]" />
                <span>FORT Signature Capability</span>
              </div>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[#263126] sm:text-4xl">
                The Live Physical-Grade OMR Engine
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-[#73786E]">
                NEET is an offline pen-and-paper examination. Practicing only with click buttons
                leaves students vulnerable to shading errors and panic on exam day.
              </p>

              <ul className="mt-6 space-y-3.5 text-xs text-[#73786E]">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#263126]">Instant Bidirectional Synchronization:</strong> Selecting an answer fills
                    the bubble; changing the option clears the old bubble and fills the new one.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#263126]">Single Source of Truth:</strong> OMR is never a separate
                    database. It is directly projected from the immutable attempt state.
                  </span>
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2 className="h-4 w-4 text-[#9CAF88] shrink-0 mt-0.5" />
                  <span>
                    <strong className="text-[#263126]">Print-Ready A4 PDF Generation:</strong> Download and print high-resolution
                    vector OMR response sheets with candidate registration IDs and hashes.
                  </span>
                </li>
              </ul>

              <div className="mt-8 flex gap-3">
                <Link
                  href="/neet/omr-practice"
                  className="rounded-xl bg-[#9CAF88] px-6 py-3 text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a] transition-all"
                >
                  Try Full OMR Simulator
                </Link>
              </div>
            </div>

            {/* OMR Visual Representation - Tactile Paper */}
            <div className="rounded-3xl border border-[#E6E5DE] bg-white p-7 shadow-card">
              <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3.5">
                <div className="font-mono text-xs font-bold text-[#263126]">FORT-NEET-OMR-2026</div>
                <div className="rounded-lg bg-[#E9EEE3] px-2.5 py-0.5 text-[11px] font-bold text-[#758B62]">
                  A4 Printable Vector
                </div>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((q) => (
                  <div
                    key={q}
                    className="flex items-center justify-between rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] px-3 py-2"
                  >
                    <span className="font-mono text-xs font-bold text-[#73786E]">
                      {q.toString().padStart(2, '0')}.
                    </span>
                    <div className="flex gap-1.5">
                      {['A', 'B', 'C', 'D'].map((o) => (
                        <div
                          key={o}
                          className={cn(
                            'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-bold',
                            q === 1 && o === 'B'
                              ? 'border-[#758B62] bg-[#9CAF88] text-white shadow-soft'
                              : q === 3 && o === 'A'
                              ? 'border-[#758B62] bg-[#9CAF88] text-white shadow-soft'
                              : 'border-[#E6E5DE] bg-white text-[#92958D]'
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
      <section className="border-t border-[#E6E5DE] bg-[#F0EFEA]/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Transparent Monetization
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#263126] sm:text-4xl">
              Pay as you prepare. Zero hidden subscriptions.
            </p>
            <p className="mt-3 text-sm text-[#73786E]">
              Every new candidate gets one full examination paper free of charge. Subsequent mock
              papers cost just ₹10.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 max-w-3xl mx-auto">
            {/* Free Tier */}
            <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 flex flex-col justify-between shadow-soft">
              <div>
                <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                  COMPLIMENTARY
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[#263126]">First Question Paper</h3>
                <div className="mt-2 text-4xl font-extrabold text-[#263126]">₹0</div>
                <p className="mt-3 text-xs text-[#73786E]">
                  Available to every verified student upon account creation.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#73786E]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Full National-level paper simulation</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Live OMR response sheet & A4 PDF</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Comprehensive solutions & concept breakdown</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 block rounded-xl bg-[#9CAF88] py-3 text-center text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a]"
              >
                Claim Free Paper
              </Link>
            </div>

            {/* Standard Tier */}
            <div className="rounded-3xl border-2 border-[#9CAF88] bg-white p-8 flex flex-col justify-between shadow-card relative">
              <div className="absolute -top-3 right-6 rounded-full bg-[#9CAF88] px-3 py-0.5 text-[10px] font-bold text-[#263126]">
                PAY PER PAPER
              </div>
              <div>
                <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
                  STANDARD PAPER
                </span>
                <h3 className="mt-4 text-2xl font-bold text-[#263126]">Subsequent Papers</h3>
                <div className="mt-2 text-4xl font-extrabold text-[#263126]">₹10</div>
                <p className="mt-3 text-xs text-[#73786E]">
                  Per full mock paper or custom test. No recurring charges.
                </p>

                <ul className="mt-6 space-y-2.5 text-xs text-[#73786E]">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Verified Razorpay gateway checkout</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Lifetime entitlement to attempt history</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                    <span>Integrated concept mastery analytics</span>
                  </li>
                </ul>
              </div>

              <Link
                href="/signup"
                className="mt-8 block rounded-xl border border-[#9CAF88] bg-[#F7F5EF] py-3 text-center text-xs font-bold text-[#263126] hover:bg-[#9CAF88] transition-colors"
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
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Transparency
            </h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-[#263126]">
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
              <div key={idx} className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft">
                <h3 className="text-sm font-bold text-[#263126]">{faq.q}</h3>
                <p className="mt-2 text-xs leading-relaxed text-[#73786E]">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 14: FINAL CONVERSION CTA */}
      {/* ==================================================================== */}
      <section className="border-t border-[#E6E5DE] bg-[#F0EFEA] py-20 text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-extrabold tracking-tight text-[#263126] sm:text-4xl">
            Knowledge. Built Strong.
          </h2>
          <p className="mt-3 text-sm text-[#73786E]">
            Begin with a full diagnostic paper today. Move through structured concept practice and
            leave measurable proof of your preparation.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="/signup"
              className="flex items-center gap-2 rounded-xl bg-[#9CAF88] px-8 py-3.5 text-sm font-bold text-[#263126] hover:bg-[#8fa27a] transition-all shadow-soft"
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
