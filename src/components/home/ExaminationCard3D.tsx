'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ExaminationCardData {
  id: string;
  slug: string;
  name: string;
  category: string;
  duration: string;
  marks: string;
}

export interface ExaminationCard3DProps {
  exam: ExaminationCardData;
  onStartPractice: (e: React.MouseEvent) => void;
  className?: string;
}

export function ExaminationCard3D({ exam, onStartPractice, className }: ExaminationCard3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [specular, setSpecular] = useState({ x: 50, y: 50, opacity: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);
      const listener = () => setReducedMotion(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Subtle 4.5-degree maximum tilt
      const rotateX = ((y - centerY) / centerY) * -4.5;
      const rotateY = ((x - centerX) / centerX) * 4.5;

      setCoords({ x: rotateX, y: rotateY });
      setSpecular({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
        opacity: 0.16,
      });
    },
    [reducedMotion]
  );

  const handleMouseEnter = () => {
    if (reducedMotion) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
    setSpecular((prev) => ({ ...prev, opacity: 0 }));
  };

  const transformStyle =
    !reducedMotion && isHovered
      ? `perspective(1200px) rotateX(${coords.x.toFixed(2)}deg) rotateY(${coords.y.toFixed(2)}deg) translateY(-5px)`
      : `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)`;

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: transformStyle,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.22, 1, 0.36, 1)'
          : 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
        willChange: 'transform',
      }}
      className={cn(
        'group relative h-full min-h-0 sm:min-h-[220px] lg:min-h-[240px] flex flex-col justify-between rounded-[20px] sm:rounded-[22px] border border-white/85 bg-white/80 p-5 sm:p-6 lg:p-7 shadow-[0_8px_24px_rgba(0,0,0,0.04),_0_1px_3px_rgba(0,0,0,0.02)] ring-1 ring-[#E4E4DF]/70 backdrop-blur-[20px] transition-all overflow-hidden select-none hover:border-white hover:ring-[#8C6D3B]/30 hover:shadow-[0_14px_32px_rgba(0,0,0,0.06),_0_2px_8px_rgba(140,109,59,0.05)]',
        className
      )}
    >
      {/* Specular Light Reflection Layer with faint frost daylight */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: specular.opacity,
            background: `radial-gradient(circle 300px at ${specular.x}% ${specular.y}%, rgba(245, 250, 253, 0.55), rgba(220, 231, 237, 0.15) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Ambient Accent Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-[#8C6D3B]/5 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-[#DCE7ED]/55 blur-2xl" />

      {/* Top Section: Category & Acronym + Essential Metadata */}
      <div className="relative z-10 space-y-3 sm:space-y-4">
        {/* Short Category & Exam Acronym */}
        <div className="space-y-1">
          <div className="text-[10px] xs:text-[11px] font-bold uppercase tracking-wider text-[#8C6D3B]">
            {exam.category}
          </div>
          <h3 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold text-[#121316] tracking-tight group-hover:text-[#8C6D3B] transition-colors leading-none">
            {exam.name}
          </h3>
        </div>

        {/* Essential Metadata: Duration & Max Marks */}
        <div className="flex items-center gap-2 text-xs text-[#52525B]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#71717A]">
            <Clock className="h-3.5 w-3.5 text-[#8C6D3B]" />
            <span>{exam.duration}</span>
          </span>
          <span className="text-[#D4D4CE]">•</span>
          <span className="font-semibold text-[#121316]">
            {exam.marks}
          </span>
        </div>
      </div>

      {/* Footer Actions — Bottom Aligned */}
      <div className="pt-4 sm:pt-5 border-t border-[#E4E4DF]/70 flex flex-wrap sm:flex-nowrap items-center justify-between gap-2.5 relative z-10 mt-4 sm:mt-auto">
        <Link
          href={`/${exam.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors group/link py-1"
        >
          <span>Explore {exam.name}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/link:translate-x-1 text-[#8C6D3B]" />
        </Link>

        <button
          type="button"
          onClick={onStartPractice}
          className="rounded-full bg-[#121316] px-4 py-2 sm:py-2 text-xs font-bold text-white shadow-sm transition-all hover:bg-[#27272A] hover:scale-[1.03] active:scale-[0.98] shrink-0"
        >
          Start Practice ↗
        </button>
      </div>
    </div>
  );
}

export default ExaminationCard3D;
