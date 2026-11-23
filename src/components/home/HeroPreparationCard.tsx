'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
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
      maxTilt={4}
      hoverLift={4}
      perspective={1200}
    >
      {/* ==================================================================== */}
      {/* 3D MATTE FORGED SAGE BENTO CARD                                       */}
      {/* ==================================================================== */}
      <div
        className="relative h-full flex flex-col justify-between rounded-[36px] p-7 sm:p-9 lg:p-10 transition-all overflow-hidden select-none"
        style={{
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

        {/* ================================================================ */}
        {/* LAYERED 3D CONTENT HIERARCHY                                      */}
        {/* ================================================================ */}
        <div
          className="space-y-6 relative z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Master Headline (translateZ: 14px) */}
          <h1
            style={{ transform: 'translateZ(14px)' }}
            className="text-3xl sm:text-4xl lg:text-[42px] xl:text-[45px] font-extrabold tracking-[-0.035em] text-[#141A11] leading-[1.12]"
          >
            Your preparation deserves more than guesswork.
          </h1>

          {/* Value Proposition Description (translateZ: 10px) */}
          <p
            style={{ transform: 'translateZ(10px)' }}
            className="text-sm sm:text-base text-[#465047] font-medium leading-relaxed max-w-xl"
          >
            Practice curated examination papers, attempt timed tests, evaluate your performance, and understand where you stand.
          </p>

          {/* Action Buttons (translateZ: 16px) */}
          <div
            style={{ transform: 'translateZ(16px)' }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Action Button: Solid Dark Pill */}
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#141A11] text-white px-7 sm:px-8 h-12 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-md hover:bg-[#232923] transition-all duration-200 hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Start Practice</span>
              <ArrowUpRight className="h-4 w-4" />
            </button>

            {/* Secondary Button: Restrained Translucent Sage Pill */}
            <a
              href="#examinations"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-[rgba(20,26,17,0.18)] bg-[rgba(20,26,17,0.07)] px-6 sm:px-7 h-12 text-xs sm:text-sm font-bold text-[#141A11] transition-all duration-200 hover:bg-[rgba(20,26,17,0.12)] hover:border-[rgba(20,26,17,0.28)] hover:scale-[1.01] active:scale-[0.99]"
            >
              <span>Explore Exams</span>
              <ArrowUpRight className="h-4 w-4 text-[#141A11]" />
            </a>
          </div>
        </div>

        {/* Focus Examinations Track (translateZ: 10px) */}
        <div
          style={{
            transform: 'translateZ(10px)',
            transformStyle: 'preserve-3d',
          }}
          className="pt-7 sm:pt-8 border-t border-[rgba(20,26,17,0.15)] relative z-20 mt-6 sm:mt-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#465047] mb-3">
            Focus Examinations
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {focusExams.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                className="group flex items-center gap-1.5 rounded-full border border-[rgba(20,26,17,0.22)] bg-[rgba(20,26,17,0.06)] px-4 py-1.5 text-xs font-bold text-[#141A11] transition-all duration-200 hover:bg-[rgba(20,26,17,0.12)] hover:border-[rgba(20,26,17,0.34)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans uppercase tracking-wider">{exam.name}</span>
                <ArrowUpRight className="h-3 w-3 text-[#141A11]/70 group-hover:text-[#141A11] transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CursorTiltCard>
  );
}

export default HeroPreparationCard;
