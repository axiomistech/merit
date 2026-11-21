'use client';

import React from 'react';
import Link from 'next/link';
import { Bookmark, ArrowRight, BookOpen, Layers } from 'lucide-react';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';

export default function BookmarksPage() {
  const bookmarked = [SAMPLE_NEET_QUESTIONS[0], SAMPLE_NEET_QUESTIONS[3]];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="border-b border-[#DCE2E6] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#20252B]">
          Curated Revision
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-serif">
          Saved Question Bookmarks
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
          Questions flagged during practice sessions or timed simulations for focused conceptual review.
        </p>
      </div>

      <div className="space-y-4">
        {bookmarked.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#20252B]">{q.conceptName}</span>
              <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[#20252B] uppercase font-bold text-[10px]">
                {q.subjectName}
              </span>
            </div>

            <div className="text-sm text-[#20252B] leading-relaxed">
              <MathText content={q.text} />
            </div>

            <div className="border-t border-[#DCE2E6] pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#66727D]">Saved for conceptual review</span>
              <Link
                href="/exam/neet-demo"
                className="inline-flex items-center gap-1.5 font-bold text-[#20252B] hover:text-[#20252B] transition-colors"
              >
                <span>Re-attempt Question</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
