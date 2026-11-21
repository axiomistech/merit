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
      <div className="flex h-96 items-center justify-center text-xs text-[#A7B0C0]">
        Loading analytical evaluation...
      </div>
    );
  }

  const toggleSolution = (qId: string) => {
    setExpandedSolutions((prev) => ({ ...prev, [qId]: !prev[qId] }));
  };

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Navigation Breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#263554] pb-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-[#A7B0C0] hover:text-[#F5F7FB]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Dashboard</span>
          </Link>

          <div className="flex items-center gap-2 text-xs">
            <span className="text-[#A7B0C0]">Attempt Hash:</span>
            <span className="font-mono text-[#6486C6] font-bold">{attemptId}</span>
          </div>
        </div>

        {/* Evaluation Banner */}
        <div className="rounded-2xl border border-[#263554] bg-[#11182A] p-6 sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-bold text-[#10B981]">
                  OFFICIAL EVALUATION
                </span>
                <span className="text-xs text-[#A7B0C0]">{SAMPLE_NEET_PAPER.name}</span>
              </div>
              <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
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
                className="flex items-center gap-1.5 rounded-lg border border-[#263554] bg-[#172033] px-3.5 py-2 text-xs font-semibold text-[#F5F7FB] hover:border-[#6486C6]"
              >
                <FileDown className="h-4 w-4 text-[#6486C6]" />
                <span>Export OMR Sheet (PDF)</span>
              </button>
            </div>
          </div>

          {/* Primary Metric Grid */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Total Score</div>
              <div className="mt-1 font-mono text-2xl font-black text-[#6486C6]">
                {evaluation.totalScore}{' '}
                <span className="text-xs text-[#7C8799]">/ {evaluation.maxScore}</span>
              </div>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Accuracy Rate</div>
              <div className="mt-1 font-mono text-2xl font-black text-[#10B981]">
                {evaluation.accuracy}%
              </div>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Attempt Rate</div>
              <div className="mt-1 font-mono text-2xl font-black text-[#F5F7FB]">
                {evaluation.attemptRate}%
              </div>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Correct Answers</div>
              <div className="mt-1 font-mono text-2xl font-black text-[#10B981]">
                {evaluation.correctCount}
              </div>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Incorrect (Penalized)</div>
              <div className="mt-1 font-mono text-2xl font-black text-[#EF4444]">
                {evaluation.incorrectCount}
              </div>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-center">
              <div className="text-[11px] text-[#A7B0C0]">Time Invested</div>
              <div className="mt-1 font-mono text-xl font-bold text-[#F5F7FB]">
                {formatTimeWithHours(evaluation.timeTakenSeconds)}
              </div>
            </div>
          </div>
        </div>

        {/* View Tabs */}
        <div className="flex border-b border-[#263554] gap-4 text-xs font-bold">
          <button
            onClick={() => setActiveTab('overview')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'overview'
                ? 'border-[#6486C6] text-[#6486C6]'
                : 'border-transparent text-[#A7B0C0] hover:text-[#F5F7FB]'
            )}
          >
            Subject Breakdown & Analytics
          </button>
          <button
            onClick={() => setActiveTab('solutions')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'solutions'
                ? 'border-[#6486C6] text-[#6486C6]'
                : 'border-transparent text-[#A7B0C0] hover:text-[#F5F7FB]'
            )}
          >
            Question-by-Question Scientific Solutions
          </button>
          <button
            onClick={() => setActiveTab('omr')}
            className={cn(
              'pb-3 border-b-2 transition-colors',
              activeTab === 'omr'
                ? 'border-[#6486C6] text-[#6486C6]'
                : 'border-transparent text-[#A7B0C0] hover:text-[#F5F7FB]'
            )}
          >
            Evaluated OMR Sheet
          </button>
        </div>

        {/* TAB 1: SUBJECT BREAKDOWN */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6486C6]">
              Subject Discipline Performance
            </h2>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(evaluation.subjectPerformance).map(([key, data]) => (
                <div key={key} className="rounded-xl border border-[#263554] bg-[#11182A] p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-base font-bold text-[#F5F7FB]">{data.subjectName}</h3>
                    <span className="font-mono text-xs font-bold text-[#6486C6]">
                      {data.score} / {data.maxScore}
                    </span>
                  </div>

                  <div className="space-y-1 text-xs text-[#A7B0C0]">
                    <div className="flex justify-between">
                      <span>Accuracy:</span>
                      <strong className="text-[#10B981]">{data.accuracy}%</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Correct / Wrong:</span>
                      <span>
                        <strong className="text-[#10B981]">{data.correct}</strong> /{' '}
                        <strong className="text-[#EF4444]">{data.incorrect}</strong>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Unattempted:</span>
                      <span>{data.unattempted}</span>
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
            <div className="text-xs text-[#A7B0C0]">
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
                    className="rounded-xl border border-[#263554] bg-[#11182A] p-6 space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#263554] pb-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-[#F5F7FB]">Q{idx + 1}.</span>
                        <span className="rounded bg-[#172033] px-2 py-0.5 text-[#A7B0C0]">
                          {q.subjectName}
                        </span>
                        <span className="text-[#6486C6] font-semibold">{q.conceptName}</span>
                      </div>

                      <div className="flex items-center gap-3">
                        <span
                          className={cn(
                            'rounded px-2.5 py-0.5 font-bold uppercase text-[11px]',
                            isCorrect
                              ? 'bg-[#10B981]/20 text-[#10B981]'
                              : isWrong
                              ? 'bg-[#EF4444]/20 text-[#EF4444]'
                              : 'bg-[#172033] text-[#A7B0C0]'
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
                          className="flex items-center gap-1 text-[#6486C6] hover:underline"
                        >
                          <span>{isExpanded ? 'Hide Solution' : 'View Solution'}</span>
                          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="text-sm text-[#F5F7FB]">
                      <MathText content={q.text} />
                    </div>

                    {/* Options list */}
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
                      {q.options.map((opt) => {
                        const isCorrectOption = q.answerKey?.correctOptions?.includes(opt.key);
                        return (
                          <div
                            key={opt.key}
                            className={cn(
                              'flex items-center gap-2.5 rounded-lg border p-2.5',
                              isCorrectOption
                                ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]'
                                : 'border-[#263554] bg-[#172033] text-[#A7B0C0]'
                            )}
                          >
                            <span className="font-mono font-bold">{opt.key}.</span>
                            <MathText content={opt.text} />
                            {isCorrectOption && (
                              <CheckCircle2 className="h-4 w-4 text-[#10B981] ml-auto" />
                            )}
                          </div>
                        );
                      })}
                    </div>

                    {/* Expanded Scientific Solution */}
                    {isExpanded && q.explanation && (
                      <div className="rounded-xl border border-[#6486C6]/30 bg-[#172033] p-4 text-xs space-y-2 animate-in fade-in">
                        <div className="font-bold text-[#6486C6] uppercase tracking-wider text-[11px]">
                          Concept Solution & Reference
                        </div>
                        <div className="leading-relaxed text-[#F5F7FB]">
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
