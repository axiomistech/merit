'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  BookOpen,
  FileText,
  Clock,
  Bookmark,
  RotateCcw,
  BarChart3,
  CreditCard,
  User,
  Settings,
  Menu,
  X,
  ChevronRight,
  LogOut,
  HelpCircle,
  Layers,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [candidate, setCandidate] = useState({
    fullName: 'Candidate',
    registrationId: 'FORT-26-000001',
    email: 'student@example.com',
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_student_session');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          setCandidate({
            fullName: parsed.fullName || 'Candidate',
            registrationId: parsed.registrationId || 'FORT-26-000001',
            email: parsed.email || 'student@example.com',
          });
        } catch {}
      }
    }
  }, []);

  const navItems = [
    { href: '/dashboard', label: 'Home', icon: LayoutDashboard },
    { href: '/dashboard/practice', label: 'Practice', icon: Layers },
    { href: '/dashboard/tests', label: 'Tests', icon: Clock },
    { href: '/dashboard/exams', label: 'Exams', icon: BookOpen },
    { href: '/dashboard/analytics', label: 'Performance', icon: BarChart3 },
    { href: '/dashboard/bookmarks', label: 'Bookmarks', icon: Bookmark },
    { href: '/dashboard/history', label: 'History', icon: RotateCcw },
    { href: '/dashboard/profile', label: 'Profile', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-[#F1F3F4] text-[#20252B]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#DCE2E6] lg:bg-white shadow-soft">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2.5 border-b border-[#DCE2E6] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#9CC6E0] text-[#20252B] shadow-soft">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-mono text-base font-bold tracking-wider text-[#20252B]">FORT</span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-[#66727D]">
              Workspace
            </span>
          </div>
        </div>

        {/* Candidate Badge */}
        <div className="border-b border-[#DCE2E6] bg-[#F1F3F4] p-4">
          <div className="text-[10px] font-semibold uppercase tracking-wider text-[#66727D]">
            Candidate ID
          </div>
          <div className="font-mono text-xs font-bold text-[#20252B]">
            {candidate.registrationId}
          </div>
          <div className="mt-0.5 truncate text-xs font-medium text-[#66727D]">
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
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#9CC6E0]/25 text-[#20252B] font-bold border-l-2 border-[#E4002B]'
                    : 'text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#20252B]' : 'text-[#66727D]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="border-t border-[#DCE2E6] p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#66727D] hover:bg-[#FDEDF0] hover:text-[#E4002B] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="flex h-14 items-center justify-between border-b border-[#DCE2E6] bg-white px-4 lg:hidden shadow-soft">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-mono text-sm font-bold text-[#20252B]">FORT</span>
          </div>

          <span className="font-mono text-xs font-bold text-[#20252B]">{candidate.registrationId}</span>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex w-64 flex-1 flex-col bg-white p-4 shadow-elevated">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
                <span className="font-mono font-bold text-[#20252B]">{candidate.registrationId}</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-[#66727D]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="mt-4 flex-1 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
