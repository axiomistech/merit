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
        opacity: 0.18,
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
        background:
          'linear-gradient(145deg, rgba(38, 42, 48, 0.72) 0%, rgba(20, 23, 27, 0.84) 100%)',
        backdropFilter: 'blur(22px) saturate(110%)',
        WebkitBackdropFilter: 'blur(22px) saturate(110%)',
        border: '1px solid rgba(255, 255, 255, 0.18)',
        boxShadow:
          '0 18px 40px -10px rgba(0, 0, 0, 0.55), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.55), inset 0 -1.5px 3px 0 rgba(0, 0, 0, 0.40)',
      }}
      className={cn(
        'group relative h-full min-h-[240px] flex flex-col justify-between rounded-[24px] p-6 sm:p-7 transition-all overflow-hidden select-none hover:border-white/35',
        className
      )}
    >
      {/* Specular Light Reflection Layer */}
      {!reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: specular.opacity,
            background: `radial-gradient(circle 300px at ${specular.x}% ${specular.y}%, rgba(255, 255, 255, 0.30), rgba(255, 255, 255, 0.08) 40%, transparent 80%)`,
          }}
        />
      )}

      {/* Subtle Ambient Accent Glow */}
      <div className="pointer-events-none absolute -top-16 -right-16 h-36 w-36 rounded-full bg-[#C6A052]/10 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-white/[0.03] blur-2xl" />

      {/* Top Section: Category & Acronym + Essential Metadata */}
      <div className="relative z-10 space-y-4">
        {/* Short Category & Exam Acronym */}
        <div className="space-y-1">
          <div className="text-[11px] font-bold uppercase tracking-wider text-[#C6A052]">
            {exam.category}
          </div>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-[#F5F5F5] tracking-tight group-hover:text-[#C6A052] transition-colors leading-none">
            {exam.name}
          </h3>
        </div>

        {/* Essential Metadata: Duration & Max Marks */}
        <div className="flex items-center gap-2 text-xs text-[#B8B8BC]">
          <span className="inline-flex items-center gap-1.5 font-medium text-[#B8B8BC]">
            <Clock className="h-3.5 w-3.5 text-[#C6A052]" />
            <span>{exam.duration}</span>
          </span>
          <span className="text-white/20">•</span>
          <span className="font-semibold text-white">
            {exam.marks}
          </span>
        </div>
      </div>

      {/* Footer Actions — Bottom Aligned */}
      <div className="pt-5 border-t border-white/10 flex items-center justify-between gap-2 relative z-10 mt-auto">
        <Link
          href={`/${exam.slug}`}
          className="inline-flex items-center gap-1 text-xs font-bold text-[#F5F5F5] hover:text-[#C6A052] transition-colors group/link py-1"
        >
          <span>Explore {exam.name}</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover/link:translate-x-1 text-[#C6A052]" />
        </Link>

        <button
          type="button"
          onClick={onStartPractice}
          className="rounded-full bg-white px-4 py-2 text-xs font-bold uppercase tracking-wider text-black shadow-sm transition-all hover:bg-neutral-100 hover:scale-[1.03] active:scale-[0.98] shrink-0"
        >
          Start Practice ↗
        </button>
      </div>
    </div>
  );
}

export default ExaminationCard3D;
