'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  FileDown,
  Layers,
  ChevronRight,
} from 'lucide-react';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';

export default function StudentNeetDashboardPage() {
  const [selectedSubject, setSelectedSubject] = useState('physics');

  const subjects = [
    { slug: 'physics', name: 'Physics', chapters: ['Electrostatics & Gauss Law', 'Current Electricity', 'Ray Optics', 'Thermodynamics', 'Photoelectric Effect'], totalQuestions: 45 },
    { slug: 'chemistry', name: 'Chemistry', chapters: ['Chemical Bonding & Hybridization', 'Equilibrium', 'Coordination Compounds', 'Aldehydes & Ketones', 'Electrochemistry'], totalQuestions: 45 },
    { slug: 'botany', name: 'Botany', chapters: ['Photosynthesis C4 Pathway', 'Cell Division (Meiosis)', 'Plant Hormones', 'Mendelian Genetics', 'Ecosystem Energy Flow'], totalQuestions: 45 },
    { slug: 'zoology', name: 'Zoology', chapters: ['Human Circulatory System', 'Endocrine Feedback & LH Surge', 'Renal Countercurrent Mechanism', 'Homologous Organs', 'Immunology & IgA'], totalQuestions: 45 },
  ];

  const currentSubject = subjects.find((s) => s.slug === selectedSubject) || subjects[0];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-bold text-[#10B981]">
              FORT NEET (UG)
            </span>
            <span className="text-xs text-[#A7B0C0]">Physics • Chemistry • Botany • Zoology</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            NEET Preparation & Practice Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center gap-1.5 rounded-xl bg-[#6486C6] px-4 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <Clock className="h-4 w-4" />
            <span>Launch All India Mock (720 Marks)</span>
          </Link>
        </div>
      </div>

      {/* Quick Navigation Tabs for Subjects */}
      <div className="flex flex-wrap gap-2 border-b border-[#263554] pb-3">
        {subjects.map((sub) => (
          <button
            key={sub.slug}
            type="button"
            onClick={() => setSelectedSubject(sub.slug)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition-colors ${
              selectedSubject === sub.slug
                ? 'bg-[#6486C6] text-[#0B1020] shadow-sm'
                : 'bg-[#172033] text-[#A7B0C0] hover:text-[#F5F7FB]'
            }`}
          >
            {sub.name} ({sub.totalQuestions} Qs)
          </button>
        ))}
      </div>

      {/* Chapters & Concept Practice Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6486C6]">
            {currentSubject.name} — Atomic Concept Drill Sets
          </h2>
          <span className="text-xs text-[#7C8799]">NTA NCERT Curriculum</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentSubject.chapters.map((chapter, idx) => (
            <div
              key={idx}
              className="rounded-xl border border-[#263554] bg-[#11182A] p-5 flex flex-col justify-between hover:border-[#6486C6]/50 transition-colors"
            >
              <div>
                <div className="font-mono text-[11px] text-[#7C8799]">
                  Unit 0{idx + 1}
                </div>
                <h3 className="mt-2 text-sm font-bold text-[#F5F7FB]">{chapter}</h3>
                <p className="mt-1 text-xs text-[#A7B0C0]">
                  Single-correct MCQs, assertion-reason, and numerical practice.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#263554] pt-3 text-xs">
                <span className="text-[#10B981] font-semibold">+4 / -1 Marking</span>
                <Link
                  href="/exam/neet-demo"
                  className="font-bold text-[#6486C6] hover:underline flex items-center gap-1"
                >
                  <span>Practice Unit</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* NEET Live OMR Banner */}
      <div className="rounded-2xl border border-[#263554] bg-[#172033] p-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-bold text-[#6486C6]">
            PHYSICAL SIMULATION
          </span>
          <h3 className="mt-2 text-lg font-bold text-[#F5F7FB]">Dedicated OMR Shading Drill</h3>
          <p className="mt-1 text-xs text-[#A7B0C0] max-w-xl">
            Train your hand-eye coordination for physical bubble darkening before entering the
            examination hall. Download printable A4 vector response sheets.
          </p>
        </div>

        <Link
          href="/neet/omr-practice"
          className="rounded-xl bg-[#6486C6] px-5 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7] shrink-0"
        >
          Open OMR Shading Studio
        </Link>
      </div>
    </div>
  );
}
