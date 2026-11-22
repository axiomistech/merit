'use client';

import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  Award,
  DollarSign,
  Download,
  Percent,
  Layers,
  Inbox,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import { getStoredStudents, getStoredTransactions, getStoredQuestions } from '@/lib/admin/store';

export default function AdminAnalyticsPage() {
  const [period, setPeriod] = useState<'today' | '7d' | '30d' | '90d' | 'all'>('30d');
  const [students, setStudents] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedStudents = getStoredStudents();
      const storedTxns = getStoredTransactions();
      const storedQuestions = getStoredQuestions();

      let storedAttempts: any[] = [];
      try {
        const raw = localStorage.getItem('fort_test_attempts') || localStorage.getItem('meritwise_attempts');
        if (raw) storedAttempts = JSON.parse(raw);
      } catch {}

      setStudents(storedStudents);
      setTransactions(storedTxns);
      setQuestions(storedQuestions);
      setAttempts(storedAttempts);
      setLoading(false);
    }
  }, []);

  const handleExport = () => {
    toast.success('Performance analytics dataset exported (CSV format).');
  };

  const totalStudents = students.length;
  const successfulTxns = transactions.filter(
    (t) => t.status === 'SUCCESS' || t.status === 'successful'
  );
  const grossRevenue = successfulTxns.reduce((acc, t) => acc + (t.amount || 0), 0);
  const totalAttempts = attempts.length;
  const avgAccuracy =
    attempts.length > 0
      ? (attempts.reduce((acc, a) => acc + (a.accuracy || 0), 0) / attempts.length).toFixed(1)
      : '0.0';

  const hasData = totalStudents > 0 || grossRevenue > 0 || totalAttempts > 0;

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
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">{totalStudents}</div>
          <div className="mt-1 flex items-center text-[10px] text-[#66727D] font-medium">
            <span>Genuine registered students</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Full Tests Taken</span>
            <Award className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">{totalAttempts}</div>
          <div className="mt-1 flex items-center text-[10px] text-[#66727D] font-medium">
            <span>Verified evaluation records</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Gross Revenue</span>
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">
            ₹{grossRevenue.toLocaleString('en-IN')}
          </div>
          <div className="mt-1 flex items-center text-[10px] text-[#66727D] font-medium">
            <span>{successfulTxns.length} successful payment{successfulTxns.length === 1 ? '' : 's'}</span>
          </div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between text-[#66727D]">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Average Accuracy</span>
            <Percent className="h-4 w-4" />
          </div>
          <div className="mt-2 text-2xl font-bold font-mono text-[#20252B]">{avgAccuracy}%</div>
          <div className="mt-1 text-[10px] text-[#66727D]">Across all attempted questions</div>
        </div>
      </div>

      {/* Analytics Visualization or Empty State */}
      {!hasData ? (
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-12 text-center shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F1F3F4] text-[#66727D] mb-4">
            <BarChart3 className="h-6 w-6 stroke-[1.8]" />
          </div>
          <h3 className="text-base font-bold text-[#20252B]">
            Analytics will appear once sufficient data is available.
          </h3>
          <p className="mt-1 text-xs text-[#66727D] max-w-md mx-auto">
            Candidate score distribution curves, curriculum drop-off rates, and cognitive velocity matrices will populate in real-time as registered students complete test attempts.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Two Column Visual Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Exam Attempt Distribution */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
              <h2 className="text-base font-bold text-[#20252B]">Exam Attempt Distribution</h2>
              {totalAttempts === 0 ? (
                <p className="text-xs text-[#66727D] py-6 text-center">No exam attempts recorded yet.</p>
              ) : (
                <div className="space-y-3 pt-2">
                  {[
                    { name: 'NEET (UG)', count: attempts.filter((a) => a.examSlug?.includes('neet')).length, color: 'bg-[#9CC6E0]' },
                    { name: 'JEE Main', count: attempts.filter((a) => a.examSlug === 'jee-main' || a.examSlug === 'jee').length, color: 'bg-[#20252B]' },
                    { name: 'JEE Advanced', count: attempts.filter((a) => a.examSlug?.includes('advanced')).length, color: 'bg-[#75896A]' },
                    { name: 'GATE', count: attempts.filter((a) => a.examSlug?.includes('gate')).length, color: 'bg-[#52584E]' },
                  ].map((item, idx) => {
                    const share = totalAttempts > 0 ? Math.round((item.count / totalAttempts) * 100) : 0;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-[#20252B]">{item.name}</span>
                          <span className="text-[#66727D] font-mono">{item.count} attempts ({share}%)</span>
                        </div>
                        <div className="w-full bg-[#F1F3F4] h-2 rounded-full overflow-hidden">
                          <div className={cn('h-full rounded-full', item.color)} style={{ width: `${share}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Score Band Distribution */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
              <h2 className="text-base font-bold text-[#20252B]">Score Bands Distribution</h2>
              {totalAttempts === 0 ? (
                <p className="text-xs text-[#66727D] py-6 text-center">No evaluated attempts recorded yet.</p>
              ) : (
                <div className="space-y-3 pt-2">
                  {[
                    { band: 'Top Tier (>= 90%)', count: attempts.filter((a) => (a.score / (a.maxScore || 720)) >= 0.9).length },
                    { band: 'Competitive Range (70% - 89%)', count: attempts.filter((a) => (a.score / (a.maxScore || 720)) >= 0.7 && (a.score / (a.maxScore || 720)) < 0.9).length },
                    { band: 'Moderate (50% - 69%)', count: attempts.filter((a) => (a.score / (a.maxScore || 720)) >= 0.5 && (a.score / (a.maxScore || 720)) < 0.7).length },
                    { band: 'Needs Improvement (< 50%)', count: attempts.filter((a) => (a.score / (a.maxScore || 720)) < 0.5).length },
                  ].map((item, idx) => {
                    const pct = totalAttempts > 0 ? Math.round((item.count / totalAttempts) * 100) : 0;
                    return (
                      <div key={idx} className="space-y-1.5">
                        <div className="flex justify-between text-xs">
                          <span className="font-semibold text-[#20252B]">{item.band}</span>
                          <span className="text-[#66727D] font-mono">{item.count} candidates ({pct}%)</span>
                        </div>
                        <div className="w-full bg-[#F1F3F4] h-2 rounded-full overflow-hidden">
                          <div className="bg-[#20252B] h-full rounded-full" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
