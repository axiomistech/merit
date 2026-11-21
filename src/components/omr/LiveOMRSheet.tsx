'use client';

import React, { useMemo } from 'react';
import { AnswerState } from '@/types/exam';
import { cn } from '@/lib/utils';
import { FileDown } from 'lucide-react';
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
        'rounded-2xl border border-[#E6E5DE] bg-white text-[#2E332D] shadow-card transition-all',
        compact ? 'p-3.5 text-xs' : 'p-6 sm:p-8'
      )}
    >
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider text-[#758B62]">
              Physical-Grade OMR Grid
            </span>
            {isReadOnly && (
              <span className="rounded-lg bg-[#DCE5D3] px-2.5 py-1 text-[11px] font-bold text-[#263126]">
                Evaluated
              </span>
            )}
          </div>
          <h3 className="mt-2 text-base sm:text-lg font-bold text-[#263126]">{paperName}</h3>
          <p className="text-xs text-[#73786E]">
            Candidate ID: <span className="font-mono font-semibold text-[#263126]">{registrationId}</span> • Attempt:{' '}
            <span className="font-mono font-semibold text-[#263126]">{attemptId}</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex items-center gap-2 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] px-3.5 py-2 text-xs font-semibold text-[#2E332D] hover:bg-[#E9EEE3] hover:border-[#9CAF88] transition-colors shadow-soft"
            title="Download printable A4 OMR PDF"
          >
            <FileDown className="h-4 w-4 text-[#758B62]" />
            <span>Download A4 OMR</span>
          </button>
        </div>
      </div>

      {/* Mini Legend & Quick Summary */}
      <div className="my-4 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-[#F7F5EF] p-3 text-xs border border-[#E6E5DE]">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border border-[#E6E5DE] bg-white" />
            <span className="text-[#73786E]">Blank ({stats.unanswered})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#9CAF88]" />
            <span className="text-[#263126] font-medium">Darkened ({stats.answered})</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-3 w-3 rounded-full border border-amber-400 bg-amber-100" />
            <span className="text-[#73786E]">Review ({stats.marked})</span>
          </div>
        </div>
        <div className="text-[11px] text-[#92958D]">
          Click bubbles to synchronize with your answer state
        </div>
      </div>

      {/* Grid of OMR Bubbles */}
      <div
        className={cn(
          'grid gap-x-6 gap-y-2.5 overflow-y-auto pr-1 select-none',
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
                'group flex items-center justify-between rounded-xl border px-3 py-1.5 transition-all cursor-pointer',
                isCurrent
                  ? 'border-[#9CAF88] bg-[#E9EEE3]'
                  : 'border-[#ECEAE4] bg-[#FFFFFF] hover:border-[#9CAF88]/60 hover:bg-[#F7F5EF]',
                isMarked && 'border-amber-300 bg-amber-50/50'
              )}
            >
              {/* Question Index with status indicator */}
              <div className="flex items-center gap-1.5 font-mono text-xs">
                <span className={cn('w-6 font-semibold', isCurrent ? 'text-[#758B62]' : 'text-[#73786E]')}>
                  {qNum.toString().padStart(2, '0')}.
                </span>
                {isMarked && (
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" title="Marked for review" />
                )}
              </div>

              {/* Bubbles A, B, C, D */}
              <div className="flex items-center gap-1.5">
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
                          ? 'border-[#758B62] bg-[#9CAF88] text-white shadow-soft'
                          : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88] hover:text-[#263126]',
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
