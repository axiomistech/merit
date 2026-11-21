'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Clock,
  Award,
  ArrowRight,
  Shield,
  CheckCircle2,
  ChevronRight,
  Download,
} from 'lucide-react';
import { SAMPLE_NEET_PAPER } from '@/data/seedData';

export default function MockTestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = (params?.slug as string) || SAMPLE_NEET_PAPER.slug;

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#73786E]">
          <Link href="/dashboard" className="hover:text-[#263126]">Dashboard</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/mock-tests" className="hover:text-[#263126]">Mock Tests</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263126]">Simulation Overview</span>
        </div>

        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#9CAF88]/20 text-[#3B4C30]">
              Full Simulation Pass
            </span>
            <span className="text-xs font-mono font-bold text-[#73786E]">Standard ₹10 / 1 Token</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#263126]">
              {SAMPLE_NEET_PAPER.name}
            </h1>
            <p className="mt-2 text-sm text-[#73786E] leading-relaxed">
              Full-length national medical entrance simulation adhering strictly to official NTA timing, negative marking, and 4-column A4 OMR layout.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#ECEAE4]">
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Questions</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">180 MCQs</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Duration</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">200 Mins</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Maximum Score</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">720 Marks</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Marking Scheme</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">+4 / -1</div>
            </div>
          </div>

          <div className="space-y-2 pt-2 text-xs text-[#52584E]">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
              <span>Personalized printable A4 NEET OMR answer sheet auto-generated on completion</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
              <span>Full step-by-step KaTeX mathematical solutions available immediately after submission</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#9CAF88]" />
              <span>Sub-concept diagnostic accuracy and weak chapter recommendations</span>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECEAE4] flex items-center justify-between">
            <Link href="/mock-tests" className="text-xs font-semibold text-[#73786E] hover:text-[#263126]">
              Back to Catalog
            </Link>
            <button
              onClick={() => router.push('/exam/ATT-2026-NEET-01')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              Start Timed Test
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
