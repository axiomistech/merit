import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#E6E5DE] bg-[#F0EFEA] text-[#73786E]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CAF88] text-white shadow-soft">
                <Shield className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-mono text-xl font-black tracking-wider text-[#263126]">FORT</span>
                <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-[#758B62]">
                  Learning
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#73786E]">
              Institutional digital learning and examination practice infrastructure built around
              concepts, questions, simulation engines, OMR accuracy, and continuous improvement.
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs text-[#92958D]">
              <span className="font-mono font-semibold text-[#263126]">FORTLEARNING.COM</span>
              <span>•</span>
              <span>Knowledge. Built Strong.</span>
            </div>
          </div>

          {/* Examinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#263126]">
              Examinations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/neet" className="hover:text-[#263126] transition-colors">
                  FORT NEET (UG)
                </Link>
              </li>
              <li>
                <Link href="/jee-main" className="hover:text-[#263126] transition-colors">
                  FORT JEE Main
                </Link>
              </li>
              <li>
                <Link href="/jee-advanced" className="hover:text-[#263126] transition-colors">
                  FORT JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/upsc" className="hover:text-[#263126] transition-colors">
                  FORT UPSC CSE
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-[#263126] transition-colors">
                  FORT Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#263126]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-[#263126] transition-colors">
                  How FORT Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#263126] transition-colors">
                  Platform Architecture
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#263126] transition-colors">
                  Transparent Pricing (₹10)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#263126] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#263126] transition-colors">
                  Help Desk & Tickets
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#263126] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#263126]">
              Legal & Policies
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#263126] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#263126] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#263126] transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/payment-terms" className="hover:text-[#263126] transition-colors">
                  Payment Terms
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#263126] transition-colors">
                  Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact/grievance" className="hover:text-[#263126] transition-colors">
                  Grievance Officer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="mt-12 border-t border-[#E6E5DE] pt-8">
          <p className="text-xs leading-relaxed text-[#92958D]">
            <strong className="text-[#73786E]">Statutory Disclaimer:</strong> FORT Learning is an
            independent academic preparation and examination practice technology platform. FORT
            Learning is not affiliated with, endorsed by, or connected to the National Testing
            Agency (NTA), the Union Public Service Commission (UPSC), the Indian Institutes of
            Technology (IITs), or any state/central university examination authority. Examination
            names and abbreviations belong to their respective statutory owners. FORT Learning
            does not guarantee examination ranks, admissions, or official scores.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#92958D]">
            <div>© {new Date().getFullYear()} FORT Learning. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/cookie-policy" className="hover:text-[#263126]">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-[#263126]">
                Accessibility
              </Link>
              <Link href="/copyright" className="hover:text-[#263126]">
                Copyright
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
