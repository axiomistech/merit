'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Clock, RotateCcw, ArrowRight, FileText, CheckCircle2 } from 'lucide-react';

export default function AttemptHistoryPage() {
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let list: any[] = [];
      const stored = localStorage.getItem('fort_student_attempts');
      if (stored) {
        try {
          list = JSON.parse(stored);
        } catch {}
      }

      const latest = localStorage.getItem('fort_latest_attempt');
      if (latest) {
        try {
          const parsedLatest = JSON.parse(latest);
          if (!list.some((a) => a.id === parsedLatest.id)) {
            list.push(parsedLatest);
          }
        } catch {}
      }

      setAttempts(list);
      setLoading(false);
    }
  }, []);

  return (
    <div className="liquid-canvas min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 left-1/3 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-10 right-1/4 h-72 w-72 opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#DCE2E6]/80 pb-6">
        <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
            Candidate Archive
          </span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
          My Attempts & Evaluated Papers
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
          Permanent audit log of your timed examination attempts, scorecards, and physical OMR sheets.
        </p>
      </div>

      {!loading && attempts.length === 0 ? (
        <div className="relative z-10 glass-polar rounded-[32px] p-12 text-center space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
            <RotateCcw className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold font-sans text-[#20252B]">
              No Examination Attempts Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#66727D] max-w-md mx-auto leading-relaxed">
              Your first attempt is waiting. Unlock a question paper and begin your examination.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/qp-prep"
              className="glass-racing-red inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <FileText className="h-4 w-4" />
              <span>Browse Question Papers</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-10 glass-polar rounded-[32px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4]/80 text-[#66727D]">
                <tr>
                  <th className="p-4 font-semibold">Attempt Hash</th>
                  <th className="p-4 font-semibold">Paper Name</th>
                  <th className="p-4 font-semibold">Date Completed</th>
                  <th className="p-4 font-semibold">Score</th>
                  <th className="p-4 font-semibold">Accuracy</th>
                  <th className="p-4 font-semibold">Time Spent</th>
                  <th className="p-4 font-semibold text-right">Solutions & OMR</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE2E6]/80 text-[#20252B]">
                {attempts.map((att) => (
                  <tr key={att.id} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#20252B]">{att.id}</td>
                    <td className="p-4 font-semibold text-[#20252B]">
                      {att.paperName || att.paperSlug || 'Examination Simulation'}
                    </td>
                    <td className="p-4 text-[#66727D]">
                      {att.completedAt ? new Date(att.completedAt).toLocaleDateString() : 'Recent'}
                    </td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">
                      {att.totalScore ?? att.score ?? 0} / {att.maxScore || 720}
                    </td>
                    <td className="p-4 font-mono text-[#20252B]">
                      {att.accuracy ? `${att.accuracy}%` : '--'}
                    </td>
                    <td className="p-4 font-mono text-[#66727D]">
                      {att.timeSpentSeconds
                        ? `${Math.floor(att.timeSpentSeconds / 60)}m ${att.timeSpentSeconds % 60}s`
                        : att.duration || 'Full Session'}
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/dashboard/results/${att.id}`}
                        className="inline-flex items-center gap-1 font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
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
      )}
    </div>
  );
}
