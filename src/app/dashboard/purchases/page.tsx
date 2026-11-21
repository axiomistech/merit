'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Clock, FileDown, Shield } from 'lucide-react';

export default function StudentPurchasesPage() {
  const purchases = [
    {
      id: 'tx_free_001',
      paperName: 'FORT NEET (UG) All India Full Mock - 01',
      date: '2026-11-21',
      amount: '₹0 (Free Claim)',
      status: 'Active',
      type: 'Complimentary Claim',
    },
    {
      id: 'tx_rzp_9921',
      paperName: 'FORT JEE Main CBT Simulation - 01',
      date: '2026-11-20',
      amount: '₹10.00',
      status: 'Paid',
      type: 'Standard Purchase',
    },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
            Monetization & Entitlements
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            Purchased Papers & Receipts
          </h1>
        </div>
      </div>

      <div className="rounded-xl border border-[#263554] bg-[#11182A] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#263554] bg-[#172033] text-[#A7B0C0]">
            <tr>
              <th className="p-4">Transaction ID</th>
              <th className="p-4">Question Paper</th>
              <th className="p-4">Date</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-right">Access</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#263554]">
            {purchases.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#1D2940]/50 transition-colors">
                <td className="p-4 font-mono text-[#6486C6]">{tx.id}</td>
                <td className="p-4 font-semibold text-[#F5F7FB]">{tx.paperName}</td>
                <td className="p-4 text-[#A7B0C0]">{tx.date}</td>
                <td className="p-4 font-mono font-bold text-[#F5F7FB]">{tx.amount}</td>
                <td className="p-4">
                  <span className="rounded bg-[#10B981]/20 px-2 py-0.5 font-bold text-[#10B981]">
                    {tx.status}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <Link
                    href="/exam/neet-demo"
                    className="font-bold text-[#6486C6] hover:underline"
                  >
                    Attempt Paper
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
