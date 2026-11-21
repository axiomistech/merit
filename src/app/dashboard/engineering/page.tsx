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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-semibold text-[#20252B]">
            <span>University Examination & GATE Foundation</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            Engineering Practice Studio
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            University semester test simulations, conceptual derivations, and GATE syllabus questions.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-5 py-2.5 text-xs font-bold text-[#20252B] shadow-sm hover:bg-[#C90026] transition-all"
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
                  ? 'border-[#9CC6E0] bg-[#E9EEF1] text-[#20252B]'
                  : 'border-[#DCE2E6] bg-white text-[#66727D] hover:border-[#9CC6E0]/50'
              }`}
            >
              <Icon className="h-4 w-4 text-[#20252B]" />
              <span>{b.name}</span>
            </button>
          );
        })}
      </div>

      {/* Selected Branch Overview */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
          <div>
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">Discipline Curriculum</div>
            <h2 className="text-xl font-bold text-[#20252B] font-sans">{currentBranchData.name} Core Subjects</h2>
          </div>
          <span className="text-xs text-[#66727D]">Updated for AICTE Model Curriculum 2026</span>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {currentBranchData.subjects.map((sub, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 transition-all hover:bg-white hover:border-[#9CC6E0]"
            >
              <div>
                <h4 className="text-sm font-bold text-[#20252B]">{sub}</h4>
                <p className="mt-0.5 text-xs text-[#66727D]">Mid-Sem & End-Sem Solved Problems</p>
              </div>
              <Link
                href="/dashboard"
                className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-[#20252B] border border-[#DCE2E6] hover:border-[#9CC6E0]"
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
