import React from 'react';

export const metadata = {
  title: 'Accessibility Statement — FORT Learning',
};

export default function AccessibilityPage() {
  return (
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#E6E5DE] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#263126]">Accessibility Statement</h1>
          <p className="mt-2 text-xs text-[#92958D]">Effective Date: January 1, 2026</p>
          <div className="mt-8 space-y-4 text-xs sm:text-sm text-[#73786E] leading-relaxed">
            <p>
              FORT Learning is committed to digital accessibility and aims to conform to WCAG 2.2 AA
              standards across our public pages, student dashboard, and active examination interface.
            </p>
            <p>
              Our examination engine supports full keyboard navigation, screen reader labels for OMR
              bubbles, high-contrast matte surfaces, and respects user preferences for reduced motion.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
