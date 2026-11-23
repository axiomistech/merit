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
    description: 'Explore scores, accuracy, speed, and strengths.',
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

  // Flip state for the unified bento card:
  // Continuous accumulating rotation: 0deg -> 180deg -> 360deg...
  const [rotation, setRotation] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [isVideoInteracting, setIsVideoInteracting] = useState(false);

  // isFlipped is true when an odd half-turn has been reached (Guide facing user)
  const isFlipped = Math.round(rotation / 180) % 2 !== 0;

  // 3D cursor tilt state (active only when !isFlipped and not interacting with video)
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
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

  // Handle cursor movement for subtle 3D tilt
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (isFlipped || isFlipping || isVideoInteracting || reducedMotion || isTouch || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const maxTilt = 4;
      const rotateX = ((y - centerY) / centerY) * -maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      setCoords({ x: rotateX, y: rotateY });
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

  // Click-to-Flip Handler: Continuously accumulates +180deg
  const handleCardFlip = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (isFlipping) return;

    if (!isFlipped) {
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

  // Subtle 3D tilt transform
  const tiltTransform =
    isInteractiveTilt && isHovered
      ? `rotateX(${coords.x.toFixed(2)}deg) rotateY(${coords.y.toFixed(2)}deg) translateY(-4px)`
      : `rotateX(0deg) rotateY(0deg) translateY(0px)`;

  // Continuous accumulating one-way rotation for 3D flip
  const flipRotation = `rotateY(${rotation}deg)`;

  // Matte Forged Sage Finish matching left bento card (#9CAF88)
  const sageBentoCardStyle: React.CSSProperties = {
    background:
      'linear-gradient(155deg, rgba(166, 186, 148, 0.95) 0%, #9CAF88 50%, rgba(142, 162, 122, 0.95) 100%)',
    backdropFilter: 'blur(20px) saturate(110%)',
    WebkitBackdropFilter: 'blur(20px) saturate(110%)',
    border: '1px solid rgba(20, 26, 17, 0.12)',
    boxShadow: [
      '0 12px 28px rgba(20, 26, 17, 0.12)',
      'inset 0 1px 1px 0 rgba(255, 255, 255, 0.50)',
    ].join(', '),
    transformStyle: 'preserve-3d',
  };

  return (
    <div
      ref={cardRef}
      tabIndex={0}
      role="region"
      aria-label="See How It All Works. Platform demonstration video and student journey guide."
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'relative w-full h-full min-h-[480px] sm:min-h-[520px] select-none rounded-[36px] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40',
        className
      )}
      style={{ perspective: '1400px' }}
    >
      {/* 3D Tilt Wrapper */}
      <div
        className="relative w-full h-full rounded-[36px]"
        style={{
          transform: tiltTransform,
          transformStyle: 'preserve-3d',
          transition: isHovered && !isFlipped
            ? 'transform 0.14s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.18s ease-out'
            : 'transform 0.58s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.58s ease-out',
        }}
      >
        {/* Continuous Flip Container */}
        <div
          className="relative w-full h-full rounded-[36px]"
          style={{
            transform: flipRotation,
            transformStyle: 'preserve-3d',
            transition: reducedMotion
              ? 'transform 0.01s'
              : 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        >
          {/* ============================================================== */}
          {/* SIDE 1: UNIFIED RIGHT BENTO CARD (FRONT FACE - DEFAULT)        */}
          {/* ============================================================== */}
          <div
            role="region"
            aria-label="See How It All Works. Platform walkthrough video."
            className={cn(
              'relative h-full w-full rounded-[36px] p-5 sm:p-6 lg:p-7 flex flex-col justify-between overflow-hidden transition-all select-none',
              isFlipped && 'pointer-events-none'
            )}
            style={{
              ...sageBentoCardStyle,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(0deg)',
            }}
          >
            {/* Fine translucent internal rim highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.20)',
              }}
            />

            {/* Soft internal atmospheric diffusion mist */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, transparent 80%)',
              }}
            />

            {/* 1. TOP HEADER: "See How It All Works." Typography & Journey Toggle Pill */}
            <div
              style={{ transform: 'translateZ(14px)' }}
              className="relative z-20 flex items-center justify-between gap-3 px-1 pt-1 pb-3 sm:pb-4 border-b border-[rgba(20,26,17,0.12)]"
            >
              <h3
                className="text-xl sm:text-2xl lg:text-[25px] font-bold tracking-[-0.02em] text-[#141A11]"
                style={{
                  fontFamily: "'Benton Sans', 'Benton', sans-serif",
                }}
              >
                See How It All Works.
              </h3>

              <button
                type="button"
                onClick={handleCardFlip}
                className="group flex items-center gap-1.5 rounded-full border border-[rgba(20,26,17,0.22)] bg-[rgba(20,26,17,0.06)] px-3.5 py-1.5 text-xs font-bold text-[#141A11] transition-all duration-200 hover:bg-[rgba(20,26,17,0.12)] hover:border-[rgba(20,26,17,0.34)] active:scale-95"
                aria-label="View Student Journey Guide"
              >
                <span className="uppercase tracking-wider text-[11px]">Guide</span>
                <span className="text-xs text-[#141A11]/70 group-hover:text-[#141A11] transition-colors">↗</span>
              </button>
            </div>

            {/* 2. CENTER: Clean Embedded Video Player in Concentric Frame (rounded-[16px]) */}
            <div
              style={{ transform: 'translateZ(18px)' }}
              className="relative z-20 w-full my-auto py-2 sm:py-3 cursor-default"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseEnter={() => setIsVideoInteracting(true)}
              onMouseLeave={() => setIsVideoInteracting(false)}
            >
              <div className="w-full rounded-[16px] overflow-hidden border border-[rgba(20,26,17,0.14)] shadow-md">
                <MeritwiseVideoPlayer
                  ref={playerRef}
                  src={videoSrc}
                  poster={posterSrc}
                  title={tutorialVideo?.title}
                  enabled={tutorialVideo?.enabled !== false}
                />
              </div>
            </div>

            {/* 3. BOTTOM CAPTION / STATUS BAR */}
            <div
              style={{ transform: 'translateZ(10px)' }}
              className="relative z-20 flex items-center justify-between text-[11px] font-semibold text-[#465047] px-1 pt-2 border-t border-[rgba(20,26,17,0.12)]"
            >
              <span className="flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#141A11]" />
                Interactive Platform Walkthrough
              </span>
              <span className="font-mono text-[10px] text-[#465047]/80">1080P HD</span>
            </div>
          </div>

          {/* ============================================================== */}
          {/* SIDE 2: COMPLETE STUDENT JOURNEY GUIDE (REVERSE FACE)          */}
          {/* ============================================================== */}
          <div
            role="region"
            aria-label="Student Journey Guide. Step by step preparation overview."
            className={cn(
              'absolute inset-0 h-full w-full rounded-[36px] p-6 sm:p-7 lg:p-8 flex flex-col justify-between overflow-hidden transition-all select-none',
              !isFlipped && 'pointer-events-none'
            )}
            style={{
              ...sageBentoCardStyle,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            {/* Fine translucent internal rim highlight */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
              style={{
                border: '1px solid rgba(255, 255, 255, 0.20)',
              }}
            />

            {/* Soft internal atmospheric diffusion mist */}
            <div
              className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
              style={{
                background:
                  'radial-gradient(ellipse 90% 55% at 50% 0%, rgba(255, 255, 255, 0.22) 0%, transparent 80%)',
              }}
            />

            {/* Header: Title + Flip Back to Video Button */}
            <div className="flex items-center justify-between pb-3 border-b border-[rgba(20,26,17,0.14)] relative z-10">
              <div>
                <h4
                  className="text-lg sm:text-xl font-bold tracking-tight text-[#141A11]"
                  style={{ fontFamily: "'Benton Sans', 'Benton', sans-serif" }}
                >
                  Student Journey
                </h4>
                <p className="text-xs text-[#465047] font-medium">
                  Six steps from preparation to exam mastery
                </p>
              </div>

              <button
                type="button"
                onClick={handleCardFlip}
                className="group flex items-center gap-1.5 rounded-full border border-[rgba(20,26,17,0.22)] bg-[rgba(20,26,17,0.06)] px-3 py-1.5 text-xs font-bold text-[#141A11] transition-all hover:bg-[rgba(20,26,17,0.12)] active:scale-95"
                aria-label="Flip back to video"
              >
                <span className="text-[11px] uppercase tracking-wider">Video</span>
                <span className="font-mono text-xs">↺</span>
              </button>
            </div>

            {/* 6-Step Journey Grid (2 columns, 3 rows) */}
            <div className="grid grid-cols-2 gap-3 sm:gap-3.5 my-auto py-2 relative z-10">
              {STUDENT_JOURNEY_STEPS.map((step) => (
                <div
                  key={step.number}
                  className="rounded-2xl border border-[rgba(20,26,17,0.12)] bg-[rgba(255,255,255,0.30)] p-3 sm:p-3.5 backdrop-blur-xs transition-colors hover:bg-[rgba(255,255,255,0.45)]"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[11px] font-bold text-[#141A11]/60">
                      {step.number}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-[#141A11]/30" />
                    <span className="text-xs font-bold text-[#141A11] line-clamp-1">
                      {step.title}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#465047] leading-relaxed line-clamp-2">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Footer: Start Practice Action */}
            <div className="pt-3 border-t border-[rgba(20,26,17,0.14)] flex items-center justify-between relative z-10">
              <span className="text-[11px] font-semibold text-[#465047]">
                Ready to begin your timed test?
              </span>

              <button
                type="button"
                onClick={handleDefaultStartPractice}
                className="rounded-full bg-[#141A11] text-white px-5 py-2 text-xs font-extrabold uppercase tracking-wider shadow-md hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                Start Practice →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FlippableMeritwiseCard;
