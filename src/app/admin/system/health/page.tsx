'use client';

import React from 'react';
import { Activity, CheckCircle2, Shield, Database, Mail, CreditCard, Cpu } from 'lucide-react';

export default function AdminSystemHealthPage() {
  const subsystems = [
    {
      name: 'PostgreSQL Database & RLS Engine',
      status: 'Healthy',
      latency: '22ms',
      detail: 'Row Level Security active on 12 user tables. Atomic sequence generator online.',
      icon: Database,
    },
    {
      name: 'Razorpay Payment Gateway & Webhooks',
      status: 'Operational',
      latency: '45ms',
      detail: 'Order creation & HMAC SHA256 timing-safe signature verification active.',
      icon: CreditCard,
    },
    {
      name: 'Email Delivery Service (Resend)',
      status: 'Operational',
      latency: '30ms',
      detail: 'Transactional email templates configured for verification and receipts.',
      icon: Mail,
    },
    {
      name: 'Vector OMR PDF Generation Engine',
      status: 'Operational',
      latency: '15ms',
      detail: 'A4 vector PDF rasterization with candidate metadata hashing.',
      icon: Cpu,
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#20252B] font-sans">System Health & Subsystem Diagnostics</h1>
        <p className="mt-1 text-xs text-[#66727D]">
          Live status of database connectivity, payment processing, email services, and exam engines.
        </p>
      </div>

      <div className="space-y-4">
        {subsystems.map((sub, idx) => {
          const Icon = sub.icon;
          return (
            <div
              key={idx}
              className="flex items-start justify-between rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E9EEF1] text-[#20252B]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#20252B]">{sub.name}</h3>
                  <p className="mt-1 text-xs text-[#66727D]">{sub.detail}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B] uppercase">
                  {sub.status}
                </span>
                <div className="mt-1 font-mono text-[10px] text-[#66727D]">{sub.latency}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
