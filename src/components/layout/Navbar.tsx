'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [examsDropdownOpen, setExamsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const router = useRouter();

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

  const closeDropdown = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setExamsDropdownOpen(false);
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    closeDropdown();
  }, [pathname]);

  // Hide public navbar on active exam execution screen to avoid distraction
  if (pathname?.startsWith('/exam/')) {
    return null;
  }

  const handleStartPractice = (e: React.MouseEvent) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      const session =
        localStorage.getItem('fort_student_session') || localStorage.getItem('merit_student_session');
      if (session) {
        router.push('/dashboard');
      } else {
        router.push('/login?redirect=/dashboard');
      }
    }
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
      {/* Floating Luminous Sage Glass Capsule (matching Section 3) */}
      <div
        className="relative flex h-[66px] sm:h-[72px] items-center justify-between px-5 sm:px-7 rounded-full transition-all"
        style={{
          background:
            'linear-gradient(140deg, rgba(234, 241, 245, 0.28) 0%, rgba(199, 211, 189, 0.86) 18%, rgba(156, 175, 136, 0.78) 50%, rgba(117, 137, 106, 0.72) 100%)',
          backdropFilter: 'blur(28px) saturate(112%)',
          WebkitBackdropFilter: 'blur(28px) saturate(112%)',
          border: '1px solid rgba(234, 241, 245, 0.50)',
          boxShadow: [
            '0 24px 50px -12px rgba(28, 40, 22, 0.22)',
            '0 10px 24px -8px rgba(28, 40, 22, 0.14)',
            'inset 0 1.5px 2px 0 rgba(245, 250, 253, 0.75)',
            'inset 1.5px 0 2px 0 rgba(220, 231, 237, 0.45)',
            'inset 0 -3px 6px 0 rgba(65, 82, 54, 0.35)',
            'inset 0 0 24px 0 rgba(199, 211, 189, 0.30)',
          ].join(', '),
        }}
      >
        {/* Specular Edge Highlight Reflection along upper-left rim */}
        <div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background:
              'radial-gradient(ellipse 65% 50% at 20% 0%, rgba(245, 250, 253, 0.45) 0%, transparent 60%)',
          }}
        />

        {/* 1. Left: Brand Identity (Gold Icon + Dark Forest Charcoal Wordmark + Gold Dot) */}
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
              <span className="font-sans font-black text-xs sm:text-sm tracking-[0.14em] text-[#151A15] uppercase">
                MERITWISE
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B] shrink-0" />
            </div>
          </Link>
        </div>

        {/* Center / Left Divider */}
        <div className="hidden md:block h-6 w-px bg-[#75896A]/25" />

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
                'flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider transition-colors py-2',
                examsDropdownOpen ? 'text-[#151A15]' : 'text-[#455044] hover:text-[#151A15]'
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
                  className="rounded-2xl p-2 text-[#151A15] shadow-2xl"
                  style={{
                    background:
                      'linear-gradient(140deg, rgba(234, 241, 245, 0.96) 0%, rgba(205, 218, 196, 0.96) 50%, rgba(175, 192, 162, 0.96) 100%)',
                    backdropFilter: 'blur(24px)',
                    WebkitBackdropFilter: 'blur(24px)',
                    border: '1px solid rgba(234, 241, 245, 0.60)',
                    boxShadow:
                      '0 20px 45px -8px rgba(28, 40, 22, 0.28), inset 0 1px 2px rgba(255, 255, 255, 0.6)',
                  }}
                >
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#455044] border-b border-[#75896A]/25 mb-1">
                    Primary Curricula
                  </div>
                  <div className="space-y-0.5">
                    {examCategories.map((exam) => (
                      <Link
                        key={exam.slug}
                        href={`/${exam.slug}`}
                        onClick={closeDropdown}
                        className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-white/50"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#151A15] group-hover:text-[#8C6D3B] transition-colors">
                            {exam.name}
                          </span>
                          <span className="text-[10px] text-[#455044] font-mono">↗</span>
                        </div>
                        <span className="text-[11px] font-medium text-[#455044] line-clamp-1">
                          {exam.fullName}
                        </span>
                        <span className="text-[10px] text-[#455044]/80 line-clamp-1 mt-0.5">
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
            className="text-xs font-bold uppercase tracking-wider text-[#455044] hover:text-[#151A15] transition-colors py-2"
          >
            How it works
          </Link>
        </nav>

        {/* Center / Right Divider */}
        <div className="hidden md:block h-6 w-px bg-[#75896A]/25" />

        {/* 3. Right: Sign In & Solid Dark START PRACTICE Pill Button */}
        <div className="hidden md:flex md:items-center md:gap-5 relative z-10">
          <Link
            href="/login"
            className="text-xs font-bold uppercase tracking-wider text-[#455044] hover:text-[#151A15] transition-colors px-2 py-1.5"
          >
            Sign in
          </Link>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-[#151A15] px-5 sm:px-6 py-2.5 text-xs font-extrabold uppercase tracking-wider text-white shadow-md transition-all hover:bg-[#232923] hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Practice
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden relative z-10">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-full p-2 text-[#151A15] hover:bg-white/40"
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
              'linear-gradient(140deg, rgba(234, 241, 245, 0.96) 0%, rgba(205, 218, 196, 0.96) 50%, rgba(175, 192, 162, 0.96) 100%)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(234, 241, 245, 0.60)',
            boxShadow: '0 20px 45px -8px rgba(28, 40, 22, 0.28)',
          }}
        >
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#455044]">
              Examinations
            </div>
            {examCategories.map((exam) => (
              <Link
                key={exam.slug}
                href={`/${exam.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-xl px-3 py-2 text-xs font-semibold text-[#151A15] hover:bg-white/50"
              >
                <span>{exam.name} — {exam.fullName}</span>
                <span className="text-xs text-[#455044]">↗</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#75896A]/25 pt-3 space-y-3">
            <Link
              href="/how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#455044] hover:text-[#151A15]"
            >
              How it works
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-xl px-3 py-2 text-xs font-semibold text-[#455044] hover:text-[#151A15]"
            >
              Sign in
            </Link>

            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleStartPractice(e);
              }}
              className="w-full rounded-full bg-[#151A15] py-3 text-center text-xs font-extrabold uppercase tracking-wider text-white shadow-md hover:bg-[#232923]"
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
