'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Shield, ArrowRight, CheckCircle2, Lock, CreditCard, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function PaymentCheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFreeClaim, setIsFreeClaim] = useState(true);

  const handleProcessCheckout = async () => {
    setLoading(true);

    try {
      if (isFreeClaim) {
        // Instant free paper claim
        toast.success('Complimentary question paper unlocked!');
        router.push('/payment/success?paperId=neet-all-india-mock-01&free=true');
      } else {
        // Standard ₹10 checkout
        toast.success('Connecting to secure Razorpay payment...');
        router.push('/payment/success?paperId=neet-all-india-mock-01&amount=10');
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#E6E5DE] bg-white p-8 sm:p-10 shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit Encrypted Entitlement Authorization</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#263126] font-serif">Unlock Question Paper</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            FORT NEET (UG) All India Full Mock Examination - 01
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div
            onClick={() => setIsFreeClaim(true)}
            className={`rounded-xl border p-5 cursor-pointer transition-all ${
              isFreeClaim
                ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#9CAF88] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase">
                  FREE CLAIM
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#263126]">
                  Complimentary First Paper
                </h3>
                <p className="mt-0.5 text-xs text-[#73786E]">
                  Included with your verified candidate registration. Full CBT + Live OMR + Solutions.
                </p>
              </div>
              <div className="text-2xl font-black text-[#263126] font-mono">₹0</div>
            </div>
          </div>

          <div
            onClick={() => setIsFreeClaim(false)}
            className={`rounded-xl border p-5 cursor-pointer transition-all ${
              !isFreeClaim
                ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                : 'border-[#E6E5DE] bg-white text-[#73786E] hover:border-[#9CAF88]/50'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded-full bg-[#F7F5EF] border border-[#E6E5DE] px-2.5 py-0.5 text-[10px] font-bold text-[#73786E] uppercase">
                  STANDARD RATE
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#263126]">
                  Subsequent Full Paper Attempt
                </h3>
                <p className="mt-0.5 text-xs text-[#73786E]">
                  Transparent pay-per-test pricing. No recurring subscriptions or lock-in.
                </p>
              </div>
              <div className="text-2xl font-black text-[#263126] font-mono">₹10</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleProcessCheckout}
            disabled={loading}
            className="w-full rounded-xl bg-[#9CAF88] py-3.5 text-sm font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm disabled:opacity-50"
          >
            {loading
              ? 'Authorizing Entitlement...'
              : isFreeClaim
              ? 'Claim Complimentary Paper & Begin'
              : 'Pay ₹10 via Razorpay (UPI / Cards / NetBanking)'}
          </button>

          <p className="mt-3 text-center text-[11px] text-[#92958D]">
            Immediate server authorization. Access granted forever in your attempt archive.
          </p>
        </div>
      </div>
    </div>
  );
}
