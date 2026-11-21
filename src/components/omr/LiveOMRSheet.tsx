'use client';

import React, { useMemo, useState } from 'react';
import { AnswerState } from '@/types/exam';
import { cn } from '@/lib/utils';
import { FileDown, ZoomIn, ZoomOut, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { generateBarcodeModules } from '@/lib/omr/barcode';

interface OMRProps {
  totalQuestions?: number;
  answers: Record<string, AnswerState>;
  questionIdMap: Record<number, string>; // Maps displayNumber (1..180) to questionVersionId
  currentQuestionNumber?: number;
  onSelectOption?: (questionNumber: number, optionKey: string) => void;
  onJumpToQuestion?: (questionNumber: number) => void;
  isReadOnly?: boolean;
  studentName?: string;
  registrationId?: string;
  examName?: string;
  paperName?: string;
  attemptId?: string;
  rollNumber?: string;
  testBookletNo?: string;
  testBookletCode?: string;
  motherName?: string;
  fatherName?: string;
  submissionTime?: string;
}

export function LiveOMRSheet({
  totalQuestions = 180,
  answers,
  questionIdMap,
  currentQuestionNumber,
  onSelectOption,
  onJumpToQuestion,
  isReadOnly = false,
  studentName = 'DHANUSH JAGADEESH',
  registrationId = 'FORT-26-000001',
  examName = 'FORT NEET (UG)',
  paperName = 'All India Full Mock Test - 01',
  attemptId = 'ATT-20261121',
  rollNumber,
  testBookletNo = '1234567',
  testBookletCode = 'A',
  motherName = '',
  fatherName = '',
  submissionTime,
}: OMRProps) {
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Formatted numeric roll number (10 digits)
  const numericOnly = (rollNumber || registrationId).replace(/\D/g, '');
  const rollDigits = useMemo(() => {
    return (numericOnly.length >= 10
      ? numericOnly.slice(-10)
      : numericOnly.padStart(10, '0')
    ).split('');
  }, [numericOnly]);

  // 7-digit test booklet number
  const bookletDigits = useMemo(() => {
    return testBookletNo.replace(/\D/g, '').padStart(7, '0').slice(-7).split('');
  }, [testBookletNo]);

  // Barcode modules
  const barcodeModules = useMemo(() => {
    return generateBarcodeModules(registrationId);
  }, [registrationId]);

  // Option mapping: 1->A, 2->B, 3->C, 4->D
  const optionLetters = ['A', 'B', 'C', 'D'];

  // Summary counts
  const stats = useMemo(() => {
    let answered = 0;
    for (let i = 1; i <= 180; i++) {
      const qId = questionIdMap[i];
      const ans = qId ? answers[qId] : undefined;
      if (ans?.isAnswered) answered++;
    }
    return {
      answered,
      unanswered: 180 - answered,
    };
  }, [answers, questionIdMap]);

  const handleDownloadPdf = () => {
    generateOmrPdf({
      studentName,
      registrationId,
      examName,
      paperName,
      attemptId,
      rollNumber,
      testBookletNo,
      testBookletCode,
      motherName,
      fatherName,
      submissionTime,
      totalQuestions: 180,
      answers,
      questionIdMap,
      autoDownload: true,
    });
  };

  return (
    <div className="space-y-4">
      {/* Top Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-sm text-xs">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 font-semibold text-[#20252B]">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span>NEET 180-Question Live Physical Sheet</span>
          </div>
          <span className="text-[#66727D]">
            Darkened: <strong className="font-mono text-[#20252B]">{stats.answered}</strong> / 180
          </span>
          <span className="text-[#66727D]">•</span>
          <span className="text-[#66727D]">
            Blank: <strong className="font-mono text-[#66727D]">{stats.unanswered}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Zoom controls */}
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(0.75, z - 0.1))}
            className="rounded-lg border border-[#DCE2E6] bg-[#F1F3F4] p-1.5 text-[#20252B] hover:bg-[#E9EEF1]"
            title="Zoom Out"
          >
            <ZoomOut className="h-4 w-4" />
          </button>
          <span className="font-mono text-[11px] text-[#66727D] w-10 text-center">
            {Math.round(zoomLevel * 100)}%
          </span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(1.4, z + 0.1))}
            className="rounded-lg border border-[#DCE2E6] bg-[#F1F3F4] p-1.5 text-[#20252B] hover:bg-[#E9EEF1]"
            title="Zoom In"
          >
            <ZoomIn className="h-4 w-4" />
          </button>

          {/* Download PDF CTA */}
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="inline-flex items-center gap-1.5 rounded-xl bg-[#E4002B] px-4 py-2 font-bold text-white shadow-sm hover:bg-[#C90026] transition-all"
          >
            <FileDown className="h-4 w-4" />
            <span>Download Vector A4 PDF</span>
          </button>
        </div>
      </div>

      {/* Physical Sheet Container (Horizontal Scrollable for Mobile / Tablet) */}
      <div className="overflow-x-auto rounded-2xl border border-[#DCE2E6] bg-[#E9EEF1]/50 p-4 sm:p-8 flex justify-center">
        <div
          style={{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }}
          className="relative w-[850px] min-w-[850px] bg-white border border-[#D45D4C] p-6 shadow-2xl transition-transform text-[#20252B] select-none"
        >
          {/* Optical Timing Marks on Left and Right Edges */}
          <div className="absolute left-1 top-4 bottom-4 flex flex-col justify-between py-2">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-black" />
            ))}
          </div>
          <div className="absolute right-1 top-4 bottom-4 flex flex-col justify-between py-2">
            {Array.from({ length: 42 }).map((_, i) => (
              <div key={i} className="w-2.5 h-1.5 bg-black" />
            ))}
          </div>

          {/* --- TOP HEADER --- */}
          <div className="flex items-center justify-between border-b border-[#D45D4C]/30 pb-3 pl-3 pr-3">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded bg-[#9CC6E0] text-[#20252B] flex items-center justify-center font-bold text-xs">
                F
              </div>
              <div>
                <div className="font-extrabold text-base tracking-tight text-[#20252B] leading-none">
                  FORT
                </div>
                <div className="text-[9px] font-semibold text-[#20252B] leading-none tracking-wider uppercase">
                  Learning
                </div>
              </div>
            </div>

            {/* Center Instructions Capsule */}
            <div className="max-w-[420px] rounded-lg border border-[#D45D4C] bg-white px-3 py-1.5 text-center text-[8.5px] leading-tight text-[#20252B]">
              The candidate should ensure that Roll No. and Test Booklet No. have been filled and marked correctly and Test Booklet Code printed in this sheet and Test Booklet is the same.
            </div>

            {/* Right Title */}
            <div className="text-right">
              <h2 className="font-extrabold text-sm tracking-wider text-[#20252B] uppercase">
                NEET OMR ANSWER SHEET
              </h2>
            </div>
          </div>

          {/* --- MAIN BODY (LEFT COLUMN + 4 ANSWER COLUMNS) --- */}
          <div className="mt-3 flex gap-4 pl-3 pr-3">
            {/* LEFT COLUMN: IDENTIFICATION PANELS */}
            <div className="w-[190px] shrink-0 space-y-2.5">
              {/* 1. ROLL NO. PANEL */}
              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] py-1 text-center font-bold text-[10px] text-[#20252B] border-b border-[#D45D4C]">
                  ROLL No.
                </div>
                {/* 10 Digit Boxes */}
                <div className="grid grid-cols-10 border-b border-[#D45D4C]">
                  {rollDigits.map((d, i) => (
                    <div
                      key={i}
                      className="h-6 flex items-center justify-center font-mono font-bold text-[10px] border-r last:border-r-0 border-[#D45D4C]"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                {/* 10x10 Digit Bubble Grid */}
                <div className="grid grid-cols-10 p-1 gap-y-1">
                  {Array.from({ length: 10 }).map((_, digit) => (
                    <React.Fragment key={digit}>
                      {rollDigits.map((d, col) => {
                        const isFilled = parseInt(d, 10) === digit;
                        return (
                          <div key={col} className="flex justify-center">
                            <div
                              className={cn(
                                'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold border',
                                isFilled
                                  ? 'bg-black border-black text-white'
                                  : 'border-[#D45D4C] text-[#D45D4C] bg-white'
                              )}
                            >
                              {!isFilled && digit}
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 2. TEST BOOKLET NO. PANEL */}
              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] py-1 text-center font-bold text-[10px] text-[#20252B] border-b border-[#D45D4C]">
                  TEST BOOKLET No.
                </div>
                {/* 7 Digit Boxes */}
                <div className="grid grid-cols-7 border-b border-[#D45D4C]">
                  {bookletDigits.map((d, i) => (
                    <div
                      key={i}
                      className="h-6 flex items-center justify-center font-mono font-bold text-[10px] border-r last:border-r-0 border-[#D45D4C]"
                    >
                      {d}
                    </div>
                  ))}
                </div>
                {/* 7x10 Digit Bubble Grid */}
                <div className="grid grid-cols-7 p-1 gap-y-1">
                  {Array.from({ length: 10 }).map((_, digit) => (
                    <React.Fragment key={digit}>
                      {bookletDigits.map((d, col) => {
                        const isFilled = parseInt(d, 10) === digit;
                        return (
                          <div key={col} className="flex justify-center">
                            <div
                              className={cn(
                                'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold border',
                                isFilled
                                  ? 'bg-black border-black text-white'
                                  : 'border-[#D45D4C] text-[#D45D4C] bg-white'
                              )}
                            >
                              {!isFilled && digit}
                            </div>
                          </div>
                        );
                      })}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 3. TEST BOOKLET CODE PANEL */}
              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] py-1 text-center font-bold text-[10px] text-[#20252B] border-b border-[#D45D4C]">
                  Test Booklet Code
                </div>
                <div className="h-16 flex items-center justify-around px-4">
                  <div className="text-3xl font-black font-sans text-[#20252B]">
                    {testBookletCode}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-black border border-black" />
                </div>
              </div>

              {/* 4. ANSWER SHEET NO. & BARCODE PANEL */}
              <div className="rounded border border-[#D45D4C] p-2.5 bg-white relative">
                {/* Corner Marks */}
                <div className="absolute left-1.5 top-1.5 w-2 h-2 border-l border-t border-[#20252B]" />
                <div className="absolute right-1.5 top-1.5 w-2 h-2 border-r border-t border-[#20252B]" />
                <div className="absolute left-1.5 bottom-1.5 w-2 h-2 border-l border-b border-[#20252B]" />
                <div className="absolute right-1.5 bottom-1.5 w-2 h-2 border-r border-b border-[#20252B]" />

                <div className="flex items-center justify-between gap-1">
                  <span className="-rotate-90 origin-center text-[8px] font-bold tracking-wider text-[#20252B] whitespace-nowrap">
                    Answer Sheet No.
                  </span>

                  {/* High Resolution Vector Barcode */}
                  <div className="h-24 flex items-center justify-center">
                    <svg className="h-20 w-24" viewBox="0 0 100 60" preserveAspectRatio="none">
                      {(() => {
                        const totalUnits = barcodeModules.reduce((acc, m) => acc + m.widthRatio, 0);
                        let curX = 0;
                        return barcodeModules.map((m, idx) => {
                          const w = (m.widthRatio / totalUnits) * 100;
                          const bar = m.isBar ? (
                            <rect key={idx} x={curX} y={0} width={w} height={60} fill="#000" />
                          ) : null;
                          curX += w;
                          return bar;
                        });
                      })()}
                    </svg>
                  </div>

                  <span className="-rotate-90 origin-center text-[9px] font-mono font-bold text-[#20252B] whitespace-nowrap">
                    {registrationId}
                  </span>
                </div>
              </div>
            </div>

            {/* RIGHT AREA: 4 ANSWER COLUMNS (EXACTLY 180 QUESTIONS) */}
            <div className="flex-1 grid grid-cols-4 gap-2.5">
              {[0, 1, 2, 3].map((colIndex) => {
                const startQ = colIndex * 45 + 1;
                const endQ = (colIndex + 1) * 45;

                return (
                  <div
                    key={colIndex}
                    className="rounded border border-[#D45D4C] overflow-hidden bg-white"
                  >
                    {/* Column Header */}
                    <div className="flex items-center justify-between bg-[#D7E7F2] px-2 py-1 border-b border-[#D45D4C] text-[9px] font-bold text-[#20252B]">
                      <span>Q.No.</span>
                      <span className="pr-4">Response</span>
                    </div>

                    {/* 45 Rows in this column */}
                    <div className="divide-y divide-[#D45D4C]/20 text-[9px]">
                      {Array.from({ length: 45 }, (_, r) => {
                        const qNum = startQ + r;
                        const qId = questionIdMap[qNum];
                        const ans = qId ? answers[qId] : undefined;
                        const selectedOption = ans?.selectedOptions?.[0]; // 'A', 'B', 'C', 'D'
                        const isCurrent = currentQuestionNumber === qNum;

                        return (
                          <div
                            key={qNum}
                            onClick={() => onJumpToQuestion && onJumpToQuestion(qNum)}
                            className={cn(
                              'flex items-center justify-between px-1.5 py-[2px] transition-colors cursor-pointer',
                              isCurrent ? 'bg-[#E9EEF1]' : 'hover:bg-[#F1F3F4]'
                            )}
                          >
                            {/* 3-Digit Question Number */}
                            <span className="font-mono font-bold text-[8.5px] text-[#20252B] w-6">
                              {qNum.toString().padStart(3, '0')}
                            </span>

                            {/* 4 Answer Bubbles (1, 2, 3, 4) */}
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4].map((optNum) => {
                                const optLetter = optionLetters[optNum - 1];
                                const isFilled = selectedOption === optLetter;

                                return (
                                  <button
                                    key={optNum}
                                    type="button"
                                    disabled={isReadOnly}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!isReadOnly && onSelectOption) {
                                        onSelectOption(qNum, optLetter);
                                      }
                                    }}
                                    className={cn(
                                      'w-3.5 h-3.5 rounded-full flex items-center justify-center text-[7px] font-bold border transition-all',
                                      isFilled
                                        ? 'bg-black border-black text-white'
                                        : 'border-[#D45D4C] text-[#D45D4C] bg-white hover:bg-[#FDEDF0]'
                                    )}
                                    title={`Question ${qNum} -> Option ${optLetter} (${optNum})`}
                                  >
                                    {!isFilled && optNum}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* --- BOTTOM SECTION: CANDIDATE DECLARATION & VERIFICATION --- */}
          <div className="mt-3 grid grid-cols-12 gap-2 pl-3 pr-3 text-[9px]">
            {/* Box 1: DECLARATION BY THE CANDIDATE (5 cols) */}
            <div className="col-span-5 rounded border border-[#D45D4C] overflow-hidden bg-white p-2 flex flex-col justify-between">
              <div>
                <div className="bg-[#D7E7F2] -m-2 mb-2 p-1 text-center font-bold text-[9px] text-[#20252B] border-b border-[#D45D4C]">
                  DECLARATION BY THE CANDIDATE
                </div>
                <p className="text-[7.5px] leading-tight text-[#20252B]">
                  I declare that particulars and signature on this OMR Answer Sheet are mine and are same as in the attached Sheet. I further declare that particulars filled-in and signature as well as the circles darkened on this ORIGINAL Copy is same as in the FORT Learning copy.
                </p>
              </div>

              <div className="mt-2 space-y-2">
                <div className="border border-[#D45D4C] p-1.5 rounded">
                  <div className="text-[7px] font-bold text-[#66727D]">
                    Signature with time (in running handwriting)
                  </div>
                  <div className="mt-1 flex items-baseline justify-between">
                    <span className="font-sans italic font-bold text-xs text-[#20252B]">
                      {studentName}
                    </span>
                    <span className="text-[7.5px] text-[#66727D]">
                      {submissionTime || new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }) + ' IST'}
                    </span>
                  </div>
                </div>

                <div className="bg-[#D7E7F2] border border-[#D45D4C] p-1 rounded text-center">
                  <span className="text-[7px] font-bold text-[#20252B]">
                    CANDIDATE'S NAME (in running handwriting)
                  </span>
                </div>
              </div>
            </div>

            {/* Box 2: MOTHER & THUMB IMPRESSION (4 cols) */}
            <div className="col-span-4 space-y-2">
              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] p-1 text-center font-bold text-[9px] text-[#20252B] border-b border-[#D45D4C]">
                  MOTHER'S NAME (in running handwriting)
                </div>
                <div className="h-9 p-1 font-sans italic text-xs text-[#20252B]">
                  {motherName || ''}
                </div>
              </div>

              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] p-1 text-center font-bold text-[9px] text-[#20252B] border-b border-[#D45D4C]">
                  CANDIDATE'S LEFT HAND THUMB IMPRESSION
                </div>
                <div className="h-12 flex items-center justify-center text-[7.5px] text-[#66727D]">
                  NOT REQUIRED — DIGITAL EXAMINATION
                </div>
              </div>
            </div>

            {/* Box 3: FATHER & INVIGILATOR (3 cols) */}
            <div className="col-span-3 space-y-2">
              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] p-1 text-center font-bold text-[9px] text-[#20252B] border-b border-[#D45D4C]">
                  FATHER'S NAME (in running handwriting)
                </div>
                <div className="h-9 p-1 font-sans italic text-xs text-[#20252B]">
                  {fatherName || ''}
                </div>
              </div>

              <div className="rounded border border-[#D45D4C] overflow-hidden bg-white">
                <div className="bg-[#D7E7F2] p-1 text-center font-bold text-[8.5px] text-[#20252B] border-b border-[#D45D4C]">
                  SIGNATURE OF INVIGILATOR'S WITH TIME
                </div>
                <div className="h-12 grid grid-rows-2 divide-y divide-[#D45D4C]/30 text-[7.5px] p-1">
                  <span>1.</span>
                  <span className="pt-0.5">2.</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
