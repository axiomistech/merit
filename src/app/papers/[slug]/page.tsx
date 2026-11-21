'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Award,
  ArrowRight,
  Shield,
  Download,
  ChevronRight,
  CheckCircle2,
} from 'lucide-react';

export default function PublicPaperDetailPage() {
  const params = useParams();
  const slug = (params?.slug as string) || 'neet-2025-official-pyq';

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="flex items-center gap-2 text-xs text-[#73786E]">
          <Link href="/" className="hover:text-[#263126]">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/papers" className="hover:text-[#263126]">Previous Year Papers</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#263126]">Paper Overview</span>
        </div>

        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <div className="flex items-center justify-between">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#9CAF88]/20 text-[#3B4C30]">
              Official NTA Question Paper
            </span>
            <span className="text-xs font-mono font-bold text-[#73786E]">Format: CBT + OMR</span>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-serif text-[#263126]">
              NEET (UG) 2025 Official Question Paper
            </h1>
            <p className="mt-2 text-sm text-[#73786E] leading-relaxed">
              Complete 180 questions across Physics, Chemistry, Botany, and Zoology. Attempt in timed full-screen examination mode with instant personalized printable A4 OMR answer sheet download and granular diagnostic report.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#ECEAE4]">
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Total Questions</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">180 MCQs</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Duration</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">200 Minutes</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Max Marks</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">720 Marks</div>
            </div>
            <div className="p-3 rounded-xl bg-[#F7F5EF]">
              <div className="text-[10px] text-[#73786E] uppercase font-bold">Marking</div>
              <div className="mt-1 text-base font-bold font-mono text-[#263126]">+4 / -1 / 0</div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#ECEAE4] flex flex-wrap items-center gap-3">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              Attempt This Paper Now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
