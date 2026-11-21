'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Shield,
  FileDown,
  Layers,
  Sparkles,
  HelpCircle,
  X,
  FileText,
  ArrowRight,
  Download,
} from 'lucide-react';
import {
  SAMPLE_NEET_PAPER,
  getFullNeet180Questions,
} from '@/data/seedData';
import {
  QuestionData,
  AnswerState,
  QuestionPaletteStatus,
} from '@/types/exam';
import { evaluateAttempt } from '@/lib/scoring/engine';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { cn, formatTimeWithHours } from '@/lib/utils';
import { toast } from 'sonner';

export default function ExamExecutionPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-NEET-01';

  const paper = SAMPLE_NEET_PAPER;
  // Full 180 questions for NEET CBT Simulation
  const questions: QuestionData[] = useMemo(() => getFullNeet180Questions(), []);

  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [viewMode, setViewMode] = useState<'standard' | 'omr'>('standard');
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Authenticated candidate profile
  const [candidate, setCandidate] = useState({
    fullName: 'DHANUSH JAGADEESH',
    registrationId: 'FORT-26-000001',
  });

  // Server-authoritative countdown timer simulation (200 minutes = 12000 seconds)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(12000);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Retrieve authentic candidate profile from session
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCandidate({
            fullName: (parsed.fullName || 'DHANUSH JAGADEESH').toUpperCase(),
            registrationId: parsed.registrationId || 'FORT-26-000001',
          });
        } catch {}
      }

      // Check if previous answers exist in localStorage for attempt recovery
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

  // Final submission handler
  const handleFinalSubmit = (isAuto: boolean = false) => {
    setIsSubmitting(true);
    setShowSubmitConfirmModal(false);

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

    const submissionTimestamp = new Date().toLocaleString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    // Save final evaluation snapshot
    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_result_${attemptId}`, JSON.stringify(evaluation));
      localStorage.setItem('fort_latest_attempt', JSON.stringify(evaluation));

      try {
        const existingAttemptsStr = localStorage.getItem('fort_student_attempts');
        let existingAttempts = [];
        if (existingAttemptsStr) {
          existingAttempts = JSON.parse(existingAttemptsStr);
        }
        const newAttemptRecord = {
          id: attemptId,
          paperName: paper.name,
          paperSlug: attemptId,
          totalScore: evaluation.totalScore,
          maxScore: evaluation.maxScore,
          accuracy: evaluation.accuracy,
          totalQuestions: questions.length,
          correctCount: evaluation.correctCount,
          wrongCount: evaluation.incorrectCount,
          unansweredCount: evaluation.unattemptedCount,
          completedAt: new Date().toISOString(),
          timeSpentSeconds: 12000 - secondsRemaining,
        };
        existingAttempts = [newAttemptRecord, ...existingAttempts.filter((a: any) => a.id !== attemptId)];
        localStorage.setItem('fort_student_attempts', JSON.stringify(existingAttempts));
      } catch (err) {
        console.error('Error saving attempt to history:', err);
      }

      localStorage.setItem(
        `fort_submission_meta_${attemptId}`,
        JSON.stringify({
          submissionTimestamp,
          answers,
          candidate,
        })
      );
    }

    // SECTION 25 MANDATORY: AUTOMATIC OMR PDF DOWNLOAD ON SUBMISSION
    try {
      generateOmrPdf({
        studentName: candidate.fullName,
        registrationId: candidate.registrationId,
        examName: 'FORT NEET (UG)',
        paperName: paper.name,
        attemptId,
        submissionTime: submissionTimestamp,
        totalQuestions: 180,
        answers,
        questionIdMap,
        autoDownload: true,
      });
      toast.success('Responses recorded. Downloading your personalized OMR PDF...');
    } catch (err) {
      console.error('Auto PDF download error:', err);
    }

    // Display the Submission Success Modal Card matching the user's reference image
    setShowSuccessModal(true);
    setIsSubmitting(false);
  };

  const handleManualDownloadPdf = () => {
    generateOmrPdf({
      studentName: candidate.fullName,
      registrationId: candidate.registrationId,
      examName: 'FORT NEET (UG)',
      paperName: paper.name,
      attemptId,
      totalQuestions: 180,
      answers,
      questionIdMap,
      autoDownload: true,
    });
  };

  const isTimeCritical = secondsRemaining < 300; // Less than 5 mins

  return (
    <div className="flex h-screen flex-col bg-[#F1F3F4] text-[#20252B] overflow-hidden select-none">
      {/* Top Authoritative Bar */}
      <header className="flex h-14 shrink-0 items-center justify-between border-b border-[#DCE2E6] bg-white px-4 sm:px-6 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CC6E0] text-[#20252B]">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold text-[#20252B] line-clamp-1">{paper.name}</h1>
            <span className="text-[10px] text-[#66727D]">
              Candidate: <strong className="text-[#20252B]">{candidate.fullName}</strong> • ID:{' '}
              <strong className="font-mono text-[#20252B]">{candidate.registrationId}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Server-authoritative Countdown Timer */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-xs transition-colors',
              isTimeCritical
                ? 'border-[#E4002B] bg-[#FDEDF0] text-[#E4002B] animate-pulse font-bold'
                : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#20252B]'
            )}
          >
            <Clock className="h-4 w-4 text-[#20252B]" />
            <span className="tabular-nums font-semibold text-base sm:text-lg">
              {formatTimeWithHours(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="rounded-xl border border-[#E4002B]/30 bg-white px-4 py-1.5 text-xs font-semibold tracking-[-0.01em] text-[#E4002B] hover:bg-[#FDEDF0] transition-colors"
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
          <div className="flex items-center justify-between border-b border-[#DCE2E6] bg-white px-4 py-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#66727D]">Section:</span>
              <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-bold text-[#20252B]">
                {currentQ?.subjectName}
              </span>
              <span className="text-[11px] text-[#66727D]">
                (Question {currentIndex + 1} of {questions.length})
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('standard')}
                className={cn(
                  'rounded-lg px-3 py-1 font-semibold transition-colors',
                  viewMode === 'standard' ? 'bg-[#9CC6E0] text-[#20252B]' : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Question View
              </button>
              <button
                onClick={() => setViewMode('omr')}
                className={cn(
                  'rounded-lg px-3 py-1 font-semibold transition-colors',
                  viewMode === 'omr' ? 'bg-[#9CC6E0] text-[#20252B]' : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Live NEET OMR Sheet (180 Qs)
              </button>
            </div>
          </div>

          {/* Question Display Screen */}
          {viewMode === 'standard' ? (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
              {/* Question metadata */}
              <div className="flex items-center justify-between text-xs text-[#66727D]">
                <span>
                  Question Type:{' '}
                  <strong className="text-[#20252B] uppercase">
                    {currentQ?.questionType.replace('_', ' ')}
                  </strong>
                </span>
                <span className="font-mono text-[#20252B] font-bold">
                  +{currentQ?.marks} / -{currentQ?.negativeMarks} Marks
                </span>
              </div>

              {/* Question text with KaTeX support */}
              <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 sm:p-7 shadow-[0_2px_8px_rgba(32,37,43,0.04)] text-[#20252B]">
                <div className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#66727D]">
                  {currentQ?.conceptName}
                </div>
                <div className="text-lg sm:text-[20px] font-medium leading-[1.6]">
                  <MathText content={currentQ?.text || ''} />
                </div>
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
                        'flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all shadow-[0_1px_4px_rgba(32,37,43,0.02)]',
                        isSelected
                          ? 'border-[#9CC6E0] bg-[#9CC6E0]/20 text-[#20252B]'
                          : 'border-[#DCE2E6] bg-white text-[#20252B] hover:border-[#9CC6E0]/60'
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-semibold text-xs transition-colors',
                          isSelected
                            ? 'border-[#9CC6E0] bg-[#9CC6E0] text-[#20252B]'
                            : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]'
                        )}
                      >
                        {opt.key}
                      </span>
                      <MathText content={opt.text} className="text-base font-normal leading-[1.55] text-[#20252B]" />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F1F3F4]">
              <LiveOMRSheet
                totalQuestions={180}
                answers={answers}
                questionIdMap={questionIdMap}
                currentQuestionNumber={currentIndex + 1}
                studentName={candidate.fullName}
                registrationId={candidate.registrationId}
                paperName={paper.name}
                attemptId={attemptId}
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
              />
            </div>
          )}

          {/* Bottom Action Footer */}
          <footer className="flex h-16 shrink-0 items-center justify-between border-t border-[#DCE2E6] bg-white px-4 sm:px-6">
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleMarkForReview}
                className={cn(
                  'rounded-xl border px-3 py-2 text-xs font-semibold transition-colors',
                  currentAnswer?.markedForReview
                    ? 'border-[#9CC6E0] bg-[#9CC6E0]/30 text-[#20252B]'
                    : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
              >
                {currentAnswer?.markedForReview ? 'Unmark Review' : 'Mark for Review'}
              </button>

              <button
                onClick={handleClearResponse}
                disabled={!currentAnswer?.isAnswered}
                className="rounded-xl border border-[#DCE2E6] bg-white px-3 py-2 text-xs text-[#66727D] hover:text-[#E4002B] disabled:opacity-30"
              >
                Clear Response
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className="flex items-center gap-1 rounded-xl border border-[#DCE2E6] bg-white px-3 py-2 text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] disabled:opacity-30 transition-colors"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl bg-[#E4002B] px-5 py-2 text-xs font-bold text-white hover:bg-[#C90026] shadow-sm shadow-[#E4002B]/20 transition-colors"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </div>

        {/* Right: Question Palette Drawer */}
        <aside className="hidden lg:flex lg:w-80 lg:flex-col lg:border-l lg:border-[#DCE2E6] lg:bg-white">
          {/* Candidate badge */}
          <div className="border-b border-[#DCE2E6] bg-[#F1F3F4] p-4">
            <div className="text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">
              Candidate Workspace
            </div>
            <div className="font-mono text-xs font-bold text-[#20252B]">{candidate.fullName}</div>
            <div className="font-mono text-[11px] text-[#66727D]">{candidate.registrationId}</div>
          </div>

          {/* Palette Legend matching User Flow Specification */}
          <div className="grid grid-cols-2 gap-2 border-b border-[#DCE2E6] p-3 text-[11px]">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#E4002B]" />
              <span className="text-[#66727D]">Answered ({stats.answered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full border-2 border-[#E4002B] bg-white" />
              <span className="text-[#66727D]">Visited, Not Ans ({stats.notAnswered})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#9CC6E0]" />
              <span className="text-[#66727D]">Marked Review ({stats.marked})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-[#9CC6E0] ring-1 ring-[#E4002B]" />
              <span className="text-[#66727D]">Ans & Review ({stats.answeredAndMarked})</span>
            </div>
            <div className="flex items-center gap-1.5 col-span-2">
              <div className="h-3 w-3 rounded-full bg-[#E9EEF1] border border-[#DCE2E6]" />
              <span className="text-[#66727D]">Not Visited ({stats.notVisited})</span>
            </div>
          </div>

          {/* Question Palette Grid */}
          <div className="flex-1 overflow-y-auto p-4">
            <div className="text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
              Question Palette (180 Questions)
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
                      'flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold transition-all',
                      isCurrent && 'ring-2 ring-[#20252B] ring-offset-2 ring-offset-white',
                      status === 'answered' && 'bg-[#E4002B] text-white shadow-sm',
                      status === 'not_answered' && 'bg-white text-[#20252B] border-2 border-[#E4002B]',
                      status === 'marked_for_review' && 'bg-[#9CC6E0] text-[#20252B]',
                      status === 'answered_and_marked_for_review' && 'bg-[#9CC6E0] text-[#20252B] ring-2 ring-[#E4002B]',
                      status === 'not_visited' && 'bg-[#E9EEF1] text-[#66727D] border border-[#DCE2E6] hover:border-[#9CC6E0]'
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

      {/* Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/50 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                Are you sure you want to submit your test?
              </h3>
              <button onClick={() => setShowSubmitConfirmModal(false)} className="text-[#66727D] hover:text-[#20252B]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-5 rounded-2xl bg-[#F1F3F4] p-4 border border-[#DCE2E6] space-y-2 text-sm">
              <p className="font-semibold text-[#E4002B]">
                {stats.notAnswered + stats.notVisited} questions unanswered.
              </p>
              <p className="font-semibold text-[#B45309]">
                {stats.marked + stats.answeredAndMarked} questions marked for review.
              </p>
              <p className="text-xs text-[#66727D] pt-1">
                Total Answered: <strong className="text-[#20252B]">{stats.answered}</strong> / {questions.length} questions.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="flex-1 rounded-full border border-[#DCE2E6] bg-white py-3 text-xs font-bold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
              >
                Continue Test
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalSubmit(false)}
                className="flex-1 rounded-full bg-[#E4002B] py-3 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] disabled:opacity-50 transition-all hover:translate-y-[-1px]"
              >
                {isSubmitting ? 'Evaluating...' : 'Submit Test'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION SUCCESS MODAL CARD (EXACTLY REPLICATES USER'S REFERENCE IMAGE 2) */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 backdrop-blur-md p-4">
          <div className="w-full max-w-[560px] rounded-[24px] border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-[0_20px_60px_rgba(38,49,38,0.12)] animate-in fade-in zoom-in-95">
            {/* Top Success Circle Icon */}
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEF1] text-[#20252B]">
              <CheckCircle2 className="h-7 w-7 stroke-[2.2]" />
            </div>

            {/* Title & Subtitle */}
            <h2 className="mt-5 text-2xl font-bold text-[#20252B] font-sans tracking-tight">
              Examination Submitted Successfully
            </h2>
            <p className="mt-2 text-sm text-[#66727D]">
              Your responses have been recorded and your answer sheet is ready.
            </p>

            {/* Document Preview Card */}
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 text-left">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#DCE2E6] text-[#20252B]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#20252B]">NEET OMR Answer Sheet</h4>
                  <p className="text-xs text-[#66727D]">A4 PDF • 180 questions • Personalized</p>
                </div>
              </div>
              <Download className="h-5 w-5 text-[#66727D]" />
            </div>

            {/* Primary Action Button */}
            <button
              onClick={handleManualDownloadPdf}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#E4002B] py-4 text-sm font-bold text-white hover:bg-[#C90026] transition-all shadow-[0_4px_16px_rgba(228,0,43,0.25)]"
            >
              <span>↓ Download OMR PDF</span>
            </button>

            {/* Helper Note */}
            <p className="mt-3 text-xs text-[#66727D]">
              Your download should start automatically.
            </p>

            <div className="my-6 border-t border-[#DCE2E6]" />

            {/* Bottom Links */}
            <div className="flex items-center justify-center gap-8 text-sm font-semibold">
              <Link
                href={`/dashboard/results/${attemptId}`}
                className="text-[#20252B] hover:text-[#20252B] transition-colors"
              >
                View Results
              </Link>
              <Link
                href={`/dashboard/results/${attemptId}?tab=solutions`}
                className="text-[#20252B] hover:text-[#20252B] transition-colors"
              >
                Review Answers
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
