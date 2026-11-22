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
    { name: 'JEE', href: '/jee-main' },
    { name: 'UPSC', href: '/upsc' },
    { name: 'GATE', href: '/gate' },
  ];

  return (
    <CursorTiltCard
      className={className}
      maxTilt={6}
      hoverLift={6}
      perspective={1200}
    >
      {/* ==================================================================== */}
      {/* 3D MATTE SAGE FROSTED GLASS SLAB                                     */}
      {/* ==================================================================== */}
      <div
        className="relative h-full flex flex-col justify-between rounded-[28px] sm:rounded-[32px] p-7 sm:p-10 lg:p-11 transition-all overflow-hidden select-none"
        style={{
          // Layered Translucent Sage Gradients (Primary: #9CAF88, Deep: #75896A, Light: #C7D3BD)
          background:
            'linear-gradient(140deg, rgba(199, 211, 189, 0.82) 0%, rgba(156, 175, 136, 0.74) 48%, rgba(117, 137, 106, 0.68) 100%)',
          backdropFilter: 'blur(24px) saturate(110%)',
          WebkitBackdropFilter: 'blur(24px) saturate(110%)',
          border: '1px solid rgba(201, 217, 226, 0.45)',
          // 3-5px Solid Glass Slab Edge Lighting with faint glacial daylight reflection
          boxShadow:
            'inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.75), inset 1.5px 0 2px 0 rgba(201, 217, 226, 0.45), inset 0 -3px 6px 0 rgba(65, 82, 54, 0.40), inset -2px 0 5px 0 rgba(65, 82, 54, 0.25), inset 0 0 28px 0 rgba(199, 211, 189, 0.30)',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Architectural 3-5px Thick Glass Edge Simulation Rim with faint daylight bevel */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
          style={{
            border: '1px solid rgba(201, 217, 226, 0.35)',
            boxShadow: 'inset 0 0 0 1px rgba(117, 137, 106, 0.18)',
          }}
        />

        {/* Soft Cloudy Internal Diffusion Mist with faint glacier mist */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
          style={{
            background:
              'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 249, 252, 0.30) 0%, rgba(220, 231, 237, 0.10) 30%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
          }}
        />

        {/* Ambient Occlusion Corner Glows */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-56 w-56 rounded-full bg-[#EAF1F5]/30 blur-3xl z-0" />
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-56 w-56 rounded-full bg-[#75896A]/25 blur-3xl z-0" />

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
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-[-0.035em] text-[#151A15] leading-[1.1]"
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
            {/* Primary Action Button: Solid Black */}
            <button
              type="button"
              onClick={onStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151A15] text-white px-7 sm:px-8 h-12 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Start Practice</span>
              <span className="font-mono text-xs">↗</span>
            </button>

            {/* Restrained Sage-Themed Secondary Button */}
            <a
              href="#examinations"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/60 bg-white/55 px-6 sm:px-7 h-12 text-xs sm:text-sm font-semibold text-[#151A15] shadow-xs backdrop-blur-sm hover:bg-white/80 hover:border-[#151A15]/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
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
          <div className="flex flex-wrap items-center gap-2">
            {focusExams.map((exam) => (
              <Link
                key={exam.name}
                href={exam.href}
                className="group flex items-center gap-1.5 rounded-full border border-white/60 bg-white/65 px-4 py-1.5 text-xs font-bold text-[#151A15] shadow-xs backdrop-blur-sm transition-all hover:border-[#151A15] hover:bg-white/90 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-sans uppercase tracking-wider">{exam.name}</span>
                <span className="font-mono text-[10px] text-[#455044] transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#151A15]">
                  ↗
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </CursorTiltCard>
  );
}

export default HeroPreparationCard;
