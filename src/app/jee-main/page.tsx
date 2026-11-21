import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, Clock, Zap, Target, BookOpen } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';

export const metadata = {
  title: 'FORT JEE Main — Speed, Accuracy & Numerical Problem Mastery',
  description:
    'CBT examination simulation for JEE Main aspirants across Physics, Chemistry, and Mathematics with NTA pattern (+4, -1 for MCQs and numerical value questions).',
};

export default function JeeMainLandingPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Sage Green (Sorrel Trattoria Aesthetic) */}
        <div className="rounded-[32px] bg-[#9CAF88] p-8 sm:p-12 lg:p-16 text-white shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-white/90">
              <span className="h-px w-6 bg-white/60" />
              <span>JOINT ENTRANCE EXAMINATION (MAIN) • NTA CBT</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-serif tracking-tight leading-[1.1] text-white">
              Engineering problem{' '}
              <span className="relative inline-block italic">
                solving.
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

            <p className="text-base sm:text-lg text-white/90 font-medium leading-relaxed">
              Speed, numerical accuracy, and disciplined question selection under true Computer-Based Testing conditions. Featuring MCQs and exact decimal/integer numerical response evaluations with NTA +4 / -1 rules.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/exam/jee-main-demo"
                className="rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
              >
                Start Free JEE Main Mock
              </Link>
              <Link
                href="/pricing"
                className="rounded-full border border-white/60 bg-white/10 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/20 transition-all"
              >
                View Paper Packs
              </Link>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-3xl font-bold font-serif text-[#263126]">
              Standard NTA JEE Main Pattern
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                title: 'Subject Distribution',
                value: '300 Marks',
                sub: 'Physics, Chemistry & Mathematics (25 Qs each)',
              },
              {
                title: 'Server-Timed Duration',
                value: '180 Minutes',
                sub: 'Authoritative countdown with auto-save sync',
              },
              {
                title: 'Marking Architecture',
                value: '+4 / -1',
                sub: 'Full negative marking on both Section A & Section B',
              },
            ].map((stat, idx) => (
              <div key={idx} className="rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm">
                <div className="text-xs font-semibold text-[#73786E]">{stat.title}</div>
                <div className="mt-2 text-3xl font-extrabold font-serif text-[#263126]">{stat.value}</div>
                <div className="mt-1 text-xs text-[#92958D]">{stat.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Section Structure Detail */}
        <section className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-bold text-[#758B62]">
              Section A • Single Choice MCQs
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#263126] font-serif">
              20 Mandatory Questions per Discipline
            </h3>
            <p className="mt-2 text-sm text-[#73786E] leading-relaxed">
              Fast, concept-dense four-choice questions designed to test fundamentals, speed, and analytical rigor. Immediate question state telemetry tracking (Not Visited, Answered, Marked for Review).
            </p>
            <ul className="mt-6 space-y-3 text-xs text-[#2E332D]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                <span>+4 for correct answer, -1 for wrong choice</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                <span>Formula sheet references and LaTeX KaTeX rendered equations</span>
              </li>
            </ul>
          </div>

          <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 shadow-sm">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#FCE8E4] px-3 py-1 text-xs font-bold text-[#E8412C]">
              Section B • Numerical Value (NVQ)
            </div>
            <h3 className="mt-4 text-xl font-bold text-[#263126] font-serif">
              Numerical Response with Server Validation
            </h3>
            <p className="mt-2 text-sm text-[#73786E] leading-relaxed">
              Pure calculation questions without answer choices. Enter exact floating-point or integer values with support for configurable tolerance bounds (±0.05).
            </p>
            <ul className="mt-6 space-y-3 text-xs text-[#2E332D]">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#E8412C]" />
                <span>Full negative marking (-1) in compliance with latest NTA norms</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
                <span>Prevents rounding confusion with explicit precision rules</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Call to action */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-serif text-[#263126]">
            Benchmark Your JEE Main Standing Today
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#73786E]">
            One free high-yield JEE Main paper is credited to your account instantly on signup.
          </p>
          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E8412C] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all"
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
