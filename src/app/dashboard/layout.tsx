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
  Sparkles,
  HelpCircle,
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
    { href: '/dashboard', label: 'Overview', icon: LayoutDashboard },
    { href: '/dashboard/neet', label: 'NEET Practice', icon: BookOpen },
    { href: '/dashboard/jee-main', label: 'JEE Main', icon: BookOpen },
    { href: '/dashboard/jee-advanced', label: 'JEE Advanced', icon: BookOpen },
    { href: '/dashboard/upsc', label: 'UPSC CSE', icon: BookOpen },
    { href: '/dashboard/engineering', label: 'Engineering', icon: BookOpen },
    { href: '/dashboard/analytics', label: 'Mastery & Analytics', icon: BarChart3 },
    { href: '/dashboard/bookmarks', label: 'Saved Bookmarks', icon: Bookmark },
    { href: '/dashboard/history', label: 'Attempt History', icon: Clock },
    { href: '/dashboard/purchases', label: 'Purchases & Invoices', icon: CreditCard },
    { href: '/support', label: 'Help Desk', icon: HelpCircle },
    { href: '/dashboard/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-[#0B1020] text-[#F5F7FB]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#263554] lg:bg-[#11182A]">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2.5 border-b border-[#263554] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-base font-bold tracking-wider text-[#F5F7FB]">FORT</span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-[#6486C6]">
              Workspace
            </span>
          </div>
        </div>

        {/* Candidate Badge */}
        <div className="border-b border-[#263554] bg-[#0B1020]/50 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#7C8799]">
            Candidate ID
          </div>
          <div className="font-mono text-xs font-bold text-[#6486C6]">
            {candidate.registrationId}
          </div>
          <div className="mt-1 truncate text-xs font-medium text-[#F5F7FB]">
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
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-medium transition-colors',
                  isActive
                    ? 'bg-[#6486C6] text-[#0B1020] font-bold shadow-sm'
                    : 'text-[#A7B0C0] hover:bg-[#172033] hover:text-[#F5F7FB]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#0B1020]' : 'text-[#7C8799]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="border-t border-[#263554] p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[#A7B0C0] hover:bg-[#172033] hover:text-[#EF4444] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="flex h-14 items-center justify-between border-b border-[#263554] bg-[#11182A] px-4 lg:hidden">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-[#A7B0C0] hover:bg-[#172033] hover:text-[#F5F7FB]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-mono text-sm font-bold text-[#F5F7FB]">FORT</span>
          </div>

          <span className="font-mono text-xs text-[#6486C6]">{candidate.registrationId}</span>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex w-64 flex-1 flex-col bg-[#11182A] p-4">
              <div className="flex items-center justify-between border-b border-[#263554] pb-3">
                <span className="font-mono font-bold text-[#6486C6]">{candidate.registrationId}</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-[#A7B0C0]"
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
                    className="block rounded-lg px-3 py-2 text-xs font-medium text-[#A7B0C0] hover:bg-[#172033] hover:text-[#F5F7FB]"
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
