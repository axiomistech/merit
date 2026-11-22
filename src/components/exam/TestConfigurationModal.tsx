'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { X, Clock, HelpCircle, CheckCircle2, Shield, ArrowRight, Zap } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TestConfigProps {
  isOpen: boolean;
  onClose: () => void;
  onStart?: () => void;
  examName?: string;
  subjectName: string;
  chapterName: string;
  questionCount?: number;
  durationMinutes?: number;
  questionType?: string;
  negativeMarking?: string;
  difficulty?: string;
  isPaid?: boolean;
  price?: number;
  attemptRoute?: string;
}

export function TestConfigurationModal({
  isOpen,
  onClose,
  onStart,
  examName = 'NEET (UG)',
  subjectName = 'Physics',
  chapterName = 'Laws of Motion',
  questionCount = 30,
  durationMinutes = 30,
  questionType = 'Single Correct MCQ',
  negativeMarking = '+4 for correct, -1 for incorrect',
  difficulty = 'Mixed (Foundational & Advanced)',
  isPaid = false,
  price = 10,
  attemptRoute = '/exam/neet-demo',
}: TestConfigProps) {
  const router = useRouter();

  if (!isOpen) return null;

  const handleStart = () => {
    if (onStart) {
      onStart();
      return;
    }
    if (isPaid) {
      router.push(`/payment?item=chapter_${chapterName.toLowerCase().replace(/\s+/g, '_')}&amount=${price}`);
    } else {
      router.push(attemptRoute);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(38,49,38,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#20252B]">
                {examName}
              </span>
              <span className="text-xs text-[#66727D]">Session Setup</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold font-sans text-[#20252B]">
              Test Configuration
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Target Chapter Banner */}
        <div className="mt-5 rounded-2xl bg-[#F1F3F4] p-4 border border-[#DCE2E6]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#20252B]">
            Subject & Target Chapter
          </div>
          <div className="mt-1 text-lg font-bold font-sans text-[#20252B]">
            {subjectName} — {chapterName}
          </div>
        </div>

        {/* Configuration Parameters Table */}
        <div className="my-6 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
            <span className="text-[#66727D] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#20252B]" />
              <span>Questions</span>
            </span>
            <span className="font-mono font-bold text-sm text-[#20252B]">{questionCount} Questions</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
            <span className="text-[#66727D] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#20252B]" />
              <span>Duration</span>
            </span>
            <span className="font-mono font-bold text-sm text-[#20252B]">{durationMinutes} Minutes</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
            <span className="text-[#66727D] flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#20252B]" />
              <span>Question Type</span>
            </span>
            <span className="font-bold text-[#20252B]">{questionType}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-2.5">
            <span className="text-[#66727D] flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#E4002B]" />
              <span>Negative Marking</span>
            </span>
            <span className="font-semibold text-[#E4002B]">{negativeMarking}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#66727D] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#20252B]" />
              <span>Difficulty</span>
            </span>
            <span className="font-semibold text-[#20252B]">{difficulty}</span>
          </div>
        </div>

        {/* Pricing / Access Status */}
        {isPaid ? (
          <div className="rounded-xl bg-[#FDEDF0] p-3 text-center border border-[#E4002B]/20 mb-6">
            <span className="text-xs text-[#E4002B] font-semibold">
              Premium Question Paper • ₹{price} one-time entitlement
            </span>
          </div>
        ) : (
          <div className="rounded-xl bg-[#E9EEF1] p-3 text-center border border-[#9CC6E0]/30 mb-6">
            <span className="text-xs text-[#20252B] font-semibold">
              ✓ Free Practice Set • No payment required
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-[#DCE2E6] bg-white py-3 text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#E4002B] py-3 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 hover:bg-[#C90026] transition-all hover:translate-y-[-1px]"
          >
            <span>{isPaid ? `Unlock for ₹${price}` : 'Start Test'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
