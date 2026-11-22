'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  RotateCcw,
  BarChart3,
  User,
  Menu,
  X,
  LogOut,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { MeritwiseLogo } from '@/components/brand/MeritwiseLogo';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'MW-26-000001',
    email: 'student@example.com',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored =
        localStorage.getItem('merit_student_session') || localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCandidate({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'MW-26-000001',
            email: parsed.email || 'student@example.com',
          });
        } catch {}
      }
    }
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/qp-prep', label: 'Question Papers', icon: FileText },
    { href: '/dashboard/history', label: 'My Attempts', icon: RotateCcw },
    { href: '/dashboard/analytics', label: 'Performance', icon: BarChart3 },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-[#FBFBFA] text-[#121316]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#E4E4DF] bg-[#FFFFFF] shadow-sm">
        {/* Brand Header */}
        <div className="flex h-16 items-center border-b border-[#E4E4DF] px-6">
          <Link href="/" className="inline-flex items-center focus-visible:outline-none">
            <MeritwiseLogo variant="gold" size="sm" />
          </Link>
        </div>

        {/* Candidate Badge */}
        <div className="border-b border-[#E4E4DF] bg-[#FBFBFA] p-4">
          <div className="text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
            Candidate ID
          </div>
          <div className="font-mono text-xs font-bold text-[#121316]">
            {candidate.registrationId}
          </div>
          <div className="mt-0.5 truncate text-xs font-medium text-[#52525B]">
            {candidate.fullName}
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all duration-150',
                  isActive
                    ? 'bg-[#F7F3EB] text-[#121316] font-bold border-l-2 border-[#8C6D3B]'
                    : 'text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#8C6D3B]' : 'text-[#71717A]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Sign out bottom */}
        <div className="border-t border-[#E4E4DF] p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#71717A] hover:bg-[#F4F4F0] hover:text-[#121316] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="flex h-14 items-center justify-between border-b border-[#E4E4DF] bg-[#FFFFFF] px-4 lg:hidden shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-[#52525B] hover:bg-[#F4F4F0] hover:text-[#121316]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <Link href="/" className="inline-flex items-center focus-visible:outline-none">
              <MeritwiseLogo variant="gold" size="xs" />
            </Link>
          </div>

          <span className="font-mono text-xs font-bold text-[#121316]">{candidate.registrationId}</span>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex w-64 flex-1 flex-col bg-[#FFFFFF] p-4 shadow-xl">
              <div className="flex items-center justify-between border-b border-[#E4E4DF] pb-3">
                <span className="font-mono font-bold text-[#121316]">{candidate.registrationId}</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-[#71717A]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="mt-4 flex-1 space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-colors',
                        isActive
                          ? 'bg-[#F7F3EB] text-[#121316] font-bold border-l-2 border-[#8C6D3B]'
                          : 'text-[#52525B] hover:bg-[#F4F4F0]'
                      )}
                    >
                      <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#8C6D3B]' : 'text-[#71717A]')} />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </nav>

              <div className="border-t border-[#E4E4DF] pt-3">
                <Link
                  href="/"
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#71717A] hover:text-[#121316]"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Sign Out</span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Dynamic Content Outlet */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
