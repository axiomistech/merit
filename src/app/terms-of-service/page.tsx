import React from 'react';

export const metadata = {
  title: 'Terms of Service — FORT Learning',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Terms of Service</h1>
        <p className="mt-2 text-xs text-[#7C8799]">Effective Date: January 1, 2026</p>
        <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#A7B0C0] leading-relaxed">
          <p>
            Welcome to FORT Learning. By using our services, applications, and APIs, you agree to
            abide by all applicable local and national laws regarding online education and digital
            testing.
          </p>
          <p>
            FORT Learning reserves the right to terminate accounts that attempt security breaches,
            distributed denial of service, or unauthorized automated crawling of question banks.
          </p>
        </div>
      </div>
    </div>
  );
}
