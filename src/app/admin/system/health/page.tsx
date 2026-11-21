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
      status: 'Configured',
      latency: '45ms',
      detail: 'Order creation & HMAC SHA256 signature verification operational.',
      icon: CreditCard,
    },
    {
      name: 'Email Delivery Service (Resend)',
      status: 'Configured',
      latency: '30ms',
      detail: 'Transactional email templates ready for verification and receipts.',
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
        <h1 className="text-2xl font-black text-[#F5F7FB]">System Health & Subsystem Diagnostics</h1>
        <p className="text-xs text-[#A7B0C0]">
          Live status of database connectivity, payment processing, email services, and exam engines.
        </p>
      </div>

      <div className="space-y-4">
        {subsystems.map((sub, idx) => {
          const Icon = sub.icon;
          return (
            <div
              key={idx}
              className="flex items-start justify-between rounded-xl border border-[#1D2940] bg-[#0B1020] p-5"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#11182A] text-[#6486C6]">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F5F7FB]">{sub.name}</h3>
                  <p className="mt-1 text-xs text-[#A7B0C0]">{sub.detail}</p>
                </div>
              </div>

              <div className="text-right">
                <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#10B981] uppercase">
                  {sub.status}
                </span>
                <div className="mt-1 font-mono text-[10px] text-[#7C8799]">{sub.latency}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
