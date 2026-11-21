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
  Filter,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';

export default function PublicExamsPage() {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredExams = EXAMINATIONS.filter((e) => {
    const matchesSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.shortName.toLowerCase().includes(search.toLowerCase()) ||
      e.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CAF88]/40 bg-[#9CAF88]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <BookOpen className="h-3.5 w-3.5" />
            Curated Examination Catalogs
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#263126] tracking-tight">
            Discover Your Target Examination
          </h1>
          <p className="text-sm sm:text-base text-[#73786E] leading-relaxed">
            Authentic examination simulations, curated topic-wise questions, authentic printable A4 OMR sheets, and sub-concept diagnostic analytics.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)] max-w-4xl mx-auto">
          <div className="relative flex-1 min-w-[260px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
            <input
              type="text"
              placeholder="Search exam name (NEET, JEE, UPSC, GATE)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Exams' },
              { id: 'medical', label: 'Medical' },
              { id: 'engineering', label: 'Engineering' },
              { id: 'civil_services', label: 'Civil Services' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(cat.id)}
                className={cn(
                  'px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors',
                  categoryFilter === cat.id
                    ? 'bg-[#263126] text-white border-[#263126]'
                    : 'bg-white text-[#52584E] border-[#E6E5DE] hover:bg-[#F7F5EF]'
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Exams Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredExams.map((exam) => (
            <div
              key={exam.slug}
              className="rounded-[24px] border border-[#E6E5DE] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CAF88] hover:shadow-[0_8px_30px_rgba(38,49,38,0.08)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                    {exam.category.replace('_', ' ')}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#9CAF88]">
                    {exam.shortName}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl font-bold font-serif text-[#263126]">{exam.name}</h3>
                  <p className="mt-1.5 text-xs text-[#73786E] leading-relaxed line-clamp-3">
                    {exam.description}
                  </p>
                </div>

                {/* Subjects Pill List */}
                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#73786E]">
                    Covered Disciplines ({exam.subjects.length}):
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exam.subjects.map((sub) => (
                      <span
                        key={sub.slug}
                        className="px-2.5 py-1 rounded-lg bg-[#F7F5EF] text-[11px] font-medium text-[#263126]"
                      >
                        {sub.name}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4] flex items-center justify-between">
                <Link
                  href={`/exams/${exam.slug}`}
                  className="text-xs font-semibold text-[#52584E] hover:text-[#263126] transition-colors"
                >
                  View Syllabus & Blueprint
                </Link>
                <Link
                  href={`/login`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
                >
                  Start Practice
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
