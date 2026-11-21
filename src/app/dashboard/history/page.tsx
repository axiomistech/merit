'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Award, FileDown } from 'lucide-react';
import { SAMPLE_NEET_PAPER } from '@/data/seedData';

export default function AttemptHistoryPage() {
  const attempts = [
    {
      id: 'ATT-2026-NEET-01',
      paperName: SAMPLE_NEET_PAPER.name,
      date: '2026-11-21',
      score: '52 / 80',
      accuracy: '75%',
      duration: '01:04:00',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-[#263554] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
          Candidate Archive
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
          Attempt History & Evaluated Papers
        </h1>
        <p className="text-xs text-[#A7B0C0]">
          Permanent record of your timed examination attempts and OMR sheets.
        </p>
      </div>

      <div className="rounded-xl border border-[#263554] bg-[#11182A] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#263554] bg-[#172033] text-[#A7B0C0]">
            <tr>
              <th className="p-4">Attempt Hash</th>
              <th className="p-4">Paper Name</th>
              <th className="p-4">Date</th>
              <th className="p-4">Score</th>
              <th className="p-4">Accuracy</th>
              <th className="p-4">Time Spent</th>
              <th className="p-4 text-right">Solutions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263554]">
            {attempts.map((att) => (
              <tr key={att.id} className="hover:bg-[#1D2940]/50">
                <td className="p-4 font-mono font-bold text-[#6486C6]">{att.id}</td>
                <td className="p-4 font-semibold text-[#F5F7FB]">{att.paperName}</td>
                <td className="p-4 text-[#A7B0C0]">{att.date}</td>
                <td className="p-4 font-mono font-bold text-[#10B981]">{att.score}</td>
                <td className="p-4 font-mono text-[#F5F7FB]">{att.accuracy}</td>
                <td className="p-4 font-mono text-[#A7B0C0]">{att.duration}</td>
                <td className="p-4 text-right">
                  <Link
                    href={`/dashboard/results/${att.id}`}
                    className="font-bold text-[#6486C6] hover:underline"
                  >
                    View Report & OMR
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
