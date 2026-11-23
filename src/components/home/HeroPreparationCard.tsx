'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { CursorTiltCard } from './CursorTiltCard';

export interface HeroPreparationCardProps {
  onStartPractice: (e: React.MouseEvent) => void;
  className?: string;
}

export function HeroPreparationCard({ onStartPractice, className }: HeroPreparationCardProps) {
  const focusExams = [
    { name: 'NEET', href: '/neet' },
    { name: 'JEE MAIN', href: '/jee-main' },
    { name: 'JEE ADV', href: '/jee-advanced' },
    { name: 'GATE', href: '/gate' },
  ];

  return (
    <CursorTiltCard
      className={className}
      maxTilt={5}
      hoverLift={5}
      perspective={1200}
    >
      {/* ==================================================================== */}
      {/* 3D MATTE FORGED SAGE METAL SLAB                                      */}
      {/* ==================================================================== */}
      <div
        className="relative h-full flex flex-col justify-between rounded-[30px] sm:rounded-[32px] p-7 sm:p-10 lg:p-11 transition-all overflow-hidden select-none"
        style={{
          background: 'linear-gradient(145deg, #95A881 0%, #849771 100%)',
          border: '1px solid rgba(255, 255, 255, 0.35)',
          boxShadow: [
            '0 20px 40px rgba(24, 32, 18, 0.22)',
            '0 6px 14px rgba(24, 32, 18, 0.12)',
            'inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.40)',
            'inset 1.5px 0 2px 0 rgba(255, 255, 255, 0.25)',
            'inset 0 -2px 4px 0 rgba(20, 28, 16, 0.18)',
            'inset -1.5px 0 3px 0 rgba(20, 28, 16, 0.12)',
          ].join(', '),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Architectural 3D Glass Edge Simulation Rim with specular reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.25)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.12)',
          }}
        />

        {/* Soft Upper-Left Specular Glare / Reflection Mist */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0.08) 40%, transparent 80%)',
          }}
        />

        {/* Ambient Corner Occlusion Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/[0.08] blur-3xl z-0" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[#182012]/30 blur-3xl z-0" />

        {/* ================================================================ */}
        {/* LAYERED 3D CONTENT HIERARCHY                                      */}
        {/* ================================================================ */}
        <div
          className="space-y-6 relative z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Master Headline (translateZ: 16px) - Deep Forest Charcoal (#141A11) */}
          <h1
            style={{ transform: 'translateZ(16px)' }}
            className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-extrabold tracking-[-0.035em] text-[#141A11] leading-[1.12]"
          >
            Your preparation deserves more than guesswork.
          </h1>

          {/* Value Proposition Description (translateZ: 10px) - Muted Olive-Slate (#2C3626) */}
          <p
            style={{ transform: 'translateZ(10px)' }}
            className="text-sm sm:text-base text-[#2C3626] font-medium leading-relaxed max-w-xl"
          >
            Practice curated examination papers, attempt timed tests, evaluate your performance, and understand where you stand.
          </p>

          {/* Action Buttons (translateZ: 20px) */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Action Button: Deep Forest Charcoal (#141A11) with Warm Off-White (#F4F6F0) text */}
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141A11] text-[#F4F6F0] px-7 sm:px-8 h-12 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:bg-[#20281C] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Practice</span>
              <span className="font-mono text-xs">↗</span>
            </button>

            {/* Secondary Button: Recessed Sage Tint Pill with Subtle Border & #141A11 text */}
            <a
              href="#examinations"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[rgba(20,26,17,0.18)] bg-[rgba(20,26,17,0.08)] px-6 sm:px-7 h-12 text-xs sm:text-sm font-semibold text-[#141A11] shadow-xs backdrop-blur-sm hover:bg-[rgba(20,26,17,0.14)] hover:border-[rgba(20,26,17,0.28)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Exams</span>
              <ChevronRight className="h-4 w-4 text-[#2C3626]" />
            </a>
          </div>
        </div>

        {/* Focus Examinations Track (translateZ: 12px) */}
        <div
          style={{
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d',
          }}
          className="pt-8 sm:pt-10 border-t border-[rgba(20,26,17,0.14)] relative z-20 mt-6 sm:mt-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#2C3626] mb-3">
            Focus Examinations
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {focusExams.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                className="group flex items-center gap-1 rounded-full border border-[rgba(20,26,17,0.18)] bg-[rgba(20,26,17,0.08)] px-4 py-1.5 text-xs font-bold text-[#141A11] shadow-xs backdrop-blur-sm transition-all hover:border-[rgba(20,26,17,0.35)] hover:bg-[rgba(20,26,17,0.14)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans uppercase tracking-wider">{exam.name}</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#2C3626] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#141A11]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CursorTiltCard>
  );
}

export default HeroPreparationCard;
