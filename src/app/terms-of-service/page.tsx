import React from 'react';

export const metadata = {
  title: 'Terms of Service — MERITWISE',
};

export default function TermsOfServicePage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Terms of Service</h1>
          <p className="mt-2 text-xs text-[#71717A]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
            <p>
              Welcome to MERITWISE. By using our services, applications, and APIs, you agree to
              abide by all applicable local and national laws regarding digital examination testing.
            </p>
            <p>
              MERITWISE reserves the right to terminate accounts that attempt security breaches,
              automated test scraping, or unauthorized crawling of question papers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
