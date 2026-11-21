'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookOpen, Layers, ArrowRight, CheckCircle2, Cpu, Wrench, Zap, Building, Code } from 'lucide-react';

export default function StudentEngineeringDashboardPage() {
  const [selectedBranch, setSelectedBranch] = useState('cse');

  const branches = [
    { id: 'cse', name: 'Computer Science', icon: Code, subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management', 'Theory of Computation'] },
    { id: 'ece', name: 'Electronics & Comm', icon: Cpu, subjects: ['Signals & Systems', 'Digital Signal Processing', 'Microprocessors & Microcontrollers', 'Analog Circuits'] },
    { id: 'ee', name: 'Electrical Engineering', icon: Zap, subjects: ['Electric Machines', 'Power Systems Analysis', 'Control Systems', 'Power Electronics'] },
    { id: 'me', name: 'Mechanical Engineering', icon: Wrench, subjects: ['Thermodynamics & Heat Transfer', 'Fluid Mechanics', 'Strength of Materials', 'Theory of Machines'] },
    { id: 'ce', name: 'Civil Engineering', icon: Building, subjects: ['Structural Analysis', 'Geotechnical Engineering', 'Transportation Engineering', 'Hydrology & Water Resources'] },
  ];

  const currentBranchData = branches.find((b) => b.id === selectedBranch) || branches[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
            <span>University Examination & GATE Foundation</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
            Engineering Practice Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
            University semester test simulations, conceptual derivations, and GATE syllabus questions.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#8ea07a] transition-all"
        >
          <span>Unlock Engineering Papers (₹10/paper)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Branch Selector Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {branches.map((b) => {
          const Icon = b.icon;
          const isSelected = selectedBranch === b.id;
          return (
            <button
              key={b.id}
              onClick={() => setSelectedBranch(b.id)}
              className={`flex items-center gap-2 rounded-xl border px-4 py-2 text-xs font-semibold transition-all whitespace-nowrap ${
                isSelected
                  ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                  : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/50'
              }`}
            >
              <Icon className="h-4 w-4 text-[#758B62]" />
              <span>{b.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Branch Overview */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#92958D]">Discipline Curriculum</div>
            <h2 className="text-xl font-bold text-[#263126] font-serif">{currentBranchData.name} Core Subjects</h2>
          </div>
          <span className="text-xs text-[#73786E]">Updated for AICTE Model Curriculum 2026</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentBranchData.subjects.map((sub, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 transition-all hover:bg-white hover:border-[#9CAF88]"
            >
              <div>
                <h4 className="text-sm font-bold text-[#263126]">{sub}</h4>
                <p className="mt-0.5 text-xs text-[#73786E]">Mid-Sem & End-Sem Solved Problems</p>
              </div>
              <Link
                href="/dashboard"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#758B62] border border-[#E6E5DE] hover:border-[#9CAF88]"
              >
                Practice
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
