import React from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#DCE2E6]/80 bg-[#F1F3F4] text-[#66727D]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
                <Shield className="h-5 w-5 stroke-[2.5]" />
              </div>
              <div className="flex items-baseline">
                <span className="font-mono text-xl font-black tracking-tight text-[#20252B]">FORT</span>
                <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-[#66727D]">
                  Learning
                </span>
              </div>
            </Link>

            <p className="text-sm font-semibold text-[#20252B] tracking-tight">
              Practice. Understand. Improve.
            </p>

            <p className="max-w-md text-xs leading-relaxed text-[#66727D]">
              Institutional digital learning and examination practice infrastructure built around
              authentic question papers, timed simulation engines, and clear diagnostic insights.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/exams" className="hover:text-[#20252B] transition-colors">
                  Exams
                </Link>
              </li>
              <li>
                <Link href="/practice" className="hover:text-[#20252B] transition-colors">
                  Practice
                </Link>
              </li>
              <li>
                <Link href="/dashboard/leaderboard" className="hover:text-[#20252B] transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/papers" className="hover:text-[#20252B] transition-colors">
                  Question Papers
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Account
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/login" className="hover:text-[#20252B] transition-colors">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href="/signup" className="hover:text-[#20252B] transition-colors">
                  Register
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-[#20252B] transition-colors">
                  Candidate Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#20252B]">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
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
                <Link href="/contact" className="hover:text-[#20252B] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Regulatory Disclaimer & Copyright Bar */}
        <div className="mt-12 border-t border-[#DCE2E6]/80 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#66727D]">
          <div>© {new Date().getFullYear()} FORT Learning. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-[#20252B]">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="hover:text-[#20252B]">
              Terms
            </Link>
            <Link href="/contact" className="hover:text-[#20252B]">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
