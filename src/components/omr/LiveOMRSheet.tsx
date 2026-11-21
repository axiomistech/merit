'use client';

import React, { useMemo } from 'react';
import { AnswerState } from '@/types/exam';
import { cn } from '@/lib/utils';
import { FileDown, CheckCircle2, AlertCircle, HelpCircle, Eye } from 'lucide-react';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';

interface OMRProps {
  totalQuestions: number;
  answers: Record<string, AnswerState>;
  questionIdMap: Record<number, string>; // Maps displayNumber (1..N) to questionVersionId
  currentQuestionNumber?: number;
  onSelectOption?: (questionNumber: number, optionKey: string) => void;
  onJumpToQuestion?: (questionNumber: number) => void;
  isReadOnly?: boolean;
  studentName?: string;
  registrationId?: string;
  examName?: string;
  paperName?: string;
  attemptId?: string;
  compact?: boolean;
}

export function LiveOMRSheet({
  totalQuestions,
  answers,
  questionIdMap,
  currentQuestionNumber,
  onSelectOption,
  onJumpToQuestion,
  isReadOnly = false,
  studentName = 'Candidate Name',
  registrationId = 'FORT-26-000001',
  examName = 'FORT NEET (UG)',
  paperName = 'All India Full Mock Test - 01',
  attemptId = 'ATT-2026-X1',
  compact = false,
}: OMRProps) {
  const options = ['A', 'B', 'C', 'D'];

  const questionList = useMemo(() => {
    return Array.from({ length: totalQuestions }, (_, i) => i + 1);
  }, [totalQuestions]);

  const stats = useMemo(() => {
    let answered = 0;
    let marked = 0;
    for (let i = 1; i <= totalQuestions; i++) {
      const qId = questionIdMap[i];
      const ans = qId ? answers[qId] : undefined;
      if (ans?.isAnswered) answered++;
      if (ans?.markedForReview) marked++;
    }
    return {
      answered,
      unanswered: totalQuestions - answered,
      marked,
    };
  }, [totalQuestions, answers, questionIdMap]);

  const handleDownloadPdf = () => {
    generateOmrPdf({
      studentName,
      registrationId,
      examName,
      paperName,
      attemptId,
      date: new Date().toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }),
      totalQuestions,
      answers,
      questionIdMap,
    });
  };

  return (
    <div
      className={cn(
        'rounded-xl border border-[#263554] bg-[#11182A] text-[#F5F7FB] transition-all',
        compact ? 'p-3 text-xs' : 'p-6 shadow-xl'
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
              OMR Response Grid
            </span>
            {isReadOnly && (
              <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-xs font-medium text-emerald-400">
                Final Evaluated
              </span>
            )}
          </div>
          <h3 className="mt-1 text-base font-bold text-[#F5F7FB]">{paperName}</h3>
          <p className="text-xs text-[#A7B0C0]">
            ID: <span className="font-mono text-[#F5F7FB]">{registrationId}</span> • Attempt:{' '}
            <span className="font-mono text-[#F5F7FB]">{attemptId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDownloadPdf}
            className="flex items-center gap-1.5 rounded-lg border border-[#263554] bg-[#172033] px-3 py-1.5 text-xs font-medium text-[#F5F7FB] hover:border-[#6486C6] hover:bg-[#1D2940] transition-colors"
            title="Download printable A4 OMR PDF"
          >
            <FileDown className="h-4 w-4 text-[#6486C6]" />
            <span>Download OMR (PDF)</span>
          </button>
        </div>
      </div>

      {/* Mini Legend & Quick Summary */}
      <div className="my-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-[#0B1020]/80 p-2.5 text-xs">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border border-[#263554] bg-[#172033]" />
            <span className="text-[#A7B0C0]">Unanswered ({stats.unanswered})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#6486C6]" />
            <span className="text-[#A7B0C0]">Filled ({stats.answered})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border border-amber-400 bg-amber-500/30" />
            <span className="text-[#A7B0C0]">Review ({stats.marked})</span>
          </div>
        </div>
        <div className="text-[11px] text-[#7C8799]">
          Darken only one bubble per question using clicks
        </div>
      </div>

      {/* Grid of OMR Bubbles */}
      <div
        className={cn(
          'grid gap-x-6 gap-y-2 overflow-y-auto pr-1 select-none',
          compact
            ? 'max-h-[380px] grid-cols-1'
            : 'max-h-[600px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
        )}
      >
        {questionList.map((qNum) => {
          const qId = questionIdMap[qNum];
          const ansState = qId ? answers[qId] : undefined;
          const selectedOption = ansState?.selectedOptions?.[0];
          const isMarked = ansState?.markedForReview;
          const isCurrent = currentQuestionNumber === qNum;

          return (
            <div
              key={qNum}
              onClick={() => onJumpToQuestion && onJumpToQuestion(qNum)}
              className={cn(
                'group flex items-center justify-between rounded-lg border px-3 py-1.5 transition-all cursor-pointer',
                isCurrent
                  ? 'border-[#6486C6] bg-[#1D2940]'
                  : 'border-[#263554]/60 bg-[#172033]/60 hover:border-[#6486C6]/50 hover:bg-[#1D2940]/50',
                isMarked && 'border-amber-500/50'
              )}
            >
              {/* Question Index with status indicator */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className={cn('w-6 font-semibold', isCurrent ? 'text-[#6486C6]' : 'text-[#A7B0C0]')}>
                  {qNum.toString().padStart(2, '0')}.
                </span>
                {isMarked && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-400" title="Marked for review" />
                )}
              </div>

              {/* Bubbles A, B, C, D */}
              <div className="flex items-center gap-2">
                {options.map((opt) => {
                  const isFilled = selectedOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      disabled={isReadOnly}
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!isReadOnly && onSelectOption) {
                          onSelectOption(qNum, opt);
                        }
                      }}
                      className={cn(
                        'flex h-6 w-6 items-center justify-center rounded-full border text-[11px] font-bold transition-all',
                        isFilled
                          ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020] shadow-sm shadow-[#6486C6]/50'
                          : 'border-[#263554] bg-[#0B1020] text-[#A7B0C0] hover:border-[#6486C6] hover:text-[#F5F7FB]',
                        isReadOnly && 'cursor-default'
                      )}
                      title={`Select Option ${opt}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
