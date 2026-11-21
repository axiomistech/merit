import React from 'react';
import Link from 'next/link';
import { XCircle, ArrowRight, RotateCcw } from 'lucide-react';

export default function PaymentFailedPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#EF4444]/20 text-[#EF4444]">
          <XCircle className="h-8 w-8" />
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-[#F5F7FB]">Payment Incomplete</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          The payment transaction was cancelled or could not be settled by your issuing bank. No
          amount was deducted.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/payment"
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#6486C6] py-3 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Retry Payment</span>
          </Link>
          <Link
            href="/dashboard"
            className="block w-full rounded-xl border border-[#263554] bg-[#172033] py-3 text-xs font-semibold text-[#F5F7FB]"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
