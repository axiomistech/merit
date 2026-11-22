'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bookmark, ArrowRight, BookOpen, Layers, FileText } from 'lucide-react';
import { MathText } from '@/components/ui/MathText';

export default function BookmarksPage() {
  const [bookmarked, setBookmarked] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_bookmarks');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            setBookmarked(parsed);
          }
        } catch {}
      }
      setLoading(false);
    }
  }, []);

  return (
    <div className="liquid-canvas min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto relative text-[#20252B]">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 right-1/4 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-10 left-1/4 h-72 w-72 opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-[#DCE2E6]/80 pb-6">
        <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
            Curated Revision
          </span>
        </div>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
          Saved Question Bookmarks
        </h1>
        <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
          Questions flagged during practice sessions or timed simulations for focused conceptual review.
        </p>
      </div>

      {!loading && bookmarked.length === 0 ? (
        <div className="relative z-10 glass-polar rounded-[32px] p-12 text-center space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
            <Bookmark className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold font-sans text-[#20252B]">
              No Bookmarked Questions Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#66727D] max-w-md mx-auto leading-relaxed">
              While attempting questions in tests or practice sessions, flag challenging problems to build your personalized revision deck here.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/qp-prep"
              className="glass-racing-red inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
            >
              <FileText className="h-4 w-4" />
              <span>Browse Question Papers</span>
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-10 space-y-4">
          {bookmarked.map((q, idx) => (
            <div
              key={q.id || idx}
              className="glass-polar rounded-[28px] p-6 shadow-sm space-y-4"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-[#20252B]">{q.conceptName || 'Question Bookmark'}</span>
                {q.subjectName && (
                  <span className="glass-pill px-3 py-0.5 text-[#20252B] uppercase font-bold text-[10px]">
                    {q.subjectName}
                  </span>
                )}
              </div>

              <div className="text-sm text-[#20252B] leading-relaxed">
                <MathText content={q.text || ''} />
              </div>

              <div className="border-t border-[#DCE2E6]/80 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-[#66727D]">Saved for conceptual review</span>
                {q.paperSlug && (
                  <Link
                    href={`/exam/${q.paperSlug}`}
                    className="inline-flex items-center gap-1.5 font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                  >
                    <span>Re-attempt Question</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
