'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Clock, UserCheck, Edit3, Shield, Search } from 'lucide-react';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminEvaluationsPage() {
  const [evaluations, setEvaluations] = useState<any[]>([]);

  const [scoringModal, setScoringModal] = useState<any>(null);
  const [scoreMarks, setScoreMarks] = useState(7);
  const [feedback, setFeedback] = useState('Clear introduction and structured arguments. Add more references to IPCC reports.');

  const handleOpenEvaluate = (item: any) => {
    setScoringModal(item);
  };

  const handleSaveEvaluation = () => {
    setEvaluations((prev) =>
      prev.map((e) =>
        e.id === scoringModal.id
          ? { ...e, status: 'evaluated', rubricScore: `${scoreMarks} / 10 Marks` }
          : e
      )
    );
    logAdminAction('submit_descriptive_evaluation', 'evaluation', scoringModal.id, `Awarded ${scoreMarks}/10 marks for ${scoringModal.studentName}`);
    toast.success(`Evaluation recorded and published to candidate dashboard.`);
    setScoringModal(null);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Scoring Modal */}
      {scoringModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4 text-xs">
            <div className="border-b border-[#DCE2E6] pb-3">
              <span className="font-mono text-xs font-bold text-[#20252B]">
                {scoringModal.registrationId} • {scoringModal.exam}
              </span>
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                Descriptive Answer Evaluation & Rubric
              </h3>
            </div>

            <div className="rounded-2xl bg-[#F1F3F4] p-4 border border-[#DCE2E6] space-y-2">
              <span className="font-bold text-[#66727D]">Prompt:</span>
              <p className="text-[#20252B] font-medium">{scoringModal.questionTitle}</p>
            </div>

            <div className="space-y-1">
              <label className="block text-[#66727D] font-medium">Awarded Marks (out of 10):</label>
              <input
                type="number"
                max={10}
                min={0}
                value={scoreMarks}
                onChange={(e) => setScoreMarks(Number(e.target.value))}
                className="w-24 rounded-xl border border-[#DCE2E6] p-2 font-mono font-bold text-sm text-[#20252B]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[#66727D] font-medium">Evaluator Feedback & Recommendations:</label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setScoringModal(null)}
                className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEvaluation}
                className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm"
              >
                Submit & Publish Score
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Descriptive Evaluation & Scoring Studio
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Rubric-based assessment for UPSC Mains, partial marking schemes, and expert evaluator workload tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E9EEF1] px-3.5 py-1 font-mono text-xs font-bold text-[#20252B]">
            {evaluations.length} Submissions Active
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Candidate</th>
                <th className="py-3.5 px-6 font-semibold">Paper & Question</th>
                <th className="py-3.5 px-6 font-semibold">Submitted</th>
                <th className="py-3.5 px-6 font-semibold">Assigned Evaluator</th>
                <th className="py-3.5 px-6 font-semibold">Evaluation Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {evaluations.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#66727D]">
                    No evaluations pending or submitted yet.
                  </td>
                </tr>
              ) : (
                evaluations.map((item) => (
                  <tr key={item.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                    <td className="py-4 px-6">
                      <div className="font-bold text-[#20252B]">{item.studentName}</div>
                      <div className="font-mono text-[10px] text-[#66727D]">{item.registrationId}</div>
                    </td>
                    <td className="py-4 px-6 max-w-xs">
                      <div className="font-bold text-[#20252B] truncate">{item.paperName}</div>
                      <div className="text-[11px] text-[#66727D] truncate">{item.questionTitle}</div>
                    </td>
                    <td className="py-4 px-6 text-[#66727D]">{item.submittedAt}</td>
                    <td className="py-4 px-6 font-medium text-[#20252B]">{item.evaluatorName}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                          item.status === 'evaluated'
                            ? 'bg-[#E9EEF1] text-[#20252B]'
                            : 'bg-[#FEF3C7] text-[#92400E]'
                        }`}
                      >
                        {item.status} ({item.rubricScore})
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <button
                        onClick={() => handleOpenEvaluate(item)}
                        className="font-bold text-[#20252B] hover:underline"
                      >
                        {item.status === 'evaluated' ? 'Re-evaluate' : 'Grade Answer →'}
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
