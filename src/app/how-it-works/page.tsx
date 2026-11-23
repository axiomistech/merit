'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  Layers,
  ShieldCheck,
  Target,
  FileCheck,
  Clock,
  BarChart3,
  TrendingUp,
} from 'lucide-react';
import { NeetOmrBackground } from '@/components/home/NeetOmrBackground';

export default function HowItWorksPage() {
  // Interactive FAQ Accordion State (open question index, default first open)
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq((prev) => (prev === index ? null : index));
  };

  // 02 — The Journey: 6 Sequential Steps
  const journeySteps = [
    {
      step: '01',
      tag: 'GET STARTED',
      title: 'Your preparation starts here.',
      description:
        'Create your MeritWise account to access your personal dashboard. Everything you need to begin your practice journey starts in one place.',
      ctaText: 'Create your account →',
      ctaHref: '/register',
      icon: Target,
      highlight: 'Instant Student ID • Complimentary Initial Paper',
    },
    {
      step: '02',
      tag: 'CHOOSE YOUR PAPER',
      title: 'Practice what matters to you.',
      description:
        'Explore available examinations and question papers. Find the paper you want to attempt and review its details before proceeding.\n\nNo unnecessary subscriptions. Choose the paper that fits your preparation.',
      ctaText: 'Explore Available Papers →',
      ctaHref: '/exams',
      icon: FileCheck,
      highlight: 'NEET • JEE Main • JEE Advanced • GATE',
    },
    {
      step: '03',
      tag: 'UNLOCK YOUR PRACTICE',
      title: 'One paper. One focused attempt.',
      description:
        'Unlock the question paper or test you choose through its individual access fee. Once unlocked, your practice is ready to begin.\n\nSimple, transparent, and focused on what you came here to do.',
      ctaText: null,
      ctaHref: null,
      icon: ShieldCheck,
      highlight: 'Individual Paper Fee • No Subscriptions • Zero Lock-In',
    },
    {
      step: '04',
      tag: 'TAKE THE TEST',
      title: 'Put your preparation to the test.',
      description:
        'Attempt the questions at your own pace or under timed conditions, depending on the test format. Focus, manage your time, and approach every question with intent.',
      ctaText: null,
      ctaHref: null,
      icon: Clock,
      highlight: 'Server-Synchronized Clock • CBT or Vector OMR',
    },
    {
      step: '05',
      tag: 'EVALUATE YOUR ATTEMPT',
      title: 'Know where you stand.',
      description:
        'Complete your test and review your performance. Use your results to recognise what you understand, identify where you need more practice, and reflect on your preparation.',
      ctaText: null,
      ctaHref: null,
      icon: BarChart3,
      highlight: 'Negative Marking Rules • Inaccuracy Review',
    },
    {
      step: '06',
      tag: 'KEEP MOVING FORWARD',
      title: 'Every attempt is a step ahead.',
      description:
        'Preparation is not defined by one test. Learn from your mistakes, revisit difficult questions, strengthen your understanding, and return better prepared for your next attempt.',
      ctaText: null,
      ctaHref: null,
      icon: TrendingUp,
      highlight: 'Personal Bookmarks • Systematic Score Progression',
    },
  ];

  // 03 — Why this approach: 3 Pillars
  const pillars = [
    {
      title: 'Individual paper access.',
      description:
        'Unlock only the specific question papers you need for your target examination. No recurring subscriptions, no forced bundles.',
      icon: ShieldCheck,
    },
    {
      title: 'Focused preparation.',
      description:
        'Zero advertising banners, zero distractions, and no gamified gimmicks. A disciplined environment engineered for deep cognitive focus.',
      icon: Target,
    },
    {
      title: 'No unnecessary complexity.',
      description:
        'Straightforward execution: choose your paper, test yourself under official exam constraints, and receive clear inaccuracy diagnostics.',
      icon: Layers,
    },
  ];

  // 04 — Frequently Asked Questions
  const faqs = [
    {
      question: 'Do I need an account to start practising?',
      answer:
        'Yes. Create an account to access your personal MeritWise dashboard and begin your practice journey.',
    },
    {
      question: 'Do I have to purchase a subscription?',
      answer:
        'MeritWise is designed around individual paper/test access. You can choose the paper you want and unlock it individually, according to its listed fee.',
    },
    {
      question: 'Can I attempt the same paper more than once?',
      answer:
        'Repeat-attempt availability depends on the access rules for that paper.',
    },
    {
      question: 'Are the question papers available for free?',
      answer:
        'Access depends on the individual paper and its listed pricing.',
    },
    {
      question: 'Which examinations are available?',
      answer:
        'MeritWise offers papers for examinations listed on the platform. Availability may change as new papers are added.',
    },
    {
      question: 'What happens after I complete a test?',
      answer:
        'You can submit your attempt and review your performance based on the evaluation and results made available for that test.',
    },
  ];

  // Journey Summary Breadcrumb Strip
  const journeyFlow = [
    { label: 'Explore', sub: 'Target Exams' },
    { label: 'Account', sub: 'Student Profile' },
    { label: 'Paper', sub: 'Curated Papers' },
    { label: 'Unlock', sub: 'Single Access' },
    { label: 'Attempt', sub: 'Timed Test' },
    { label: 'Evaluate', sub: 'Diagnostics' },
  ];

  return (
    <div className="relative min-h-screen text-[#141A11] overflow-x-clip bg-[#F8FAF6]">
      {/* ===================================================================== */}
      {/* ATMOSPHERIC BACKGROUND: MATTE FORGED WHITE + GLACIER BLUE FOG         */}
      {/* ===================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 130% 95% at 50% 15%, #F8FAFA 0%, #F5F7F5 55%, #EDF3F5 80%, #DCECF1 100%)',
        }}
      >
        {/* Soft Glacier Blue Atmospheric Diffused Fog Glows */}
        <div
          className="pointer-events-none absolute -top-32 right-[-5%] w-[850px] h-[650px] rounded-full blur-[140px] opacity-35"
          style={{
            background: 'radial-gradient(circle, #DCECF1 0%, #B8D5DF 50%, transparent 80%)',
          }}
        />
        <div
          className="pointer-events-none absolute top-[35%] left-[-10%] w-[750px] h-[550px] rounded-full blur-[150px] opacity-30"
          style={{
            background: 'radial-gradient(circle, #DCECF1 0%, #B8D5DF 45%, transparent 75%)',
          }}
        />
        <div
          className="pointer-events-none absolute bottom-[10%] right-[10%] w-[650px] h-[500px] rounded-full blur-[140px] opacity-25"
          style={{
            background: 'radial-gradient(circle, #DCECF1 0%, #B8D5DF 50%, transparent 75%)',
          }}
        />

        {/* Subtle Tactile Micro-Grain Texture Overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply z-[1]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Authentic Vector OMR Sheet Background Canvas Watermark */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.08] select-none overflow-hidden">
          <NeetOmrBackground />
        </div>
      </div>

      {/* ===================================================================== */}
      {/* MAIN CONTENT WRAPPER                                                  */}
      {/* ===================================================================== */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 lg:pt-40 pb-24 sm:pb-32 space-y-20 sm:space-y-28 lg:space-y-32">
        {/* =================================================================== */}
        {/* 01 — HERO SECTION                                                   */}
        {/* =================================================================== */}
        <section className="text-center max-w-3xl mx-auto space-y-6 sm:space-y-8">
          {/* Header Capsule Pill with Restrained Gold Dot */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(20,26,17,0.14)] bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.18em] text-[#141A11] backdrop-blur-md shadow-xs">
            <span className="h-1.5 w-1.5 rounded-full bg-[#C6A052]" />
            HOW MERITWISE WORKS
          </div>

          {/* Oversized Editorial Master Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[58px] font-extrabold tracking-[-0.035em] text-[#141A11] leading-[1.10]">
            Preparation, without the guesswork.
          </h1>

          {/* Editorial Lead Paragraph */}
          <p className="text-base sm:text-lg lg:text-xl text-[#465047] leading-relaxed font-normal max-w-2xl mx-auto">
            A better way to prepare begins with knowing what to practise. MeritWise gives you access to structured examination papers and tests, so you can practise with purpose, assess your preparation, and make every attempt count.
          </p>

          {/* 02 — The Journey Flow Strip: Explore → Account → Paper → Unlock → Attempt → Evaluate */}
          <div className="pt-4 sm:pt-6">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 sm:gap-3 rounded-3xl border border-[rgba(20,26,17,0.12)] bg-white/60 p-2 sm:p-2.5 backdrop-blur-md shadow-xs max-w-full">
              {journeyFlow.map((item, idx) => (
                <React.Fragment key={item.label}>
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-white/70 border border-white/80 shadow-xs">
                    <span className="font-mono text-[10px] font-extrabold text-[#C6A052]">
                      0{idx + 1}
                    </span>
                    <span className="text-xs font-bold text-[#141A11] tracking-tight">
                      {item.label}
                    </span>
                  </div>
                  {idx < journeyFlow.length - 1 && (
                    <span className="text-[#8E9B85] text-xs font-bold select-none px-0.5">
                      →
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 02 — THE JOURNEY (6 TACTILE SAGE GLASS BENTO PANELS)                 */}
        {/* =================================================================== */}
        <section className="space-y-8 sm:space-y-10">
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#465047]">
              STAGE-BY-STAGE EXECUTION
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#141A11]">
              The Six Steps of Purposeful Practice
            </h2>
            <p className="text-xs sm:text-sm text-[#465047]">
              From your initial diagnostic paper through comprehensive inaccuracy review.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 items-stretch">
            {journeySteps.map((stage) => {
              const IconComponent = stage.icon;
              return (
                <div
                  key={stage.step}
                  className="group relative flex flex-col justify-between rounded-[32px] p-7 sm:p-8 transition-all duration-300 hover:translate-y-[-4px] overflow-hidden select-none"
                  style={{
                    background:
                      'linear-gradient(155deg, rgba(166, 186, 148, 0.95) 0%, #9CAF88 50%, rgba(142, 162, 122, 0.95) 100%)',
                    backdropFilter: 'blur(20px) saturate(110%)',
                    WebkitBackdropFilter: 'blur(20px) saturate(110%)',
                    border: '1px solid rgba(20, 26, 17, 0.14)',
                    boxShadow:
                      '0 12px 28px rgba(20, 26, 17, 0.10), inset 0 1px 1px 0 rgba(255, 255, 255, 0.50)',
                  }}
                >
                  {/* Subtle translucent internal highlight rim */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                    style={{
                      border: '1px solid rgba(255, 255, 255, 0.22)',
                    }}
                  />

                  {/* Soft atmospheric internal diffusion mist */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
                    style={{
                      background:
                        'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255, 255, 255, 0.24) 0%, transparent 80%)',
                    }}
                  />

                  {/* Card Content Area */}
                  <div className="relative z-20 space-y-4 sm:space-y-5">
                    {/* Top Row: Step Tag + Monospace Index + Icon */}
                    <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,26,17,0.14)]">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs sm:text-sm font-extrabold text-[#141A11] bg-white/30 border border-white/50 px-2.5 py-0.5 rounded-full">
                          {stage.step}
                        </span>
                        <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-[#141A11]/75 uppercase">
                          {stage.tag}
                        </span>
                      </div>
                      <div className="h-8 w-8 rounded-full bg-white/20 border border-white/35 flex items-center justify-center text-[#141A11] shrink-0">
                        <IconComponent className="h-4 w-4" />
                      </div>
                    </div>

                    {/* Step Headline */}
                    <h3 className="text-xl sm:text-2xl font-extrabold text-[#141A11] tracking-tight leading-snug">
                      {stage.title}
                    </h3>

                    {/* Step Body */}
                    <p className="text-xs sm:text-sm text-[#384235] leading-relaxed whitespace-pre-line font-medium">
                      {stage.description}
                    </p>
                  </div>

                  {/* Card Footer: Action Link or Highlight Meta */}
                  <div className="relative z-20 pt-6 mt-6 border-t border-[rgba(20,26,17,0.14)]">
                    {stage.ctaHref && stage.ctaText ? (
                      <Link
                        href={stage.ctaHref}
                        className="inline-flex items-center gap-2 rounded-full bg-[#141A11] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider hover:bg-[#252E22] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
                      >
                        <span>{stage.ctaText}</span>
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    ) : (
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-[#141A11]/80">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#C6A052]" />
                        <span>{stage.highlight}</span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 03 — WHY THIS APPROACH ("A BETTER WAY TO PREPARE")                  */}
        {/* =================================================================== */}
        <section
          className="relative rounded-[36px] sm:rounded-[44px] p-8 sm:p-12 lg:p-16 overflow-hidden select-none"
          style={{
            background:
              'linear-gradient(150deg, rgba(166, 186, 148, 0.96) 0%, #9CAF88 50%, rgba(136, 156, 116, 0.96) 100%)',
            backdropFilter: 'blur(24px) saturate(110%)',
            border: '1px solid rgba(20, 26, 17, 0.16)',
            boxShadow:
              '0 20px 48px -10px rgba(20, 26, 17, 0.16), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)',
          }}
        >
          {/* Internal Specular Bevel Border */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          />

          {/* Soft Diffused Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-32 right-[-10%] w-[500px] h-[500px] rounded-full bg-white/20 blur-3xl z-0"
          />

          <div className="relative z-20 max-w-4xl mx-auto space-y-10 sm:space-y-12">
            {/* Header Area */}
            <div className="text-center space-y-3">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#141A11]/70">
                A BETTER WAY TO PREPARE
              </span>
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#141A11] leading-tight">
                Less uncertainty. More purposeful practice.
              </h2>
              <p className="text-sm sm:text-base text-[#384235] max-w-2xl mx-auto font-medium leading-relaxed">
                You don&apos;t need to do everything at once. Start with a paper. Understand your performance. Work on what needs improvement. Repeat.
              </p>
            </div>

            {/* 3 Pillars Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {pillars.map((pillar) => {
                const IconComponent = pillar.icon;
                return (
                  <div
                    key={pillar.title}
                    className="rounded-3xl bg-white/30 border border-white/50 p-6 sm:p-7 space-y-3 shadow-xs backdrop-blur-sm"
                  >
                    <div className="h-9 w-9 rounded-2xl bg-white/40 border border-white/60 flex items-center justify-center text-[#141A11]">
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <h3 className="text-lg font-bold text-[#141A11] tracking-tight">
                      {pillar.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#384235] leading-relaxed font-medium">
                      {pillar.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Bottom Callout & Action Banner */}
            <div className="pt-4 border-t border-[rgba(20,26,17,0.14)] flex flex-col sm:flex-row items-center justify-between gap-6">
              <div className="text-center sm:text-left space-y-1">
                <span className="text-xs font-mono font-bold tracking-wider uppercase text-[#141A11]/60">
                  PHILOSOPHY
                </span>
                <p className="text-lg sm:text-xl font-extrabold text-[#141A11] tracking-tight">
                  Your next attempt can be better than your last.
                </p>
              </div>

              <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2.5 rounded-full bg-[#141A11] text-white px-8 py-3.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:bg-[#252E22] transition-all hover:scale-[1.02] active:scale-[0.98] shrink-0"
              >
                <span>START PRACTICE</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* =================================================================== */}
        {/* 04 — FREQUENTLY ASKED QUESTIONS                                     */}
        {/* =================================================================== */}
        <section className="space-y-8 sm:space-y-10 max-w-4xl mx-auto">
          <div className="text-center space-y-2">
            <span className="text-xs font-bold tracking-[0.2em] uppercase text-[#465047]">
              COMMON INQUIRIES
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#141A11]">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#465047]">
              Clear answers regarding account access, individual test unlock, and scoring.
            </p>
          </div>

          {/* Accordion List */}
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={faq.question}
                  className="rounded-2xl sm:rounded-3xl border border-[rgba(20,26,17,0.12)] bg-white/80 backdrop-blur-md shadow-xs transition-all overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between p-5 sm:p-6 text-left hover:bg-white/90 transition-colors"
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      <span className="font-mono text-xs font-bold text-[#C6A052]">
                        0{idx + 1}
                      </span>
                      <span className="text-sm sm:text-base font-bold text-[#141A11] tracking-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div
                      className={`h-7 w-7 rounded-full bg-[#141A11]/5 flex items-center justify-center text-[#141A11] shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 bg-[#141A11] text-white' : ''
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-1 border-t border-[rgba(20,26,17,0.06)] text-xs sm:text-sm text-[#465047] leading-relaxed">
                      <p>{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =================================================================== */}
        {/* 05 — FINAL CALL TO ACTION                                           */}
        {/* =================================================================== */}
        <section
          className="relative rounded-[36px] sm:rounded-[44px] p-8 sm:p-14 lg:p-16 text-center space-y-6 sm:space-y-8 overflow-hidden select-none"
          style={{
            background:
              'linear-gradient(155deg, rgba(166, 186, 148, 0.95) 0%, #9CAF88 50%, rgba(136, 156, 116, 0.95) 100%)',
            backdropFilter: 'blur(20px) saturate(110%)',
            border: '1px solid rgba(20, 26, 17, 0.16)',
            boxShadow:
              '0 24px 52px -12px rgba(20, 26, 17, 0.18), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)',
          }}
        >
          {/* Internal Bevel Rim */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.25)',
            }}
          />

          {/* Ambient Specular Center Glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
            style={{
              background:
                'radial-gradient(circle at 50% 30%, rgba(255, 255, 255, 0.30) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-20 max-w-2xl mx-auto space-y-4">
            {/* Brand Lockup with Restrained Gold Dot */}
            <div className="inline-flex items-center gap-2 rounded-full border border-[rgba(20,26,17,0.18)] bg-white/40 px-4 py-1.5 text-xs font-extrabold uppercase tracking-[0.2em] text-[#141A11] backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6A052]" />
              MERITWISE
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-extrabold tracking-[-0.03em] text-[#141A11] leading-tight">
              Your next attempt can be better than your last.
            </h2>

            <p className="text-xs sm:text-sm lg:text-base text-[#384235] font-medium leading-relaxed max-w-xl mx-auto">
              Practice with purpose. Progress with merit. Access structured examination papers, test yourself under official conditions, and eliminate recurring weaknesses.
            </p>
          </div>

          {/* Primary & Secondary Action Buttons */}
          <div className="relative z-20 flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141A11] text-white px-8 py-3.5 sm:px-9 sm:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:bg-[#252E22] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>START PRACTICE</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/#examinations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-[rgba(20,26,17,0.22)] bg-white/40 hover:bg-white/60 text-[#141A11] px-7 py-3.5 sm:px-8 sm:py-4 text-xs sm:text-sm font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Examinations</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
