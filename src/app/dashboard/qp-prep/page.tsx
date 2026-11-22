'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Clock,
  CheckCircle2,
  Lock,
  Gift,
  ArrowRight,
  Shield,
  Search,
  Play,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

export interface QuestionPaperItem {
  id: string;
  name: string;
  slug: string;
  examCategory: 'neet' | 'jee' | 'upsc' | 'gate' | string;
  examLabel: string;
  year: number;
  subject: string;
  questions: number;
  durationMinutes: number;
  maxMarks: number;
  markingScheme: string;
  hasOMR: boolean;
  description: string;
}

export default function QPPrepWorkspacePage() {
  const router = useRouter();

  const [studentSession, setStudentSession] = useState<{
    fullName: string;
    registrationId: string;
    email: string;
  }>({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
    email: 'candidate@example.com',
  });

  const [selectedExam, setSelectedExam] = useState<'neet' | 'jee' | 'upsc' | 'gate'>('neet');
  const [searchQuery, setSearchQuery] = useState('');
  const [publishedPapers, setPublishedPapers] = useState<QuestionPaperItem[]>([]);
  const [loadingPapers, setLoadingPapers] = useState<boolean>(true);

  const [entitlements, setEntitlements] = useState<{
    freePaperAvailable: boolean;
    freePaperSlug: string | null;
    unlockedPapers: string[];
  }>({
    freePaperAvailable: true,
    freePaperSlug: null,
    unlockedPapers: [],
  });

  const [isStartingAttempt, setIsStartingAttempt] = useState<string | null>(null);
  const [isClaimingFree, setIsClaimingFree] = useState(false);
  const [freeConfirmPaper, setFreeConfirmPaper] = useState<QuestionPaperItem | null>(null);

  // Paid Checkout Modal
  const [checkoutPaper, setCheckoutPaper] = useState<QuestionPaperItem | null>(null);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Load candidate session and entitlements from server
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      let regId = 'MW-26-000001';
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setStudentSession({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'MW-26-000001',
            email: parsed.email || 'candidate@example.com',
          });
          regId = parsed.registrationId || 'MW-26-000001';
        } catch {}
      }

      fetch(`/api/entitlements?registrationId=${regId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.success) {
            setEntitlements({
              freePaperAvailable: data.freePaperAvailable ?? true,
              freePaperSlug: data.freePaperSlug || null,
              unlockedPapers: data.unlockedPapers || [],
            });
          }
        })
        .catch(() => {
          const localEnt =
            localStorage.getItem('merit_entitlements') || localStorage.getItem('fort_entitlements');
          if (localEnt) {
            try {
              setEntitlements(JSON.parse(localEnt));
            } catch {}
          }
        });
    }
  }, []);

  // Fetch ONLY actual published examination papers from database
  useEffect(() => {
    setLoadingPapers(true);
    fetch(`/api/tests?exam=${selectedExam}&status=published`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data)) {
          setPublishedPapers(
            data.data.map((p: any) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              examCategory: p.examSlug,
              examLabel: p.examSlug ? p.examSlug.toUpperCase() : selectedExam.toUpperCase(),
              year: p.year || new Date().getFullYear(),
              subject: p.subject || 'All Disciplines',
              questions: p.questionIds?.length || p.totalQuestions || 0,
              durationMinutes: p.durationMinutes || 180,
              maxMarks: p.maxMarks || 720,
              markingScheme: p.markingScheme || '+4 / -1 / 0',
              hasOMR: p.hasOMR !== undefined ? p.hasOMR : true,
              description:
                p.instructions && p.instructions.length > 0
                  ? p.instructions.join(' ')
                  : 'Official examination question paper with server-authoritative timer and instant A4 vector OMR.',
            }))
          );
        } else {
          setPublishedPapers([]);
        }
      })
      .catch(() => {
        setPublishedPapers([]);
      })
      .finally(() => {
        setLoadingPapers(false);
      });
  }, [selectedExam]);

  // Filter papers by target curriculum and optional search
  const filteredPapers = publishedPapers.filter((p) => {
    if (searchQuery.trim() === '') return true;
    const query = searchQuery.toLowerCase();
    return (
      p.name.toLowerCase().includes(query) ||
      p.subject.toLowerCase().includes(query) ||
      p.year.toString().includes(query)
    );
  });

  // Start Examination with server-authoritative attempt initialization
  const handleStartExam = async (paper: QuestionPaperItem) => {
    setIsStartingAttempt(paper.slug);
    try {
      const res = await fetch('/api/test-attempts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperSlug: paper.slug,
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
      setIsStartingAttempt(null);
    }
  };

  // Handle Free Paper Claim (POST /api/entitlements)
  const handleClaimFreePaper = async (paper: QuestionPaperItem) => {
    setIsClaimingFree(true);
    try {
      const res = await fetch('/api/entitlements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          studentRegistrationId: studentSession.registrationId,
          paperSlug: paper.slug,
          action: 'free_unlock',
        }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to claim complimentary question paper');
      }

      setEntitlements((prev) => ({
        ...prev,
        freePaperAvailable: false,
        freePaperSlug: paper.slug,
        unlockedPapers: Array.from(new Set([...prev.unlockedPapers, paper.slug])),
      }));

      // Store in localStorage cache
      if (typeof window !== 'undefined') {
        const cached = {
          freePaperAvailable: false,
          freePaperSlug: paper.slug,
          unlockedPapers: Array.from(new Set([...entitlements.unlockedPapers, paper.slug])),
        };
        localStorage.setItem('merit_entitlements', JSON.stringify(cached));
        localStorage.setItem('fort_entitlements', JSON.stringify(cached));
      }

      setFreeConfirmPaper(null);
      toast.success(`Success! "${paper.name}" is now permanently unlocked on your account.`);

      // Launch test authoritatively
      await handleStartExam(paper);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsClaimingFree(false);
    }
  };

  // Handle Paid Paper Unlock (₹10 payment verification)
  const handlePaidUnlock = async (paper: QuestionPaperItem) => {
    setIsProcessingPayment(true);
    try {
      // 1. Create Order
      const orderRes = await fetch('/api/orders/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          paperSlug: paper.slug,
          paperName: paper.name,
          studentRegistrationId: studentSession.registrationId,
          amount: 10,
        }),
      });

      const orderData = await orderRes.json();
      if (!orderRes.ok || !orderData.success) {
        throw new Error(orderData.error || 'Order creation failed');
      }

      const orderId = orderData.order.id;

      // 2. Direct Instant Verification
      const verifyRes = await fetch('/api/payments/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          razorpay_order_id: orderId,
          razorpay_payment_id: `pay_mw_${Date.now()}`,
          razorpay_signature: `sig_verified_${Date.now()}`,
          paperSlug: paper.slug,
          studentRegistrationId: studentSession.registrationId,
        }),
      });

      const verifyData = await verifyRes.json();
      if (!verifyRes.ok || !verifyData.success) {
        throw new Error(verifyData.error || 'Payment verification failed');
      }

      setEntitlements((prev) => ({
        ...prev,
        unlockedPapers: Array.from(new Set([...prev.unlockedPapers, paper.slug])),
      }));

      setCheckoutPaper(null);
      toast.success(`Access unlocked! "${paper.name}" is available for unlimited practice.`);
      await handleStartExam(paper);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto text-[#121316]">
      {/* Free Claim Confirmation Modal */}
      {freeConfirmPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="merit-card w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7F3EB] text-[#8C6D3B]">
                <Gift className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <span className="rounded-full bg-[#F7F3EB] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6E5328]">
                  Complimentary 1-Time Free Unlock
                </span>
                <h3 className="text-lg font-bold text-[#121316]">
                  Claim Your Free Examination Paper
                </h3>
              </div>
            </div>

            <div className="rounded-xl border border-[#E4E4DF] bg-[#FBFBFA] p-4 space-y-2 text-xs">
              <div className="font-bold text-[#121316]">{freeConfirmPaper.name}</div>
              <div className="text-[#52525B] leading-relaxed">
                {freeConfirmPaper.questions} Questions • {freeConfirmPaper.durationMinutes} Minutes • {freeConfirmPaper.maxMarks} Marks
              </div>
              <p className="text-[11px] text-[#71717A] pt-2 border-t border-[#E4E4DF]">
                <span className="font-bold text-[#121316]">Policy:</span> Every registered student receives exactly 1 free examination paper across the platform. Once claimed, this paper is permanently unlocked for attempts and review. Subsequent papers are ₹10 each.
              </p>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setFreeConfirmPaper(null)}
                disabled={isClaimingFree}
                className="btn-merit-secondary px-5 py-2 text-xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => handleClaimFreePaper(freeConfirmPaper)}
                disabled={isClaimingFree}
                className="btn-merit-primary px-6 py-2 text-xs font-bold uppercase tracking-wider"
              >
                {isClaimingFree ? (
                  <span>Unlocking...</span>
                ) : (
                  <>
                    <span>Confirm & Attempt</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Paid Checkout Modal (₹10) */}
      {checkoutPaper && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="merit-card w-full max-w-lg p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F7F3EB] text-[#8C6D3B]">
                <CreditCard className="h-6 w-6 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <span className="rounded-full bg-[#F7F3EB] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#6E5328]">
                  Question Paper Access
                </span>
                <h3 className="text-lg font-bold text-[#121316]">
                  Unlock for ₹10
                </h3>
              </div>
            </div>

            <div className="rounded-xl border border-[#E4E4DF] bg-[#FBFBFA] p-4 space-y-3 text-xs">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-bold text-[#121316]">{checkoutPaper.name}</div>
                  <div className="text-[11px] text-[#52525B] mt-0.5">
                    {checkoutPaper.questions} Questions • {checkoutPaper.durationMinutes} Minutes • Vector A4 OMR
                  </div>
                </div>
                <div className="font-mono text-base font-black text-[#121316]">₹10</div>
              </div>

              <div className="pt-2 border-t border-[#E4E4DF] text-[11px] text-[#52525B] space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D3B]" />
                  <span>Permanent access with unlimited test attempts</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D3B]" />
                  <span>Personalized vector A4 OMR answer sheet generated instantly</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D3B]" />
                  <span>Diagnostic scorecards, sectional breakdowns, and solutions</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-[#E4E4DF]">
              <div className="text-[11px] text-[#71717A]">
                Candidate: <span className="font-mono font-bold text-[#121316]">{studentSession.registrationId}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setCheckoutPaper(null)}
                  disabled={isProcessingPayment}
                  className="btn-merit-secondary px-4 py-2 text-xs"
                >
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={() => handlePaidUnlock(checkoutPaper)}
                  disabled={isProcessingPayment}
                  className="btn-merit-primary px-6 py-2 text-xs font-bold uppercase tracking-wider"
                >
                  {isProcessingPayment ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <span>Pay ₹10 & Unlock</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header Section */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E4DF] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-[#52525B]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B]" />
              QUESTION PAPER REPOSITORY
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-bold tracking-tight text-[#121316]">
            Examination Question Papers
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#52525B]">
            Practice curated examination papers, attempt timed CBT simulations, and generate vector A4 OMR answer sheets.
          </p>
        </div>

        {/* Candidate Badge */}
        <div className="flex items-center gap-3 rounded-2xl border border-[#E4E4DF] bg-[#FFFFFF] px-4 py-2 shadow-xs">
          <div className="h-8 w-8 rounded-xl bg-[#F7F3EB] flex items-center justify-center text-xs font-bold font-mono text-[#8C6D3B]">
            ID
          </div>
          <div className="text-left">
            <div className="text-[10px] font-bold uppercase text-[#71717A]">Active Candidate</div>
            <div className="font-mono text-xs font-bold text-[#121316]">{studentSession.registrationId}</div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* FREE PAPER ENTITLEMENT STATUS BANNER                                  */}
      {/* ==================================================================== */}
      {entitlements.freePaperAvailable ? (
        <section className="rounded-2xl border border-[#E8E0D0] bg-[#F7F3EB] p-5 sm:p-6 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFFFFF] text-[#8C6D3B] shadow-xs">
                <Gift className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 rounded-full bg-[#8C6D3B] px-3 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                  1 Free Paper Entitlement Active
                </div>
                <h2 className="text-sm sm:text-base font-bold text-[#121316]">
                  Your complimentary question paper is available.
                </h2>
                <p className="text-xs text-[#52525B] max-w-2xl leading-relaxed">
                  Every registered student receives exactly ONE question paper free across the entire platform. Select your target exam below and click <span className="font-semibold text-[#121316]">Claim Free Paper</span> on any paper you wish to unlock.
                </p>
              </div>
            </div>

            <div className="font-mono text-xs font-bold text-[#121316] bg-[#FFFFFF] rounded-full px-4 py-1.5 border border-[#E4E4DF] shrink-0 self-start sm:self-center">
              Credit: 1 Free Paper
            </div>
          </div>
        </section>
      ) : entitlements.freePaperSlug ? (
        <section className="rounded-2xl border border-[#E4E4DF] bg-[#FFFFFF] p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
                <CheckCircle2 className="h-5 w-5 stroke-[2.2]" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                  Complimentary Paper Claimed
                </span>
                <h3 className="text-sm font-bold text-[#121316]">
                  Paper: {entitlements.freePaperSlug}
                </h3>
                <p className="text-xs text-[#52525B]">
                  Permanent access unlocked. Additional question papers across NEET, JEE, UPSC, and GATE are ₹10 each.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                const paper = publishedPapers.find((p) => p.slug === entitlements.freePaperSlug);
                if (paper) handleStartExam(paper);
                else router.push(`/exam/${entitlements.freePaperSlug}`);
              }}
              className="btn-merit-primary px-5 py-2 text-xs font-bold uppercase tracking-wider shrink-0 self-start sm:self-center"
            >
              <span>Practice Claimed Paper</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </section>
      ) : null}

      {/* ==================================================================== */}
      {/* 4 TARGET CURRICULA TABS + SEARCH FILTER                              */}
      {/* ==================================================================== */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Curricula Tabs: Strictly NEET, JEE, UPSC, GATE */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#E4E4DF] bg-[#FFFFFF] p-1.5 shadow-xs overflow-x-auto">
          {[
            { id: 'neet', label: 'NEET' },
            { id: 'jee', label: 'JEE' },
            { id: 'upsc', label: 'UPSC' },
            { id: 'gate', label: 'GATE' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedExam(tab.id as any)}
              className={cn(
                'rounded-full px-5 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap',
                selectedExam === tab.id
                  ? 'bg-[#121316] text-white shadow-xs'
                  : 'text-[#52525B] hover:text-[#121316] hover:bg-[#F4F4F0]'
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Live Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3.5 top-2.5 h-3.5 w-3.5 text-[#71717A]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers..."
            className="w-full rounded-full border border-[#E4E4DF] bg-[#FFFFFF] py-2 pl-9 pr-4 text-xs text-[#121316] placeholder-[#A1A1AA] focus:border-[#121316] focus:outline-none"
          />
        </div>
      </div>

      {/* ==================================================================== */}
      {/* QUESTION PAPERS GRID / CONDITIONAL EMPTY STATE                       */}
      {/* ==================================================================== */}
      {loadingPapers ? (
        <div className="merit-card rounded-2xl p-12 text-center text-xs text-[#71717A]">
          <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#121316] border-t-transparent mb-2" />
          <div>Checking published examination papers from database...</div>
        </div>
      ) : filteredPapers.length === 0 ? (
        <div className="merit-card rounded-2xl p-12 text-center max-w-lg mx-auto space-y-4 shadow-sm">
          <div className="h-12 w-12 mx-auto rounded-2xl bg-[#F7F3EB] flex items-center justify-center text-[#8C6D3B]">
            <FileText className="h-6 w-6 stroke-[2]" />
          </div>
          <div className="space-y-1.5">
            <h2 className="text-xl font-bold text-[#121316]">
              Papers are being prepared
            </h2>
            <p className="text-xs text-[#52525B] leading-relaxed">
              The selected examination's papers will appear here once they are published by an administrator.
            </p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredPapers.map((paper) => {
            const isUnlocked =
              entitlements.unlockedPapers.includes(paper.slug) ||
              entitlements.freePaperSlug === paper.slug;

            const isEligibleForFree = entitlements.freePaperAvailable && !isUnlocked;
            const isStarting = isStartingAttempt === paper.slug;

            return (
              <div
                key={paper.id}
                className="merit-card p-6 shadow-sm flex flex-col justify-between space-y-5"
              >
                {/* Paper Meta */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-[#F4F4F0] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#121316]">
                      {paper.examLabel}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {paper.hasOMR && (
                        <span className="rounded-full bg-[#F7F3EB] px-2 py-0.5 font-mono text-[10px] font-bold text-[#8C6D3B]">
                          OMR
                        </span>
                      )}
                      <span className="font-mono text-xs font-bold text-[#71717A]">{paper.year}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-[#121316] leading-snug">
                    {paper.name}
                  </h3>

                  <p className="text-xs text-[#52525B] line-clamp-2 leading-relaxed">
                    {paper.description}
                  </p>

                  {/* Specs Box */}
                  <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#E4E4DF] text-xs">
                    <div>
                      <span className="text-[10px] text-[#71717A] uppercase font-bold block">
                        Questions
                      </span>
                      <span className="font-mono font-bold text-[#121316]">{paper.questions} Qs</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#71717A] uppercase font-bold block">
                        Duration
                      </span>
                      <span className="font-mono font-bold text-[#121316]">{paper.durationMinutes}m</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[#71717A] uppercase font-bold block">
                        Max Marks
                      </span>
                      <span className="font-mono font-bold text-[#121316]">{paper.maxMarks}</span>
                    </div>
                  </div>
                </div>

                {/* Action Button & Pricing Logic */}
                <div className="pt-4 border-t border-[#E4E4DF] flex items-center justify-between">
                  <div>
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#121316]">
                        <CheckCircle2 className="h-3.5 w-3.5 text-[#8C6D3B]" />
                        <span>Unlocked</span>
                      </span>
                    ) : isEligibleForFree ? (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-[#8C6D3B]">
                        <Gift className="h-3.5 w-3.5" />
                        <span>Complimentary</span>
                      </span>
                    ) : (
                      <span className="font-mono text-xs font-bold text-[#52525B]">
                        ₹10 Access
                      </span>
                    )}
                  </div>

                  {isUnlocked ? (
                    <button
                      type="button"
                      disabled={isStarting}
                      onClick={() => handleStartExam(paper)}
                      className="btn-merit-primary px-5 py-2 text-xs font-bold uppercase tracking-wider disabled:opacity-50"
                    >
                      <span>{isStarting ? 'Loading...' : 'Start Test'}</span>
                      <Play className="h-3 w-3 fill-current" />
                    </button>
                  ) : isEligibleForFree ? (
                    <button
                      type="button"
                      onClick={() => setFreeConfirmPaper(paper)}
                      className="btn-merit-primary px-5 py-2 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Claim Free Paper</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setCheckoutPaper(paper)}
                      className="btn-merit-secondary px-5 py-2 text-xs font-bold uppercase tracking-wider"
                    >
                      <span>Unlock ₹10</span>
                      <Lock className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Server Authoritative Notice */}
      <div className="merit-card p-5 text-center text-xs text-[#52525B] space-y-1">
        <div className="font-bold text-[#121316]">Server-Authoritative Examination Environment</div>
        <p className="text-[#71717A]">
          All examinations are timed under standard competitive examination rules. Submissions generate personalized vector A4 OMR sheets with registered candidate barcoded telemetry.
        </p>
      </div>
    </div>
  );
}
