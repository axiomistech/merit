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
import { openRazorpayCheckout } from '@/components/payment/RazorpayCheckoutButton';

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

function PaperDetailContent() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const slug = (params?.slug as string) || '';

  const [paper, setPaper] = useState<PaperDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [studentSession, setStudentSession] = useState<any>(null);
  const [hasAccess, setHasAccess] = useState(false);
  const [freePaperAvailable, setFreePaperAvailable] = useState(true);
  const [isProcessingUnlock, setIsProcessingUnlock] = useState(false);
  const [isStartingAttempt, setIsStartingAttempt] = useState(false);
  const [showFreeConfirmModal, setShowFreeConfirmModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (!slug) return;

    // Check student session & enforce authentication gate
    if (typeof window !== 'undefined') {
      const stored =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (!stored) {
        // Unauthenticated visitor: immediately redirect to authentication without exposing paper metadata
        router.replace(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
        return;
      }

      try {
        const parsed = JSON.parse(stored);
        setStudentSession(parsed);

        fetch(
          `/api/entitlements?registrationId=${parsed.registrationId || 'MW-26-000001'}&paperSlug=${slug}`
        )
          .then((res) => res.json())
          .then((entData) => {
            if (entData && entData.success) {
              setHasAccess(entData.hasAccess);
              setFreePaperAvailable(entData.freePaperAvailable ?? true);
            }
          })
          .catch(() => {});
      } catch {
        router.replace(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
        return;
      }
    }

    setLoading(true);
    // Fetch authoritative paper from backend API
    fetch(`/api/tests/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data && data.data.status === 'published') {
          const p = data.data;
          setPaper({
            id: p.id,
            name: p.name,
            slug: p.slug,
            exam: p.examSlug,
            examLabel: p.examSlug.toUpperCase(),
            year: p.year || new Date().getFullYear(),
            durationMinutes: p.durationMinutes || 180,
            totalQuestions: p.questionIds?.length || p.totalQuestions || 0,
            maxMarks: p.maxMarks || 720,
            markingScheme: p.markingScheme || '+4 for correct, -1 for incorrect, 0 for unattempted',
            hasOMR: p.hasOMR !== undefined ? p.hasOMR : true,
            description:
              p.instructions && p.instructions.length > 0
                ? p.instructions.join(' ')
                : 'Official examination question paper with server-authoritative timer and instant A4 vector OMR.',
            instructions: p.instructions || [
              'Official examination simulation.',
              'Server-authoritative timer with auto-submit upon duration expiration.',
              'Printable high-resolution A4 vector OMR sheet generated immediately upon submission.',
            ],
            sections: p.sections || [
              {
                name: p.subject || 'All Subjects',
                questions: p.questionIds?.length || p.totalQuestions || 0,
                marks: p.maxMarks || 720,
              },
            ],
          });
        } else {
          setPaper(null);
        }
      })
      .catch(() => {
        setPaper(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [slug, router]);

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

  // Handle Paid Paper Purchase Action (₹10)
  const handlePurchasePaper = async () => {
    if (!studentSession) {
      router.push(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
      return;
    }

    setIsProcessingUnlock(true);
    try {
      await openRazorpayCheckout({
        amountInPaise: 1000, // ₹10 standard price
        name: paper?.name || 'Examination Question Paper',
        description: `Full Paper Unlock: ${paper?.name || slug}`,
        studentName: studentSession.fullName,
        studentEmail: studentSession.email,
        studentRegistrationId: studentSession.registrationId,
        paperSlug: slug,
        onSuccess: () => {
          setHasAccess(true);
          setShowPaymentModal(false);
          toast.success('Payment verified (₹10). Question paper unlocked permanently!');
        },
        onError: () => {},
        onDismiss: () => {},
      });
    } catch (err: any) {
      toast.error(err.message || 'Payment initiation failed');
    } finally {
      setIsProcessingUnlock(false);
    }
  };

  // Launch Examination Attempt
  const handleStartExam = async () => {
    if (!studentSession) {
      router.push(`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`);
      return;
    }

    setIsStartingAttempt(true);
    try {
      const res = await fetch('/api/test-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperSlug: slug,
          studentRegistrationId: studentSession.registrationId,
          studentName: studentSession.fullName,
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to start examination attempt');
      }

      const { attemptId } = data.data;
      router.push(`/exam/${attemptId}`);
    } catch (err: any) {
      toast.error(err.message);
      setIsStartingAttempt(false);
    }
  };

  if (loading) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B] py-20 px-4 flex items-center justify-center">
        <div className="flex flex-col items-center gap-3 text-xs text-[#66727D]">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent" />
          <span>Verifying published question paper blueprint...</span>
        </div>
      </div>
    );
  }

  if (!paper) {
    return (
      <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B] py-20 px-4 flex items-center justify-center">
        <div className="glass-polar rounded-[36px] p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm border border-[#DCE2E6]/80">
          <div className="h-14 w-14 mx-auto rounded-2xl bg-[#9CC6E0]/30 flex items-center justify-center text-[#20252B]">
            <FileText className="h-7 w-7 stroke-[2]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold font-sans text-[#20252B]">
              Papers are being prepared
            </h2>
            <p className="text-xs text-[#66727D] leading-relaxed">
              The requested question paper has not been published yet or is being prepared.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/qp-prep"
              className="inline-flex h-9 items-center justify-center rounded-full bg-[#20252B] px-6 text-xs font-bold text-white transition-all hover:bg-black"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#F1F3F4] text-[#20252B] py-12 px-4 sm:px-6 lg:px-8">
      {/* Ambient Liquid Fluid Backdrop */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-[-100px] right-[-80px] h-[600px] w-[600px]" />
        <div className="liquid-orb-red top-[400px] left-[-100px] h-[550px] w-[550px]" />
        <div className="liquid-orb-glacier bottom-[-100px] right-[10%] h-[650px] w-[650px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs text-[#66727D]">
          <Link href="/" className="hover:text-[#20252B]">
            Home
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/dashboard/qp-prep" className="hover:text-[#20252B]">
            Dashboard
          </Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="font-semibold text-[#20252B] truncate">{paper.name}</span>
        </div>

        {/* Paper Overview Card (Liquid Glass) */}
        <div className="glass-polar rounded-[38px] p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="glass-pill px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-[#20252B]">
              {paper.examLabel} • Year {paper.year}
            </span>

            {hasAccess ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-[#20252B] bg-[#9CC6E0]/30 px-3.5 py-1 rounded-full">
                <CheckCircle2 className="h-4 w-4 text-[#E4002B]" />
                <span>Paper Unlocked & Ready</span>
              </span>
            ) : studentSession && freePaperAvailable ? (
              <span className="text-xs font-bold text-[#20252B] bg-[#9CC6E0]/40 px-3.5 py-1 rounded-full">
                ✨ Free Unlock Available
              </span>
            ) : (
              <span className="text-xs font-bold text-[#66727D] glass-pill px-3.5 py-1 rounded-full">
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
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/60">
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md">
              <div className="text-[10px] text-[#66727D] uppercase font-bold tracking-wider">Total Questions</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.totalQuestions} Questions
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md">
              <div className="text-[10px] text-[#66727D] uppercase font-bold tracking-wider">Duration</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.durationMinutes} Minutes
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md">
              <div className="text-[10px] text-[#66727D] uppercase font-bold tracking-wider">Max Marks</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.maxMarks} Marks
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white/60 backdrop-blur-md">
              <div className="text-[10px] text-[#66727D] uppercase font-bold tracking-wider">Format</div>
              <div className="mt-1 text-base font-bold font-mono text-[#20252B]">
                {paper.hasOMR ? 'CBT + A4 OMR' : 'CBT Numerical'}
              </div>
            </div>
          </div>

          {/* Sections Breakdown */}
          {paper.sections && paper.sections.length > 0 && (
            <div className="pt-4 border-t border-white/60 space-y-3">
              <h2 className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
                Blueprint & Sectional Allotment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {paper.sections.map((sec, idx) => (
                  <div key={idx} className="rounded-2xl bg-white/50 p-3.5 border border-white/80">
                    <div className="font-semibold text-xs text-[#20252B]">{sec.name}</div>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-[#66727D] font-mono">
                      <span>{sec.questions} Qs</span>
                      <span>{sec.marks} Marks</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="pt-4 border-t border-white/60 space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[#66727D]">
              Examination Instructions
            </h2>
            <ul className="space-y-2 text-xs text-[#66727D]">
              {paper.instructions.map((inst, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B] mt-1.5 shrink-0" />
                  <span>{inst}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Action Footer */}
          <div className="pt-6 border-t border-white/60 flex flex-wrap items-center justify-between gap-4">
            <div className="text-xs text-[#66727D]">
              Marking Scheme: <strong className="text-[#20252B]">{paper.markingScheme}</strong>
            </div>

            <div className="flex items-center gap-3">
              {/* Not Logged In */}
              {!studentSession && (
                <>
                  <Link
                    href={`/login?redirect=${encodeURIComponent(`/papers/${slug}`)}`}
                    className="glass-pill px-6 py-2.5 rounded-full text-xs font-bold text-[#20252B] hover:bg-white"
                  >
                    Sign In
                  </Link>
                  <Link
                    href={`/signup?redirect=${encodeURIComponent(`/papers/${slug}`)}`}
                    className="glass-racing-red inline-flex items-center gap-1.5 px-6 py-2.5 rounded-full text-white text-xs font-bold shadow-md shadow-[#E4002B]/25"
                  >
                    <span>Register to Unlock</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}

              {/* Logged in with active access */}
              {studentSession && hasAccess && (
                <button
                  type="button"
                  onClick={handleStartExam}
                  disabled={isStartingAttempt}
                  className="glass-racing-red inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-bold shadow-lg shadow-[#E4002B]/25 transition-all hover:scale-[1.02] disabled:opacity-50"
                >
                  {isStartingAttempt ? (
                    <span>Initializing Attempt...</span>
                  ) : (
                    <>
                      <span>Start Examination</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              )}

              {/* Logged in with Free Paper Available */}
              {studentSession && !hasAccess && freePaperAvailable && (
                <button
                  type="button"
                  onClick={() => setShowFreeConfirmModal(true)}
                  className="glass-racing-red inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-bold shadow-lg shadow-[#E4002B]/25 transition-all hover:scale-[1.02]"
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
                  className="glass-racing-red inline-flex items-center gap-2 px-7 py-3 rounded-full text-white text-sm font-bold shadow-lg shadow-[#E4002B]/25 transition-all hover:scale-[1.02]"
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="glass-polar w-full max-w-md rounded-[32px] p-8 shadow-2xl space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9CC6E0]/30 text-[#20252B]">
              <Sparkles className="h-6 w-6 text-[#E4002B]" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B]">Use Free Paper Entitlement?</h3>
            <p className="text-xs text-[#66727D] leading-relaxed">
              Every registered MERITWISE student receives <strong>1 complimentary question paper unlock</strong>.
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
                onClick={handleClaimFreePaper}
                disabled={isProcessingUnlock}
                className="glass-racing-red inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-[#E4002B]/25"
              >
                {isProcessingUnlock ? 'Unlocking...' : 'Confirm Free Unlock'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ₹10 Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="glass-polar w-full max-w-md rounded-[32px] p-8 shadow-2xl space-y-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#9CC6E0]/30 text-[#20252B]">
              <CreditCard className="h-6 w-6 text-[#20252B]" />
            </div>
            <h3 className="text-lg font-bold text-[#20252B]">Unlock Question Paper (₹10)</h3>
            <p className="text-xs text-[#66727D] leading-relaxed">
              Unlock <strong>{paper.name}</strong> with lifetime access, server-authoritative timer, and instant vector A4 OMR evaluation.
            </p>
            <div className="p-4 rounded-2xl bg-[#F1F3F4] text-xs space-y-1.5 border border-[#DCE2E6]">
              <div className="flex justify-between">
                <span className="text-[#66727D]">Product:</span>
                <span className="font-semibold text-[#20252B] truncate max-w-[200px]">{paper.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66727D]">Fee:</span>
                <span className="font-mono font-bold text-[#20252B]">₹10.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#66727D]">Student ID:</span>
                <span className="font-mono font-semibold text-[#20252B]">
                  {studentSession?.registrationId || 'MW-26-000001'}
                </span>
              </div>
            </div>
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
                onClick={handlePurchasePaper}
                disabled={isProcessingUnlock}
                className="glass-racing-red inline-flex items-center gap-1.5 px-6 py-2 rounded-full text-white text-xs font-bold shadow-md shadow-[#E4002B]/25"
              >
                {isProcessingUnlock ? 'Processing...' : 'Pay ₹10 & Unlock'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function PaperDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="flex h-screen items-center justify-center bg-[#F1F3F4] text-xs text-[#66727D]">
          Loading paper specifications...
        </div>
      }
    >
      <PaperDetailContent />
    </Suspense>
  );
}
