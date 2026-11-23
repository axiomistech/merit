import React from 'react';
import Link from 'next/link';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export function Footer() {
  return (
    <footer
      className="relative z-10 border-t border-[rgba(20,26,17,0.10)] text-[#465047]"
      style={{
        background: 'linear-gradient(180deg, #F8FAF6 0%, #F5F7F5 50%, #EDF3F5 100%)',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 py-14 sm:py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center focus-visible:outline-none mb-1">
              <MeritwiseLogo variant="gold" size="xl" />
            </Link>

            <p className="text-sm font-bold text-[#141A11]">
              Practice with purpose. Progress with merit.
            </p>

            <p className="max-w-sm text-xs leading-relaxed text-[#465047]">
              A serious digital examination practice and assessment platform for competitive candidates preparing for NEET, JEE Main, JEE Advanced, and GATE.
            </p>
          </div>

          {/* Examinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#141A11]">
              Exams
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/neet" className="hover:text-[#141A11] transition-colors">
                  NEET (UG)
                </Link>
              </li>
              <li>
                <Link href="/jee-main" className="hover:text-[#141A11] transition-colors">
                  JEE Main
                </Link>
              </li>
              <li>
                <Link href="/jee-advanced" className="hover:text-[#141A11] transition-colors">
                  JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/gate" className="hover:text-[#141A11] transition-colors">
                  GATE
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#141A11]">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/how-it-works" className="hover:text-[#141A11] transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#141A11] transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-[#141A11] transition-colors">
                  Paper Access &amp; Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#141A11] transition-colors">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#141A11]">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs font-medium">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-[#141A11] transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-[#141A11] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-[#141A11] transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#141A11] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[rgba(20,26,17,0.10)] pt-8 text-xs text-[#52525B] sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} MERITWISE. All rights reserved.
          </div>
          <div className="flex items-center gap-6 text-[#52525B]">
            <span>Every attempt counts.</span>
            <span>Measure your progress.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
