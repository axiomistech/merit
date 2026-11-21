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
      <div className="border-b border-[#ECEAE4] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#758B62]">
          Curated Revision
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
          Saved Question Bookmarks
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
          Questions flagged during practice sessions or timed simulations for focused conceptual review.
        </p>
      </div>

      <div className="space-y-4">
        {bookmarked.map((q) => (
          <div
            key={q.id}
            className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4"
          >
            <div className="flex items-center justify-between text-xs">
              <span className="font-semibold text-[#758B62]">{q.conceptName}</span>
              <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[#263126] uppercase font-bold text-[10px]">
                {q.subjectName}
              </span>
            </div>

            <div className="text-sm text-[#2E332D] leading-relaxed">
              <MathText content={q.text} />
            </div>

            <div className="border-t border-[#ECEAE4] pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
              <span className="text-[#92958D]">Saved for conceptual review</span>
              <Link
                href="/exam/neet-demo"
                className="inline-flex items-center gap-1.5 font-bold text-[#758B62] hover:text-[#263126] transition-colors"
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
