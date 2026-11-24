import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock, Zap, Target, BookOpen, AlertCircle, Sparkles } from 'lucide-react';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';
import { JeeMainSyllabusExplorer } from '@/components/syllabus/JeeMainSyllabusExplorer';

export const metadata = {
  title: 'MERITWISE JEE Main — Official 2027 Syllabus & Testing Architecture',
  description:
    'Complete official NTA JEE Main 2027 syllabus breakdown across Physics, Chemistry, and Mathematics, plus Paper 2A (B.Arch) and Paper 2B (B.Planning) with Computer-Based Testing simulations.',
};

export default function JeeMainLandingPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Capsule Glassmorphism Exam Switcher */}
        <ExamSwitcher currentSlug="jee-main" />

        {/* Hero Section */}
        <div className="merit-card rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              <span>JOINT ENTRANCE EXAMINATION (MAIN) • NTA CBT 2027</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Engineering problem solving with precision.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Speed, numerical accuracy, and disciplined question selection under true Computer-Based Testing conditions. Aligned with the official 2027 rationalized curriculum across 54 Paper 1 units, Section A MCQs, and Section B numerical integers.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/practice"
                className="btn-merit-primary h-12 px-8 text-sm font-bold uppercase tracking-wider"
              >
                Start Practice ↗
              </Link>
              <a
                href="#syllabus"
                className="btn-merit-secondary h-12 px-7 text-sm font-semibold inline-flex items-center gap-1.5"
              >
                Explore 2027 Syllabus
              </a>
              <a
                href="#blueprint"
                className="text-xs font-bold text-[#52525B] hover:text-[#121316] underline-offset-4 hover:underline py-2"
              >
                View Testing Blueprint
              </a>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section id="blueprint">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              JEE Main Official Testing Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '180 Minutes', detail: '3 Hours CBT Countdown (240m for PwD)' },
              { label: 'Total Questions', value: '75 Questions', detail: '25 per subject: 20 MCQs + 5 NVQs' },
              { label: 'Marking Scheme', value: '+4 / -1', detail: 'Negative marking for both Section A & B' },
              { label: 'Total Marks', value: '300 Marks', detail: '100 marks per subject (P, C, M)' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-6 space-y-2">
                <div className="text-xs font-semibold text-[#71717A]">{stat.label}</div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Dual Focus */}
        <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="merit-card p-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F4F4F0] px-3 py-1 text-xs font-bold text-[#121316]">
              Section A • Single Correct MCQs (20 Questions / Subject)
            </div>
            <h3 className="text-xl font-bold text-[#121316] font-sans">
              Conceptual Breadth & Elimination Speed
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Standard multiple choice questions testing fundamental principles and quick mathematical elimination. +4 for correct, -1 for incorrect, 0 for unattempted.
            </p>
          </div>

          <div className="merit-card p-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F7F3EB] px-3 py-1 text-xs font-bold text-[#6E5328]">
              Section B • Numerical Value (05 Questions / Subject — All Mandatory)
            </div>
            <h3 className="text-xl font-bold text-[#121316] font-sans">
              Virtual Keypad & Exact Integer Rounding
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Non-optional calculation questions. Candidates must answer all 5 questions using the on-screen virtual numeric keypad (physical keyboard disabled). Answers rounded to the nearest integer. Marked with +4 for correct and -1 for wrong.
            </p>
          </div>
        </section>

        {/* NTA CBT Console Guidelines & Symbol Architecture */}
        <section className="merit-card p-8 sm:p-10 space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              NTA CBT CONSOLE ARCHITECTURE (APPENDIX III)
            </div>
            <h2 className="mt-1 text-2xl font-bold font-sans text-[#121316]">
              Question Palette States & Evaluation Rules
            </h2>
            <p className="mt-1 text-xs text-[#52525B]">
              Familiarize yourself with the exact 5 symbols and operational rules implemented in our Computer-Based Testing studio.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 text-xs">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4 space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-md border border-[#C5D0D6] bg-white font-mono font-bold text-[#4A5568]">
                1
              </div>
              <div className="font-bold text-[#121316]">Not Visited</div>
              <p className="text-[11px] text-[#71717A]">
                You have not visited the question yet.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4 space-y-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#E4002B] font-mono font-bold text-white"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                2
              </div>
              <div className="font-bold text-[#121316]">Not Answered</div>
              <p className="text-[11px] text-[#71717A]">
                You have visited the question but have not answered it.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4 space-y-2">
              <div
                className="flex h-8 w-8 items-center justify-center rounded-md bg-[#2E7D32] font-mono font-bold text-white"
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
              >
                3
              </div>
              <div className="font-bold text-[#121316]">Answered</div>
              <p className="text-[11px] text-[#71717A]">
                You have answered the question. Evaluated for marks.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4 space-y-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#673AB7] font-mono font-bold text-white">
                4
              </div>
              <div className="font-bold text-[#121316]">Marked for Review</div>
              <p className="text-[11px] text-[#71717A]">
                Marked without answering. <strong>NOT evaluated</strong>.
              </p>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4 space-y-2">
              <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-[#673AB7] font-mono font-bold text-white">
                5
                <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-sm bg-[#2E7D32] text-[8px] text-white ring-1 ring-white">
                  ✓
                </span>
              </div>
              <div className="font-bold text-[#121316]">Ans & Marked Review</div>
              <p className="text-[11px] text-[#71717A]">
                Answered and marked. <strong>WILL be evaluated</strong>.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 text-xs text-[#52525B]">
            <div className="rounded-xl bg-[#F7F8F9] p-4 space-y-1">
              <div className="font-bold text-[#121316]">Normalization (Appendix IV)</div>
              <p className="text-[11px] leading-relaxed">
                Raw scores across multiple shifts are normalized to NTA Percentile Scores calculated up to <strong>7 decimal places</strong>:
                <br />
                <code className="text-[10px] bg-white px-1.5 py-0.5 rounded border border-[#DCE2E6] inline-block my-1 font-mono">
                  Percentile = 100 × (Candidates with score ≤ candidate) / (Total candidates in shift)
                </code>
              </p>
            </div>
            <div className="rounded-xl bg-[#F7F8F9] p-4 space-y-1">
              <div className="font-bold text-[#121316]">Official Tie-Breaking Hierarchy</div>
              <p className="text-[11px] leading-relaxed">
                Ties are resolved in strict order: 1) Higher Mathematics score; 2) Higher Physics score; 3) Higher Chemistry score; 4) Lower ratio of negative/positive answers across test; 5) Lower ratio in Math; 6) In Physics; 7) In Chem.
              </p>
            </div>
          </div>
        </section>

        {/* Syllabus Strategic Insights */}
        <section className="rounded-2xl border border-[#BACDBA] bg-[#F5F8F5] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244026]">
            <Sparkles className="h-4 w-4 text-[#355238]" />
            <span>2027 Rationalized Syllabus Strategic Insights</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#121316]">
            What’s Excluded vs High-Yield Priorities
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#455044] pt-2">
            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-emerald-600" />
                <span>Chemistry Rationalization</span>
              </div>
              <p className="leading-relaxed">
                Legacy chapters (Solid State, Surface Chemistry, States of Matter, Hydrogen, s-block, Polymers, and Chemistry in Everyday Life) remain <strong>completely removed</strong>. High emphasis shifts to GOC, Oxygen/Nitrogen organics, and Practical Chemistry (Unit 20).
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-600" />
                <span>Physics Experimental Focus</span>
              </div>
              <p className="leading-relaxed">
                Unit 20 (Experimental Skills) outlines 18 specific practical laboratory experiments (Vernier calipers, screw gauge, resonance tube, metre bridge, parallax focal lengths). Tested directly in Section B numerical calculations.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-amber-600" />
                <span>Mathematics Integration Forms</span>
              </div>
              <p className="leading-relaxed">
                All 10 standard evaluation forms of algebraic and quadratic square-root integrals are officially retained in Unit 8, alongside Conic Sections (Unit 10) and 3D Geometry / Skew Lines (Unit 11).
              </p>
            </div>
          </div>
        </section>

        {/* Official Interactive Syllabus Explorer */}
        <section id="syllabus" className="pt-4">
          <JeeMainSyllabusExplorer />
        </section>
      </div>
    </div>
  );
}
