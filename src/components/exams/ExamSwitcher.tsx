'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface ExamSwitcherProps {
  currentSlug: 'neet' | 'jee-main' | 'jee' | 'upsc' | 'gate' | string;
  className?: string;
  sticky?: boolean;
}

const EXAM_TABS = [
  {
    slug: 'neet',
    href: '/neet',
    label: 'NEET',
    fullName: 'National Eligibility cum Entrance Test (UG)',
    category: 'Medical',
  },
  {
    slug: 'jee-main',
    href: '/jee-main',
    label: 'JEE Main',
    fullName: 'Joint Entrance Examination (Main)',
    category: 'Engineering',
  },
  {
    slug: 'upsc',
    href: '/upsc',
    label: 'UPSC',
    fullName: 'Civil Services Examination (CSE)',
    category: 'Civil Services',
  },
  {
    slug: 'gate',
    href: '/gate',
    label: 'GATE',
    fullName: 'Graduate Aptitude Test in Engineering',
    category: 'Postgraduate',
  },
] as const;

export function ExamSwitcher({ currentSlug, className, sticky = true }: ExamSwitcherProps) {
  return (
    <div
      className={cn(
        'w-full flex justify-center',
        sticky ? 'sticky top-20 z-30 py-2 pointer-events-none' : 'py-2',
        className
      )}
    >
      <nav
        aria-label="Curriculum Switcher"
        className="pointer-events-auto inline-flex items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 rounded-full bg-white/75 backdrop-blur-xl border border-white/85 shadow-[0_8px_32px_rgba(0,0,0,0.06),_0_1px_2px_rgba(0,0,0,0.04)] ring-1 ring-[#E4E4DF]/70 max-w-full overflow-x-auto scrollbar-none transition-all duration-200"
      >
        {EXAM_TABS.map((tab) => {
          const isActive =
            currentSlug === tab.slug ||
            (tab.slug === 'jee-main' && currentSlug === 'jee');

          return (
            <Link
              key={tab.slug}
              href={tab.href}
              title={`${tab.label} — ${tab.fullName}`}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'group relative inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm font-bold tracking-tight transition-all duration-200 shrink-0 select-none',
                isActive
                  ? 'bg-[#121316] !text-white shadow-md shadow-black/10 ring-1 ring-black/5'
                  : 'bg-white/40 text-[#52525B] hover:text-[#121316] hover:bg-white/95 hover:shadow-xs border border-white/60 hover:border-[#E4E4DF] active:scale-[0.98]'
              )}
            >
              {isActive && (
                <span className="h-1.5 w-1.5 rounded-full bg-[#8C6D3B] shrink-0 animate-pulse" />
              )}
              <span className={isActive ? '!text-white' : undefined}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

export default ExamSwitcher;
