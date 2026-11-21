'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { EXAMINATIONS } from '@/data/seedData';
import { cn } from '@/lib/utils';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const [mobileExamsOpen, setMobileExamsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExamsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setExamsDropdownOpen(false);
    }, 150);
  };

  const handleToggleClick = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExamsDropdownOpen((prev) => !prev);
  };

  const closeDropdownImmediately = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExamsDropdownOpen(false);
  };

  const handleBlur = (e: React.FocusEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.relatedTarget as Node)) {
      closeDropdownImmediately();
    }
  };

  // Close dropdown on click outside or escape key
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdownImmediately();
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closeDropdownImmediately();
        setMobileMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    closeDropdownImmediately();
    setMobileExamsOpen(false);
  }, [pathname]);

  // Hide public navbar on active exam execution screen to avoid distraction
  if (pathname?.startsWith('/exam/')) {
    return null;
  }

  const isExamActive = EXAMINATIONS.some((exam) => pathname === `/${exam.slug}`);
  const isPracticeActive = pathname?.startsWith('/practice');

  return (
    <header className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <div className="pointer-events-auto relative flex h-14 w-full max-w-[1120px] items-center justify-between rounded-full border border-white/70 bg-[#F1F3F4]/85 px-4 sm:px-6 backdrop-blur-md shadow-[0_8px_32px_rgba(32,37,43,0.06)] transition-all">
        {/* Left: Minimal geometric F + FORT brand mark */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-full"
          aria-label="FORT Learning Home"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#9CC6E0]/40 border border-white/70 text-[#20252B] shadow-xs transition-transform group-hover:scale-105">
            <span className="font-mono text-sm font-black text-[#20252B]">F</span>
          </div>
          <div className="flex items-baseline">
            <span className="font-mono text-base font-extrabold tracking-tight text-[#20252B]">FORT</span>
            <span className="ml-1 font-sans text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">
              Learning
            </span>
          </div>
        </Link>

        {/* Center: Primary Navigation (Strictly 3 Links) */}
        <nav
          className="hidden md:flex md:items-center md:gap-8"
          aria-label="Primary Navigation"
        >
          {/* 1. Exams Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onBlur={handleBlur}
          >
            <button
              type="button"
              onClick={handleToggleClick}
              aria-expanded={examsDropdownOpen}
              aria-haspopup="true"
              className={cn(
                'flex items-center gap-1.5 py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
                examsDropdownOpen || isExamActive
                  ? 'text-[#20252B] font-semibold'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              <span>Exams</span>
              <ChevronDown
                className={cn(
                  'h-3.5 w-3.5 transition-transform duration-200 text-[#66727D]',
                  examsDropdownOpen && 'rotate-180 text-[#20252B]'
                )}
                aria-hidden="true"
              />
            </button>

            {examsDropdownOpen && (
              <div
                className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label="Examinations menu"
              >
                {/* Invisible hover bridge to eliminate gap on diagonal pointer trajectory */}
                <div className="absolute -top-1 left-0 right-0 h-4" />

                <div className="glass-polar rounded-[28px] p-2.5 shadow-2xl backdrop-blur-2xl">
                  <div className="px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#66727D]">
                    Target Curricula
                  </div>
                  <div className="space-y-1">
                    {EXAMINATIONS.map((exam) => {
                      const isActive = pathname === `/${exam.slug}`;
                      return (
                        <Link
                          key={exam.slug}
                          href={`/${exam.slug}`}
                          onClick={closeDropdownImmediately}
                          role="menuitem"
                          className={cn(
                            'flex items-start gap-3 rounded-xl p-2.5 transition-colors duration-150',
                            isActive
                              ? 'bg-[#E9EEF1] text-[#20252B]'
                              : 'hover:bg-[#F1F3F4] text-[#20252B]'
                          )}
                        >
                          <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[#9CC6E0]/30 text-xs font-bold text-[#20252B]">
                            {exam.shortName.slice(0, 2)}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="text-sm font-semibold text-[#20252B] truncate">
                              {exam.name}
                            </div>
                            <div className="line-clamp-1 text-xs text-[#66727D]">
                              {exam.tagline}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. Practice */}
          <Link
            href="/practice"
            className={cn(
              'py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
              isPracticeActive
                ? 'text-[#20252B] font-semibold'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Practice
          </Link>

          {/* 3. Leaderboard */}
          <Link
            href="/dashboard/leaderboard"
            className={cn(
              'py-1.5 text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
              pathname === '/dashboard/leaderboard'
                ? 'text-[#20252B] font-semibold'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Leaderboard
          </Link>
        </nav>

        {/* Right Action: Clean text/ghost button Sign in ↗ */}
        <div className="hidden md:flex md:items-center">
          <Link
            href="/login"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-full px-3.5 py-1.5 hover:bg-white/60"
          >
            <span>Sign in</span>
            <span className="font-mono text-xs transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-9 w-9 items-center justify-center rounded-full text-[#20252B] hover:bg-white/60 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0]"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Mobile Dropdown Panel */}
        {mobileMenuOpen && (
          <div className="absolute top-[calc(100%+8px)] left-0 right-0 rounded-3xl border border-white/70 bg-[#F1F3F4]/95 p-5 shadow-2xl backdrop-blur-2xl md:hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="space-y-3">
              {/* Examinations Accordion */}
              <div>
                <button
                  type="button"
                  onClick={() => setMobileExamsOpen((prev) => !prev)}
                  className="flex w-full items-center justify-between py-2 text-sm font-semibold text-[#20252B]"
                >
                  <span>Exams</span>
                  <ChevronDown
                    className={cn(
                      'h-4 w-4 text-[#66727D] transition-transform duration-200',
                      mobileExamsOpen && 'rotate-180 text-[#20252B]'
                    )}
                  />
                </button>
                {mobileExamsOpen && (
                  <div className="mt-2 space-y-1 pl-3 border-l-2 border-[#DCE2E6]">
                    {EXAMINATIONS.map((exam) => (
                      <Link
                        key={exam.slug}
                        href={`/${exam.slug}`}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'block rounded-lg px-3 py-1.5 text-xs font-medium transition-colors',
                          pathname === `/${exam.slug}`
                            ? 'bg-[#E9EEF1] text-[#20252B] font-semibold'
                            : 'text-[#66727D] hover:text-[#20252B]'
                        )}
                      >
                        {exam.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Practice */}
              <Link
                href="/practice"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  isPracticeActive ? 'text-[#20252B] font-semibold' : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Practice
              </Link>

              {/* Leaderboard */}
              <Link
                href="/dashboard/leaderboard"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-sm font-medium transition-colors',
                  pathname === '/dashboard/leaderboard'
                    ? 'text-[#20252B] font-semibold'
                    : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Leaderboard
              </Link>

              {/* Sign In */}
              <div className="pt-3 border-t border-[#DCE2E6]/80">
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between rounded-xl bg-white/70 px-4 py-2 text-sm font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors"
                >
                  <span>Sign in</span>
                  <span className="font-mono text-xs">↗</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
