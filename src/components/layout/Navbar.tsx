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
    <nav className="sticky top-0 z-50 w-full bg-[#F7F5EF]/90 backdrop-blur-md border-b border-[#E6E5DE]">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo - Editorial Serif / Sans */}
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:opacity-95">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#9CAF88] text-white shadow-sm">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-serif text-xl font-bold tracking-tight text-[#263126]">FORT</span>
            <span className="ml-1 font-sans text-xs font-semibold uppercase tracking-widest text-[#758B62]">
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
              className="flex items-center gap-1 py-2 text-sm font-medium text-[#73786E] hover:text-[#263126] transition-colors"
            >
              <span>Examinations</span>
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200 text-[#92958D]', examsDropdownOpen && 'rotate-180')}
              />
            </button>

            {examsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-72 rounded-2xl border border-[#E6E5DE] bg-white p-2.5 shadow-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#92958D]">
                  Target Curricula
                </div>
                {EXAMINATIONS.map((exam) => (
                  <Link
                    key={exam.slug}
                    href={`/${exam.slug}`}
                    onClick={() => setExamsDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-xl p-2.5 hover:bg-[#F7F5EF] transition-colors"
                  >
                    <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#E9EEE3] text-xs font-bold text-[#758B62]">
                      {exam.shortName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#263126]">{exam.name}</div>
                      <div className="line-clamp-1 text-xs text-[#73786E]">{exam.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/how-it-works" className="text-sm font-medium text-[#73786E] hover:text-[#263126] transition-colors">
            How It Works
          </Link>
          <Link href="/neet/omr-practice" className="text-sm font-medium text-[#73786E] hover:text-[#263126] transition-colors">
            OMR Sheet
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[#73786E] hover:text-[#263126] transition-colors">
            Pricing (₹10)
          </Link>
          <Link href="/faq" className="text-sm font-medium text-[#73786E] hover:text-[#263126] transition-colors">
            FAQ
          </Link>
        </div>

        {/* Live Status indicator & Tomato Red CTA Button */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <div className="flex items-center gap-1.5 text-xs font-medium text-[#73786E]">
            <span className="h-2 w-2 rounded-full bg-[#E8412C] animate-pulse" />
            <span>Server Live</span>
          </div>

          <Link
            href="/login"
            className="text-xs font-semibold text-[#263126] hover:text-[#758B62] px-3 py-2 transition-colors"
          >
            Sign In
          </Link>

          {/* Primary CTA - Tomato Red Pill Button */}
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-full bg-[#E8412C] px-5 py-2 text-xs font-bold text-white hover:bg-[#d03521] shadow-md shadow-[#E8412C]/20 transition-all hover:translate-y-[-1px]"
          >
            <span>Start Free Mock</span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-xl p-2 text-[#73786E] hover:bg-[#E9EEE3] hover:text-[#263126] md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E6E5DE] bg-[#F7F5EF] px-4 py-5 md:hidden shadow-sm">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#92958D]">
              Target Examinations
            </div>
            <div className="grid grid-cols-1 gap-1">
              {EXAMINATIONS.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/${exam.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium text-[#2E332D] hover:bg-[#E9EEE3]"
                >
                  {exam.name}
                </Link>
              ))}
            </div>

            <div className="border-t border-[#E6E5DE] pt-3 space-y-2">
              <Link
                href="/how-it-works"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                How It Works
              </Link>
              <Link
                href="/neet/omr-practice"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                Physical OMR Grid
              </Link>
              <Link
                href="/pricing"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                Pricing (₹10)
              </Link>
              <Link
                href="/faq"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-xl px-3 py-2 text-sm font-medium text-[#2E332D] hover:bg-[#E9EEE3]"
              >
                FAQ
              </Link>
            </div>

            <div className="border-t border-[#E6E5DE] pt-4 flex flex-col gap-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl border border-[#E6E5DE] bg-white py-2.5 text-center text-xs font-semibold text-[#263126]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-full bg-[#E8412C] py-2.5 text-center text-xs font-bold text-white shadow-sm"
              >
                Start Free Mock
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
