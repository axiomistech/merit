import React from 'react';

export const metadata = {
  title: 'Cancellation Policy — FORT Learning',
};

export default function CancellationPolicyPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Cancellation Policy</h1>
        <p className="mt-2 text-xs text-[#7C8799]">Effective Date: January 1, 2026</p>
        <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#A7B0C0] leading-relaxed">
          <p>
            Because FORT Learning utilizes a per-paper entitlement model rather than recurring
            automatic subscription debits, there are no ongoing monthly recurring charges to cancel.
          </p>
          <p>
            Candidates retain their unlocked paper attempts in their profile archive indefinitely.
            Candidates may request full account deactivation and removal at any time through account
            settings.
          </p>
        </div>
      </div>
    </div>
  );
}
