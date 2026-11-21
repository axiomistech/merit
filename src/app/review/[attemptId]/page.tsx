'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Bookmark,
  ChevronRight,
  Filter,
} from 'lucide-react';
import { getFullNeet180Questions } from '@/data/seedData';
import { ExamAttemptEvaluation, AnswerState } from '@/types/exam';
import { MathText } from '@/components/ui/MathText';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function DedicatedReviewPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-NEET-01';

  const [evaluation, setEvaluation] = useState<ExamAttemptEvaluation | null>(null);
  const [filter, setFilter] = useState<'all' | 'incorrect' | 'unanswered' | 'bookmarked'>('all');
  const [bookmarked, setBookmarked] = useState<Record<string, boolean>>({});
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  const allQuestions = useMemo(() => getFullNeet180Questions(), []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`fort_result_${attemptId}`) || localStorage.getItem('fort_latest_attempt');
      if (stored) {
        try {
          setEvaluation(JSON.parse(stored));
        } catch {}
      }
    }
  }, [attemptId]);

  const questionsWithReview = useMemo(() => {
    return allQuestions.map((q) => {
      const evalItem = evaluation?.questionResults?.find(
        (e: any) => e.questionVersionId === q.versionId
      );
      const isCorrect = evalItem?.result === 'correct';
      const isUnanswered = !evalItem || evalItem.result === 'unattempted';
      const isWrong = evalItem?.result === 'incorrect' || evalItem?.result === 'partial';

      return {
        ...q,
        evalItem,
        isCorrect,
        isWrong,
        isUnanswered,
        marksAwarded: evalItem?.marksEarned || 0,
      };
    });
  }, [allQuestions, evaluation]);

  const filteredQuestions = useMemo(() => {
    switch (filter) {
      case 'incorrect':
        return questionsWithReview.filter((q) => q.isWrong);
      case 'unanswered':
        return questionsWithReview.filter((q) => q.isUnanswered);
      case 'bookmarked':
        return questionsWithReview.filter((q) => bookmarked[q.versionId]);
      default:
        return questionsWithReview;
    }
  }, [questionsWithReview, filter, bookmarked]);

  const toggleBookmark = (versionId: string) => {
    setBookmarked((prev) => {
      const next = !prev[versionId];
      toast.info(next ? 'Question saved to bookmarks' : 'Removed from bookmarks');
      return { ...prev, [versionId]: next };
    });
  };

  const toggleSolution = (versionId: string) => {
    setExpandedSolutions((prev) => ({
      ...prev,
      [versionId]: !prev[versionId],
    }));
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Navigation & Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href={`/dashboard/results/${attemptId}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#52584E] hover:text-[#20252B] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Result Analytics
          </Link>
          <div className="text-xs font-mono text-[#66727D]">Attempt ID: {attemptId}</div>
        </div>

        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-sans text-[#20252B]">
            Question-by-Question Solution Review
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Inspect detailed step-by-step KaTeX solutions, examine incorrect options, and review marks awarded.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-[#DCE2E6] bg-white p-3 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          {[
            { id: 'all', label: `All Questions (${questionsWithReview.length})` },
            { id: 'incorrect', label: `Incorrect (${questionsWithReview.filter((q) => q.isWrong).length})` },
            { id: 'unanswered', label: `Unanswered (${questionsWithReview.filter((q) => q.isUnanswered).length})` },
            { id: 'bookmarked', label: `Bookmarked (${Object.values(bookmarked).filter(Boolean).length})` },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={cn(
                'px-3.5 py-1.5 text-xs font-semibold rounded-xl border transition-colors',
                filter === tab.id
                  ? 'bg-[#20252B] text-white border-[#20252B]'
                  : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map((q) => (
            <div
              key={q.versionId}
              className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#20252B]">
                    Q.{q.displayNumber}
                  </span>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-[#F1F3F4] text-[#52584E] border border-[#DCE2E6]">
                    {q.subjectName} • {q.conceptName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                      q.isCorrect && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                      q.isWrong && 'bg-[#E4002B]/15 text-[#E4002B]',
                      q.isUnanswered && 'bg-[#66727D]/15 text-[#66727D]'
                    )}
                  >
                    {q.isCorrect ? '+4 Marks' : q.isWrong ? '-1 Mark' : '0 Marks'}
                  </span>
                  <button
                    onClick={() => toggleBookmark(q.versionId)}
                    className={cn(
                      'p-1.5 rounded-lg border transition-colors',
                      bookmarked[q.versionId]
                        ? 'border-[#9CC6E0] bg-[#9CC6E0]/20 text-[#3B4C30]'
                        : 'border-[#DCE2E6] text-[#66727D] hover:bg-[#F1F3F4]'
                    )}
                  >
                    <Bookmark className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <div className="text-xs text-[#20252B] leading-relaxed">
                <MathText text={q.text} />
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {q.options.map((opt) => {
                  const isCorrectOpt = q.answerKey?.correctOptions?.includes(opt.key);
                  return (
                    <div
                      key={opt.key}
                      className={cn(
                        'flex items-center gap-2 p-2.5 rounded-xl border text-xs transition-colors',
                        isCorrectOpt
                          ? 'border-[#9CC6E0] bg-[#9CC6E0]/10 text-[#20252B] font-semibold'
                          : 'border-[#DCE2E6] bg-[#F1F3F4]/40 text-[#52584E]'
                      )}
                    >
                      <span className="font-bold font-mono w-4">{opt.key}.</span>
                      <MathText text={opt.text} />
                      {isCorrectOpt && (
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#3B4C30] ml-auto shrink-0" />
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Explanation Dropdown */}
              <div className="pt-2 border-t border-[#DCE2E6]">
                <button
                  onClick={() => toggleSolution(q.versionId)}
                  className="text-xs font-semibold text-[#3B4C30] hover:underline"
                >
                  {expandedSolutions[q.versionId] ? 'Hide Solution Explanation' : 'View Step-by-Step KaTeX Explanation'}
                </button>
                {expandedSolutions[q.versionId] && (
                  <div className="mt-2.5 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 text-xs text-[#20252B] leading-relaxed">
                    <div className="font-bold text-[10px] uppercase text-[#66727D] mb-1">Detailed Solution:</div>
                    <MathText text={q.explanation?.text || 'Standard pedagogical step-by-step solution.'} />
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-12 text-center text-xs text-[#66727D]">
              No questions found matching this filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
