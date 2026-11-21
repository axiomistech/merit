'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  BookOpen,
  ArrowRight,
  Award,
  CheckCircle2,
  Clock,
  Layers,
  Sparkles,
  Target,
} from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CC6E0]/40 bg-[#9CC6E0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <Shield className="h-3.5 w-3.5" />
            About FORT Learning
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#20252B] tracking-tight">
            Knowledge. Built Strong.
          </h1>
          <p className="text-sm sm:text-base text-[#66727D] leading-relaxed">
            FORT Learning is an online examination preparation, practice, and diagnostic assessment ecosystem engineered for serious students.
          </p>
        </div>

        {/* The 6-Stage Pedagogy */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <h2 className="text-2xl font-bold font-serif text-[#20252B]">Our Core Pedagogy</h2>
          <p className="text-xs text-[#66727D] leading-relaxed">
            We reject superficial question dumping and generic percentage scores. FORT guides candidates through a structured cognitive loop designed to systematically eliminate conceptual vulnerabilities:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-2">
            {[
              { step: '01', title: 'Learning', desc: 'Core concept mastery structured through hierarchical syllabus trees.' },
              { step: '02', title: 'Understanding', desc: 'Mathematical derivations and KaTeX-rendered multi-step explanations.' },
              { step: '03', title: 'Practice', desc: 'Curated chapter-wise MCQs with timed 15-second standard feedback.' },
              { step: '04', title: 'Examination', desc: 'Realistic full-length simulations with authentic printable A4 OMR sheets.' },
              { step: '05', title: 'Analysis', desc: 'Sub-concept diagnostic accuracy, speed velocity, and penalty metrics.' },
              { step: '06', title: 'Improvement', desc: 'Targeted practice recommendations generated from real attempt weaknesses.' },
            ].map((p) => (
              <div key={p.step} className="p-4 rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4]/50 space-y-1.5">
                <span className="font-mono text-xs font-bold text-[#9CC6E0]">{p.step}</span>
                <h3 className="font-bold text-sm text-[#20252B]">{p.title}</h3>
                <p className="text-[11px] text-[#66727D] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Architectural Principles */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_20px_rgba(38,49,38,0.04)] space-y-6">
          <h2 className="text-2xl font-bold font-serif text-[#20252B]">Engineering & Integrity Principles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs text-[#52584E]">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DCE2E6]">
              <CheckCircle2 className="h-4 w-4 text-[#9CC6E0] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#20252B]">Immutable Historical Snapshots</div>
                <div className="text-[#66727D] mt-0.5">When questions or scoring rules are updated in the question bank, candidate past attempts remain permanently unchanged and reproducible.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DCE2E6]">
              <CheckCircle2 className="h-4 w-4 text-[#9CC6E0] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#20252B]">Authoritative Server-Side Scoring</div>
                <div className="text-[#66727D] mt-0.5">Exam timers, question responses, answer evaluation, and negative marking are calculated strictly on the backend—never trusting client-side manipulation.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DCE2E6]">
              <CheckCircle2 className="h-4 w-4 text-[#9CC6E0] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#20252B]">Authentic Printable NEET OMR</div>
                <div className="text-[#66727D] mt-0.5">True-to-life 180-question A4 vector OMR sheets with barcode serials, roll number bubbles, and candidate declaration boxes.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#DCE2E6]">
              <CheckCircle2 className="h-4 w-4 text-[#9CC6E0] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#20252B]">Zero Fake Statistics</div>
                <div className="text-[#66727D] mt-0.5">All analytics, score percentiles, and recommendations are derived dynamically from verified database attempt records.</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DCE2E6] flex justify-center">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
            >
              Join FORT Learning Today
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
