'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  BookOpen,
  Calendar,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();

  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
  });

  const [targetExam, setTargetExam] = useState<string>('neet');
  const [educationLevel, setEducationLevel] = useState<string>('class_12');
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([
    'Physics',
    'Chemistry',
    'Botany',
    'Zoology',
  ]);
  const [targetYear, setTargetYear] = useState<number>(2026);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCandidate({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'FORT-26-000001',
          });
        } catch {}
      }
    }
  }, []);

  // Update default subjects when target exam changes
  const handleExamChange = (examSlug: string) => {
    setTargetExam(examSlug);
    if (examSlug === 'neet') {
      setSelectedSubjects(['Physics', 'Chemistry', 'Botany', 'Zoology']);
    } else if (examSlug === 'jee') {
      setSelectedSubjects(['Physics', 'Chemistry', 'Mathematics']);
    } else if (examSlug === 'upsc') {
      setSelectedSubjects(['General Studies I', 'CSAT GS-II', 'Current Affairs', 'Mains Essay']);
    } else if (examSlug === 'engineering') {
      setSelectedSubjects(['Data Structures', 'Circuit Theory', 'Engineering Math', 'Thermodynamics']);
    }
  };

  const toggleSubject = (sub: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(sub)
        ? (prev.length > 1 ? prev.filter((s) => s !== sub) : prev)
        : [...prev, sub]
    );
  };

  const handleFinishOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'fort_onboarding_data',
        JSON.stringify({
          fullName: candidate.fullName,
          targetExam,
          educationLevel,
          selectedSubjects,
          targetYear,
          completedAt: new Date().toISOString(),
        })
      );
    }
    toast.success('Profile personalized! Welcome to FORT Learning.');
    router.push('/dashboard');
  };

  const availableSubjectsMap: Record<string, string[]> = {
    neet: ['Physics', 'Chemistry', 'Botany', 'Zoology'],
    jee: ['Physics', 'Chemistry', 'Mathematics'],
    upsc: ['General Studies I', 'CSAT GS-II', 'Current Affairs', 'Mains Essay'],
    engineering: ['Data Structures', 'Circuit Theory', 'Engineering Math', 'Thermodynamics'],
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl rounded-[32px] border border-[#DCE2E6] bg-white p-6 sm:p-10 shadow-[0_8px_30px_rgba(38,49,38,0.06)] space-y-8">
        {/* Brand & Progress Header */}
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#9CC6E0] text-[#20252B]">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <div className="font-mono text-sm font-bold text-[#20252B]">
                {candidate.registrationId}
              </div>
              <p className="text-xs text-[#66727D]">Personalizing for {candidate.fullName}</p>
            </div>
          </div>
          <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-xs font-bold text-[#20252B]">
            QUICK ONBOARDING
          </span>
        </div>

        {/* Section 1: Target Exam */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-sans text-[#20252B]">
              1. What are you preparing for?
            </h2>
            <span className="text-xs text-[#20252B] font-semibold">Primary Goal</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { id: 'neet', name: 'NEET', sub: 'Medical (UG)' },
              { id: 'jee', name: 'JEE', sub: 'Main & Adv' },
              { id: 'upsc', name: 'UPSC', sub: 'Civil Services' },
              { id: 'engineering', name: 'Engineering', sub: 'Semester Syllabi' },
            ].map((exam) => {
              const isSelected = targetExam === exam.id;
              return (
                <button
                  key={exam.id}
                  type="button"
                  onClick={() => handleExamChange(exam.id)}
                  className={cn(
                    'rounded-2xl border p-4 text-center transition-all',
                    isSelected
                      ? 'border-[#9CC6E0] bg-[#E9EEF1] text-[#20252B] shadow-sm'
                      : 'border-[#DCE2E6] bg-white text-[#66727D] hover:border-[#9CC6E0]/60'
                  )}
                >
                  <div className="font-sans text-lg font-bold">{exam.name}</div>
                  <div className="text-[11px] text-[#66727D] mt-0.5">{exam.sub}</div>
                  {isSelected && (
                    <CheckCircle2 className="h-4 w-4 text-[#20252B] mx-auto mt-2" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 2: Education Level */}
        <div className="space-y-3">
          <h2 className="text-base font-bold font-sans text-[#20252B]">
            2. Class & Education Level
          </h2>
          <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
            {[
              { id: 'class_11', label: 'Class 11' },
              { id: 'class_12', label: 'Class 12' },
              { id: 'dropper', label: 'Repeater / Dropper' },
              { id: 'college', label: 'College / Graduate' },
            ].map((lvl) => {
              const isSelected = educationLevel === lvl.id;
              return (
                <button
                  key={lvl.id}
                  type="button"
                  onClick={() => setEducationLevel(lvl.id)}
                  className={cn(
                    'rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all',
                    isSelected
                      ? 'border-[#9CC6E0] bg-[#E9EEF1] text-[#20252B] font-bold'
                      : 'border-[#DCE2E6] bg-white text-[#66727D] hover:border-[#9CC6E0]'
                  )}
                >
                  {lvl.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 3: Preferred Subjects */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-sans text-[#20252B]">
              3. Preferred Subjects
            </h2>
            <span className="text-[11px] text-[#66727D]">Select all you wish to practice</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {(availableSubjectsMap[targetExam] || []).map((sub) => {
              const isSelected = selectedSubjects.includes(sub);
              return (
                <button
                  key={sub}
                  type="button"
                  onClick={() => toggleSubject(sub)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-xs font-semibold transition-all flex items-center gap-1.5',
                    isSelected
                      ? 'border-[#9CC6E0] bg-[#9CC6E0] text-[#20252B] shadow-sm'
                      : 'border-[#DCE2E6] bg-white text-[#66727D] hover:border-[#9CC6E0]'
                  )}
                >
                  {isSelected && <CheckCircle2 className="h-3.5 w-3.5" />}
                  <span>{sub}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Section 4: Target Year (Optional) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold font-sans text-[#20252B]">
              4. Target Examination Year
            </h2>
            <span className="text-[11px] text-[#66727D]">Optional</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[2025, 2026, 2027].map((yr) => {
              const isSelected = targetYear === yr;
              return (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTargetYear(yr)}
                  className={cn(
                    'rounded-xl border py-2.5 font-mono text-xs font-bold transition-all',
                    isSelected
                      ? 'border-[#9CC6E0] bg-[#E9EEF1] text-[#20252B]'
                      : 'border-[#DCE2E6] bg-white text-[#66727D] hover:border-[#9CC6E0]'
                  )}
                >
                  {yr}
                </button>
              );
            })}
          </div>
        </div>

        {/* Final CTA */}
        <div className="pt-4 border-t border-[#DCE2E6]">
          <button
            type="button"
            onClick={handleFinishOnboarding}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#E4002B] py-4 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/25 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
          >
            <span>Start Solving Questions</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
