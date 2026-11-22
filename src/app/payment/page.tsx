'use client';

import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, CheckCircle2, Lock, CreditCard, Sparkles, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { openRazorpayCheckout } from '@/components/payment/RazorpayCheckoutButton';

function PaymentCheckoutContent() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'test_min' | 'standard'>('standard');
  const [studentSession, setStudentSession] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const raw =
        localStorage.getItem('merit_student_session') ||
        localStorage.getItem('fort_student_session');
      if (raw) {
        try {
          setStudentSession(JSON.parse(raw));
        } catch {}
      }
    }
  }, []);

  const handleProcessCheckout = async () => {
    if (selectedPlan === 'free') {
      setLoading(true);
      try {
        toast.success('Complimentary question paper unlocked!');
        router.push('/payment/success?paperId=neet-all-india-mock-01&free=true');
      } catch (err: any) {
        toast.error(err.message || 'Free claim failed');
      } finally {
        setLoading(false);
      }
      return;
    }

    setLoading(true);
    // test_min = ₹1 (100 paise), standard = ₹10 (1000 paise)
    const amountPaise = selectedPlan === 'test_min' ? 100 : 1000;
    const amountInr = amountPaise / 100;

    try {
      await openRazorpayCheckout({
        amountInPaise: amountPaise,
        name: 'NEET (UG) All India Full Mock - 01',
        description: `Full Mock Examination Paper Unlock (₹${amountInr})`,
        studentName: studentSession?.fullName || 'Candidate',
        studentEmail: studentSession?.email || 'student@meritwise.in',
        studentRegistrationId: studentSession?.registrationId || 'MW-26-000001',
        paperSlug: 'neet-all-india-mock-01',
        notes: {
          examCategory: 'NEET',
          plan: selectedPlan,
        },
        onSuccess: (res) => {
          setLoading(false);
          toast.success(`Payment of ₹${amountInr} verified! Unlocking paper...`);
          router.push(
            `/payment/success?paperId=neet-all-india-mock-01&amount=${amountInr}&paymentId=${res.payment_id}&orderId=${res.order_id}`
          );
        },
        onError: () => {
          setLoading(false);
        },
        onDismiss: () => {
          setLoading(false);
        },
      });
    } catch (err: any) {
      setLoading(false);
      toast.error(err.message || 'Payment failed');
    }
  };

  return (
    <div className="bg-[#F8FAF6] text-[#151A15] min-h-screen py-20 flex items-center justify-center px-4 relative">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
        style={{
          background:
            'radial-gradient(900px circle at 85% 10%, rgba(234, 241, 245, 0.7) 0%, rgba(220, 231, 237, 0.3) 40%, transparent 70%)',
        }}
      />

      <div className="w-full max-w-lg rounded-2xl border border-[#DCE2E6] bg-white p-8 sm:p-10 shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF1F5] px-3 py-1 text-xs font-semibold text-[#151A15]">
            <Lock className="h-3.5 w-3.5 text-[#9CAF88]" />
            <span>Razorpay Standard Checkout (HMAC-SHA256 Encrypted)</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#151A15] font-sans">Unlock Examination Paper</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            NEET (UG) All India Full Mock Examination - 01
          </p>
        </div>

        <div className="mt-8 space-y-3">
          {/* Option 1: Standard Rate ₹10 */}
          <div
            onClick={() => setSelectedPlan('standard')}
            className={`rounded-xl border p-4 sm:p-5 cursor-pointer transition-all ${
              selectedPlan === 'standard'
                ? 'border-[#9CAF88] bg-[#F2F6EF] ring-1 ring-[#9CAF88]'
                : 'border-[#DCE2E6] bg-white hover:border-[#9CAF88]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#9CAF88] px-2 py-0.5 text-[10px] font-bold text-[#151A15] uppercase">
                  STANDARD TEST
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-[#151A15]">
                  Full Examination Paper
                </h3>
                <p className="mt-0.5 text-xs text-[#66727D]">
                  Standard ₹10 pay-per-test. Official questions + timer + instant analytics.
                </p>
              </div>
              <div className="text-2xl font-black text-[#151A15] font-mono">₹10</div>
            </div>
          </div>

          {/* Option 2: Test Minimum Checkout ₹1 */}
          <div
            onClick={() => setSelectedPlan('test_min')}
            className={`rounded-xl border p-4 sm:p-5 cursor-pointer transition-all ${
              selectedPlan === 'test_min'
                ? 'border-[#9CAF88] bg-[#F2F6EF] ring-1 ring-[#9CAF88]'
                : 'border-[#DCE2E6] bg-white hover:border-[#9CAF88]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#DCE7ED] border border-[#C9D9E2] px-2 py-0.5 text-[10px] font-bold text-[#151A15] uppercase">
                  MINIMUM TEST (100 PAISE)
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-[#151A15]">
                  Razorpay Sandbox Test Paper
                </h3>
                <p className="mt-0.5 text-xs text-[#66727D]">
                  Verify Razorpay modal, UPI, test cards, and backend HMAC verification.
                </p>
              </div>
              <div className="text-2xl font-black text-[#151A15] font-mono">₹1</div>
            </div>
          </div>

          {/* Option 3: Free Claim */}
          <div
            onClick={() => setSelectedPlan('free')}
            className={`rounded-xl border p-4 sm:p-5 cursor-pointer transition-all ${
              selectedPlan === 'free'
                ? 'border-[#9CAF88] bg-[#F2F6EF] ring-1 ring-[#9CAF88]'
                : 'border-[#DCE2E6] bg-white hover:border-[#9CAF88]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#E5E7EB] px-2 py-0.5 text-[10px] font-bold text-[#4B5563] uppercase">
                  FREE CLAIM
                </span>
                <h3 className="mt-1.5 text-sm font-bold text-[#151A15]">
                  Complimentary First Paper
                </h3>
                <p className="mt-0.5 text-xs text-[#66727D]">
                  Complimentary access included with candidate registration.
                </p>
              </div>
              <div className="text-2xl font-black text-[#151A15] font-mono">₹0</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="button"
            onClick={handleProcessCheckout}
            disabled={loading}
            className="w-full rounded-xl bg-[#9CAF88] py-3.5 text-sm font-bold text-[#151A15] hover:bg-[#8CA078] transition-all shadow-sm disabled:opacity-50 active:scale-[0.99]"
          >
            {loading ? (
              <span className="inline-flex items-center justify-center gap-2">
                <svg className="h-4 w-4 animate-spin text-[#151A15]" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing Checkout...
              </span>
            ) : selectedPlan === 'free' ? (
              'Claim Complimentary Paper & Begin'
            ) : selectedPlan === 'test_min' ? (
              'Pay ₹1 with Razorpay (UPI / Cards)'
            ) : (
              'Pay ₹10 via Razorpay (UPI / Cards / NetBanking)'
            )}
          </button>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-[#66727D]">
            <Shield className="h-3.5 w-3.5 text-[#9CAF88]" />
            <span>Test Mode: Razorpay Sandbox Active (rzp_test_U3M02Ve7QK65xf)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentCheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F8FAF6] flex items-center justify-center text-xs font-mono text-[#66727D]">
          Loading checkout...
        </div>
      }
    >
      <PaymentCheckoutContent />
    </Suspense>
  );
}
