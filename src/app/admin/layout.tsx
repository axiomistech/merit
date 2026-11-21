'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Shield,
  LayoutDashboard,
  BarChart3,
  BookOpen,
  FileText,
  ListTree,
  FolderTree,
  CheckSquare,
  Wrench,
  Clock,
  ScanLine,
  Award,
  Users,
  Compass,
  Trophy,
  LifeBuoy,
  Package,
  DollarSign,
  Tag,
  CreditCard,
  RotateCcw,
  Bell,
  Megaphone,
  Mail,
  Layers,
  FileCode,
  HelpCircle,
  Search,
  UserCog,
  History,
  Settings,
  Cpu,
  LogOut,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  ExternalLink,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminUser, AdminRole } from '@/types/admin';
import { getAdminSession, hasPermission } from '@/lib/admin/auth';
import { toast } from 'sonner';

interface NavItem {
  href: string;
  label: string;
  icon: any;
  permission?: any;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);

  useEffect(() => {
    const user = getAdminSession();
    setCurrentUser(user);
    if (!user && pathname !== '/admin/login') {
      router.push('/admin/login');
    }
  }, [pathname, router]);

  // If on login page, render without admin layout shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('fort_admin_session');
    }
    toast.info('Signed out of administrative console');
    router.push('/admin/login');
  };

  const navGroups: NavGroup[] = [
    {
      title: 'OVERVIEW',
      items: [
        { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
        { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
      ],
    },
    {
      title: 'ACADEMICS',
      items: [
        { href: '/admin/exams', label: 'Exams', icon: BookOpen },
        { href: '/admin/syllabus', label: 'Syllabus', icon: ListTree },
        { href: '/admin/subjects', label: 'Subjects & Chapters', icon: FolderTree },
        { href: '/admin/question-bank', label: 'Question Bank', icon: FileText },
        { href: '/admin/question-review', label: 'Question Review', icon: CheckSquare },
        { href: '/admin/test-builder', label: 'Test Builder', icon: Wrench },
        { href: '/admin/mock-tests', label: 'Mock Tests', icon: Clock },
        { href: '/admin/omr', label: 'OMR Management', icon: ScanLine },
        { href: '/admin/evaluations', label: 'Evaluations', icon: Award },
      ],
    },
    {
      title: 'USERS',
      items: [
        { href: '/admin/students', label: 'Students', icon: Users },
        { href: '/admin/attempts', label: 'Test Attempts', icon: Compass },
        { href: '/admin/leaderboards', label: 'Leaderboards', icon: Trophy },
        { href: '/admin/support', label: 'Support Tickets', icon: LifeBuoy },
      ],
    },
    {
      title: 'COMMERCE',
      items: [
        { href: '/admin/products', label: 'Products & Papers', icon: Package },
        { href: '/admin/pricing', label: 'Pricing', icon: DollarSign },
        { href: '/admin/coupons', label: 'Coupons', icon: Tag },
        { href: '/admin/payments', label: 'Transactions', icon: CreditCard },
        { href: '/admin/refunds', label: 'Refunds', icon: RotateCcw },
      ],
    },
    {
      title: 'COMMUNICATION',
      items: [
        { href: '/admin/notifications', label: 'Notifications', icon: Bell },
        { href: '/admin/announcements', label: 'Announcements', icon: Megaphone },
        { href: '/admin/campaigns', label: 'Email Campaigns', icon: Mail },
      ],
    },
    {
      title: 'WEBSITE',
      items: [
        { href: '/admin/cms', label: 'Homepage CMS', icon: Layers },
        { href: '/admin/cms/pages', label: 'Pages', icon: FileCode },
        { href: '/admin/cms/faq', label: 'FAQ', icon: HelpCircle },
        { href: '/admin/seo', label: 'SEO', icon: Search },
      ],
    },
    {
      title: 'SYSTEM',
      items: [
        { href: '/admin/users', label: 'Admin Users & Roles', icon: UserCog },
        { href: '/admin/audit-logs', label: 'Audit Logs', icon: History },
        { href: '/admin/settings', label: 'Settings', icon: Settings },
        { href: '/admin/integrations', label: 'Integrations', icon: Cpu },
      ],
    },
  ];

  return (
    <div className="flex h-screen bg-[#F1F3F4] text-[#20252B] overflow-hidden">
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-[#DCE2E6] lg:bg-white shrink-0">
        {/* Brand Header */}
        <div className="flex h-16 items-center justify-between border-b border-[#DCE2E6] px-6">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#9CC6E0] text-[#20252B]">
              <Shield className="h-4 w-4 stroke-[2.5]" />
            </div>
            <div>
              <span className="font-mono text-base font-bold tracking-wider text-[#20252B]">FORT</span>
              <span className="ml-1.5 rounded-full bg-[#9CC6E0]/20 px-2 py-0.5 text-[9px] font-bold text-[#20252B] uppercase">
                Control
              </span>
            </div>
          </Link>
        </div>

        {/* Scrollable Navigation Groups */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          {navGroups.map((group) => (
            <div key={group.title} className="space-y-1">
              <div className="px-3 text-[10px] font-bold uppercase tracking-widest text-[#66727D]">
                {group.title}
              </div>
              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-medium transition-all',
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
              </div>
            </div>
          ))}
        </nav>

        {/* Bottom User Profile */}
        <div className="border-t border-[#DCE2E6] p-4 bg-[#F1F3F4]">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <div className="truncate font-semibold text-xs text-[#20252B]">
                {currentUser?.name || 'Admin User'}
              </div>
              <div className="font-mono text-[10px] text-[#66727D] uppercase">
                {currentUser?.role?.replace('_', ' ') || 'SUPER ADMIN'}
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="rounded-lg p-1.5 text-[#66727D] hover:bg-[#FDEDF0] hover:text-[#E4002B] transition-colors"
              title="Sign Out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header Bar */}
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-[#DCE2E6] bg-white px-4 sm:px-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden rounded-lg p-1.5 text-[#66727D] hover:bg-[#F1F3F4]"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Breadcrumb / Title indication */}
            <div className="hidden sm:flex items-center gap-2 text-xs text-[#66727D]">
              <span className="font-semibold text-[#20252B]">Console</span>
              <span>/</span>
              <span className="font-mono uppercase text-[#20252B]">
                {pathname.split('/')[2] || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-[#DCE2E6] bg-white px-3.5 py-1.5 text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] transition-colors"
            >
              <span>Student Portal</span>
              <ExternalLink className="h-3 w-3 text-[#66727D]" />
            </Link>

            <div className="flex items-center gap-2 border-l border-[#DCE2E6] pl-4">
              <span className="h-2 w-2 rounded-full bg-[#27835A] animate-pulse" />
              <span className="font-mono text-[11px] font-bold text-[#20252B]">
                SYSTEM HEALTHY
              </span>
            </div>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div
              className="fixed inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <div className="relative flex w-72 flex-1 flex-col bg-white shadow-2xl">
              <div className="flex h-16 items-center justify-between border-b border-[#DCE2E6] px-6">
                <span className="font-mono font-bold text-[#20252B]">FORT CONTROL</span>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="rounded-lg p-1 text-[#66727D]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto p-4 space-y-4">
                {navGroups.map((group) => (
                  <div key={group.title} className="space-y-1">
                    <div className="text-[10px] font-bold uppercase text-[#66727D]">
                      {group.title}
                    </div>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setSidebarOpen(false)}
                        className={cn(
                          'block rounded-xl px-3 py-2 text-xs font-medium',
                          pathname === item.href
                            ? 'bg-[#9CC6E0]/25 text-[#20252B] font-bold border-l-2 border-[#E4002B]'
                            : 'text-[#66727D] hover:bg-[#F1F3F4]'
                        )}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </nav>
            </div>
          </div>
        )}

        {/* Page Content Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8">{children}</main>
      </div>
    </div>
  );
}
