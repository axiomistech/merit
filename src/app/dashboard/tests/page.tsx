'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Clock,
  Shield,
  CheckCircle2,
  Play,
  FileText,
  Award,
  Sparkles,
} from 'lucide-react';
import { TestConfigurationModal } from '@/components/exam/TestConfigurationModal';
import { cn } from '@/lib/utils';

export default function TestsHubPage() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'full_mocks' | 'pyq' | 'topic'>('all');
  const [configModal, setConfigModal] = useState<{
    isOpen: boolean;
    examName: string;
    subjectName: string;
    chapterName: string;
    questionCount: number;
    durationMinutes: number;
    isPaid: boolean;
    attemptRoute: string;
  }>({
    isOpen: false,
    examName: '',
    subjectName: '',
    chapterName: '',
    questionCount: 180,
    durationMinutes: 200,
    isPaid: false,
    attemptRoute: '/exam/neet-demo',
  });

  const testList = [
    {
      id: 'mock-neet-01',
      title: 'NEET (UG) Full Mock Simulation #1',
      exam: 'NEET',
      type: 'full_mocks',
      questions: 180,
      duration: 200,
      marks: 720,
      negative: '+4 / -1',
      hasOmr: true,
      tag: 'Complimentary Mock',
      route: '/exam/neet-demo',
    },
    {
      id: 'mock-neet-pyq-2024',
      title: 'NEET (UG) 2024 Official Paper Re-attempt',
      exam: 'NEET',
      type: 'pyq',
      questions: 180,
      duration: 200,
      marks: 720,
      negative: '+4 / -1',
      hasOmr: true,
      tag: 'Past Year Paper',
      route: '/exam/neet-demo',
    },
    {
      id: 'mock-jee-01',
      title: 'JEE Main Full CBT Simulation #1',
      exam: 'JEE Main',
      type: 'full_mocks',
      questions: 75,
      duration: 180,
      marks: 300,
      negative: '+4 / -1 (MCQs & NVQs)',
      hasOmr: false,
      tag: 'Standard CBT',
      route: '/exam/jee-main-demo',
    },
    {
      id: 'topic-physics-mechanics',
      title: 'Physics Mechanics Master Drill',
      exam: 'NEET / JEE',
      type: 'topic',
      questions: 45,
      duration: 45,
      marks: 180,
      negative: '+4 / -1',
      hasOmr: true,
      tag: 'High-Yield Drill',
      route: '/exam/neet-demo',
    },
  ];

  const filteredTests = testList.filter((t) => {
    if (activeFilter === 'all') return true;
    return t.type === activeFilter;
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <TestConfigurationModal
        isOpen={configModal.isOpen}
        onClose={() => setConfigModal({ ...configModal, isOpen: false })}
        examName={configModal.examName}
        subjectName={configModal.subjectName}
        chapterName={configModal.chapterName}
        questionCount={configModal.questionCount}
        durationMinutes={configModal.durationMinutes}
        isPaid={configModal.isPaid}
        attemptRoute={configModal.attemptRoute}
      />

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
            Timed Examination Center
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold font-serif text-[#263126]">
            Mock Tests & Timed Simulations
          </h1>
          <p className="text-xs text-[#73786E]">
            Full-length simulations with server-authoritative countdown timers, automatic submissions, and instant vector OMR sheets.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 rounded-full border border-[#E6E5DE] bg-white p-1 text-xs font-semibold shadow-sm">
          {[
            { id: 'all', label: 'All Tests' },
            { id: 'full_mocks', label: 'Full Mocks' },
            { id: 'pyq', label: 'Previous Years' },
            { id: 'topic', label: 'Topic Drills' },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id as any)}
              className={cn(
                'rounded-full px-4 py-1.5 transition-all',
                activeFilter === f.id
                  ? 'bg-[#9CAF88] text-white font-bold shadow-sm'
                  : 'text-[#73786E] hover:text-[#263126]'
              )}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Test Cards Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="rounded-[28px] border border-[#E6E5DE] bg-white p-7 shadow-sm hover:border-[#9CAF88] transition-all flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-bold text-[#758B62]">
                  {test.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-[#92958D]">
                  {test.exam}
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold font-serif text-[#263126]">
                {test.title}
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F7F5EF] p-4 text-center text-xs">
                <div>
                  <div className="text-[11px] text-[#73786E]">Questions</div>
                  <div className="font-mono font-bold text-[#263126]">{test.questions}</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#73786E]">Duration</div>
                  <div className="font-mono font-bold text-[#263126]">{test.duration} mins</div>
                </div>
                <div>
                  <div className="text-[11px] text-[#73786E]">Maximum Marks</div>
                  <div className="font-mono font-bold text-[#758B62]">{test.marks}</div>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-[#ECEAE4]">
              <div className="text-xs text-[#73786E]">
                <span>OMR Sheet: </span>
                <strong className={test.hasOmr ? 'text-[#758B62]' : 'text-[#92958D]'}>
                  {test.hasOmr ? 'A4 Vector PDF' : 'CBT Digital Grid'}
                </strong>
              </div>

              <button
                onClick={() =>
                  setConfigModal({
                    isOpen: true,
                    examName: test.exam,
                    subjectName: test.title,
                    chapterName: 'Full Mock Session',
                    questionCount: test.questions,
                    durationMinutes: test.duration,
                    isPaid: false,
                    attemptRoute: test.route,
                  })
                }
                className="inline-flex items-center gap-2 rounded-full bg-[#E8412C] px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
              >
                <span>Launch Mock</span>
                <Play className="h-3.5 w-3.5 fill-current" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
