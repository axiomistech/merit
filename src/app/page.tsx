'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { TutorialVideoConfig } from '@/types/admin';
import { HeroPreparationCard } from '@/components/home/HeroPreparationCard';
import { FlippableMeritwiseCard } from '@/components/home/FlippableMeritwiseCard';
import { ExaminationCard3D, ExaminationCardData } from '@/components/home/ExaminationCard3D';
import { NeetOmrBackground } from '@/components/home/NeetOmrBackground';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export default function HomePage() {
  const router = useRouter();

  // Tutorial Video configuration (admin-managed via CMS)
  const [tutorialVideoConfig, setTutorialVideoConfig] = useState<TutorialVideoConfig | undefined>(undefined);

  useEffect(() => {
    fetch('/api/cms/tutorial-video')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.config) {
          setTutorialVideoConfig(res.config);
        }
      })
      .catch(() => {});
  }, []);

  // Primary Gateway: Direct to dashboard if logged in, or login/register if not
  const handleStartPractice = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const session =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login?redirect=/dashboard');
      }
    }
  };

  // 4 Primary Examination Categories
  const primaryExams: ExaminationCardData[] = [
    {
      id: 'neet',
      slug: 'neet',
      name: 'NEET',
      category: 'Medical Entrance',
      duration: '200 Minutes',
      marks: '720 Marks',
    },
    {
      id: 'jee-main',
      slug: 'jee-main',
      name: 'JEE Main',
      category: 'Engineering Entrance',
      duration: '180 Minutes',
      marks: '300 Marks',
    },
    {
      id: 'jee-advanced',
      slug: 'jee-advanced',
      name: 'JEE Advanced',
      category: 'Engineering Entrance',
      duration: '180 Minutes',
      marks: '300 / 360 Marks',
    },
    {
      id: 'gate',
      slug: 'gate',
      name: 'GATE',
      category: 'Engineering PG',
      duration: '180 Minutes',
      marks: '100 Marks',
    },
  ];

  return (
    <div className="relative min-h-screen bg-[#111214] text-[#F5F5F5] overflow-x-hidden selection:bg-[#C6A052]/30 selection:text-white">
      {/* ==================================================================== */}
      {/* 1. HERO SECTION — CINEMATIC MATTE BLACK GLASSMORPHISM WITH OMR CANVAS */}
      {/* ==================================================================== */}
      <section className="relative isolate overflow-hidden pt-28 sm:pt-32 pb-16 lg:pb-24">
        {/* Layered Straight 2D Grayscale NEET OMR Blueprint Background */}
        <NeetOmrBackground />

        {/* Hero Cards Container */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-2 items-stretch">
            {/* Card 1 — Examination Preparation Deserves More Than Guesswork */}
            <HeroPreparationCard onStartPractice={handleStartPractice} />

            {/* Card 2 — Double-Sided 3D Card: Heading & Native Video Player / Journey Guide */}
            <FlippableMeritwiseCard
              tutorialVideo={tutorialVideoConfig}
              onStartPractice={handleStartPractice}
            />
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. STRICTLY FOUR EXAMINATION CATEGORIES (PREMIUM 3D GLASSMORPHISM)    */}
      {/* ==================================================================== */}
      <section id="examinations" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#F5F5F5]">
            Focused preparation for serious candidates.
          </h2>
          <p className="text-sm text-[#B8B8BC]">
            Four core examination categories. Each built around its official format, marking rules, and duration.
          </p>
        </div>

        {/* 4 Interactive 3D Glassmorphism Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 items-stretch">
          {primaryExams.map((exam) => (
            <ExaminationCard3D
              key={exam.id}
              exam={exam}
              onStartPractice={handleStartPractice}
            />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. HOW IT WORKS (FOUR SIMPLE STEPS) — 3D MATTE CHARCOAL GLASS SLAB   */}
      {/* ==================================================================== */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-[32px] px-6 sm:px-10 lg:px-12 pt-8 sm:pt-10 lg:pt-12 pb-6 sm:pb-7 lg:pb-8 flex flex-col gap-8 sm:gap-10 overflow-hidden select-none transition-all"
          style={{
            background:
              'linear-gradient(145deg, rgba(38, 42, 48, 0.72) 0%, rgba(20, 23, 27, 0.84) 50%, rgba(14, 16, 19, 0.92) 100%)',
            backdropFilter: 'blur(26px) saturate(110%)',
            WebkitBackdropFilter: 'blur(26px) saturate(110%)',
            border: '1px solid rgba(255, 255, 255, 0.18)',
            boxShadow:
              '0 24px 55px rgba(0, 0, 0, 0.50), 0 8px 20px rgba(0, 0, 0, 0.35), inset 0 1.5px 2px 0 rgba(255, 255, 255, 0.60), inset 0 -2.5px 5px 0 rgba(0, 0, 0, 0.45)',
          }}
        >
          {/* Architectural 3D Glass Edge Simulation Rim */}
          <div
            className="pointer-events-none absolute inset-0 !m-0 rounded-[inherit] z-10"
            style={{
              border: '1px solid rgba(255, 255, 255, 0.14)',
              boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.06)',
            }}
          />

          {/* Soft Cloudy Internal Diffusion Mist */}
          <div
            className="pointer-events-none absolute inset-0 !m-0 rounded-[inherit] z-0 overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(255, 255, 255, 0.14) 0%, rgba(255, 255, 255, 0.03) 40%, transparent 100%)',
            }}
          />

          {/* Ambient Occlusion Corner Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-white/[0.03] blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-black/50 blur-3xl z-0" />

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-3 relative z-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#F5F5F5] tracking-tight">
              Four steps from preparation to progress.
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B8BC] font-medium leading-relaxed max-w-4xl mx-auto md:whitespace-nowrap">
              A disciplined, distraction-free path to test your knowledge and eliminate recurring weaknesses.
            </p>
          </div>

          {/* 4 Process Steps */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4 relative z-20">
            {[
              {
                step: '01',
                title: 'Create your account',
                description:
                  'Register with your verified email to receive your unique student identifier and claim your complimentary initial paper unlock.',
              },
              {
                step: '02',
                title: 'Choose your examination',
                description:
                  'Select your target discipline — NEET, JEE Main, JEE Advanced, or GATE. Access structured curricula and official blueprints.',
              },
              {
                step: '03',
                title: 'Unlock and attempt papers',
                description:
                  'Take authentic examination papers under real exam conditions with server-synchronized timing and instant OMR response capture.',
              },
              {
                step: '04',
                title: 'Track performance and improve',
                description:
                  'Review detailed solutions, identify question-level inaccuracies, download your vector A4 OMR sheet, and focus your next attempt.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="space-y-3 rounded-2xl border border-white/12 bg-white/[0.04] p-6 shadow-xs backdrop-blur-sm transition-all hover:bg-white/[0.08] hover:border-white/25 hover:scale-[1.01]"
              >
                <div className="font-mono text-2xl font-black text-[#F5F5F5] bg-white/10 inline-flex items-center justify-center px-3 py-0.5 rounded-xl border border-white/15 shadow-xs">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[#F5F5F5]">{item.title}</h3>
                <p className="text-xs text-[#B8B8BC] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 relative z-20">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#F5F5F5]">
              <MeritwiseLogo variant="gold" size="xs" showWordmark={false} />
              <span>Every attempt counts. Measure your progress with MERITWISE.</span>
            </div>
            <button
              type="button"
              onClick={handleStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white text-black px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-neutral-100 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Begin Now</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 4. BRAND STATEMENT / FINAL CTA BANNER                                */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="rounded-[32px] p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8 border border-white/15"
          style={{
            background:
              'linear-gradient(145deg, rgba(35, 38, 44, 0.85) 0%, rgba(18, 20, 24, 0.95) 100%)',
            boxShadow: '0 24px 55px rgba(0,0,0,0.60), inset 0 1px 2px rgba(255,255,255,0.2)',
          }}
        >
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2.5">
              <MeritwiseLogo variant="white" size="xs" showWordmark={false} />
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C6A052]">
                PROGRESS WITH MERIT
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
              Begin practicing with authentic examination papers.
            </h2>
            <p className="text-xs sm:text-sm text-[#B8B8BC] leading-relaxed">
              Create your account to unlock your first full examination paper free. Track your progress across every attempt.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-white text-black px-8 py-3.5 text-xs font-extrabold uppercase tracking-wider shadow-lg transition-transform hover:bg-neutral-100 hover:scale-[1.02] shrink-0 active:scale-[0.98]"
          >
            Start Practice ↗
          </button>
        </div>
      </section>
    </div>
  );
}
