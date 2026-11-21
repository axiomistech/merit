'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Award,
  ArrowRight,
  Shield,
  Download,
  ChevronRight,
  CheckCircle2,
  Lock,
  Sparkles,
  CreditCard,
  RotateCcw,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';

interface PaperDetail {
  id: string;
  name: string;
  slug: string;
  exam: string;
  examLabel: string;
  year: number;
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  markingScheme: string;
  hasOMR: boolean;
  description: string;
  instructions: string[];
  sections: { name: string; questions: number; marks: number }[];
}

const PAPERS_DATABASE: Record<string, PaperDetail> = {
  'neet-2025-official-pyq': {
    id: 'paper_neet_2025_pyq',
    name: 'NEET (UG) 2025 Official Question Paper (May Shift)',
    slug: 'neet-2025-official-pyq',
    exam: 'neet',
    examLabel: 'NEET (UG) Medical',
    year: 2025,
    durationMinutes: 200,
    totalQuestions: 180,
    maxMarks: 720,
    markingScheme: '+4 for correct, -1 for incorrect, 0 for unattempted',
    hasOMR: true,
    description:
      'The authentic NTA NEET 2025 examination question paper with official answer keys, KaTeX scientific solutions, and printable vector A4 OMR sheet.',
    instructions: [
      'The question paper contains 180 questions divided into Physics, Chemistry, Botany, and Zoology.',
      'For each correct response, you will be awarded 4 marks.',
      'For each incorrect response, 1 mark will be deducted from your total score.',
      'Unattempted questions receive zero marks.',
      'Server-authoritative timer runs for 200 minutes. Auto-submits on time expiration.',
      'Upon submission, a personalized printable A4 OMR answer sheet is instantly generated with your registration code.',
    ],
    sections: [
      { name: 'Physics', questions: 45, marks: 180 },
      { name: 'Chemistry', questions: 45, marks: 180 },
      { name: 'Botany', questions: 45, marks: 180 },
      { name: 'Zoology', questions: 45, marks: 180 },
    ],
  },
  'neet-2024-official-pyq': {
    id: 'paper_neet_2024_pyq',
    name: 'NEET (UG) 2024 Official Question Paper',
    slug: 'neet-2024-official-pyq',
    exam: 'neet',
    examLabel: 'NEET (UG) Medical',
    year: 2024,
    durationMinutes: 200,
    totalQuestions: 180,
    maxMarks: 720,
    markingScheme: '+4 for correct, -1 for incorrect, 0 for unattempted',
    hasOMR: true,
    description:
      'Official 720-mark national medical entrance examination paper with sub-concept diagnostic analytics.',
    instructions: [
      'The paper contains 180 multiple-choice questions across 4 subjects.',
      'Marking: +4 marks for correct, -1 penalty for incorrect.',
      'Downloadable high-resolution A4 OMR answer sheet generated automatically upon completion.',
    ],
    sections: [
      { name: 'Physics', questions: 45, marks: 180 },
      { name: 'Chemistry', questions: 45, marks: 180 },
      { name: 'Botany', questions: 45, marks: 180 },
      { name: 'Zoology', questions: 45, marks: 180 },
    ],
  },
  'jee-main-2025-session1-shift1': {
    id: 'paper_jee_2025_shift1',
    name: 'JEE Main 2025 Session 1 (Jan 24 Shift 1)',
    slug: 'jee-main-2025-session1-shift1',
    exam: 'jee-main',
    examLabel: 'JEE Main Engineering',
    year: 2025,
    durationMinutes: 180,
    totalQuestions: 90,
    maxMarks: 300,
    markingScheme: '+4 for correct, -1 for incorrect (Section A MCQs & Section B NVQs)',
    hasOMR: false,
    description:
      'Full CBT simulation of JEE Main Jan 2025 shift with numerical integer validation, decimal tolerances, and negative marking.',
    instructions: [
      'The test consists of Physics, Chemistry, and Mathematics.',
      'Section A contains single-choice MCQs (+4 / -1).',
      'Section B contains Numerical Value Questions with exact tolerance validation.',
      'Server-authoritative timer counts down for 180 minutes.',
    ],
    sections: [
      { name: 'Physics', questions: 30, marks: 100 },
      { name: 'Chemistry', questions: 30, marks: 100 },
      { name: 'Mathematics', questions: 30, marks: 100 },
    ],
  },
  'jee-main-2025-session1-shift2': {
    id: 'paper_jee_2025_shift2',
    name: 'JEE Main 2025 Session 1 (Jan 24 Shift 2)',
    slug: 'jee-main-2025-session1-shift2',
    exam: 'jee-main',
    examLabel: 'JEE Main Engineering',
    year: 2025,
    durationMinutes: 180,
    totalQuestions: 90,
    maxMarks: 300,
    markingScheme: '+4 for correct, -1 for incorrect',
    hasOMR: false,
    description:
      'Full CBT simulation of JEE Main Jan 2025 afternoon shift with step-by-step solutions.',
    instructions: [
      '30 questions each in Physics, Chemistry, and Mathematics.',
      'Numerical questions support decimal and integer inputs.',
    ],
    sections: [
      { name: 'Physics', questions: 30, marks: 100 },
      { name: 'Chemistry', questions: 30, marks: 100 },
      { name: 'Mathematics', questions: 30, marks: 100 },
    ],
  },
  'jee-advanced-2024-paper-1': {
    id: 'paper_jee_adv_2024_p1',
    name: 'JEE Advanced 2024 Paper 1 (Official IIT Madras)',
    slug: 'jee-advanced-2024-paper-1',
    exam: 'jee-advanced',
    examLabel: 'JEE Advanced IIT',
    year: 2024,
    durationMinutes: 180,
    totalQuestions: 51,
    maxMarks: 180,
    markingScheme: 'Strict partial marking (+4/+3/+2/+1/-2)',
    hasOMR: false,
    description:
      'Multi-correct options, matrix matching, and numerical stem questions with strict partial marking configuration.',
    instructions: [
      'Rigorous IIT JEE Advanced simulation.',
      'Multi-select questions evaluate partial marking according to official IIT rubrics.',
    ],
    sections: [
      { name: 'Physics', questions: 17, marks: 60 },
      { name: 'Chemistry', questions: 17, marks: 60 },
      { name: 'Mathematics', questions: 17, marks: 60 },
    ],
  },
  'upsc-prelims-2024-gs1': {
    id: 'paper_upsc_prelims_2024',
    name: 'UPSC Civil Services Prelims 2024 GS-1',
    slug: 'upsc-prelims-2024-gs1',
    exam: 'upsc',
    examLabel: 'UPSC CSE Prelims',
    year: 2024,
    durationMinutes: 120,
    totalQuestions: 100,
    maxMarks: 200,
    markingScheme: '+2 for correct, -0.66 for incorrect, 0 for unattempted',
    hasOMR: true,
    description:
      'Authentic UPSC Prelims General Studies Paper I with standard 0.66 negative marking and analytical answer keys.',
    instructions: [
      '100 objective questions covering Indian Polity, Economy, History, Geography, Environment, and Science.',
      'Each question carries 2 marks with 0.66 negative marking penalty.',
    ],
    sections: [
      { name: 'General Studies I', questions: 100, marks: 200 },
    ],
  },
};

function PaperDetailContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || 'neet-2025-official-pyq';

  const paper = PAPERS_DATABASE[slug] || PAPERS_DATABASE['neet-2025-official-pyq'];

  const [studentSession, setStudentSession] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [freePaperAvailable, setFreePaperAvailable] = useState(true);
  const [isProcessingUnlock, setIsProcessingUnlock] = useState(false);
  const [showFreeConfirmModal, setShowFreeConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setStudentSession(parsed);

          // Verify entitlement on backend
          fetch(
            `/api/entitlements?registrationId=${parsed.registrationId || 'FORT-26-000001'}&paperSlug=${slug}`
          )
            .then((res) => res.json())
            .then((data) => {
              if (data.success) {
                setHasAccess(data.hasAccess);
                setFreePaperAvailable(data.freePaperAvailable ?? true);
              }
            })
            .catch(() => {});
        } catch {}
      }
    }
  }, [slug]);

  // Handle Free Paper Unlock Action
  const handleClaimFreePaper = async () => {
    if (!studentSession) {
      router.push(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
      return;
    }

    setIsProcessingUnlock(true);
    try {
      const res = await fetch('/api/entitlements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentRegistrationId: studentSession.registrationId,
          paperSlug: slug,
          action: 'free_unlock',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to claim free paper');
      }

      setHasAccess(true);
      setFreePaperAvailable(false);
      setShowFreeConfirmModal(false);
      toast.success('Complimentary question paper unlocked! Ready to attempt.');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessingUnlock(false);
    }
  };

  // Handle ₹10 Paper Purchase Action
  const handlePurchasePaper = async () => {
    if (!studentSession) {
      router.push(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
      return;
    }

    setIsProcessingUnlock(true);
    try {
      // 1. Create Order
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: slug,
          studentName: studentSession.fullName,
          studentEmail: studentSession.email,
          studentRegistrationId: studentSession.registrationId,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Failed to initialize order');
      }

      const { orderId } = orderData.data;

      // 2. Server Verification & Entitlement Creation
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: `pay_rzp_${Date.now()}`,
          razorpay_signature: 'mock_verified_signature',
          studentRegistrationId: studentSession.registrationId,
          studentName: studentSession.fullName,
          studentEmail: studentSession.email,
          productName: paper.name,
          amount: 10,
          paperSlug: slug,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      setHasAccess(true);
      setShowPaymentModal(false);
      toast.success('Payment verified (₹10). Question paper unlocked permanently!');
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessingUnlock(false);
    }
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/" className="hover:text-[#20252B]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/papers" className="hover:text-[#20252B]">
            Question Papers
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B] truncate">{paper.name}</span>
        </div>

        {/* Paper Overview Card */}
        <div className="rounded-3xl border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-sm space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#F1F3F4] text-[#20252B] border border-[#DCE2E6]">
              {paper.examLabel} • Year {paper.year}
            </span>

            {hasAccess ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#27835A] bg-[#E9F5EF] px-3 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4" />
                <span>Paper Unlocked & Ready</span>
              </span>
            ) : studentSession && freePaperAvailable ? (
              <span className="text-xs font-bold text-[#20252B] bg-[#9CC6E0]/30 px-3 py-1 rounded-full">
                ✨ Free Unlock Available
              </span>
            ) : (
              <span className="text-xs font-bold text-[#66727D] bg-[#F1F3F4] px-3 py-1 rounded-full">
                Unlock Price: ₹10
              </span>
            )}
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
              {paper.name}
            </h1>
            <p className="mt-2 text-sm text-[#66727D] leading-relaxed">{paper.description}</p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#DCE2E6]">
            <div className="p-3.5 rounded-xl bg-[#F1F3F4]">
              <div className="text-[10px] text-[#66727D] uppercase font-bold">Total Questions</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.totalQuestions} Questions
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4]">
              <div className="text-[10px] text-[#66727D] uppercase font-bold">Duration</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.durationMinutes} Minutes
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4]">
              <div className="text-[10px] text-[#66727D] uppercase font-bold">Max Marks</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.maxMarks} Marks
              </div>
            </div>
            <div className="p-3.5 rounded-xl bg-[#F1F3F4]">
              <div className="text-[10px] text-[#66727D] uppercase font-bold">Marking Scheme</div>
              <div className="mt-1 text-xs font-bold font-mono text-[#20252B] truncate">
                {paper.markingScheme}
              </div>
            </div>
          </div>

          {/* Subject Structure Breakdown */}
          <div className="pt-4 border-t border-[#DCE2E6] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
              Subject & Section Structure
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {paper.sections.map((sec) => (
                <div
                  key={sec.name}
                  className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-3 text-xs"
                >
                  <div className="font-semibold text-[#20252B]">{sec.name}</div>
                  <div className="text-[#66727D] mt-0.5">
                    {sec.questions} Questions • {sec.marks} Marks
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Examination Instructions */}
          <div className="pt-4 border-t border-[#DCE2E6] space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
              Examination Instructions
            </h3>
            <ul className="space-y-2 text-xs text-[#66727D]">
              {paper.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="font-mono text-[#20252B] font-bold">•</span>
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Primary Action Button Area */}
          <div className="pt-6 border-t border-[#DCE2E6] flex flex-wrap items-center justify-between gap-4">
            <div>
              {!studentSession ? (
                <span className="text-xs text-[#66727D]">
                  Sign in or create an account to unlock this paper.
                </span>
              ) : hasAccess ? (
                <span className="text-xs text-[#27835A] font-semibold">
                  ✓ Entitlement active. You may attempt this paper anytime.
                </span>
              ) : freePaperAvailable ? (
                <span className="text-xs text-[#20252B] font-semibold">
                  You have 1 complimentary question paper unlock available.
                </span>
              ) : (
                <span className="text-xs text-[#66727D]">
                  Standard Paper Unlock: flat ₹10 via UPI / Card.
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* Unauthenticated User */}
              {!studentSession && (
                <>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-[#DCE2E6] bg-white text-[#20252B] text-xs font-semibold hover:border-[#9CC6E0] transition-colors"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/signup?redirect=${encodeURIComponent(`/papers/${slug}`)}`}
                    className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-xl bg-[#E4002B] text-white text-xs font-semibold hover:bg-[#C90026] transition-colors shadow-sm"
                  >
                    <span>Register to Unlock</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}

              {/* Logged in with active access */}
              {studentSession && hasAccess && (
                <Link
                  href={`/exam/${slug}`}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#27835A] text-white text-sm font-semibold hover:bg-[#1E6746] transition-colors shadow-sm"
                >
                  <span>Start Examination</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              )}

              {/* Logged in with Free Paper Available */}
              {studentSession && !hasAccess && freePaperAvailable && (
                <button
                  type="button"
                  onClick={() => setShowFreeConfirmModal(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#E4002B] text-white text-sm font-semibold hover:bg-[#C90026] transition-colors shadow-sm"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Unlock Free Paper</span>
                </button>
              )}

              {/* Logged in with Free Paper Consumed -> ₹10 Unlock */}
              {studentSession && !hasAccess && !freePaperAvailable && (
                <button
                  type="button"
                  onClick={() => setShowPaymentModal(true)}
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-xl bg-[#E4002B] text-white text-sm font-semibold hover:bg-[#C90026] transition-colors shadow-sm"
                >
                  <CreditCard className="h-4 w-4" />
                  <span>Unlock for ₹10</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Free Unlock Confirmation Modal */}
      {showFreeConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-xl space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
              <Sparkles className="h-6 w-6 text-[#20252B]" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B]">Use Free Paper Entitlement?</h3>
            <p className="text-xs text-[#66727D] leading-relaxed">
              Every registered FORT student receives <strong>1 complimentary question paper unlock</strong>.
              Would you like to unlock <strong>{paper.name}</strong> for free?
            </p>
            <p className="text-[11px] text-[#66727D]">
              Note: Subsequent question papers cost ₹10 each. Once unlocked, this paper remains permanently
              accessible in your student dashboard.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowFreeConfirmModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessingUnlock}
                onClick={handleClaimFreePaper}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#E4002B] px-5 py-2 text-xs font-semibold text-white hover:bg-[#C90026] disabled:opacity-50"
              >
                {isProcessingUnlock ? 'Unlocking...' : 'Confirm Free Unlock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ₹10 Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/60 p-4">
          <div className="w-full max-w-md rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-xl space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
              <CreditCard className="h-6 w-6 text-[#20252B]" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B]">Unlock Question Paper</h3>
            <p className="text-xs text-[#66727D] leading-relaxed">
              You are unlocking <strong>{paper.name}</strong> for <strong>₹10 (1000 paise)</strong>.
            </p>
            <div className="rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] p-3 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="text-[#66727D]">Candidate</span>
                <span className="font-semibold text-[#20252B]">{studentSession?.fullName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66727D]">FORT Registration</span>
                <span className="font-mono font-bold text-[#20252B]">
                  {studentSession?.registrationId}
                </span>
              </div>
              <div className="flex justify-between border-t border-[#DCE2E6] pt-1">
                <span className="text-[#66727D]">Total Due</span>
                <span className="font-mono font-bold text-[#20252B]">₹10.00</span>
              </div>
            </div>
            <p className="text-[11px] text-[#66727D]">
              Payment verified server-side. Unlocked papers remain accessible forever with unlimited
              re-attempts, answer keys, and A4 OMR PDF downloads.
            </p>
            <div className="pt-2 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowPaymentModal(false)}
                className="px-4 py-2 text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isProcessingUnlock}
                onClick={handlePurchasePaper}
                className="inline-flex items-center gap-1.5 rounded-xl bg-[#E4002B] px-5 py-2 text-xs font-semibold text-white hover:bg-[#C90026] disabled:opacity-50"
              >
                {isProcessingUnlock ? 'Verifying...' : 'Pay ₹10 & Unlock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaperDetailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F1F3F4] flex items-center justify-center">
          <div className="text-sm font-semibold text-[#66727D]">Loading paper details...</div>
        </div>
      }
    >
      <PaperDetailContent />
    </Suspense>
  );
}
