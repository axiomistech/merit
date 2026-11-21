'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Layers,
  Search,
  BookOpen,
  ChevronRight,
  Clock,
  CheckCircle2,
  Play,
  FileText,
  Sparkles,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { TestConfigurationModal, TestConfigProps } from '@/components/exam/TestConfigurationModal';

interface ChapterItem {
  id: string;
  name: string;
  questionCount: number;
  durationMinutes: number;
  level: string;
  hasPyqs: boolean;
  isCompleted?: boolean;
}

interface UnitItem {
  unitName: string;
  chapters: ChapterItem[];
}

interface SubjectHierarchy {
  subjectName: string;
  units: UnitItem[];
}

export default function PracticeHubPage() {
  const [selectedExam, setSelectedExam] = useState<'neet' | 'jee' | 'upsc' | 'engineering'>('neet');
  const [selectedSubjectIndex, setSelectedSubjectIndex] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    subjectName: string;
    chapterName: string;
    questionCount: number;
    durationMinutes: number;
    isPaid: boolean;
  }>({
    isOpen: false,
    subjectName: '',
    chapterName: '',
    questionCount: 30,
    durationMinutes: 30,
    isPaid: false,
  });

  // Complete NEET Syllabus Tree matching the exact user specification
  const neetSyllabus: SubjectHierarchy[] = [
    {
      subjectName: 'Physics',
      units: [
        {
          unitName: 'Mechanics',
          chapters: [
            { id: 'kinematics', name: 'Kinematics (1D & 2D Motion)', questionCount: 30, durationMinutes: 30, level: 'Foundational', hasPyqs: true },
            { id: 'laws-of-motion', name: 'Laws of Motion & Friction', questionCount: 30, durationMinutes: 30, level: 'High Yield', hasPyqs: true },
            { id: 'work-energy-power', name: 'Work, Energy & Power', questionCount: 30, durationMinutes: 30, level: 'Analytical', hasPyqs: true },
            { id: 'rotational-motion', name: 'System of Particles & Rotational Motion', questionCount: 35, durationMinutes: 35, level: 'Advanced', hasPyqs: true },
            { id: 'gravitation', name: 'Gravitation & Satellite Dynamics', questionCount: 25, durationMinutes: 25, level: 'Formula Based', hasPyqs: true },
          ],
        },
        {
          unitName: 'Electricity & Magnetism',
          chapters: [
            { id: 'electrostatics', name: 'Electrostatics & Gauss Law', questionCount: 30, durationMinutes: 30, level: 'High Yield', hasPyqs: true },
            { id: 'current-electricity', name: 'Current Electricity & Circuit Laws', questionCount: 30, durationMinutes: 30, level: 'Numerical', hasPyqs: true },
            { id: 'moving-charges', name: 'Magnetic Effects of Current & Magnetism', questionCount: 25, durationMinutes: 25, level: 'Standard', hasPyqs: true },
          ],
        },
      ],
    },
    {
      subjectName: 'Chemistry',
      units: [
        {
          unitName: 'Physical Chemistry',
          chapters: [
            { id: 'mole-concept', name: 'Some Basic Concepts of Chemistry (Mole Concept)', questionCount: 30, durationMinutes: 30, level: 'Foundational', hasPyqs: true },
            { id: 'thermodynamics', name: 'Chemical Thermodynamics & Enthalpy', questionCount: 30, durationMinutes: 30, level: 'High Yield', hasPyqs: true },
            { id: 'equilibrium', name: 'Ionic & Chemical Equilibrium', questionCount: 30, durationMinutes: 30, level: 'Calculative', hasPyqs: true },
          ],
        },
        {
          unitName: 'Organic Chemistry',
          chapters: [
            { id: 'goc', name: 'General Organic Chemistry (GOC)', questionCount: 35, durationMinutes: 35, level: 'Core Fundamental', hasPyqs: true },
            { id: 'hydrocarbons', name: 'Hydrocarbons (Alkanes, Alkenes, Alkynes)', questionCount: 30, durationMinutes: 30, level: 'Reaction Mechanism', hasPyqs: true },
          ],
        },
        {
          unitName: 'Inorganic Chemistry',
          chapters: [
            { id: 'chemical-bonding', name: 'Chemical Bonding & Molecular Structure', questionCount: 35, durationMinutes: 35, level: 'Crucial', hasPyqs: true },
            { id: 'coordination', name: 'Coordination Compounds', questionCount: 30, durationMinutes: 30, level: 'High Scoring', hasPyqs: true },
          ],
        },
      ],
    },
    {
      subjectName: 'Biology (Botany & Zoology)',
      units: [
        {
          unitName: 'Botany',
          chapters: [
            { id: 'photosynthesis', name: 'Photosynthesis in Higher Plants (C3/C4)', questionCount: 30, durationMinutes: 25, level: 'High Yield', hasPyqs: true },
            { id: 'plant-respiration', name: 'Respiration in Plants (Glycolysis & Krebs)', questionCount: 30, durationMinutes: 25, level: 'Mechanisms', hasPyqs: true },
            { id: 'genetics-principles', name: 'Principles of Inheritance & Variation', questionCount: 40, durationMinutes: 35, level: 'Maximum Weightage', hasPyqs: true },
          ],
        },
        {
          unitName: 'Zoology',
          chapters: [
            { id: 'human-reproduction', name: 'Human Reproduction & Reproductive Health', questionCount: 35, durationMinutes: 30, level: 'Direct NCERT', hasPyqs: true },
            { id: 'chemical-coordination', name: 'Neural Control & Chemical Coordination', questionCount: 30, durationMinutes: 25, level: 'Hormonal Systems', hasPyqs: true },
          ],
        },
      ],
    },
  ];

  const currentSubjects = neetSyllabus;
  const currentSubject = currentSubjects[selectedSubjectIndex] || currentSubjects[0];

  const handleLaunchConfig = (subjectName: string, chapter: ChapterItem) => {
    setConfigModal({
      isOpen: true,
      subjectName,
      chapterName: chapter.name,
      questionCount: chapter.questionCount,
      durationMinutes: chapter.durationMinutes,
      isPaid: false,
    });
  };

  return (
    <div className="liquid-canvas min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto relative text-[#20252B]">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 left-1/4 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-10 right-1/4 h-72 w-72 opacity-20" />
      </div>

      {/* Configuration Pre-Flight Modal */}
      <TestConfigurationModal
        isOpen={configModal.isOpen}
        onClose={() => setConfigModal({ ...configModal, isOpen: false })}
        examName={selectedExam.toUpperCase()}
        subjectName={configModal.subjectName}
        chapterName={configModal.chapterName}
        questionCount={configModal.questionCount}
        durationMinutes={configModal.durationMinutes}
        isPaid={configModal.isPaid}
        attemptRoute="/exam/neet-demo"
      />

      {/* Page Title & Speed Standard Notice */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6]/80 pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              Instant Practice Explorer
            </span>
            <span className="glass-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-[#E4002B]">
              15-SECOND START
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold font-sans text-[#20252B]">
            Select Practice: Exam → Subject → Chapter
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Target high-yield chapters, topic drills, or full previous-year question sets in under 15 seconds.
          </p>
        </div>

        {/* Exam Switcher Pills */}
        <div className="glass-polar flex items-center gap-1.5 rounded-full p-1.5 shadow-sm">
          {(['neet', 'jee', 'upsc', 'engineering'] as const).map((ex) => (
            <button
              key={ex}
              onClick={() => setSelectedExam(ex)}
              className={cn(
                'rounded-full px-4 py-1.5 text-xs font-bold uppercase transition-all',
                selectedExam === ex
                  ? 'bg-[#20252B] text-white shadow-sm'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* 2-Column Explorer: Left Subjects, Right Chapters */}
      <div className="relative z-10 grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left Column: Subjects (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
            1. Select Discipline
          </div>

          <div className="space-y-2">
            {currentSubjects.map((sub, idx) => {
              const isSelected = selectedSubjectIndex === idx;
              const totalChapters = sub.units.reduce((acc, u) => acc + u.chapters.length, 0);

              return (
                <div
                  key={sub.subjectName}
                  onClick={() => setSelectedSubjectIndex(idx)}
                  className={cn(
                    'flex items-center justify-between rounded-[24px] p-4 cursor-pointer transition-all duration-200',
                    isSelected
                      ? 'glass-polar border-2 border-[#9CC6E0] shadow-md scale-[1.01]'
                      : 'border border-[#DCE2E6]/80 bg-[#F1F3F4]/60 hover:bg-white/80 text-[#66727D]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        'flex h-10 w-10 items-center justify-center rounded-2xl transition-colors',
                        isSelected ? 'bg-[#9CC6E0] text-[#20252B]' : 'bg-[#E9EEF1] text-[#20252B]'
                      )}
                    >
                      <BookOpen className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#20252B] font-sans">
                        {sub.subjectName}
                      </h3>
                      <p className="text-[11px] text-[#66727D]">
                        {sub.units.length} Units • {totalChapters} Chapters
                      </p>
                    </div>
                  </div>

                  <ChevronRight
                    className={cn(
                      'h-4 w-4 transition-transform',
                      isSelected ? 'text-[#20252B] translate-x-1' : 'text-[#66727D]'
                    )}
                  />
                </div>
              );
            })}
          </div>

          {/* Quick Mock Shortcut Card */}
          <div className="glass-glacier rounded-[28px] p-6 text-[#20252B] shadow-sm mt-6 space-y-3">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#20252B]/70">
              FAST-TRACK MOCK
            </span>
            <h4 className="text-lg font-bold font-sans leading-snug">
              Simulate Full 180-Question Mock Paper
            </h4>
            <p className="text-xs text-[#20252B]/80 leading-relaxed">
              Server-authoritative timer with instant A4 vector OMR sheet generation.
            </p>
            <Link
              href="/exam/neet-demo"
              className="glass-racing-red inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <span>Launch Mock Test</span>
              <Play className="h-3.5 w-3.5 fill-current" />
            </Link>
          </div>
        </div>

        {/* Right Column: Units & Chapters Drill-Down (8 Cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              2. Select Chapter in {currentSubject.subjectName}
            </div>

            {/* Quick Search filter */}
            <div className="relative">
              <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-[#66727D]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter chapters..."
                className="glass-pill rounded-full py-1.5 pl-9 pr-4 text-xs text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
              />
            </div>
          </div>

          {/* Units list */}
          <div className="space-y-6">
            {currentSubject.units.map((unit) => {
              const filteredChapters = unit.chapters.filter((c) =>
                c.name.toLowerCase().includes(searchQuery.toLowerCase())
              );

              if (filteredChapters.length === 0) return null;

              return (
                <div key={unit.unitName} className="space-y-3">
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
                      Unit: {unit.unitName}
                    </h4>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {filteredChapters.map((chapter) => (
                      <div
                        key={chapter.id}
                        className="glass-polar rounded-[28px] p-5 shadow-sm transition-all duration-200 hover:border-[#9CC6E0] hover:scale-[1.01] flex flex-col justify-between space-y-4"
                      >
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="glass-pill px-2.5 py-0.5 text-[10px] font-bold text-[#20252B]">
                              {chapter.level}
                            </span>
                            {chapter.hasPyqs && (
                              <span className="text-[10px] font-semibold text-[#66727D]">
                                Includes PYQs
                              </span>
                            )}
                          </div>

                          <h5 className="mt-2 text-sm font-bold text-[#20252B] font-sans leading-snug">
                            {chapter.name}
                          </h5>

                          <div className="mt-2 flex items-center gap-3 text-xs text-[#66727D]">
                            <span>{chapter.questionCount} Questions</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{chapter.durationMinutes}m</span>
                            </span>
                          </div>
                        </div>

                        {/* Direct 1-Click Launch Button */}
                        <div className="pt-3 border-t border-[#DCE2E6]/80 flex items-center justify-between">
                          <span className="text-[11px] text-[#20252B] font-semibold">
                            Free Practice
                          </span>

                          <button
                            onClick={() => handleLaunchConfig(currentSubject.subjectName, chapter)}
                            className="glass-racing-red inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-bold text-white shadow-sm transition-transform hover:scale-[1.02]"
                          >
                            <span>Configure & Start</span>
                            <Play className="h-3 w-3 fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
