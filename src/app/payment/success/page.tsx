import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#10B981]/20 text-[#10B981]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[#F5F7FB]">Entitlement Unlocked</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          Your access to the examination paper has been confirmed and granted on the server. You may
          now commence the timed paper or download the physical OMR sheet.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#6486C6] py-3 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <span>Start Examination Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-xl border border-[#263554] bg-[#172033] py-3 text-xs font-semibold text-[#F5F7FB]"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
