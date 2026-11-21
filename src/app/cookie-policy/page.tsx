import React from 'react';

export const metadata = {
  title: 'Cookie Policy — FORT Learning',
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#263126]">Cookie Policy</h1>
          <p className="mt-2 text-xs text-[#92958D]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#73786E] leading-relaxed">
            <p>
              FORT Learning uses strictly necessary cookies and secure session tokens for candidate
              authentication, CSRF security, active test state preservation, and theme preferences.
            </p>
            <p>
              We do not sell personal browsing cookies to third-party ad networks. You may control
              cookie preferences through your browser settings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
