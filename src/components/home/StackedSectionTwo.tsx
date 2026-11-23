'use client';

import React, { useRef, useEffect } from 'react';
import { ExaminationCard3D, ExaminationCardData } from './ExaminationCard3D';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface StackedSectionTwoProps {
  primaryExams: ExaminationCardData[];
  onStartPractice: (e: React.MouseEvent) => void;
}

export function StackedSectionTwo({ primaryExams, onStartPractice }: StackedSectionTwoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Create master scroll-synchronized scrub timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // when top of wrapper enters the bottom of the viewport
          end: 'top 22%', // when top of wrapper reaches upper 22% of viewport
          scrub: 1, // smooth reversible scrub linked to scrollbar
        },
      });

      // 1. Panel Tilt-In and Stacking:
      // Starts tilted backward at rotateX: 8deg, y: 100px, scale: 0.94
      // Straightens to rotateX: 0deg, y: 0px, scale: 1
      tl.fromTo(
        panelRef.current,
        {
          rotateX: 8,
          y: 100,
          scale: 0.94,
          transformOrigin: 'center top',
        },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          ease: 'power2.out',
          duration: 1,
        }
      );

      // 2. Subtle staggered entrance for the 4 examination cards
      if (cardsRef.current) {
        const cardElements = cardsRef.current.children;
        tl.fromTo(
          cardElements,
          {
            y: 36,
            opacity: 0.15,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.09,
            ease: 'power1.out',
            duration: 0.8,
          },
          '-=0.35' // overlap smoothly as panel finishes settling
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 w-full -mt-14 sm:-mt-18 lg:-mt-22 pointer-events-auto"
      style={{
        perspective: '1200px',
      }}
    >
      {/* 3D Tilting & Stacking Floating Panel */}
      <section
        ref={panelRef}
        id="examinations"
        className="relative w-full rounded-t-[32px] sm:rounded-t-[44px] lg:rounded-t-[54px] bg-[#F8FAF6] pt-14 sm:pt-18 pb-16 sm:pb-20 shadow-[0_-24px_55px_-12px_rgba(0,0,0,0.18),0_-1px_2px_rgba(255,255,255,0.7)_inset]"
        style={{
          transformOrigin: 'center top',
          transformStyle: 'preserve-3d',
          willChange: 'transform',
        }}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#121316]">
              Focused preparation for serious candidates.
            </h2>
            <p className="text-sm text-[#52525B]">
              Four core examination categories. Each built around its official format, marking rules, and duration.
            </p>
          </div>

          {/* 4 Interactive 3D Glassmorphism Cards with Staggered Entrance */}
          <div
            ref={cardsRef}
            className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch"
          >
            {primaryExams.map((exam) => (
              <div key={exam.id} className="h-full">
                <ExaminationCard3D
                  exam={exam}
                  onStartPractice={onStartPractice}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default StackedSectionTwo;
