'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { MeritwiseVideoPlayer, MeritwiseVideoPlayerRef } from './MeritwiseVideoPlayer';
import type { TutorialVideoConfig } from '@/types/admin';

export type { TutorialVideoConfig };

export interface FlippableMeritwiseCardProps {
  tutorialVideo?: TutorialVideoConfig;
  className?: string;
  onStartPractice?: (e: React.MouseEvent) => void;
}

// Fallback video configuration
const DEFAULT_VIDEO_URL = '/api/videos/meritwise-platform-walkthrough.mp4';
const DEFAULT_POSTER_URL = '/brand/tutorial-poster.jpg';

// Six-step balanced student journey (2 columns, 3 rows)
const STUDENT_JOURNEY_STEPS = [
  {
    number: '01',
    title: 'Start Practice',
    description: 'Create your account.',
  },
  {
    number: '02',
    title: 'Choose Your Exam',
    description: 'NEET, JEE, UPSC or GATE.',
  },
  {
    number: '03',
    title: 'Access Paper 1',
    description: 'Open your first available paper.',
  },
  {
    number: '04',
    title: 'Take Your Test',
    description: 'Attempt a timed examination.',
  },
  {
    number: '05',
    title: 'Analyze Results',
    description: 'Explore scores, accuracy, speed, strengths and weaknesses.',
  },
  {
    number: '06',
    title: 'Keep Improving',
    description: 'Review mistakes and practice again.',
  },
];

export function FlippableMeritwiseCard({
  tutorialVideo,
  className,
  onStartPractice,
}: FlippableMeritwiseCardProps) {
  const router = useRouter();
  const cardRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<MeritwiseVideoPlayerRef>(null);

  // Flip state for the bottom interactive card:
  // false = Side 1 (Video Walkthrough - Default Front), true = Side 2 (Student Journey Guide - Back)
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isVideoInteracting, setIsVideoInteracting] = useState(false);

  // 3D cursor tilt state (active only when !isFlipped and not interacting with video)
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [specular, setSpecular] = useState({ x: 50, y: 50 });
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Check reduced motion & touch device preferences
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(mediaMotion.matches);
      const motionListener = () => setReducedMotion(mediaMotion.matches);
      mediaMotion.addEventListener('change', motionListener);

      const mediaTouch = window.matchMedia('(pointer: coarse)');
      setIsTouch(mediaTouch.matches);
      const touchListener = () => setIsTouch(mediaTouch.matches);
      mediaTouch.addEventListener('change', touchListener);

      return () => {
        mediaMotion.removeEventListener('change', motionListener);
        mediaTouch.removeEventListener('change', touchListener);
      };
    }
  }, []);

  // Keyboard accessibility: Escape flips back from Guide to Video
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isFlipped && !isFlipping) {
        handleCardFlip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFlipped, isFlipping]);

  // Handle cursor movement for 3D tilt on bottom card
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped || isFlipping || isVideoInteracting || reducedMotion || isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // 5 deg max tilt per specification
      const maxTilt = 5;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setCoords({ x: rotateX, y: rotateY });
      setSpecular({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
      });
    },
    [isFlipped, isFlipping, isVideoInteracting, reducedMotion, isTouch]
  );

  const handleMouseEnter = () => {
    if (isFlipped || isFlipping || isVideoInteracting || reducedMotion || isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Click-to-Flip Handler: Toggles Bottom Card between Side 1 (Video) and Side 2 (Guide)
  const handleCardFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFlipping) return;

    if (!isFlipped) {
      // Flipping from Video to Guide: Pause video playback
      playerRef.current?.pause();
      setIsFlipping(true);
      setIsFlipped(true);
      setIsHovered(false);
      setCoords({ x: 0, y: 0 });
      setTimeout(() => setIsFlipping(false), 880);
    } else {
      // Flipping from Guide to Video: Return without auto-restarting video
      setIsFlipping(true);
      setIsFlipped(false);
      setIsHovered(false);
      setCoords({ x: 0, y: 0 });
      setTimeout(() => setIsFlipping(false), 880);
    }
  };

  // Keyboard navigation for bottom card flip (Enter or Space)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'BUTTON' && target.tagName !== 'A' && target.tagName !== 'IFRAME') {
        e.preventDefault();
        handleCardFlip();
      }
    }
  };

  const handleDefaultStartPractice = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onStartPractice) {
      onStartPractice(e);
    } else {
      router.push('/register');
    }
  };

  const videoSrc = tutorialVideo?.videoUrl || DEFAULT_VIDEO_URL;
  const posterSrc = tutorialVideo?.posterUrl || DEFAULT_POSTER_URL;
  const isInteractiveTilt = !isFlipped && !isFlipping && !isVideoInteracting && !reducedMotion && !isTouch;

  // 3D tilt transform for bottom card
  const tiltTransform =
    isInteractiveTilt && isHovered
      ? `rotateX(${coords.x.toFixed(2)}deg) rotateY(${coords.y.toFixed(2)}deg) translateY(-4px)`
      : `rotateX(0deg) rotateY(0deg) translateY(0px)`;

  // Dynamic shadow displacement based on cursor tilt
  const shadowX = isHovered && !isFlipped ? (-coords.y * 1.4).toFixed(1) : '0';
  const shadowY = isHovered && !isFlipped ? (22 + coords.x * 1.2).toFixed(1) : '18';
  const dynamicShadow =
    isHovered && !isFlipped
      ? `${shadowX}px ${shadowY}px 48px -10px rgba(28, 40, 22, 0.22), 0 12px 24px -8px rgba(28, 40, 22, 0.14), 0 1px 3px 0 rgba(28, 40, 22, 0.08)`
      : '0 20px 45px -12px rgba(28, 40, 22, 0.18), 0 8px 20px -8px rgba(28, 40, 22, 0.12)';

  // 180-deg horizontal rotation for bottom card 3D flipper container
  const flipRotation = isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)';

  // Reusable Matte Sage Glass slab styling with visible glacier-blue mist & edge reflections
  const matteSageGlassStyle: React.CSSProperties = {
    background:
      'linear-gradient(140deg, rgba(220, 231, 237, 0.35) 0%, rgba(199, 211, 189, 0.78) 20%, rgba(156, 175, 136, 0.72) 54%, rgba(117, 137, 106, 0.68) 100%)',
    backdropFilter: 'blur(26px) saturate(108%)',
    WebkitBackdropFilter: 'blur(26px) saturate(108%)',
    border: '1px solid rgba(201, 217, 226, 0.55)',
    boxShadow:
      '0 24px 50px -12px rgba(28, 40, 22, 0.18), 0 0 42px -6px rgba(201, 217, 226, 0.45), inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.85), inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.55), inset 0 -3px 6px 0 rgba(65, 82, 54, 0.38), inset -2px 0 5px 0 rgba(65, 82, 54, 0.25), inset 0 0 32px 0 rgba(201, 217, 226, 0.28)',
    transformStyle: 'preserve-3d',
  };

  // Dedicated slim top card glassmorphism style (stationary, non-flipping)
  const staticHeadingCardStyle: React.CSSProperties = {
    background:
      'linear-gradient(140deg, rgba(220, 231, 237, 0.40) 0%, rgba(199, 211, 189, 0.82) 20%, rgba(156, 175, 136, 0.76) 54%, rgba(117, 137, 106, 0.70) 100%)',
    backdropFilter: 'blur(24px) saturate(108%)',
    WebkitBackdropFilter: 'blur(24px) saturate(108%)',
    border: '1px solid rgba(201, 217, 226, 0.50)',
    boxShadow:
      '0 14px 30px -8px rgba(28, 40, 22, 0.16), 0 0 32px -6px rgba(201, 217, 226, 0.38), inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.85), inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.55), inset 0 -2.5px 5px 0 rgba(65, 82, 54, 0.32), inset 0 0 24px 0 rgba(201, 217, 226, 0.24)',
  };

  return (
    <div className={cn('relative w-full h-full flex flex-col gap-4 sm:gap-[18px]', className)}>
      {/* ==================================================================== */}
      {/* 1. TOP CARD — STATIC SLIM RECTANGULAR HEADING CARD                   */}
      {/* ==================================================================== */}
      <div
        role="region"
        aria-label="Section title: See How It All Works."
        className="relative w-full shrink-0 h-[76px] sm:h-[84px] rounded-2xl sm:rounded-[22px] flex items-center justify-center overflow-hidden select-none transition-all"
        style={staticHeadingCardStyle}
      >
        {/* Architectural Bevel Rim with Glacial Daylight Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1.5px solid rgba(201, 217, 226, 0.55)',
            boxShadow: 'inset 0 0 0 1px rgba(220, 231, 237, 0.40)',
          }}
        />

        {/* Soft Cloudy Internal Diffusion Mist */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(220, 231, 237, 0.35) 0%, rgba(201, 217, 226, 0.22) 35%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
          }}
        />

        {/* Ambient Corner Occlusion Glows */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-[#C9D9E2]/50 blur-2xl z-0" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-[#DCE7ED]/45 blur-2xl z-0" />

        {/* Center Typography: Premium Black Only (No buttons, no icons, no badges) */}
        <h3 className="relative z-20 text-sm sm:text-base font-bold text-[#151A15] text-center px-4 tracking-[-0.01em]">
          See How It All Works.
        </h3>
      </div>

      {/* ==================================================================== */}
      {/* 2. BOTTOM CARD — INTERACTIVE 3D FLIP CARD (VIDEO / GUIDE)            */}
      {/* ==================================================================== */}
      <div
        ref={cardRef}
        tabIndex={0}
        role="region"
        aria-label={
          isFlipped
            ? 'Meritwise preparation guide. Click anywhere or press Enter to flip to video walkthrough.'
            : 'Meritwise video demonstration. Click outside the video or press Enter to flip to preparation guide.'
        }
        onKeyDown={handleKeyDown}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="relative w-full flex-1 min-h-[440px] sm:min-h-[470px] select-none rounded-[28px] sm:rounded-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#151A15]/40"
        style={{
          perspective: '1200px',
        }}
      >
        {/* 3D Tilt Wrapper */}
        <div
          className="relative w-full h-full rounded-[inherit]"
          style={{
            transform: tiltTransform,
            transformStyle: 'preserve-3d',
            transition: isHovered && !isFlipped
              ? 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.18s ease-out'
              : 'transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.58s ease-out',
            boxShadow: dynamicShadow,
          }}
        >
          {/* 180-deg Flip Container */}
          <div
            className="relative w-full h-full rounded-[inherit]"
            style={{
              transform: flipRotation,
              transformStyle: 'preserve-3d',
              transition: reducedMotion
                ? 'transform 0.01s'
                : 'transform 880ms cubic-bezier(0.22, 1, 0.36, 1)',
            }}
          >
            {/* ============================================================== */}
            {/* SIDE 1: NATIVE MERITWISE VIDEO PLAYER (FRONT FACE - DEFAULT)   */}
            {/* ============================================================== */}
            <div
              role="region"
              aria-label="Meritwise video demonstration. Click the card frame to flip to preparation guide."
              className={cn(
                'relative h-full w-full min-h-[440px] sm:min-h-[470px] rounded-[28px] sm:rounded-[32px] p-4 sm:p-5 lg:p-6 flex flex-col justify-center items-center overflow-hidden cursor-pointer transition-all',
                isFlipped && 'pointer-events-none'
              )}
              style={{
                ...matteSageGlassStyle,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
              onClick={handleCardFlip}
            >
              {/* Architectural 3-5px Thick Glass Edge Simulation Rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                style={{
                  border: '1.5px solid rgba(201, 217, 226, 0.55)',
                  boxShadow: 'inset 0 0 0 1px rgba(220, 231, 237, 0.40)',
                }}
              />

              {/* Soft Cloudy Internal Diffusion Mist */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(220, 231, 237, 0.35) 0%, rgba(201, 217, 226, 0.22) 32%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
                }}
              />

              {/* Moving Diffused Fogged Light Reflection */}
              {!isFlipped && !reducedMotion && !isTouch && (
                <div
                  className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-500 overflow-hidden"
                  style={{
                    opacity: isHovered && !isVideoInteracting ? 0.20 : 0.08,
                    background: `radial-gradient(circle 480px at ${specular.x}% ${specular.y}%, rgba(245, 250, 253, 0.55) 0%, rgba(220, 231, 237, 0.30) 35%, transparent 75%)`,
                  }}
                />
              )}

              {/* Ambient Background Corner Glows */}
              <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-[#C9D9E2]/55 blur-3xl z-0" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-[#DCE7ED]/45 blur-3xl z-0" />

              {/* Center: Large responsive 16:9 native Meritwise video player (NO heading) */}
              <div
                style={{ transform: 'translateZ(14px)' }}
                className="relative z-20 w-full max-w-xl mx-auto my-auto cursor-default"
                onClick={(e) => e.stopPropagation()}
                onPointerDown={(e) => e.stopPropagation()}
                onMouseEnter={() => setIsVideoInteracting(true)}
                onMouseLeave={() => setIsVideoInteracting(false)}
              >
                <MeritwiseVideoPlayer
                  ref={playerRef}
                  src={videoSrc}
                  poster={posterSrc}
                  title={tutorialVideo?.title}
                  enabled={tutorialVideo?.enabled !== false}
                />
              </div>
            </div>

            {/* ============================================================== */}
            {/* SIDE 2: COMPLETE STUDENT JOURNEY GUIDE (REVERSE FACE)          */}
            {/* ============================================================== */}
            <div
              role="region"
              aria-label="Meritwise preparation guide. Click anywhere on the card surface to flip back to video."
              className={cn(
                'absolute inset-0 h-full w-full rounded-[28px] sm:rounded-[32px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden cursor-pointer transition-all',
                !isFlipped && 'pointer-events-none'
              )}
              style={{
                ...matteSageGlassStyle,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              onClick={handleCardFlip}
            >
              {/* Architectural 3-5px Thick Glass Edge Simulation Rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                style={{
                  border: '1.5px solid rgba(201, 217, 226, 0.55)',
                  boxShadow: 'inset 0 0 0 1px rgba(220, 231, 237, 0.40)',
                }}
              />

              {/* Soft Cloudy Internal Diffusion Mist */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(220, 231, 237, 0.35) 0%, rgba(201, 217, 226, 0.22) 32%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
                }}
              />

              {/* Ambient Occlusion Corner Glows */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#C9D9E2]/55 blur-3xl z-0" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-[#DCE7ED]/45 blur-3xl z-0" />

              {/* 1. Header (translateZ: 14px) - Compact & left-aligned */}
              <div
                style={{ transform: 'translateZ(14px)' }}
                className="space-y-1 relative z-20"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#151A15] tracking-tight leading-tight">
                  Getting started is simple.
                </h2>
                <p className="text-xs sm:text-sm text-[#455044] font-medium leading-snug">
                  Six steps from your first practice to better results.
                </p>
              </div>

              {/* 2. Six Steps in Balanced 2-Column, 3-Row Grid (translateZ: 10px) */}
              <div
                style={{ transform: 'translateZ(10px)' }}
                className="grid grid-cols-1 sm:grid-cols-2 gap-x-5 sm:gap-x-7 lg:gap-x-9 gap-y-3.5 sm:gap-y-4.5 my-auto py-2.5 sm:py-3.5 relative z-20"
              >
                {STUDENT_JOURNEY_STEPS.map((step) => (
                  <div
                    key={step.number}
                    className="flex items-start gap-3 group"
                  >
                    {/* Small Numbered Label */}
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#C7D3BD]/90 border border-white/60 text-[10px] font-mono font-extrabold text-[#151A15] shadow-xs mt-0.5">
                      {step.number}
                    </span>

                    {/* Step Title & Concise Sentence */}
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#151A15] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#455044] leading-snug mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Bottom Action Area (translateZ: 18px) */}
              <div
                style={{ transform: 'translateZ(18px)' }}
                className="pt-3.5 sm:pt-4.5 border-t border-[#75896A]/25 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 relative z-20 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#151A15] leading-tight">
                    Ready to begin?
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#455044] font-medium leading-snug mt-0.5">
                    Your first paper is just a few clicks away.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDefaultStartPractice}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151A15] text-white px-6 sm:px-7 py-2.5 sm:py-3 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shrink-0"
                >
                  <span>Start Practice</span>
                  <span className="font-mono text-xs">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlippableMeritwiseCard;