'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  FileText,
  CheckCircle2,
  Clock,
  Sparkles,
  BookOpen,
  Calculator,
  ShieldAlert,
  CheckCircle,
  XCircle,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { toast } from 'sonner';
import { UpscSyllabusExplorer } from '@/components/syllabus/UpscSyllabusExplorer';
import { UPSC_EXAM_PATTERN } from '@/data/upscSyllabusData';

export default function StudentUpscDashboardPage() {
  const [activeTab, setActiveTab] = useState<'prelims' | 'mains' | 'syllabus'>('mains');

  // Mains Answer Writing Studio State
  const samplePrompt = {
    paper: 'General Studies Paper II',
    marks: 15,
    wordLimit: 250,
    question:
      'Critically examine the constitutional significance of the Writ of Habeas Corpus in safeguarding individual liberty during emergencies. Illustrate with landmark judicial precedents.',
  };

  const [essayContent, setEssayContent] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');

  // Prelims Scoring & CSAT Qualifier Simulator State
  const [gsCorrect, setGsCorrect] = useState(55);
  const [gsIncorrect, setGsIncorrect] = useState(25);
  const [csatCorrect, setCsatCorrect] = useState(38);
  const [csatIncorrect, setCsatIncorrect] = useState(14);

  // GS1 Calculations (100 Qs, +2 / -0.6667)
  const gsAttempted = Math.min(100, Math.max(0, gsCorrect + gsIncorrect));
  const gsUnattempted = Math.max(0, 100 - gsAttempted);
  const gsScore = Math.round((gsCorrect * 2.0 - gsIncorrect * 0.6667) * 100) / 100;

  // CSAT Calculations (80 Qs, +2.5 / -0.8333, 33% threshold = 66.67M)
  const csatAttempted = Math.min(80, Math.max(0, csatCorrect + csatIncorrect));
  const csatUnattempted = Math.max(0, 80 - csatAttempted);
  const csatScore = Math.round((csatCorrect * 2.5 - csatIncorrect * 0.8333) * 100) / 100;
  const csatPercentage = Math.round((csatScore / 200) * 1000) / 10;
  const isCsatQualified = csatScore >= 66.67;

  // Word & character counts
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const charCount = essayContent.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fort_upsc_mains_draft');
      if (saved) {
        setEssayContent(saved);
      }
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssayContent(text);
    setAutosaveStatus('saving');

    if (typeof window !== 'undefined') {
      localStorage.setItem('fort_upsc_mains_draft', text);
      setTimeout(() => {
        setAutosaveStatus('saved');
      }, 500);
    }
  };

  const handleSubmitAnswer = () => {
    if (wordCount < 50) {
      toast.error('Response too short. Please draft at least 50 words.');
      return;
    }
    toast.success('Descriptive answer submitted for rubric evaluation!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <span className="rounded-lg bg-[#E9EEF1] px-2.5 py-1 text-xs font-bold text-[#20252B]">
            UPSC Civil Services Examination
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B]">
            UPSC CSE Preparation Studio
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTab('mains')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'mains'
                ? 'bg-[#9CC6E0] text-[#20252B] shadow-soft'
                : 'bg-white text-[#66727D] border border-[#DCE2E6]'
            }`}
          >
            Mains Answer Writing Studio
          </button>
          <button
            onClick={() => setActiveTab('prelims')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'prelims'
                ? 'bg-[#9CC6E0] text-[#20252B] shadow-soft'
                : 'bg-white text-[#66727D] border border-[#DCE2E6]'
            }`}
          >
            Prelims GS & CSAT Tests
          </button>
          <button
            onClick={() => setActiveTab('syllabus')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'syllabus'
                ? 'bg-[#9CC6E0] text-[#20252B] shadow-soft'
                : 'bg-white text-[#66727D] border border-[#DCE2E6]'
            }`}
          >
            Official Syllabus Explorer
          </button>
        </div>
      </div>

      {activeTab === 'mains' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Answer Writing Canvas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 sm:p-7 shadow-soft">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3 text-xs">
                <span className="font-bold text-[#20252B]">{samplePrompt.paper}</span>
                <span className="text-[#66727D]">
                  Max Marks: <strong className="text-[#20252B]">{samplePrompt.marks}</strong> • Limit:{' '}
                  <strong className="text-[#20252B]">{samplePrompt.wordLimit} Words</strong>
                </span>
              </div>

              <div className="mt-4 text-sm sm:text-base font-semibold leading-relaxed text-[#20252B]">
                {samplePrompt.question}
              </div>
            </div>

            {/* Editor Area */}
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-soft space-y-3">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#20252B]">
                    Words:{' '}
                    <strong className={wordCount > 250 ? 'text-[#E4002B]' : 'text-[#20252B]'}>
                      {wordCount}
                    </strong>{' '}
                    / 250
                  </span>
                  <span className="text-[#66727D]">Chars: {charCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#9CC6E0]" />
                  <span className="text-[11px] text-[#66727D] font-medium">
                    {autosaveStatus === 'saving' ? 'Autosaving...' : 'Draft Saved'}
                  </span>
                </div>
              </div>

              <textarea
                value={essayContent}
                onChange={handleTextChange}
                rows={14}
                placeholder="Write your analytical response here. Follow introduction, body arguments with constitutional articles and landmark cases, and a forward-looking conclusion..."
                className="w-full resize-none rounded-xl border border-[#DCE2E6] bg-[#F1F3F4]/50 p-4 text-sm text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:bg-white focus:outline-none leading-relaxed font-sans transition-all"
              />

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSubmitAnswer}
                  className="rounded-xl bg-[#9CC6E0] px-6 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#8fa27a] shadow-soft"
                >
                  Submit for Rubric Evaluation
                </button>
              </div>
            </div>
          </div>

          {/* Rubric Criteria Guidelines */}
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-[#20252B]">UPSC Evaluation Rubric</h3>
            <p className="text-xs text-[#66727D]">
              Responses are benchmarked against 4 structured dimensions:
            </p>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4">
                <strong className="text-[#20252B]">1. Constitutional Accuracy (4 Marks)</strong>
                <p className="mt-1 text-[#66727D]">
                  Cites Articles 32, 226, 359 and the 44th Constitutional Amendment Act, 1978.
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4">
                <strong className="text-[#20252B]">2. Judicial Precedents (4 Marks)</strong>
                <p className="mt-1 text-[#66727D]">
                  Analyzes ADM Jabalpur v. Shivkant Shukla (1976) and Justice K.S. Puttaswamy (2017).
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4">
                <strong className="text-[#20252B]">3. Critical Structure & Flow (4 Marks)</strong>
                <p className="mt-1 text-[#66727D]">
                  Clear division between historical stance, emergency misuse, and modern safeguard.
                </p>
              </div>

              <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-4">
                <strong className="text-[#20252B]">4. Concluding Vision (3 Marks)</strong>
                <p className="mt-1 text-[#66727D]">
                  Balanced conclusion upholding substantive due process and rule of law.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === 'prelims' ? (
        <div className="space-y-8">
          {/* CSAT Qualifier & GS-I Scoring Simulator */}
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-soft space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#DCE2E6] pb-4">
              <div>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8C6D3B]">
                  <Calculator className="h-4 w-4" />
                  <span>PRELIMS SCORING ENGINE & CSAT 33% QUALIFIER SIMULATOR</span>
                </div>
                <h2 className="mt-1 text-xl sm:text-2xl font-bold text-[#20252B]">
                  Calibrate Negative Deductions & Passing Safety Margin
                </h2>
              </div>
              <span className="rounded-full bg-[#FAF9F5] border border-[#E8E1D3] px-3.5 py-1 text-xs font-bold text-[#6E5328] self-start">
                Mandatory Both Papers on Same Day
              </span>
            </div>

            {/* Two Column Simulator */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Paper I: GS-1 */}
              <div className="rounded-xl border border-[#DCE2E6] bg-[#FBFBFA] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-2">
                  <div>
                    <span className="text-xs font-bold text-[#121316]">Paper I — General Studies</span>
                    <span className="block text-[11px] text-[#71717A]">100 Questions • 200 Marks • +2.0 / -0.66</span>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200">
                    Counts for Merit Cutoff
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#20252B] mb-1">
                      <span>Correct Answers (+2.0 each):</span>
                      <strong className="font-mono text-emerald-700">{gsCorrect} / 100</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={gsCorrect}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setGsCorrect(val);
                        if (val + gsIncorrect > 100) {
                          setGsIncorrect(100 - val);
                        }
                      }}
                      className="w-full accent-[#8C6D3B]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#20252B] mb-1">
                      <span>Incorrect Answers (-0.66 each):</span>
                      <strong className="font-mono text-red-600">{gsIncorrect} / 100</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={100 - gsCorrect}
                      value={gsIncorrect}
                      onChange={(e) => setGsIncorrect(parseInt(e.target.value) || 0)}
                      className="w-full accent-red-600"
                    />
                  </div>
                </div>

                {/* Score Summary */}
                <div className="rounded-lg bg-white border border-[#E4E4DF] p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#52525B]">
                    <span>Attempted / Unattempted:</span>
                    <span className="font-mono font-medium">{gsAttempted} attempted • {gsUnattempted} unattempted</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span>Gross Score (Correct × 2):</span>
                    <span className="font-mono text-emerald-600 font-semibold">+{gsCorrect * 2}</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span>Penalty Deduction (Incorrect × 0.66):</span>
                    <span className="font-mono text-red-600 font-semibold">-{(gsIncorrect * 0.6667).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#E4E4DF]">
                    <span className="font-bold text-[#121316]">Net GS-I Score:</span>
                    <span className="font-mono text-xl font-extrabold text-[#121316]">
                      {gsScore.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-[#71717A]">/ 200</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* Paper II: CSAT */}
              <div className="rounded-xl border border-[#DCE2E6] bg-[#FBFBFA] p-5 space-y-4">
                <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-2">
                  <div>
                    <span className="text-xs font-bold text-[#121316]">Paper II — CSAT (Aptitude)</span>
                    <span className="block text-[11px] text-[#71717A]">80 Questions • 200 Marks • +2.5 / -0.83</span>
                  </div>
                  <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-700 border border-amber-200">
                    Min. 33% (66.67M) Qualifying
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#20252B] mb-1">
                      <span>Correct Answers (+2.5 each):</span>
                      <strong className="font-mono text-emerald-700">{csatCorrect} / 80</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80}
                      value={csatCorrect}
                      onChange={(e) => {
                        const val = parseInt(e.target.value) || 0;
                        setCsatCorrect(val);
                        if (val + csatIncorrect > 80) {
                          setCsatIncorrect(80 - val);
                        }
                      }}
                      className="w-full accent-[#8C6D3B]"
                    />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs font-medium text-[#20252B] mb-1">
                      <span>Incorrect Answers (-0.83 each):</span>
                      <strong className="font-mono text-red-600">{csatIncorrect} / 80</strong>
                    </div>
                    <input
                      type="range"
                      min={0}
                      max={80 - csatCorrect}
                      value={csatIncorrect}
                      onChange={(e) => setCsatIncorrect(parseInt(e.target.value) || 0)}
                      className="w-full accent-red-600"
                    />
                  </div>
                </div>

                {/* Score Summary */}
                <div className="rounded-lg bg-white border border-[#E4E4DF] p-3 space-y-2 text-xs">
                  <div className="flex justify-between text-[#52525B]">
                    <span>Attempted / Unattempted:</span>
                    <span className="font-mono font-medium">{csatAttempted} attempted • {csatUnattempted} unattempted</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span>Gross Score (Correct × 2.5):</span>
                    <span className="font-mono text-emerald-600 font-semibold">+{(csatCorrect * 2.5).toFixed(1)}</span>
                  </div>
                  <div className="flex justify-between text-[#52525B]">
                    <span>Penalty Deduction (Incorrect × 0.83):</span>
                    <span className="font-mono text-red-600 font-semibold">-{(csatIncorrect * 0.8333).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-[#E4E4DF]">
                    <div>
                      <span className="font-bold text-[#121316]">Net CSAT Score:</span>
                      <span className="block text-[10px] text-[#71717A]">{csatPercentage.toFixed(1)}% of 200M</span>
                    </div>
                    <span className={`font-mono text-xl font-extrabold ${isCsatQualified ? 'text-emerald-700' : 'text-red-600'}`}>
                      {csatScore.toFixed(2)}{' '}
                      <span className="text-xs font-normal text-[#71717A]">/ 200</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Qualifier Status Verdict Box */}
            <div
              className={`rounded-xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all ${
                isCsatQualified
                  ? 'border-emerald-200 bg-emerald-50/70 text-emerald-950'
                  : 'border-red-200 bg-red-50/70 text-red-950'
              }`}
            >
              <div className="flex items-start gap-3">
                {isCsatQualified ? (
                  <CheckCircle className="h-6 w-6 text-emerald-600 shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="h-6 w-6 text-red-600 shrink-0 mt-0.5" />
                )}
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider">
                    {isCsatQualified ? 'CSAT STATUS: QUALIFIED (≥ 33% / 66.67 MARKS)' : 'CSAT STATUS: DISQUALIFIED (< 33% / 66.67 MARKS)'}
                  </div>
                  <p className="mt-1 text-xs sm:text-sm leading-relaxed">
                    {isCsatQualified ? (
                      <>
                        Your CSAT score is <strong>{csatScore.toFixed(2)} marks ({csatPercentage.toFixed(1)}%)</strong>. Your Paper I score of <strong>{gsScore.toFixed(2)} marks</strong> will be evaluated by UPSC for the Civil Services (Main) Examination shortlist!
                      </>
                    ) : (
                      <>
                        Your CSAT score is <strong>{csatScore.toFixed(2)} marks ({csatPercentage.toFixed(1)}%)</strong>, falling below the statutory 33% (66.67 marks) minimum. <strong>Per UPSC Note 1, Paper I will NOT be evaluated regardless of score.</strong>
                      </>
                    )}
                  </p>
                </div>
              </div>
              <div className="shrink-0 self-start sm:self-auto">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-extrabold uppercase ${isCsatQualified ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}`}>
                  {isCsatQualified ? 'Eligible for Evaluation' : 'Disqualified'}
                </span>
              </div>
            </div>
          </div>

          {/* Practice Papers Launch Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#FAF9F5] border border-[#E8E1D3] px-2.5 py-0.5 text-xs font-bold text-[#8C6D3B]">
                  Paper I (General Studies)
                </span>
                <span className="text-xs text-[#71717A]">100 Questions • 120 Mins</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#20252B]">
                  UPSC CSE Prelims GS-I Full Mock Test 01
                </h3>
                <p className="mt-1 text-xs text-[#66727D] leading-relaxed">
                  Covering Indian Polity, Modern History, Physical & Human Geography, Economy, Ecology & Environment, and Current Events.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/exam/upsc-demo"
                  className="rounded-xl bg-[#8C6D3B] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#72572C] inline-flex items-center gap-2 shadow-soft transition-colors"
                >
                  <span>Attempt GS Paper 01</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>

            <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-soft space-y-4">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-amber-50 border border-amber-200 px-2.5 py-0.5 text-xs font-bold text-amber-700">
                  Paper II (CSAT Aptitude)
                </span>
                <span className="text-xs text-[#71717A]">80 Questions • 120 Mins</span>
              </div>
              <div>
                <h3 className="text-base font-bold text-[#20252B]">
                  UPSC CSE Prelims CSAT Full Mock Test 01
                </h3>
                <p className="mt-1 text-xs text-[#66727D] leading-relaxed">
                  Rigorous practice for Reading Comprehension passages, Logical Reasoning, General Mental Ability, and Data Interpretation.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  href="/exam/upsc-demo"
                  className="rounded-xl bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white hover:bg-black inline-flex items-center gap-2 shadow-soft transition-colors"
                >
                  <span>Attempt CSAT Paper 02</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <UpscSyllabusExplorer />
        </div>
      )}
    </div>
  );
}
