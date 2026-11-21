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
    const existing = answers[currentQ.versionId];
    const isMulti = currentQ.questionType === 'multiple_correct';

    let nextSelected: string[] = [];
    if (isMulti) {
      const currentSelected = existing?.selectedOptions || [];
      nextSelected = currentSelected.includes(optionKey)
        ? currentSelected.filter((k) => k !== optionKey)
        : [...currentSelected, optionKey];
    } else {
      nextSelected = [optionKey];
    }

    const nextState: AnswerState = {
      questionVersionId: currentQ.versionId,
      selectedOptions: nextSelected,
      isAnswered: nextSelected.length > 0,
      markedForReview: existing?.markedForReview || false,
      timeSpentSeconds: (existing?.timeSpentSeconds || 0) + 5,
      lastUpdated: Date.now(),
    };

    const nextAnswers = {
      ...answers,
      [currentQ.versionId]: nextState,
    };
    setAnswers(nextAnswers);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_attempt_${attemptId}_answers`, JSON.stringify(nextAnswers));
    }
  };

  const handleToggleMarkForReview = () => {
    if (!currentQ) return;
    const existing = answers[currentQ.versionId];
    const nextState: AnswerState = {
      questionVersionId: currentQ.versionId,
      selectedOptions: existing?.selectedOptions || [],
      isAnswered: existing?.isAnswered || false,
      markedForReview: !existing?.markedForReview,
      timeSpentSeconds: existing?.timeSpentSeconds || 0,
      lastUpdated: Date.now(),
    };

    const nextAnswers = {
      ...answers,
      [currentQ.versionId]: nextState,
    };
    setAnswers(nextAnswers);

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

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      const nextIdx = currentIndex + 1;
      setCurrentIndex(nextIdx);
      setVisited((prev) => ({ ...prev, [nextIdx]: true }));
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      const prevIdx = currentIndex - 1;
      setCurrentIndex(prevIdx);
      setVisited((prev) => ({ ...prev, [prevIdx]: true }));
    }
  };

  const handleJumpToQuestion = (qNum: number) => {
    const targetIdx = qNum - 1;
    if (targetIdx >= 0 && targetIdx < questions.length) {
      setCurrentIndex(targetIdx);
      setVisited((prev) => ({ ...prev, [targetIdx]: true }));
    }
  };

  // Map for LiveOMRSheet
  const questionIdMap = useMemo(() => {
    const map: Record<number, string> = {};
    questions.forEach((q, i) => {
      map[i + 1] = q.versionId;
    });
    return map;
  }, [questions]);

  // Aggregate statistics for submission
  const stats = useMemo(() => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let answeredAndMarked = 0;
    let notVisited = 0;

    questions.forEach((q, i) => {
      const ans = answers[q.versionId];
      if (ans?.isAnswered && ans?.markedForReview) {
        answeredAndMarked++;
        answered++;
      } else if (ans?.markedForReview) {
        marked++;
      } else if (ans?.isAnswered) {
        answered++;
      } else if (visited[i]) {
        notAnswered++;
      } else {
        notVisited++;
      }
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

  const isTimeCritical = secondsRemaining < 300; // Less than 5 mins

  return (
    <div className="flex h-screen flex-col bg-[#F7F5EF] text-[#2E332D] overflow-hidden select-none">
      {/* Top Authoritative Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#E6E5DE] bg-white px-4 sm:px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CAF88] text-white">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#263126] line-clamp-1">{paper.name}</h1>
            <span className="text-[10px] text-[#73786E]">
              Candidate Attempt ID: <strong className="font-mono text-[#263126]">{attemptId}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Server-authoritative Countdown Timer */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-xs transition-colors',
              isTimeCritical
                ? 'border-[#E8412C] bg-[#FCE8E4] text-[#E8412C] animate-pulse font-bold'
                : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#263126]'
            )}
          >
            <Clock className="h-4 w-4 text-[#758B62]" />
            <span className="tabular-nums font-bold">
              {formatTimeWithHours(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="rounded-xl border border-[#E8412C]/30 bg-white px-4 py-1.5 text-xs font-bold text-[#E8412C] hover:bg-[#FCE8E4] transition-colors"
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
          <div className="flex items-center justify-between border-b border-[#E6E5DE] bg-white px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#73786E]">Section:</span>
              <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 font-bold text-[#758B62]">
                {currentQ?.subjectName}
              </span>
              <span className="text-[11px] text-[#92958D]">
                (Question {currentIndex + 1} of {questions.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('standard')}
                className={cn(
                  'rounded-lg px-3 py-1 font-semibold transition-colors',
                  viewMode === 'standard' ? 'bg-[#9CAF88] text-white' : 'text-[#73786E] hover:text-[#263126]'
                )}
              >
                Question View
              </button>
              <button
                onClick={() => setViewMode('omr')}
                className={cn(
                  'rounded-lg px-3 py-1 font-semibold transition-colors',
                  viewMode === 'omr' ? 'bg-[#9CAF88] text-white' : 'text-[#73786E] hover:text-[#263126]'
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
              <div className="flex items-center justify-between text-xs text-[#73786E]">
                <span>
                  Question Type:{' '}
                  <strong className="text-[#263126] uppercase">
                    {currentQ?.questionType.replace('_', ' ')}
                  </strong>
                </span>
                <span className="font-mono text-[#758B62] font-bold">
                  +{currentQ?.marks} / -{currentQ?.negativeMarks} Marks
                </span>
              </div>

              {/* Question text with KaTeX support */}
              <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] text-sm sm:text-base leading-relaxed text-[#263126]">
                <div className="mb-2 text-xs font-semibold text-[#758B62]">
                  {currentQ?.conceptName}
                </div>
                <MathText content={currentQ?.text || ''} />
              </div>

              {/* Options */}
              <div className="space-y-3">
                {currentQ?.options.map((opt) => {
                  const isSelected = currentAnswer?.selectedOptions?.includes(opt.key);
                  return (
                    <div
                      key={opt.key}
                      onClick={() => handleSelectOption(opt.key)}
                      className={cn(
                        'flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all shadow-[0_1px_4px_rgba(38,49,38,0.02)]',
                        isSelected
                          ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                          : 'border-[#E6E5DE] bg-white text-[#2E332D] hover:border-[#9CAF88]/60'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-mono font-bold text-xs transition-colors',
                          isSelected
                            ? 'border-[#9CAF88] bg-[#9CAF88] text-white'
                            : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]'
                        )}
                      >
                        {opt.key}
                      </span>
                      <MathText content={opt.text} className="text-xs sm:text-sm text-[#263126]" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F7F5EF]">
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
          <footer className="flex h-16 shrink-0 items-center justify-between border-t border-[#E6E5DE] bg-white px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkForReview}
                className={cn(
                  'rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                  currentAnswer?.markedForReview
                    ? 'border-[#FDE68A] bg-[#FEF3C7] text-[#92400E]'
                    : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E] hover:text-[#263126]'
                )}
              >
                {currentAnswer?.markedForReview ? 'Unmark Review' : 'Mark for Review'}
              </button>

              <button
                onClick={handleClearResponse}
                disabled={!currentAnswer?.isAnswered}
                className="rounded-xl border border-[#E6E5DE] bg-white px-3 py-2 text-xs text-[#92958D] hover:text-[#E8412C] disabled:opacity-30"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-xl border border-[#E6E5DE] bg-white px-3 py-2 text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl bg-[#9CAF88] px-5 py-2 text-xs font-bold text-white hover:bg-[#8ea07a] shadow-sm transition-colors"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </div>

        {/* Right: Question Palette Drawer */}
        <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:border-l lg:border-[#E6E5DE] lg:bg-white">
          {/* Candidate badge */}
          <div className="border-b border-[#E6E5DE] bg-[#F7F5EF] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#92958D]">
              Candidate Workspace
            </div>
            <div className="font-mono text-xs font-bold text-[#263126]">{attemptId}</div>
          </div>

          {/* Palette Legend */}
          <div className="grid grid-cols-2 gap-2 border-b border-[#E6E5DE] p-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#9CAF88]" />
              <span className="text-[#73786E]">Answered ({stats.answered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#E8412C]" />
              <span className="text-[#73786E]">Unanswered ({stats.notAnswered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="text-[#73786E]">Review ({stats.marked})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border border-[#E6E5DE] bg-white" />
              <span className="text-[#73786E]">Not Visited ({stats.notVisited})</span>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#92958D] mb-3">
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
                      isCurrent && 'ring-2 ring-[#758B62] ring-offset-2 ring-offset-white',
                      status === 'answered' && 'bg-[#9CAF88] text-white',
                      status === 'not_answered' && 'bg-[#FCE8E4] text-[#E8412C] border border-[#E8412C]/20',
                      status === 'marked_for_review' && 'bg-amber-400 text-[#263126]',
                      status === 'answered_and_marked_for_review' && 'bg-amber-400 text-[#263126] border-2 border-[#9CAF88]',
                      status === 'not_visited' && 'border border-[#E6E5DE] bg-white text-[#92958D] hover:border-[#9CAF88]'
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#263126]/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
              <h3 className="text-base font-bold text-[#263126]">Confirm Final Submission</h3>
              <button onClick={() => setShowSubmitModal(false)} className="text-[#92958D] hover:text-[#263126]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <p className="mt-3 text-xs text-[#73786E]">
              Once submitted, your answers are permanently sealed and evaluated server-side by the scoring engine.
            </p>

            <div className="my-4 grid grid-cols-2 gap-3 text-xs">
              <div className="rounded-xl bg-[#F7F5EF] p-3 text-center border border-[#E6E5DE]">
                <div className="text-[11px] text-[#73786E]">Answered</div>
                <div className="text-xl font-bold text-[#758B62]">{stats.answered}</div>
              </div>
              <div className="rounded-xl bg-[#FCE8E4] p-3 text-center border border-[#E8412C]/20">
                <div className="text-[11px] text-[#E8412C]">Unanswered</div>
                <div className="text-xl font-bold text-[#E8412C]">{stats.notAnswered + stats.notVisited}</div>
              </div>
              <div className="rounded-xl bg-[#FEF3C7] p-3 text-center border border-[#FDE68A]">
                <div className="text-[11px] text-[#92400E]">Marked for Review</div>
                <div className="text-xl font-bold text-[#92400E]">{stats.marked}</div>
              </div>
              <div className="rounded-xl bg-[#F7F5EF] p-3 text-center border border-[#E6E5DE]">
                <div className="text-[11px] text-[#73786E]">Time Remaining</div>
                <div className="text-base font-bold font-mono text-[#263126]">
                  {formatTimeWithHours(secondsRemaining)}
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 rounded-xl border border-[#E6E5DE] bg-white py-2.5 text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF]"
              >
                Resume Test
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalSubmit(false)}
                className="flex-1 rounded-xl bg-[#9CAF88] py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] disabled:opacity-50 transition-colors shadow-sm"
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
