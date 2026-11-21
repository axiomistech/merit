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
          <h1 className="text-2xl font-bold text-[#20252B] font-sans">Question Paper Builder</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Assemble mock tests, manage duration, blueprints, and publication states.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-4 font-semibold">Paper Identifier</th>
                <th className="p-4 font-semibold">Name</th>
                <th className="p-4 font-semibold">Exam</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold">Max Marks</th>
                <th className="p-4 font-semibold">Pricing</th>
                <th className="p-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6] text-[#20252B]">
              {papers.map((p) => (
                <tr key={p.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#20252B]">{p.id}</td>
                  <td className="p-4 font-semibold text-[#20252B]">{p.name}</td>
                  <td className="p-4 text-[#66727D]">{p.exam}</td>
                  <td className="p-4 font-mono text-[#66727D]">{p.duration}</td>
                  <td className="p-4 font-mono font-bold text-[#20252B]">{p.marks}</td>
                  <td className="p-4 text-[#20252B] font-semibold">{p.price}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B] uppercase">
                      {p.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
