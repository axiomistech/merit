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
      {/* 3D LUMINOUS SAGE GLASS SLAB (MATCHING SECTION 3)                     */}
      {/* ==================================================================== */}
      <div
        className="relative h-full flex flex-col justify-between rounded-[30px] sm:rounded-[32px] p-7 sm:p-10 lg:p-11 transition-all overflow-hidden select-none"
        style={{
          background:
            'linear-gradient(140deg, rgba(234, 241, 245, 0.25) 0%, rgba(199, 211, 189, 0.84) 18%, rgba(156, 175, 136, 0.76) 50%, rgba(117, 137, 106, 0.70) 100%)',
          backdropFilter: 'blur(26px) saturate(110%)',
          WebkitBackdropFilter: 'blur(26px) saturate(110%)',
          border: '1px solid rgba(234, 241, 245, 0.50)',
          boxShadow: [
            '0 24px 50px -12px rgba(28, 40, 22, 0.22)',
            '0 10px 24px -8px rgba(28, 40, 22, 0.14)',
            'inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.75)',
            'inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.45)',
            'inset 0 -3px 6px 0 rgba(65, 82, 54, 0.38)',
            'inset -2px 0 5px 0 rgba(65, 82, 54, 0.25)',
            'inset 0 0 28px 0 rgba(199, 211, 189, 0.30)',
          ].join(', '),
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Architectural 3-5px Thick Glass Edge Simulation Rim with glacial reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1px solid rgba(234, 241, 245, 0.35)',
            boxShadow: 'inset 0 0 0 1px rgba(201, 217, 226, 0.18)',
          }}
        />

        {/* Soft Cloudy Internal Diffusion Mist with gentle glacier undertone */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 249, 252, 0.35) 0%, rgba(220, 231, 237, 0.14) 30%, rgba(156, 175, 136, 0.14) 65%, transparent 100%)',
          }}
        />

        {/* Ambient Corner Occlusion Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#C7D3BD]/35 blur-3xl z-0" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#75896A]/28 blur-3xl z-0" />

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
            className="text-3xl sm:text-4xl lg:text-[44px] xl:text-[46px] font-extrabold tracking-[-0.035em] text-[#151A15] leading-[1.12]"
          >
            Your preparation deserves more than guesswork.
          </h1>

          {/* Value Proposition Description (translateZ: 10px) */}
          <p
            style={{ transform: 'translateZ(10px)' }}
            className="text-sm sm:text-base text-[#455044] font-medium leading-relaxed max-w-xl"
          >
            Practice curated examination papers, attempt timed tests, evaluate your performance, and understand where you stand.
          </p>

          {/* Action Buttons (translateZ: 20px) */}
          <div
            style={{ transform: 'translateZ(20px)' }}
            className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4"
          >
            {/* Primary Action Button: Solid Dark Pill */}
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151A15] text-white px-7 sm:px-8 h-12 text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Practice</span>
              <span className="font-mono text-xs">↗</span>
            </button>

            {/* Secondary Button: Luminous Frosted Glass Pill matching Section 3 */}
            <a
              href="#examinations"
              className="inline-flex items-center justify-center gap-1.5 rounded-full border border-white/60 bg-white/45 px-6 sm:px-7 h-12 text-xs sm:text-sm font-bold text-[#151A15] shadow-xs backdrop-blur-sm hover:bg-white/70 hover:border-[#DCE7ED]/80 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explore Exams</span>
              <ChevronRight className="h-4 w-4 text-[#455044]" />
            </a>
          </div>
        </div>

        {/* Focus Examinations Track (translateZ: 12px) */}
        <div
          style={{
            transform: 'translateZ(12px)',
            transformStyle: 'preserve-3d',
          }}
          className="pt-8 sm:pt-10 border-t border-[#75896A]/25 relative z-20 mt-6 sm:mt-8"
        >
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#455044] mb-3">
            Focus Examinations
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
            {focusExams.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                className="group flex items-center gap-1 rounded-full border border-white/60 bg-white/45 px-4 py-1.5 text-xs font-bold text-[#151A15] shadow-xs backdrop-blur-sm transition-all hover:border-[#DCE7ED]/80 hover:bg-white/75 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans uppercase tracking-wider">{exam.name}</span>
                <ChevronRight className="h-3.5 w-3.5 text-[#455044] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-[#151A15]" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CursorTiltCard>
  );
}

export default HeroPreparationCard;
