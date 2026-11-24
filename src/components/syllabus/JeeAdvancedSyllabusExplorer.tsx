'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Atom,
  Sigma,
  Sparkles,
  Layers,
  FileText,
  BadgePercent,
  SlidersHorizontal,
  AlertCircle,
  CheckCircle2,
  BookmarkCheck,
  ShieldAlert,
  ArrowRight,
} from 'lucide-react';
import {
  JEE_ADVANCED_PHYSICS_SYLLABUS,
  JEE_ADVANCED_CHEMISTRY_SYLLABUS,
  JEE_ADVANCED_MATHEMATICS_SYLLABUS,
  JEE_ADVANCED_EXCLUSIVE_TOPICS,
  JEE_ADVANCED_SYLLABUS_OVERVIEW,
  SyllabusChapterOrUnit,
  AdvancedExclusiveTopic,
} from '@/data/jeeAdvancedSyllabusData';
import Link from 'next/link';

export function JeeAdvancedSyllabusExplorer() {
  const [activeTab, setActiveTab] = useState<'physics' | 'chemistry' | 'mathematics' | 'exclusive'>('chemistry');
  const [chemistryCategory, setChemistryCategory] = useState<'All' | 'Physical' | 'Inorganic' | 'Organic'>('All');
  const [mathCategory, setMathCategory] = useState<'All' | 'Algebra' | 'Calculus' | 'Coordinate' | 'Vectors' | 'Trigonometry'>('All');
  const [physicsCategory, setPhysicsCategory] = useState<'All' | 'Mechanics' | 'Electromagnetism' | 'Thermal' | 'Optics' | 'Modern' | 'General'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('ja-chem-u2');

  // Filtered units based on active tab and category/search
  const displayedUnits = useMemo(() => {
    let units: SyllabusChapterOrUnit[] = [];

    if (activeTab === 'chemistry') {
      units = chemistryCategory === 'All'
        ? JEE_ADVANCED_CHEMISTRY_SYLLABUS.units
        : JEE_ADVANCED_CHEMISTRY_SYLLABUS.units.filter((u) => u.category === chemistryCategory);
    } else if (activeTab === 'mathematics') {
      units = mathCategory === 'All'
        ? JEE_ADVANCED_MATHEMATICS_SYLLABUS.units
        : JEE_ADVANCED_MATHEMATICS_SYLLABUS.units.filter((u) => u.category === mathCategory);
    } else if (activeTab === 'physics') {
      units = physicsCategory === 'All'
        ? JEE_ADVANCED_PHYSICS_SYLLABUS.units
        : JEE_ADVANCED_PHYSICS_SYLLABUS.units.filter((u) => u.category === physicsCategory);
    }

    if (!searchQuery.trim()) return units;

    const q = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) ||
        u.topics.some((t) => t.name.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q)))
    );
  }, [activeTab, chemistryCategory, mathCategory, physicsCategory, searchQuery]);

  // Filtered exclusive topics
  const displayedExclusive = useMemo(() => {
    if (!searchQuery.trim()) return JEE_ADVANCED_EXCLUSIVE_TOPICS;
    const q = searchQuery.toLowerCase();
    return JEE_ADVANCED_EXCLUSIVE_TOPICS.filter(
      (item) =>
        item.subject.toLowerCase().includes(q) ||
        item.chapter.toLowerCase().includes(q) ||
        item.topic.toLowerCase().includes(q) ||
        item.significance.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const toggleUnit = (id: string) => {
    setExpandedUnitId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#20252B]">
            <Sparkles className="h-3.5 w-3.5 text-[#20252B]" />
            <span>IIT JAB Official Curriculum • Academic Session 2026-27</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#121316] font-sans tracking-tight">
            Complete JEE (Advanced) Syllabus
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            Official IIT curriculum with strict non-rationalized scope: 34 Chemistry units, 9 Mathematics disciplines, and 7 Physics domains including topics dropped from JEE Main.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search van der Waals, Carnot, X-rays..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-9 pr-4 text-xs font-medium text-[#121316] shadow-xs placeholder-[#A1A1AA] focus:border-[#20252B] focus:outline-none focus:ring-1 focus:ring-[#20252B]"
          />
        </div>
      </div>

      {/* Critical Educational Notice Banner */}
      <div className="rounded-2xl border border-[#FDE68A] bg-[#FFFBEB] p-5 shadow-xs">
        <div className="flex items-start gap-3.5">
          <ShieldAlert className="h-5 w-5 text-[#B45309] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs text-[#92400E]">
            <span className="font-bold uppercase tracking-wider text-[#78350F]">
              Critical Notice: JEE Advanced Did NOT Rationalize Its Syllabus
            </span>
            <p className="leading-relaxed">
              While NTA reduced the JEE Main and NEET syllabi by ~25% in accordance with NCERT rationalization, <strong>IIT JEE Advanced has retained the entire classical syllabus</strong>. Topics like <span className="underline font-semibold">States of Matter, Solid State, Surface Chemistry, Hydrogen, s-Block, Metallurgy, Polymers, Carnot Engine, Damped Oscillations, and Vector Triple Products</span> are active and tested heavily.
            </p>
          </div>
        </div>
      </div>

      {/* Primary Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E4E4DF] pb-3">
        {[
          { id: 'chemistry', label: 'Chemistry', count: '34 Units', icon: FlaskConical },
          { id: 'mathematics', label: 'Mathematics', count: '9 Disciplines', icon: Sigma },
          { id: 'physics', label: 'Physics', count: '7 Domains', icon: Atom },
          { id: 'exclusive', label: 'Retained in Advanced', count: '14 Exclusive Topics', icon: BookmarkCheck },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
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

      {/* Secondary Category Filters */}
      {activeTab === 'chemistry' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Branch:
          </span>
          {(['All', 'Physical', 'Inorganic', 'Organic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setChemistryCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                chemistryCategory === cat
                  ? 'bg-[#9CC6E0] text-[#121316] font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'mathematics' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Module:
          </span>
          {(['All', 'Algebra', 'Calculus', 'Coordinate', 'Vectors', 'Trigonometry'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setMathCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                mathCategory === cat
                  ? 'bg-[#9CC6E0] text-[#121316] font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {activeTab === 'physics' && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#71717A] mr-1 flex items-center gap-1">
            <SlidersHorizontal className="h-3 w-3" /> Domain:
          </span>
          {(['All', 'Mechanics', 'Electromagnetism', 'Thermal', 'Optics', 'Modern', 'General'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setPhysicsCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold transition-all ${
                physicsCategory === cat
                  ? 'bg-[#9CC6E0] text-[#121316] font-bold shadow-xs'
                  : 'bg-white border border-[#DCE2E6] text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Tab 4: Retained in Advanced View */}
      {activeTab === 'exclusive' && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-xs">
            <h3 className="text-lg font-bold font-sans text-[#121316]">
              JEE Advanced Exclusive Topics Matrix
            </h3>
            <p className="mt-1 text-xs text-[#52525B]">
              These 14 critical subject areas are completely deleted from the rationalized JEE Main and NEET syllabi, but are explicitly tested in JEE Advanced Paper 1 and Paper 2.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {displayedExclusive.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-xs hover:border-[#9CC6E0] transition-colors space-y-3"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[#121316] text-white px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider">
                      {item.subject}
                    </span>
                    <span className="rounded-full bg-[#E9EEF1] text-[#20252B] px-2.5 py-0.5 text-[10px] font-semibold">
                      {item.chapter}
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 text-[10px] font-bold">
                    <AlertCircle className="h-3 w-3" /> Retained in Adv
                  </span>
                </div>

                <div>
                  <h4 className="text-sm font-bold text-[#121316]">{item.topic}</h4>
                  <p className="mt-1.5 text-xs text-[#52525B] leading-relaxed">
                    <strong className="text-[#121316]">Advanced Significance:</strong> {item.significance}
                  </p>
                </div>

                <div className="pt-2 border-t border-[#F4F4F0] text-[11px] text-[#71717A]">
                  <strong className="text-[#92400E]">Dropped in JEE Main / NEET:</strong> {item.whyDroppedInMain}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Units Accordion List (for Physics, Chemistry, Math) */}
      {activeTab !== 'exclusive' && (
        <div className="space-y-3">
          {displayedUnits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DCE2E6] bg-white p-12 text-center text-xs text-[#71717A]">
              No syllabus units match your search query &ldquo;{searchQuery}&rdquo;.
            </div>
          ) : (
            displayedUnits.map((unit) => {
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
                  {/* Unit Summary Header */}
                  <div
                    onClick={() => toggleUnit(unit.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer select-none"
                  >
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="rounded-full bg-[#F4F4F0] px-2.5 py-0.5 text-[11px] font-bold text-[#121316]">
                          Unit {unit.unitNumber}
                        </span>
                        {unit.category && (
                          <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[10px] font-semibold text-[#20252B]">
                            {unit.category}
                          </span>
                        )}
                        {unit.isRetainedInAdvancedOnly && (
                          <span className="rounded-full bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 text-[10px] font-bold">
                            ★ Retained in Advanced Only
                          </span>
                        )}
                        <span className="text-[11px] font-bold text-[#71717A]">
                          ~{unit.weightagePercent}% Exam Weight
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
                        {unit.topics.length} topics
                      </span>
                      <div className="rounded-full p-1.5 hover:bg-[#F4F4F0] text-[#71717A]">
                        {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                      </div>
                    </div>
                  </div>

                  {/* Expanded Unit Details */}
                  {isExpanded && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#F4F4F0] bg-[#FAFBFB] space-y-3">
                      <div className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] pt-1">
                        Syllabus Subtopics & High-Yield Statements
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {unit.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className={`rounded-xl border p-3.5 flex flex-col sm:flex-row sm:items-start justify-between gap-3 ${
                              topic.isRetainedInAdvancedOnly
                                ? 'border-[#FDE68A] bg-[#FFFBEB]'
                                : 'border-[#E4E4DF] bg-white'
                            }`}
                          >
                            <div className="space-y-1 flex-1">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-xs font-bold text-[#121316]">
                                  {topic.name}
                                </span>
                                {topic.isHighYield && (
                                  <span className="rounded-full bg-[#DCFCE7] text-[#166534] px-2 py-0.5 text-[9px] font-bold uppercase">
                                    High Yield
                                  </span>
                                )}
                                {topic.isRetainedInAdvancedOnly && (
                                  <span className="rounded-full bg-[#FEF3C7] text-[#92400E] px-2 py-0.5 text-[9px] font-bold uppercase">
                                    Retained in Adv
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
                              className="inline-flex items-center gap-1 text-[11px] font-bold text-[#20252B] hover:text-[#9CC6E0] transition-colors shrink-0 self-start sm:self-center"
                            >
                              <span>Practice</span>
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
    </div>
  );
}
