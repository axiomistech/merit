'use client';

import React from 'react';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  BookOpen,
  DollarSign,
  Activity,
  ArrowUpRight,
  Shield,
  Clock,
} from 'lucide-react';

export default function AdminOverviewPage() {
  const stats = [
    { label: 'Total Registered Students', value: '1,420', sub: '+18 today', icon: Users },
    { label: 'Evaluated Test Attempts', value: '3,890', sub: 'Across 5 programs', icon: BookOpen },
    { label: 'Gross Revenue (INR)', value: '₹38,900', sub: '₹10 per paper', icon: DollarSign },
    { label: 'Active Webhook Reliability', value: '100%', sub: 'Zero signature errors', icon: Activity },
  ];

  return (
    <div className="space-y-8 max-w-7xl">
      <div>
        <h1 className="text-2xl font-black text-[#F5F7FB]">FORT Control Command Center</h1>
        <p className="text-xs text-[#A7B0C0]">
          System overview, student registrations, question banks, and financial reconciliation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="rounded-xl border border-[#1D2940] bg-[#0B1020] p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#A7B0C0]">{s.label}</span>
                <Icon className="h-4 w-4 text-[#6486C6]" />
              </div>
              <div className="mt-2 font-mono text-3xl font-black text-[#F5F7FB]">{s.value}</div>
              <div className="mt-1 text-[11px] text-[#10B981]">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1D2940] pb-3">
            <h3 className="text-sm font-bold text-[#F5F7FB]">Recent Registrations</h3>
            <Link href="/admin/students" className="text-xs text-[#6486C6] hover:underline">
              View All
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'FORT-26-000001', name: 'Aarav Sharma', exam: 'NEET', date: 'Just now' },
              { id: 'FORT-26-000002', name: 'Priya Iyer', exam: 'JEE Main', date: '12 mins ago' },
              { id: 'FORT-26-000003', name: 'Rohan Deshmukh', exam: 'UPSC CSE', date: '45 mins ago' },
            ].map((st) => (
              <div key={st.id} className="flex items-center justify-between rounded-lg bg-[#11182A] p-3">
                <div>
                  <span className="font-mono font-bold text-[#6486C6]">{st.id}</span>
                  <div className="font-medium text-[#F5F7FB]">{st.name}</div>
                </div>
                <div className="text-right">
                  <span className="rounded bg-[#172033] px-2 py-0.5 text-[10px] font-bold text-[#A7B0C0]">
                    {st.exam}
                  </span>
                  <div className="mt-1 text-[10px] text-[#7C8799]">{st.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[#1D2940] pb-3">
            <h3 className="text-sm font-bold text-[#F5F7FB]">Pricing & Policy Status</h3>
            <Link href="/admin/pricing" className="text-xs text-[#6486C6] hover:underline">
              Configure
            </Link>
          </div>

          <div className="space-y-3 text-xs text-[#A7B0C0]">
            <div className="flex justify-between border-b border-[#1D2940] pb-2">
              <span>First Paper Policy:</span>
              <strong className="text-[#10B981]">100% Free Claim Allowed</strong>
            </div>
            <div className="flex justify-between border-b border-[#1D2940] pb-2">
              <span>Standard Paper Price:</span>
              <strong className="font-mono text-[#F5F7FB]">₹10.00 (1000 Paise)</strong>
            </div>
            <div className="flex justify-between border-b border-[#1D2940] pb-2">
              <span>Gateway Signature Check:</span>
              <strong className="text-[#10B981]">HMAC SHA256 Enforced</strong>
            </div>
            <div className="flex justify-between">
              <span>Active OMR Resolution:</span>
              <strong className="text-[#F5F7FB]">Vector 300 DPI A4</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
