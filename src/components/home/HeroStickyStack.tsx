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
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);

  // Responsive breakpoint tracking: Desktop (>= 1024px) retains 3D tilt & stacking;
  // Mobile (< 1024px) uses natural flow to prevent premature card overlap.
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    const media = window.matchMedia('(min-width: 1024px)');
    setIsDesktop(media.matches);

    const listener = (e: MediaQueryListEvent) => {
      setIsDesktop(e.matches);
    };
    media.addEventListener('change', listener);
    return () => media.removeEventListener('change', listener);
  }, []);

  // Track scroll progress as Section 2 enters the viewport from the bottom (0) and reaches the top (1)
  const { scrollYProgress } = useScroll({
    target: section2Ref,
    offset: ['start end', 'start start'],
  });

  // 1. Hero Cards Layer (Cards ONLY, NOT background): Scale down (1 -> 0.95) and dim brightness (1 -> 0.70)
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroBrightness = useTransform(scrollYProgress, [0, 1], [1, 0.70]);
  const heroFilter = useTransform(heroBrightness, (b) => `brightness(${b})`);

  // 2. 3D Tilt-In & Stacking (Section 2 on Desktop):
  // rotateX: 10deg -> 0deg, translateY: 40px -> 0px
  // Kept 100% full width (no scale reduction on outer section) to eliminate blank vertical side borders
  const section2RotateX = useTransform(scrollYProgress, [0, 1], [10, 0]);
  const section2Y = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div ref={containerRef} className="relative w-full">
      {/* ==================================================================== */}
      {/* 1. HERO PIN WRAPPER                                                  */}
      {/* Desktop (>= 1024px): h-[145vh] sticky pinned buffer for 3D tilt stack */}
      {/* Mobile (< 1024px): h-auto natural flow prevents premature overlap     */}
      {/* ==================================================================== */}
      <div
        ref={heroWrapperRef}
        className={
          isDesktop
            ? 'relative w-full h-[145vh]'
            : 'relative w-full h-auto'
        }
      >
        <section
          className={
            isDesktop
              ? 'sticky top-0 z-[1] w-full h-screen text-[#F5F5F5] flex flex-col justify-center overflow-hidden'
              : 'relative z-[1] w-full min-h-screen text-[#F5F5F5] flex flex-col justify-start overflow-visible'
          }
        >
          {/* Solid Matte-Black Background with Vector NEET OMR Marks (Stationary full-width edge-to-edge, NEVER scaled) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 w-full h-full z-0 select-none overflow-hidden"
            style={{
              background: '#111214',
            }}
          >
            <NeetOmrBackground />
          </div>

          {/* Hero Cards Container (On desktop: cards scale & dim; background stays stationary. On mobile: natural scale & clear of navbar) */}
          <motion.div
            style={
              isDesktop
                ? {
                    scale: heroScale,
                    filter: heroFilter,
                    transformOrigin: 'center center',
                    willChange: 'transform, filter',
                  }
                : {
                    scale: 1,
                    filter: 'none',
                    transformOrigin: 'center center',
                  }
            }
            className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full pt-28 sm:pt-32 lg:pt-28 pb-12 sm:pb-16 lg:pb-20"
          >
            <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
              {/* Card 1 — Examination Preparation */}
              <HeroPreparationCard onStartPractice={onStartPractice} />

              {/* Card 2 — Double-Sided 3D Card: Heading & Native Video Player / Journey Guide */}
              <FlippableMeritwiseCard
                tutorialVideo={tutorialVideoConfig ?? undefined}
                onStartPractice={onStartPractice}
              />
            </div>
          </motion.div>
        </section>
      </div>

      {/* ==================================================================== */}
      {/* 2. 3D PERSPECTIVE WRAPPER & STACKED CARD (SECTION 2)                 */}
      {/* Desktop: perspective: 1400px and 3D tilt-in entrance                */}
      {/* Mobile: Natural responsive flow without premature content clipping  */}
      {/* ==================================================================== */}
      <div
        ref={section2Ref}
        className="relative z-10 w-full"
        style={
          isDesktop
            ? {
                perspective: '1400px',
                transformStyle: 'preserve-3d',
              }
            : {
                perspective: 'none',
              }
        }
      >
        <motion.section
          id="examinations"
          style={
            isDesktop
              ? {
                  rotateX: section2RotateX,
                  y: section2Y,
                  transformOrigin: 'center top',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform',
                }
              : {
                  rotateX: 0,
                  y: 0,
                  transformOrigin: 'center top',
                }
          }
          className="relative w-full bg-[#F8FAF6] rounded-t-[28px] sm:rounded-t-[32px] pt-12 sm:pt-16 lg:pt-20 pb-8 sm:pb-14 lg:pb-24 border-0"
        >
          <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="max-w-2xl mx-auto text-center space-y-2.5 sm:space-y-3 mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#121316]">
                Focused preparation for serious candidates.
              </h2>
              <p className="text-xs sm:text-sm text-[#52525B]">
                Four core examination categories. Each built around its official format, marking rules, and duration.
              </p>
            </div>

            {/* 4 Interactive 3D Glassmorphism Cards */}
            <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
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
