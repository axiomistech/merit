'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Shield,
  RefreshCw,
  FileDown,
  Layers,
  Sparkles,
  HelpCircle,
  X,
} from 'lucide-react';
import {
  SAMPLE_NEET_PAPER,
  SAMPLE_NEET_QUESTIONS,
} from '@/data/seedData';
import {
  QuestionData,
  AnswerState,
  QuestionPaletteStatus,
} from '@/types/exam';
import { evaluateAttempt } from '@/lib/scoring/engine';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { cn, formatTimeWithHours } from '@/lib/utils';
import { toast } from 'sonner';

export default function ExamExecutionPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-NEET-01';

  const paper = SAMPLE_NEET_PAPER;
  const questions: QuestionData[] = SAMPLE_NEET_QUESTIONS;

  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [viewMode, setViewMode] = useState<'standard' | 'omr'>('standard');
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Server-authoritative countdown timer simulation
  // 200 minutes = 12000 seconds
  const [secondsRemaining, setSecondsRemaining] = useState<number>(12000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Check if previous answers exist in localStorage for attempt recovery
    if (typeof window !== 'undefined') {
      const savedAnswers = localStorage.getItem(`fort_attempt_${attemptId}_answers`);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch {}
      }
    }

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinalSubmit(true); // Auto-submission on deadline expiration
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [attemptId]);

  const currentQ = questions[currentIndex];

  // Palette status calculator
  const getPaletteStatus = (index: number): QuestionPaletteStatus => {
    const q = questions[index];
    const ans = answers[q.versionId];
    const isAns = ans?.isAnswered;
    const isMarked = ans?.markedForReview;

    if (isAns && isMarked) return 'answered_and_marked_for_review';
    if (isMarked) return 'marked_for_review';
    if (isAns) return 'answered';
    if (visited[index]) return 'not_answered';
    return 'not_visited';
  };

  const currentAnswer = currentQ ? answers[currentQ.versionId] : undefined;

  const handleSelectOption = (optionKey: string) => {
    if (!currentQ) return;
    const nextAnswers = {
      ...answers,
      [currentQ.versionId]: {
        questionVersionId: currentQ.versionId,
        selectedOptions: [optionKey],
        isAnswered: true,
        markedForReview: currentAnswer?.markedForReview || false,
        timeSpentSeconds: (currentAnswer?.timeSpentSeconds || 0) + 15,
        lastUpdated: Date.now(),
      },
    };
    setAnswers(nextAnswers);

    // Persist recovery snapshot
    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_attempt_${attemptId}_answers`, JSON.stringify(nextAnswers));
    }
  };

  const handleClearResponse = () => {
    if (!currentQ) return;
    const nextAnswers = { ...answers };
    delete nextAnswers[currentQ.versionId];
    setAnswers(nextAnswers);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_attempt_${attemptId}_answers`, JSON.stringify(nextAnswers));
    }
  };

  const handleToggleMarkForReview = () => {
    if (!currentQ) return;
    const isMarked = !(currentAnswer?.markedForReview || false);
    const nextAnswers = {
      ...answers,
      [currentQ.versionId]: {
        questionVersionId: currentQ.versionId,
        selectedOptions: currentAnswer?.selectedOptions,
        numericalValue: currentAnswer?.numericalValue,
        isAnswered: currentAnswer?.isAnswered || false,
        markedForReview: isMarked,
        timeSpentSeconds: (currentAnswer?.timeSpentSeconds || 0) + 5,
        lastUpdated: Date.now(),
      },
    };
    setAnswers(nextAnswers);
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIndex = currentIndex + 1;
      setCurrentIndex(nextIndex);
      setVisited((prev) => ({ ...prev, [nextIndex]: true }));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIndex = currentIndex - 1;
      setCurrentIndex(prevIndex);
      setVisited((prev) => ({ ...prev, [prevIndex]: true }));
    }
  };

  const handleJumpToQuestion = (qNum: number) => {
    const idx = qNum - 1;
    if (idx >= 0 && idx < questions.length) {
      setCurrentIndex(idx);
      setVisited((prev) => ({ ...prev, [idx]: true }));
    }
  };

  // Build questionIdMap for live OMR (1-based to versionId)
  const questionIdMap = useMemo(() => {
    const map: Record<number, string> = {};
    questions.forEach((q, idx) => {
      map[idx + 1] = q.versionId;
    });
    return map;
  }, [questions]);

  // Overall Statistics for palette & modal
  const stats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    questions.forEach((_, idx) => {
      const status = getPaletteStatus(idx);
      if (status === 'answered') answered++;
      else if (status === 'not_answered') notAnswered++;
      else if (status === 'marked_for_review') marked++;
      else if (status === 'answered_and_marked_for_review') answeredAndMarked++;
      else notVisited++;
    });

    return {
      answered,
      notAnswered,
      marked,
      answeredAndMarked,
      notVisited,
      total: questions.length,
    };
  }, [answers, visited, questions]);

  const handleFinalSubmit = (isAuto: boolean = false) => {
    setIsSubmitting(true);

    // Call centralized evaluation engine
    const evaluation = evaluateAttempt({
      questions: questions.map((q) => ({
        questionVersionId: q.versionId,
        displayNumber: q.displayNumber,
        questionType: q.questionType,
        subjectSlug: q.subjectSlug,
        subjectName: q.subjectName,
        conceptSlug: q.conceptSlug,
        conceptName: q.conceptName,
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        correctOptions: q.answerKey?.correctOptions,
        numericalValue: q.answerKey?.numericalValue,
        numericalTolerance: q.answerKey?.numericalTolerance,
      })),
      answers,
      durationSeconds: 12000 - secondsRemaining,
    });

    // Save final evaluation snapshot
    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_result_${attemptId}`, JSON.stringify(evaluation));
      localStorage.setItem('fort_latest_attempt', JSON.stringify(evaluation));
    }

    toast.success(isAuto ? 'Time expired. Test auto-submitted!' : 'Examination submitted successfully!');
    router.push(`/dashboard/results/${attemptId}`);
  };

  return (
    <div className="flex h-screen flex-col bg-[#0B1020] text-[#F5F7FB] overflow-hidden select-none">
      {/* Top Authoritative Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#263554] bg-[#11182A] px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#F5F7FB] line-clamp-1">{paper.name}</h1>
            <span className="text-[10px] text-[#A7B0C0]">
              Candidate Attempt ID: <strong className="font-mono text-[#F5F7FB]">{attemptId}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Server-authoritative Countdown Timer */}
          <div className="flex items-center gap-2 rounded-lg border border-[#263554] bg-[#0B1020] px-3 py-1.5 font-mono text-xs text-amber-400">
            <Clock className="h-4 w-4" />
            <span className="tabular-nums font-bold">
              {formatTimeWithHours(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="rounded-lg bg-[#EF4444] px-4 py-1.5 text-xs font-bold text-[#F5F7FB] hover:bg-[#dc2626] transition-colors"
          >
            End Test
          </button>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left/Center: Question or OMR Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Section Tabs & View Mode Switcher */}
          <div className="flex items-center justify-between border-b border-[#263554] bg-[#172033] px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#A7B0C0]">Section:</span>
              <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 font-bold text-[#6486C6]">
                {currentQ?.subjectName}
              </span>
              <span className="text-[11px] text-[#7C8799]">
                (Question {currentIndex + 1} of {questions.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('standard')}
                className={cn(
                  'rounded px-2.5 py-1 font-semibold transition-colors',
                  viewMode === 'standard' ? 'bg-[#6486C6] text-[#0B1020]' : 'text-[#A7B0C0] hover:text-[#F5F7FB]'
                )}
              >
                Question View
              </button>
              <button
                onClick={() => setViewMode('omr')}
                className={cn(
                  'rounded px-2.5 py-1 font-semibold transition-colors',
                  viewMode === 'omr' ? 'bg-[#6486C6] text-[#0B1020]' : 'text-[#A7B0C0] hover:text-[#F5F7FB]'
                )}
              >
                Live OMR Grid
              </button>
            </div>
          </div>

          {/* Question Display Screen */}
          {viewMode === 'standard' ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Question metadata */}
              <div className="flex items-center justify-between text-xs text-[#A7B0C0]">
                <span>
                  Question Type:{' '}
                  <strong className="text-[#F5F7FB] uppercase">
                    {currentQ.questionType.replace('_', ' ')}
                  </strong>
                </span>
                <span className="font-mono text-[#10B981] font-bold">
                  +{currentQ.marks} / -{currentQ.negativeMarks} Marks
                </span>
              </div>

              {/* Question text with KaTeX support */}
              <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6 text-sm sm:text-base leading-relaxed text-[#F5F7FB]">
                <div className="mb-2 text-xs font-semibold text-[#6486C6]">
                  {currentQ.conceptName}
                </div>
                <MathText content={currentQ.text} />
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ.options.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptions?.[0] === opt.key;
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={cn(
                        'flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all',
                        isSelected
                          ? 'border-[#6486C6] bg-[#1D2940] text-[#F5F7FB]'
                          : 'border-[#263554] bg-[#172033] text-[#A7B0C0] hover:border-[#6486C6]/50'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono font-bold text-xs',
                          isSelected
                            ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                            : 'border-[#263554] text-[#A7B0C0]'
                        )}
                      >
                        {opt.key}
                      </span>
                      <MathText content={opt.text} className="text-xs sm:text-sm text-[#F5F7FB]" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <LiveOMRSheet
                totalQuestions={questions.length}
                answers={answers}
                questionIdMap={questionIdMap}
                currentQuestionNumber={currentIndex + 1}
                onSelectOption={(qNum, opt) => {
                  const q = questions[qNum - 1];
                  if (!q) return;
                  const nextAnswers = {
                    ...answers,
                    [q.versionId]: {
                      questionVersionId: q.versionId,
                      selectedOptions: [opt],
                      isAnswered: true,
                      markedForReview: false,
                      timeSpentSeconds: 15,
                      lastUpdated: Date.now(),
                    },
                  };
                  setAnswers(nextAnswers);
                  if (typeof window !== 'undefined') {
                    localStorage.setItem(`fort_attempt_${attemptId}_answers`, JSON.stringify(nextAnswers));
                  }
                }}
                onJumpToQuestion={(qNum) => {
                  handleJumpToQuestion(qNum);
                  setViewMode('standard');
                }}
                paperName={paper.name}
                attemptId={attemptId}
              />
            </div>
          )}

          {/* Bottom Action Footer */}
          <footer className="flex h-16 shrink-0 items-center justify-between border-t border-[#263554] bg-[#11182A] px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkForReview}
                className={cn(
                  'rounded-lg border px-3 py-2 text-xs font-semibold transition-colors',
                  currentAnswer?.markedForReview
                    ? 'border-amber-400 bg-amber-500/20 text-amber-300'
                    : 'border-[#263554] bg-[#172033] text-[#A7B0C0] hover:text-[#F5F7FB]'
                )}
              >
                {currentAnswer?.markedForReview ? 'Unmark Review' : 'Mark for Review'}
              </button>

              <button
                onClick={handleClearResponse}
                disabled={!currentAnswer?.isAnswered}
                className="rounded-lg border border-[#263554] bg-[#172033] px-3 py-2 text-xs text-[#A7B0C0] hover:text-[#EF4444] disabled:opacity-30"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-lg border border-[#263554] bg-[#172033] px-3 py-2 text-xs font-semibold text-[#F5F7FB] disabled:opacity-30"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-lg bg-[#6486C6] px-5 py-2 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </div>

        {/* Right: Question Palette Drawer */}
        <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:border-l lg:border-[#263554] lg:bg-[#11182A]">
          {/* Candidate badge */}
          <div className="border-b border-[#263554] bg-[#0B1020]/60 p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C8799]">
              Candidate Workspace
            </div>
            <div className="font-mono text-xs font-bold text-[#F5F7FB]">{attemptId}</div>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 border-b border-[#263554] p-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#10B981]" />
              <span className="text-[#A7B0C0]">Answered ({stats.answered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
              <span className="text-[#A7B0C0]">Unanswered ({stats.notAnswered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="text-[#A7B0C0]">Review ({stats.marked})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border border-[#263554] bg-[#172033]" />
              <span className="text-[#A7B0C0]">Not Visited ({stats.notVisited})</span>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#7C8799] mb-3">
              Question Palette ({questions.length})
            </div>

            <div className="grid grid-cols-5 gap-2">
              {questions.map((q, idx) => {
                const status = getPaletteStatus(idx);
                const isCurrent = currentIndex === idx;

                return (
                  <button
                    key={q.id}
                    onClick={() => {
                      handleJumpToQuestion(idx + 1);
                      setViewMode('standard');
                    }}
                    className={cn(
                      'flex h-9 w-9 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all',
                      isCurrent && 'ring-2 ring-[#6486C6] ring-offset-2 ring-offset-[#0B1020]',
                      status === 'answered' && 'bg-[#10B981] text-[#0B1020]',
                      status === 'not_answered' && 'bg-[#EF4444] text-[#F5F7FB]',
                      status === 'marked_for_review' && 'bg-amber-400 text-[#0B1020]',
                      status === 'answered_and_marked_for_review' && 'bg-amber-400 text-[#0B1020] border-2 border-[#10B981]',
                      status === 'not_visited' && 'border border-[#263554] bg-[#172033] text-[#A7B0C0] hover:border-[#6486C6]'
                    )}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>
          </div>
        </aside>
      </div>

      {/* Confirmation & Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#263554] bg-[#11182A] p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#263554] pb-3">
              <h3 className="text-base font-bold text-[#F5F7FB]">Confirm Final Submission</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-[#A7B0C0] hover:text-[#F5F7FB]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#A7B0C0]">
              Once submitted, your answers are permanently sealed and evaluated server-side.
            </p>

            <div className="my-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg bg-[#172033] p-3 text-center">
                <div className="text-[11px] text-[#A7B0C0]">Answered</div>
                <div className="text-xl font-bold text-[#10B981]">{stats.answered}</div>
              </div>
              <div className="rounded-lg bg-[#172033] p-3 text-center">
                <div className="text-[11px] text-[#A7B0C0]">Unanswered</div>
                <div className="text-xl font-bold text-[#EF4444]">{stats.notAnswered + stats.notVisited}</div>
              </div>
              <div className="rounded-lg bg-[#172033] p-3 text-center">
                <div className="text-[11px] text-[#A7B0C0]">Marked for Review</div>
                <div className="text-xl font-bold text-amber-400">{stats.marked}</div>
              </div>
              <div className="rounded-lg bg-[#172033] p-3 text-center">
                <div className="text-[11px] text-[#A7B0C0]">Time Remaining</div>
                <div className="text-base font-bold font-mono text-[#F5F7FB]">
                  {formatTimeWithHours(secondsRemaining)}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-xl border border-[#263554] bg-[#172033] py-2.5 text-xs font-semibold text-[#F5F7FB]"
              >
                Resume Examination
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalSubmit(false)}
                className="flex-1 rounded-xl bg-[#10B981] py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#10B981]/90"
              >
                {isSubmitting ? 'Evaluating...' : 'Yes, Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
