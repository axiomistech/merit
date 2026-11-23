import React from 'react';
import Link from 'next/link';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#0E0F11] text-[#B8B8BC]">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="inline-flex items-center focus-visible:outline-none mb-1">
              <MeritwiseLogo variant="gold" size="xl" wordmarkClassName="!text-white" />
            </Link>

            <p className="text-sm font-semibold text-white">
              Practice with purpose. Progress with merit.
            </p>

            <p className="max-w-sm text-xs leading-relaxed text-[#B8B8BC]">
              A serious digital examination practice and assessment platform for competitive candidates preparing for NEET, JEE Main, JEE Advanced, and GATE.
            </p>
          </div>

          {/* Examinations */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Exams
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/neet" className="hover:text-white transition-colors">
                  NEET (UG)
                </Link>
              </li>
              <li>
                <Link href="/jee-main" className="hover:text-white transition-colors">
                  JEE Main
                </Link>
              </li>
              <li>
                <Link href="/jee-advanced" className="hover:text-white transition-colors">
                  JEE Advanced
                </Link>
              </li>
              <li>
                <Link href="/gate" className="hover:text-white transition-colors">
                  GATE
                </Link>
              </li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Platform
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/#how-it-works" className="hover:text-white transition-colors">
                  How it works
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white transition-colors">
                  Paper Access & Pricing
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-white transition-colors">
                  Sign in
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Contact */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Legal
            </h4>
            <ul className="mt-4 space-y-2.5 text-xs">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/refund-policy" className="hover:text-white transition-colors">
                  Refund Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-[#71717A] sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} MERITWISE. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Every attempt counts.</span>
            <span>Measure your progress.</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
