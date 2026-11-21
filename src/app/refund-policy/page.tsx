import React from 'react';

export const metadata = {
  title: 'Refund & Cancellation Policy — FORT Learning',
  description: 'Policy regarding refunds and cancellations of paper purchases.',
};

export default function RefundPolicyPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#DCE2E6] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#20252B]">Refund and Cancellation Policy</h1>
          <p className="mt-2 text-xs text-[#66727D]">
            Effective Date: January 1, 2026 • Last Updated: November 2026
          </p>

          <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#66727D]">
            <section>
              <h2 className="text-base font-bold text-[#20252B]">1. Digital Examination Entitlements</h2>
              <p className="mt-2">
                Question papers on FORT Learning are digital goods that unlock immediately upon verified
                payment settlement. Because questions, answer states, and evaluation algorithms are
                accessible instantly upon unlock, purchases of single question papers (₹10) are
                generally non-refundable once an attempt has started.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">2. Eligibility for Refunds</h2>
              <p className="mt-2">Refunds will be processed in the following circumstances:</p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Duplicate Debit: If an amount was deducted more than once for the same question paper due to gateway transmission lag.</li>
                <li>Technical Delivery Failure: If a payment was successfully settled by Razorpay but the server failed to grant the entitlement and the support ticket could not resolve it within 24 hours.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">3. Processing Timeline</h2>
              <p className="mt-2">
                Approved refunds are processed through Razorpay back to the original source account
                within 5 to 7 business days.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
