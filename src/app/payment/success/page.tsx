import React from 'react';
import Link from 'next/link';
import { CheckCircle2, ArrowRight, Shield } from 'lucide-react';

export default function PaymentSuccessPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9EEF1] text-[#20252B]">
          <CheckCircle2 className="h-8 w-8" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-[#20252B] font-sans">Entitlement Unlocked</h1>
        <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
          Your access to the examination paper has been confirmed and granted on the server. You may
          now commence the timed paper or download the physical vector OMR sheet.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/exam/neet-demo"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#9CC6E0] py-3 text-xs font-bold text-[#20252B] hover:bg-[#C90026] transition-all shadow-sm"
          >
            <span>Start Examination Now</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] py-3 text-xs font-semibold text-[#20252B] hover:bg-[#E9EEF1] transition-colors"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
