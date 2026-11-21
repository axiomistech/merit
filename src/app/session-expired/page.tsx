import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#DCE2E6] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#E9EEF1] text-[#20252B]">
          <Clock className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#20252B] font-serif">Session Expired</h1>
        <p className="mt-2 text-xs text-[#66727D] leading-relaxed">
          Your secure authentication session has elapsed. Please sign in again to resume your
          timed practice and review your analytics.
        </p>

        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#9CC6E0] px-6 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#C90026] transition-all shadow-sm"
          >
            <span>Sign In to Reconnect</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
