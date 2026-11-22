'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight } from 'lucide-react';
import { TutorialVideoConfig } from '@/types/admin';
import { HeroPreparationCard } from '@/components/home/HeroPreparationCard';
import { FlippableMeritwiseCard } from '@/components/home/FlippableMeritwiseCard';
import { ExaminationCard3D, ExaminationCardData } from '@/components/home/ExaminationCard3D';
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

  // 4 Primary Examination Categories (Ultra-Minimal)
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
      id: 'jee',
      slug: 'jee-main',
      name: 'JEE',
      category: 'Engineering Entrance',
      duration: '180 Minutes',
      marks: '300 / 360 Marks',
    },
    {
      id: 'upsc',
      slug: 'upsc',
      name: 'UPSC',
      category: 'Civil Services',
      duration: '120 Mins / Paper',
      marks: '200 Marks / Paper',
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

  // Fully Opaque Atmospheric Canvas Style
  // Subtle glacier-blue matte fog is blended directly into the actual rendered surface of the off-white background
  const homepageAtmosphericStyle: React.CSSProperties = {
    backgroundColor: '#F8FAF6',
    backgroundImage: [
      // 1. Upper-Right & Framing Tutorial Area: Noticeable, soft matte glacier-blue fog (Glacial Shadow #C9D9E2 & Frost Blue #DCE7ED)
      'radial-gradient(ellipse 1150px 800px at 86% 10%, rgba(201, 217, 226, 0.72) 0%, rgba(220, 231, 237, 0.50) 32%, rgba(234, 241, 245, 0.28) 60%, transparent 84%)',
      // 2. Middle-Left & Negative Space: Organic cool glacier mist haze
      'radial-gradient(ellipse 1000px 720px at 6% 36%, rgba(201, 217, 226, 0.52) 0%, rgba(220, 231, 237, 0.35) 34%, rgba(234, 241, 245, 0.18) 62%, transparent 82%)',
      // 3. Lower Sections (Lower-Right & Lower-Middle): Subtle cool haze grounding the layout
      'radial-gradient(ellipse 1250px 880px at 82% 72%, rgba(220, 231, 237, 0.48) 0%, rgba(201, 217, 226, 0.34) 36%, rgba(234, 241, 245, 0.20) 64%, transparent 85%)',
      // 4. Subtle Lower-Left Negative Space: Faint cool morning mist
      'radial-gradient(ellipse 950px 680px at 12% 88%, rgba(220, 231, 237, 0.40) 0%, rgba(201, 217, 226, 0.24) 38%, transparent 80%)',
      // 5. Central / Left Ambient Sage Transition: Harmonious bridge between sage cards and canvas
      'radial-gradient(ellipse 850px 600px at 32% 18%, rgba(156, 175, 136, 0.18) 0%, rgba(220, 231, 237, 0.14) 48%, transparent 78%)',
    ].join(', '),
    backgroundRepeat: 'no-repeat',
  };

  return (
    <div
      className="relative min-h-screen text-[#151A15] overflow-x-hidden"
      style={homepageAtmosphericStyle}
    >
      {/* ==================================================================== */}
      {/* 1. HERO SECTION — REALISTIC 3D MATTE SAGE GLASS HERO CARDS           */}
      {/* ==================================================================== */}
      <section className="relative mx-auto max-w-7xl px-4 pt-8 pb-16 sm:px-6 lg:px-8 lg:pt-12 lg:pb-24">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 items-stretch">
          {/* Card 1 — Examination Preparation */}
          <HeroPreparationCard onStartPractice={handleStartPractice} />

          {/* Card 2 — Double-Sided 3D Card: Complete Student Journey & Video Demo */}
          <FlippableMeritwiseCard
            tutorialVideo={tutorialVideoConfig}
            onStartPractice={handleStartPractice}
          />
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 2. STRICTLY FOUR EXAMINATION CATEGORIES (PREMIUM 3D GLASSMORPHISM)    */}
      {/* ==================================================================== */}
      <section id="examinations" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
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
            <ExaminationCard3D
              key={exam.id}
              exam={exam}
              onStartPractice={handleStartPractice}
            />
          ))}
        </div>
      </section>

      {/* ==================================================================== */}
      {/* 3. HOW IT WORKS (FOUR SIMPLE STEPS) — 3D MATTE SAGE GLASS SLAB       */}
      {/* ==================================================================== */}
      <section id="how-it-works" className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div
          className="relative rounded-[28px] sm:rounded-[32px] p-8 sm:p-12 lg:p-16 space-y-12 overflow-hidden select-none transition-all"
          style={{
            // Layered Translucent Sage Gradients with subtle frost daylight highlight
            background:
              'linear-gradient(140deg, rgba(234, 241, 245, 0.20) 0%, rgba(199, 211, 189, 0.82) 18%, rgba(156, 175, 136, 0.74) 50%, rgba(117, 137, 106, 0.68) 100%)',
            backdropFilter: 'blur(24px) saturate(108%)',
            WebkitBackdropFilter: 'blur(24px) saturate(108%)',
            border: '1px solid rgba(234, 241, 245, 0.45)',
            // 3-5px Solid Glass Slab Edge Lighting & Inset Shading with faint glacial bevel reflections
            boxShadow:
              '0 24px 50px -12px rgba(28, 40, 22, 0.20), 0 10px 24px -8px rgba(28, 40, 22, 0.12), inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.65), inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.35), inset 0 -3px 6px 0 rgba(65, 82, 54, 0.40), inset -2px 0 5px 0 rgba(65, 82, 54, 0.25), inset 0 0 28px 0 rgba(199, 211, 189, 0.28)',
          }}
        >
          {/* Architectural 3-5px Thick Glass Edge Simulation Rim with faint glacial reflection */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-10"
            style={{
              border: '1px solid rgba(234, 241, 245, 0.30)',
              boxShadow: 'inset 0 0 0 1px rgba(201, 217, 226, 0.15)',
            }}
          />

          {/* Soft Cloudy Internal Diffusion Mist with gentle glacier undertone */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[inherit] z-0 overflow-hidden"
            style={{
              background:
                'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(245, 249, 252, 0.32) 0%, rgba(220, 231, 237, 0.12) 30%, rgba(156, 175, 136, 0.12) 65%, transparent 100%)',
            }}
          />

          {/* Ambient Occlusion Corner Glows */}
          <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-[#C7D3BD]/30 blur-3xl z-0" />
          <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[#75896A]/25 blur-3xl z-0" />

          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center space-y-3 relative z-20">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#151A15] tracking-tight">
              Four steps from preparation to progress.
            </h2>
            <p className="text-xs sm:text-sm text-[#455044] font-medium leading-relaxed max-w-4xl mx-auto md:whitespace-nowrap">
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
                  'Select your target discipline — NEET, JEE, UPSC, or GATE. Access structured curricula and official blueprints.',
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
                className="space-y-3 rounded-2xl border border-white/60 bg-white/45 p-6 shadow-xs backdrop-blur-sm transition-all hover:bg-white/70 hover:border-[#DCE7ED]/80 hover:scale-[1.01]"
              >
                <div className="font-mono text-2xl font-black text-[#151A15] bg-[#75896A]/20 inline-flex items-center justify-center px-3 py-0.5 rounded-xl border border-white/40 shadow-xs">
                  {item.step}
                </div>
                <h3 className="text-base font-bold text-[#151A15]">{item.title}</h3>
                <p className="text-xs text-[#455044] leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Footer Action Bar */}
          <div className="pt-6 border-t border-[#75896A]/25 flex flex-wrap items-center justify-between gap-4 relative z-20">
            <div className="flex items-center gap-2.5 text-xs sm:text-sm font-semibold text-[#151A15]">
              <MeritwiseLogo variant="gold" size="xs" showWordmark={false} />
              <span>Every attempt counts. Measure your progress with MERITWISE.</span>
            </div>
            <button
              type="button"
              onClick={handleStartPractice}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-[#151A15] text-white px-7 py-3 text-xs font-bold uppercase tracking-wider shadow-lg hover:bg-[#232923] transition-all hover:scale-[1.02] active:scale-[0.98]"
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
        <div className="rounded-[32px] bg-[#121316] text-white p-8 sm:p-12 lg:p-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="space-y-4 max-w-xl">
            <div className="flex items-center gap-2.5">
              <MeritwiseLogo variant="white" size="xs" showWordmark={false} />
              <div className="text-[11px] font-bold uppercase tracking-widest text-[#C09A52]">
                PROGRESS WITH MERIT
              </div>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight !text-white leading-tight">
              Begin practicing with authentic examination papers.
            </h2>
            <p className="text-xs sm:text-sm text-[#A1A1AA] leading-relaxed">
              Create your account to unlock your first full examination paper free. Track your progress across every attempt.
            </p>
          </div>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-white text-[#121316] px-8 py-3.5 text-xs font-bold uppercase tracking-wider shadow-lg transition-transform hover:scale-[1.02] shrink-0 active:scale-[0.98]"
          >
            Start Practice ↗
          </button>
        </div>
      </section>
    </div>
  );
}
