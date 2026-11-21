import React from 'react';
import Link from 'next/link';
import { Clock, ArrowRight } from 'lucide-react';

export default function SessionExpiredPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-24 flex items-center justify-center px-4">
      <div className="max-w-md w-full rounded-2xl border border-[#263554] bg-[#11182A] p-8 text-center shadow-2xl">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-400/20 text-amber-300">
          <Clock className="h-8 w-8" />
        </div>
        <h1 className="mt-4 text-xl font-bold text-[#F5F7FB]">Session Expired</h1>
        <p className="mt-2 text-xs text-[#A7B0C0] leading-relaxed">
          Your secure authentication session has elapsed. Please sign in again to resume your
          practice.
        </p>

        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-2 rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <span>Sign In to Reconnect</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
