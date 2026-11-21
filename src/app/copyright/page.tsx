import React from 'react';

export const metadata = {
  title: 'Copyright Notice — FORT Learning',
};

export default function CopyrightPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#DCE2E6] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#20252B]">Copyright Notice</h1>
          <p className="mt-2 text-xs text-[#66727D]">
            © {new Date().getFullYear()} FORT Learning. All rights reserved.
          </p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#66727D] leading-relaxed">
            <p>
              All content, including question banks, original analytical solutions, diagrams, design
              system tokens, and software source code on FORT Learning (FORTLEARNING.COM) are
              protected by copyright and applicable intellectual property laws.
            </p>
            <p>
              Reproduction, distribution, or scraping of question banks without prior written consent
              is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
