'use client';

import React from 'react';
import Link from 'next/link';
import { BookOpen, ArrowRight, CheckCircle2, Shield, Sparkles } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';

export default function ExamsHubPage() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#ECEAE4] pb-6">
        <span className="text-xs font-bold uppercase tracking-wider text-[#758B62]">
          Curricula Directory
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold font-serif text-[#263126]">
          Supported Competitive Examinations
        </h1>
        <p className="text-xs text-[#73786E]">
          Select an examination to view syllabus trees, exam blueprints, marking schemes, and past papers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {EXAMINATIONS.map((exam) => (
          <div
            key={exam.slug}
            className="rounded-[28px] border border-[#E6E5DE] bg-white p-7 shadow-sm hover:border-[#9CAF88] transition-all flex flex-col justify-between space-y-6"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-bold text-[#758B62]">
                  {exam.shortName}
                </span>
                <span className="text-xs font-mono text-[#92958D]">
                  {exam.subjects.length} Disciplines
                </span>
              </div>

              <h3 className="mt-4 text-xl font-bold font-serif text-[#263126]">
                {exam.name}
              </h3>
              <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
                {exam.description}
              </p>

              <div className="mt-4 space-y-1.5 text-xs text-[#263126]">
                <div className="flex justify-between">
                  <span className="text-[#73786E]">Subjects:</span>
                  <span className="font-mono font-bold text-[#263126]">
                    {exam.subjects.map((s) => s.name).join(', ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#73786E]">Focus:</span>
                  <span className="font-semibold text-[#758B62] truncate max-w-[200px]">{exam.tagline}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[#ECEAE4] flex gap-2">
              <Link
                href={`/dashboard/${exam.slug}`}
                className="flex-1 rounded-full bg-[#9CAF88] py-2.5 text-center text-xs font-bold text-white shadow-sm hover:bg-[#8ea07a] transition-all"
              >
                Enter Module
              </Link>
              <Link
                href="/dashboard/practice"
                className="rounded-full border border-[#E6E5DE] bg-[#F7F5EF] px-4 py-2.5 text-xs font-semibold text-[#2E332D] hover:bg-[#E9EEE3] transition-all"
              >
                Practice
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
