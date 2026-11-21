import React from 'react';
import Link from 'next/link';
import { ArrowRight, BookOpen, Layers } from 'lucide-react';

export const metadata = {
  title: 'FORT Engineering — University Semester Examination Practice',
  description:
    'Configurable university semester examination practice for Anna University, VTU, JNTU, Mumbai University, and autonomous engineering colleges.',
};

export default function EngineeringLandingPage() {
  const sampleUniversities = [
    { name: 'Anna University', location: 'Chennai, Tamil Nadu', branches: 'CSE, ECE, EEE, Mech, Civil' },
    { name: 'Visvesvaraya Technological University (VTU)', location: 'Belagavi, Karnataka', branches: 'CSE, ISE, ECE, AI&DS' },
    { name: 'Jawaharlal Nehru Technological University (JNTU)', location: 'Hyderabad, Telangana', branches: 'CSE, IT, ECE, Mech' },
    { name: 'University of Mumbai', location: 'Mumbai, Maharashtra', branches: 'Comps, IT, Extc, Mech' },
  ];

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen">
      <section className="border-b border-[#263554] bg-[#11182A]/60 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-lg bg-[#06B6D4]/15 px-3 py-1 text-xs font-semibold text-[#06B6D4]">
              University Academic Infrastructure
            </div>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              FORT Engineering
            </h1>
            <p className="mt-4 text-lg text-[#A7B0C0] leading-relaxed">
              Configurable university semester examination preparation mapped directly to your
              university regulation, degree, branch, semester, and course syllabus.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-3 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
              >
                <span>Select Your University</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
            Supported Curricula
          </h2>
          <p className="mt-2 text-2xl font-bold tracking-tight text-[#F5F7FB]">
            University Regimes & Autonomous Syllabi
          </p>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {sampleUniversities.map((uni, idx) => (
              <div key={idx} className="rounded-xl border border-[#263554] bg-[#172033] p-6">
                <h3 className="text-lg font-bold text-[#F5F7FB]">{uni.name}</h3>
                <p className="mt-1 text-xs text-[#6486C6]">{uni.location}</p>
                <div className="mt-4 text-xs text-[#A7B0C0]">
                  <strong>Branches:</strong> {uni.branches}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
