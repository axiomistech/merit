import React from 'react';

export const metadata = {
  title: 'Payment Terms — MERITWISE',
};

export default function PaymentTermsPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Payment Terms</h1>
          <p className="mt-2 text-xs text-[#71717A]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
            <p>
              All prices on MERITWISE are listed in Indian Rupees (INR) and are inclusive of
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
