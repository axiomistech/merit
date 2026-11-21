'use client';

import React, { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Layers,
  ChevronRight,
  Clock,
  Play,
  CheckCircle2,
  FileText,
} from 'lucide-react';
import { TestConfigurationModal } from '@/components/exam/TestConfigurationModal';

export default function SubjectPracticePage() {
  const params = useParams();
  const router = useRouter();
  const examSlug = (params?.exam as string) || 'neet';
  const subjectSlug = (params?.subject as string) || 'physics';

  const [modalConfig, setModalConfig] = useState<{
    isOpen: boolean;
    chapterName: string;
    questionCount: number;
    durationMinutes: number;
  }>({
    isOpen: false,
    chapterName: '',
    questionCount: 30,
    durationMinutes: 30,
  });

  const chapters = [
    {
      slug: 'laws-of-motion',
      name: 'Laws of Motion & Friction',
      questions: 45,
      duration: 45,
      level: 'High Yield',
      topics: ['First & Second Laws', 'Static & Kinetic Friction', 'Circular Dynamics'],
    },
    {
      slug: 'work-energy-power',
      name: 'Work, Energy and Power',
      questions: 40,
      duration: 40,
      level: 'Core Principle',
      topics: ['Work-Energy Theorem', 'Conservation of Energy', 'Collisions in 1D & 2D'],
    },
    {
      slug: 'rotational-motion',
      name: 'System of Particles & Rotational Motion',
      questions: 35,
      duration: 45,
      level: 'Advanced',
      topics: ['Center of Mass', 'Moment of Inertia', 'Torque & Angular Momentum'],
    },
    {
      slug: 'gravitation',
      name: 'Gravitation & Satellite Motion',
      questions: 30,
      duration: 30,
      level: 'Standard',
      topics: ["Newton's Law of Gravitation", 'Escape Velocity', 'Keplerian Orbits'],
    },
  ];

  const handleOpenTestModal = (chapter: (typeof chapters)[0]) => {
    setModalConfig({
      isOpen: true,
      chapterName: chapter.name,
      questionCount: chapter.questions,
      durationMinutes: chapter.duration,
    });
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/practice" className="hover:text-[#20252B]">Practice</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/practice/${examSlug}`} className="hover:text-[#20252B] uppercase">{examSlug}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B] capitalize">{subjectSlug}</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold font-sans text-[#20252B] capitalize">
            {subjectSlug} Chapters
          </h1>
          <p className="mt-1 text-sm text-[#66727D]">
            Practice concept by concept with KaTeX mathematical rendering and authentic 15-second timer standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {chapters.map((chap) => (
            <div
              key={chap.slug}
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-4 hover:border-[#9CC6E0] transition-all"
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F1F3F4] text-[#52584E] border border-[#DCE2E6]">
                    {chap.level}
                  </span>
                  <span className="text-[#66727D] font-mono text-[11px]">{chap.questions} Questions</span>
                </div>
                <h3 className="font-bold text-base text-[#20252B]">{chap.name}</h3>

                <div className="mt-3 space-y-1 text-xs text-[#66727D]">
                  {chap.topics.map((t, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9CC6E0]" />
                      <span>{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-[#DCE2E6] flex items-center justify-between">
                <Link
                  href={`/practice/${examSlug}/${subjectSlug}/${chap.slug}`}
                  className="text-xs font-semibold text-[#52584E] hover:text-[#20252B]"
                >
                  Topic View
                </Link>
                <button
                  onClick={() => handleOpenTestModal(chap)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors"
                >
                  <Play className="h-3 w-3 fill-current" />
                  Start Test
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Preflight Modal */}
        <TestConfigurationModal
          isOpen={modalConfig.isOpen}
          onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
          onStart={() => router.push('/exam/ATT-PRACTICE-01')}
          subjectName={subjectSlug.toUpperCase()}
          chapterName={modalConfig.chapterName}
          questionCount={modalConfig.questionCount}
          durationMinutes={modalConfig.durationMinutes}
          isPaid={false}
        />
      </div>
    </div>
  );
}
