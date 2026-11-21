'use client';

import React from 'react';
import Link from 'next/link';
import { FileText, Plus, CheckCircle2 } from 'lucide-react';
import { SAMPLE_NEET_PAPER } from '@/data/seedData';
import { SAMPLE_JEE_MAIN_PAPER } from '@/data/otherExamsData';

export default function AdminQuestionPapersPage() {
  const papers = [
    {
      id: SAMPLE_NEET_PAPER.id,
      name: SAMPLE_NEET_PAPER.name,
      exam: 'NEET (UG)',
      duration: '200 Mins',
      marks: 720,
      price: '₹10 (Free Eligible)',
      status: 'published',
    },
    {
      id: SAMPLE_JEE_MAIN_PAPER.id,
      name: SAMPLE_JEE_MAIN_PAPER.name,
      exam: 'JEE Main',
      duration: '180 Mins',
      marks: 300,
      price: '₹10 (Free Eligible)',
      status: 'published',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#F5F7FB]">Question Paper Builder</h1>
          <p className="text-xs text-[#A7B0C0]">
            Assemble mock tests, manage duration, blueprints, and publication states.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#1D2940] bg-[#11182A] text-[#A7B0C0]">
            <tr>
              <th className="p-4">Paper Identifier</th>
              <th className="p-4">Name</th>
              <th className="p-4">Exam</th>
              <th className="p-4">Duration</th>
              <th className="p-4">Max Marks</th>
              <th className="p-4">Pricing</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2940]">
            {papers.map((p) => (
              <tr key={p.id} className="hover:bg-[#11182A]/50">
                <td className="p-4 font-mono text-[#6486C6]">{p.id}</td>
                <td className="p-4 font-semibold text-[#F5F7FB]">{p.name}</td>
                <td className="p-4">{p.exam}</td>
                <td className="p-4 font-mono">{p.duration}</td>
                <td className="p-4 font-mono font-bold text-[#F5F7FB]">{p.marks}</td>
                <td className="p-4 text-[#10B981]">{p.price}</td>
                <td className="p-4">
                  <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#10B981] uppercase">
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
