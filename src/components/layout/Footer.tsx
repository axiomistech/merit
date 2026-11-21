import React from 'react';
import Link from 'next/link';
import { Shield, Sparkles, BookOpen, Lock, HelpCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#263554] bg-[#0B1020] text-[#A7B0C0]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
                <Shield className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div>
                <span className="font-mono text-xl font-black tracking-wider text-[#F5F7FB]">FORT</span>
                <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-[#6486C6]">
                  Learning
                </span>
              </div>
            </Link>

            <p className="mt-4 max-w-md text-sm leading-relaxed text-[#A7B0C0]">
              Institutional digital learning and examination practice infrastructure built around
              concepts, questions, simulation engines, OMR accuracy, and evidence-driven performance analysis.
            </p>

            <div className="mt-5 flex items-center gap-3 text-xs text-[#7C8799]">
              <span className="font-mono text-[#F5F7FB]">FORTLEARNING.COM</span>
              <span>•</span>
              <span>Knowledge. Built Strong.</span>
            </div>
          </div>

          {/* Examinations */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FB]">
              Examinations
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/neet" className="hover:text-[#F5F7FB] transition-colors">
                  FORT NEET (UG)
                </Link>
              </li>
              <li>
                <Link href="/jee-main" className="hover:text-[#F5F7FB] transition-colors">
                  FORT JEE Main
                </Link>
              </li>
              <li>
                <Link href="/jee-advanced" className="hover:text-[#F5F7FB] transition-colors">
                  FORT JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/upsc" className="hover:text-[#F5F7FB] transition-colors">
                  FORT UPSC CSE
                </Link>
              </li>
              <li>
                <Link href="/engineering" className="hover:text-[#F5F7FB] transition-colors">
                  FORT Engineering
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform & Solutions */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FB]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/how-it-works" className="hover:text-[#F5F7FB] transition-colors">
                  How FORT Works
                </Link>
              </li>
              <li>
                <Link href="/features" className="hover:text-[#F5F7FB] transition-colors">
                  Product Architecture
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#F5F7FB] transition-colors">
                  Transparent Pricing (₹10)
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-[#F5F7FB] transition-colors">
                  Frequently Asked Questions
                </Link>
              </li>
              <li>
                <Link href="/support" className="hover:text-[#F5F7FB] transition-colors">
                  Help & Support Desk
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F5F7FB] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F7FB]">
              Legal & Policies
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link href="/privacy-policy" className="hover:text-[#F5F7FB] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#F5F7FB] transition-colors">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#F5F7FB] transition-colors">
                  Refund & Cancellation
                </Link>
              </li>
              <li>
                <Link href="/payment-terms" className="hover:text-[#F5F7FB] transition-colors">
                  Payment Terms
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-[#F5F7FB] transition-colors">
                  Non-Affiliation Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/contact/grievance" className="hover:text-[#F5F7FB] transition-colors">
                  Grievance Officer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="mt-12 border-t border-[#263554] pt-8">
          <p className="text-xs leading-relaxed text-[#7C8799]">
            <strong className="text-[#A7B0C0]">Statutory Disclaimer:</strong> FORT Learning is an
            independent academic preparation and examination practice technology platform. FORT
            Learning is not affiliated with, endorsed by, or connected to the National Testing
            Agency (NTA), the Union Public Service Commission (UPSC), the Indian Institutes of
            Technology (IITs), or any state/central university examination authority. Examination
            names, trademarks, and logos belong to their respective statutory owners. FORT Learning
            does not guarantee examination ranks, admissions, or official scores.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-[#7C8799]">
            <div>© {new Date().getFullYear()} FORT Learning. All rights reserved.</div>
            <div className="flex items-center gap-4">
              <Link href="/cookie-policy" className="hover:text-[#A7B0C0]">
                Cookie Policy
              </Link>
              <Link href="/accessibility" className="hover:text-[#A7B0C0]">
                Accessibility
              </Link>
              <Link href="/copyright" className="hover:text-[#A7B0C0]">
                Copyright
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
