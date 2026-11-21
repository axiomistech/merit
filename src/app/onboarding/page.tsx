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
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-16 px-4">
      <div className="mx-auto max-w-2xl rounded-2xl border border-[#263554] bg-[#11182A] p-6 sm:p-10 shadow-2xl">
        {/* Progress header */}
        <div className="flex items-center justify-between border-b border-[#263554] pb-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
              <Shield className="h-5 w-5 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-sm font-bold text-[#F5F7FB]">
                {candidate.registrationId}
              </span>
              <p className="text-xs text-[#A7B0C0]">{candidate.fullName}</p>
            </div>
          </div>
          <div className="text-xs font-mono font-bold text-[#6486C6]">Step {step} of 6</div>
        </div>

        {/* Step Indicator Bar */}
        <div className="my-6 grid grid-cols-6 gap-2">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className={cn(
                'h-1.5 rounded-full transition-all',
                i <= step ? 'bg-[#6486C6]' : 'bg-[#1D2940]'
              )}
            />
          ))}
        </div>

        {/* STEP 1: WELCOME */}
        {step === 1 && (
          <div className="space-y-4 py-4 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#6486C6]/20 text-[#6486C6]">
              <GraduationCap className="h-8 w-8" />
            </div>
            <h2 className="text-2xl font-extrabold text-[#F5F7FB]">
              Welcome to FORT Learning, {candidate.fullName}
            </h2>
            <p className="mx-auto max-w-md text-xs leading-relaxed text-[#A7B0C0]">
              FORT is digital learning and examination practice infrastructure built around
              concepts, questions, simulation engines, OMR accuracy, and continuous improvement.
            </p>
            <div className="rounded-xl border border-[#263554] bg-[#172033] p-4 text-xs text-[#A7B0C0] text-left">
              <strong className="text-[#F5F7FB]">What we configure now:</strong>
              <ul className="mt-2 space-y-1 list-disc pl-5">
                <li>Your primary and secondary target examinations</li>
                <li>Your target examination year and target syllabus</li>
                <li>Your diagnostic baseline and preparation stage</li>
              </ul>
            </div>
          </div>
        )}

        {/* STEP 2: SELECT EXAMINATIONS */}
        {step === 2 && (
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FB]">Select Target Examination(s)</h2>
              <p className="text-xs text-[#A7B0C0]">
                Select the competitive examinations you are preparing for. You can change or add
                exams later.
              </p>
            </div>

            <div className="space-y-3">
              {EXAMINATIONS.map((exam) => {
                const isSelected = selectedExams.includes(exam.slug);
                return (
                  <div
                    key={exam.slug}
                    onClick={() => toggleExam(exam.slug)}
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all',
                      isSelected
                        ? 'border-[#6486C6] bg-[#1D2940]'
                        : 'border-[#263554] bg-[#172033] hover:border-[#6486C6]/50'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg font-mono text-xs font-bold"
                        style={{ backgroundColor: `${exam.accentColor}20`, color: exam.accentColor }}
                      >
                        {exam.shortName.slice(0, 2)}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-[#F5F7FB]">{exam.name}</div>
                        <div className="text-xs text-[#A7B0C0]">{exam.tagline}</div>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold',
                        isSelected
                          ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                          : 'border-[#263554]'
                      )}
                    >
                      {isSelected && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 3: TARGET YEAR */}
        {step === 3 && (
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FB]">Target Examination Year</h2>
              <p className="text-xs text-[#A7B0C0]">
                We synchronize syllabus revisions, notification schedules, and mock blueprints based
                on your target year.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[2026, 2027, 2028].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setTargetYear(yr)}
                  className={cn(
                    'rounded-xl border p-5 text-center transition-all',
                    targetYear === yr
                      ? 'border-[#6486C6] bg-[#1D2940] text-[#F5F7FB]'
                      : 'border-[#263554] bg-[#172033] text-[#A7B0C0] hover:border-[#6486C6]/50'
                  )}
                >
                  <div className="font-mono text-xl font-bold">{yr}</div>
                  <div className="mt-1 text-xs">
                    {yr === 2026 ? 'Current Cycle' : yr === 2027 ? 'Next Year' : 'Long-term'}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* STEP 4: STUDY PREFERENCES */}
        {step === 4 && (
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FB]">Study & Practice Preferences</h2>
              <p className="text-xs text-[#A7B0C0]">
                Configure which tools to highlight in your daily workspace.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'timed_simulation', title: 'Timed Mock Examinations', desc: 'Strict server-authoritative countdown simulations' },
                { id: 'live_omr', title: 'Live OMR Bubble Practice', desc: 'Interactive bubbling grids and printable A4 response sheets' },
                { id: 'concept_remedial', title: 'Atomic Concept Practice', desc: 'Focus on weak concepts and repeated error patterns' },
              ].map((pref) => {
                const isChecked = studyPreferences.includes(pref.id);
                return (
                  <div
                    key={pref.id}
                    onClick={() =>
                      setStudyPreferences((prev) =>
                        prev.includes(pref.id)
                          ? prev.filter((p) => p !== pref.id)
                          : [...prev, pref.id]
                      )
                    }
                    className={cn(
                      'flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all',
                      isChecked
                        ? 'border-[#6486C6] bg-[#1D2940]'
                        : 'border-[#263554] bg-[#172033]'
                    )}
                  >
                    <div>
                      <div className="text-sm font-bold text-[#F5F7FB]">{pref.title}</div>
                      <div className="text-xs text-[#A7B0C0]">{pref.desc}</div>
                    </div>
                    <div
                      className={cn(
                        'flex h-5 w-5 items-center justify-center rounded-full border',
                        isChecked
                          ? 'border-[#6486C6] bg-[#6486C6] text-[#0B1020]'
                          : 'border-[#263554]'
                      )}
                    >
                      {isChecked && <CheckCircle2 className="h-4 w-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 5: PREPARATION STAGE */}
        {step === 5 && (
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FB]">Current Preparation Stage</h2>
              <p className="text-xs text-[#A7B0C0]">
                This helps us calibrate question difficulty recommendations.
              </p>
            </div>

            <div className="space-y-3">
              {[
                { id: 'foundational', title: 'Foundational Stage', desc: 'Covering basic theory, NCERT concepts, and chapter-wise exercises.' },
                { id: 'intermediate', title: 'Intermediate Stage', desc: 'Completed 50%+ syllabus. Starting mixed tests and previous year papers.' },
                { id: 'advanced', title: 'Advanced Stage', desc: 'Syllabus complete. Focusing on speed, negative penalty reduction, and hard questions.' },
                { id: 'final_revision', title: 'Final Revision & Mock Marathons', desc: 'Immediate exam upcoming. High-volume full-length mock simulations.' },
              ].map((stg) => (
                <div
                  key={stg.id}
                  onClick={() => setPreparationStage(stg.id)}
                  className={cn(
                    'flex items-center justify-between rounded-xl border p-4 cursor-pointer transition-all',
                    preparationStage === stg.id
                      ? 'border-[#6486C6] bg-[#1D2940]'
                      : 'border-[#263554] bg-[#172033]'
                  )}
                >
                  <div>
                    <div className="text-sm font-bold text-[#F5F7FB]">{stg.title}</div>
                    <div className="text-xs text-[#A7B0C0]">{stg.desc}</div>
                  </div>
                  <div
                    className={cn(
                      'h-4 w-4 rounded-full border',
                      preparationStage === stg.id
                        ? 'border-[#6486C6] bg-[#6486C6]'
                        : 'border-[#263554]'
                    )}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* STEP 6: REVIEW & FINISH */}
        {step === 6 && (
          <div className="space-y-4 py-4">
            <div>
              <h2 className="text-xl font-bold text-[#F5F7FB]">Review Your Workspace Configuration</h2>
              <p className="text-xs text-[#A7B0C0]">
                Everything is configured for your personalized examination dashboard.
              </p>
            </div>

            <div className="rounded-xl border border-[#263554] bg-[#172033] p-5 space-y-3 text-xs">
              <div className="flex justify-between border-b border-[#263554] pb-2">
                <span className="text-[#A7B0C0]">Registration ID:</span>
                <span className="font-mono font-bold text-[#F5F7FB]">{candidate.registrationId}</span>
              </div>
              <div className="flex justify-between border-b border-[#263554] pb-2">
                <span className="text-[#A7B0C0]">Target Exam(s):</span>
                <span className="font-bold text-[#6486C6]">
                  {selectedExams.map((s) => s.toUpperCase()).join(', ')}
                </span>
              </div>
              <div className="flex justify-between border-b border-[#263554] pb-2">
                <span className="text-[#A7B0C0]">Target Year:</span>
                <span className="font-bold text-[#F5F7FB]">{targetYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#A7B0C0]">Stage:</span>
                <span className="font-bold text-[#10B981] capitalize">
                  {preparationStage.replace('_', ' ')}
                </span>
              </div>
            </div>

            <div className="rounded-xl bg-[#10B981]/15 p-4 text-xs text-[#10B981] flex items-center gap-2">
              <Sparkles className="h-4 w-4 shrink-0" />
              <span>
                Your complimentary full examination paper is unlocked and waiting in your dashboard.
              </span>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between border-t border-[#263554] pt-6">
          {step > 1 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s - 1)}
              className="flex items-center gap-1.5 rounded-lg border border-[#263554] bg-[#172033] px-4 py-2 text-xs font-semibold text-[#F5F7FB] hover:bg-[#1D2940]"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {step < 6 ? (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="flex items-center gap-1.5 rounded-lg bg-[#6486C6] px-5 py-2 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
            >
              <span>Continue</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinishOnboarding}
              className="flex items-center gap-1.5 rounded-lg bg-[#10B981] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#10B981]/90 shadow-md shadow-[#10B981]/20"
            >
              <span>Enter Workspace</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
