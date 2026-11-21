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
        toast.success('Redirecting to secure Razorpay payment...');
        router.push('/payment/success?paperId=neet-all-india-mock-01&amount=10');
      }
    } catch (err: any) {
      toast.error(err.message || 'Payment initiation failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-lg rounded-2xl border border-[#263554] bg-[#11182A] p-8 shadow-2xl">
        <div className="text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-[#263554] bg-[#172033] px-3 py-1 text-xs font-semibold text-[#6486C6]">
            <Lock className="h-3.5 w-3.5" />
            <span>256-Bit Encrypted Checkout</span>
          </div>
          <h1 className="mt-4 text-2xl font-bold text-[#F5F7FB]">Unlock Question Paper</h1>
          <p className="mt-1 text-xs text-[#A7B0C0]">
            FORT NEET (UG) All India Full Mock Examination - 01
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div
            onClick={() => setIsFreeClaim(true)}
            className={`rounded-xl border p-4 cursor-pointer transition-all ${
              isFreeClaim ? 'border-[#10B981] bg-[#10B981]/10' : 'border-[#263554] bg-[#172033]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-xs font-bold text-[#10B981]">
                  FREE CLAIM
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#F5F7FB]">
                  Complimentary First Paper
                </h3>
                <p className="text-xs text-[#A7B0C0]">
                  Eligible for your registered FORT candidate profile.
                </p>
              </div>
              <div className="text-2xl font-black text-[#10B981]">₹0</div>
            </div>
          </div>

          <div
            onClick={() => setIsFreeClaim(false)}
            className={`rounded-xl border p-4 cursor-pointer transition-all ${
              !isFreeClaim ? 'border-[#6486C6] bg-[#6486C6]/10' : 'border-[#263554] bg-[#172033]'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-bold text-[#6486C6]">
                  STANDARD RATE
                </span>
                <h3 className="mt-2 text-sm font-bold text-[#F5F7FB]">
                  Subsequent Full Paper Attempt
                </h3>
                <p className="text-xs text-[#A7B0C0]">
                  Lifetime access to results, OMR and solution breakdown.
                </p>
              </div>
              <div className="text-2xl font-black text-[#F5F7FB]">₹10</div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={handleProcessCheckout}
            disabled={loading}
            className="w-full rounded-xl bg-[#6486C6] py-3.5 text-sm font-bold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-lg shadow-[#6486C6]/20 disabled:opacity-50"
          >
            {loading ? 'Processing...' : isFreeClaim ? 'Claim Complimentary Paper & Begin' : 'Pay ₹10 via Razorpay'}
          </button>
        </div>
      </div>
    </div>
  );
}
