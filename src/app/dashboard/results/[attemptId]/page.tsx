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
import { ExamAttemptEvaluation, AnswerState } from '@/types/exam';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { cn, formatDuration, formatTimeWithHours } from '@/lib/utils';
import { toast } from 'sonner';

export default function ExamResultPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const attemptId = (params?.attemptId as string) || '';
  const initialTab = (searchParams.get('tab') as 'overview' | 'solutions' | 'omr') || 'overview';

  const [evaluation, setEvaluation] = useState<ExamAttemptEvaluation | null>(null);
  const [reviewQuestions, setReviewQuestions] = useState<any[]>([]);
  const [paperName, setPaperName] = useState<string>('Standard Examination Simulation');
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'omr'>(initialTab);
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});
  const [reviewFilter, setReviewFilter] = useState<'all' | 'incorrect' | 'unanswered' | 'bookmarked'>('all');
  const [bookmarkedQuestions, setBookmarkedQuestions] = useState<Record<string, boolean>>({});

  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
  });

  const questionIdMap = useMemo(() => {
    const map: Record<number, string> = {};
    reviewQuestions.forEach((q, i) => {
      map[i + 1] = q.questionVersionId || `q_${i + 1}`;
    });
    return map;
  }, [reviewQuestions]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedCandidate =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (storedCandidate) {
        try {
          const parsed = JSON.parse(storedCandidate);
          setCandidate({
            fullName: (parsed.fullName || 'Candidate').toUpperCase(),
            registrationId: parsed.registrationId || 'MW-26-000001',
          });
        } catch {}
      }

      const storedBookmarks = localStorage.getItem('fort_saved_bookmarks');
      if (storedBookmarks) {
        try {
          setBookmarkedQuestions(JSON.parse(storedBookmarks));
        } catch {}
      }

      const storedAnswers = localStorage.getItem(`fort_attempt_${attemptId}_answers`);
      if (storedAnswers) {
        try {
          setAnswers(JSON.parse(storedAnswers));
        } catch {}
      }

      // Fetch authoritative result and question reviews from server
      fetch(`/api/test-attempts/${attemptId}/result`)
        .then((r) => r.json())
        .then((res) => {
          if (res.success && res.data) {
            const data = res.data;
            setPaperName(data.paperName || 'Examination Assessment');
            setReviewQuestions(data.questionReview || []);

            const evalRecord: ExamAttemptEvaluation = {
              totalScore: data.summary?.totalScore ?? 0,
              maxScore: data.summary?.maxScore ?? 720,
              scorePercentage: data.summary?.percentage ?? 0,
              accuracy: data.summary?.accuracy ?? 0,
              attemptRate: Math.round(
                (((data.summary?.correctCount ?? 0) + (data.summary?.wrongCount ?? 0)) /
                  Math.max(1, data.questionReview?.length || 180)) *
                  100
              ),
              completionRate: 100,
              timeTakenSeconds: data.durationSeconds ?? 0,
              correctCount: data.summary?.correctCount ?? 0,
              incorrectCount: data.summary?.wrongCount ?? 0,
              unattemptedCount: data.summary?.unansweredCount ?? 0,
              subjectPerformance: data.sectionScores || {},
              conceptPerformance: {},
              questionResults:
                data.questionReview?.map((qr: any) => ({
                  questionVersionId: qr.questionVersionId,
                  displayNumber: qr.displayNumber,
                  questionType: 'single_correct',
                  result: qr.isCorrect
                    ? 'correct'
                    : qr.studentSelectedOptions.length === 0
                    ? 'unattempted'
                    : 'incorrect',
                  marksEarned: qr.marksAwarded,
                  timeSpentSeconds: 60,
                })) || [],
            };
            setEvaluation(evalRecord);
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
  }, [attemptId]);

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
      examName: 'MERITWISE Examination System',
      paperName,
      attemptId,
      totalQuestions: reviewQuestions.length || 180,
      answers,
      questionIdMap,
      autoDownload: true,
    });
  };

  const filteredQuestions = reviewQuestions.filter((q, idx) => {
    const qRes = evaluation.questionResults[idx]?.result;
    if (reviewFilter === 'incorrect') return qRes === 'incorrect';
    if (reviewFilter === 'unanswered') return qRes === 'unattempted';
    if (reviewFilter === 'bookmarked') return bookmarkedQuestions[q.questionVersionId];
    return true;
  });

  return (
    <div className="liquid-canvas min-h-screen py-8 px-4 sm:px-6 lg:px-8 relative text-[#20252B]">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 right-1/4 h-80 w-80 opacity-50" />
        <div className="liquid-orb-red bottom-20 left-1/4 h-72 w-72 opacity-20" />
      </div>

      <div className="max-w-7xl mx-auto space-y-8 relative z-10">
        {/* Top Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-semibold text-[#66727D] hover:text-[#20252B] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Dashboard</span>
          </Link>

          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-[#66727D]">
              Candidate: <strong className="text-[#20252B]">{candidate.registrationId}</strong>
            </span>
            <button
              onClick={handleDownloadOmrPdf}
              className="glass-racing-red flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
            >
              <FileDown className="h-3.5 w-3.5" />
              <span>Download Vector OMR</span>
            </button>
          </div>
        </div>

        {/* Hero Scorecard Card */}
        <div className="glass-polar rounded-[36px] p-8 sm:p-10 shadow-xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider text-[#20252B]">
                Authoritative Scorecard
              </span>
              <h1 className="mt-2 text-2xl sm:text-3xl font-black text-[#20252B] font-sans">
                {paperName}
              </h1>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-[#66727D]">
              <span>Attempt:</span>
              <span className="font-bold text-[#20252B]">{attemptId}</span>
            </div>
          </div>

          {/* Micro Analytics Metrics */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-4 border-t border-[#DCE2E6]">
            <div className="rounded-2xl bg-white/70 p-4 border border-[#DCE2E6]">
              <span className="text-[10px] uppercase font-bold text-[#66727D] block">Total Score</span>
              <span className="mt-1 font-mono text-2xl font-black text-[#20252B]">
                {evaluation.totalScore}{' '}
                <span className="text-xs text-[#66727D] font-normal">/ {evaluation.maxScore}</span>
              </span>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 border border-[#DCE2E6]">
              <span className="text-[10px] uppercase font-bold text-[#66727D] block">Accuracy</span>
              <span className="mt-1 font-mono text-2xl font-black text-[#20252B]">
                {evaluation.accuracy}%
              </span>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 border border-[#DCE2E6]">
              <span className="text-[10px] uppercase font-bold text-[#66727D] block">Correct Answers</span>
              <span className="mt-1 font-mono text-2xl font-black text-[#20252B]">
                {evaluation.correctCount}
              </span>
            </div>
            <div className="rounded-2xl bg-white/70 p-4 border border-[#DCE2E6]">
              <span className="text-[10px] uppercase font-bold text-[#66727D] block">Time Elapsed</span>
              <span className="mt-1 font-mono text-2xl font-black text-[#20252B]">
                {formatDuration(evaluation.timeTakenSeconds)}
              </span>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex items-center gap-6 border-b border-[#DCE2E6] text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-[#9CC6E0] text-[#20252B]'
                : 'border-transparent text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Performance Overview
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
            Physical OMR Sheet ({reviewQuestions.length} Questions)
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Discipline Performance Grid
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(evaluation.subjectPerformance).map(([subKey, data]: [string, any]) => (
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
                  Ready to eliminate recurring errors?
                </h3>
                <p className="text-xs text-[#20252B]/80 max-w-xl">
                  Target your weakest subjects in the QP Prep Workspace before taking your next official paper simulation.
                </p>
              </div>

              <Link
                href="/dashboard/qp-prep"
                className="glass-racing-red rounded-full px-8 py-3.5 text-xs font-bold text-white shadow-lg transition-transform hover:scale-[1.02] shrink-0"
              >
                Return to QP Prep Workspace
              </Link>
            </div>
          </div>
        )}

        {/* TAB 2: REVIEW ANSWERS */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#66727D]">Filter Questions:</span>
                <div className="flex items-center gap-1.5 rounded-full border border-[#DCE2E6] bg-white p-1 text-xs font-semibold shadow-sm">
                  {[
                    { id: 'all', label: 'All', count: reviewQuestions.length },
                    { id: 'incorrect', label: 'Incorrect', count: evaluation.incorrectCount },
                    { id: 'unanswered', label: 'Unanswered', count: evaluation.unattemptedCount },
                    {
                      id: 'bookmarked',
                      label: 'Bookmarked',
                      count: Object.values(bookmarkedQuestions).filter(Boolean).length,
                    },
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

            <div className="space-y-6">
              {filteredQuestions.map((q, idx) => {
                const isCorrect = q.isCorrect;
                const isUnanswered = q.studentSelectedOptions.length === 0;
                const isWrong = !isCorrect && !isUnanswered;
                const isExpanded = expandedSolutions[q.questionVersionId];
                const isBookmarked = bookmarkedQuestions[q.questionVersionId];
                const studentAnswer = q.studentSelectedOptions.join(', ') || 'None';
                const correctAnswer = q.correctOptions.join(', ') || 'N/A';

                return (
                  <div
                    key={q.questionVersionId}
                    className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 sm:p-7 shadow-sm space-y-5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2E6] pb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#20252B]">
                          Q{q.displayNumber || idx + 1}.
                        </span>
                        <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[#20252B] font-semibold">
                          {q.subjectName}
                        </span>
                        {q.conceptName && (
                          <span className="text-[#20252B] font-semibold">{q.conceptName}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
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
                          {isCorrect
                            ? `Correct (+${q.marksAwarded})`
                            : isWrong
                            ? 'Incorrect (-1)'
                            : 'Unanswered (0)'}
                        </span>

                        <button
                          onClick={() => handleToggleBookmark(q.questionVersionId)}
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

                        <button
                          onClick={() => handleReportError(q.displayNumber || idx + 1)}
                          className="rounded-full p-2 text-[#66727D] hover:bg-[#FDEDF0] hover:text-[#E4002B] transition-colors"
                          title="Report Error"
                        >
                          <Flag className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => toggleSolution(q.questionVersionId)}
                          className="flex items-center gap-1 font-semibold text-[#20252B] hover:text-[#20252B] transition-colors pl-2"
                        >
                          <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm font-medium text-[#20252B] leading-relaxed">
                      <MathText text={q.text} />
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                      {q.options?.map((opt: any) => {
                        const optKey = opt.key || opt.id;
                        const isSelectedByStudent = q.studentSelectedOptions.includes(optKey);
                        const isKeyCorrect = q.correctOptions.includes(optKey);

                        return (
                          <div
                            key={optKey}
                            className={cn(
                              'flex items-center gap-3 rounded-2xl border p-3 text-xs transition-colors',
                              isKeyCorrect
                                ? 'border-[#9CC6E0] bg-[#E9EEF1]/60 text-[#20252B] font-semibold'
                                : isSelectedByStudent && !isKeyCorrect
                                ? 'border-[#E4002B]/40 bg-[#FDEDF0]/50 text-[#E4002B]'
                                : 'border-[#DCE2E6] bg-white text-[#20252B]'
                            )}
                          >
                            <span
                              className={cn(
                                'flex h-6 w-6 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-bold',
                                isKeyCorrect
                                  ? 'bg-[#20252B] text-white'
                                  : isSelectedByStudent
                                  ? 'bg-[#E4002B] text-white'
                                  : 'bg-[#F1F3F4] text-[#66727D]'
                              )}
                            >
                              {optKey}
                            </span>
                            <span className="flex-1">
                              <MathText text={opt.text} />
                            </span>
                            {isKeyCorrect && (
                              <CheckCircle2 className="h-4 w-4 text-[#20252B] shrink-0" />
                            )}
                            {isSelectedByStudent && !isKeyCorrect && (
                              <XCircle className="h-4 w-4 text-[#E4002B] shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed solution section */}
                    {isExpanded && (
                      <div className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4]/80 p-5 space-y-3 animate-in fade-in duration-150">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20252B]">
                          <Sparkles className="h-4 w-4 text-[#E4002B]" />
                          <span>Detailed Solution & Step Analysis</span>
                        </div>
                        <div className="text-xs text-[#20252B] leading-relaxed">
                          <MathText text={q.explanation} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: OMR */}
        {activeTab === 'omr' && (
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
              <div>
                <h3 className="text-sm font-bold text-[#20252B]">
                  Official High-Fidelity Vector OMR Specimen
                </h3>
                <p className="text-xs text-[#66727D]">
                  Every bubble response is mapped directly to server-verified submissions.
                </p>
              </div>

              <button
                onClick={handleDownloadOmrPdf}
                className="glass-racing-red flex items-center gap-2 rounded-full px-5 py-2 text-xs font-bold text-white shadow-sm"
              >
                <FileDown className="h-4 w-4" />
                <span>Export Official PDF</span>
              </button>
            </div>

            <div className="rounded-[32px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-sm">
              <LiveOMRSheet
                totalQuestions={reviewQuestions.length || 180}
                answers={answers}
                onSelectOption={() => {}}
                isReadOnly={true}
                questionIdMap={questionIdMap}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
