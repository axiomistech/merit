'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Shield,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  GraduationCap,
  Sparkles,
  Calendar,
  Layers,
  Award,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [candidate, setCandidate] = useState<{
    fullName: string;
    registrationId: string;
  }>({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
  });

  const [selectedExams, setSelectedExams] = useState<string[]>(['neet']);
  const [targetYear, setTargetYear] = useState<number>(2026);
  const [studyPreferences, setStudyPreferences] = useState<string[]>([
    'timed_simulation',
    'live_omr',
  ]);
  const [preparationStage, setPreparationStage] = useState<string>('intermediate');

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

  const toggleExam = (slug: string) => {
    setSelectedExams((prev) =>
      prev.includes(slug) ? (prev.length > 1 ? prev.filter((s) => s !== slug) : prev) : [...prev, slug]
    );
  };

  const handleFinishOnboarding = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        'fort_onboarding_data',
        JSON.stringify({
          selectedExams,
          targetYear,
          studyPreferences,
          preparationStage,
          completedAt: new Date().toISOString(),
        })
      );
    }
    toast.success('Onboarding complete! Welcome to your preparation workspace.');
    router.push('/dashboard');
  };

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-10 shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        {/* Progress header */}
        <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9CAF88] text-white">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-[#263126]">
                {candidate.registrationId}
              </span>
              <p className="text-xs text-[#73786E]">{candidate.fullName}</p>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-[#758B62]">Step {step} of 4</div>
        </div>

        {/* Step Indicator Bar */}
        <div className="my-6 grid grid-cols-4 gap-2">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-colors',
                i <= step ? 'bg-[#9CAF88]' : 'bg-[#E9E6DF]'
              )}
            />
          ))}
        </div>

        {/* STEP 1: EXAM TARGET SELECTION */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#263126] font-serif">
                Select Your Examination Target
              </h2>
              <p className="mt-1 text-xs text-[#73786E]">
                We personalize your question banks, scoring engines, and OMR configurations accordingly.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {EXAMINATIONS.map((exam) => {
                const isSelected = selectedExams.includes(exam.slug);
                return (
                  <div
                    key={exam.slug}
                    onClick={() => toggleExam(exam.slug)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all',
                      isSelected
                        ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                        : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/60'
                    )}
                  >
                    <div>
                      <div className="text-xs font-bold text-[#263126]">{exam.name}</div>
                      <div className="text-[11px] text-[#73786E]">{exam.tagline}</div>
                    </div>
                    {isSelected && <CheckCircle2 className="h-4 w-4 text-[#758B62]" />}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 2: TARGET YEAR */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#263126] font-serif">Select Target Examination Year</h2>
              <p className="mt-1 text-xs text-[#73786E]">
                This calibrates your countdown timers and revision pace.
              </p>
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
                      'rounded-xl border p-4 text-center font-mono font-bold transition-all text-sm',
                      isSelected
                        ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                        : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]'
                    )}
                  >
                    {yr}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: PREPARATION STAGE */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#263126] font-serif">Current Preparation Stage</h2>
              <p className="mt-1 text-xs text-[#73786E]">
                Helps recommend single-topic drills vs. full 3-hour timed simulations.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'foundational', title: 'Foundational Phase', desc: 'Focusing on conceptual theory and topical question drills.' },
                { id: 'intermediate', title: 'Syllabus Revision', desc: 'Covered majority of syllabus, actively practicing mixed questions.' },
                { id: 'advanced', title: 'Intense Simulation', desc: 'Full length mock tests under strict timed and negative marking conditions.' },
              ].map((stg) => {
                const isSelected = preparationStage === stg.id;
                return (
                  <div
                    key={stg.id}
                    onClick={() => setPreparationStage(stg.id)}
                    className={cn(
                      'rounded-xl border p-4 cursor-pointer transition-all',
                      isSelected
                        ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                        : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/60'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[#263126]">{stg.title}</div>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#758B62]" />}
                    </div>
                    <p className="mt-1 text-xs text-[#73786E]">{stg.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: STUDY PREFERENCES */}
        {step === 4 && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-bold text-[#263126] font-serif">Practice Mode Preferences</h2>
              <p className="mt-1 text-xs text-[#73786E]">
                Select the interfaces you plan to utilize during your preparation.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'timed_simulation', title: 'CBT Timed Simulation', desc: 'Browser-based computer testing with server countdown and answer palette.' },
                { id: 'live_omr', title: 'Live Physical OMR Sheet', desc: 'Real-time grid bubble darkening with vector A4 PDF export for physical printing.' },
                { id: 'step_solutions', title: 'Step-by-Step Derivation & Rubric', desc: 'Deep mathematical explanations and rubric scoring breakdown.' },
              ].map((pref) => {
                const isSelected = studyPreferences.includes(pref.id);
                return (
                  <div
                    key={pref.id}
                    onClick={() => {
                      setStudyPreferences((prev) =>
                        prev.includes(pref.id) ? prev.filter((p) => p !== pref.id) : [...prev, pref.id]
                      );
                    }}
                    className={cn(
                      'rounded-xl border p-4 cursor-pointer transition-all',
                      isSelected
                        ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                        : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/60'
                    )}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-sm font-bold text-[#263126]">{pref.title}</div>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-[#758B62]" />}
                    </div>
                    <p className="mt-1 text-xs text-[#73786E]">{pref.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step Navigation Controls */}
        <div className="mt-8 flex items-center justify-between border-t border-[#ECEAE4] pt-6">
          <button
            type="button"
            disabled={step === 1}
            onClick={() => setStep((s) => s - 1)}
            className="inline-flex items-center gap-1.5 rounded-xl border border-[#E6E5DE] bg-white px-4 py-2 text-xs font-semibold text-[#73786E] hover:bg-[#F7F5EF] disabled:opacity-40 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Previous</span>
          </button>

          {step < 4 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#9CAF88] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] shadow-sm transition-all"
            >
              <span>Continue</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="inline-flex items-center gap-1.5 rounded-xl bg-[#9CAF88] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] shadow-sm transition-all"
            >
              <span>Launch Candidate Dashboard</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
