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
  ArrowRight,
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
        <h1 className="text-2xl font-bold text-[#263126] font-serif">FORT Control Command Center</h1>
        <p className="mt-1 text-xs text-[#73786E]">
          Centralized management for candidate registrations, mathematical question banks, and financial reconciliation.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div
              key={idx}
              className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#73786E]">{s.label}</span>
                <Icon className="h-4 w-4 text-[#758B62]" />
              </div>
              <div className="mt-2 font-mono text-3xl font-bold text-[#263126]">{s.value}</div>
              <div className="mt-1 text-[11px] font-semibold text-[#758B62]">{s.sub}</div>
            </div>
          );
        })}
      </div>

      {/* Quick Action Tables */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <h3 className="text-sm font-bold text-[#263126]">Recent Registrations</h3>
            <Link href="/admin/students" className="text-xs font-semibold text-[#758B62] hover:underline">
              View All Candidates
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {[
              { id: 'FORT-26-000001', name: 'Aarav Sharma', exam: 'NEET', date: 'Just now' },
              { id: 'FORT-26-000002', name: 'Priya Iyer', exam: 'JEE Main', date: '12 mins ago' },
              { id: 'FORT-26-000003', name: 'Rohan Deshmukh', exam: 'UPSC CSE', date: '45 mins ago' },
            ].map((st) => (
              <div key={st.id} className="flex items-center justify-between rounded-xl bg-[#F7F5EF] p-3.5">
                <div>
                  <span className="font-mono font-bold text-[#758B62]">{st.id}</span>
                  <div className="font-medium text-[#263126]">{st.name}</div>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-white border border-[#E6E5DE] px-2 py-0.5 text-[10px] font-bold text-[#73786E]">
                    {st.exam}
                  </span>
                  <div className="mt-1 text-[10px] text-[#92958D]">{st.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <h3 className="text-sm font-bold text-[#263126]">Monetization Policy Status</h3>
            <Link href="/admin/pricing" className="text-xs font-semibold text-[#758B62] hover:underline">
              Configure Pricing
            </Link>
          </div>

          <div className="space-y-3 text-xs text-[#73786E]">
            <div className="flex justify-between border-b border-[#ECEAE4] pb-2">
              <span>First Paper Policy:</span>
              <strong className="text-[#758B62]">100% Free Claim Allowed</strong>
            </div>
            <div className="flex justify-between border-b border-[#ECEAE4] pb-2">
              <span>Standard Paper Price:</span>
              <strong className="font-mono text-[#263126]">₹10.00 (1000 Paise)</strong>
            </div>
            <div className="flex justify-between border-b border-[#ECEAE4] pb-2">
              <span>Gateway Signature Verification:</span>
              <strong className="text-[#758B62]">HMAC SHA256 Active</strong>
            </div>
            <div className="flex justify-between">
              <span>Primary Gateway:</span>
              <strong className="text-[#263126]">Razorpay Payments</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
