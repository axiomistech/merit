import React from 'react';

export const metadata = {
  title: 'Cookie Policy — MERITWISE',
};

export default function CookiePolicyPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Cookie Policy</h1>
          <p className="mt-2 text-xs text-[#71717A]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
            <p>
              MERITWISE uses strictly necessary cookies and secure session tokens for candidate
              authentication, CSRF security, active test state preservation, and user preferences.
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
