'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  Users,
  BookOpen,
  FileText,
  CreditCard,
  DollarSign,
  Activity,
  LogOut,
  Settings,
  ArrowLeft,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const adminNav = [
    { href: '/admin', label: 'Control Overview', icon: LayoutDashboard },
    { href: '/admin/students', label: 'Students & Registrations', icon: Users },
    { href: '/admin/question-bank', label: 'Question Bank CMS', icon: BookOpen },
    { href: '/admin/question-papers', label: 'Paper Builder', icon: FileText },
    { href: '/admin/payments', label: 'Payments & Revenue', icon: CreditCard },
    { href: '/admin/pricing', label: 'Pricing & Entitlements', icon: DollarSign },
    { href: '/admin/system/health', label: 'System Health', icon: Activity },
  ];

  return (
    <div className="flex min-h-screen bg-[#F7F5EF] text-[#2E332D]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[#E6E5DE] bg-white flex flex-col shrink-0">
        <div className="flex h-16 items-center gap-2.5 border-b border-[#ECEAE4] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CAF88] text-white">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-base font-bold tracking-wider text-[#263126]">FORT</span>
            <span className="ml-1.5 rounded-full bg-[#E9EEE3] px-2 py-0.5 text-[9px] font-bold text-[#758B62] uppercase">
              Control
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {adminNav.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-xl px-3 py-2.5 text-xs font-semibold transition-all',
                  isActive
                    ? 'bg-[#E9EEE3] text-[#263126] font-bold'
                    : 'text-[#73786E] hover:bg-[#F7F5EF] hover:text-[#263126]'
                )}
              >
                <Icon className={cn('h-4 w-4', isActive ? 'text-[#758B62]' : 'text-[#92958D]')} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#ECEAE4] p-3 text-xs">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-xl px-3 py-2 text-[#73786E] hover:bg-[#F7F5EF] hover:text-[#263126] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Return to Student App</span>
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b border-[#E6E5DE] bg-white px-8 text-xs">
          <div className="font-mono text-[#73786E]">
            SYSTEM STATUS:{' '}
            <strong className="text-[#758B62] font-bold">ALL SUBSYSTEMS NOMINAL</strong>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded-full bg-[#E9EEE3] px-3 py-1 font-bold text-xs text-[#758B62]">
              SUPER ADMIN
            </span>
          </div>
        </header>

        <main className="flex-1 p-6 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
