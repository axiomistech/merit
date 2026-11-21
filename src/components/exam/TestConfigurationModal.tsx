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
  examName = 'FORT NEET (UG)',
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#263126]/60 backdrop-blur-sm p-4 animate-in fade-in">
      <div className="w-full max-w-lg rounded-[28px] border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-[0_20px_60px_rgba(38,49,38,0.12)]">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#758B62]">
                {examName}
              </span>
              <span className="text-xs text-[#73786E]">Session Setup</span>
            </div>
            <h2 className="mt-1 text-2xl font-bold font-serif text-[#263126]">
              Test Configuration
            </h2>
          </div>

          <button
            onClick={onClose}
            className="rounded-full p-2 text-[#92958D] hover:bg-[#F0EFEA] hover:text-[#263126] transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Selected Target Chapter Banner */}
        <div className="mt-5 rounded-2xl bg-[#F7F5EF] p-4 border border-[#E6E5DE]">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#758B62]">
            Subject & Target Chapter
          </div>
          <div className="mt-1 text-lg font-bold font-serif text-[#263126]">
            {subjectName} — {chapterName}
          </div>
        </div>

        {/* Configuration Parameters Table */}
        <div className="my-6 space-y-3 text-xs">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-2.5">
            <span className="text-[#73786E] flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-[#758B62]" />
              <span>Questions</span>
            </span>
            <span className="font-mono font-bold text-sm text-[#263126]">{questionCount} Questions</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-2.5">
            <span className="text-[#73786E] flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#758B62]" />
              <span>Duration</span>
            </span>
            <span className="font-mono font-bold text-sm text-[#263126]">{durationMinutes} Minutes</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-2.5">
            <span className="text-[#73786E] flex items-center gap-2">
              <Shield className="h-4 w-4 text-[#758B62]" />
              <span>Question Type</span>
            </span>
            <span className="font-bold text-[#263126]">{questionType}</span>
          </div>

          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-2.5">
            <span className="text-[#73786E] flex items-center gap-2">
              <Zap className="h-4 w-4 text-[#E8412C]" />
              <span>Negative Marking</span>
            </span>
            <span className="font-semibold text-[#E8412C]">{negativeMarking}</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-[#73786E] flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#758B62]" />
              <span>Difficulty</span>
            </span>
            <span className="font-semibold text-[#263126]">{difficulty}</span>
          </div>
        </div>

        {/* Pricing / Access Status */}
        {isPaid ? (
          <div className="rounded-xl bg-[#FCE8E4] p-3 text-center border border-[#E8412C]/20 mb-6">
            <span className="text-xs text-[#E8412C] font-semibold">
              Premium Question Paper • ₹{price} one-time entitlement
            </span>
          </div>
        ) : (
          <div className="rounded-xl bg-[#E9EEE3] p-3 text-center border border-[#9CAF88]/30 mb-6">
            <span className="text-xs text-[#758B62] font-semibold">
              ✓ Free Practice Set • No payment required
            </span>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-full border border-[#E6E5DE] bg-white py-3 text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF] transition-all"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleStart}
            className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#E8412C] py-3 text-xs font-bold text-white shadow-md shadow-[#E8412C]/20 hover:bg-[#d03521] transition-all hover:translate-y-[-1px]"
          >
            <span>{isPaid ? `Unlock for ₹${price}` : 'Start Test'}</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
