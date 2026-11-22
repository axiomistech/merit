import React from 'react';

export const metadata = {
  title: 'Terms & Conditions — MERITWISE',
  description: 'Terms and Conditions governing access to MERITWISE.',
};

export default function TermsAndConditionsPage() {
  return (
    <div className="bg-[#FBFBFA] text-[#121316] min-h-screen py-20">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="merit-card p-8 sm:p-12 shadow-xs">
          <h1 className="text-3xl font-extrabold sm:text-4xl text-[#121316]">Terms and Conditions</h1>
          <p className="mt-2 text-xs text-[#71717A]">
            Effective Date: January 1, 2026 • Last Updated: November 2026
          </p>

          <div className="mt-8 space-y-6 text-xs sm:text-sm leading-relaxed text-[#52525B]">
            <section>
              <h2 className="text-base font-bold text-[#121316]">1. Acceptance of Terms</h2>
              <p className="mt-2">
                By accessing MERITWISE (MERITWISE.COM), creating an account, or attempting an
                examination paper, you agree to be bound by these Terms and Conditions. If you do not
                agree, do not access or use the platform.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#121316]">2. Digital Entitlements & Pricing</h2>
              <p className="mt-2">
                Registered candidates are provided one complimentary full question paper. Subsequent
                papers require individual entitlement purchases priced at ₹10 (or configured
                institutional rate). Entitlements grant personal, non-transferable access to the paper,
                marking engine, OMR export, and solutions.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#121316]">3. Academic Integrity & Prohibited Conduct</h2>
              <p className="mt-2">
                Users shall not attempt to reverse engineer question banks, automate bot submissions,
                forge payment signatures, or bypass server-side deadline timers. Accounts engaged in
                fraudulent attempts will be suspended.
              </p>
            </section>

            <section>
              <h2 className="text-base font-bold text-[#121316]">4. Intellectual Property</h2>
              <p className="mt-2">
                All question formulations, concept hierarchies, software engines, and OMR layout
                algorithms are the intellectual property of MERITWISE.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
