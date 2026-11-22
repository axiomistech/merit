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
import { EXAMINATIONS } from '@/data/seedData';

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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-[#E9EEF1] px-2.5 py-1 text-xs font-bold text-[#20252B]">
              NEET (UG) Medical
            </span>
            <span className="text-xs text-[#66727D]">Physics • Chemistry • Botany • Zoology</span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B]">
            NEET Preparation & Practice Studio
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-5 py-2.5 text-xs font-bold text-[#20252B] shadow-soft hover:bg-[#8fa27a] transition-all"
          >
            <Clock className="h-4 w-4" />
            <span>Launch All India Mock (720 Marks)</span>
          </Link>
        </div>
      </div>

      {/* Quick Navigation Tabs for Subjects */}
      <div className="flex flex-wrap gap-2 border-b border-[#DCE2E6] pb-4">
        {subjects.map((sub) => (
          <button
            key={sub.slug}
            type="button"
            onClick={() => setSelectedSubject(sub.slug)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              selectedSubject === sub.slug
                ? 'bg-[#9CC6E0] text-[#20252B] shadow-soft'
                : 'bg-white text-[#66727D] border border-[#DCE2E6] hover:bg-[#F1F3F4]'
            }`}
          >
            {sub.name} ({sub.totalQuestions} Qs)
          </button>
        ))}
      </div>

      {/* Chapters & Concept Practice Cards */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
            {currentSubject.name} — Atomic Concept Drill Sets
          </h2>
          <span className="text-xs text-[#66727D]">NCERT Curriculum</span>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentSubject.chapters.map((chapter, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-[#DCE2E6] bg-white p-6 flex flex-col justify-between shadow-soft hover:border-[#9CC6E0] transition-colors"
            >
              <div>
                <div className="font-mono text-[11px] text-[#66727D]">
                  Unit 0{idx + 1}
                </div>
                <h3 className="mt-2 text-sm font-bold text-[#20252B]">{chapter}</h3>
                <p className="mt-1 text-xs text-[#66727D] leading-relaxed">
                  Single-correct MCQs, assertion-reason, and numerical practice.
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-[#DCE2E6] pt-3 text-xs">
                <span className="text-[#20252B] font-semibold">+4 / -1 Marking</span>
                <Link
                  href="/exam/neet-demo"
                  className="font-bold text-[#20252B] hover:text-[#20252B] flex items-center gap-1"
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
      <div className="rounded-3xl border border-[#DCE2E6] bg-white p-7 shadow-soft flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <span className="rounded-lg bg-[#E9EEF1] px-2.5 py-1 text-xs font-bold text-[#20252B]">
            PHYSICAL SIMULATION
          </span>
          <h3 className="mt-2 text-lg font-bold text-[#20252B]">Dedicated OMR Shading Drill</h3>
          <p className="mt-1 text-xs text-[#66727D] max-w-xl leading-relaxed">
            Train your hand-eye coordination for physical bubble darkening before entering the
            examination hall. Download printable A4 vector response sheets.
          </p>
        </div>

        <Link
          href="/neet/omr-practice"
          className="rounded-xl bg-[#9CC6E0] px-6 py-3 text-xs font-bold text-[#20252B] shadow-soft hover:bg-[#8fa27a] shrink-0"
        >
          Open OMR Shading Studio
        </Link>
      </div>
    </div>
  );
}
