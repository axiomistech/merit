'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { AnswerState } from '@/types/exam';
import { ArrowLeft, RefreshCw, Sparkles, CheckCircle2 } from 'lucide-react';

export default function NeetOmrPracticePage() {
  const totalQuestions = 40; // 40 questions in dedicated OMR practice sandbox
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

  // Question mapping from 1..N to id
  const questionIdMap = React.useMemo(() => {
    const map: Record<number, string> = {};
    for (let i = 1; i <= totalQuestions; i++) {
      map[i] = `q_omr_${i}`;
    }
    return map;
  }, [totalQuestions]);

  const handleSelectOption = (questionNumber: number, optionKey: string) => {
    const qId = questionIdMap[questionNumber];
    if (!qId) return;

    setAnswers((prev) => {
      const existing = prev[qId];
      if (existing?.selectedOptions?.[0] === optionKey) {
        // Clear
        const next = { ...prev };
        delete next[qId];
        return next;
      }
      return {
        ...prev,
        [qId]: {
          questionVersionId: qId,
          selectedOptions: [optionKey],
          isAnswered: true,
          markedForReview: false,
          timeSpentSeconds: 15,
          lastUpdated: Date.now(),
        },
      };
    });
  };

  const handleReset = () => {
    setAnswers({});
  };

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#263554] pb-4">
          <Link
            href="/neet"
            className="flex items-center gap-2 text-xs font-semibold text-[#A7B0C0] hover:text-[#F5F7FB]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to FORT NEET</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-lg border border-[#263554] bg-[#172033] px-3 py-1.5 text-xs text-[#A7B0C0] hover:text-[#EF4444]"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All Bubbles</span>
            </button>
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-6 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-semibold text-[#10B981]">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Interactive OMR Simulation Sandbox</span>
          </div>
          <h1 className="mt-2 text-2xl font-extrabold text-[#F5F7FB]">
            NEET Physical OMR Practice Grid
          </h1>
          <p className="mt-1 max-w-3xl text-xs text-[#A7B0C0] leading-relaxed">
            Practice bubble alignment and response speed before your actual examination. Click any
            bubble to darken it. Click again to clear. Export a print-ready vector A4 PDF with
            authentic candidate metadata and timing hash.
          </p>
        </div>

        {/* Live OMR Sheet Component */}
        <LiveOMRSheet
          totalQuestions={totalQuestions}
          answers={answers}
          questionIdMap={questionIdMap}
          onSelectOption={handleSelectOption}
          studentName="Aspirant Candidate"
          registrationId="FORT-26-000001"
          examName="FORT NEET (UG)"
          paperName="OMR Speed & Shading Drill"
          attemptId="DRILL-OMR-01"
        />
      </div>
    </div>
  );
}
