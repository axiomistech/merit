'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronDown, Menu, X, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

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
      const session = localStorage.getItem('fort_student_session') || localStorage.getItem('merit_student_session');
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
      name: 'NEET',
      fullName: 'National Eligibility cum Entrance Test',
      detail: 'Physics, Chemistry, Botany, Zoology • 720 Marks',
    },
    {
      slug: 'jee',
      name: 'JEE',
      fullName: 'Joint Entrance Examination',
      detail: 'Main & Advanced • Physics, Chemistry, Mathematics',
    },
    {
      slug: 'upsc',
      name: 'UPSC',
      fullName: 'Civil Services Examination',
      detail: 'Prelims General Studies (Paper I) & CSAT (Paper II)',
    },
    {
      slug: 'gate',
      name: 'GATE',
      fullName: 'Graduate Aptitude Test in Engineering',
      detail: 'CS, ME, EE, EC, CE & Data Science',
    },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E4E4DF] bg-[#FBFBFA]/90 backdrop-blur-md transition-all">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left: Brand Identity (Golden Logo on Light Background) */}
        <Link
          href="/"
          className="group flex items-center focus-visible:outline-none"
          aria-label="MERITWISE Home"
        >
          <MeritwiseLogo variant="gold" size="md" priority />
        </Link>

        {/* Center: Simplified Primary Navigation */}
        <nav className="hidden md:flex md:items-center md:gap-8" aria-label="Primary Navigation">
          {/* 1. Exams Dropdown */}
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
                'flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors py-2',
                examsDropdownOpen ? 'text-[#121316]' : 'text-[#52525B] hover:text-[#121316]'
              )}
            >
              <span>Exams</span>
              <ChevronDown
                className={cn('h-3.5 w-3.5 transition-transform duration-200', examsDropdownOpen && 'rotate-180')}
              />
            </button>

            {examsDropdownOpen && (
              <div className="absolute left-1/2 -translate-x-1/2 top-full pt-2 w-80 z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="rounded-2xl border border-[#E4E4DF] bg-[#FFFFFF] p-2 shadow-xl">
                  <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[#71717A] border-b border-[#F4F4F0] mb-1">
                    Primary Curricula
                  </div>
                  <div className="space-y-0.5">
                    {examCategories.map((exam) => (
                      <Link
                        key={exam.slug}
                        href={`/${exam.slug}`}
                        onClick={closeDropdown}
                        className="group flex flex-col rounded-xl p-2.5 transition-colors hover:bg-[#F7F7F4]"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[#121316] group-hover:text-[#8C6D3B] transition-colors">
                            {exam.name}
                          </span>
                          <span className="text-[10px] text-[#71717A] font-mono">↗</span>
                        </div>
                        <span className="text-[11px] font-medium text-[#52525B] line-clamp-1">
                          {exam.fullName}
                        </span>
                        <span className="text-[10px] text-[#71717A] line-clamp-1 mt-0.5">
                          {exam.detail}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 2. How it works */}
          <Link
            href="/#how-it-works"
            className="text-xs font-semibold uppercase tracking-wider text-[#52525B] hover:text-[#121316] transition-colors py-2"
          >
            How it works
          </Link>
        </nav>

        {/* Right: Sign in & Primary CTA Start Practice */}
        <div className="hidden md:flex md:items-center md:gap-4">
          <Link
            href="/login"
            className="text-xs font-semibold uppercase tracking-wider text-[#52525B] hover:text-[#121316] transition-colors px-2 py-1.5"
          >
            Sign in
          </Link>

          <button
            type="button"
            onClick={handleStartPractice}
            className="rounded-full bg-[#121316] px-5 py-2 text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:bg-[#27272A] active:scale-[0.98]"
          >
            Start Practice
          </button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex md:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="rounded-lg p-2 text-[#121316] hover:bg-[#F4F4F0]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-[#E4E4DF] bg-[#FFFFFF] px-4 py-5 shadow-lg md:hidden animate-in fade-in duration-150 space-y-4">
          <div className="space-y-1">
            <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
              Examinations
            </div>
            {examCategories.map((exam) => (
              <Link
                key={exam.slug}
                href={`/${exam.slug}`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-semibold text-[#121316] hover:bg-[#F4F4F0]"
              >
                <span>{exam.name} — {exam.fullName}</span>
                <span className="text-xs text-[#71717A]">↗</span>
              </Link>
            ))}
          </div>

          <div className="border-t border-[#E4E4DF] pt-3 space-y-2">
            <Link
              href="/#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#52525B] hover:text-[#121316]"
            >
              How it works
            </Link>

            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="block rounded-lg px-3 py-2 text-xs font-semibold text-[#52525B] hover:text-[#121316]"
            >
              Sign in
            </Link>

            <button
              type="button"
              onClick={(e) => {
                setMobileMenuOpen(false);
                handleStartPractice(e);
              }}
              className="w-full rounded-full bg-[#121316] py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm"
            >
              Start Practice
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
