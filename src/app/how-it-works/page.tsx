import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  Clock,
  Target,
  FileText,
  BarChart3,
  CheckCircle2,
  ShieldCheck,
  Layers,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { NeetOmrBackground } from '@/components/home/NeetOmrBackground';

export const metadata = {
  title: 'How It Works — MERITWISE Examination Architecture & Methodology',
  description:
    'Explore the MERITWISE examination methodology: official curriculum selection, authentic CBT and physical vector OMR simulation, server-authoritative scoring, and question-level inaccuracy diagnostics.',
};

export default function HowItWorksPage() {
  // 5-Stage Core Educational Methodology
  const methodologyStages = [
    {
      step: '01',
      tag: 'DISCIPLINE SELECTION',
      title: 'Select Your Examination Curriculum',
      description:
        'Focus specifically on your target discipline. Every test paper adheres strictly to the official examination blueprint, section weightage, question format, and negative marking rules.',
      features: [
        'NEET (UG) Medical: Physics, Chemistry, Botany, Zoology • 720 Marks • 200 Minutes',
        'JEE Main Engineering: Single Correct & Numerical Value • 300 Marks • 180 Minutes',
        'JEE Advanced: Multi-Select Partial Marking & Comprehensive Matrix Match',
        'GATE Engineering: Core Technical & General Aptitude • 100 Marks • 180 Minutes',
      ],
      icon: Target,
    },
    {
      step: '02',
      tag: 'AUTHENTIC SIMULATION',
      title: 'Practice Under Exact Examination Conditions',
      description:
        'Eliminate the disparity between casual preparation and real examination hall pressure. Choose between native Computer-Based Testing or authentic physical pen-and-paper vector OMR bubble capture.',
      features: [
        'Server-synchronized countdown clock with zero local client tamperability',
        'Standard NTA/CBT question palette: Answered, Marked for Review, and Not Visited',
        'Printable Vector A4 NEET OMR answer sheets with authentic timing marks and roll number grids',
        'Distraction-free, zero-advertisement testing interface engineered for deep focus',
      ],
      icon: Clock,
    },
    {
      step: '03',
      tag: 'AUTHORITATIVE SCORING',
      title: 'Instant Automated Evaluation & Marking Schemes',
      description:
        'Receive immediate server-authoritative grading the moment you submit your test paper. Avoid subjective evaluation ambiguities and manual correction delays.',
      features: [
        'Strict negative marking enforcement (+4 for correct, -1 for incorrect in NEET/JEE)',
        'Complex JEE Advanced partial credit evaluation logic computed algorithmically',
        'Decimal tolerance calculation for numerical value answer fields',
        'Sectional score breakdown and accurate raw score summarization',
      ],
      icon: ShieldCheck,
    },
    {
      step: '04',
      tag: 'DIAGNOSTIC ENGINE',
      title: 'Deep Performance Diagnostics & Inaccuracy Review',
      description:
        'Go far beyond a simple score. MERITWISE isolates the root cause of lost marks—distinguishing conceptual mistakes from calculation slips and time mismanagement.',
      features: [
        'Pace vs. accuracy correlation: see where rush led to avoidable negative marks',
        'Subject-wise and chapter-wise accuracy breakdowns highlighting high-yield gaps',
        'Comprehensive question review with step-by-step verified explanations and KaTeX math formulas',
        'Detailed comparison against optimal benchmark completion timings',
      ],
      icon: BarChart3,
    },
    {
      step: '05',
      tag: 'SYSTEMATIC PROGRESSION',
      title: 'Target Weaknesses & Measure Genuine Readiness',
      description:
        'Transform post-test review into tangible score gains. Re-test problem areas, eliminate recurring patterns of errors, and track your trajectory across successive attempts.',
      features: [
        'Historical score and accuracy progression tracking across consecutive mock attempts',
        'Personal question bookmarking with candidate annotations for rapid revision',
        'Re-attempt unmastered question sets to verify conceptual retention',
        'Confidence calibrated for official examination day',
      ],
      icon: Award,
    },
  ];

  // Examination Architecture Comparison Table Data
  const comparisonItems = [
    {
      aspect: 'Timer Architecture',
      casual: 'Local device timer; easily paused or extended',
      meritwise: 'Server-synchronized authoritative countdown with automatic submission',
    },
    {
      aspect: 'Marking & Penalties',
      casual: 'Generous self-grading; negative marking often ignored',
      meritwise: 'Exact official formula: strict +4 / -1 penalties & multi-select partial scoring',
    },
    {
      aspect: 'Physical OMR Integration',
      casual: 'Generic printouts or digital-only multiple-choice clicks',
      meritwise: 'High-precision Vector A4 NEET OMR sheets with authentic optical timing marks',
    },
    {
      aspect: 'Inaccuracy Diagnostics',
      casual: 'Answer key only (A, B, C, D); no root-cause analysis',
      meritwise: 'Question-level categorization (concept, speed, calculation) + verified KaTeX steps',
    },
    {
      aspect: 'Platform Environment',
      casual: 'Cluttered with banner ads, popups, and distracting social gamification',
      meritwise: 'Cinematic, distraction-free environment dedicated solely to academic rigor',
    },
  ];

  // Supported Examinations Cards Data
  const targetExams = [
    {
      id: 'neet',
      name: 'NEET (UG)',
      category: 'Medical Entrance',
      subjects: 'Physics • Chemistry • Botany • Zoology',
      format: '720 Marks • 200 Minutes • Vector OMR Available',
      badge: 'NTA BLUEPRINT',
    },
    {
      id: 'jee-main',
      name: 'JEE Main',
      category: 'Engineering Entrance',
      subjects: 'Physics • Chemistry • Mathematics',
      format: '300 Marks • 180 Minutes • CBT Simulation',
      badge: 'OFFICIAL SCHEME',
    },
    {
      id: 'jee-advanced',
      name: 'JEE Advanced',
      category: 'IIT Entrance',
      subjects: 'Physics • Chemistry • Mathematics',
      format: 'Numerical • Multi-Select Partial • 180 Minutes',
      badge: 'ADVANCED CBT',
    },
    {
      id: 'gate',
      name: 'GATE',
      category: 'Engineering PG',
      subjects: 'Core Discipline & General Aptitude',
      format: '100 Marks • 180 Minutes • Virtual Calculator Ready',
      badge: 'GATE PATTERN',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#111214] text-[#F5F5F5] selection:bg-[#C6A052]/20 selection:text-white overflow-x-hidden">
      {/* Background OMR Sheet Canvas Watermark */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1050px] z-0 opacity-20 select-none overflow-hidden">
        <NeetOmrBackground />
      </div>

      {/* Top Ambient Specular Light */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[500px] rounded-full blur-3xl z-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 255, 255, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Main Content Container */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-24 space-y-24">
        {/* ================================================================= */}
        {/* 1. HERO HEADER AREA                                               */}
        {/* ================================================================= */}
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Capsule Pill Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/[0.05] px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-[#C6A052] backdrop-blur-md shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6A052] animate-pulse" />
            METHODOLOGY & SYSTEM ARCHITECTURE
          </div>

          {/* Editorial Headline */}
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.12]"
            style={{ fontFamily: "'Benton Sans', 'Benton', sans-serif" }}
          >
            From preparation to progress.{' '}
            <span className="relative inline-block text-[#C6A052]">
              The disciplined path.
              <svg
                viewBox="0 0 100 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-2 left-0 w-full h-[6px] text-[#C6A052] pointer-events-none"
              >
                <path
                  d="M2 7C28 3.5 68 3.5 98 6.5C76 8.5 32 8.5 2 7Z"
                  fill="currentColor"
                />
              </svg>
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-lg text-[#B8B8BC] leading-relaxed max-w-2xl mx-auto font-normal">
            A distraction-free, exam-accurate system built to measure real readiness, diagnose recurring errors, and eliminate guesswork for serious competitive examination candidates.
          </p>

          {/* Key Value Proposition Badges */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#E5E5E5] font-medium">
              <CheckCircle2 className="h-3.5 w-3.5 text-[#C6A052]" />
              Official Blueprints Only
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#E5E5E5] font-medium">
              <Clock className="h-3.5 w-3.5 text-[#C6A052]" />
              Server-Synchronized Clock
            </div>
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 text-xs text-[#E5E5E5] font-medium">
              <FileText className="h-3.5 w-3.5 text-[#C6A052]" />
              Authentic Vector OMR Bubble Capture
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 2. THE FIVE CORE METHODOLOGY STAGES (3D MATTE-BLACK GLASS SLABS) */}
        {/* ================================================================= */}
        <div className="space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              The Five Stages of Examination Mastery
            </h2>
            <p className="text-sm text-[#A1A1AA] max-w-xl mx-auto">
              Every phase is synchronized to recreate the exact cognitive and physical demands of actual competitive examinations.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:gap-8">
            {methodologyStages.map((stage) => {
              const IconComponent = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-9 lg:p-10 transition-all overflow-hidden select-none"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(38, 42, 48, 0.72) 0%, rgba(20, 23, 27, 0.84) 50%, rgba(14, 16, 19, 0.94) 100%)',
                    backdropFilter: 'blur(24px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(24px) saturate(110%)',
                    border: '1px solid rgba(255, 255, 255, 0.16)',
                    boxShadow: [
                      '0 18px 40px -10px rgba(0, 0, 0, 0.45)',
                      'inset 0 1.5px 2px rgba(255, 255, 255, 0.50)',
                      'inset 1px 0 2px rgba(255, 255, 255, 0.25)',
                      'inset 0 -2px 4px rgba(0, 0, 0, 0.40)',
                    ].join(', '),
                  }}
                >
                  {/* Subtle Bevel Highlight Rim */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.10)',
                      boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.05)',
                    }}
                  />

                  {/* Corner Glow Overlay */}
                  <div className="pointer-events-none absolute -top-12 -left-12 h-36 w-36 rounded-full bg-white/[0.03] blur-2xl z-0" />
                  <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-black/60 blur-2xl z-0" />

                  <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
                    {/* Left Step Header */}
                    <div className="lg:col-span-5 space-y-4">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-3xl sm:text-4xl font-extrabold text-[#C6A052]">
                          {stage.step}
                        </span>
                        <div className="h-4 w-px bg-white/20" />
                        <span className="text-[11px] font-bold tracking-[0.18em] text-[#A1A1AA] uppercase">
                          {stage.tag}
                        </span>
                      </div>

                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                        {stage.title}
                      </h3>

                      <p className="text-sm text-[#B8B8BC] leading-relaxed">
                        {stage.description}
                      </p>
                    </div>

                    {/* Right Features Breakdown */}
                    <div className="lg:col-span-7 bg-white/[0.02] border border-white/10 rounded-2xl p-5 sm:p-6 space-y-3">
                      <div className="flex items-center gap-2 pb-2 border-b border-white/10 text-xs font-bold uppercase tracking-wider text-[#C6A052]">
                        <IconComponent className="h-4 w-4" />
                        <span>Execution Protocol</span>
                      </div>

                      <div className="space-y-2.5">
                        {stage.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-3">
                            <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[#C6A052] shrink-0" />
                            <span className="text-xs sm:text-sm text-[#E2E2E2] leading-relaxed font-normal">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 3. TECHNICAL RIGOR COMPARISON MATRIX                              */}
        {/* ================================================================= */}
        <div
          className="relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-10 transition-all overflow-hidden"
          style={{
            background:
              'linear-gradient(145deg, rgba(34, 38, 44, 0.72) 0%, rgba(18, 20, 24, 0.86) 60%, rgba(12, 14, 16, 0.95) 100%)',
            backdropFilter: 'blur(24px) saturate(110%)',
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.50)',
          }}
        >
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-8">
            <span className="text-[11px] font-bold tracking-[0.16em] uppercase text-[#C6A052]">
              THE ARCHITECTURAL DIFFERENCE
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Casual Practice vs. Simulated Examination Rigor
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Why solving uncurated PDFs fails under real exam constraints, and how MERITWISE bridges the preparation gap.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-white/10 text-[#A1A1AA] font-bold tracking-wider uppercase text-[11px]">
                  <th className="py-3 px-4 w-1/4">Evaluation Dimension</th>
                  <th className="py-3 px-4 w-3/8 text-white/50">Casual Question Solving</th>
                  <th className="py-3 px-4 w-3/8 text-[#C6A052]">MERITWISE Platform</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {comparisonItems.map((item, idx) => (
                  <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                    <td className="py-4 px-4 font-semibold text-white">{item.aspect}</td>
                    <td className="py-4 px-4 text-[#8E8E93] leading-relaxed">{item.casual}</td>
                    <td className="py-4 px-4 text-[#F5F5F5] font-medium leading-relaxed bg-white/[0.01]">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#C6A052] shrink-0" />
                        {item.meritwise}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* ================================================================= */}
        {/* 4. FOUR CORE EXAMINATION TRACKS GRID                              */}
        {/* ================================================================= */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Official Examination Curricula
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA]">
              Four targeted disciplines engineered to official specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {targetExams.map((exam) => (
              <div
                key={exam.id}
                className="relative rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all"
                style={{
                  background: 'rgba(28, 31, 36, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  boxShadow: '0 12px 24px -6px rgba(0, 0, 0, 0.40)',
                }}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold tracking-wider uppercase text-[#C6A052] bg-[#C6A052]/10 border border-[#C6A052]/20 px-2 py-0.5 rounded-full">
                      {exam.badge}
                    </span>
                    <span className="text-[11px] text-[#A1A1AA] uppercase tracking-wider">
                      {exam.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-white tracking-tight">{exam.name}</h3>
                  <p className="text-xs text-[#B8B8BC] leading-relaxed">{exam.subjects}</p>
                </div>

                <div className="pt-3 border-t border-white/10 space-y-3">
                  <span className="block text-[11px] text-[#A1A1AA] font-mono">{exam.format}</span>
                  <Link
                    href={`/exams/${exam.id}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F5F5F5] hover:text-[#C6A052] transition-colors uppercase tracking-wider"
                  >
                    <span>View Blueprint</span>
                    <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ================================================================= */}
        {/* 5. CALL TO ACTION BANNER                                          */}
        {/* ================================================================= */}
        <div
          className="relative rounded-[32px] p-8 sm:p-12 text-center space-y-6 overflow-hidden"
          style={{
            background:
              'linear-gradient(135deg, rgba(38, 42, 48, 0.85) 0%, rgba(18, 20, 24, 0.95) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.20)',
            boxShadow: '0 24px 50px -10px rgba(0, 0, 0, 0.60)',
          }}
        >
          {/* Subtle Ambient Glow */}
          <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-48 w-96 rounded-full bg-[#C6A052]/10 blur-3xl z-0" />

          <div className="relative z-10 max-w-xl mx-auto space-y-3">
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white">
              Ready to measure genuine examination readiness?
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B8BC] leading-relaxed">
              Create your candidate profile today. Claim your complimentary initial question paper and attempt your first timed examination.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/signup"
              className="rounded-full bg-white text-[#111214] hover:bg-[#F5F5F5] px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Start Practice Now
            </Link>

            <Link
              href="/#examinations"
              className="rounded-full border border-white/20 bg-white/[0.05] hover:bg-white/[0.10] text-white px-7 py-3.5 text-xs font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Examinations
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
