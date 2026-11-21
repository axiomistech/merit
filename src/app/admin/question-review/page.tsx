'use client';

import React, { useState } from 'react';
import {
  CheckSquare,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
  Eye,
  Filter,
} from 'lucide-react';
import { MathText } from '@/components/ui/MathText';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

interface ReviewQueueItem {
  id: string;
  questionId: string;
  subjectName: string;
  conceptName: string;
  questionText: string;
  reportedBy: string;
  issueCategory: 'reported_by_student' | 'incorrect_answer' | 'missing_explanation' | 'duplicate_suspected';
  reason: string;
  timestamp: string;
  status: 'pending' | 'resolved' | 'rejected';
}

export default function AdminQuestionReviewPage() {
  const [items, setItems] = useState<ReviewQueueItem[]>([
    {
      id: 'rev_01',
      questionId: 'q_neet_14',
      subjectName: 'Physics',
      conceptName: 'Ray Optics & Mirrors',
      questionText: 'A concave mirror of focal length $f = 20\\text{ cm}$ produces an image twice the height of the object. Calculate the possible object distances $u$.',
      reportedBy: 'priya.iyer@example.com (FORT-26-000003)',
      issueCategory: 'reported_by_student',
      reason: 'Candidate suspects sign convention in real vs virtual magnification cases should explicitly state both $u = -10\\text{ cm}$ and $u = -30\\text{ cm}$.',
      timestamp: 'Today, 14:20',
      status: 'pending',
    },
    {
      id: 'rev_02',
      questionId: 'q_chem_09',
      subjectName: 'Chemistry',
      conceptName: 'Coordination Compounds',
      questionText: 'Identify the magnetic nature and hybridization of $[\\text{Fe}(\\text{CN})_6]^{3-}$ according to Valence Bond Theory.',
      reportedBy: 'Quality Assurance Audit Bot',
      issueCategory: 'missing_explanation',
      reason: 'Explanation lacks detailed electron spin pairing diagram in $d$-orbitals.',
      timestamp: 'Yesterday, 18:00',
      status: 'pending',
    },
  ]);

  const handleApprove = (id: string, qId: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'resolved' } : item)));
    logAdminAction('approve_reported_question', 'question', qId, `Approved and resolved review ticket ${id}`);
    toast.success(`Question review ticket ${id} marked as resolved.`);
  };

  const handleRejectReport = (id: string, qId: string) => {
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, status: 'rejected' } : item)));
    logAdminAction('dismiss_question_report', 'question', qId, `Dismissed false report ${id}`);
    toast.info(`Report dismissed. Question reaffirmed as academically verified.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#20252B]">
            Question Review & Quality Assurance Queue
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Review flagged questions, student grievance reports, and ambiguous scientific solution discrepancies.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-xs font-bold text-[#20252B]">
            {items.filter((i) => i.status === 'pending').length} Pending Review
          </span>
        </div>
      </div>

      {/* Review Queue Items */}
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-7 shadow-sm space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2E6] pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#20252B]">{item.questionId}</span>
                <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-bold text-[#20252B]">
                  {item.subjectName}
                </span>
                <span className="text-[#66727D] font-medium">{item.conceptName}</span>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    item.status === 'pending'
                      ? 'bg-[#FEF3C7] text-[#92400E]'
                      : item.status === 'resolved'
                      ? 'bg-[#E9EEF1] text-[#20252B]'
                      : 'bg-[#F1F3F4] text-[#66727D]'
                  }`}
                >
                  {item.status}
                </span>
                <span className="text-[11px] text-[#66727D]">{item.timestamp}</span>
              </div>
            </div>

            {/* Question Text */}
            <div className="text-xs text-[#20252B] leading-relaxed bg-[#F1F3F4] p-4 rounded-2xl border border-[#DCE2E6]">
              <MathText content={item.questionText} />
            </div>

            {/* Issue Description Banner */}
            <div className="rounded-2xl border border-[#FDE68A] bg-[#FEF3C7]/40 p-4 space-y-1 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-[#92400E]">
                <AlertTriangle className="h-4 w-4" />
                <span>Report Category: {item.issueCategory.replace('_', ' ').toUpperCase()}</span>
              </div>
              <p className="text-[#92400E] leading-relaxed">{item.reason}</p>
              <div className="text-[10px] text-[#92400E]/80 pt-1">
                Reported by: {item.reportedBy}
              </div>
            </div>

            {/* Actions */}
            {item.status === 'pending' && (
              <div className="pt-2 flex items-center justify-end gap-3 text-xs">
                <button
                  onClick={() => handleRejectReport(item.id, item.questionId)}
                  className="rounded-full border border-[#DCE2E6] px-5 py-2 font-semibold text-[#66727D] hover:bg-[#F1F3F4]"
                >
                  Dismiss Report
                </button>
                <button
                  onClick={() => handleApprove(item.id, item.questionId)}
                  className="rounded-full bg-[#20252B] px-5 py-2 font-bold text-white shadow-sm hover:bg-black"
                >
                  Confirm & Update Solution
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
