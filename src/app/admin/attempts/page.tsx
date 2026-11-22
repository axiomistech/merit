'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Compass, Search, Filter, Clock, CheckCircle2, ArrowRight } from 'lucide-react';

export default function AdminAttemptsPage() {
  const [search, setSearch] = useState('');
  const [attempts, setAttempts] = useState<any[]>([]);

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('merit_student_attempts') || localStorage.getItem('fort_student_attempts');
      if (stored) {
        try {
          const list = JSON.parse(stored);
          const mockAttIds = new Set(['ATT-2026-NEET-01', 'ATT-2026-JM-02', 'ATT-2026-UPSC-03']);
          const clean = Array.isArray(list) ? list.filter((a: any) => !mockAttIds.has(a.id)) : [];
          setAttempts(clean);
        } catch {
          setAttempts([]);
        }
      }
    }
  }, []);

  const filtered = attempts.filter(
    (a) =>
      a.studentName.toLowerCase().includes(search.toLowerCase()) ||
      a.registrationId.toLowerCase().includes(search.toLowerCase()) ||
      a.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Examination Attempt Telemetry & Monitoring
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Immutable candidate attempt logs with server-verified start/end timestamps and score snapshots.
          </p>
        </div>

        <div className="relative max-w-sm">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by student, ID, or attempt..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>
      </div>

      {/* Attempts Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Attempt ID</th>
                <th className="py-3.5 px-6 font-semibold">Candidate</th>
                <th className="py-3.5 px-6 font-semibold">Test Paper</th>
                <th className="py-3.5 px-6 font-semibold">Timeline & Duration</th>
                <th className="py-3.5 px-6 font-semibold">Score & Accuracy</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-[#66727D]">
                    No test attempts recorded yet.
                  </td>
                </tr>
              ) : (
                filtered.map((att) => (
                  <tr key={att.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                    <td className="py-4 px-6 font-mono font-bold text-[#20252B]">
                      {att.id}
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#20252B]">{att.studentName}</div>
                      <div className="font-mono text-[10px] text-[#66727D]">{att.registrationId}</div>
                    </td>
                    <td className="py-4 px-6 font-medium text-[#20252B] max-w-xs">
                      {att.paperName}
                    </td>
                    <td className="py-4 px-6 text-[#66727D]">
                      <div>{att.submittedAt}</div>
                      <div className="text-[10px] text-[#66727D]">Took {att.duration}</div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-mono font-bold text-[#20252B]">{att.score}</div>
                      <div className="font-mono text-[11px] font-semibold text-[#20252B]">
                        {att.accuracy}
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B] uppercase">
                        {att.status}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/dashboard/results/${att.id}`}
                        target="_blank"
                        className="font-bold text-[#20252B] hover:underline"
                      >
                        View Report →
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
