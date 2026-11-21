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
    <div className="flex min-h-screen bg-[#070B16] text-[#F5F7FB]">
      {/* Admin Sidebar */}
      <aside className="w-64 border-r border-[#1D2940] bg-[#0B1020] flex flex-col">
        <div className="flex h-16 items-center gap-2.5 border-b border-[#1D2940] px-6">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#6486C6] text-[#0B1020]">
            <Shield className="h-4 w-4 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-mono text-base font-bold tracking-wider text-[#F5F7FB]">FORT</span>
            <span className="ml-1 rounded bg-[#EF4444]/20 px-1 py-0.2 text-[9px] font-bold text-[#EF4444] uppercase">
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
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-[#1D2940] text-[#6486C6] border border-[#263554]'
                    : 'text-[#A7B0C0] hover:bg-[#11182A] hover:text-[#F5F7FB]'
                )}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[#1D2940] p-3 text-xs">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-[#A7B0C0] hover:text-[#F5F7FB]"
          >
            <span>Exit to Student Dashboard</span>
          </Link>
        </div>
      </aside>

      {/* Admin Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <header className="flex h-16 items-center justify-between border-b border-[#1D2940] bg-[#0B1020] px-8 text-xs">
          <div className="font-mono text-[#A7B0C0]">
            ENVIRONMENT: <strong className="text-[#10B981]">PRODUCTION-READY</strong>
          </div>
          <div className="flex items-center gap-3">
            <span className="rounded bg-[#6486C6]/20 px-2.5 py-1 font-bold text-[#6486C6]">
              SUPER ADMIN
            </span>
          </div>
        </header>

        <main className="flex-1 p-8">{children}</main>
      </div>
    </div>
  );
}
