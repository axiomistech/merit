'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { LiveOMRSheet } from '@/components/omr/LiveOMRSheet';
import { AnswerState } from '@/types/exam';
import { ArrowLeft, RefreshCw, Sparkles } from 'lucide-react';

export default function NeetOmrPracticePage() {
  const totalQuestions = 180; // Full 180 questions in NEET OMR practice sandbox
  const [answers, setAnswers] = useState<Record<string, AnswerState>>({});

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
        // Clear response
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
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Navigation breadcrumb */}
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
          <Link
            href="/neet"
            className="flex items-center gap-2 text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to NEET Overview</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              onClick={handleReset}
              className="flex items-center gap-1.5 rounded-xl border border-[#DCE2E6] bg-white px-3.5 py-1.5 text-xs text-[#66727D] hover:text-[#E4002B] hover:bg-[#FDEDF0] transition-colors shadow-soft"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>Reset All 180 Bubbles</span>
            </button>
          </div>
        </div>

        {/* Introduction */}
        <div className="mt-6 mb-8">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-0.5 text-xs font-semibold text-[#20252B]">
            <Sparkles className="h-3.5 w-3.5 text-[#9CC6E0]" />
            <span>Exact 180-Question Physical NEET OMR Replica</span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            NEET Physical OMR Practice Arena
          </h1>
          <p className="mt-1 max-w-3xl text-xs sm:text-sm text-[#66727D] leading-relaxed">
            Practice bubble alignment and response speed on the exact 180-question NEET answer sheet. Click any
            bubble to darken it. Click again to clear. Export a print-ready vector A4 PDF with
            candidate metadata and Code 39 barcode.
          </p>
        </div>

        {/* Live OMR Sheet Component */}
        <LiveOMRSheet
          totalQuestions={totalQuestions}
          answers={answers}
          questionIdMap={questionIdMap}
          onSelectOption={handleSelectOption}
          studentName="DHANUSH JAGADEESH"
          registrationId="MW-26-000001"
          examName="NEET (UG)"
          paperName="OMR Speed & Shading Drill"
          attemptId="ATT-2026-OMR-PRACTICE"
        />
      </div>
    </div>
  );
}
