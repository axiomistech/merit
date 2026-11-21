import React from 'react';

export const metadata = {
  title: 'Privacy Policy — FORT Learning',
  description: 'Privacy Policy and Data Protection standards of FORT Learning.',
};

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-[#DCE2E6] bg-white p-8 sm:p-12 shadow-card">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#20252B]">Privacy Policy</h1>
          <p className="mt-2 text-xs text-[#66727D]">
            Effective Date: January 1, 2026 • Last Updated: November 2026
          </p>

          <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#66727D]">
            <section>
              <h2 className="text-base font-bold text-[#20252B]">1. Introduction & Overview</h2>
              <p className="mt-2">
                FORT Learning ("we", "our", or "us"), operating at FORTLEARNING.COM, is committed to
                protecting the personal information and academic data of our candidates and users.
                This Privacy Policy explains how we collect, store, utilize, and safeguard your data
                when you use our examination practice infrastructure.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">2. Information We Collect</h2>
              <p className="mt-2">
                We collect information strictly necessary to provide authentic examination practice
                and performance analysis:
              </p>
              <ul className="mt-2 list-disc pl-5 space-y-1">
                <li>Candidate Identity: Full name, verified email address, date of birth, country, and optional phone number.</li>
                <li>Academic Profile: Target examinations, preparation stage, and examination year.</li>
                <li>Attempt & Answer Data: Selected question options, time spent per question, OMR responses, submission timestamps, and accuracy metrics.</li>
                <li>Transaction Data: Payment order IDs and transaction references processed via Razorpay. We do not store raw credit card numbers or UPI PINs.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">3. Atomic Registration Identifier</h2>
              <p className="mt-2">
                Upon account creation, the platform generates a unique, immutable registration number
                (e.g., FORT-26-XXXXXX) using an atomic database sequence. This identifier is used to
                associate attempts, support tickets, and OMR sheets without exposing private email
                addresses on printable sheets.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">4. Data Protection & Security</h2>
              <p className="mt-2">
                We enforce PostgreSQL Row Level Security (RLS) on all user-facing database tables.
                Candidates can only read and modify their own attempts, bookmarks, and purchases.
                Answer keys remain sealed server-side during active tests.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#20252B]">5. Account Deletion & Rights</h2>
              <p className="mt-2">
                Candidates possess the right to export their attempt history or request complete
                account deletion. Deletion requests permanently erase personal profiles, past attempts,
                and derived metrics.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
