'use client';

import React from 'react';
import Link from 'next/link';
import { Clock, Award, FileDown, CheckCircle2, ArrowRight } from 'lucide-react';
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
      status: 'Evaluated',
    },
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#ECEAE4] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#758B62]">
          Candidate Archive
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
          Attempt History & Evaluated Papers
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
          Permanent audit log of your timed examination attempts, scorecards, and physical OMR sheets.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Attempt Hash</th>
                <th className="p-4 font-semibold">Paper Name</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold">Accuracy</th>
                <th className="p-4 font-semibold">Duration</th>
                <th className="p-4 font-semibold text-right">Solutions & OMR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4] text-[#2E332D]">
              {attempts.map((att) => (
                <tr key={att.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#758B62]">{att.id}</td>
                  <td className="p-4 font-semibold text-[#263126]">{att.paperName}</td>
                  <td className="p-4 text-[#73786E]">{att.date}</td>
                  <td className="p-4 font-mono font-bold text-[#263126]">{att.score}</td>
                  <td className="p-4 font-mono text-[#73786E]">{att.accuracy}</td>
                  <td className="p-4 font-mono text-[#73786E]">{att.duration}</td>
                  <td className="p-4 text-right">
                    <Link
                      href={`/dashboard/results/${att.id}`}
                      className="inline-flex items-center gap-1 font-bold text-[#758B62] hover:text-[#263126] transition-colors"
                    >
                      <span>View Report</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
