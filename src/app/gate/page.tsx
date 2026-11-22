import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock, Calculator, Cpu, Code2 } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';

export const metadata = {
  title: 'MERITWISE GATE — Graduate Aptitude Test in Engineering',
  description:
    'Standardized examination preparation for GATE aspirants across Computer Science, Mechanical, Electrical, Electronics, Civil, and Data Science. MCQs, MSQs, and Numerical Answer Type (NAT) testing.',
};

export default function GateLandingPage() {
  const gateInfo = EXAMINATIONS.find((e) => e.slug === 'gate')!;

  const disciplines = [
    { code: 'CS / IT', name: 'Computer Science & Information Technology', topics: 'Algorithms, OS, DBMS, Networks, TOC' },
    { code: 'DA', name: 'Data Science & Artificial Intelligence', topics: 'Machine Learning, AI, Probability, Linear Algebra' },
    { code: 'ME', name: 'Mechanical Engineering', topics: 'Thermodynamics, Fluid Mechanics, Manufacturing, Mechanics' },
    { code: 'EE', name: 'Electrical Engineering', topics: 'Power Systems, Control Systems, Electrical Machines, Circuits' },
    { code: 'EC', name: 'Electronics & Communication', topics: 'Signals & Systems, Digital Circuits, Communications, EMT' },
    { code: 'CE', name: 'Civil Engineering', topics: 'Structural Analysis, Geotechnical, Environmental, Hydrology' },
  ];

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Capsule Glassmorphism Exam Switcher */}
        <ExamSwitcher currentSlug="gate" />

        {/* Hero Section */}
        <div className="merit-card rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              <span>GRADUATE APTITUDE TEST IN ENGINEERING (GATE)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Standardized engineering & postgraduate assessment.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Branch-specific examination simulation supporting Multiple Choice (MCQ), Multiple Select (MSQ), and Numerical Answer Type (NAT) questions with virtual calculator parity and official negative marking rules.
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
              Standard GATE Testing Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '180 Minutes', detail: '3 Hours CBT Countdown' },
              { label: 'Total Questions', value: '65 Questions', detail: '10 General Aptitude + 55 Core Engineering' },
              { label: 'Total Marks', value: '100 Marks', detail: '1-Mark and 2-Mark questions' },
              { label: 'Question Types', value: 'MCQ · MSQ · NAT', detail: 'Fractional negative marking on MCQs only' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-6 space-y-2">
                <div className="text-xs font-semibold text-[#71717A]">{stat.label}</div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Disciplines Portfolio */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              BRANCH DISCIPLINES
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              Supported Engineering Papers
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {disciplines.map((item) => (
              <div key={item.code} className="merit-card p-6 flex flex-col justify-between space-y-4">
                <div>
                  <span className="rounded-full bg-[#F4F4F0] px-3 py-1 font-mono text-xs font-bold text-[#121316]">
                    PAPER: {item.code}
                  </span>
                  <h3 className="mt-3 text-lg font-bold text-[#121316]">{item.name}</h3>
                  <p className="mt-1 text-xs text-[#52525B] leading-relaxed">
                    {item.topics}
                  </p>
                </div>

                <Link
                  href="/practice"
                  className="pt-3 border-t border-[#E4E4DF] flex items-center justify-between text-xs font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors"
                >
                  <span>Practice {item.code} Papers</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
