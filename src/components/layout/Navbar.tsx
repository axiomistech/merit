'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  ChevronDown,
  Menu,
  X,
  GraduationCap,
  Sparkles,
  BookOpen,
  ArrowRight,
  Layers,
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
    <nav className="sticky top-0 z-50 w-full border-b border-[#263554] bg-[#0B1020]/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 transition-transform hover:scale-[1.02]">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020] shadow-sm shadow-[#6486C6]/20">
            <Shield className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-lg font-black tracking-wider text-[#F5F7FB]">FORT</span>
            <span className="ml-1 text-xs font-semibold uppercase tracking-widest text-[#6486C6]">
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
              className="flex items-center gap-1.5 py-2 text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors"
            >
              <span>Examinations</span>
              <ChevronDown
                className={cn('h-4 w-4 transition-transform duration-200', examsDropdownOpen && 'rotate-180')}
              />
            </button>

            {examsDropdownOpen && (
              <div className="absolute left-0 mt-1 w-72 rounded-xl border border-[#263554] bg-[#11182A] p-2 shadow-2xl backdrop-blur-xl animate-in fade-in zoom-in-95 duration-150">
                <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#7C8799]">
                  Select Target Examination
                </div>
                {EXAMINATIONS.map((exam) => (
                  <Link
                    key={exam.slug}
                    href={`/${exam.slug}`}
                    onClick={() => setExamsDropdownOpen(false)}
                    className="flex items-start gap-3 rounded-lg p-2.5 hover:bg-[#1D2940] transition-colors"
                  >
                    <div
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold"
                      style={{ backgroundColor: `${exam.accentColor}20`, color: exam.accentColor }}
                    >
                      {exam.shortName.slice(0, 2)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-[#F5F7FB]">{exam.name}</div>
                      <div className="line-clamp-1 text-xs text-[#A7B0C0]">{exam.tagline}</div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/how-it-works" className="text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors">
            How It Works
          </Link>
          <Link href="/features" className="text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors">
            Features
          </Link>
          <Link href="/pricing" className="text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors">
            Pricing
          </Link>
          <Link href="/faq" className="text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors">
            FAQ
          </Link>
          <Link href="/blog" className="text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB] transition-colors">
            Insights
          </Link>
        </div>

        {/* CTA & Auth Buttons */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="/login"
            className="rounded-lg px-3.5 py-1.5 text-sm font-medium text-[#F5F7FB] hover:bg-[#172033] transition-colors"
          >
            Sign In
          </Link>
          <Link
            href="/signup"
            className="flex items-center gap-1.5 rounded-lg bg-[#6486C6] px-4 py-2 text-sm font-semibold text-[#0B1020] hover:bg-[#7b9bd7] transition-all shadow-sm shadow-[#6486C6]/20"
          >
            <span>Start Practising</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="rounded-lg p-2 text-[#A7B0C0] hover:bg-[#172033] hover:text-[#F5F7FB] md:hidden"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#263554] bg-[#11182A] px-4 py-5 md:hidden">
          <div className="space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#7C8799]">
              Target Examinations
            </div>
            <div className="grid grid-cols-1 gap-1">
              {EXAMINATIONS.map((exam) => (
                <Link
                  key={exam.slug}
                  href={`/${exam.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-[#F5F7FB] hover:bg-[#1D2940]"
                >
                  {exam.name}
                </Link>
              ))}
            </div>

            <div className="my-2 border-t border-[#263554]" />

            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB]"
            >
              How It Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB]"
            >
              Pricing
            </Link>
            <Link
              href="/faq"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-[#A7B0C0] hover:text-[#F5F7FB]"
            >
              FAQ
            </Link>

            <div className="mt-4 flex flex-col gap-2 pt-2">
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-lg border border-[#263554] bg-[#172033] py-2.5 text-center text-sm font-semibold text-[#F5F7FB]"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full rounded-lg bg-[#6486C6] py-2.5 text-center text-sm font-semibold text-[#0B1020]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
