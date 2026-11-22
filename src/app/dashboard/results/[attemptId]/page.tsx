'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Clock,
  Award,
  BarChart3,
  FileDown,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Bookmark,
  Flag,
  RotateCcw,
  TrendingUp,
  Zap,
} from 'lucide-react';
import {
  SAMPLE_NEET_PAPER,
  getFullNeet180Questions,
} from '@/data/seedData';
import { ExamAttemptEvaluation, AnswerState } from '@/types/exam';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { cn, formatDuration, formatTimeWithHours } from '@/lib/utils';
import { toast } from 'sonner';

export default function ExamResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-NEET-01';
  const initialTab = (searchParams.get('tab') as 'overview' | 'solutions' | 'omr') || 'overview';

  const [evaluation, setEvaluation] = useState<ExamAttemptEvaluation | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'omr'>(initialTab);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'unanswered' | 'bookmarked'>('all');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});

  const [candidate, setCandidate] = useState({
    fullName: 'DHANUSH JAGADEESH',
    registrationId: 'FORT-26-000001',
  });

  const questions = useMemo(() => getFullNeet180Questions(), []);

  // Map for 180 questions
  const questionIdMap = useMemo(() => {
    const map: Record<number, string> = {};
    questions.forEach((q, i) => {
      map[i + 1] = q.versionId;
    });
    return map;
  }, [questions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Candidate profile
      const storedCandidate = localStorage.getItem('fort_student_session');
      if (storedCandidate) {
        try {
          const parsed = JSON.parse(storedCandidate);
          setCandidate({
            fullName: (parsed.fullName || 'DHANUSH JAGADEESH').toUpperCase(),
            registrationId: parsed.registrationId || 'FORT-26-000001',
          });
        } catch {}
      }

      // Bookmarks
      const storedBookmarks = localStorage.getItem('fort_saved_bookmarks');
      if (storedBookmarks) {
        try {
          setBookmarkedQuestions(JSON.parse(storedBookmarks));
        } catch {}
      }

      // Answers
      const storedAnswers = localStorage.getItem(`fort_attempt_${attemptId}_answers`);
      if (storedAnswers) {
        try {
          setAnswers(JSON.parse(storedAnswers));
        } catch {}
      }

      // Check local storage for evaluation
      const storedEval = localStorage.getItem(`fort_result_${attemptId}`);
      if (storedEval) {
        try {
          setEvaluation(JSON.parse(storedEval));
          setLoading(false);
          return;
        } catch {}
      }

      // Fetch authoritative result from server
      fetch(`/api/test-attempts/${attemptId}/result`)
        .then((r) => r.json())
        .then((res) => {
          if (res.success && res.data) {
            const data = res.data;
            const evalRecord: ExamAttemptEvaluation = {
              totalScore: data.summary?.totalScore ?? 0,
              maxScore: data.summary?.maxScore ?? 720,
              scorePercentage: data.summary?.percentage ?? 0,
              accuracy: data.summary?.accuracy ?? 0,
              attemptRate: Math.round(
                (((data.summary?.correctCount ?? 0) + (data.summary?.wrongCount ?? 0)) / 180) * 100
              ),
              completionRate: 100,
              timeTakenSeconds: data.durationSeconds ?? 0,
              correctCount: data.summary?.correctCount ?? 0,
              incorrectCount: data.summary?.wrongCount ?? 0,
              unattemptedCount: data.summary?.unansweredCount ?? 180,
              subjectPerformance: data.sectionScores || {
                physics: { subjectName: 'Physics', score: 0, maxScore: 180, correct: 0, incorrect: 0, unattempted: 45, accuracy: 0 },
                chemistry: { subjectName: 'Chemistry', score: 0, maxScore: 180, correct: 0, incorrect: 0, unattempted: 45, accuracy: 0 },
                botany: { subjectName: 'Botany', score: 0, maxScore: 180, correct: 0, incorrect: 0, unattempted: 45, accuracy: 0 },
                zoology: { subjectName: 'Zoology', score: 0, maxScore: 180, correct: 0, incorrect: 0, unattempted: 45, accuracy: 0 },
              },
              conceptPerformance: {},
              questionResults: data.questionReview?.map((qr: any) => ({
                questionVersionId: qr.questionVersionId,
                displayNumber: qr.displayNumber,
                questionType: 'single_correct',
                result: qr.isCorrect ? 'correct' : qr.studentSelectedOptions.length === 0 ? 'unattempted' : 'incorrect',
                marksEarned: qr.marksAwarded,
                timeSpentSeconds: 60,
              })) || [],
            };
            setEvaluation(evalRecord);
            localStorage.setItem(`fort_result_${attemptId}`, JSON.stringify(evalRecord));
          } else {
            setEvaluation(null);
          }
        })
        .catch(() => {
          setEvaluation(null);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [attemptId, questions]);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center text-xs text-[#66727D]">
        <div className="flex flex-col items-center gap-3">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent" />
          <span>Retrieving verified analytical evaluation...</span>
        </div>
      </div>
    );
  }

  if (!evaluation) {
    return (
      <div className="relative min-h-[60vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-[28px] border border-[#DCE2E6] bg-white p-8 text-center shadow-xl space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F1F3F4] text-[#66727D]">
            <Clock className="h-7 w-7 text-[#20252B]" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#20252B]">Scorecard Awaiting Submission</h2>
            <p className="mt-1 text-xs text-[#66727D] leading-relaxed">
              No evaluation record was found for attempt <strong className="font-mono text-[#20252B]">{attemptId}</strong>.
              If this examination is in progress, please return to the active test hall and finalize your submission.
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2">
            <Link
              href={`/exam/${attemptId}`}
              className="w-full rounded-xl bg-[#20252B] py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
            >
              Resume Examination Hall ↗
            </Link>
            <Link
              href="/dashboard"
              className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] py-2.5 text-xs font-semibold text-[#66727D] hover:bg-white transition-colors"
            >
              Return to Student Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const toggleSolution = (qId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  const handleToggleBookmark = (qId: string) => {
    setBookmarkedQuestions((prev) => {
      const updated = { ...prev, [qId]: !prev[qId] };
      if (typeof window !== 'undefined') {
        localStorage.setItem('fort_saved_bookmarks', JSON.stringify(updated));
      }
      toast.success(updated[qId] ? 'Question bookmarked for revision.' : 'Question removed from bookmarks.');
      return updated;
    });
  };

  const handleReportError = (qNum: number) => {
    toast.info(`Feedback logged for Question #${qNum}. Our academic review team will inspect it.`);
  };

  const handleDownloadOmrPdf = () => {
    generateOmrPdf({
      studentName: candidate.fullName,
      registrationId: candidate.registrationId,
      examName: 'FORT NEET (UG)',
      paperName: SAMPLE_NEET_PAPER.name,
      attemptId,
      totalQuestions: 180,
      answers,
      questionIdMap,
      autoDownload: true,
    });
  };

  // Filter questions for Review Answers tab
  const displayQuestions = questions.slice(0, 30);
  const filteredQuestions = displayQuestions.filter((q, idx) => {
    const qRes = evaluation.questionResults[idx]?.result;
    if (reviewFilter === 'incorrect') return qRes === 'incorrect';
    if (reviewFilter === 'unanswered') return qRes === 'unattempted';
    if (reviewFilter === 'bookmarked') return bookmarkedQuestions[q.id];
    return true;
  });

  return (
    <div className="liquid-canvas min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative text-[#20252B]">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 right-1/4 h-80 w-80 opacity-50" />
        <div className="liquid-orb-red bottom-20 left-1/4 h-72 w-72 opacity-20" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#DCE2E6]/80 pb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-[#66727D] hover:text-[#20252B] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Candidate Dashboard</span>
          </Link>

          <div className="glass-pill flex items-center gap-2 px-3 py-1 rounded-full text-xs">
            <span className="text-[#66727D]">Attempt Hash:</span>
            <span className="font-mono text-[#20252B] font-bold">{attemptId}</span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 9: EXACT TEST RESULT SCOREBOARD (MATCHING USER FLOW) */}
        {/* ================================================================ */}
        <div className="glass-polar rounded-[32px] p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6]/80 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="glass-pill rounded-full px-3 py-1 text-xs font-bold text-[#20252B]">
                  OFFICIAL EVALUATION
                </span>
                <span className="text-xs text-[#66727D]">{SAMPLE_NEET_PAPER.name}</span>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold font-sans text-[#20252B]">
                Test Result
              </h1>
              <p className="mt-1 text-xs text-[#66727D]">
                Candidate: <strong className="text-[#20252B]">{candidate.fullName}</strong> • ID:{' '}
                <strong className="font-mono text-[#20252B]">{candidate.registrationId}</strong>
              </p>
            </div>

            <button
              onClick={handleDownloadOmrPdf}
              className="glass-racing-red flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <FileDown className="h-4 w-4" />
              <span>Export Vector OMR (PDF)</span>
            </button>
          </div>

          {/* Primary Big Metrics (Accuracy, Score, Correct, Wrong, Skipped) */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {/* Accuracy */}
            <div className="rounded-[24px] border border-[#DCE2E6] bg-[#F1F3F4] p-5 text-center">
              <div className="text-xs font-semibold text-[#66727D]">Accuracy</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#20252B]">
                {evaluation.accuracy}%
              </div>
              <div className="mt-1 text-[11px] text-[#66727D]">Correct / Attempted</div>
            </div>

            {/* Score */}
            <div className="rounded-[24px] border border-[#DCE2E6] bg-[#F1F3F4] p-5 text-center">
              <div className="text-xs font-semibold text-[#66727D]">Score</div>
              <div className="mt-2 font-mono text-3xl sm:text-4xl font-black text-[#20252B]">
                {evaluation.totalScore}
                <span className="text-xs text-[#66727D] font-normal"> / {evaluation.maxScore}</span>
              </div>
              <div className="mt-1 text-[11px] text-[#66727D]">Net marks earned</div>
            </div>

            {/* Correct */}
            <div className="rounded-[24px] border border-[#9CC6E0]/30 bg-[#E9EEF1]/60 p-5 text-center">
              <div className="text-xs font-semibold text-[#20252B]">Correct</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#20252B]">
                {evaluation.correctCount}
              </div>
              <div className="mt-1 text-[11px] text-[#20252B]">+{evaluation.correctCount * 4} Marks</div>
            </div>

            {/* Wrong */}
            <div className="rounded-[24px] border border-[#E4002B]/20 bg-[#FDEDF0] p-5 text-center">
              <div className="text-xs font-semibold text-[#E4002B]">Wrong</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#E4002B]">
                {evaluation.incorrectCount}
              </div>
              <div className="mt-1 text-[11px] text-[#E4002B]">-{evaluation.incorrectCount} Marks (Penalty)</div>
            </div>

            {/* Skipped */}
            <div className="rounded-[24px] border border-[#DCE2E6] bg-[#F1F3F4] p-5 text-center col-span-2 sm:col-span-1">
              <div className="text-xs font-semibold text-[#66727D]">Skipped</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#66727D]">
                {evaluation.unattemptedCount}
              </div>
              <div className="mt-1 text-[11px] text-[#66727D]">0 Marks change</div>
            </div>
          </div>

          {/* Additional Analytics Row: Time Spent, Avg Time, Strongest, Weakest, Percentile */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-[#DCE2E6] text-xs">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4">
              <div className="text-[#66727D]">Time Invested & Pacing</div>
              <div className="mt-1 text-base font-bold text-[#20252B]">
                {formatTimeWithHours(evaluation.timeTakenSeconds)}
              </div>
              <div className="text-[11px] text-[#66727D]">
                Avg {Math.round(evaluation.timeTakenSeconds / Math.max(1, evaluation.correctCount + evaluation.incorrectCount))}s / question
              </div>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4">
              <div className="text-[#66727D]">Strongest Topic</div>
              <div className="mt-1 text-base font-bold text-[#20252B]">
                Chemical Bonding
              </div>
              <div className="text-[11px] text-[#66727D]">100% Accuracy (5/5)</div>
            </div>

            <div className="rounded-2xl border border-[#E4002B]/20 bg-[#FDEDF0]/50 p-4">
              <div className="text-[#E4002B] font-semibold">Weakest Topic (Remediation)</div>
              <div className="mt-1 text-base font-bold text-[#E4002B]">
                Electrostatics & Gauss Law
              </div>
              <div className="text-[11px] text-[#66727D]">40% Accuracy (2/5)</div>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-4">
              <div className="text-[#66727D]">Percentile Projection</div>
              <div className="mt-1 text-base font-bold text-[#20252B]">
                98.4th Percentile
              </div>
              <div className="text-[11px] text-[#20252B] font-semibold">Projected AIR ~1,420</div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex border-b border-[#DCE2E6] gap-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-[#9CC6E0] text-[#20252B]'
                : 'border-transparent text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Subject & Concept Breakdown
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'solutions'
                ? 'border-[#9CC6E0] text-[#20252B]'
                : 'border-transparent text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Review Answers & Solutions
          </button>
          <button
            onClick={() => setActiveTab('omr')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'omr'
                ? 'border-[#9CC6E0] text-[#20252B]'
                : 'border-transparent text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Physical OMR Sheet (180 Questions)
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Discipline Performance Grid
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(evaluation.subjectPerformance).map(([subKey, data]) => (
                <div key={subKey} className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm">
                  <div className="text-sm font-bold text-[#20252B] font-sans">{data.subjectName}</div>
                  <div className="mt-3 text-2xl font-black font-mono text-[#20252B]">
                    {data.score}{' '}
                    <span className="text-xs text-[#66727D] font-normal">/ {data.maxScore}</span>
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-[#DCE2E6] pt-3 text-xs text-[#66727D]">
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <strong className="text-[#20252B] font-mono">{data.accuracy}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct / Wrong:</span>
                      <span>
                        <strong className="text-[#20252B]">{data.correct}</strong> /{' '}
                        <strong className="text-[#E4002B]">{data.incorrect}</strong>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unattempted:</span>
                      <span className="font-mono">{data.unattempted}</span>
                    </div>
                  </div>

                  <div className="mt-3.5 pt-3 border-t border-[#DCE2E6]/70">
                    <Link
                      href={`/practice/neet/${subKey}`}
                      className="inline-flex items-center gap-1 text-xs font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                    >
                      <span>Practice {data.subjectName}</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* Repeat & Improve Cycle CTA */}
            <div className="glass-glacier rounded-[32px] p-8 text-[#20252B] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#20252B]/70">
                  THE REPEAT CYCLE • PRACTICE → EVALUATE → IMPROVE
                </span>
                <h3 className="text-2xl font-bold font-sans">
                  Ready to eliminate recurring errors in Electrostatics?
                </h3>
                <p className="text-xs text-[#20252B]/80 max-w-xl">
                  Target your weakest topic with a focused 15-question concept drill before your next full mock simulation.
                </p>
              </div>

              <Link
                href="/dashboard/practice"
                className="glass-racing-red rounded-full px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] shrink-0"
              >
                Practice Weak Topic Now
              </Link>
            </div>
          </div>
        )}

        {/* ================================================================ */}
        {/* TAB 2: REVIEW ANSWERS WITH FILTERS (MATCHING USER FLOW STEP 10) */}
        {/* ================================================================ */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            {/* Filter Options */}
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#66727D]">Filter Questions:</span>
                <div className="flex items-center gap-1.5 rounded-full border border-[#DCE2E6] bg-white p-1 text-xs font-semibold shadow-sm">
                  {[
                    { id: 'all', label: 'All', count: displayQuestions.length },
                    { id: 'incorrect', label: 'Incorrect', count: evaluation.incorrectCount },
                    { id: 'unanswered', label: 'Unanswered', count: evaluation.unattemptedCount },
                    { id: 'bookmarked', label: 'Bookmarked', count: Object.values(bookmarkedQuestions).filter(Boolean).length },
                  ].map((flt) => (
                    <button
                      key={flt.id}
                      onClick={() => setReviewFilter(flt.id as any)}
                      className={cn(
                        'rounded-full px-3.5 py-1 transition-all',
                        reviewFilter === flt.id
                          ? 'bg-[#9CC6E0] text-[#20252B] font-bold shadow-sm'
                          : 'text-[#66727D] hover:text-[#20252B]'
                      )}
                    >
                      <span>{flt.label}</span>
                      <span className="ml-1 text-[10px] opacity-80">({flt.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs text-[#66727D]">
                Showing {filteredQuestions.length} questions
              </span>
            </div>

            {/* Questions List */}
            <div className="space-y-6">
              {filteredQuestions.map((q, idx) => {
                const qResult = evaluation.questionResults[idx];
                const isCorrect = qResult?.result === 'correct';
                const isWrong = qResult?.result === 'incorrect';
                const isUnanswered = qResult?.result === 'unattempted';
                const isExpanded = expandedSolutions[q.id];
                const isBookmarked = bookmarkedQuestions[q.id];
                const studentAnswer = answers[q.versionId]?.selectedOptions?.[0] || 'None';
                const correctAnswer = q.answerKey?.correctOptions?.[0] || 'B';

                return (
                  <div
                    key={q.id}
                    className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 sm:p-7 shadow-sm space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2E6] pb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#20252B]">Q{idx + 1}.</span>
                        <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[#20252B] font-semibold">
                          {q.subjectName}
                        </span>
                        <span className="text-[#20252B] font-semibold">{q.conceptName}</span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
                        {/* Status Badge */}
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 font-bold uppercase text-[10px]',
                            isCorrect
                              ? 'bg-[#E9EEF1] text-[#20252B]'
                              : isWrong
                              ? 'bg-[#FDEDF0] text-[#E4002B]'
                              : 'bg-[#F1F3F4] text-[#66727D]'
                          )}
                        >
                          {isCorrect ? 'Correct (+4)' : isWrong ? 'Incorrect (-1)' : 'Unanswered (0)'}
                        </span>

                        {/* Bookmark Button */}
                        <button
                          onClick={() => handleToggleBookmark(q.id)}
                          className={cn(
                            'rounded-full p-2 transition-colors',
                            isBookmarked
                              ? 'bg-[#E9EEF1] text-[#20252B]'
                              : 'text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]'
                          )}
                          title="Bookmark Question"
                        >
                          <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                        </button>

                        {/* Report Error */}
                        <button
                          onClick={() => handleReportError(idx + 1)}
                          className="rounded-full p-2 text-[#66727D] hover:bg-[#FDEDF0] hover:text-[#E4002B] transition-colors"
                          title="Report Error"
                        >
                          <Flag className="h-4 w-4" />
                        </button>

                        {/* Expand Solution Button */}
                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="flex items-center gap-1 font-semibold text-[#20252B] hover:text-[#20252B] transition-colors pl-2"
                        >
                          <span>{isExpanded ? 'Hide' : 'Explain'}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="text-sm text-[#20252B] leading-relaxed">
                      <MathText content={q.text} />
                    </div>

                    {/* Comparison Pill: Candidate selection vs Correct Answer */}
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="rounded-xl bg-[#F1F3F4] px-3.5 py-1.5 border border-[#DCE2E6]">
                        <span className="text-[#66727D]">Your Answer: </span>
                        <strong className={cn('font-mono font-bold', isCorrect ? 'text-[#20252B]' : 'text-[#E4002B]')}>
                          Option {studentAnswer}
                        </strong>
                      </div>
                      <div className="rounded-xl bg-[#E9EEF1] px-3.5 py-1.5 border border-[#9CC6E0]/30">
                        <span className="text-[#20252B]">Correct Answer: </span>
                        <strong className="font-mono font-bold text-[#20252B]">
                          Option {correctAnswer}
                        </strong>
                      </div>
                    </div>

                    {/* Options Grid */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                      {q.options.map((opt) => {
                        const isCorrectOption = q.answerKey?.correctOptions?.includes(opt.key);
                        const isStudentChoice = studentAnswer === opt.key;

                        return (
                          <div
                            key={opt.key}
                            className={cn(
                              'flex items-center gap-2.5 rounded-xl border p-3 transition-colors',
                              isCorrectOption
                                ? 'border-[#9CC6E0] bg-[#E9EEF1] text-[#20252B]'
                                : isStudentChoice && !isCorrectOption
                                ? 'border-[#E4002B] bg-[#FDEDF0] text-[#E4002B]'
                                : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]'
                            )}
                          >
                            <span className="font-mono font-bold">{opt.key}.</span>
                            <MathText content={opt.text} />
                            {isCorrectOption && (
                              <CheckCircle2 className="h-4 w-4 text-[#20252B] ml-auto shrink-0" />
                            )}
                            {isStudentChoice && !isCorrectOption && (
                              <XCircle className="h-4 w-4 text-[#E4002B] ml-auto shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation & Why Other Options are Wrong */}
                    {isExpanded && q.explanation && (
                      <div className="rounded-2xl border border-[#9CC6E0]/40 bg-[#F1F3F4] p-6 text-xs space-y-4 animate-in fade-in">
                        <div>
                          <div className="font-bold text-[#20252B] uppercase tracking-wider text-[11px]">
                            Detailed Scientific Explanation
                          </div>
                          <div className="mt-1 leading-relaxed text-[#20252B]">
                            <MathText content={q.explanation.text} />
                          </div>
                        </div>

                        {/* Why Other Options are Wrong */}
                        <div className="pt-3 border-t border-[#DCE2E6]">
                          <div className="font-bold text-[#20252B] uppercase tracking-wider text-[11px]">
                            Why other options are wrong:
                          </div>
                          <p className="mt-1 text-[#66727D] leading-relaxed">
                            Distractor options incorporate typical sign errors (forgetting the direction of friction), unit conversions (converting cm to meters), or utilizing the scalar formula rather than the vector dot product.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: EVALUATED OMR SHEET (180 QUESTIONS) */}
        {activeTab === 'omr' && (
          <div className="space-y-4">
            <LiveOMRSheet
              totalQuestions={180}
              answers={answers}
              questionIdMap={questionIdMap}
              isReadOnly={true}
              studentName={candidate.fullName}
              registrationId={candidate.registrationId}
              paperName={SAMPLE_NEET_PAPER.name}
              attemptId={attemptId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
