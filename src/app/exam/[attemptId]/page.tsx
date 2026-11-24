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
  RotateCcw,
} from 'lucide-react';
import {
  QuestionData,
  AnswerState,
  QuestionPaletteStatus,
  ExamAttemptEvaluation,
} from '@/types/exam';
import { evaluateAttempt } from '@/lib/scoring/engine';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { VirtualNumericKeypad } from '@/components/exam/VirtualNumericKeypad';
import { NtaPaletteStatusIcon } from '@/components/exam/NtaPaletteStatusIcon';
import { CbtAccessibilityBar } from '@/components/exam/CbtAccessibilityBar';
import { cn, formatTimeWithHours } from '@/lib/utils';
import { toast } from 'sonner';

export default function ExamExecutionPage() {
  const params = useParams();
  const router = useRouter();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-JEE-01';

  const [paperName, setPaperName] = useState<string>('JEE Main Computer-Based Simulation');
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [currentIndex, setCurrentIndex] = useState(0); // 0-based index
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });
  const [viewMode, setViewMode] = useState<'standard' | 'omr'>('standard');
  const [showSubmitConfirmModal, setShowSubmitConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'saving' | 'offline'>('synced');

  // Accessibility States (NTA CBT Appendix III)
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPaletteCollapsed, setIsPaletteCollapsed] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const questionScrollRef = useRef<HTMLDivElement | null>(null);

  // Authenticated candidate profile
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-CANDIDATE',
  });

  // Server-authoritative countdown timer simulation (180 minutes = 10800 seconds standard)
  const [secondsRemaining, setSecondsRemaining] = useState<number>(10800);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const autosaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Detect whether this is a NEET paper with physical OMR or CBT exam (JEE Main / Adv / GATE)
  const isNeetPaper = useMemo(() => {
    const lower = paperName.toLowerCase();
    return lower.includes('neet') || attemptId.toLowerCase().includes('neet');
  }, [paperName, attemptId]);

  useEffect(() => {
    // Retrieve authentic candidate profile from session
    if (typeof window !== 'undefined') {
      const stored =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCandidate({
            fullName: (parsed.fullName || 'Candidate').toUpperCase(),
            registrationId: parsed.registrationId || 'MW-CANDIDATE',
          });
        } catch {}
      }

      // Check if previous answers exist in localStorage for offline recovery buffer
      const savedAnswers = localStorage.getItem(`fort_attempt_${attemptId}_answers`);
      if (savedAnswers) {
        try {
          setAnswers(JSON.parse(savedAnswers));
        } catch {}
      }
    }

    // SECTION 9 & 25 MANDATORY: FETCH AUTHORITATIVE ATTEMPT STATE & SERVER DEADLINE
    fetch(`/api/test-attempts/${attemptId}`)
      .then((r) => r.json())
      .then((res) => {
        setIsLoading(false);
        if (res.success && res.data) {
          const attemptData = res.data;
          setPaperName(attemptData.paperName || 'Joint Entrance Examination (Main)');

          // Set sanitized questions without answer keys
          if (attemptData.questions && attemptData.questions.length > 0) {
            setQuestions(attemptData.questions);
          } else {
            setLoadError('This paper does not contain any published questions.');
          }

          // If attempt has already been submitted, redirect to verified result
          if (
            attemptData.status === 'submitted' ||
            attemptData.status === 'auto_submitted' ||
            attemptData.status === 'evaluated'
          ) {
            toast.info('This test attempt was already submitted and locked.');
            router.push(`/dashboard/results/${attemptId}`);
            return;
          }

          // Anchor timer to authoritative server deadline
          if (attemptData.deadlineAt) {
            const serverRemaining = Math.max(
              0,
              Math.floor((new Date(attemptData.deadlineAt).getTime() - Date.now()) / 1000)
            );
            setSecondsRemaining(serverRemaining);
            if (serverRemaining <= 0) {
              handleFinalSubmit(true);
              return;
            }
          }

          // Merge any authoritative server responses with local buffer
          if (attemptData.responses && Object.keys(attemptData.responses).length > 0) {
            setAnswers((prev) => ({ ...attemptData.responses, ...prev }));
          }

          setSyncStatus('synced');
        } else {
          setLoadError(res.error || 'Examination attempt not found.');
        }
      })
      .catch((err) => {
        setIsLoading(false);
        setLoadError('Unable to connect to examination server.');
        setSyncStatus('offline');
      });

    timerRef.current = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          handleFinalSubmit(true); // Auto-submission on deadline expiration (NTA Appendix III Rule 2)
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    };
  }, [attemptId, router]);

  const currentQ = questions[currentIndex];

  // Subject sections derived dynamically from questions (Physics, Chemistry, Mathematics)
  const subjectSections = useMemo(() => {
    const list: { name: string; slug: string; startIndex: number; count: number }[] = [];
    questions.forEach((q, idx) => {
      const existing = list.find((s) => s.slug === q.subjectSlug);
      if (!existing) {
        list.push({
          name: q.subjectName,
          slug: q.subjectSlug,
          startIndex: idx,
          count: 1,
        });
      } else {
        existing.count++;
      }
    });
    return list;
  }, [questions]);

  // Current active subject section
  const currentSection = useMemo(() => {
    return subjectSections.find((sec) => sec.slug === currentQ?.subjectSlug);
  }, [subjectSections, currentQ]);

  // Palette status calculator matching NTA CBT 5 States (Appendix III)
  const getPaletteStatus = (index: number): QuestionPaletteStatus => {
    const q = questions[index];
    if (!q) return 'not_visited';
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

  const syncResponseToServer = (questionVersionId: string, state: AnswerState) => {
    if (autosaveTimeoutRef.current) clearTimeout(autosaveTimeoutRef.current);
    setSyncStatus('saving');
    autosaveTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/test-attempts/${attemptId}/responses`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            questionVersionId,
            selectedOptions: state.selectedOptions,
            numericalValue: state.numericalValue,
            markedForReview: state.markedForReview,
          }),
        });
        if (res.ok) {
          setSyncStatus('synced');
        } else {
          setSyncStatus('offline');
        }
      } catch {
        setSyncStatus('offline');
      }
    }, 350);
  };

  // Option selection for MCQ questions
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
      // Toggle if already selected or pick new
      nextSelected = existing?.selectedOptions?.[0] === optionKey ? [] : [optionKey];
    }

    const isNowAnswered = nextSelected.length > 0;
    const nextState: AnswerState = {
      questionVersionId: currentQ.versionId,
      selectedOptions: nextSelected,
      isAnswered: isNowAnswered,
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
    syncResponseToServer(currentQ.versionId, nextState);
  };

  // Numerical response input for Section B questions via virtual keypad
  const handleSelectNumericalValue = (rawVal: string) => {
    if (!currentQ) return;
    const existing = answers[currentQ.versionId];
    const isBlank = rawVal.trim() === '';
    const parsed = isBlank || isNaN(Number(rawVal)) ? undefined : Number(rawVal);

    const nextState: AnswerState = {
      questionVersionId: currentQ.versionId,
      numericalValue: parsed,
      textResponse: rawVal,
      isAnswered: parsed !== undefined,
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
    syncResponseToServer(currentQ.versionId, nextState);
  };

  // NTA Rule 10: Mark for Review & Next
  const handleMarkForReviewAndNext = () => {
    if (!currentQ) return;
    const existing = answers[currentQ.versionId];
    const nextState: AnswerState = {
      questionVersionId: currentQ.versionId,
      selectedOptions: existing?.selectedOptions || [],
      numericalValue: existing?.numericalValue,
      textResponse: existing?.textResponse,
      isAnswered: existing?.isAnswered || false,
      markedForReview: true,
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
    syncResponseToServer(currentQ.versionId, nextState);
    handleNext();
  };

  // NTA Rule 11: Clear Response
  const handleClearResponse = () => {
    if (!currentQ) return;
    const nextAnswers = { ...answers };
    delete nextAnswers[currentQ.versionId];
    setAnswers(nextAnswers);

    if (typeof window !== 'undefined') {
      localStorage.setItem(`fort_attempt_${attemptId}_answers`, JSON.stringify(nextAnswers));
    }
    syncResponseToServer(currentQ.versionId, {
      questionVersionId: currentQ.versionId,
      selectedOptions: [],
      numericalValue: undefined,
      textResponse: '',
      isAnswered: false,
      markedForReview: false,
      timeSpentSeconds: 0,
      lastUpdated: Date.now(),
    });
  };

  // NTA Rule 8(b) & 13: Save & Next with Automatic Section Advance
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

  // Quick scroll helpers
  const handleScrollTop = () => {
    questionScrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleScrollBottom = () => {
    if (questionScrollRef.current) {
      questionScrollRef.current.scrollTo({
        top: questionScrollRef.current.scrollHeight,
        behavior: 'smooth',
      });
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
  const handleFinalSubmit = async (isAuto: boolean = false) => {
    setIsSubmitting(true);
    setShowSubmitConfirmModal(false);

    let evaluation: ExamAttemptEvaluation | null = null;
    let finalDuration = 10800 - secondsRemaining;

    // Authoritative submission to backend
    try {
      const res = await fetch(`/api/test-attempts/${attemptId}/submit`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ answers }),
      });
      const data = await res.json();
      if (data.success && data.data?.evaluation) {
        evaluation = data.data.evaluation;
        if (data.data.durationSeconds) {
          finalDuration = data.data.durationSeconds;
        }
      }
    } catch (err) {
      console.warn('Backend submission failed, falling back to local scoring engine:', err);
    }

    // Fallback scoring if offline
    if (!evaluation) {
      evaluation = evaluateAttempt({
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
        durationSeconds: finalDuration,
      });
    }

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
          paperName,
          paperSlug: attemptId,
          totalScore: evaluation.totalScore,
          maxScore: evaluation.maxScore,
          accuracy: evaluation.accuracy,
          totalQuestions: questions.length,
          correctCount: evaluation.correctCount,
          wrongCount: evaluation.incorrectCount,
          unansweredCount: evaluation.unattemptedCount,
          completedAt: new Date().toISOString(),
          timeSpentSeconds: finalDuration,
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

    // Automatically generate and download PDF if requested
    try {
      generateOmrPdf({
        studentName: candidate.fullName,
        registrationId: candidate.registrationId,
        examName: isNeetPaper ? 'NEET (UG) National Examination' : 'JEE Main Official CBT Simulation',
        paperName,
        attemptId,
        submissionTime: submissionTimestamp,
        totalQuestions: questions.length,
        answers,
        questionIdMap,
        autoDownload: isNeetPaper,
      });
      if (isNeetPaper) {
        toast.success('Responses recorded. Downloading personalized OMR PDF...');
      }
    } catch (err) {
      console.error('Auto PDF download error:', err);
    }

    setShowSuccessModal(true);
    setIsSubmitting(false);
  };

  const handleManualDownloadPdf = () => {
    generateOmrPdf({
      studentName: candidate.fullName,
      registrationId: candidate.registrationId,
      examName: isNeetPaper ? 'NEET (UG) National Examination' : 'JEE Main Official CBT Simulation',
      paperName,
      attemptId,
      totalQuestions: questions.length,
      answers,
      questionIdMap,
      autoDownload: true,
    });
  };

  const isTimeCritical = secondsRemaining < 300; // Less than 5 mins

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F1F3F4] text-xs text-[#66727D]">
        <div className="flex flex-col items-center gap-2">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent" />
          <span>Loading verified examination material...</span>
        </div>
      </div>
    );
  }

  if (loadError || questions.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center p-6 bg-[#F1F3F4] text-[#20252B]">
        <div className="glass-polar max-w-md w-full rounded-[36px] p-8 text-center space-y-4 shadow-xl">
          <div className="h-12 w-12 mx-auto rounded-2xl bg-[#9CC6E0]/30 flex items-center justify-center text-[#20252B]">
            <FileText className="h-6 w-6 stroke-[2]" />
          </div>
          <h2 className="text-lg font-bold font-sans text-[#20252B]">
            Papers are being prepared
          </h2>
          <p className="text-xs text-[#66727D] leading-relaxed">
            {loadError || 'The selected examination papers will appear here once they are published by an authorized administrator.'}
          </p>
          <div className="pt-2">
            <Link
              href="/dashboard/jee-main"
              className="inline-flex items-center gap-1.5 rounded-full bg-[#20252B] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition-all"
            >
              <span>Back to JEE Main Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Question font size scale mapping
  const questionTextClass =
    fontSize === 'xlarge'
      ? 'text-2xl sm:text-[26px] leading-[1.7]'
      : fontSize === 'large'
      ? 'text-xl sm:text-[22px] leading-[1.65]'
      : 'text-lg sm:text-[20px] leading-[1.6]';

  const optionTextClass =
    fontSize === 'xlarge'
      ? 'text-lg sm:text-xl font-normal leading-[1.6]'
      : fontSize === 'large'
      ? 'text-base sm:text-lg font-normal leading-[1.55]'
      : 'text-sm sm:text-base font-normal leading-[1.5]';

  return (
    <div
      className={cn(
        'flex h-screen flex-col overflow-hidden select-none transition-colors duration-200',
        isDarkMode ? 'bg-[#0D1117] text-[#E6EDF3]' : 'bg-[#F1F3F4] text-[#20252B]'
      )}
    >
      {/* Top Authoritative Bar */}
      <header
        className={cn(
          'flex h-14 shrink-0 items-center justify-between border-b px-4 sm:px-6 shadow-sm transition-colors',
          isDarkMode ? 'border-gray-800 bg-[#161B22]' : 'border-[#DCE2E6] bg-white'
        )}
      >
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CC6E0] text-[#20252B]">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-xs sm:text-sm font-bold line-clamp-1">{paperName}</h1>
            <span className="text-[10px] text-[#66727D]">
              Candidate:{' '}
              <strong className={isDarkMode ? 'text-gray-100' : 'text-[#20252B]'}>
                {candidate.fullName}
              </strong>{' '}
              • ID:{' '}
              <strong className={cn('font-mono', isDarkMode ? 'text-gray-100' : 'text-[#20252B]')}>
                {candidate.registrationId}
              </strong>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          {/* Server Sync Status Pill */}
          <div
            className={cn(
              'hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-xl border text-[11px] font-medium shadow-sm',
              isDarkMode ? 'border-gray-700 bg-gray-800' : 'border-[#DCE2E6] bg-white'
            )}
          >
            {syncStatus === 'synced' && (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500" />
                <span>Server Synced</span>
              </>
            )}
            {syncStatus === 'saving' && (
              <>
                <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[#66727D]">Autosaving...</span>
              </>
            )}
            {syncStatus === 'offline' && (
              <>
                <span className="h-2 w-2 rounded-full bg-[#E4002B]" />
                <span className="text-[#E4002B]">Offline Buffer</span>
              </>
            )}
          </div>

          {/* Server-authoritative Countdown Timer (NTA Rule 2) */}
          <div
            className={cn(
              'flex items-center gap-2 rounded-xl border px-3 py-1.5 font-mono text-xs transition-colors',
              isTimeCritical
                ? 'border-[#E4002B] bg-[#FDEDF0] text-[#E4002B] animate-pulse font-bold'
                : isDarkMode
                ? 'border-gray-700 bg-gray-800 text-gray-100'
                : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#20252B]'
            )}
          >
            <Clock className="h-4 w-4" />
            <span className="tabular-nums font-semibold text-base sm:text-lg">
              {formatTimeWithHours(secondsRemaining)}
            </span>
          </div>

          <button
            onClick={() => setShowSubmitConfirmModal(true)}
            className="rounded-xl border border-[#E4002B]/40 bg-white px-4 py-1.5 text-xs font-semibold tracking-[-0.01em] text-[#E4002B] hover:bg-[#FDEDF0] transition-colors"
          >
            Submit Test
          </button>
        </div>
      </header>

      {/* Official CBT Accessibility Bar (Dark Mode, Font Sizing, Screen Zoom, Palette Toggle, Language) */}
      <CbtAccessibilityBar
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        fontSize={fontSize}
        onChangeFontSize={(sz) => setFontSize(sz)}
        isPaletteCollapsed={isPaletteCollapsed}
        onTogglePalette={() => setIsPaletteCollapsed((prev) => !prev)}
        onScrollTop={handleScrollTop}
        onScrollBottom={handleScrollBottom}
        selectedLanguage={selectedLanguage}
        onChangeLanguage={(l) => setSelectedLanguage(l)}
      />

      {/* Main Examination Workspace */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left/Center: Question or OMR Area */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Section Navigation Tabs (NTA Rule 12: Physics, Chemistry, Mathematics) */}
          <div
            className={cn(
              'flex items-center justify-between border-b px-4 py-2 text-xs transition-colors overflow-x-auto',
              isDarkMode ? 'border-gray-800 bg-[#161B22]' : 'border-[#DCE2E6] bg-white'
            )}
          >
            <div className="flex items-center gap-2">
              <span className="font-semibold text-[#66727D] hidden sm:inline">Sections:</span>
              <div className="flex items-center gap-1.5">
                {subjectSections.map((sec) => {
                  const isActive = currentQ?.subjectSlug === sec.slug;
                  return (
                    <button
                      key={sec.slug}
                      onClick={() => handleJumpToQuestion(sec.startIndex + 1)}
                      className={cn(
                        'rounded-lg px-3 py-1 font-bold text-xs transition-colors',
                        isActive
                          ? isDarkMode
                            ? 'bg-[#9CC6E0] text-[#20252B]'
                            : 'bg-[#20252B] text-white shadow-sm'
                          : isDarkMode
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                          : 'bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                      )}
                    >
                      <span>{sec.name}</span>
                      <span className="ml-1 opacity-70 text-[10px]">({sec.count} Qs)</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* View Mode Switcher if NEET */}
            {isNeetPaper && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('standard')}
                  className={cn(
                    'rounded-lg px-3 py-1 font-semibold transition-colors',
                    viewMode === 'standard' ? 'bg-[#9CC6E0] text-[#20252B]' : 'text-[#66727D]'
                  )}
                >
                  CBT View
                </button>
                <button
                  onClick={() => setViewMode('omr')}
                  className={cn(
                    'rounded-lg px-3 py-1 font-semibold transition-colors',
                    viewMode === 'omr' ? 'bg-[#9CC6E0] text-[#20252B]' : 'text-[#66727D]'
                  )}
                >
                  Live NEET OMR
                </button>
              </div>
            )}
          </div>

          {/* Question Display Screen */}
          {viewMode === 'standard' ? (
            <div
              ref={questionScrollRef}
              className={cn(
                'flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6 transition-colors',
                isDarkMode ? 'bg-[#0D1117]' : 'bg-[#F1F3F4]'
              )}
            >
              {/* Question Metadata & Section Tag */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-[#66727D]">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 font-bold uppercase tracking-wider text-[10px]',
                      currentQ?.questionType === 'numerical'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-blue-100 text-blue-800 border border-blue-300'
                    )}
                  >
                    {currentQ?.questionType === 'numerical'
                      ? 'Section B • Numerical Value (NVQ)'
                      : 'Section A • Single Choice MCQ'}
                  </span>
                  <span>
                    Question <strong>{currentIndex + 1}</strong> of {questions.length}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    +{currentQ?.marks} Marks
                  </span>
                  <span className="font-mono font-bold text-[#E4002B] bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    -{currentQ?.negativeMarks} Mark
                  </span>
                </div>
              </div>

              {/* Question Statement Box with KaTeX Support */}
              <div
                className={cn(
                  'rounded-2xl border p-6 sm:p-8 shadow-sm transition-colors',
                  isDarkMode
                    ? 'border-gray-800 bg-[#161B22] text-[#E6EDF3]'
                    : 'border-[#DCE2E6] bg-white text-[#20252B]'
                )}
              >
                {currentQ?.conceptName && (
                  <div className="mb-3 text-xs font-semibold uppercase tracking-[0.08em] text-[#66727D]">
                    {currentQ.subjectName} • {currentQ.conceptName}
                  </div>
                )}
                <div className={cn('font-medium', questionTextClass)}>
                  <MathText content={currentQ?.text || ''} />
                </div>
              </div>

              {/* Answer Input Area: MCQs vs Numerical Section B */}
              {currentQ?.questionType === 'numerical' ? (
                /* SECTION B: On-Screen Virtual Numeric Keypad (Appendix III Rule 21.b) */
                <div className="space-y-4">
                  <div
                    className={cn(
                      'rounded-2xl border p-4 text-xs leading-relaxed',
                      isDarkMode
                        ? 'border-amber-900/60 bg-amber-950/30 text-amber-200'
                        : 'border-amber-200 bg-amber-50 text-amber-800'
                    )}
                  >
                    <strong>Section B Answering Rule:</strong> Enter your answer using the on-screen
                    virtual keypad below. Physical keyboard input is disabled per NTA examination
                    guidelines. The answer must be rounded off to the nearest integer.
                  </div>

                  <VirtualNumericKeypad
                    value={
                      currentAnswer?.textResponse ??
                      (currentAnswer?.numericalValue !== undefined
                        ? String(currentAnswer.numericalValue)
                        : '')
                    }
                    onChange={(newVal) => handleSelectNumericalValue(newVal)}
                    onClear={handleClearResponse}
                  />
                </div>
              ) : (
                /* SECTION A: Standard MCQs */
                <div className="space-y-3">
                  {currentQ?.options.map((opt) => {
                    const isSelected = currentAnswer?.selectedOptions?.includes(opt.key);
                    return (
                      <div
                        key={opt.key}
                        onClick={() => handleSelectOption(opt.key)}
                        className={cn(
                          'flex items-center gap-4 rounded-xl border p-4 cursor-pointer transition-all shadow-sm',
                          isSelected
                            ? isDarkMode
                              ? 'border-[#9CC6E0] bg-[#9CC6E0]/20 text-white ring-1 ring-[#9CC6E0]'
                              : 'border-[#9CC6E0] bg-[#9CC6E0]/20 text-[#20252B]'
                            : isDarkMode
                            ? 'border-gray-800 bg-[#161B22] text-gray-200 hover:border-gray-700'
                            : 'border-[#DCE2E6] bg-white text-[#20252B] hover:border-[#9CC6E0]/60'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-7 w-7 shrink-0 items-center justify-center rounded-full border font-semibold text-xs transition-colors',
                            isSelected
                              ? 'border-[#9CC6E0] bg-[#9CC6E0] text-[#20252B]'
                              : isDarkMode
                              ? 'border-gray-700 bg-gray-800 text-gray-300'
                              : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]'
                          )}
                        >
                          {opt.key}
                        </span>
                        <MathText content={opt.text} className={optionTextClass} />
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#F1F3F4]">
              <LiveOMRSheet
                totalQuestions={questions.length}
                answers={answers}
                questionIdMap={questionIdMap}
                currentQuestionNumber={currentIndex + 1}
                studentName={candidate.fullName}
                registrationId={candidate.registrationId}
                paperName={paperName}
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

          {/* Bottom Action Footer (NTA Rule 8(b), 9(b), 10: Clear Response, Mark for Review & Next, Save & Next) */}
          <footer
            className={cn(
              'flex flex-wrap h-auto sm:h-16 shrink-0 items-center justify-between gap-2 border-t px-4 sm:px-6 py-2 transition-colors',
              isDarkMode ? 'border-gray-800 bg-[#161B22]' : 'border-[#DCE2E6] bg-white'
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              {/* NTA Rule 10: Mark for Review & Next */}
              <button
                type="button"
                onClick={handleMarkForReviewAndNext}
                className={cn(
                  'rounded-xl border px-3.5 py-2 text-xs font-semibold transition-colors',
                  currentAnswer?.markedForReview
                    ? 'border-[#673AB7] bg-[#673AB7]/20 text-[#673AB7] font-bold'
                    : isDarkMode
                    ? 'border-gray-700 bg-gray-800 text-gray-300 hover:bg-gray-700'
                    : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
                title="Mark for Review and advance to next question"
              >
                Mark for Review & Next
              </button>

              {/* NTA Rule 9(b) & 11: Clear Response */}
              <button
                type="button"
                onClick={handleClearResponse}
                disabled={!currentAnswer?.isAnswered && !currentAnswer?.markedForReview}
                className="flex items-center gap-1 rounded-xl border border-[#DCE2E6] bg-white px-3 py-2 text-xs text-[#66727D] hover:text-[#E4002B] disabled:opacity-30 transition-colors"
                title="Clear selected answer response"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentIndex === 0}
                className={cn(
                  'flex items-center gap-1 rounded-xl border px-3 py-2 text-xs font-semibold disabled:opacity-30 transition-colors',
                  isDarkMode
                    ? 'border-gray-700 bg-gray-800 text-gray-200 hover:bg-gray-700'
                    : 'border-[#DCE2E6] bg-white text-[#20252B] hover:bg-[#F1F3F4]'
                )}
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Previous</span>
              </button>

              {/* NTA Rule 8(b) & 13: Save & Next */}
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-1 rounded-xl bg-[#2E7D32] px-5 py-2 text-xs font-bold text-white hover:bg-[#1B5E20] shadow-sm shadow-[#2E7D32]/20 transition-colors"
              >
                <span>Save & Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </div>

        {/* Right: Question Palette Drawer (Collapsible via isPaletteCollapsed) */}
        {!isPaletteCollapsed && (
          <aside
            className={cn(
              'hidden lg:flex lg:w-80 lg:flex-col lg:border-l transition-colors',
              isDarkMode ? 'border-gray-800 bg-[#161B22]' : 'border-[#DCE2E6] bg-white'
            )}
          >
            {/* Candidate workspace badge */}
            <div
              className={cn(
                'border-b p-4 transition-colors',
                isDarkMode ? 'border-gray-800 bg-gray-900/60' : 'border-[#DCE2E6] bg-[#F1F3F4]'
              )}
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">
                Candidate Console
              </div>
              <div className="font-mono text-xs font-bold">{candidate.fullName}</div>
              <div className="font-mono text-[11px] text-[#66727D]">{candidate.registrationId}</div>
            </div>

            {/* Official NTA CBT 5-Status Legend (Appendix III Rule 3 & 20) */}
            <div
              className={cn(
                'grid grid-cols-2 gap-2.5 border-b p-3.5 text-[11px]',
                isDarkMode ? 'border-gray-800' : 'border-[#DCE2E6]'
              )}
            >
              <div className="flex items-center gap-2">
                <NtaPaletteStatusIcon status="answered" number={stats.answered} className="h-6 w-6 text-[10px]" />
                <span className="text-[#66727D]">Answered ({stats.answered})</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteStatusIcon status="not_answered" number={stats.notAnswered} className="h-6 w-6 text-[10px]" />
                <span className="text-[#66727D]">Not Answered ({stats.notAnswered})</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteStatusIcon status="not_visited" number={stats.notVisited} className="h-6 w-6 text-[10px]" />
                <span className="text-[#66727D]">Not Visited ({stats.notVisited})</span>
              </div>
              <div className="flex items-center gap-2">
                <NtaPaletteStatusIcon status="marked_for_review" number={stats.marked} className="h-6 w-6 text-[10px]" />
                <span className="text-[#66727D]">Marked Review ({stats.marked})</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 pt-1 border-t border-dashed border-gray-300">
                <NtaPaletteStatusIcon
                  status="answered_and_marked_for_review"
                  number={stats.answeredAndMarked}
                  className="h-6 w-6 text-[10px]"
                />
                <div className="text-[10px] leading-tight text-[#66727D]">
                  <strong className="text-emerald-600">Ans & Marked for Review ({stats.answeredAndMarked})</strong>
                  <br />
                  <span className="text-[9px] text-[#A0AEC0]">*Will be considered for evaluation</span>
                </div>
              </div>
            </div>

            {/* Question Palette Grid */}
            <div className="flex-1 overflow-y-auto p-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#66727D] mb-3">
                <span>
                  {currentSection ? currentSection.name : 'Questions'} ({questions.length})
                </span>
                <span className="text-[10px] font-normal normal-case text-[#A0AEC0]">Click to jump</span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const status = getPaletteStatus(idx);
                  const isCurrent = currentIndex === idx;

                  return (
                    <NtaPaletteStatusIcon
                      key={q.id}
                      status={status}
                      number={idx + 1}
                      isCurrent={isCurrent}
                      onClick={() => {
                        handleJumpToQuestion(idx + 1);
                        setViewMode('standard');
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </aside>
        )}
      </div>

      {/* Confirmation Modal */}
      {showSubmitConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl text-[#20252B]">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                Submit Examination Paper?
              </h3>
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="text-[#66727D] hover:text-[#20252B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="my-5 rounded-2xl bg-[#F1F3F4] p-4 border border-[#DCE2E6] space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-[#66727D]">Total Questions:</span>
                <strong className="font-mono">{questions.length}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-700">Answered:</span>
                <strong className="font-mono text-emerald-700">{stats.answered}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#E4002B]">Unanswered:</span>
                <strong className="font-mono text-[#E4002B]">{stats.notAnswered + stats.notVisited}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-[#673AB7]">Marked for Review:</span>
                <strong className="font-mono text-[#673AB7]">{stats.marked}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-emerald-800">Answered & Marked for Review:</span>
                <strong className="font-mono text-emerald-800">{stats.answeredAndMarked}</strong>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitConfirmModal(false)}
                className="flex-1 rounded-full border border-[#DCE2E6] bg-white py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
              >
                Resume Test
              </button>
              <button
                type="button"
                disabled={isSubmitting}
                onClick={() => handleFinalSubmit(false)}
                className="flex-1 rounded-full bg-[#E4002B] py-2.5 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] disabled:opacity-50 transition-all"
              >
                {isSubmitting ? 'Finalizing...' : 'Confirm Submission'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUBMISSION SUCCESS MODAL */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 backdrop-blur-md p-4">
          <div className="w-full max-w-[560px] rounded-[24px] border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-2xl text-[#20252B] animate-in fade-in zoom-in-95">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E9EEF1] text-[#20252B]">
              <CheckCircle2 className="h-7 w-7 stroke-[2.2]" />
            </div>

            <h2 className="mt-5 text-2xl font-bold font-sans tracking-tight">
              Test Completed & Responses Recorded
            </h2>
            <p className="mt-2 text-sm text-[#66727D]">
              Your responses have been authoritatively recorded on the server.
            </p>

            <div className="mt-6 flex items-center justify-between rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 text-left">
              <div className="flex items-center gap-3.5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white border border-[#DCE2E6] text-[#20252B]">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#20252B]">Official Examination Summary</h4>
                  <p className="text-xs text-[#66727D]">
                    {isNeetPaper ? 'A4 PDF • Personalized NEET OMR Sheet' : 'Computer-Based Testing Attempt Summary'}
                  </p>
                </div>
              </div>
              <Download className="h-5 w-5 text-[#66727D]" />
            </div>

            <button
              onClick={handleManualDownloadPdf}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#20252B] py-3.5 text-sm font-bold text-white hover:bg-black transition-all shadow-md"
            >
              <span>Download Examination Report (PDF)</span>
            </button>

            <div className="my-6 border-t border-[#DCE2E6]" />

            <div className="flex items-center justify-center gap-8 text-sm font-semibold">
              <Link
                href={`/dashboard/results/${attemptId}`}
                className="text-[#20252B] hover:underline transition-colors"
              >
                View Detailed Scorecard
              </Link>
              <Link
                href={`/dashboard/results/${attemptId}?tab=solutions`}
                className="text-[#20252B] hover:underline transition-colors"
              >
                Review Step-by-Step Solutions
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
