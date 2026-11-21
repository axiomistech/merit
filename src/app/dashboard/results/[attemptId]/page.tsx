'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Shield,
  ArrowLeft,
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

      // Evaluation
      const storedEval = localStorage.getItem(`fort_result_${attemptId}`);
      if (storedEval) {
        try {
          setEvaluation(JSON.parse(storedEval));
        } catch {}
      } else {
        // Fallback realistic evaluation matching user prompt standard
        const fallbackEval: ExamAttemptEvaluation = {
          totalScore: 580,
          maxScore: 720,
          scorePercentage: 80.5,
          accuracy: 78.0,
          attemptRate: 94.4,
          completionRate: 100.0,
          timeTakenSeconds: 10800,
          correctCount: 140,
          incorrectCount: 30,
          unattemptedCount: 10,
          subjectPerformance: {
            physics: { subjectName: 'Physics', score: 135, maxScore: 180, correct: 35, incorrect: 8, unattempted: 2, accuracy: 81.4 },
            chemistry: { subjectName: 'Chemistry', score: 155, maxScore: 180, correct: 39, incorrect: 4, unattempted: 2, accuracy: 90.7 },
            botany: { subjectName: 'Botany', score: 145, maxScore: 180, correct: 38, incorrect: 5, unattempted: 2, accuracy: 88.4 },
            zoology: { subjectName: 'Zoology', score: 145, maxScore: 180, correct: 38, incorrect: 5, unattempted: 2, accuracy: 88.4 },
          },
          conceptPerformance: {
            electrostatics: { conceptName: 'Electrostatics & Gauss Law', correct: 2, total: 5, accuracy: 40.0 },
            'chemical-bonding': { conceptName: 'Chemical Bonding & Hybridization', correct: 5, total: 5, accuracy: 100.0 },
          },
          questionResults: questions.slice(0, 30).map((q, i) => ({
            questionVersionId: q.versionId,
            displayNumber: q.displayNumber,
            questionType: q.questionType,
            result: i % 5 === 1 ? 'incorrect' : i % 9 === 0 ? 'unattempted' : 'correct',
            marksEarned: i % 5 === 1 ? -1 : i % 9 === 0 ? 0 : 4,
            timeSpentSeconds: 65,
          })),
        };
        setEvaluation(fallbackEval);
      }
    }
  }, [attemptId, questions]);

  if (!evaluation) {
    return (
      <div className="flex h-96 items-center justify-center text-xs text-[#73786E]">
        Loading analytical evaluation...
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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-[#73786E] hover:text-[#263126] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Candidate Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#92958D]">Attempt Hash:</span>
            <span className="font-mono text-[#758B62] font-bold">{attemptId}</span>
          </div>
        </div>

        {/* ================================================================ */}
        {/* SECTION 9: EXACT TEST RESULT SCOREBOARD (MATCHING USER FLOW) */}
        {/* ================================================================ */}
        <div className="rounded-[32px] border border-[#E6E5DE] bg-white p-6 sm:p-10 shadow-sm space-y-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-xs font-bold text-[#758B62]">
                  OFFICIAL EVALUATION
                </span>
                <span className="text-xs text-[#73786E]">{SAMPLE_NEET_PAPER.name}</span>
              </div>
              <h1 className="mt-2 text-3xl font-extrabold font-serif text-[#263126]">
                Test Result
              </h1>
              <p className="mt-1 text-xs text-[#73786E]">
                Candidate: <strong className="text-[#263126]">{candidate.fullName}</strong> • ID:{' '}
                <strong className="font-mono text-[#263126]">{candidate.registrationId}</strong>
              </p>
            </div>

            <button
              onClick={handleDownloadOmrPdf}
              className="flex items-center gap-2 rounded-full bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm"
            >
              <FileDown className="h-4 w-4" />
              <span>Export Vector OMR (PDF)</span>
            </button>
          </div>

          {/* Primary Big Metrics (Accuracy, Score, Correct, Wrong, Skipped) */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
            {/* Accuracy */}
            <div className="rounded-[24px] border border-[#E6E5DE] bg-[#F7F5EF] p-5 text-center">
              <div className="text-xs font-semibold text-[#73786E]">Accuracy</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#758B62]">
                {evaluation.accuracy}%
              </div>
              <div className="mt-1 text-[11px] text-[#92958D]">Correct / Attempted</div>
            </div>

            {/* Score */}
            <div className="rounded-[24px] border border-[#E6E5DE] bg-[#F7F5EF] p-5 text-center">
              <div className="text-xs font-semibold text-[#73786E]">Score</div>
              <div className="mt-2 font-mono text-3xl sm:text-4xl font-black text-[#263126]">
                {evaluation.totalScore}
                <span className="text-xs text-[#92958D] font-normal"> / {evaluation.maxScore}</span>
              </div>
              <div className="mt-1 text-[11px] text-[#92958D]">Net marks earned</div>
            </div>

            {/* Correct */}
            <div className="rounded-[24px] border border-[#9CAF88]/30 bg-[#E9EEE3]/60 p-5 text-center">
              <div className="text-xs font-semibold text-[#758B62]">Correct</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#758B62]">
                {evaluation.correctCount}
              </div>
              <div className="mt-1 text-[11px] text-[#758B62]">+{evaluation.correctCount * 4} Marks</div>
            </div>

            {/* Wrong */}
            <div className="rounded-[24px] border border-[#E8412C]/20 bg-[#FCE8E4] p-5 text-center">
              <div className="text-xs font-semibold text-[#E8412C]">Wrong</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#E8412C]">
                {evaluation.incorrectCount}
              </div>
              <div className="mt-1 text-[11px] text-[#E8412C]">-{evaluation.incorrectCount} Marks (Penalty)</div>
            </div>

            {/* Skipped */}
            <div className="rounded-[24px] border border-[#E6E5DE] bg-[#F7F5EF] p-5 text-center col-span-2 sm:col-span-1">
              <div className="text-xs font-semibold text-[#73786E]">Skipped</div>
              <div className="mt-2 font-mono text-4xl font-black text-[#92958D]">
                {evaluation.unattemptedCount}
              </div>
              <div className="mt-1 text-[11px] text-[#92958D]">0 Marks change</div>
            </div>
          </div>

          {/* Additional Analytics Row: Time Spent, Avg Time, Strongest, Weakest, Percentile */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 pt-4 border-t border-[#ECEAE4] text-xs">
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-4">
              <div className="text-[#73786E]">Time Invested & Pacing</div>
              <div className="mt-1 text-base font-bold text-[#263126]">
                {formatTimeWithHours(evaluation.timeTakenSeconds)}
              </div>
              <div className="text-[11px] text-[#92958D]">
                Avg {Math.round(evaluation.timeTakenSeconds / Math.max(1, evaluation.correctCount + evaluation.incorrectCount))}s / question
              </div>
            </div>

            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-4">
              <div className="text-[#73786E]">Strongest Topic</div>
              <div className="mt-1 text-base font-bold text-[#758B62]">
                Chemical Bonding
              </div>
              <div className="text-[11px] text-[#73786E]">100% Accuracy (5/5)</div>
            </div>

            <div className="rounded-2xl border border-[#E8412C]/20 bg-[#FCE8E4]/50 p-4">
              <div className="text-[#E8412C] font-semibold">Weakest Topic (Remediation)</div>
              <div className="mt-1 text-base font-bold text-[#E8412C]">
                Electrostatics & Gauss Law
              </div>
              <div className="text-[11px] text-[#73786E]">40% Accuracy (2/5)</div>
            </div>

            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-4">
              <div className="text-[#73786E]">Percentile Projection</div>
              <div className="mt-1 text-base font-bold text-[#263126]">
                98.4th Percentile
              </div>
              <div className="text-[11px] text-[#758B62] font-semibold">Projected AIR ~1,420</div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex border-b border-[#ECEAE4] gap-8 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-[#9CAF88] text-[#263126]'
                : 'border-transparent text-[#73786E] hover:text-[#263126]'
            )}
          >
            Subject & Concept Breakdown
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'solutions'
                ? 'border-[#9CAF88] text-[#263126]'
                : 'border-transparent text-[#73786E] hover:text-[#263126]'
            )}
          >
            Review Answers & Solutions
          </button>
          <button
            onClick={() => setActiveTab('omr')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'omr'
                ? 'border-[#9CAF88] text-[#263126]'
                : 'border-transparent text-[#73786E] hover:text-[#263126]'
            )}
          >
            Physical OMR Sheet (180 Questions)
          </button>
        </div>

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
              Discipline Performance Grid
            </h3>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(evaluation.subjectPerformance).map(([subKey, data]) => (
                <div key={subKey} className="rounded-[24px] border border-[#E6E5DE] bg-white p-6 shadow-sm">
                  <div className="text-sm font-bold text-[#263126] font-serif">{data.subjectName}</div>
                  <div className="mt-3 text-2xl font-black font-mono text-[#263126]">
                    {data.score}{' '}
                    <span className="text-xs text-[#92958D] font-normal">/ {data.maxScore}</span>
                  </div>

                  <div className="mt-4 space-y-1.5 border-t border-[#ECEAE4] pt-3 text-xs text-[#73786E]">
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <strong className="text-[#758B62] font-mono">{data.accuracy}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct / Wrong:</span>
                      <span>
                        <strong className="text-[#758B62]">{data.correct}</strong> /{' '}
                        <strong className="text-[#E8412C]">{data.incorrect}</strong>
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
            <div className="rounded-[28px] bg-[#9CAF88] p-8 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                  THE REPEAT CYCLE • PRACTICE → EVALUATE → IMPROVE
                </span>
                <h3 className="text-2xl font-bold font-serif">
                  Ready to eliminate recurring errors in Electrostatics?
                </h3>
                <p className="text-xs text-white/90 max-w-xl">
                  Target your weakest topic with a focused 15-question concept drill before your next full mock simulation.
                </p>
              </div>

              <Link
                href="/dashboard/practice"
                className="rounded-full bg-[#E8412C] px-8 py-3.5 text-xs font-bold text-white shadow-lg shadow-[#E8412C]/30 hover:bg-[#d03521] transition-all hover:translate-y-[-1px] shrink-0"
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
            <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#73786E]">Filter Questions:</span>
                <div className="flex items-center gap-1.5 rounded-full border border-[#E6E5DE] bg-white p-1 text-xs font-semibold shadow-sm">
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
                          ? 'bg-[#9CAF88] text-white font-bold shadow-sm'
                          : 'text-[#73786E] hover:text-[#263126]'
                      )}
                    >
                      <span>{flt.label}</span>
                      <span className="ml-1 text-[10px] opacity-80">({flt.count})</span>
                    </button>
                  ))}
                </div>
              </div>

              <span className="text-xs text-[#92958D]">
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
                    className="rounded-[24px] border border-[#E6E5DE] bg-white p-6 sm:p-7 shadow-sm space-y-5"
                  >
                    {/* Header */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE4] pb-4 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-sm text-[#263126]">Q{idx + 1}.</span>
                        <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[#263126] font-semibold">
                          {q.subjectName}
                        </span>
                        <span className="text-[#758B62] font-semibold">{q.conceptName}</span>
                      </div>

                      <div className="flex items-center gap-2 sm:gap-4">
                        {/* Status Badge */}
                        <span
                          className={cn(
                            'rounded-full px-3 py-1 font-bold uppercase text-[10px]',
                            isCorrect
                              ? 'bg-[#E9EEE3] text-[#758B62]'
                              : isWrong
                              ? 'bg-[#FCE8E4] text-[#E8412C]'
                              : 'bg-[#F7F5EF] text-[#73786E]'
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
                              ? 'bg-[#E9EEE3] text-[#758B62]'
                              : 'text-[#92958D] hover:bg-[#F0EFEA] hover:text-[#263126]'
                          )}
                          title="Bookmark Question"
                        >
                          <Bookmark className={cn('h-4 w-4', isBookmarked && 'fill-current')} />
                        </button>

                        {/* Report Error */}
                        <button
                          onClick={() => handleReportError(idx + 1)}
                          className="rounded-full p-2 text-[#92958D] hover:bg-[#FCE8E4] hover:text-[#E8412C] transition-colors"
                          title="Report Error"
                        >
                          <Flag className="h-4 w-4" />
                        </button>

                        {/* Expand Solution Button */}
                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="flex items-center gap-1 font-semibold text-[#758B62] hover:text-[#263126] transition-colors pl-2"
                        >
                          <span>{isExpanded ? 'Hide' : 'Explain'}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Question Text */}
                    <div className="text-sm text-[#263126] leading-relaxed">
                      <MathText content={q.text} />
                    </div>

                    {/* Comparison Pill: Candidate selection vs Correct Answer */}
                    <div className="flex flex-wrap items-center gap-4 text-xs">
                      <div className="rounded-xl bg-[#F7F5EF] px-3.5 py-1.5 border border-[#E6E5DE]">
                        <span className="text-[#73786E]">Your Answer: </span>
                        <strong className={cn('font-mono font-bold', isCorrect ? 'text-[#758B62]' : 'text-[#E8412C]')}>
                          Option {studentAnswer}
                        </strong>
                      </div>
                      <div className="rounded-xl bg-[#E9EEE3] px-3.5 py-1.5 border border-[#9CAF88]/30">
                        <span className="text-[#758B62]">Correct Answer: </span>
                        <strong className="font-mono font-bold text-[#758B62]">
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
                                ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                                : isStudentChoice && !isCorrectOption
                                ? 'border-[#E8412C] bg-[#FCE8E4] text-[#E8412C]'
                                : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]'
                            )}
                          >
                            <span className="font-mono font-bold">{opt.key}.</span>
                            <MathText content={opt.text} />
                            {isCorrectOption && (
                              <CheckCircle2 className="h-4 w-4 text-[#758B62] ml-auto shrink-0" />
                            )}
                            {isStudentChoice && !isCorrectOption && (
                              <XCircle className="h-4 w-4 text-[#E8412C] ml-auto shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation & Why Other Options are Wrong */}
                    {isExpanded && q.explanation && (
                      <div className="rounded-2xl border border-[#9CAF88]/40 bg-[#F7F5EF] p-6 text-xs space-y-4 animate-in fade-in">
                        <div>
                          <div className="font-bold text-[#758B62] uppercase tracking-wider text-[11px]">
                            Detailed Scientific Explanation
                          </div>
                          <div className="mt-1 leading-relaxed text-[#263126]">
                            <MathText content={q.explanation.text} />
                          </div>
                        </div>

                        {/* Why Other Options are Wrong */}
                        <div className="pt-3 border-t border-[#ECEAE4]">
                          <div className="font-bold text-[#263126] uppercase tracking-wider text-[11px]">
                            Why other options are wrong:
                          </div>
                          <p className="mt-1 text-[#73786E] leading-relaxed">
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
