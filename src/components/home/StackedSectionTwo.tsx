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

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Dedicated scroll-synchronized 3D stacking timeline
      // Section 1 remains stationary briefly while Section 2 begins approaching from below
      // Section 2 enters with rotateX: 10deg, scale: 0.94, y: 120px
      // As scrolling continues, Section 2 straightens to 0deg, scales to 1, and settles seamlessly
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top bottom', // Begins when Section 2 top touches viewport bottom
          end: 'top top', // Completes when Section 2 reaches top of viewport
          scrub: 1, // Smooth, direct scrollbar synchronization
          invalidateOnRefresh: true,
        },
      });

      // Animate ONLY the Section 2 panel itself as one solid physical slab
      tl.fromTo(
        panelRef.current,
        {
          rotateX: 10,
          scale: 0.94,
          y: 120,
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          boxShadow: '0 -28px 65px -15px rgba(0, 0, 0, 0.45), 0 -8px 24px -6px rgba(0, 0, 0, 0.25)',
          transformOrigin: 'center top',
        },
        {
          rotateX: 0,
          scale: 1,
          y: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          boxShadow: '0 0px 0px 0px rgba(0, 0, 0, 0)',
          ease: 'power2.out',
          duration: 1,
        }
      );

      ScrollTrigger.refresh();
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative z-20 w-full pointer-events-auto"
      style={{
        perspective: '1100px',
      }}
    >
      {/* 3D Tilting & Stacking Floating Panel */}
      <section
        ref={panelRef}
        id="examinations"
        className="relative w-full bg-[#F8FAF6] pt-16 sm:pt-20 pb-20 sm:pb-24"
        style={{
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          transformOrigin: 'center top',
          transformStyle: 'preserve-3d',
          boxShadow: '0 -28px 65px -15px rgba(0, 0, 0, 0.45), 0 -8px 24px -6px rgba(0, 0, 0, 0.25)',
          willChange: 'transform, border-radius, box-shadow',
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

          {/* 4 Interactive 3D Glassmorphism Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
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
