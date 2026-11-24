'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Compass,
  Atom,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  BadgePercent,
  SlidersHorizontal,
} from 'lucide-react';
import {
  JEE_MAIN_MATHEMATICS_SYLLABUS,
  JEE_MAIN_PHYSICS_SYLLABUS,
  JEE_MAIN_CHEMISTRY_SYLLABUS,
  JEE_MAIN_PAPER_2A_SYLLABUS,
  JEE_MAIN_PAPER_2B_SYLLABUS,
  SyllabusChapterOrUnit,
} from '@/data/jeeMainSyllabusData';

export function JeeMainSyllabusExplorer() {
  const [activeTab, setActiveTab] = useState<'physics' | 'chemistry' | 'mathematics' | 'paper2'>('physics');
  const [chemistryCategory, setChemistryCategory] = useState<'All' | 'Physical' | 'Inorganic' | 'Organic'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('phy-u1');

  // Filtered units based on active tab and search query
  const displayedUnits = useMemo(() => {
    let units: SyllabusChapterOrUnit[] = [];
    if (activeTab === 'physics') {
      units = JEE_MAIN_PHYSICS_SYLLABUS.units;
    } else if (activeTab === 'chemistry') {
      units = chemistryCategory === 'All'
        ? JEE_MAIN_CHEMISTRY_SYLLABUS.units
        : JEE_MAIN_CHEMISTRY_SYLLABUS.units.filter((u) => u.category === chemistryCategory);
    } else if (activeTab === 'mathematics') {
      units = JEE_MAIN_MATHEMATICS_SYLLABUS.units;
    }

    if (!searchQuery.trim()) return units;

    const q = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) ||
        u.topics.some((t) => t.name.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q)))
    );
  }, [activeTab, chemistryCategory, searchQuery]);

  const toggleUnit = (id: string) => {
    setExpandedUnitId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAEFEA] px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#355238]">
            <Sparkles className="h-3.5 w-3.5 text-[#355238]" />
            <span>NTA Official Syllabus • 2027 Blueprint</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#121316] font-sans tracking-tight">
            Complete Subject Curriculum Architecture
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            All 54 Units categorized with official NTA topic statements, estimated weightages, and experimental skills.
          </p>
        </div>

        {/* Search Input */}
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#71717A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search topics, laws, experiments..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-9 pr-4 text-xs font-medium text-[#121316] shadow-xs placeholder-[#A1A1AA] focus:border-[#20252B] focus:outline-none focus:ring-1 focus:ring-[#20252B]"
          />
        </div>
      </div>

      {/* Primary Subject Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#E4E4DF] pb-3">
        {[
          { id: 'physics', label: 'Physics', count: '20 Units', icon: Atom },
          { id: 'chemistry', label: 'Chemistry', count: '20 Units', icon: FlaskConical },
          { id: 'mathematics', label: 'Mathematics', count: '14 Units', icon: Compass },
          { id: 'paper2', label: 'Paper 2A & 2B', count: 'B.Arch & B.Plan', icon: Layers },
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
                  ? 'bg-[#121316] text-white shadow-md'
                  : 'bg-white border border-[#E4E4DF] text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-mono ${
                  isActive ? 'bg-white/20 text-white' : 'bg-[#EAEFEA] text-[#355238]'
                }`}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Sub-category Filter for Chemistry */}
      {activeTab === 'chemistry' && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-[#71717A] flex items-center gap-1">
            <SlidersHorizontal className="h-3.5 w-3.5" /> Branch:
          </span>
          {(['All', 'Physical', 'Inorganic', 'Organic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setChemistryCategory(cat)}
              className={`rounded-lg px-3 py-1 text-xs font-bold transition-all ${
                chemistryCategory === cat
                  ? 'bg-[#EAEFEA] text-[#244026] border border-[#BACDBA]'
                  : 'text-[#71717A] hover:bg-neutral-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Content Area */}
      {activeTab !== 'paper2' ? (
        <div className="space-y-3">
          {displayedUnits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DCE2E6] bg-white p-12 text-center text-xs text-[#71717A]">
              No units or topics matched "{searchQuery}". Try searching for broader terms like "optics", "equilibrium", or "matrices".
            </div>
          ) : (
            displayedUnits.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              return (
                <div
                  key={unit.id}
                  className={`rounded-2xl border transition-all overflow-hidden ${
                    isExpanded
                      ? 'border-[#121316] bg-white shadow-md'
                      : 'border-[#E4E4DF] bg-white hover:border-[#BACDBA]'
                  }`}
                >
                  {/* Unit Title Bar */}
                  <button
                    onClick={() => toggleUnit(unit.id)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left transition-colors"
                  >
                    <div className="flex items-center gap-3.5">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F0] font-mono text-xs font-black text-[#121316] border border-[#E4E4DF]">
                        U{unit.unitNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#121316] font-sans">
                            {unit.name}
                          </h3>
                          {unit.category && (
                            <span className="rounded-md bg-[#F7F3EB] px-2 py-0.5 text-[10px] font-bold text-[#6E5328]">
                              {unit.category}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-[#71717A] line-clamp-1">
                          {unit.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <div className="hidden sm:flex items-center gap-1.5 rounded-full bg-[#EAEFEA] px-2.5 py-1 text-[11px] font-bold text-[#355238]">
                        <BadgePercent className="h-3 w-3" />
                        <span>~{unit.weightagePercent}%</span>
                      </div>

                      <div className="text-xs text-[#71717A] font-mono">
                        {unit.topics.length} Topics
                      </div>

                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-[#121316]" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-[#71717A]" />
                      )}
                    </div>
                  </button>

                  {/* Expandable Topic Details */}
                  {isExpanded && (
                    <div className="border-t border-[#F1F3F4] bg-[#FAFAFA] p-5 sm:p-6 space-y-4">
                      <div className="text-xs font-semibold uppercase tracking-wider text-[#71717A]">
                        Official Syllabus Topics & Sub-Competencies
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {unit.topics.map((topic) => (
                          <div
                            key={topic.id}
                            className="rounded-xl border border-[#E4E4DF] bg-white p-3.5 shadow-xs space-y-1.5"
                          >
                            <div className="flex items-start gap-2">
                              <CheckCircle2 className="h-3.5 w-3.5 text-[#355238] shrink-0 mt-0.5" />
                              <div className="font-bold text-xs text-[#121316]">
                                {topic.name}
                              </div>
                            </div>
                            {topic.details && (
                              <p className="pl-5 text-[11px] text-[#66727D] leading-relaxed">
                                {topic.details}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>

                      {/* Special callout for practical skills */}
                      {unit.unitNumber === 20 && (
                        <div className="rounded-xl border border-[#BACDBA] bg-[#F3F7F3] p-4 text-xs text-[#244026] flex items-start gap-2.5">
                          <FlaskConical className="h-4 w-4 text-[#355238] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold">NTA Testing Focus:</span> This experimental unit directly supplies 4 to 8 marks across Section A and Section B, testing apparatus configuration, graph slopes, error calculation, and identification of components.
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      ) : (
        /* Paper 2A & 2B Dedicated Modules */
        <div className="space-y-6">
          {/* Paper 2A */}
          <div className="rounded-2xl border border-[#E4E4DF] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#121316] text-white font-mono font-bold text-sm">
                2A
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#121316]">
                  Paper 2A (B.Arch) — Architecture Aptitude & Drawing
                </h3>
                <p className="text-xs text-[#71717A]">
                  Mathematics (14 Units identical to Paper 1) + Part II Aptitude Test + Part III Drawing Test
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {JEE_MAIN_PAPER_2A_SYLLABUS.map((mod) => (
                <div key={mod.id} className="rounded-xl border border-[#DCE2E6] bg-[#FAFAFA] p-5 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAEFEA] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#355238]">
                    {mod.partNumber}
                  </div>
                  <h4 className="text-sm font-bold text-[#121316]">{mod.title}</h4>
                  <div className="space-y-3">
                    {mod.units.map((u) => (
                      <div key={u.unitNumber} className="space-y-1">
                        <div className="text-xs font-semibold text-[#121316]">
                          Unit {u.unitNumber}: {u.title}
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-[11px] text-[#66727D]">
                          {u.details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Paper 2B */}
          <div className="rounded-2xl border border-[#E4E4DF] bg-white p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#355238] text-white font-mono font-bold text-sm">
                2B
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#121316]">
                  Paper 2B (B.Planning) — Planning Curriculum
                </h3>
                <p className="text-xs text-[#71717A]">
                  Mathematics (14 Units) + Part II Aptitude Test + Part III Planning Test
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {JEE_MAIN_PAPER_2B_SYLLABUS.map((mod) => (
                <div key={mod.id} className="rounded-xl border border-[#DCE2E6] bg-[#FAFAFA] p-5 space-y-3">
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAEFEA] px-2.5 py-0.5 text-[10px] font-bold uppercase text-[#355238]">
                    {mod.partNumber} • {mod.title}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {mod.units.map((u) => (
                      <div key={u.unitNumber} className="rounded-lg bg-white p-3 border border-[#E4E4DF] space-y-1.5">
                        <div className="text-xs font-bold text-[#121316]">
                          Unit {u.unitNumber}: {u.title}
                        </div>
                        <ul className="space-y-1 text-[11px] text-[#66727D]">
                          {u.details.map((d, i) => (
                            <li key={i} className="flex items-start gap-1.5">
                              <span className="text-[#355238] font-bold">•</span>
                              <span>{d}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
