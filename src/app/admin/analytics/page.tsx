'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  Clock,
  BookOpen,
  DollarSign,
  Download,
  Calendar,
  Layers,
  Percent,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');

  const handleExport = () => {
    toast.success('Performance analytics dataset exported (CSV format).');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-sans">Platform Performance Analytics</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Real-time candidate telemetry, exam distribution ratios, cognitive velocity, and revenue attribution.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {(['today', '7d', '30d', '90d', 'all'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-3 py-1.5 text-xs font-semibold rounded-xl border uppercase transition-colors',
                period === p
                  ? 'bg-[#20252B] text-white border-[#20252B]'
                  : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
              )}
            >
              {p}
            </button>
          ))}
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl border border-[#DCE2E6] bg-white text-[#20252B] hover:bg-[#F1F3F4] transition-colors ml-2"
          >
            <Download className="h-3.5 w-3.5" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Primary KPI Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Total Registrations</span>
            <Users className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">4,218</div>
          <div className="mt-1 flex items-center text-[10px] text-[#3B4C30] font-medium">
            <TrendingUp className="h-3 w-3 mr-1 text-[#9CC6E0]" />
            +18.4% vs previous {period}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Full Tests Taken</span>
            <Award className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">12,840</div>
          <div className="mt-1 flex items-center text-[10px] text-[#3B4C30] font-medium">
            <TrendingUp className="h-3 w-3 mr-1 text-[#9CC6E0]" />
            87.2% completion rate
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">₹84,920</div>
          <div className="mt-1 flex items-center text-[10px] text-[#3B4C30] font-medium">
            <TrendingUp className="h-3 w-3 mr-1 text-[#9CC6E0]" />
            ₹20.1 average revenue / candidate
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Average Accuracy</span>
            <Percent className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">64.2%</div>
          <div className="mt-1 text-[10px] text-[#66727D]">Across all attempted MCQs</div>
        </div>
      </div>

      {/* Two Column Visual Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Exam Attempt Distribution */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <h2 className="text-base font-bold text-[#20252B]">Exam Attempt Distribution</h2>
          <div className="space-y-3 pt-2">
            {[
              { name: 'NEET (UG) Medical', share: 58, count: '7,447 attempts', color: 'bg-[#9CC6E0]' },
              { name: 'JEE Main Engineering', share: 24, count: '3,081 attempts', color: 'bg-[#20252B]' },
              { name: 'JEE Advanced High-Yield', share: 11, count: '1,412 attempts', color: 'bg-[#52584E]' },
              { name: 'UPSC Civil Services', share: 7, count: '898 attempts', color: 'bg-[#8F9489]' },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#20252B]">{item.name}</span>
                  <span className="text-[#66727D] font-mono">{item.count} ({item.share}%)</span>
                </div>
                <div className="w-full bg-[#F1F3F4] h-2 rounded-full overflow-hidden">
                  <div className={cn('h-full rounded-full', item.color)} style={{ width: `${item.share}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Score Band Distribution (NEET 720 Standard) */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <h2 className="text-base font-bold text-[#20252B]">Score Bands Distribution (NEET 720 Marks)</h2>
          <div className="space-y-3 pt-2">
            {[
              { band: '650 - 720 (Top Tier / AIIMS / MAMC)', percent: 4.8, students: 357 },
              { band: '580 - 649 (State Govt Medical College)', percent: 18.2, students: 1355 },
              { band: '450 - 579 (Private / Deemed Colleges)', percent: 42.5, students: 3165 },
              { band: '300 - 449 (Improvement Required)', percent: 26.1, students: 1944 },
              { band: '< 300 (Fundamental Review Needed)', percent: 8.4, students: 626 },
            ].map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs">
                  <span className="font-semibold text-[#20252B]">{item.band}</span>
                  <span className="text-[#66727D] font-mono">{item.students} candidates ({item.percent}%)</span>
                </div>
                <div className="w-full bg-[#F1F3F4] h-2 rounded-full overflow-hidden">
                  <div className="bg-[#20252B] h-full rounded-full" style={{ width: `${item.percent * 2}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Subject Drop-Off & Cognitive Velocity */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
        <h2 className="text-base font-bold text-[#20252B]">Subject Diagnostic Accuracy & Cognitive Velocity</h2>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-3 font-semibold">Subject Discipline</th>
                <th className="p-3 font-semibold">Questions Solved</th>
                <th className="p-3 font-semibold">Average Accuracy</th>
                <th className="p-3 font-semibold">Avg Velocity / Question</th>
                <th className="p-3 font-semibold">Drop-off Rate</th>
                <th className="p-3 font-semibold">Status Rating</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {[
                { subject: 'Physics (Mechanics, Optics, Electrodynamics)', solved: '124,500', accuracy: '54.2%', speed: '68 sec', drop: '14.2%', rating: 'High Rigor' },
                { subject: 'Chemistry (Organic, Inorganic, Physical)', solved: '158,200', accuracy: '62.8%', speed: '48 sec', drop: '8.1%', rating: 'Optimal' },
                { subject: 'Biology (Botany, Zoology, Genetics)', solved: '280,400', accuracy: '74.6%', speed: '32 sec', drop: '4.5%', rating: 'Strong Mastery' },
                { subject: 'Mathematics (Calculus, Coordinate, Algebra)', solved: '86,100', accuracy: '49.1%', speed: '84 sec', drop: '18.8%', rating: 'High Friction' },
              ].map((row, idx) => (
                <tr key={idx} className="hover:bg-[#F1F3F4]/60">
                  <td className="p-3 font-semibold text-[#20252B]">{row.subject}</td>
                  <td className="p-3 font-mono text-[#52584E]">{row.solved}</td>
                  <td className="p-3 font-mono font-bold text-[#20252B]">{row.accuracy}</td>
                  <td className="p-3 font-mono text-[#52584E]">{row.speed}</td>
                  <td className="p-3 font-mono text-[#E4002B]">{row.drop}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F1F3F4] text-[#20252B] border border-[#DCE2E6]">
                      {row.rating}
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
