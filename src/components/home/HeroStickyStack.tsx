'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HeroPreparationCard } from './HeroPreparationCard';
import { FlippableMeritwiseCard } from './FlippableMeritwiseCard';
import { ExaminationCard3D, ExaminationCardData } from './ExaminationCard3D';
import { NeetOmrBackground } from './NeetOmrBackground';
import { TutorialVideoConfig } from '@/types/admin';

export interface HeroStickyStackProps {
  tutorialVideoConfig?: TutorialVideoConfig | null;
  primaryExams: ExaminationCardData[];
  onStartPractice: (e: React.MouseEvent) => void;
}

export function HeroStickyStack({
  tutorialVideoConfig,
  primaryExams,
  onStartPractice,
}: HeroStickyStackProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Track scroll progress as Section 2 enters the viewport from the bottom (0) and reaches the top (1)
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'start start'],
  });

  // 1. Sticky Base Layer (Section 1): Scale down (1 -> 0.94) and dim brightness (1 -> 0.65)
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const heroBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.65]);
  const heroFilter = useTransform(heroBrightness, (b) => `brightness(${b})`);

  // 2. 3D Tilt-In & Stacking (Section 2): rotateX(14deg -> 0deg), scale(0.94 -> 1), translateY(40px -> 0px)
  const section2RotateX = useTransform(scrollYProgress, [0, 1], [14, 0]);
  const section2Scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const section2Y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  // 3. Upward shadow over Hero during stacking (fades to 0 when settled, never bleeds to Section 3)
  const upwardShadowOpacity = useTransform(scrollYProgress, [0, 0.85, 1], [1, 0.25, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ==================================================================== */}
      {/* 1. STICKY BASE LAYER (SECTION 1 — HERO)                              */}
      {/* Pinned in place at top: 0, z-index: 1 while Section 2 rises over it  */}
      {/* ==================================================================== */}
      <motion.section
        style={{
          scale: heroScale,
          filter: heroFilter,
          transformOrigin: 'center center',
          willChange: 'transform, filter',
        }}
        className="sticky top-0 z-[1] w-full min-h-screen text-[#141A11] flex flex-col justify-center overflow-hidden"
      >
        {/* Matte Forged White (#F5F7F5) + Soft Glacier Blue (#DCECF1) Background */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 select-none overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 130% 95% at 50% 15%, #F8FAFA 0%, #F5F7F5 55%, #EDF3F5 80%, #DCECF1 100%)',
          }}
        >
          {/* Atmospheric Soft Glacier Blue Diffused Atmospheric Glows (subtle 25% atmospheric undertone) */}
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

          {/* Subtle tactile micro-grain texture overlay */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.025] mix-blend-multiply z-[1]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />
          <NeetOmrBackground />
        </div>

        {/* Hero Cards Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-20 sm:pt-24 lg:pt-26 pb-6 sm:pb-8 lg:pb-10">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
            {/* Card 1 — Examination Preparation */}
            <HeroPreparationCard onStartPractice={onStartPractice} />

            {/* Card 2 — Double-Sided 3D Card: Heading & Native Video Player / Journey Guide */}
            <FlippableMeritwiseCard
              tutorialVideo={tutorialVideoConfig ?? undefined}
              onStartPractice={onStartPractice}
            />
          </div>

          {/* Subtle Minimal Scroll Cue */}
          <div className="hidden sm:flex items-center justify-center pt-4 sm:pt-5 lg:pt-6 pointer-events-none select-none">
            <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.22em] text-[#465047]/70">
              Scroll to explore ↓
            </span>
          </div>
        </div>
      </motion.section>

      {/* ==================================================================== */}
      {/* 2. 3D PERSPECTIVE WRAPPER & STACKED CARD (SECTION 2)                 */}
      {/* perspective: 1400px and transform-style: preserve-3d                 */}
      {/* ==================================================================== */}
      <div
        ref={section2Ref}
        className="relative z-10 w-full"
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.section
          id="examinations"
          style={{
            rotateX: section2RotateX,
            scale: section2Scale,
            y: section2Y,
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            willChange: 'transform',
          }}
          className="relative w-full bg-[#F8FAF6] rounded-t-[32px] pt-16 sm:pt-20 pb-20 sm:pb-24 border-0"
        >
          {/* Top-rim upward shadow casting over the hero during entrance; fades away completely when settled and NEVER bleeds below Section 2 */}
          <motion.div
            aria-hidden="true"
            style={{ opacity: upwardShadowOpacity }}
            className="pointer-events-none absolute -top-8 inset-x-0 h-16 rounded-t-[32px] shadow-[0_-24px_60px_rgba(30,45,55,0.08)] z-0"
          />

          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121316]">
                Focused preparation for serious candidates.
              </h2>
              <p className="text-sm text-[#52525B]">
                Four core examination categories. Each built around its official format, marking rules, and duration.
              </p>
            </div>

            {/* 4 Interactive 3D Glassmorphism Cards */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
              {primaryExams.map((exam) => (
                <div key={exam.id} className="h-full">
                  <ExaminationCard3D
                    exam={exam}
                    onStartPractice={onStartPractice}
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}

export default HeroStickyStack;
