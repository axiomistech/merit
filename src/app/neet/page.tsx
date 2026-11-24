import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, Shield, FileDown, BookOpen, Clock, Award, Sparkles, Microscope, Dna, Atom, FlaskConical } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';
import { NeetSyllabusExplorer } from '@/components/syllabus/NeetSyllabusExplorer';
import { NEET_SYLLABUS_OVERVIEW } from '@/data/neetSyllabusData';

export const metadata = {
  title: 'MERITWISE NEET — Official 2026/27 Medical Syllabus & OMR Simulation',
  description:
    'Complete official NMC / NTA NEET (UG) 2026-27 syllabus across 50 units (Physics, Chemistry, Botany, and Zoology) with exact NTA marking (+4, -1), 18 practical physics experiments, and printable A4 vector response sheets.',
};

export default function NeetLandingPage() {
  const neetInfo = EXAMINATIONS.find((e) => e.slug === 'neet')!;

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Capsule Glassmorphism Exam Switcher */}
        <ExamSwitcher currentSlug="neet" />

        {/* Hero Section */}
        <div className="merit-card rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              <span>NATIONAL ELIGIBILITY CUM ENTRANCE TEST (UG) • NMC & NTA 2026-27</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Disciplined medical entrance practice.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Standardized examination simulation aligned with the official 50-Unit NMC/NTA curriculum. Exact 180-question physical-grade vector OMR sheets, NTA +4 / -1 scoring, and atomic concept analytics across Physics, Chemistry, Botany, and Zoology.
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
                Explore 50 Units Syllabus
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

        {/* NEET Blueprint & Pattern */}
        <section id="blueprint">
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              EXAMINATION BLUEPRINT
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              Standard NTA NEET (UG) Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Total Duration', value: '200 Minutes', detail: '3 Hours 20 Minutes countdown' },
              { label: 'Total Marks', value: '720 Marks', detail: '180 Questions to attempt from 200' },
              { label: 'Marking Scheme', value: '+4 / -1', detail: '4 for correct, -1 for wrong' },
              { label: 'Curriculum Units', value: '50 Units', detail: '20 Physics, 20 Chemistry, 10 Biology' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-6 space-y-2">
                <div className="text-xs font-semibold text-[#71717A]">{stat.label}</div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Strategic Syllabus Insights (Physics Practicals, Chemistry Rationalization, Biology Families & Frog) */}
        <section className="rounded-2xl border border-[#BACDBA] bg-[#F5F8F5] p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#244026]">
            <Sparkles className="h-4 w-4 text-[#355238]" />
            <span>Official NMC Curriculum Strategic Insights</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-[#121316]">
            High-Yield Focus Areas & Rationalized Exclusions
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#455044] pt-2">
            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <Atom className="h-4 w-4 text-blue-600" />
                <span>Physics Unit 20: 18 Lab Practicals</span>
              </div>
              <p className="leading-relaxed">
                Directly tested on instrument handling and experimental graphs: Vernier calipers, screw gauge, simple pendulum energy dissipation, resonance tube sound speed, metre bridge resistivity, parallax focal lengths, and p-n junction diode curves.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <FlaskConical className="h-4 w-4 text-emerald-600" />
                <span>Chemistry Rationalization & Unit 20</span>
              </div>
              <p className="leading-relaxed">
                Solid State, Surface Chemistry, States of Matter, Hydrogen, s-block, Metallurgy, Polymers, and Everyday Chemistry are <strong>excluded</strong>. Unit 20 Practical Chemistry (cation/anion salt analysis, titrations, functional groups) is high-yield.
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="font-bold text-[#121316] flex items-center gap-1.5">
                <Dna className="h-4 w-4 text-amber-600" />
                <span>Biology: 5 Families & Frog Anatomy</span>
              </div>
              <p className="leading-relaxed">
                Unit 2 explicitly includes <strong>Malvaceae, Cruciferae, Leguminosae, Compositae, Gramineae</strong> along with full anatomical systems of <strong>Frog (Rana tigrina)</strong>. Dengue and Chikungunya are tested in Unit 8.
              </p>
            </div>
          </div>
        </section>

        {/* Subjects Breakdown */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
              DISCIPLINE PORTFOLIO
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              NCERT Core Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {neetInfo.subjects.map((sub) => (
              <div
                key={sub.id}
                className="merit-card p-6 flex flex-col justify-between space-y-6"
              >
                <div>
                  <span className="rounded-full bg-[#F4F4F0] px-3 py-1 text-[11px] font-bold text-[#121316]">
                    45 Questions • 180 Marks
                  </span>
                  <h3 className="mt-4 text-xl font-bold font-sans text-[#121316]">{sub.name}</h3>
                  <div className="mt-2 space-y-1 text-xs text-[#52525B]">
                    <div>Class 11 & Class 12 Core NCERT</div>
                    <div>Calibrated diagnostic evaluation</div>
                  </div>
                </div>

                <Link
                  href="/practice"
                  className="pt-4 border-t border-[#E4E4DF] flex items-center justify-between text-xs font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors"
                >
                  <span>Practice with {sub.name}</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Official Interactive NEET Syllabus Explorer */}
        <section id="syllabus" className="pt-4">
          <NeetSyllabusExplorer />
        </section>
      </div>
    </div>
  );
}
