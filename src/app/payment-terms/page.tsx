import React from 'react';

export const metadata = {
  title: 'Payment Terms — FORT Learning',
};

export default function PaymentTermsPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#263126]">Payment Terms</h1>
          <p className="mt-2 text-xs text-[#92958D]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#73786E] leading-relaxed">
            <p>
              All prices on FORT Learning are listed in Indian Rupees (INR) and are inclusive of
              applicable goods and services taxes unless explicitly noted.
            </p>
            <p>
              Payment transactions are secured through Razorpay. Access entitlements are granted
              exclusively upon verified cryptographic webhook or server verification. Client-side
              redirects do not constitute proof of payment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
