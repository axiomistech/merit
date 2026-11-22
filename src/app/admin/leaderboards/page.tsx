'use client';

import React, { useState } from 'react';
import {
  Trophy,
  Search,
  Shield,
  Eye,
  EyeOff,
  AlertTriangle,
  CheckCircle2,
  Filter,
  Save,
  Ban,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

interface LeaderboardEntry {
  rank: number;
  candidateName: string;
  registrationId: string;
  exam: string;
  score: number;
  totalMarks: number;
  accuracy: number;
  durationSeconds: number;
  attemptDate: string;
  isDisqualified: boolean;
}

export default function AdminLeaderboardsPage() {
  const [examFilter, setExamFilter] = useState('neet');
  const [maskCandidateNames, setMaskCandidateNames] = useState(false);
  const [minScoreThreshold, setMinScoreThreshold] = useState(300);
  const [isLeaderboardPublic, setIsLeaderboardPublic] = useState(true);

  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);

  const handleToggleDisqualify = (regId: string) => {
    const updated = entries.map((e) =>
      e.registrationId === regId ? { ...e, isDisqualified: !e.isDisqualified } : e
    );
    setEntries(updated);
    const target = entries.find((e) => e.registrationId === regId);
    const nextState = !target?.isDisqualified;
    logAdminAction({
      action: nextState ? 'CANDIDATE_DISQUALIFIED' : 'CANDIDATE_REINSTATED',
      resource_type: 'leaderboard',
      resource_id: regId,
      change_summary: `${nextState ? 'Disqualified' : 'Reinstated'} attempt ${regId} from rankings`,
    });
    toast.info(`Candidate ${regId} ${nextState ? 'disqualified' : 'reinstated'} from leaderboard.`);
  };

  const handleSaveSettings = () => {
    logAdminAction({
      action: 'LEADERBOARD_SETTINGS_UPDATED',
      resource_type: 'leaderboard',
      change_summary: `Updated leaderboard settings. Public: ${isLeaderboardPublic}, Masked Names: ${maskCandidateNames}, Min Score: ${minScoreThreshold}`,
    });
    toast.success('Leaderboard moderation settings saved.');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-sans">Leaderboard Moderation & Integrity</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Rankings configuration, privacy masking controls, anomaly detection, and attempt disqualification.
          </p>
        </div>
        <button
          onClick={handleSaveSettings}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Leaderboard Settings
        </button>
      </div>

      {/* Moderation Controls Card */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
        <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#9CC6E0]" />
          Integrity & Display Parameters
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          <div className="flex items-center justify-between p-4 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4]/40">
            <div>
              <div className="text-xs font-bold text-[#20252B]">Public Visibility</div>
              <div className="text-[11px] text-[#66727D]">Show rankings in student portal</div>
            </div>
            <input
              type="checkbox"
              checked={isLeaderboardPublic}
              onChange={(e) => setIsLeaderboardPublic(e.target.checked)}
              className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4]/40">
            <div>
              <div className="text-xs font-bold text-[#20252B]">Candidate Anonymity</div>
              <div className="text-[11px] text-[#66727D]">Mask names with Registration IDs</div>
            </div>
            <input
              type="checkbox"
              checked={maskCandidateNames}
              onChange={(e) => setMaskCandidateNames(e.target.checked)}
              className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
            />
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4]/40">
            <div>
              <div className="text-xs font-bold text-[#20252B]">Min. Score Cutoff</div>
              <div className="text-[11px] text-[#66727D]">Hide results below marks</div>
            </div>
            <div className="flex items-center gap-1">
              <input
                type="number"
                value={minScoreThreshold}
                onChange={(e) => setMinScoreThreshold(Number(e.target.value))}
                className="w-16 rounded-lg border border-[#DCE2E6] bg-white p-1 text-xs font-mono font-bold text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="p-4 border-b border-[#DCE2E6] flex items-center justify-between">
          <h2 className="text-sm font-bold text-[#20252B]">All-India Live Rankings (NEET 2026 Simulation)</h2>
          <div className="text-xs text-[#66727D]">Showing verified attempts</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-4 font-semibold">Rank</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Score</th>
                <th className="p-4 font-semibold">Accuracy</th>
                <th className="p-4 font-semibold">Velocity</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Moderation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {entries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#66727D]">
                    No leaderboard rankings available yet.
                  </td>
                </tr>
              ) : (
                entries.map((e) => (
                  <tr
                    key={e.registrationId}
                    className={cn(
                      'hover:bg-[#F1F3F4]/60 transition-colors',
                      e.isDisqualified && 'bg-[#E4002B]/5 text-[#66727D]'
                    )}
                  >
                    <td className="p-4 font-bold font-mono text-sm text-[#20252B]">
                      {e.isDisqualified ? '—' : `#${e.rank}`}
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-[#20252B]">
                        {maskCandidateNames ? `${e.registrationId.substring(0, 10)}****` : e.candidateName}
                      </div>
                      <div className="font-mono text-[10px] text-[#66727D]">{e.registrationId}</div>
                    </td>
                    <td className="p-4 font-bold font-mono text-[#20252B]">
                      {e.score} / {e.totalMarks}
                    </td>
                    <td className="p-4 font-mono font-medium text-[#20252B]">{e.accuracy}%</td>
                    <td className="p-4 font-mono text-[#52584E]">
                      {Math.round(e.durationSeconds / 60)} mins
                      {e.durationSeconds < 600 && (
                        <span className="block text-[10px] text-[#E4002B] font-bold">Anomaly: Fast</span>
                      )}
                    </td>
                    <td className="p-4">
                      {e.isDisqualified ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#E4002B]/15 text-[#E4002B]">
                          Disqualified
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#9CC6E0]/20 text-[#3B4C30]">
                          Verified
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleToggleDisqualify(e.registrationId)}
                        className={cn(
                          'px-2.5 py-1 text-xs font-semibold rounded-lg border transition-colors',
                          e.isDisqualified
                            ? 'border-[#9CC6E0] text-[#3B4C30] hover:bg-[#9CC6E0]/20'
                            : 'border-[#E4002B]/30 text-[#E4002B] hover:bg-[#E4002B]/10'
                        )}
                      >
                        {e.isDisqualified ? 'Reinstate' : 'Disqualify'}
                      </button>
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
