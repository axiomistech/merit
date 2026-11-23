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
    description: 'NEET, JEE Main, JEE Advanced, or GATE.',
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
  // Continuous accumulating rotation: 0deg -> 180deg -> 360deg -> 540deg...
  const [rotation, setRotation] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isVideoInteracting, setIsVideoInteracting] = useState(false);

  // isFlipped is true when an odd half-turn has been reached (Guide facing user)
  const isFlipped = Math.round(rotation / 180) % 2 !== 0;

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

  // Click-to-Flip Handler: Continuously accumulates +180deg in the same direction on every click
  const handleCardFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFlipping) return;

    if (!isFlipped) {
      // Flipping from Video to Guide: Pause video playback
      playerRef.current?.pause();
    }

    setIsFlipping(true);
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
    setRotation((prev) => prev + 180);

    setTimeout(() => {
      setIsFlipping(false);
    }, 700);
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
      ? `${shadowX}px ${shadowY}px 48px -10px rgba(0, 0, 0, 0.55), 0 12px 24px -8px rgba(0, 0, 0, 0.35)`
      : '0 24px 55px -12px rgba(0, 0, 0, 0.50), 0 8px 20px -8px rgba(0, 0, 0, 0.35)';

  // Continuous accumulating one-way rotation for bottom card 3D flipper container
  const flipRotation = `rotateY(${rotation}deg)`;

  // Reusable Matte Charcoal Glass slab styling
  const matteCharcoalGlassStyle: React.CSSProperties = {
    background:
      'linear-gradient(145deg, rgba(44, 48, 54, 0.72) 0%, rgba(22, 25, 29, 0.82) 48%, rgba(14, 16, 19, 0.92) 100%)',
    backdropFilter: 'blur(26px) saturate(110%)',
    WebkitBackdropFilter: 'blur(26px) saturate(110%)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    boxShadow: [
      '0 24px 55px rgba(0, 0, 0, 0.45)',
      '0 8px 20px rgba(0, 0, 0, 0.30)',
      'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.65)',
      'inset 1.5px 0 2px 0 rgba(255, 255, 255, 0.35)',
      'inset 0 -2.5px 5px 0 rgba(0, 0, 0, 0.50)',
    ].join(', '),
    transformStyle: 'preserve-3d',
  };

  // Dedicated slim top card glassmorphism style (stationary, non-flipping)
  const staticHeadingCardStyle: React.CSSProperties = {
    background:
      'linear-gradient(145deg, rgba(46, 50, 56, 0.76) 0%, rgba(24, 27, 32, 0.84) 50%, rgba(16, 18, 22, 0.92) 100%)',
    backdropFilter: 'blur(26px) saturate(110%)',
    WebkitBackdropFilter: 'blur(26px) saturate(110%)',
    border: '1px solid rgba(255, 255, 255, 0.22)',
    boxShadow: [
      '0 18px 40px -10px rgba(0, 0, 0, 0.45)',
      'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.70)',
      'inset 1.5px 0 2px 0 rgba(255, 255, 255, 0.35)',
      'inset 0 -2px 4px 0 rgba(0, 0, 0, 0.50)',
    ].join(', '),
  };

  return (
    <div className={cn('relative w-full h-full flex flex-col gap-4 sm:gap-[18px]', className)}>
      {/* ==================================================================== */}
      {/* 1. TOP CARD — STATIC SLIM RECTANGULAR HEADING CARD                   */}
      {/* ==================================================================== */}
      <div
        role="region"
        aria-label="Section title: See How It All Works."
        className="relative w-full shrink-0 h-[76px] sm:h-[84px] rounded-2xl sm:rounded-[24px] flex items-center justify-center overflow-hidden select-none transition-all"
        style={staticHeadingCardStyle}
      >
        {/* Architectural Bevel Rim with Specular Daylight Reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* Soft Cloudy Internal Diffusion Mist */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 30% 0%, rgba(255, 255, 255, 0.18) 0%, transparent 70%)',
          }}
        />

        {/* Ambient Corner Occlusion Glows */}
        <div className="pointer-events-none absolute -top-12 -left-12 h-32 w-32 rounded-full bg-white/[0.04] blur-2xl z-0" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-32 w-32 rounded-full bg-black/50 blur-2xl z-0" />

        {/* Center Typography: Benton Sans Typography with Golden Accent Underline on "Works." */}
        <h3
          className="relative z-20 text-xl sm:text-2xl md:text-[25px] lg:text-[27px] font-semibold leading-tight text-[#F5F5F5] text-center px-4 select-none tracking-[-0.015em]"
          style={{
            fontFamily: "'Benton Sans', 'Benton', sans-serif",
          }}
        >
          See How It All{' '}
          <span className="relative inline-block">
            Works.
            <svg
              viewBox="0 0 100 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute -bottom-1.5 left-0 w-full h-[6px] text-[#C6A052] pointer-events-none"
            >
              <path
                d="M2 7C28 3.5 68 3.5 98 6.5C76 8.5 32 8.5 2 7Z"
                fill="currentColor"
              />
            </svg>
          </span>
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
        className="relative w-full flex-1 min-h-[440px] sm:min-h-[470px] select-none rounded-[28px] sm:rounded-[32px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
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
          {/* Continuous One-Way Flip Container */}
          <div
            className="relative w-full h-full rounded-[inherit]"
            style={{
              transform: flipRotation,
              transformStyle: 'preserve-3d',
              transition: reducedMotion
                ? 'transform 0.01s'
                : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
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
                ...matteCharcoalGlassStyle,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(0deg)',
              }}
              onClick={handleCardFlip}
            >
              {/* Architectural 3D Glass Edge Simulation Rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
                }}
              />

              {/* Soft Specular Mist */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255, 255, 255, 0.20) 0%, transparent 75%)',
                }}
              />

              {/* Moving Diffused Fogged Light Reflection */}
              {!isFlipped && !reducedMotion && !isTouch && (
                <div
                  className="pointer-events-none absolute inset-0 z-30 rounded-[inherit] transition-opacity duration-500 overflow-hidden"
                  style={{
                    opacity: isHovered && !isVideoInteracting ? 0.20 : 0.08,
                    background: `radial-gradient(circle 480px at ${specular.x}% ${specular.y}%, rgba(255, 255, 255, 0.30) 0%, rgba(255, 255, 255, 0.08) 35%, transparent 75%)`,
                  }}
                />
              )}

              {/* Ambient Background Corner Glows */}
              <div className="pointer-events-none absolute -top-20 -left-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl z-0" />
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-black/60 blur-3xl z-0" />

              {/* Center: Large responsive 16:9 native Meritwise video player */}
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
                ...matteCharcoalGlassStyle,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
              }}
              onClick={handleCardFlip}
            >
              {/* Architectural 3D Glass Edge Simulation Rim */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
                style={{
                  border: '1px solid rgba(255, 255, 255, 0.16)',
                  boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
                }}
              />

              {/* Soft Cloudy Internal Diffusion Mist */}
              <div
                className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
                style={{
                  background:
                    'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255, 255, 255, 0.20) 0%, transparent 75%)',
                }}
              />

              {/* Ambient Occlusion Corner Glows */}
              <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-white/[0.04] blur-3xl z-0" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/60 blur-3xl z-0" />

              {/* 1. Header (translateZ: 14px) - Compact & left-aligned */}
              <div
                style={{ transform: 'translateZ(14px)' }}
                className="space-y-1 relative z-20"
              >
                <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-[#F5F5F5] tracking-tight leading-tight">
                  Getting started is simple.
                </h2>
                <p className="text-xs sm:text-sm text-[#B8B8BC] font-medium leading-snug">
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
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20 text-[10px] font-mono font-extrabold text-[#F5F5F5] shadow-xs mt-0.5">
                      {step.number}
                    </span>

                    {/* Step Title & Concise Sentence */}
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-[13px] font-bold text-[#F5F5F5] leading-tight">
                        {step.title}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#B8B8BC] leading-snug mt-0.5">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* 3. Bottom Action Area (translateZ: 18px) */}
              <div
                style={{ transform: 'translateZ(18px)' }}
                className="pt-3.5 sm:pt-4.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 relative z-20 cursor-default"
                onClick={(e) => e.stopPropagation()}
              >
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-[#F5F5F5] leading-tight">
                    Ready to begin?
                  </h4>
                  <p className="text-[11px] sm:text-xs text-[#B8B8BC] font-medium leading-snug mt-0.5">
                    Your first paper is just a few clicks away.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleDefaultStartPractice}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-6 sm:px-7 py-2.5 sm:py-3 text-xs font-extrabold uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98] w-full sm:w-auto shrink-0"
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
