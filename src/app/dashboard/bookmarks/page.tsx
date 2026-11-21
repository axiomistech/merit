'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, ArrowRight } from 'lucide-react';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';

export default function BookmarksPage() {
  const bookmarked = [SAMPLE_NEET_QUESTIONS[0], SAMPLE_NEET_QUESTIONS[3]];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-[#263554] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
          Curated Revision
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
          Saved Question Bookmarks
        </h1>
        <p className="text-xs text-[#A7B0C0]">
          Questions flagged during practice or examination review for focused revision.
        </p>
      </div>

      <div className="space-y-4">
        {bookmarked.map((q, idx) => (
          <div key={q.id} className="rounded-xl border border-[#263554] bg-[#11182A] p-6 space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#6486C6]">{q.conceptName}</span>
              <span className="rounded bg-[#172033] px-2 py-0.5 text-[#A7B0C0] uppercase font-bold text-[10px]">
                {q.subjectName}
              </span>
            </div>

            <div className="text-sm text-[#F5F7FB]">
              <MathText content={q.text} />
            </div>

            <div className="border-t border-[#263554] pt-3 flex justify-between items-center text-xs">
              <span className="text-[#A7B0C0]">Saved for conceptual review</span>
              <Link href="/exam/neet-demo" className="font-bold text-[#6486C6] hover:underline">
                Re-attempt Question →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
