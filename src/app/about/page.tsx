import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Award,
} from 'lucide-react';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export const metadata = {
  title: 'About — MERITWISE',
  description: 'Serious competitive examination practice and assessment platform for NEET, JEE, UPSC, and GATE.',
};

export default function AboutPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#52525B]">
            <MeritwiseLogo variant="gold" size="xs" showWordmark={false} />
            <span>About MERITWISE</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#121316]">
            Practice with purpose. Progress with merit.
          </h1>
          <p className="text-base text-[#52525B] leading-relaxed">
            MERITWISE is a serious digital examination practice and assessment platform built for students preparing for India's high-stakes competitive examinations.
          </p>
        </div>

        {/* Core Principles */}
        <div className="merit-card p-8 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-[#121316]">Purpose & Philosophy</h2>
          <p className="text-xs text-[#52525B] leading-relaxed">
            We reject the coaching-institute clutter, fake toppers, inflated question counts, and aggressive sales funnels that dominate online education. MERITWISE is designed as quiet, high-precision academic examination infrastructure.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
            {[
              { step: '01', title: 'Curated Papers', desc: 'Authentic examination papers adhering strictly to official examination blueprints.' },
              { step: '02', title: 'Timed Testing', desc: 'Server-authoritative test countdowns with automated submission sync.' },
              { step: '03', title: 'Objective Evaluation', desc: 'Rigorous scoring engines matching negative and partial marking rules.' },
              { step: '04', title: 'Merit Diagnostics', desc: 'Sectional speed, accuracy, and sub-concept mastery analysis.' },
            ].map((p) => (
              <div key={p.step} className="p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] space-y-1.5">
                <span className="font-mono text-xs font-bold text-[#8C6D3B]">{p.step}</span>
                <h3 className="font-bold text-sm text-[#121316]">{p.title}</h3>
                <p className="text-[11px] text-[#71717A] leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Focused Disciplines */}
        <div className="merit-card p-8 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-[#121316]">Strict Four-Curriculum Focus</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#52525B]">
            <div className="p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] space-y-1">
              <div className="font-bold text-[#121316] text-sm">NEET (UG)</div>
              <p className="text-[#71717A]">
                180-question timed simulations across Physics, Chemistry, Botany, and Zoology with instant vector A4 OMR sheets.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] space-y-1">
              <div className="font-bold text-[#121316] text-sm">JEE (Main & Advanced)</div>
              <p className="text-[#71717A]">
                Computer-Based Test simulation with single-choice, multi-select partial scoring, and numerical value entry.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] space-y-1">
              <div className="font-bold text-[#121316] text-sm">UPSC Civil Services</div>
              <p className="text-[#71717A]">
                Prelims General Studies Paper I and CSAT Paper II with standard fractional negative marking calibration.
              </p>
            </div>
            <div className="p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF] space-y-1">
              <div className="font-bold text-[#121316] text-sm">GATE</div>
              <p className="text-[#71717A]">
                Branch-specific examination preparation across CS, DA, ME, EE, EC, and CE with MCQ, MSQ, and NAT questions.
              </p>
            </div>
          </div>
        </div>

        {/* Engineering Principles */}
        <div className="merit-card p-8 sm:p-10 shadow-xs space-y-6">
          <h2 className="text-xl font-bold text-[#121316]">Platform Integrity Standards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF]">
              <ShieldCheck className="h-4 w-4 text-[#8C6D3B] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#121316]">Zero AI-Generated Questions</div>
                <div className="text-[#71717A] mt-0.5">Every paper and solution is verified and entered by authorized academic administrators.</div>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 rounded-xl border border-[#E4E4DF] bg-[#FFFFFF]">
              <Clock className="h-4 w-4 text-[#8C6D3B] shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-[#121316]">Authoritative Timing & Scoring</div>
                <div className="text-[#71717A] mt-0.5">Test windows and scores are calculated server-side to guarantee consistency and security.</div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#E4E4DF] flex justify-center">
            <Link
              href="/signup"
              className="btn-merit-primary px-8 py-3 text-xs font-bold uppercase tracking-wider"
            >
              <span>Get Started with MERITWISE</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
