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
              JEE Main Testing Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '180 Minutes', detail: '3 Hours CBT Countdown' },
              { label: 'Total Questions', value: '90 Questions', detail: '30 per subject (MCQs + NVQs)' },
              { label: 'Marking Scheme', value: '+4 / -1', detail: 'Negative marking for MCQs & NVQs' },
              { label: 'Total Marks', value: '300 Marks', detail: '100 marks per subject' },
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
              Section A • Single Correct MCQs
            </div>
            <h3 className="text-xl font-bold text-[#121316] font-sans">
              Conceptual Breadth & Analytical Speed
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Standard multiple choice questions testing fundamental principles, problem transformation, and quick mathematical elimination across Physics, Chemistry, and Mathematics.
            </p>
          </div>

          <div className="merit-card p-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#F7F3EB] px-3 py-1 text-xs font-bold text-[#6E5328]">
              Section B • Numerical Value (NVQ)
            </div>
            <h3 className="text-xl font-bold text-[#121316] font-sans">
              Numerical Response with Exact Validation
            </h3>
            <p className="text-xs text-[#52525B] leading-relaxed">
              Calculation questions without answer options. Enter exact integer values with configured server-authoritative tolerance bounds (±0.05).
            </p>
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
