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
      {/* 3D MATTE BLACK FROSTED GLASS SLAB                                    */}
      {/* ==================================================================== */}
      <div
        className="relative h-full flex flex-col justify-between rounded-[30px] sm:rounded-[32px] p-7 sm:p-10 lg:p-11 transition-all overflow-hidden select-none"
        style={{
          background:
            'linear-gradient(145deg, rgba(46, 50, 56, 0.72) 0%, rgba(26, 29, 34, 0.82) 48%, rgba(16, 18, 22, 0.92) 100%)',
          backdropFilter: 'blur(26px) saturate(110%)',
          WebkitBackdropFilter: 'blur(26px) saturate(110%)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: [
            '0 24px 55px rgba(0, 0, 0, 0.45)',
            '0 8px 20px rgba(0, 0, 0, 0.30)',
            'inset 0 1.5px 2px rgba(255, 255, 255, 0.65)',
            'inset 1.5px 0 2px rgba(255, 255, 255, 0.35)',
            'inset 0 -2.5px 5px rgba(0, 0, 0, 0.50)',
          ].join(', '),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Architectural 3D Glass Edge Simulation Rim with specular reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1px solid rgba(255, 255, 255, 0.16)',
            boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.08)',
          }}
        />

        {/* Soft Upper-Left Specular Glare / Reflection Mist */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 20% 0%, rgba(255, 255, 255, 0.22) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 80%)',
          }}
        />

        {/* Ambient Corner Occlusion Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-white/[0.04] blur-3xl z-0" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-black/60 blur-3xl z-0" />

        {/* ================================================================ */}
        {/* LAYERED 3D CONTENT HIERARCHY                                      */}
        {/* ================================================================ */}
        <div
          className="space-y-6 relative z-20"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Master Headline (translateZ: 16px) */}
          <h1
            style={{ transform: 'translateZ(16px)' }}
            className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-extrabold tracking-[-0.035em] text-[#F5F5F5] leading-[1.12]"
          >
            Your preparation deserves more than guesswork.
          </h1>

          {/* Value Proposition Description (translateZ: 10px) */}
          <p
            style={{ transform: 'translateZ(10px)' }}
            className="text-sm sm:text-base text-[#B8B8BC] font-medium leading-relaxed max-w-xl"
          >
            Practice curated examination papers, attempt timed tests, evaluate your performance, and understand where you stand.
          </p>

          {/* Action Buttons (translateZ: 20px) */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Action Button: Solid White Pill with Black Text */}
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-7 sm:px-8 h-12 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Practice</span>
              <span className="font-mono text-xs">↗</span>
            </button>

            {/* Secondary Button: Dark Translucent Glass Pill */}
            <a
              href="#examinations"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/20 bg-white/[0.05] px-6 sm:px-7 h-12 text-xs sm:text-sm font-semibold text-[#F5F5F5] shadow-xs backdrop-blur-sm hover:bg-white/[0.12] hover:border-white/35 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Exams</span>
              <ChevronRight className="h-4 w-4 text-[#B8B8BC]" />
            </a>
          </div>
        </div>

        {/* Focus Examinations Track (translateZ: 12px) */}
        <div
          style={{
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d',
          }}
          className="pt-8 sm:pt-10 border-t border-white/10 relative z-20 mt-6 sm:mt-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#8E8E93] mb-3">
            Focus Examinations
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {focusExams.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                className="group flex items-center gap-1 rounded-full border border-white/15 bg-white/[0.05] px-4 py-1.5 text-xs font-bold text-[#F5F5F5] shadow-xs backdrop-blur-sm transition-all hover:border-white/40 hover:bg-white/[0.12] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans uppercase tracking-wider">{exam.name}</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#B8B8BC] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-white" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CursorTiltCard>
  );
}

export default HeroPreparationCard;
