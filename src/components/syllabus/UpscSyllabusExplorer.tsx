'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  Landmark,
  FileText,
  Sparkles,
  Layers,
  SlidersHorizontal,
  Compass,
  Scale,
  Brain,
  Shield,
  Award,
  ArrowRight,
  Calculator,
  CheckCircle2,
} from 'lucide-react';
import {
  UPSC_PRELIMS_GS1_SYLLABUS,
  UPSC_PRELIMS_CSAT_SYLLABUS,
  UPSC_MAINS_GS_PAPERS,
  UPSC_MAINS_OPTIONALS,
  UPSC_SYLLABUS_OVERVIEW,
  UpscUnitOrModule,
  UpscMainsGsPaper,
  UpscOptionalSubject,
} from '@/data/upscSyllabusData';
import Link from 'next/link';

export function UpscSyllabusExplorer() {
  const [activeStage, setActiveStage] = useState<'prelims-gs' | 'prelims-csat' | 'mains-gs' | 'optionals'>('prelims-gs');
  const [gs1Category, setGs1Category] = useState<string>('All');
  const [mainsPaperFilter, setMainsPaperFilter] = useState<'All' | 'GS-1' | 'GS-2' | 'GS-3' | 'GS-4'>('All');
  const [optionalCategory, setOptionalCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('upsc-p1-u4');

  // Filtered Prelims GS1 units
  const displayedGs1Units = useMemo(() => {
    let units = UPSC_PRELIMS_GS1_SYLLABUS.units;
    if (gs1Category !== 'All') {
      units = units.filter((u) => u.category === gs1Category);
    }
    if (!searchQuery.trim()) return units;
    const q = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) ||
        u.topics.some((t) => t.name.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q)))
    );
  }, [gs1Category, searchQuery]);

  // Filtered CSAT units
  const displayedCsatUnits = useMemo(() => {
    let units = UPSC_PRELIMS_CSAT_SYLLABUS.units;
    if (!searchQuery.trim()) return units;
    const q = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) ||
        u.topics.some((t) => t.name.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q)))
    );
  }, [searchQuery]);

  // Filtered Mains GS papers and modules
  const displayedMainsPapers = useMemo(() => {
    let papers = UPSC_MAINS_GS_PAPERS;
    if (mainsPaperFilter !== 'All') {
      papers = papers.filter((p) => p.paperCode === mainsPaperFilter);
    }
    if (!searchQuery.trim()) return papers;
    const q = searchQuery.toLowerCase();
    return papers
      .map((p) => ({
        ...p,
        modules: p.modules.filter(
          (m) =>
            m.title.toLowerCase().includes(q) ||
            m.description.toLowerCase().includes(q) ||
            m.keyThemes.some((theme) => theme.toLowerCase().includes(q))
        ),
      }))
      .filter((p) => p.modules.length > 0);
  }, [mainsPaperFilter, searchQuery]);

  // Filtered Optionals
  const displayedOptionals = useMemo(() => {
    let opts = UPSC_MAINS_OPTIONALS;
    if (optionalCategory !== 'All') {
      opts = opts.filter((o) => o.category === optionalCategory);
    }
    if (!searchQuery.trim()) return opts;
    const q = searchQuery.toLowerCase();
    return opts.filter(
      (o) =>
        o.name.toLowerCase().includes(q) ||
        o.paper1Summary.toLowerCase().includes(q) ||
        o.paper2Summary.toLowerCase().includes(q) ||
        o.keyThemes.some((t) => t.toLowerCase().includes(q))
    );
  }, [optionalCategory, searchQuery]);

  const toggleUnit = (id: string) => {
    setExpandedUnitId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#F7F3EB] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#6E5328]">
            <Sparkles className="h-3.5 w-3.5 text-[#8C6D3B]" />
            <span>UPSC Official Notification Scheme • CSE 2026-27</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#121316] font-sans tracking-tight">
            Complete Civil Services Examination Curriculum
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            Official UPSC syllabus covering Prelims (GS-I & CSAT), Mains (GS I to IV with 60 comprehensive modules), and 26 Optional Disciplines.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Panchayati Raj, Ethics, Inflation..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-9 pr-4 text-xs font-medium text-[#121316] shadow-xs placeholder-[#A1A1AA] focus:border-[#20252B] focus:outline-none focus:ring-1 focus:ring-[#20252B]"
          />
        </div>
      </div>

      {/* Examination Architecture Overview Card */}
      <div className="rounded-2xl border border-[#E4E4DF] bg-white p-5 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="rounded-xl bg-[#FAFBFB] border border-[#E4E4DF] p-3.5 space-y-1">
            <span className="font-bold text-[#121316] uppercase tracking-wider text-[10px]">
              Stage 1: Preliminary (Elimination)
            </span>
            <div className="text-base font-extrabold text-[#121316]">400 Total Marks</div>
            <p className="text-[11px] text-[#52525B]">
              GS-I (200M, -0.66 neg) decides merit; CSAT (200M, -0.83 neg) requires min 33% (66 marks).
            </p>
          </div>

          <div className="rounded-xl bg-[#FAFBFB] border border-[#E4E4DF] p-3.5 space-y-1">
            <span className="font-bold text-[#121316] uppercase tracking-wider text-[10px]">
              Stage 2: Mains (Written Descriptive)
            </span>
            <div className="text-base font-extrabold text-[#121316]">1750 Merit Marks</div>
            <p className="text-[11px] text-[#52525B]">
              Essay (250M) + 4 GS Papers (1000M) + 2 Optional Papers (500M) + 2 Qualifying Language Papers.
            </p>
          </div>

          <div className="rounded-xl bg-[#FAFBFB] border border-[#E4E4DF] p-3.5 space-y-1">
            <span className="font-bold text-[#121316] uppercase tracking-wider text-[10px]">
              Stage 3: Personality Test (Interview)
            </span>
            <div className="text-base font-extrabold text-[#121316]">275 Marks • 2025 Grand Total</div>
            <p className="text-[11px] text-[#52525B]">
              Board interview evaluating critical intellectual traits, administrative integrity, and balance.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Stage Selection Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E4E4DF] pb-3">
        {[
          { id: 'prelims-gs', label: 'Prelims Paper I: General Studies', count: '7 Subjects', icon: Landmark },
          { id: 'prelims-csat', label: 'Prelims Paper II: CSAT', count: '80 Questions (Qualifying)', icon: Calculator },
          { id: 'mains-gs', label: 'Mains: General Studies (GS I to IV)', count: '4 Papers • 60 Modules', icon: Scale },
          { id: 'optionals', label: 'Mains: Optional Subjects', count: '26 Disciplines', icon: BookOpen },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeStage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveStage(tab.id as any);
                setSearchQuery('');
              }}
              className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                isActive
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'bg-white border border-[#E4E4DF] text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#EAEAEA] text-[#71717A]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Secondary Filter Controls */}
      {activeStage === 'prelims-gs' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Subject:
          </span>
          {['All', 'Polity', 'History', 'Geography', 'Economy', 'Environment', 'Science', 'Current Affairs'].map((cat) => (
            <button
              key={cat}
              onClick={() => setGs1Category(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                gs1Category === cat
                  ? 'bg-[#8C6D3B] text-white font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {activeStage === 'mains-gs' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Paper:
          </span>
          {(['All', 'GS-1', 'GS-2', 'GS-3', 'GS-4'] as const).map((paper) => (
            <button
              key={paper}
              onClick={() => setMainsPaperFilter(paper)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                mainsPaperFilter === paper
                  ? 'bg-[#121316] text-white font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {paper === 'All' ? 'All 4 Papers' : paper}
            </button>
          ))}
        </div>
      )}

      {activeStage === 'optionals' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Category:
          </span>
          {['All', 'Humanities', 'Sciences'].map((cat) => (
            <button
              key={cat}
              onClick={() => setOptionalCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                optionalCategory === cat
                  ? 'bg-[#8C6D3B] text-white font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* 1. Prelims GS-I Content */}
      {activeStage === 'prelims-gs' && (
        <div className="space-y-3">
          {displayedGs1Units.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DCE2E6] bg-white p-12 text-center text-xs text-[#71717A]">
              No syllabus units match your search query &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            displayedGs1Units.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              return (
                <div
                  key={unit.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'border-[#8C6D3B]/40 bg-white shadow-sm'
                      : 'border-[#E4E4DF] bg-white hover:border-[#DCE2E6]'
                  }`}
                >
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F7F3EB] px-2.5 py-0.5 text-[11px] font-bold text-[#6E5328]">
                          Unit {unit.unitNumber}
                        </span>
                        {unit.category && (
                          <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[10px] font-semibold text-[#20252B]">
                            {unit.category}
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-[#71717A]">
                          ~{unit.weightagePercent}% Prelims Weightage
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-sans text-[#121316]">
                        {unit.name}
                      </h3>

                      <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2">
                        {unit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <span className="text-xs font-semibold text-[#71717A] hidden sm:inline">
                        {unit.topics.length} core themes
                      </span>
                      <div className="rounded-full p-1.5 hover:bg-[#F4F4F0] text-[#71717A]">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#F4F4F0] bg-[#FAFBFB] space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] pt-1">
                        Syllabus Sub-Themes & Prelims Focus Points
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {unit.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="rounded-xl border border-[#E4E4DF] bg-white p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-[#121316]">
                                  {topic.name}
                                </span>
                                {topic.isHighYield && (
                                  <span className="rounded-full bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 text-[9px] font-bold uppercase">
                                    High Yield
                                  </span>
                                )}
                              </div>
                              {topic.details && (
                                <p className="text-[11px] text-[#52525B] leading-relaxed">
                                  {topic.details}
                                </p>
                              )}
                            </div>

                            <Link
                              href="/practice"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6D3B] hover:underline transition-colors shrink-0 self-start sm:self-center"
                            >
                              <span>Practice MCQs</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      )}

      {/* 2. Prelims CSAT Content */}
      {activeStage === 'prelims-csat' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-xs">
            <h3 className="text-base font-bold font-sans text-[#121316]">
              CSAT Paper II Architecture (200 Marks • 80 Questions)
            </h3>
            <p className="mt-1 text-xs text-[#52525B]">
              Qualifying paper requiring 33% minimum score (66.67 marks). Each question carries 2.5 marks with a strict negative penalty of 0.83 marks (1/3rd).
            </p>
          </div>

          <div className="space-y-3">
            {displayedCsatUnits.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              return (
                <div
                  key={unit.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'border-[#121316]/20 bg-white shadow-sm'
                      : 'border-[#E4E4DF] bg-white hover:border-[#DCE2E6]'
                  }`}
                >
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F4F4F0] px-2.5 py-0.5 text-[11px] font-bold text-[#121316]">
                          Unit {unit.unitNumber}
                        </span>
                        <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[10px] font-semibold text-[#20252B]">
                          {unit.category}
                        </span>
                        <span className="text-[11px] font-bold text-[#71717A]">
                          ~{unit.weightagePercent}% CSAT Paper Share
                        </span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold font-sans text-[#121316]">
                        {unit.name}
                      </h3>

                      <p className="text-xs text-[#52525B] leading-relaxed line-clamp-2">
                        {unit.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 pt-1">
                      <div className="rounded-full p-1.5 hover:bg-[#F4F4F0] text-[#71717A]">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>

                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#F4F4F0] bg-[#FAFBFB] space-y-3">
                      <div className="grid grid-cols-1 gap-2.5">
                        {unit.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="rounded-xl border border-[#E4E4DF] bg-white p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3"
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-[#121316]">
                                  {topic.name}
                                </span>
                                {topic.isHighYield && (
                                  <span className="rounded-full bg-[#DCFCE7] text-[#166534] px-2 py-0.5 text-[9px] font-bold uppercase">
                                    High Frequency
                                  </span>
                                )}
                              </div>
                              {topic.details && (
                                <p className="text-[11px] text-[#52525B] leading-relaxed">
                                  {topic.details}
                                </p>
                              )}
                            </div>

                            <Link
                              href="/practice"
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#121316] hover:text-[#8C6D3B] transition-colors shrink-0 self-start sm:self-center"
                            >
                              <span>Practice CSAT</span>
                              <ArrowRight className="h-3 w-3" />
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 3. Mains General Studies Content */}
      {activeStage === 'mains-gs' && (
        <div className="space-y-6">
          {displayedMainsPapers.map((paper) => (
            <div key={paper.id} className="rounded-2xl border border-[#E4E4DF] bg-white p-6 shadow-xs space-y-4">
              <div className="border-b border-[#F4F4F0] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#121316] text-white px-3 py-0.5 text-xs font-bold">
                      {paper.paperCode}
                    </span>
                    <h3 className="text-lg font-bold font-sans text-[#121316]">{paper.paperTitle}</h3>
                  </div>
                  <p className="mt-1 text-xs text-[#66727D]">{paper.paperSubtitle}</p>
                </div>

                <div className="text-right text-xs text-[#71717A] shrink-0">
                  <div className="font-bold text-[#121316] font-mono">{paper.marks} Marks • {paper.durationHours} Hours</div>
                  <div>{paper.modules.length} Official Syllabus Points</div>
                </div>
              </div>

              {/* Modules Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {paper.modules.map((mod) => (
                  <div
                    key={mod.moduleNumber}
                    className="rounded-xl border border-[#E4E4DF] bg-[#FAFBFB] p-4 space-y-2 hover:border-[#8C6D3B] transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold text-[#8C6D3B] uppercase">
                        Point {mod.moduleNumber}
                      </span>
                      {mod.isHighYield && (
                        <span className="rounded-full bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 text-[9px] font-bold uppercase">
                          High Weight
                        </span>
                      )}
                    </div>

                    <h4 className="text-xs font-bold text-[#121316] leading-snug">
                      {mod.title}
                    </h4>

                    <p className="text-[11px] text-[#52525B] leading-relaxed">
                      {mod.description}
                    </p>

                    <div className="pt-2 border-t border-[#E4E4DF]/60 flex flex-wrap gap-1.5">
                      {mod.keyThemes.map((theme, tIdx) => (
                        <span
                          key={tIdx}
                          className="rounded-md bg-white border border-[#E4E4DF] px-2 py-0.5 text-[10px] text-[#71717A]"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. Mains Optionals Content */}
      {activeStage === 'optionals' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-xs">
            <h3 className="text-base font-bold font-sans text-[#121316]">
              Optional Subject Papers I & II (500 Marks Total)
            </h3>
            <p className="mt-1 text-xs text-[#52525B]">
              Candidates choose one optional subject consisting of two papers (Paper VI & VII) carrying 250 marks each. The scope is broadly of Honours degree level.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedOptionals.map((opt) => (
              <div
                key={opt.id}
                className="rounded-2xl border border-[#E4E4DF] bg-white p-5 shadow-xs hover:border-[#8C6D3B] transition-colors space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full bg-[#F7F3EB] text-[#6E5328] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                    {opt.category}
                  </span>
                  <span className="text-[11px] font-bold text-[#71717A]">
                    2 Papers • 500 Marks
                  </span>
                </div>

                <h4 className="text-sm font-bold text-[#121316]">{opt.name}</h4>

                <div className="space-y-2 text-xs">
                  <div className="rounded-xl bg-[#FAFBFB] border border-[#E4E4DF] p-3">
                    <span className="font-bold text-[#121316] text-[11px] block">Paper I Scope:</span>
                    <p className="mt-0.5 text-[11px] text-[#52525B] leading-relaxed">{opt.paper1Summary}</p>
                  </div>

                  <div className="rounded-xl bg-[#FAFBFB] border border-[#E4E4DF] p-3">
                    <span className="font-bold text-[#121316] text-[11px] block">Paper II Scope:</span>
                    <p className="mt-0.5 text-[11px] text-[#52525B] leading-relaxed">{opt.paper2Summary}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#F4F4F0] flex flex-wrap gap-1.5">
                  {opt.keyThemes.map((theme, idx) => (
                    <span
                      key={idx}
                      className="rounded-md bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-semibold text-[#52525B]"
                    >
                      {theme}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
