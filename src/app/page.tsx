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
  Download,
  Star,
} from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';
import { cn } from '@/lib/utils';

export default function HomePage() {
  // Interactive Live OMR Demo state
  const [demoOmrAnswers, setDemoOmrAnswers] = useState<Record<number, string>>({
    1: 'B',
    2: 'A',
    3: 'B',
  });

  const handleDemoOmrClick = (qNum: number, opt: string) => {
    setDemoOmrAnswers((prev) => {
      if (prev[qNum] === opt) {
        const next = { ...prev };
        delete next[qNum];
        return next;
      }
      return { ...prev, [qNum]: opt };
    });
  };

  return (
    <div className="relative overflow-hidden bg-[#F7F5EF] text-[#2E332D]">
      {/* ==================================================================== */}
      {/* SECTION 1: HERO CONTAINER (EXACT SORREL TRATTORIA DESIGN LANGUAGE) */}
      {/* ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 pt-6 pb-14 sm:px-6 lg:px-8">
        <div className="relative rounded-[32px] bg-[#9CAF88] p-8 sm:p-12 lg:p-16 text-white shadow-[0_12px_40px_rgba(156,175,136,0.3)] overflow-hidden">
          {/* Subtle ambient lighting */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Left Content (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              {/* Overline with line */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
                <span className="h-px w-6 bg-white/60" />
                <span>EXAMINATION INFRASTRUCTURE • BROOKLYN & BENGALURU</span>
              </div>

              {/* Editorial Serif Statement Headline with Tomato Red Brush Underline */}
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold font-serif tracking-tight leading-[1.08] text-white">
                Preparation worth{' '}
                <span className="relative inline-block italic">
                  mastering.
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-[#E8412C] overflow-visible"
                    viewBox="0 0 100 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 8C26 3 66 2 98 7C70 11 36 10 5 9"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </h1>

              {/* Subtitle */}
              <p className="max-w-xl text-base sm:text-lg leading-relaxed text-white/90 font-medium">
                Engineered from first principles. Real 180-question physical OMR sheets, server-authoritative timers, and transparent ₹10 economics. Walk-ins welcome if you are brave.
              </p>

              {/* CTAs matching the reference */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/signup"
                  className="rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
                >
                  Start free simulation
                </Link>
                <Link
                  href="/neet/omr-practice"
                  className="rounded-full border border-white/60 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
                >
                  See the OMR sheet
                </Link>
              </div>
            </div>

            {/* Right Simulation Widget (5 Cols - Floating White Card matching reference) */}
            <div className="lg:col-span-5">
              <div className="rounded-[28px] bg-white p-6 sm:p-7 text-[#263126] shadow-[0_20px_50px_rgba(38,49,38,0.2)] border border-white/80 space-y-5">
                {/* Header */}
                <div className="flex items-center justify-between text-xs font-semibold border-b border-[#ECEAE4] pb-4">
                  <div>
                    <h3 className="text-base font-bold text-[#263126]">Tonight's Session</h3>
                    <p className="text-[11px] text-[#73786E]">FORT Candidate #FORT-26-000001</p>
                  </div>
                  <div className="rounded-full bg-[#F7F5EF] border border-[#E6E5DE] px-3 py-1 text-[11px] text-[#73786E]">
                    Party of 1 • Solo Mock
                  </div>
                </div>

                {/* 2x4 Slot Grid */}
                <div className="grid grid-cols-4 gap-2 text-center text-xs">
                  {[
                    { time: '5:30', status: 'BOOKED', filled: true },
                    { time: '6:00', status: 'BOOKED', filled: true },
                    { time: '6:30', status: 'ACTIVE', current: true },
                    { time: '7:00', status: 'OPEN', filled: false },
                    { time: '7:30', status: 'READY', filled: false },
                    { time: '8:00', status: 'SLOT', filled: false },
                    { time: '8:30', status: 'SLOT', filled: false },
                    { time: '9:15', status: 'LOCKED', filled: false },
                  ].map((slot, i) => (
                    <div
                      key={i}
                      className={cn(
                        'rounded-xl border p-2 flex flex-col items-center justify-center transition-all',
                        slot.current
                          ? 'border-[#9CAF88] bg-[#E9EEE3] font-bold text-[#263126]'
                          : slot.filled
                          ? 'border-[#E6E5DE] bg-[#F7F5EF] text-[#92958D]'
                          : 'border-[#E6E5DE] bg-white text-[#73786E]'
                      )}
                    >
                      <span className="font-mono text-[11px] font-bold">{slot.time}</span>
                      <span className="text-[8px] uppercase tracking-wider font-semibold mt-0.5">
                        {slot.status}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Summary Row with Tomato Red Action Pill */}
                <div className="flex items-center justify-between pt-2">
                  <div className="text-xs text-[#73786E]">
                    <strong className="text-[#263126]">36 parties ahead</strong> in mock queue
                  </div>

                  <Link
                    href="/exam/neet-demo"
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#E8412C] px-5 py-2 text-xs font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all"
                  >
                    <Clock className="h-3.5 w-3.5" />
                    <span>Waitlist • 200 min</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 2: THE SYLLABUS, SHORT AND DEEP (MATCHING "THE MENU, SHORT & LOUD") */}
      {/* ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
            CURRICULA
          </div>
          <h2 className="mt-1 text-3xl font-extrabold font-serif text-[#263126] sm:text-4xl">
            The syllabus, short and deep.
          </h2>
          <p className="mt-1 text-sm text-[#73786E]">
            Five distinct competitive programs built around concepts, timed simulations, and real scoring rules.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1: NEET (UG) */}
          <div className="group rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm hover:border-[#9CAF88] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E8412C] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  Most Attempted
                </span>
                <span className="font-mono text-xs font-bold text-[#263126]">₹0 Free</span>
              </div>
              <h3 className="mt-4 text-xl font-bold font-serif text-[#263126]">NEET (UG) Medical</h3>
              <p className="mt-1 text-xs text-[#73786E] leading-relaxed">
                Physics, Chemistry, Botany, Zoology. Exact 180 questions with +4 / -1 scoring and live physical OMR grid.
              </p>
            </div>
            <Link
              href="/neet"
              className="mt-6 flex items-center justify-between text-xs font-bold text-[#758B62] group-hover:text-[#263126]"
            >
              <span>Explore NEET Blueprint</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 2: JEE Main */}
          <div className="group rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm hover:border-[#9CAF88] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E8412C] px-3 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                  Popular
                </span>
                <span className="font-mono text-xs font-bold text-[#263126]">₹10 / mock</span>
              </div>
              <h3 className="mt-4 text-xl font-bold font-serif text-[#263126]">JEE Main Engineering</h3>
              <p className="mt-1 text-xs text-[#73786E] leading-relaxed">
                Physics, Chemistry, Mathematics. Section A (MCQs) + Section B (Numerical value questions with tolerances).
              </p>
            </div>
            <Link
              href="/jee-main"
              className="mt-6 flex items-center justify-between text-xs font-bold text-[#758B62] group-hover:text-[#263126]"
            >
              <span>Explore JEE Main CBT</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 3: JEE Advanced */}
          <div className="group rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm hover:border-[#9CAF88] transition-all flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEE3] px-3 py-1 text-[10px] font-bold text-[#758B62] uppercase tracking-wider">
                  Partial Marking
                </span>
                <span className="font-mono text-xs font-bold text-[#263126]">₹10 / mock</span>
              </div>
              <h3 className="mt-4 text-xl font-bold font-serif text-[#263126]">JEE Advanced IIT</h3>
              <p className="mt-1 text-xs text-[#73786E] leading-relaxed">
                Multi-correct options (+4/+3/+2/+1/-2), matrix matching, and stem questions. Strict partial marking engine.
              </p>
            </div>
            <Link
              href="/jee-advanced"
              className="mt-6 flex items-center justify-between text-xs font-bold text-[#758B62] group-hover:text-[#263126]"
            >
              <span>Explore IIT Rigor</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Card 4: Verified Rating Card (Matching "4.8 ★★★★★" block in Sorrel Trattoria) */}
          <div className="rounded-[24px] border border-[#E6E5DE] bg-[#F7F5EF] p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-extrabold font-serif text-[#263126]">4.9</span>
                <div className="flex text-[#E8412C]">
                  {'★★★★★'.split('').map((s, i) => (
                    <span key={i} className="text-sm">★</span>
                  ))}
                </div>
              </div>
              <div className="mt-1 text-xs font-semibold text-[#73786E]">
                3,890 Evaluated Test Attempts
              </div>
              <p className="mt-3 text-xs text-[#73786E] leading-relaxed">
                Zero fabricated rankings. Server-side timestamps and immutable scorecards recorded across every candidate attempt.
              </p>
            </div>
            <div className="mt-6 pt-3 border-t border-[#E6E5DE] text-[11px] font-mono text-[#758B62]">
              FORT Central Scoring Engine v2.0
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 3: THE PROBLEM IN ENTRANCE EXAMINATION PREP */}
      {/* ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
            THE PROBLEM IN COMPETITIVE PREPARATION
          </div>
          <h2 className="mt-2 text-3xl font-extrabold font-serif text-[#263126] sm:text-4xl">
            Students solve thousands of questions without knowing where marks are actually lost.
          </h2>
          <p className="mt-2 text-sm text-[#73786E]">
            Solving question banks without atomic concept tagging, server timing, and penalty diagnostics creates an illusion of competence.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
              title: 'Physical OMR Bubbling Fatigue',
              desc: 'Practicing only with mouse clicks leaves students vulnerable to misaligned bubbles and bubbling panic on real physical OMR sheets.',
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
              className="rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm space-y-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FCE8E4] text-[#E8412C]">
                <AlertTriangle className="h-4 w-4" />
              </div>
              <h3 className="text-base font-bold text-[#263126]">{prob.title}</h3>
              <p className="text-xs leading-relaxed text-[#73786E]">{prob.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 4: REAL INTERACTIVE OMR SIMULATION SHOWCASE */}
      {/* ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] border border-[#E6E5DE] bg-white p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center">
            {/* Left 6 cols */}
            <div className="lg:col-span-6 space-y-5">
              <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
                <Sparkles className="h-3.5 w-3.5" />
                <span>Physical-Grade Simulation</span>
              </div>

              <h2 className="text-3xl font-extrabold font-serif text-[#263126] sm:text-4xl">
                The exact NEET OMR sheet. Darkened in real time.
              </h2>

              <p className="text-sm leading-relaxed text-[#73786E]">
                Replicated directly from the physical NTA NEET answer sheet. 180 questions across 4 columns of 45, Roll No. digit bubble grid, Test Booklet Code, and Code 39 barcode. Darkens immediately as you solve questions.
              </p>

              <div className="space-y-2 text-xs text-[#263126]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#758B62]" />
                  <span>Bidirectional sync: darkens bubbles automatically upon question selection</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#758B62]" />
                  <span>Automatic A4 vector PDF download upon exam submission</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[#758B62]" />
                  <span>Personalized with your official FORT Registration Number</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/neet/omr-practice"
                  className="inline-flex items-center gap-2 rounded-full bg-[#E8412C] px-7 py-3 text-xs font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all"
                >
                  <span>Open Full 180-Question Sheet</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Right 6 cols: Live Interactive Mini OMR Grid */}
            <div className="lg:col-span-6 rounded-[24px] border border-[#D45D4C] bg-[#F7F5EF] p-6 shadow-inner space-y-4">
              <div className="flex items-center justify-between border-b border-[#D45D4C]/30 pb-3">
                <div className="font-serif font-bold text-sm text-[#263126]">
                  NEET OMR SIMULATOR PREVIEW
                </div>
                <span className="font-mono text-xs font-bold text-[#758B62]">
                  FORT-26-000001
                </span>
              </div>

              <div className="space-y-2 text-xs">
                {[1, 2, 3, 4, 5].map((qNum) => (
                  <div
                    key={qNum}
                    className="flex items-center justify-between bg-white rounded-xl border border-[#D45D4C]/40 px-4 py-2"
                  >
                    <span className="font-mono font-bold text-[#263126] w-8">
                      {qNum.toString().padStart(3, '0')}
                    </span>
                    <div className="flex items-center gap-2">
                      {['A', 'B', 'C', 'D'].map((opt, optIdx) => {
                        const isFilled = demoOmrAnswers[qNum] === opt;
                        return (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => handleDemoOmrClick(qNum, opt)}
                            className={cn(
                              'w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition-all',
                              isFilled
                                ? 'bg-black border-black text-white shadow-sm'
                                : 'border-[#D45D4C] text-[#D45D4C] bg-white hover:bg-[#FCE8E4]'
                            )}
                          >
                            {!isFilled && (optIdx + 1)}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center text-[11px] text-[#73786E] pt-1">
                Click any bubble above to test real-time graphite darkening
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* SECTION 5: TRANSPARENT ₹10 PRICING */}
      {/* ==================================================================== */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#263126] text-white p-8 sm:p-14 shadow-xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="rounded-full bg-[#9CAF88] px-3.5 py-1 text-xs font-bold text-[#263126] uppercase tracking-wider">
                Democratic Monetization
              </span>
              <h2 className="text-3xl font-extrabold font-serif sm:text-4xl">
                First full simulation free. ₹10 per paper thereafter.
              </h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/80">
                No ₹40,000 upfront annual coaching fees. No locked subscription contracts. Every student gets their first full-length paper complimentary, then pays a flat ₹10 (1000 paise) via UPI or Cards per subsequent simulation.
              </p>
            </div>

            <div className="lg:col-span-4 text-center lg:text-right">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-full bg-[#E8412C] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
              >
                <span>Claim Free Paper</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
