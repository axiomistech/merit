'use client';

import React from 'react';
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
  HelpCircle,
} from 'lucide-react';

export default function ChapterPracticePage() {
  const params = useParams();
  const router = useRouter();
  const examSlug = (params?.exam as string) || 'neet';
  const subjectSlug = (params?.subject as string) || 'physics';
  const chapterSlug = (params?.chapter as string) || 'laws-of-motion';

  const topics = [
    {
      id: 'top_1',
      name: "Newton's First & Second Laws of Motion",
      questionsCount: 18,
      difficulty: 'Medium',
      description: 'Inertia, momentum definition, impulse, and fundamental dynamic equilibrium.',
    },
    {
      id: 'top_2',
      name: 'Static & Kinetic Friction Analysis',
      questionsCount: 15,
      difficulty: 'High Yield',
      description: 'Coefficients of friction, angle of repose, blocks on inclined planes, and contact forces.',
    },
    {
      id: 'top_3',
      name: 'Circular Motion & Centripetal Forces',
      questionsCount: 12,
      difficulty: 'Medium',
      description: 'Banking of curved roads, conical pendulum, and tension in circular paths.',
    },
  ];

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#73786E]">
          <Link href="/practice" className="hover:text-[#263126]">Practice</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/practice/${examSlug}`} className="hover:text-[#263126] uppercase">{examSlug}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href={`/practice/${examSlug}/${subjectSlug}`} className="hover:text-[#263126] capitalize">{subjectSlug}</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263126] capitalize">{chapterSlug.replace(/-/g, ' ')}</span>
        </div>

        <div>
          <h1 className="text-3xl font-bold font-serif text-[#263126] capitalize">
            {chapterSlug.replace(/-/g, ' ')}
          </h1>
          <p className="mt-1 text-sm text-[#73786E]">
            Target specific sub-topics with instant feedback and step-by-step KaTeX solutions.
          </p>
        </div>

        <div className="space-y-4">
          {topics.map((top) => (
            <div
              key={top.id}
              className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-[#9CAF88] transition-all"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                    {top.difficulty}
                  </span>
                  <span className="text-xs font-mono text-[#73786E]">{top.questionsCount} MCQs</span>
                </div>
                <h3 className="font-bold text-base text-[#263126]">{top.name}</h3>
                <p className="text-xs text-[#73786E]">{top.description}</p>
              </div>

              <button
                onClick={() => router.push('/exam/ATT-TOPIC-PRACTICE')}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shrink-0"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                Practice Topic
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
