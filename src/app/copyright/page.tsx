import React from 'react';

export const metadata = {
  title: 'Copyright Notice — MERITWISE',
};

export default function CopyrightPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Copyright Notice</h1>
          <p className="mt-2 text-xs text-[#71717A]">
            © {new Date().getFullYear()} MERITWISE. All rights reserved.
          </p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#52525B] leading-relaxed">
            <p>
              All content, including question papers, original analytical solutions, diagrams, design
              system tokens, and software source code on MERITWISE (MERITWISE.COM) are
              protected by copyright and applicable intellectual property laws.
            </p>
            <p>
              Reproduction, distribution, or automated extraction of question banks without prior written consent
              is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
