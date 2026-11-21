import React from 'react';

export const metadata = {
  title: 'Accessibility Statement — FORT Learning',
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold sm:text-4xl">Accessibility Statement</h1>
        <p className="mt-2 text-xs text-[#7C8799]">Effective Date: January 1, 2026</p>
        <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#A7B0C0] leading-relaxed">
          <p>
            FORT Learning is committed to digital accessibility and aims to conform to WCAG 2.2 AA
            standards across our public pages, student dashboard, and active examination interface.
          </p>
          <p>
            Our examination engine supports full keyboard navigation, screen reader labels for OMR
            bubbles, high-contrast dark themes, and respects user preferences for reduced motion.
          </p>
        </div>
      </div>
    </div>
  );
}
