import React from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Compass, BookOpen, Sparkles, Scale, Landmark, Award, ShieldAlert, Check, HelpCircle, Layers, Flame } from 'lucide-react';
import { ExamSwitcher } from '@/components/exams/ExamSwitcher';
import { UpscSyllabusExplorer } from '@/components/syllabus/UpscSyllabusExplorer';
import { UPSC_EXAM_PATTERN } from '@/data/upscSyllabusData';

export const metadata = {
  title: 'MERITWISE UPSC — Civil Services Examination Practice',
  description:
    'Dedicated UPSC CSE preparation with timed General Studies & CSAT tests, fractional negative marking, and performance analytics.',
};

export default function UpscLandingPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-6 sm:py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12">
        {/* Capsule Glassmorphism Exam Switcher */}
        <ExamSwitcher currentSlug="upsc" />

        {/* Hero Section */}
        <div className="merit-card rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-6">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              <span>UNION PUBLIC SERVICE COMMISSION • CIVIL SERVICES (CSE)</span>
            </div>

            <h1 className="text-4xl sm:text-5xl font-extrabold font-sans tracking-tight leading-[1.1] text-[#121316]">
              Analytical precision for Civil Services aspirants.
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] font-normal leading-relaxed">
              Prelims objective accuracy with fractional negative marking calibration (-0.66 for Paper I / -0.83 for Paper II) alongside structured question papers and topic-level accuracy tracking.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-4">
              <Link
                href="/practice"
                className="btn-merit-primary h-12 px-8 text-sm font-bold uppercase tracking-wider"
              >
                Start Practice ↗
              </Link>
              <a
                href="#syllabus"
                className="btn-merit-secondary h-12 px-7 text-sm font-semibold inline-flex items-center gap-1.5"
              >
                Official 2026-27 Syllabus ↓
              </a>
              <a
                href="#blueprint"
                className="rounded-full border border-[#DCE2E6] bg-white px-6 py-3 text-sm font-semibold text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316] transition-colors"
              >
                Exam Blueprint
              </a>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section id="blueprint" className="space-y-8">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#71717A]">
              <Layers className="h-3.5 w-3.5 text-[#8C6D3B]" />
              <span>EXAMINATION ARCHITECTURE & PATTERN OVERVIEW</span>
            </div>
            <h2 className="mt-1 text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
              UPSC CSE Exam Pattern Matrix
            </h2>
            <p className="mt-1 text-sm text-[#52525B]">
              Comprehensive two-tier screening: Preliminary objective testing followed by Mains written descriptive evaluation and Personality Test.
            </p>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: 'Prelims Total', value: '400 Marks', detail: 'GS (200M) + CSAT (200M Qualifying)', badge: 'Objective (OMR)' },
              { label: 'CSAT Threshold', value: '33% (66.67M)', detail: 'Mandatory qualifier for GS evaluation', badge: 'Qualifying' },
              { label: 'Mains Written', value: '1750 Marks', detail: 'Essay + 4 GS Papers + 2 Optionals', badge: 'Descriptive' },
              { label: 'Grand Total Score', value: '2025 Marks', detail: '1750 Written + 275 Personality Test', badge: 'Final Merit' },
            ].map((stat, idx) => (
              <div key={idx} className="merit-card p-5 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-[#71717A]">{stat.label}</span>
                  <span className="rounded-full bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-bold text-[#52525B]">
                    {stat.badge}
                  </span>
                </div>
                <div className="text-2xl font-extrabold font-sans text-[#121316]">{stat.value}</div>
                <div className="text-xs text-[#52525B]">{stat.detail}</div>
              </div>
            ))}
          </div>

          {/* 1. Preliminary Examination Architecture */}
          <div className="merit-card overflow-hidden rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E4E4DF] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D3B]">
                  PART A — PRELIMINARY EXAMINATION
                </span>
                <h3 className="text-xl font-bold font-sans text-[#121316]">
                  Prelims Pattern (Objective • 2 × 200 Marks • Same Day)
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#F7F3EB] px-3 py-1 text-xs font-bold text-[#6E5328]">
                Negative Penalty 1/3rd per incorrect MCQ
              </span>
            </div>

            {/* Prelims Pattern Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#121316] border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#E4E4DF] bg-[#F9F9F8] text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    <th className="py-3 px-4">Paper (Duration)</th>
                    <th className="py-3 px-4">Total Marks</th>
                    <th className="py-3 px-4">No. of Questions</th>
                    <th className="py-3 px-4">Marks per Question</th>
                    <th className="py-3 px-4">Negative Marking</th>
                    <th className="py-3 px-4">Qualifying / Merit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E4DF]">
                  {UPSC_EXAM_PATTERN.prelims.papers.map((p, idx) => (
                    <tr key={idx} className="hover:bg-[#FDFDFD] transition-colors">
                      <td className="py-3.5 px-4 font-semibold text-[#121316]">
                        {p.paperName}{' '}
                        <span className="block text-xs font-normal text-[#71717A]">{p.duration}</span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-bold text-[#121316]">{p.totalMarks}</td>
                      <td className="py-3.5 px-4 font-mono text-[#52525B]">{p.questionCount}</td>
                      <td className="py-3.5 px-4 font-mono text-[#52525B]">+{p.marksPerQuestion}</td>
                      <td className="py-3.5 px-4 font-mono text-red-600 font-semibold">{p.negativeMarking}</td>
                      <td className="py-3.5 px-4">
                        {p.isQualifying ? (
                          <span className="inline-flex items-center rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-bold text-amber-700 border border-amber-200">
                            Qualifying (Min. {p.qualifyingPercentage}%)
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700 border border-emerald-200">
                            Counts for Mains Shortlist
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Official Statutory Notes */}
            <div className="rounded-xl border border-[#DCE2E6] bg-[#F7F9FB] p-4 sm:p-5 space-y-2.5">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#1E3A8A]">
                <ShieldAlert className="h-4 w-4" />
                <span>OFFICIAL STATUTORY INSTRUCTIONS & CONDITIONS</span>
              </div>
              <ul className="space-y-1.5 text-xs sm:text-sm text-[#334155] list-disc list-inside">
                {UPSC_EXAM_PATTERN.prelims.notes.map((note, idx) => (
                  <li key={idx} className="leading-relaxed">
                    <strong className="text-[#0F172A]">{note.split(':')[0]}:</strong>
                    {note.substring(note.indexOf(':') + 1)}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* UPSC Prelims Test Series 2026 3.0 Spotlight */}
          <div className="merit-card rounded-[24px] bg-gradient-to-br from-[#FAF9F5] via-[#FFFFFF] to-[#F5F2EA] p-6 sm:p-8 border border-[#E8E1D3] space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8C6D3B]/10 px-3 py-0.5 text-xs font-bold uppercase tracking-wider text-[#8C6D3B]">
                  <Flame className="h-3.5 w-3.5" />
                  <span>UPSC PRELIMS TEST SERIES 2026 3.0</span>
                </div>
                <h3 className="text-xl font-bold font-sans text-[#121316]">
                  Excel with our AI-Powered Test Series
                </h3>
              </div>
              <Link
                href="/practice"
                className="btn-merit-primary inline-flex items-center gap-1.5 self-start h-10 px-5 text-xs font-bold uppercase tracking-wider"
              >
                <span>Enroll In Test Series</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
            <p className="text-sm text-[#52525B] leading-relaxed max-w-4xl">
              Features systematic subject-wise & textbook-based plans, discussion classes, detailed analytics to track performance, and multiple retakes. Choose from flexible packages to master the Prelims.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                'Subject-Wise Modules',
                'NCERT & Standard Texts',
                'Detailed Error Analytics',
                'Multiple Retakes',
              ].map((feat, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-semibold text-[#121316]">
                  <CheckCircle2 className="h-4 w-4 text-[#8C6D3B] shrink-0" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 2. Main Examination & Personality Test Architecture */}
          <div className="merit-card overflow-hidden rounded-[24px] p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 border-b border-[#E4E4DF] pb-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#8C6D3B]">
                  PART B — MAIN EXAMINATION & PERSONALITY TEST
                </span>
                <h3 className="text-xl font-bold font-sans text-[#121316]">
                  Mains Written (1750 Marks) + Interview (275 Marks) = 2025 Marks
                </h3>
              </div>
              <span className="inline-flex items-center gap-1.5 self-start rounded-full bg-[#F4F4F0] px-3 py-1 text-xs font-bold text-[#52525B]">
                Descriptive Written (3 Hours per paper)
              </span>
            </div>

            {/* Mains Pattern Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-[#121316] border-collapse min-w-[640px]">
                <thead>
                  <tr className="border-b border-[#E4E4DF] bg-[#F9F9F8] text-[11px] font-bold uppercase tracking-wider text-[#71717A]">
                    <th className="py-3 px-4">Paper Code</th>
                    <th className="py-3 px-4">Subject / Nomenclature</th>
                    <th className="py-3 px-4 text-center">Duration</th>
                    <th className="py-3 px-4 text-right">Maximum Marks</th>
                    <th className="py-3 px-4 text-right">Evaluation Role</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E4E4DF]">
                  {/* Qualifying Papers */}
                  {UPSC_EXAM_PATTERN.mains.qualifyingPapers.map((p, idx) => (
                    <tr key={`qual-${idx}`} className="bg-[#FAF9F5]/40 hover:bg-[#FAF9F5] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#8C6D3B]">{p.paperCode}</td>
                      <td className="py-3 px-4 font-semibold text-[#121316]">{p.paperName}</td>
                      <td className="py-3 px-4 text-center text-xs font-mono text-[#52525B]">{p.duration}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#121316]">{p.marks}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700">
                          Qualifying Only (Not in Merit)
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* Merit Papers */}
                  {UPSC_EXAM_PATTERN.mains.meritPapers.map((p, idx) => (
                    <tr key={`merit-${idx}`} className="hover:bg-[#FDFDFD] transition-colors">
                      <td className="py-3 px-4 font-mono font-bold text-[#121316]">{p.paperCode}</td>
                      <td className="py-3 px-4 font-medium text-[#121316]">{p.paperName}</td>
                      <td className="py-3 px-4 text-center text-xs font-mono text-[#52525B]">{p.duration}</td>
                      <td className="py-3 px-4 text-right font-mono font-bold text-[#121316]">{p.marks}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                          Counts for Merit
                        </span>
                      </td>
                    </tr>
                  ))}

                  {/* Subtotal Written */}
                  <tr className="bg-[#F4F4F0] font-bold border-t-2 border-[#DCE2E6]">
                    <td colSpan={3} className="py-3 px-4 uppercase tracking-wider text-xs text-[#121316]">
                      Subtotal (Written Descriptive Examination)
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-base text-[#121316]">
                      {UPSC_EXAM_PATTERN.mains.subtotalWritten}
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-[#52525B]">7 Merit Papers × 250</td>
                  </tr>

                  {/* Interview */}
                  <tr className="hover:bg-[#FDFDFD] transition-colors font-medium">
                    <td colSpan={3} className="py-3 px-4 text-[#121316]">
                      Personality Test / Interview (Board Evaluation)
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-[#121316]">
                      {UPSC_EXAM_PATTERN.mains.interviewMarks}
                    </td>
                    <td className="py-3 px-4 text-right text-xs text-[#52525B]">Direct Viva Voce</td>
                  </tr>

                  {/* Grand Total */}
                  <tr className="bg-[#121316] text-white font-extrabold text-base">
                    <td colSpan={3} className="py-4 px-4 uppercase tracking-wider text-sm">
                      Grand Total (Final Merit Ranking)
                    </td>
                    <td className="py-4 px-4 text-right font-mono text-xl text-[#F5C249]">
                      {UPSC_EXAM_PATTERN.mains.grandTotal}
                    </td>
                    <td className="py-4 px-4 text-right text-xs text-zinc-300 font-normal">
                      Written (1750) + Interview (275)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Assessment Philosophy Callout */}
            <div className="rounded-xl border border-[#E8E1D3] bg-[#FAF9F5] p-5 sm:p-6 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-[#8C6D3B]">
                OFFICIAL UPSC PHILOSOPHY OF ASSESSMENT
              </div>
              <p className="text-xs sm:text-sm text-[#44403C] leading-relaxed italic">
                &ldquo;{UPSC_EXAM_PATTERN.mains.philosophy}&rdquo;
              </p>
            </div>
          </div>
        </section>

        {/* Official Interactive UPSC CSE Syllabus Explorer */}
        <section id="syllabus" className="pt-4">
          <UpscSyllabusExplorer />
        </section>

        {/* Callout Banner */}
        <div className="merit-card rounded-[28px] p-8 text-center sm:p-12 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#121316]">
            Start Preparing with Analytical Rigor
          </h2>
          <p className="mx-auto max-w-xl text-sm text-[#52525B]">
            Calibrate your Prelims negative marking accuracy, practice official-pattern CSAT reading passages, and draft Mains answers in our dedicated studio.
          </p>
          <div className="pt-2">
            <Link
              href="/signup"
              className="btn-merit-primary inline-flex items-center gap-2 h-12 px-8 text-sm font-bold uppercase tracking-wider"
            >
              <span>Create Free Account</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
