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
    { href: '/dashboard/purchases', label: 'Purchases & Receipts', icon: CreditCard },
    { href: '/support', label: 'Help Desk', icon: HelpCircle },
    { href: '/dashboard/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F5EF] text-[#2E332D]">
      {/* Desktop Sidebar (Matte White with Fine Border) */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:border-r lg:border-[#E6E5DE] lg:bg-white shadow-soft">
        {/* Brand Header */}
        <div className="flex h-16 items-center gap-2.5 border-b border-[#ECEAE4] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#9CAF88] text-white shadow-soft">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div className="flex items-baseline">
            <span className="font-mono text-base font-black tracking-wider text-[#263126]">FORT</span>
            <span className="ml-1 text-[10px] font-semibold uppercase tracking-widest text-[#758B62]">
              Workspace
            </span>
          </div>
        </div>

        {/* Candidate Badge */}
        <div className="border-b border-[#ECEAE4] bg-[#F7F5EF]/60 p-4">
          <div className="text-[11px] font-semibold uppercase tracking-wider text-[#92958D]">
            Candidate ID
          </div>
          <div className="font-mono text-xs font-bold text-[#758B62]">
            {candidate.registrationId}
          </div>
          <div className="mt-0.5 truncate text-xs font-bold text-[#263126]">
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
                  'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-[#E9EEE3] text-[#263126] font-bold shadow-soft'
                    : 'text-[#73786E] hover:bg-[#F0EFEA] hover:text-[#263126]'
                )}
              >
                <Icon className={cn('h-4 w-4 shrink-0', isActive ? 'text-[#758B62]' : 'text-[#92958D]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Logout bottom */}
        <div className="border-t border-[#ECEAE4] p-3">
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-semibold text-[#73786E] hover:bg-[#FCE8E4] hover:text-[#E8412C] transition-colors"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign Out</span>
          </Link>
        </div>
      </aside>

      {/* Main Workspace Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile Top Bar */}
        <header className="flex h-14 items-center justify-between border-b border-[#E6E5DE] bg-white px-4 lg:hidden shadow-soft">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="rounded-lg p-1.5 text-[#73786E] hover:bg-[#F0EFEA] hover:text-[#263126]"
            >
              <Menu className="h-5 w-5" />
            </button>
            <span className="font-mono text-sm font-bold text-[#263126]">FORT</span>
          </div>

          <span className="font-mono text-xs font-bold text-[#758B62]">{candidate.registrationId}</span>
        </header>

        {/* Mobile Sidebar Overlay */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex w-64 flex-1 flex-col bg-white p-4 shadow-elevated">
              <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
                <span className="font-mono font-bold text-[#758B62]">{candidate.registrationId}</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-[#73786E]"
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
                    className="block rounded-xl px-3 py-2 text-xs font-medium text-[#73786E] hover:bg-[#F0EFEA] hover:text-[#263126]"
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
