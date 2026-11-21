'use client';

import React, { useState } from 'react';
import { Award, CheckCircle2, Clock, UserCheck, Edit3, Shield, Search } from 'lucide-react';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminEvaluationsPage() {
  const [evaluations, setEvaluations] = useState([
    {
      id: 'eval_01',
      studentName: 'Rohan Deshmukh',
      registrationId: 'FORT-26-000004',
      exam: 'UPSC CSE Mains',
      paperName: 'GS Paper I: Indian Heritage and Geography',
      questionTitle: 'Discuss the impact of climate change on Himalayan glacial retreat (250 words)',
      submittedAt: 'Today, 11:30',
      evaluatorName: 'Senior Answer Evaluator',
      status: 'assigned',
      rubricScore: 'Pending',
      wordCount: 242,
    },
    {
      id: 'eval_02',
      studentName: 'Aarav Sharma',
      registrationId: 'FORT-26-000002',
      exam: 'JEE Advanced',
      paperName: 'Physics Paper 2 (Multi-Correct Partial Scoring)',
      questionTitle: 'Electromagnetic induction in rotating copper disc with eddy currents',
      submittedAt: 'Yesterday, 16:45',
      evaluatorName: 'System Engine',
      status: 'evaluated',
      rubricScore: '+3 (Partial Correct)',
      wordCount: null,
    },
  ]);

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
          <div className="w-full max-w-xl rounded-[28px] border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4 text-xs">
            <div className="border-b border-[#ECEAE4] pb-3">
              <span className="font-mono text-xs font-bold text-[#758B62]">
                {scoringModal.registrationId} • {scoringModal.exam}
              </span>
              <h3 className="text-lg font-bold font-serif text-[#263126]">
                Descriptive Answer Evaluation & Rubric
              </h3>
            </div>

            <div className="rounded-2xl bg-[#F7F5EF] p-4 border border-[#E6E5DE] space-y-2">
              <span className="font-bold text-[#73786E]">Prompt:</span>
              <p className="text-[#263126] font-medium">{scoringModal.questionTitle}</p>
            </div>

            <div className="space-y-1">
              <label className="block text-[#73786E] font-medium">Awarded Marks (out of 10):</label>
              <input
                type="number"
                max={10}
                min={0}
                value={scoreMarks}
                onChange={(e) => setScoreMarks(Number(e.target.value))}
                className="w-24 rounded-xl border border-[#E6E5DE] p-2 font-mono font-bold text-sm text-[#263126]"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-[#73786E] font-medium">Evaluator Feedback & Recommendations:</label>
              <textarea
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126]"
              />
            </div>

            <div className="pt-2 flex gap-3">
              <button
                type="button"
                onClick={() => setScoringModal(null)}
                className="flex-1 rounded-full border border-[#E6E5DE] py-2.5 font-semibold text-[#263126]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveEvaluation}
                className="flex-1 rounded-full bg-[#263126] py-2.5 font-bold text-white shadow-sm"
              >
                Submit & Publish Score
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#263126]">
            Descriptive Evaluation & Scoring Studio
          </h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Rubric-based assessment for UPSC Mains, partial marking schemes, and expert evaluator workload tracking.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E9EEE3] px-3.5 py-1 font-mono text-xs font-bold text-[#758B62]">
            {evaluations.length} Submissions Active
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-[28px] border border-[#E6E5DE] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#ECEAE4] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Candidate</th>
                <th className="py-3.5 px-6 font-semibold">Paper & Question</th>
                <th className="py-3.5 px-6 font-semibold">Submitted</th>
                <th className="py-3.5 px-6 font-semibold">Assigned Evaluator</th>
                <th className="py-3.5 px-6 font-semibold">Evaluation Status</th>
                <th className="py-3.5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4]">
              {evaluations.map((item) => (
                <tr key={item.id} className="hover:bg-[#F7F5EF]/50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#263126]">{item.studentName}</div>
                    <div className="font-mono text-[10px] text-[#92958D]">{item.registrationId}</div>
                  </td>
                  <td className="py-4 px-6 max-w-xs">
                    <div className="font-bold text-[#263126] truncate">{item.paperName}</div>
                    <div className="text-[11px] text-[#73786E] truncate">{item.questionTitle}</div>
                  </td>
                  <td className="py-4 px-6 text-[#73786E]">{item.submittedAt}</td>
                  <td className="py-4 px-6 font-medium text-[#263126]">{item.evaluatorName}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        item.status === 'evaluated'
                          ? 'bg-[#E9EEE3] text-[#758B62]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {item.status} ({item.rubricScore})
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button
                      onClick={() => handleOpenEvaluate(item)}
                      className="font-bold text-[#758B62] hover:underline"
                    >
                      {item.status === 'evaluated' ? 'Re-evaluate' : 'Grade Answer →'}
                    </button>
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
