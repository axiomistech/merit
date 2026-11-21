import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#E6E5DE] bg-white p-8 sm:p-10 text-center shadow-[0_4px_24px_rgba(38,49,38,0.06)]">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FCE8E4] text-[#E8412C]">
          <XCircle className="h-8 w-8" />
        </div>

        <h1 className="mt-4 text-2xl font-bold text-[#263126] font-serif">Payment Incomplete</h1>
        <p className="mt-2 text-xs text-[#73786E] leading-relaxed">
          The payment transaction was cancelled or could not be settled by your issuing bank. No
          amount was deducted.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/payment"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#9CAF88] py-3 text-xs font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retry Payment</span>
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] py-3 text-xs font-semibold text-[#263126] hover:bg-[#E9EEE3] transition-colors"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
