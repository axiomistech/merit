'use client';

import React, { useState, useMemo } from 'react';
import {
  BookOpen,
  Search,
  ChevronDown,
  ChevronUp,
  FlaskConical,
  Dna,
  Atom,
  CheckCircle2,
  Sparkles,
  Layers,
  FileText,
  BadgePercent,
  SlidersHorizontal,
  Microscope,
} from 'lucide-react';
import {
  NEET_PHYSICS_SYLLABUS,
  NEET_CHEMISTRY_SYLLABUS,
  NEET_BIOLOGY_SYLLABUS,
  NEET_SYLLABUS_OVERVIEW,
  SyllabusChapterOrUnit,
} from '@/data/neetSyllabusData';

export function NeetSyllabusExplorer() {
  const [activeTab, setActiveTab] = useState<'physics' | 'chemistry' | 'biology' | 'practicals'>('physics');
  const [chemistryCategory, setChemistryCategory] = useState<'All' | 'Physical' | 'Inorganic' | 'Organic'>('All');
  const [biologyCategory, setBiologyCategory] = useState<'All' | 'Botany' | 'Zoology' | 'General'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedUnitId, setExpandedUnitId] = useState<string | null>('phy-u1');

  // Filtered units based on active tab and search query
  const displayedUnits = useMemo(() => {
    let units: SyllabusChapterOrUnit[] = [];
    if (activeTab === 'physics') {
      units = NEET_PHYSICS_SYLLABUS.units;
    } else if (activeTab === 'chemistry') {
      units = chemistryCategory === 'All'
        ? NEET_CHEMISTRY_SYLLABUS.units
        : NEET_CHEMISTRY_SYLLABUS.units.filter((u) => u.category === chemistryCategory);
    } else if (activeTab === 'biology') {
      units = biologyCategory === 'All'
        ? NEET_BIOLOGY_SYLLABUS.units
        : NEET_BIOLOGY_SYLLABUS.units.filter((u) => u.category === biologyCategory || u.category === 'General');
    }

    if (!searchQuery.trim()) return units;

    const q = searchQuery.toLowerCase();
    return units.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.description.toLowerCase().includes(q) ||
        u.topics.some((t) => t.name.toLowerCase().includes(q) || (t.details && t.details.toLowerCase().includes(q)))
    );
  }, [activeTab, chemistryCategory, biologyCategory, searchQuery]);

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
            <span>NMC / NTA Official Syllabus • Academic Session 2026-27</span>
          </div>
          <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#121316] font-sans tracking-tight">
            Complete Medical Entrance Curriculum
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            All 50 Units across Physics (20), Chemistry (20), and Biology (10) categorized with official NMC/NTA topic statements, estimated weightages, and laboratory skills.
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
          { id: 'biology', label: 'Biology (Botany & Zoology)', count: '10 Units', icon: Dna },
          { id: 'practicals', label: 'Practical Lab Skills', count: 'Physics & Chem', icon: Microscope },
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

      {/* Chemistry Category Pills */}
      {activeTab === 'chemistry' && (
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="text-xs font-semibold text-[#71717A]">Category:</span>
          {(['All', 'Physical', 'Inorganic', 'Organic'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setChemistryCategory(cat)}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                chemistryCategory === cat
                  ? 'bg-[#355238] text-white shadow-xs'
                  : 'bg-[#F4F4F0] text-[#52525B] hover:bg-[#EAEFEA] hover:text-[#121316]'
              }`}
            >
              {cat} {cat === 'Physical' ? '(8 Units)' : cat === 'Inorganic' ? '(4 Units)' : cat === 'Organic' ? '(8 Units)' : '(20 Units)'}
            </button>
          ))}
        </div>
      )}

      {/* Biology Category Pills */}
      {activeTab === 'biology' && (
        <div className="flex items-center gap-2 pt-1 text-xs">
          <span className="text-xs font-semibold text-[#71717A]">Sub-discipline:</span>
          {(['All', 'Botany', 'Zoology'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setBiologyCategory(cat)}
              className={`rounded-full px-3 py-1 font-semibold transition-all ${
                biologyCategory === cat
                  ? 'bg-[#355238] text-white shadow-xs'
                  : 'bg-[#F4F4F0] text-[#52525B] hover:bg-[#EAEFEA] hover:text-[#121316]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Main Units Accordion Display */}
      {activeTab !== 'practicals' ? (
        <div className="space-y-3">
          {displayedUnits.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-[#DCE2E6] bg-white p-8 text-center text-xs text-[#71717A]">
              No units or topics matched your search query &quot;{searchQuery}&quot;.
            </div>
          ) : (
            displayedUnits.map((unit) => {
              const isExpanded = expandedUnitId === unit.id;
              return (
                <div
                  key={unit.id}
                  className={`rounded-2xl border transition-all ${
                    isExpanded
                      ? 'border-[#20252B] bg-white shadow-sm ring-1 ring-[#20252B]'
                      : 'border-[#E4E4DF] bg-white hover:border-[#BACDBA]'
                  }`}
                >
                  {/* Unit Title Bar */}
                  <button
                    type="button"
                    onClick={() => toggleUnit(unit.id)}
                    className="flex w-full items-center justify-between p-4 sm:p-5 text-left"
                  >
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F4F4F0] font-mono text-xs font-bold text-[#121316]">
                        {unit.unitNumber < 10 ? `0${unit.unitNumber}` : unit.unitNumber}
                      </div>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="text-sm sm:text-base font-bold text-[#121316] font-sans">
                            {unit.name}
                          </h3>
                          {unit.category && (
                            <span className="rounded-md bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-semibold text-[#52525B]">
                              {unit.category}
                            </span>
                          )}
                        </div>
                        <p className="mt-0.5 text-xs text-[#52525B] line-clamp-1">{unit.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#EAEFEA] px-2.5 py-1 text-[11px] font-bold text-[#355238]">
                        <BadgePercent className="h-3 w-3" />
                        <span>~{unit.weightagePercent}%</span>
                      </span>
                      <span className="text-xs text-[#71717A] hidden md:inline">
                        {unit.topics.length} topics
                      </span>
                      <div className="text-[#52525B]">
                        {isExpanded ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Topics Table */}
                  {isExpanded && (
                    <div className="border-t border-[#E4E4DF] bg-[#FAFBF9] p-4 sm:p-6 space-y-3">
                      <div className="text-xs font-bold uppercase tracking-wider text-[#71717A]">
                        Official Prescribed Topics & Experimental Boundaries
                      </div>
                      <div className="grid grid-cols-1 gap-2.5">
                        {unit.topics.map((topic, tIdx) => (
                          <div
                            key={topic.id}
                            className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 rounded-xl border border-[#E4E4DF] bg-white p-3 text-xs"
                          >
                            <div className="space-y-1">
                              <div className="flex items-center gap-2">
                                <span className="font-mono text-[10px] text-[#A1A1AA]">
                                  {unit.unitNumber}.{tIdx + 1}
                                </span>
                                <span className="font-bold text-[#121316]">{topic.name}</span>
                                {topic.isHighYield && (
                                  <span className="rounded-full bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-700 border border-amber-200">
                                    High Yield
                                  </span>
                                )}
                              </div>
                              {topic.details && (
                                <p className="text-[11px] text-[#52525B] pl-5 leading-relaxed">
                                  {topic.details}
                                </p>
                              )}
                            </div>
                            <div className="shrink-0 pl-5 sm:pl-0">
                              <span className="inline-flex items-center gap-1 rounded-md bg-[#F4F4F0] px-2 py-0.5 text-[10px] font-medium text-[#52525B]">
                                <CheckCircle2 className="h-3 w-3 text-emerald-600" />
                                <span>Core NCERT</span>
                              </span>
                            </div>
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
      ) : (
        /* Practical Laboratory Modules Display (Physics Unit 20 + Chemistry Unit 20) */
        <div className="space-y-8">
          {/* Physics Unit 20 Practical Experiments */}
          <div className="merit-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-800 border border-blue-200">
                  <Atom className="h-3.5 w-3.5" />
                  <span>Physics Unit 20 • 18 Practical Laboratory Experiments</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#121316] font-sans">
                  Experimental Skills & Instrument Calculations
                </h3>
              </div>
              <span className="text-xs font-bold text-[#355238] bg-[#EAEFEA] px-3 py-1.5 rounded-xl">
                ~6% Examination Weightage
              </span>
            </div>

            <p className="text-xs text-[#52525B] leading-relaxed">
              As notified in the official NEET syllabus, questions are drawn directly from the 18 specific laboratory activities:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {NEET_PHYSICS_SYLLABUS.units[19].topics.map((exp, idx) => (
                <div key={exp.id} className="rounded-xl border border-[#E4E4DF] bg-white p-3 space-y-1">
                  <div className="font-bold text-[#121316]">{exp.name}</div>
                  <div className="text-[11px] text-[#52525B]">{exp.details}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Chemistry Unit 20 Practical Experiments */}
          <div className="merit-card p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-4">
              <div>
                <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-800 border border-emerald-200">
                  <FlaskConical className="h-3.5 w-3.5" />
                  <span>Chemistry Unit 20 • Principles Related to Practical Chemistry</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-[#121316] font-sans">
                  Qualitative, Quantitative & Titrimetric Lab Analysis
                </h3>
              </div>
              <span className="text-xs font-bold text-[#355238] bg-[#EAEFEA] px-3 py-1.5 rounded-xl">
                ~5% Examination Weightage
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {NEET_CHEMISTRY_SYLLABUS.units[19].topics.map((exp) => (
                <div key={exp.id} className="rounded-xl border border-[#E4E4DF] bg-white p-3 space-y-1">
                  <div className="font-bold text-[#121316]">{exp.name}</div>
                  <div className="text-[11px] text-[#52525B]">{exp.details}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
