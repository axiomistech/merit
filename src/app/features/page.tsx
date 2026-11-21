import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, Clock, CheckCircle2, FileText, Cpu, Database } from 'lucide-react';

export const metadata = {
  title: 'Platform Features — FORT Learning',
  description:
    'Core product architecture of FORT Learning: server-authoritative timer, live OMR synchronization, centralized scoring engine, and KaTeX mathematical rendering.',
};

export default function FeaturesPage() {
  const features = [
    {
      title: 'Server-Authoritative Exam Engine',
      desc: 'Timer counts down against a tamper-proof server deadline. Browser sleep, refresh, or tab switching will not restart the timer. Automatic submission fires on zero.',
    },
    {
      title: 'Live OMR Response Sheet',
      desc: 'Bidirectional synchronization between clicked options and OMR bubbles. Generates high-resolution vector A4 print-ready PDFs with candidate hashes.',
    },
    {
      title: 'Centralized Multi-Scheme Scoring',
      desc: 'Unified engine supporting NEET (+4, -1), JEE Main MCQs and numerical tolerances, JEE Advanced partial marking, and UPSC negative penalties.',
    },
    {
      title: 'KaTeX Mathematical & Chemical Notation',
      desc: 'Crisp mathematical equations, chemical formulas, and scientific notation rendered cleanly on mobile, tablet, and desktop.',
    },
    {
      title: 'Idempotent Payment Settlement',
      desc: 'HMAC SHA256 verified Razorpay webhooks, preventing duplicate entitlement grants and race conditions on free paper claims.',
    },
    {
      title: 'Evidence-Based Remediation Queue',
      desc: 'Recommends revision based purely on candidate data—explaining explicitly why each topic was prioritized without fabricated claims.',
    },
  ];

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Engineered for Academic Seriousness</h1>
          <p className="mt-4 text-base text-[#A7B0C0]">
            Every feature on FORT Learning is designed to solve a specific challenge in high-stakes
            competitive examination preparation.
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((f, idx) => (
            <div key={idx} className="rounded-2xl border border-[#263554] bg-[#11182A] p-6">
              <h3 className="text-lg font-bold text-[#F5F7FB]">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-[#A7B0C0]">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
