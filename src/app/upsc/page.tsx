import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Compass, BookOpen } from 'lucide-react';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';

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
              PRELIMS BLUEPRINT
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              UPSC CSE Prelims Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'General Studies I', value: '100 Questions', detail: '200 Marks • -0.66 Negative Marking' },
              { label: 'CSAT (Paper II)', value: '80 Questions', detail: '200 Marks • -0.83 Negative Marking' },
              { label: 'Paper Duration', value: '120 Minutes', detail: '2 Hours per session' },
              { label: 'Evaluation Format', value: 'Objective Paper', detail: 'Instant diagnostic accuracy analysis' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-6 space-y-2">
                <div className="text-xs font-semibold text-[#71717A]">{stat.label}</div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
