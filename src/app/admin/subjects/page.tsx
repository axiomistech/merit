'use client';

import React, { useState } from 'react';
import { FolderTree, Plus, BookOpen, Layers, Edit2, Search } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminSubjectsPage() {
  const [search, setSearch] = useState('');

  const subjectsData = [
    {
      id: 'sub_1',
      exam: 'NEET (UG)',
      name: 'Physics',
      unitsCount: 10,
      chaptersCount: 28,
      totalQuestions: 2450,
      activeStatus: 'Active',
    },
    {
      id: 'sub_2',
      exam: 'NEET (UG)',
      name: 'Chemistry',
      unitsCount: 12,
      chaptersCount: 30,
      totalQuestions: 2600,
      activeStatus: 'Active',
    },
    {
      id: 'sub_3',
      exam: 'NEET (UG)',
      name: 'Botany',
      unitsCount: 8,
      chaptersCount: 22,
      totalQuestions: 2100,
      activeStatus: 'Active',
    },
    {
      id: 'sub_4',
      exam: 'NEET (UG)',
      name: 'Zoology',
      unitsCount: 8,
      chaptersCount: 20,
      totalQuestions: 1950,
      activeStatus: 'Active',
    },
    {
      id: 'sub_5',
      exam: 'JEE Main',
      name: 'Mathematics',
      unitsCount: 10,
      chaptersCount: 26,
      totalQuestions: 3100,
      activeStatus: 'Active',
    },
  ];

  const filtered = subjectsData.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.exam.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#20252B]">
            Subjects & Chapter Portfolios
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Discipline configuration, unit subdivisions, and chapter-wise question allocations.
          </p>
        </div>

        <div className="relative max-w-xs">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search subject or exam..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-1.5 pl-9 pr-3 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((sub) => (
          <div
            key={sub.id}
            className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm hover:border-[#20252B] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-[10px] font-bold text-[#20252B]">
                  {sub.exam}
                </span>
                <span className="text-[10px] font-bold text-[#20252B] uppercase">
                  {sub.activeStatus}
                </span>
              </div>

              <h3 className="mt-3 text-xl font-bold font-serif text-[#20252B]">
                {sub.name}
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F3F4] p-3 text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#66727D]">Units</div>
                  <div className="font-mono font-bold text-[#20252B]">{sub.unitsCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Chapters</div>
                  <div className="font-mono font-bold text-[#20252B]">{sub.chaptersCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Questions</div>
                  <div className="font-mono font-bold text-[#20252B]">{sub.totalQuestions}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE2E6] flex items-center justify-between text-xs">
              <span className="text-[#66727D]">Standard Syllabus Node</span>
              <button
                onClick={() => toast.info(`Opened chapter allocation for ${sub.name}`)}
                className="font-bold text-[#20252B] hover:underline"
              >
                Manage Chapters →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
