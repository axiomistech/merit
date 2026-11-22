'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Layers, ArrowRight, CheckCircle2, Cpu, Wrench, Zap, Building, Code, Database, FileText } from 'lucide-react';

export default function StudentGateDashboardPage() {
  const [selectedBranch, setSelectedBranch] = useState('cs');

  const branches = [
    {
      id: 'cs',
      name: 'Computer Science (CS)',
      icon: Code,
      subjects: ['Data Structures & Algorithms', 'Operating Systems', 'Database Management Systems', 'Theory of Computation', 'Computer Networks', 'Compiler Design'],
    },
    {
      id: 'da',
      name: 'Data Science & AI (DA)',
      icon: Database,
      subjects: ['Probability & Statistics', 'Linear Algebra', 'Machine Learning', 'AI & Search Algorithms', 'Data Warehousing'],
    },
    {
      id: 'ec',
      name: 'Electronics & Comm (EC)',
      icon: Cpu,
      subjects: ['Signals & Systems', 'Digital Circuits', 'Analog Circuits', 'Communications', 'Electromagnetics'],
    },
    {
      id: 'ee',
      name: 'Electrical Engg (EE)',
      icon: Zap,
      subjects: ['Electric Machines', 'Power Systems', 'Control Systems', 'Power Electronics', 'Electrical Measurements'],
    },
    {
      id: 'me',
      name: 'Mechanical Engg (ME)',
      icon: Wrench,
      subjects: ['Thermodynamics & Heat Transfer', 'Fluid Mechanics', 'Strength of Materials', 'Manufacturing', 'Theory of Machines'],
    },
    {
      id: 'ce',
      name: 'Civil Engg (CE)',
      icon: Building,
      subjects: ['Structural Analysis', 'Geotechnical Engineering', 'Environmental Engineering', 'Transportation', 'Hydrology'],
    },
  ];

  const currentBranch = branches.find((b) => b.id === selectedBranch) || branches[0];

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#121316]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E4DF] pb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3 py-1 text-xs font-semibold text-[#52525B]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
            <span>Graduate Aptitude Test in Engineering</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
            GATE Preparation Workspace
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            Branch-specific CBT test simulations with MCQ, MSQ, and NAT calculator parity.
          </p>
        </div>

        <Link
          href="/dashboard/qp-prep"
          className="btn-merit-primary px-5 py-2.5 text-xs font-bold uppercase tracking-wider"
        >
          <span>Browse GATE Papers (₹10/paper)</span>
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
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-semibold whitespace-nowrap transition-all border ${
                isSelected
                  ? 'border-[#121316] bg-[#121316] text-white shadow-xs'
                  : 'border-[#E4E4DF] bg-[#FFFFFF] text-[#52525B] hover:border-[#121316] hover:text-[#121316]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{b.name}</span>
            </button>
          );
        })}
      </div>

      {/* Current Branch Subjects Grid */}
      <div className="space-y-4">
        <h2 className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
          {currentBranch.name} — Core Subject Disciplines
        </h2>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {currentBranch.subjects.map((subj) => (
            <div key={subj} className="merit-card p-5 space-y-3">
              <div className="flex items-start justify-between">
                <span className="font-semibold text-sm text-[#121316]">{subj}</span>
                <span className="font-mono text-[10px] font-bold text-[#8C6D3B] bg-[#F7F3EB] px-2 py-0.5 rounded-full">
                  GATE
                </span>
              </div>
              <p className="text-xs text-[#71717A]">
                Full question sets with numerical integer fields and multi-select grading.
              </p>
              <Link
                href="/dashboard/qp-prep"
                className="inline-flex items-center gap-1 text-xs font-semibold text-[#121316] hover:text-[#8C6D3B] transition-colors pt-2"
              >
                <span>Find Papers in QP Prep</span>
                <span className="font-mono text-xs">↗</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
