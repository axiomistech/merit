'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Shield, ChevronDown, Menu, X } from 'lucide-react';
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
  const isPapersActive = pathname?.startsWith('/papers');

  return (
    <header className="glass-nav sticky top-0 z-50 w-full">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
        {/* Left: Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-3 transition-opacity duration-150 hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-lg"
          aria-label="FORT Learning Home"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-sm">
            <Shield className="h-5 w-5 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-mono text-xl font-bold tracking-tight text-[#20252B]">FORT</span>
            <span className="ml-1.5 font-sans text-xs font-semibold uppercase tracking-wider text-[#66727D]">
              Learning
            </span>
          </div>
        </Link>

        {/* Center: Primary Navigation (Desktop) */}
        <nav
          className="hidden md:flex md:items-center md:gap-9"
          aria-label="Primary Navigation"
        >
          {/* 1. Examinations Dropdown */}
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
                'flex items-center gap-1.5 py-2 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
                examsDropdownOpen || isExamActive
                  ? 'text-[#20252B] font-semibold'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              <span>Examinations</span>
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
                className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80 z-50 animate-in fade-in zoom-in-95 duration-150"
                role="menu"
                aria-label="Examinations menu"
              >
                {/* Invisible hover bridge to eliminate gap on diagonal pointer trajectory */}
                <div className="absolute -top-1 left-0 right-0 h-3" />

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
              'py-2 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
              isPracticeActive
                ? 'text-[#20252B] font-semibold'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Practice
          </Link>

          {/* 3. Past Papers */}
          <Link
            href="/papers"
            className={cn(
              'py-2 text-[15px] font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md',
              isPapersActive
                ? 'text-[#20252B] font-semibold'
                : 'text-[#66727D] hover:text-[#20252B]'
            )}
          >
            Past Papers
          </Link>
        </nav>

        {/* Right: Account & Action (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-7">
          {/* Sign In */}
          <Link
            href="/login"
            className="text-[15px] font-semibold text-[#20252B] hover:text-[#E4002B] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0] rounded-md"
          >
            Sign In
          </Link>

          {/* Start Practicing (Primary CTA) */}
          <Link
            href="/signup"
            className="glass-racing-red inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-bold text-white shadow-lg shadow-[#E4002B]/25 transition-all duration-150 hover:translate-y-[-1px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E4002B] focus-visible:ring-offset-2"
          >
            Start Practicing
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#20252B] hover:bg-[#E9EEF1] md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#9CC6E0]"
          aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-[#DCE2E6] bg-[#F1F3F4] px-6 py-6 md:hidden">
          <div className="space-y-4">
            {/* Examinations Expandable */}
            <div>
              <button
                type="button"
                onClick={() => setMobileExamsOpen((prev) => !prev)}
                className="flex w-full items-center justify-between py-2 text-base font-semibold text-[#20252B]"
              >
                <span>Examinations</span>
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
                        'block rounded-lg px-3 py-2 text-sm font-medium transition-colors',
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
            <div>
              <Link
                href="/practice"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-base font-medium transition-colors',
                  isPracticeActive
                    ? 'text-[#20252B] font-semibold'
                    : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Practice
              </Link>
            </div>

            {/* Past Papers */}
            <div>
              <Link
                href="/papers"
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  'block py-2 text-base font-medium transition-colors',
                  isPapersActive
                    ? 'text-[#20252B] font-semibold'
                    : 'text-[#66727D] hover:text-[#20252B]'
                )}
              >
                Past Papers
              </Link>
            </div>

            {/* Divider */}
            <div className="pt-4 border-t border-[#DCE2E6] flex flex-col gap-3">
              {/* Sign In */}
              <Link
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block text-center text-[15px] font-semibold text-[#20252B] py-2.5 transition-colors hover:text-[#E4002B]"
              >
                Sign In
              </Link>

              {/* Start Practicing */}
              <Link
                href="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex h-11 w-full items-center justify-center rounded-xl bg-[#E4002B] text-[15px] font-semibold text-white transition-colors hover:bg-[#C90026]"
              >
                Start Practicing
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
