import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock, Zap, Target, BookOpen } from 'lucide-react';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';

export const metadata = {
  title: 'MERITWISE JEE Main — Computer-Based Testing & Numerical Response',
  description:
    'CBT examination simulation for JEE Main aspirants across Physics, Chemistry, and Mathematics with NTA pattern (+4, -1 for MCQs and numerical value questions).',
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
              <span>JOINT ENTRANCE EXAMINATION (MAIN) • NTA CBT</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Engineering problem solving with precision.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Speed, numerical accuracy, and disciplined question selection under true Computer-Based Testing conditions. Featuring MCQs and numerical response evaluations with NTA +4 / -1 rules.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/practice"
                className="btn-merit-primary h-12 px-8 text-sm font-bold uppercase tracking-wider"
              >
                Start Practice ↗
              </Link>
              <a
                href="#blueprint"
                className="btn-merit-secondary h-12 px-7 text-sm font-semibold inline-flex items-center gap-1.5"
              >
                View Blueprint
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
      </div>
    </div>
  );
}
