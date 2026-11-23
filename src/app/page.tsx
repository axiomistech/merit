'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { TutorialVideoConfig } from '@/types/admin';
import { HeroPreparationCard } from '@/components/home/HeroPreparationCard';
import { FlippableMeritwiseCard } from '@/components/home/FlippableMeritwiseCard';
import { ExaminationCard3D, ExaminationCardData } from '@/components/home/ExaminationCard3D';
import { StackedSectionTwo } from '@/components/home/StackedSectionTwo';
import { NeetOmrBackground } from '@/components/home/NeetOmrBackground';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export default function HomePage() {
  const router = useRouter();

  // Tutorial Video configuration (admin-managed via CMS)
  const [tutorialVideoConfig, setTutorialVideoConfig] = useState<TutorialVideoConfig | undefined>(undefined);

  useEffect(() => {
    fetch('/api/cms/tutorial-video')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.config) {
          setTutorialVideoConfig(res.config);
        }
      })
      .catch(() => {});
  }, []);

  // Primary Gateway: Direct to dashboard if logged in, or login/register if not
  const handleStartPractice = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const session =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login?redirect=/dashboard');
      }
    }
  };

  // 4 Primary Examination Categories (Ultra-Minimal)
  const primaryExams: ExaminationCardData[] = [
    {
      id: 'neet',
      slug: 'neet',
      name: 'NEET',
      category: 'Medical Entrance',
      duration: '200 Minutes',
      marks: '720 Marks',
    },
    {
      id: 'jee-main',
      slug: 'jee-main',
      name: 'JEE Main',
      category: 'Engineering Entrance',
      duration: '180 Minutes',
      marks: '300 Marks',
    },
    {
      id: 'jee-advanced',
      slug: 'jee-advanced',
      name: 'JEE Advanced',
      category: 'Engineering Entrance',
      duration: '180 Minutes',
      marks: '300 / 360 Marks',
    },
    {
      id: 'gate',
      slug: 'gate',
      name: 'GATE',
      category: 'Engineering PG',
      duration: '180 Minutes',
      marks: '100 Marks',
    },
  ];

  // Clean atmospheric off-white canvas
  const homepageAtmosphericStyle: React.CSSProperties = {
    backgroundColor: '#F8FAF6',
  };

  return (
    <div
      className="relative min-h-screen text-[#151A15] overflow-x-hidden bg-[#F8FAF6]"
      style={homepageAtmosphericStyle}
    >
      {/* ==================================================================== */}
      {/* SHARED CINEMATIC HERO-TO-SECTION-2 BACKGROUND SURFACE               */}
      {/* Continuous matte-black OMR to neutral charcoal to #F8FAF6 canvas     */}
      {/* ==================================================================== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[700px] sm:h-[730px] lg:h-[750px] z-0 select-none overflow-hidden"
        style={{
          background:
            'linear-gradient(to bottom, #111214 0%, #111214 42%, #151619 51%, #1C1E23 60%, #292C33 68%, #40444E 75%, #646974 82%, #959AA3 87.5%, #C4C8C2 92.5%, #E3E6E0 96%, #F2F5F0 98.5%, #F8FAF6 100%)',
        }}
      >
        {/* Straight 2D Grayscale NEET OMR Answer Sheet Background Canvas */}
        <NeetOmrBackground />
      </div>

      {/* ==================================================================== */}
      {/* 1. HERO SECTION — CINEMATIC MATTE-BLACK GLASSMORPHISM HERO           */}
      {/* ==================================================================== */}
      <section className="relative z-10 text-[#F5F5F5] pt-24 sm:pt-28 pb-6 sm:pb-8">
        {/* Hero Cards Container */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
            {/* Card 1 — Examination Preparation */}
            <HeroPreparationCard onStartPractice={handleStartPractice} />

            {/* Card 2 — Double-Sided 3D Card: Heading & Native Video Player / Journey Guide */}
            <FlippableMeritwiseCard
              tutorialVideo={tutorialVideoConfig}
              onStartPractice={handleStartPractice}
            />
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. STRICTLY FOUR EXAMINATION CATEGORIES (3D TILT-IN & STACKING PANEL) */}
      {/* ==================================================================== */}
      <StackedSectionTwo
        primaryExams={primaryExams}
        onStartPractice={handleStartPractice}
      />

      {/* ==================================================================== */}
      {/* 3. HOW IT WORKS (FOUR SIMPLE STEPS) — 3D MATTE SAGE GLASS SLAB       */}
      {/* ==================================================================== */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-[32px] px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-7 lg:pb-8 flex flex-col gap-8 sm:gap-10 overflow-hidden select-none transition-all"
          style={{
            // Layered Translucent Sage Gradients with subtle frost daylight highlight
            background:
              'linear-gradient(140deg, rgba(234, 241, 245, 0.20) 0%, rgba(199, 211, 189, 0.82) 18%, rgba(156, 175, 136, 0.74) 50%, rgba(117, 137, 106, 0.68) 100%)',
            backdropFilter: 'blur(24px) saturate(108%)',
            WebkitBackdropFilter: 'blur(24px) saturate(108%)',
            border: '1px solid rgba(234, 241, 245, 0.45)',
            // 3-5px Solid Glass Slab Edge Lighting & Inset Shading with faint glacial bevel reflections
            boxShadow:
              '0 24px 50px -12px rgba(28, 40, 22, 0.20), 0 10px 24px -8px rgba(28, 40, 22, 0.12), inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.65), inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.35), inset 0 -3px 6px 0 rgba(65, 82, 54, 0.40), inset -2px 0 5px 0 rgba(65, 82, 54, 0.25), inset 0 0 28px 0 rgba(199, 211, 189, 0.28)',
          }}
        >
          {/* Architectural 3-5px Thick Glass Edge Simulation Rim with faint glacial reflection */}
          <div
            className="pointer-events-none absolute inset-0 !m-0 rounded-[inherit] z-10"
            style={{
              border: '1px solid rgba(234, 241, 245, 0.30)',
              boxShadow: 'inset 0 0 0 1px rgba(201, 217, 226, 0.15)',
            }}
          />

          {/* Soft Cloudy Internal Diffusion Mist with gentle glacier undertone */}
          <div
            className="pointer-events-none absolute inset-0 !m-0 rounded-[inherit] z-0 overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 249, 252, 0.32) 0%, rgba(220, 231, 237, 0.12) 30%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
            }}
          />

          {/* Ambient Occlusion Corner Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#C7D3BD]/30 blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#75896A]/25 blur-3xl z-0" />

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-3 relative z-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151A15] tracking-tight">
              Four steps from preparation to progress.
            </h2>
            <p className="text-xs sm:text-sm text-[#455044] font-medium leading-relaxed max-w-4xl mx-auto md:whitespace-nowrap">
              A disciplined, distraction-free path to test your knowledge and eliminate recurring weaknesses.
            </p>
          </div>

          {/* 4 Process Steps */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-20">
            {[
              {
                step: '01',
                title: 'Create your account',
                description:
                  'Register with your verified email to receive your unique student identifier and claim your complimentary initial paper unlock.',
              },
              {
                step: '02',
                title: 'Choose your examination',
                description:
                  'Select your target discipline — NEET, JEE Main, JEE Advanced, or GATE. Access structured curricula and official blueprints.',
              },
              {
                step: '03',
                title: 'Unlock and attempt papers',
                description:
                  'Take authentic examination papers under real exam conditions with server-synchronized timing and instant OMR response capture.',
              },
              {
                step: '04',
                title: 'Track performance and improve',
                description:
                  'Review detailed solutions, identify question-level inaccuracies, download your vector A4 OMR sheet, and focus your next attempt.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="space-y-3 rounded-2xl border border-white/60 bg-white/45 p-6 shadow-xs backdrop-blur-sm transition-all hover:bg-white/70 hover:border-[#DCE7ED]/80 hover:scale-[1.01]"
              >
                <div className="font-mono text-2xl font-black text-[#151A15] bg-[#75896A]/20 inline-flex items-center justify-center px-3 py-0.5 rounded-xl border border-white/40 shadow-xs">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[#151A15]">{item.title}</h3>
                <p className="text-xs text-[#455044] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="pt-6 border-t border-[#75896A]/25 flex flex-wrap items-center justify-between gap-4 relative z-20">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#151A15]">
              <MeritwiseLogo variant="gold" size="xs" showWordmark={false} />
              <span>Every attempt counts. Measure your progress with MERITWISE.</span>
            </div>
            <button
              type="button"
              onClick={handleStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151A15] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Begin Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. BRAND STATEMENT / FINAL CTA BANNER                                */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-[32px] bg-[#121316] text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2.5">
              <MeritwiseLogo variant="white" size="xs" showWordmark={false} />
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C09A52]">
                PROGRESS WITH MERIT
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight !text-white leading-tight">
              Begin practicing with authentic examination papers.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Create your account to unlock your first full examination paper free. Track your progress across every attempt.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-white text-[#121316] px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] shrink-0 active:scale-[0.98]"
          >
            Start Practice ↗
          </button>
        </div>
      </section>
    </div>
  );
}
