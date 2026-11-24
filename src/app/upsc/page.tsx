import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Compass, BookOpen, Sparkles, Scale, Landmark, Award } from 'lucide-react';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';
import { UpscSyllabusExplorer } from '@/components/syllabus/UpscSyllabusExplorer';

export const metadata = {
  title: 'MERITWISE UPSC — Civil Services Examination Practice',
  description:
    'Dedicated UPSC CSE preparation with timed General Studies & CSAT tests, fractional negative marking, and performance analytics.',
};

export default function UpscLandingPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Capsule Glassmorphism Exam Switcher */}
        <ExamSwitcher currentSlug="upsc" />

        {/* Hero Section */}
        <div className="merit-card rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              <span>UNION PUBLIC SERVICE COMMISSION • CIVIL SERVICES (CSE)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Analytical precision for Civil Services aspirants.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Prelims objective accuracy with fractional negative marking calibration (-0.66 for Paper I / -0.83 for Paper II) alongside structured question papers and topic-level accuracy tracking.
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
                Official 2026-27 Syllabus ↓
              </a>
              <a
                href="#blueprint"
                className="rounded-full border border-[#DCE2E6] bg-white px-6 py-3 text-sm font-semibold text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316] transition-colors"
              >
                Exam Blueprint
              </a>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section id="blueprint">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              PRELIMS BLUEPRINT
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              UPSC CSE Prelims Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'General Studies I', value: '100 Questions', detail: '200 Marks • -0.66 Negative Marking' },
              { label: 'CSAT (Paper II)', value: '80 Questions', detail: '200 Marks • -0.83 Negative Marking (33% Pass)' },
              { label: 'Mains Written', value: '1750 Marks', detail: 'Essay + 4 GS Papers + 2 Optionals' },
              { label: 'Personality Test', value: '275 Marks', detail: '2025 Total Merit Score for Ranking' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-6 space-y-2">
                <div className="text-xs font-semibold text-[#71717A]">{stat.label}</div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Official Interactive UPSC CSE Syllabus Explorer */}
        <section id="syllabus" className="pt-4">
          <UpscSyllabusExplorer />
        </section>

        {/* Callout Banner */}
        <div className="merit-card rounded-[28px] p-8 text-center sm:p-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
            Start Preparing with Analytical Rigor
          </h2>
          <p className="mx-auto max-w-xl text-sm text-[#52525B]">
            Calibrate your Prelims negative marking accuracy, practice official-pattern CSAT reading passages, and draft Mains answers in our dedicated studio.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="btn-merit-primary inline-flex items-center gap-2 h-12 px-8 text-sm font-bold uppercase tracking-wider"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
