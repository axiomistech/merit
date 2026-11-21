import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers, CheckCircle2, GraduationCap, Building2 } from 'lucide-react';

export const metadata = {
  title: 'FORT Engineering — University Semester Examination Practice',
  description:
    'Configurable university semester examination practice for Anna University, VTU, JNTU, Mumbai University, and autonomous engineering colleges.',
};

export default function EngineeringLandingPage() {
  const sampleUniversities = [
    { name: 'Anna University', location: 'Chennai, Tamil Nadu', branches: 'CSE, ECE, EEE, Mech, Civil', code: 'Regulation 2021' },
    { name: 'Visvesvaraya Technological University (VTU)', location: 'Belagavi, Karnataka', branches: 'CSE, ISE, ECE, AI&DS', code: '2022 Scheme' },
    { name: 'Jawaharlal Nehru Technological University (JNTU)', location: 'Hyderabad, Telangana', branches: 'CSE, IT, ECE, Mech', code: 'R22 Regulations' },
    { name: 'University of Mumbai', location: 'Mumbai, Maharashtra', branches: 'Comps, IT, Extc, Mech', code: 'Rev 2019' },
  ];

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Hero Container in Glacier Blue */}
        <div className="rounded-[32px] bg-[#9CC6E0] p-8 sm:p-12 lg:p-16 text-[#20252B] shadow-xl relative overflow-hidden">
          <div className="max-w-2xl space-y-5">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#20252B]/80">
              <span className="h-px w-6 bg-[#20252B]/40" />
              <span>UNIVERSITY ACADEMIC INFRASTRUCTURE • SEMESTER SYLLABI</span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-bold font-sans tracking-tight leading-[1.1] text-[#20252B]">
              University exam{' '}
              <span className="relative inline-block italic">
                mastery.
                <svg
                  className="absolute -bottom-2 left-0 w-full text-[#E4002B] overflow-visible"
                  viewBox="0 0 100 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 8C26 3 66 2 98 7C70 11 36 10 5 9"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-[#20252B]/90 font-medium leading-relaxed">
              Configurable university semester examination preparation mapped directly to your university regulation, degree program, branch, semester, and course syllabus.
            </p>

            <div className="flex flex-wrap items-center gap-4 pt-3">
              <Link
                href="/signup"
                className="rounded-xl bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
              >
                Select Your University
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[#20252B]/20 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-sm font-semibold text-[#20252B] hover:bg-white transition-all shadow-sm"
              >
                Semester Pass Options
              </Link>
            </div>
          </div>
        </div>

        {/* Blueprint & Pattern */}
        <section>
          <div className="mb-6">
            <div className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              SUPPORTED REGIMES
            </div>
            <h2 className="mt-1 text-3xl font-bold font-sans text-[#20252B]">
              University Regimes & Autonomous Colleges
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sampleUniversities.map((uni, idx) => (
              <div key={idx} className="rounded-[24px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-bold text-[#20252B]">
                    {uni.code}
                  </span>
                  <span className="text-xs text-[#66727D]">{uni.location}</span>
                </div>
                <h3 className="mt-4 text-xl font-bold text-[#20252B] font-sans">{uni.name}</h3>
                <div className="mt-4 rounded-xl bg-[#F1F3F4] p-3 text-xs text-[#20252B]">
                  <span className="font-semibold text-[#20252B]">Active Streams:</span> {uni.branches}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Architectural Features */}
        <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-[#E9EEF1] flex items-center justify-center text-[#20252B] mb-4">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B] font-sans">Unit-by-Unit Question Banks</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              Aligned with 5-unit university syllabi. Practice Part A (2-mark definitions) and Part B (13/16-mark analytical derivations) separately.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-[#FDEDF0] flex items-center justify-center text-[#E4002B] mb-4">
              <BookOpen className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B] font-sans">Previous Years Question Papers</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              10+ semesters of solved question papers with model handwritten answer diagrams, standard equations, and step marking schemes.
            </p>
          </div>

          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-7 shadow-sm">
            <div className="h-10 w-10 rounded-xl bg-[#E9EEF1] flex items-center justify-center text-[#20252B] mb-4">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B] font-sans">Autonomous Scheme Support</h3>
            <p className="mt-2 text-xs leading-relaxed text-[#66727D]">
              Autonomous colleges can upload custom subject credit matrices, elective tracks, and internal assessment formats.
            </p>
          </div>
        </section>

        {/* CTA Banner */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-8 text-center sm:p-12 shadow-sm">
          <h2 className="text-2xl sm:text-3xl font-bold font-sans text-[#20252B]">
            Ace Your Semester Finals
          </h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[#66727D]">
            Join thousands of engineering students preparing systematically for end-semester exams.
          </p>
          <div className="mt-6">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-full bg-[#E4002B] px-8 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/30 hover:bg-[#C90026] transition-all"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
