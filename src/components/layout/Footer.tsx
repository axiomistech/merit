import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
                <Shield className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-mono text-xl font-bold tracking-tight text-[#20252B]">FORT</span>
                <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-[#66727D]">
                  Learning
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#66727D]">
              Institutional digital learning and examination practice infrastructure built around
              concepts, questions, simulation engines, OMR accuracy, and continuous improvement.
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs text-[#66727D]">
              <span className="font-mono font-semibold text-[#20252B]">FORTLEARNING.COM</span>
              <span>•</span>
              <span>Knowledge. Built Strong.</span>
            </div>
          </div>

          {/* Examinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Examinations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/neet" className="hover:text-[#20252B] transition-colors">
                  FORT NEET (UG)
                </Link>
              </li>
              <li>
                <Link href="/jee-main" className="hover:text-[#20252B] transition-colors">
                  FORT JEE Main
                </Link>
              </li>
              <li>
                <Link href="/jee-advanced" className="hover:text-[#20252B] transition-colors">
                  FORT JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/upsc" className="hover:text-[#20252B] transition-colors">
                  FORT UPSC CSE
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-[#20252B] transition-colors">
                  FORT Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/exams" className="hover:text-[#20252B] transition-colors">
                  Exam Discovery
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-[#20252B] transition-colors">
                  Subject Practice
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-[#20252B] transition-colors">
                  Previous Year Papers
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#20252B] transition-colors">
                  Transparent Pricing (₹10)
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#20252B] transition-colors">
                  Pedagogy & Method
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#20252B] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Legal & Policies
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#20252B] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#20252B] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#20252B] transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/payment-terms" className="hover:text-[#20252B] transition-colors">
                  Payment Terms
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#20252B] transition-colors">
                  Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact/grievance" className="hover:text-[#20252B] transition-colors">
                  Grievance Officer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="mt-12 border-t border-[#DCE2E6] pt-8">
          <p className="text-xs leading-relaxed text-[#66727D]">
            <strong className="text-[#20252B]">Statutory Disclaimer:</strong> FORT Learning is an
            independent academic preparation and examination practice technology platform. FORT
            Learning is not affiliated with, endorsed by, or connected to the National Testing
            Agency (NTA), the Union Public Service Commission (UPSC), the Indian Institutes of
            Technology (IITs), or any state/central university examination authority. Examination
            names and abbreviations belong to their respective statutory owners. FORT Learning
            does not guarantee examination ranks, admissions, or official scores.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#66727D]">
            <div>© {new Date().getFullYear()} FORT Learning. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/cookie-policy" className="hover:text-[#20252B]">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-[#20252B]">
                Accessibility
              </Link>
              <Link href="/copyright" className="hover:text-[#20252B]">
                Copyright
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
