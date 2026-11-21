'use client';

import React from 'react';
import Link from 'next/link';
import {
  Clock,
  Award,
  ArrowRight,
  Shield,
  CheckCircle2,
  FileText,
  Search,
} from 'lucide-react';
import { SAMPLE_NEET_PAPER } from '@/data/seedData';

export default function MockTestsCatalogPage() {
  const mockSeries = [
    {
      id: 'mock_neet_01',
      name: SAMPLE_NEET_PAPER.name,
      slug: SAMPLE_NEET_PAPER.slug,
      exam: 'NEET (UG)',
      questions: 180,
      duration: 200,
      maxMarks: 720,
      isFree: true,
      price: 10,
      description: 'Full-length NTA simulation with 45 Physics, 45 Chemistry, 45 Botany, and 45 Zoology questions. Auto-generates personalized printable NEET OMR sheet.',
    },
    {
      id: 'mock_neet_02',
      name: 'NEET 2026 All-India Grand Mock Test #2',
      slug: 'neet-2026-grand-mock-02',
      exam: 'NEET (UG)',
      questions: 180,
      duration: 200,
      maxMarks: 720,
      isFree: false,
      price: 10,
      description: 'Second full simulation in the official series. Evaluated under standard negative marking rules with all-India percentile ranking.',
    },
    {
      id: 'mock_jee_01',
      name: 'JEE Main 2026 Full Simulation Paper 1',
      slug: 'jee-main-2026-sim-01',
      exam: 'JEE Main',
      questions: 90,
      duration: 180,
      maxMarks: 300,
      isFree: true,
      price: 10,
      description: 'Complete CBT examination format covering Physics, Chemistry, and Mathematics with numerical value inputs and tolerance checking.',
    },
  ];

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CC6E0]/40 bg-[#9CC6E0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <Clock className="h-3.5 w-3.5" />
            Full-Length Mock Simulations
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#20252B]">
            Mock Examination Series
          </h1>
          <p className="text-sm text-[#66727D]">
            Practice in genuine test conditions. Instant score evaluation, percentile estimates, and personalized A4 OMR vector PDFs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockSeries.map((mock) => (
            <div
              key={mock.id}
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CC6E0] transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F1F3F4] text-[#52584E] border border-[#DCE2E6]">
                    {mock.exam}
                  </span>
                  {mock.isFree ? (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#9CC6E0]/20 text-[#3B4C30]">
                      Complimentary Claim
                    </span>
                  ) : (
                    <span className="text-xs font-mono font-bold text-[#20252B]">₹{mock.price}</span>
                  )}
                </div>

                <h3 className="font-bold text-lg font-serif text-[#20252B] leading-snug">
                  {mock.name}
                </h3>
                <p className="text-xs text-[#66727D] leading-relaxed line-clamp-3">
                  {mock.description}
                </p>

                <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#DCE2E6] text-xs">
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">Questions</span>
                    <span className="font-mono font-bold text-[#20252B]">{mock.questions}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">Duration</span>
                    <span className="font-mono font-bold text-[#20252B]">{mock.duration}m</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#66727D] uppercase font-bold block">Marks</span>
                    <span className="font-mono font-bold text-[#20252B]">{mock.maxMarks}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE2E6] flex items-center justify-between">
                <Link
                  href={`/mock-tests/${mock.slug}`}
                  className="text-xs font-semibold text-[#52584E] hover:text-[#20252B]"
                >
                  Preflight Details
                </Link>
                <Link
                  href={`/exam/ATT-MOCK-SIM`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors"
                >
                  Start Simulation
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
