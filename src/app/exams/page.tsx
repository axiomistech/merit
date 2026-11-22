'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  ArrowRight,
  Shield,
  Clock,
  Award,
  CheckCircle2,
  Search,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';

export default function PublicExamsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredExams = EXAMINATIONS.filter((e) => {
    // Only show primary exams
    if (['jee-main', 'jee-advanced'].includes(e.slug) && categoryFilter !== 'engineering') {
      return false;
    }
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.shortName.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#F7F3EB] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
            <BookOpen className="h-3.5 w-3.5 text-[#8C6D3B]" />
            <span>EXAMINATION CURRICULA</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold font-sans text-[#121316] tracking-tight">
            Target Curricula & Formats
          </h1>
          <p className="text-sm sm:text-base text-[#52525B] leading-relaxed">
            Strictly focused on India&apos;s most competitive entrance examinations. Standardized blueprints, server-timed CBT testing, and instant vector OMR evaluations.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E4E4DF] bg-white p-4 max-w-4xl mx-auto shadow-xs">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
            <input
              type="text"
              placeholder="Search exam (NEET, JEE, UPSC, GATE)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E4E4DF] bg-[#FBFBFA] pl-10 pr-4 py-2 text-xs text-[#121316] placeholder-[#71717A] focus:outline-none focus:border-[#121316]"
            />
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Curricula' },
              { id: 'medical', label: 'Medical' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'civil_services', label: 'Civil Services' },
              { id: 'postgraduate', label: 'GATE' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={cn(
                  'px-3.5 py-1.5 text-xs font-semibold rounded-full border transition-colors',
                  categoryFilter === cat.id
                    ? 'bg-[#121316] text-white border-[#121316]'
                    : 'bg-white text-[#52525B] border-[#E4E4DF] hover:bg-[#F4F4F0]'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {filteredExams.map((exam) => (
            <div
              key={exam.id}
              className="merit-card p-8 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#F4F4F0] px-3 py-1 font-mono text-xs font-bold text-[#121316]">
                    {exam.shortName}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#8C6D3B]">
                    {exam.category.replace('_', ' ')}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-sans text-[#121316] tracking-tight">{exam.name}</h2>
                <p className="text-xs text-[#52525B] leading-relaxed">{exam.description}</p>

                <div className="pt-3 border-t border-[#E4E4DF]">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] mb-2">
                    Key Disciplines
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.subjects.map((sub) => (
                      <span
                        key={sub.id}
                        className="rounded-full border border-[#E4E4DF] bg-[#FBFBFA] px-3 py-1 text-[11px] font-medium text-[#121316]"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#E4E4DF] flex items-center justify-between">
                <Link
                  href={`/${exam.slug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors"
                >
                  <span>Explore Blueprint</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>

                <Link
                  href="/practice"
                  className="btn-merit-primary text-xs py-2 px-5"
                >
                  Start Practice
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
