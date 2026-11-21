'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
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
} from 'lucide-react';
import {
  SAMPLE_NEET_PAPER,
  SAMPLE_NEET_QUESTIONS,
} from '@/data/seedData';
import { ExamAttemptEvaluation } from '@/types/exam';
import { MathText } from '@/components/ui/MathText';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { cn, formatDuration, formatTimeWithHours } from '@/lib/utils';

export default function ExamResultPage() {
  const params = useParams();
  const attemptId = (params?.attemptId as string) || 'ATT-2026-NEET-01';

  const [evaluation, setEvaluation] = useState<ExamAttemptEvaluation | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'solutions' | 'omr'>('overview');
  const [expandedSolutions, setExpandedSolutions] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem(`fort_result_${attemptId}`);
      if (stored) {
        try {
          setEvaluation(JSON.parse(stored));
        } catch {}
      } else {
        // Fallback realistic evaluation if accessed directly
        const fallbackEval: ExamAttemptEvaluation = {
          totalScore: 52,
          maxScore: 80,
          scorePercentage: 65.0,
          accuracy: 75.0,
          attemptRate: 85.0,
          completionRate: 100.0,
          timeTakenSeconds: 3840,
          correctCount: 14,
          incorrectCount: 3,
          unattemptedCount: 3,
          subjectPerformance: {
            physics: { subjectName: 'Physics', score: 11, maxScore: 20, correct: 3, incorrect: 1, unattempted: 1, accuracy: 75.0 },
            chemistry: { subjectName: 'Chemistry', score: 15, maxScore: 20, correct: 4, incorrect: 1, unattempted: 0, accuracy: 80.0 },
            botany: { subjectName: 'Botany', score: 16, maxScore: 20, correct: 4, incorrect: 0, unattempted: 1, accuracy: 100.0 },
            zoology: { subjectName: 'Zoology', score: 10, maxScore: 20, correct: 3, incorrect: 1, unattempted: 1, accuracy: 75.0 },
          },
          conceptPerformance: {
            electrostatics: { conceptName: 'Electrostatics & Gauss Law', correct: 1, total: 2, accuracy: 50.0 },
            'chemical-bonding': { conceptName: 'Chemical Bonding & Hybridization', correct: 2, total: 2, accuracy: 100.0 },
          },
          questionResults: SAMPLE_NEET_QUESTIONS.map((q, i) => ({
            questionVersionId: q.versionId,
            displayNumber: q.displayNumber,
            questionType: q.questionType,
            result: i % 5 === 0 ? 'incorrect' : i % 7 === 0 ? 'unattempted' : 'correct',
            marksEarned: i % 5 === 0 ? -1 : i % 7 === 0 ? 0 : 4,
            timeSpentSeconds: 65,
          })),
        };
        setEvaluation(fallbackEval);
      }
    }
  }, [attemptId]);

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

        {/* Evaluation Banner */}
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-xs font-bold text-[#758B62]">
                  OFFICIAL EVALUATION
                </span>
                <span className="text-xs text-[#73786E]">{SAMPLE_NEET_PAPER.name}</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
                Examination Performance Breakdown
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  generateOmrPdf({
                    studentName: 'Candidate',
                    registrationId: 'FORT-26-000001',
                    examName: 'FORT NEET (UG)',
                    paperName: SAMPLE_NEET_PAPER.name,
                    attemptId,
                    date: new Date().toLocaleDateString('en-IN'),
                    totalQuestions: SAMPLE_NEET_QUESTIONS.length,
                    answers: {},
                    questionIdMap: {},
                  });
                }}
                className="flex items-center gap-1.5 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] px-4 py-2 text-xs font-semibold text-[#263126] hover:bg-[#E9EEE3] hover:border-[#9CAF88] transition-colors shadow-sm"
              >
                <FileDown className="h-4 w-4 text-[#758B62]" />
                <span>Export Vector OMR (PDF)</span>
              </button>
            </div>
          </div>

          {/* Primary Metric Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 text-center">
              <div className="text-[11px] text-[#73786E]">Total Score</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#263126]">
                {evaluation.totalScore}{' '}
                <span className="text-xs text-[#92958D]">/ {evaluation.maxScore}</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 text-center">
              <div className="text-[11px] text-[#73786E]">Accuracy Rate</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#758B62]">
                {evaluation.accuracy}%
              </div>
            </div>

            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 text-center">
              <div className="text-[11px] text-[#73786E]">Attempt Rate</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#263126]">
                {evaluation.attemptRate}%
              </div>
            </div>

            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 text-center">
              <div className="text-[11px] text-[#73786E]">Correct Answers</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#758B62]">
                {evaluation.correctCount}
              </div>
            </div>

            <div className="rounded-xl border border-[#E8412C]/20 bg-[#FCE8E4] p-4 text-center">
              <div className="text-[11px] text-[#E8412C]">Incorrect (Penalized)</div>
              <div className="mt-1 font-mono text-2xl font-bold text-[#E8412C]">
                {evaluation.incorrectCount}
              </div>
            </div>

            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 text-center">
              <div className="text-[11px] text-[#73786E]">Time Invested</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#263126]">
                {formatTimeWithHours(evaluation.timeTakenSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex border-b border-[#ECEAE4] gap-6 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-[#9CAF88] text-[#263126]'
                : 'border-transparent text-[#73786E] hover:text-[#263126]'
            )}
          >
            Subject Breakdown & Analytics
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
            Question-by-Question Scientific Solutions
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
            Evaluated OMR Sheet
          </button>
        </div>

        {/* TAB 1: SUBJECT BREAKDOWN */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#758B62]">
              Subject Discipline Performance
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(evaluation.subjectPerformance).map(([key, data]) => (
                <div key={key} className="rounded-2xl border border-[#E6E5DE] bg-white p-5 space-y-3 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#263126]">{data.subjectName}</h3>
                    <span className="font-mono text-xs font-bold text-[#758B62]">
                      {data.score} / {data.maxScore}
                    </span>
                  </div>

                  <div className="space-y-1.5 text-xs text-[#73786E] border-t border-[#ECEAE4] pt-3">
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
          </div>
        )}

        {/* TAB 2: QUESTION-BY-QUESTION SOLUTIONS */}
        {activeTab === 'solutions' && (
          <div className="space-y-6">
            <div className="text-xs text-[#73786E]">
              Full analytical explanations with mathematical formulas and step-by-step logic.
            </div>

            <div className="space-y-4">
              {SAMPLE_NEET_QUESTIONS.map((q, idx) => {
                const qResult = evaluation.questionResults[idx];
                const isCorrect = qResult?.result === 'correct';
                const isWrong = qResult?.result === 'incorrect';
                const isExpanded = expandedSolutions[q.id];

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE4] pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#263126]">Q{idx + 1}.</span>
                        <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[#263126] font-semibold">
                          {q.subjectName}
                        </span>
                        <span className="text-[#758B62] font-semibold">{q.conceptName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'rounded-full px-2.5 py-0.5 font-bold uppercase text-[11px]',
                            isCorrect
                              ? 'bg-[#E9EEE3] text-[#758B62]'
                              : isWrong
                              ? 'bg-[#FCE8E4] text-[#E8412C]'
                              : 'bg-[#F7F5EF] text-[#73786E]'
                          )}
                        >
                          {qResult?.result || 'Unattempted'} (
                          {qResult?.marksEarned !== undefined
                            ? (qResult.marksEarned > 0 ? `+${qResult.marksEarned}` : qResult.marksEarned)
                            : 0}{' '}
                          Marks)
                        </span>

                        <button
                          onClick={() => toggleSolution(q.id)}
                          className="flex items-center gap-1 font-semibold text-[#758B62] hover:text-[#263126] transition-colors"
                        >
                          <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-[#263126] leading-relaxed">
                      <MathText content={q.text} />
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 text-xs">
                      {q.options.map((opt) => {
                        const isCorrectOption = q.answerKey?.correctOptions?.includes(opt.key);
                        return (
                          <div
                            key={opt.key}
                            className={cn(
                              'flex items-center gap-2.5 rounded-xl border p-3',
                              isCorrectOption
                                ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                                : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]'
                            )}
                          >
                            <span className="font-mono font-bold">{opt.key}.</span>
                            <MathText content={opt.text} />
                            {isCorrectOption && (
                              <CheckCircle2 className="h-4 w-4 text-[#758B62] ml-auto shrink-0" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Expanded Scientific Solution */}
                    {isExpanded && q.explanation && (
                      <div className="rounded-xl border border-[#9CAF88]/40 bg-[#F7F5EF] p-5 text-xs space-y-2 animate-in fade-in">
                        <div className="font-bold text-[#758B62] uppercase tracking-wider text-[11px]">
                          Concept Solution & Formula Reference
                        </div>
                        <div className="leading-relaxed text-[#263126]">
                          <MathText content={q.explanation.text} />
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: EVALUATED OMR SHEET */}
        {activeTab === 'omr' && (
          <div className="space-y-4">
            <LiveOMRSheet
              totalQuestions={SAMPLE_NEET_QUESTIONS.length}
              answers={{}}
              questionIdMap={{}}
              isReadOnly={true}
              paperName={SAMPLE_NEET_PAPER.name}
              attemptId={attemptId}
            />
          </div>
        )}
      </div>
    </div>
  );
}
