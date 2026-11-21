'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Award,
  ArrowRight,
  Search,
  Filter,
  CheckCircle2,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { getStoredTests } from '@/lib/admin/store';

export default function PublicPapersPage() {
  const [examFilter, setExamFilter] = useState('all');
  const [search, setSearch] = useState('');

  const papers = [
    {
      id: 'paper_neet_2025_pyq',
      name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
      slug: 'neet-2025-official-pyq',
      exam: 'neet',
      year: 2025,
      questions: 180,
      duration: 200,
      marks: 720,
      hasOMR: true,
      description: 'The authentic NTA NEET 2025 examination question paper with official answer keys, KaTeX solutions, and printable A4 OMR sheet.',
    },
    {
      id: 'paper_neet_2024_pyq',
      name: 'NEET (UG) 2024 Official Question Paper',
      slug: 'neet-2024-official-pyq',
      exam: 'neet',
      year: 2024,
      questions: 180,
      duration: 200,
      marks: 720,
      hasOMR: true,
      description: 'Official 720-mark national medical entrance paper with sub-concept diagnostic analytics.',
    },
    {
      id: 'paper_jee_2025_shift1',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
      slug: 'jee-main-2025-session1-shift1',
      exam: 'jee-main',
      year: 2025,
      questions: 90,
      duration: 180,
      marks: 300,
      hasOMR: false,
      description: 'Full CBT simulation of JEE Main Jan 2025 shift with numerical integer validation and negative marking.',
    },
    {
      id: 'paper_jee_2025_shift2',
      name: 'JEE Main 2025 Session 1 (Jan 24 Shift 2)',
      slug: 'jee-main-2025-session1-shift2',
      exam: 'jee-main',
      year: 2025,
      questions: 90,
      duration: 180,
      marks: 300,
      hasOMR: false,
      description: 'Full CBT simulation of JEE Main Jan 2025 afternoon shift with step-by-step solutions.',
    },
  ];

  const filtered = papers.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchesExam = examFilter === 'all' || p.exam === examFilter;
    return matchesSearch && matchesExam;
  });

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CAF88]/40 bg-[#9CAF88]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <FileText className="h-3.5 w-3.5" />
            Previous Year Question Papers (PYQ)
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#263126] tracking-tight">
            Official Previous Year Exam Papers
          </h1>
          <p className="text-sm sm:text-base text-[#73786E] leading-relaxed">
            Practice real past examination papers in timed simulation mode or with instant printable A4 OMR sheets.
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)] max-w-4xl mx-auto">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
            <input
              type="text"
              placeholder="Search paper by year or examination..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>
          <div className="flex items-center gap-2">
            {['all', 'neet', 'jee-main'].map((ex) => (
              <button
                key={ex}
                onClick={() => setExamFilter(ex)}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-lg border uppercase transition-colors',
                  examFilter === ex
                    ? 'bg-[#263126] text-white border-[#263126]'
                    : 'bg-white text-[#52584E] border-[#E6E5DE] hover:bg-[#F7F5EF]'
                )}
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Papers List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {filtered.map((paper) => (
            <div
              key={paper.id}
              className="rounded-[24px] border border-[#E6E5DE] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CAF88] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                    {paper.exam.toUpperCase()} • {paper.year}
                  </span>
                  {paper.hasOMR && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9CAF88]/20 text-[#3B4C30]">
                      Printable A4 OMR Included
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-lg font-serif text-[#263126] leading-snug">
                  {paper.name}
                </h3>
                <p className="text-xs text-[#73786E] leading-relaxed line-clamp-2">
                  {paper.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#ECEAE4] text-xs">
                  <div>
                    <span className="text-[10px] text-[#73786E] uppercase font-bold block">Questions</span>
                    <span className="font-mono font-bold text-[#263126]">{paper.questions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#73786E] uppercase font-bold block">Duration</span>
                    <span className="font-mono font-bold text-[#263126]">{paper.duration} mins</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#73786E] uppercase font-bold block">Marks</span>
                    <span className="font-mono font-bold text-[#263126]">{paper.marks}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4] flex items-center justify-between">
                <Link
                  href={`/papers/${paper.slug}`}
                  className="text-xs font-semibold text-[#52584E] hover:text-[#263126]"
                >
                  Paper Details
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors"
                >
                  Attempt Paper
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
