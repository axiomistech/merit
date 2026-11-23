'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();

  // Do not render floating marketing header in student portal/dashboard, admin portal, or active exam sessions
  if (
    pathname &&
    (pathname.startsWith('/dashboard') ||
      pathname.startsWith('/admin') ||
      pathname.startsWith('/attempt') ||
      pathname.startsWith('/exam') ||
      pathname.startsWith('/review'))
  ) {
    return null;
  }
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setExamsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setExamsDropdownOpen(false);
    }, 150);
  };

  const closeDropdown = () => {
    setExamsDropdownOpen(false);
  };

  const handleStartPractice = (e: React.MouseEvent) => {
    e.preventDefault();
    router.push('/register');
  };

  const examCategories = [
    {
      slug: 'neet',
      name: 'NEET (UG)',
      fullName: 'National Eligibility cum Entrance Test',
      detail: 'Physics, Chemistry, Botany, Zoology • 720 Marks',
    },
    {
      slug: 'jee-main',
      name: 'JEE Main',
      fullName: 'Joint Entrance Examination Main',
      detail: 'Physics, Chemistry, Mathematics • 300 Marks',
    },
    {
      slug: 'jee-advanced',
      name: 'JEE Advanced',
      fullName: 'Joint Entrance Examination Advanced',
      detail: 'Physics, Chemistry, Mathematics • Multi-select & Numerical',
    },
    {
      slug: 'gate',
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      detail: 'CS, ME, EE, EC, CE & Data Science • 100 Marks',
    },
  ];

  return (
    <header className="fixed top-4 sm:top-5 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-1.75rem)] sm:w-[calc(100%-3rem)] max-w-5xl transition-all">
      {/* Floating Matte Forged-White + Glacier-White Glassmorphism Capsule */}
      <div
        className="relative flex h-[66px] sm:h-[72px] items-center justify-between px-5 sm:px-7 rounded-full transition-all"
        style={{
          background:
            'linear-gradient(115deg, rgba(255, 255, 255, 0.88) 0%, rgba(247, 249, 248, 0.80) 42%, rgba(212, 230, 236, 0.68) 100%)',
          backdropFilter: 'blur(28px) saturate(125%)',
          WebkitBackdropFilter: 'blur(28px) saturate(125%)',
          border: '1px solid rgba(255, 255, 255, 0.75)',
          boxShadow: [
            '0 10px 32px rgba(20, 26, 17, 0.10)',
            'inset 0 1px 1px rgba(255, 255, 255, 0.90)',
            'inset 0 -1px 1px rgba(130, 165, 180, 0.12)',
          ].join(', '),
        }}
      >
        {/* Fine imperceptible micro-grain texture overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-full opacity-[0.02] mix-blend-multiply overflow-hidden"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Thin, soft white upper-edge liquid-glass reflection */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse 70% 45% at 28% 0%, rgba(255, 255, 255, 0.75) 0%, transparent 70%)',
          }}
        />

        {/* 1. Left: Brand Identity (Gold Icon + Deep Charcoal Wordmark + Gold Dot) */}
        <div className="flex items-center gap-4 sm:gap-6 relative z-10">
          <Link
            href="/"
            className="group flex items-center gap-2.5 focus-visible:outline-none select-none"
            aria-label="MERITWISE Home"
          >
            <Image
              src="/brand/logo-gold.png"
              alt="MERITWISE"
              width={34}
              height={22}
              priority
              className="h-[20px] sm:h-[22px] w-auto object-contain shrink-0"
            />
            <div className="flex items-center gap-2">
              <span className="font-sans font-black text-xs sm:text-sm tracking-[0.14em] text-[#141A11] uppercase">
                MERITWISE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#C6A052] shrink-0" />
            </div>
          </Link>
        </div>

        {/* Center / Left Divider */}
        <div className="hidden md:block h-6 w-px bg-[rgba(20,26,17,0.14)]" />

        {/* 2. Center: Primary Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-7 relative z-10" aria-label="Primary Navigation">
          {/* Exams Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              type="button"
              onClick={() => setExamsDropdownOpen((prev) => !prev)}
              aria-expanded={examsDropdownOpen}
              className={cn(
                'flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider transition-colors py-2',
                examsDropdownOpen ? 'text-[#141A11]' : 'text-[#141A11]/75 hover:text-[#141A11]'
              )}
            >
              <span>Exams</span>
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200', examsDropdownOpen && 'rotate-180')}
              />
            </button>

            {examsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div
                  className="rounded-2xl p-2 text-[#141A11] shadow-2xl"
                  style={{
                    background:
                      'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 249, 248, 0.94) 45%, rgba(212, 230, 236, 0.90) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(255, 255, 255, 0.85)',
                    boxShadow:
                      '0 20px 45px -8px rgba(20, 26, 17, 0.12), inset 0 1px 2px rgba(255, 255, 255, 0.9)',
                  }}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#465047] border-b border-[#141A11]/10 mb-1">
                    Primary Curricula
                  </div>
                  <div className="space-y-0.5">
                    {examCategories.map((exam) => (
                      <Link
                        key={exam.slug}
                        href={`/${exam.slug}`}
                        onClick={closeDropdown}
                        className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-[#D4E6EC]/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#141A11] group-hover:text-black transition-colors">
                            {exam.name}
                          </span>
                          <span className="text-[10px] text-[#465047] font-mono">↗</span>
                        </div>
                        <span className="text-[11px] font-medium text-[#465047] line-clamp-1">
                          {exam.fullName}
                        </span>
                        <span className="text-[10px] text-[#64748B] line-clamp-1 mt-0.5">
                          {exam.detail}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* How It Works Link */}
          <Link
            href="/how-it-works"
            className="text-xs font-semibold uppercase tracking-wider text-[#141A11]/75 hover:text-[#141A11] transition-colors py-2"
          >
            How it works
          </Link>
        </nav>

        {/* Center / Right Divider */}
        <div className="hidden md:block h-6 w-px bg-[rgba(20,26,17,0.14)]" />

        {/* 3. Right: Sign In & Solid Dark START PRACTICE Pill Button */}
        <div className="hidden md:flex md:items-center md:gap-5 relative z-10">
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-[#141A11]/75 hover:text-[#141A11] transition-colors px-2 py-1.5"
          >
            Sign in
          </Link>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-[#141A11] px-5 sm:px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all duration-200 hover:bg-[#232923] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Practice
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden relative z-10">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-[#141A11] hover:bg-[#D4E6EC]/40"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="mt-2 rounded-3xl p-5 shadow-2xl md:hidden animate-in fade-in duration-150 space-y-4"
          style={{
            background:
              'linear-gradient(145deg, rgba(255, 255, 255, 0.96) 0%, rgba(247, 249, 248, 0.94) 45%, rgba(212, 230, 236, 0.92) 100%)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.85)',
            boxShadow: '0 20px 45px -8px rgba(20, 26, 17, 0.12)',
          }}
        >
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#465047]">
              Examinations
            </div>
            {examCategories.map((exam) => (
              <Link
                key={exam.slug}
                href={`/${exam.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#141A11] hover:bg-[#D4E6EC]/45"
              >
                <span>{exam.name} — {exam.fullName}</span>
                <span className="text-xs text-[#465047]">↗</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#141A11]/10 pt-3 space-y-3">
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#141A11]/80 hover:text-[#141A11]"
            >
              How it works
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#141A11]/80 hover:text-[#141A11]"
            >
              Sign in
            </Link>

            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleStartPractice(e);
              }}
              className="w-full rounded-full bg-[#141A11] py-3 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-[#232923]"
            >
              Start Practice
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;
