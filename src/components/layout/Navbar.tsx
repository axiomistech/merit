'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  ChevronDown,
  Menu,
  X,
  ArrowRight,
} from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar on active exam execution screen to avoid distraction
  if (pathname?.startsWith('/exam/')) {
    return null;
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#F1F3F4]/90 backdrop-blur-md border-b border-[#DCE2E6]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:opacity-95">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-mono text-xl font-bold tracking-tight text-[#20252B]">FORT</span>
            <span className="ml-1 font-sans text-xs font-semibold uppercase tracking-widest text-[#66727D]">
              Learning
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex md:items-center md:gap-7">
          {/* Examinations Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setExamsDropdownOpen(true)}
            onMouseLeave={() => setExamsDropdownOpen(false)}
          >
            <button
              type="button"
              className="flex items-center gap-1 py-2 text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors"
            >
              <span>Examinations</span>
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200 text-[#66727D]', examsDropdownOpen && 'rotate-180')}
              />
            </button>

            {examsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-72 rounded-2xl border border-[#DCE2E6] bg-white p-2.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">
                  Target Curricula
                </div>
                {EXAMINATIONS.map((exam) => (
                  <Link
                    key={exam.slug}
                    href={`/${exam.slug}`}
                    onClick={() => setExamsDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[#F1F3F4] transition-colors"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#9CC6E0]/20 text-xs font-bold text-[#20252B]">
                      {exam.shortName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#20252B]">{exam.name}</div>
                      <div className="line-clamp-1 text-xs text-[#66727D]">{exam.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/exams" className="text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors">
            Catalog
          </Link>
          <Link href="/practice" className="text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors">
            Practice
          </Link>
          <Link href="/papers" className="text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors">
            Past Papers
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors">
            Pricing (₹10)
          </Link>
          <Link href="/about" className="text-sm font-medium text-[#66727D] hover:text-[#20252B] transition-colors">
            Pedagogy
          </Link>
        </div>

        {/* Live Status indicator & Racing Red CTA Button */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#66727D]">
            <span className="h-2 w-2 rounded-full bg-[#27835A] animate-pulse" />
            <span>Platform Live</span>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-[#20252B] hover:text-[#E4002B] px-3 py-2 transition-colors"
          >
            Sign In
          </Link>

          {/* Primary CTA - Racing Red Button */}
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-xl bg-[#E4002B] px-5 py-2 text-xs font-bold text-white hover:bg-[#C90026] shadow-sm shadow-[#E4002B]/20 transition-all hover:translate-y-[-1px]"
          >
            <span>Start Practicing</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-[#66727D] hover:bg-[#E9EEF1] hover:text-[#20252B] md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#DCE2E6] bg-[#F1F3F4] px-4 py-5 md:hidden shadow-sm">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#66727D]">
              Target Examinations
            </div>
            <div className="grid grid-cols-1 gap-1">
              {EXAMINATIONS.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/${exam.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#20252B] hover:bg-[#9CC6E0]/20"
                >
                  {exam.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#DCE2E6] pt-3 space-y-2">
              <Link
                href="/exams"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#20252B] hover:bg-[#9CC6E0]/20"
              >
                All Examinations
              </Link>
              <Link
                href="/practice"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#20252B] hover:bg-[#9CC6E0]/20"
              >
                Subject Practice
              </Link>
              <Link
                href="/papers"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#20252B] hover:bg-[#9CC6E0]/20"
              >
                Previous Year Papers
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#20252B] hover:bg-[#9CC6E0]/20"
              >
                Pricing (₹10)
              </Link>
            </div>

            <div className="border-t border-[#DCE2E6] pt-4 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-[#DCE2E6] bg-white py-2.5 text-center text-xs font-semibold text-[#20252B]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl bg-[#E4002B] py-2.5 text-center text-xs font-bold text-white shadow-sm"
              >
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
