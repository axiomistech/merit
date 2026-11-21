'use client';

import React from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, Clock, FileDown, Shield, ArrowRight } from 'lucide-react';

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
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#758B62]">
            Monetization & Entitlements
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
            Purchased Papers & Receipts
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
            Immutable record of question paper entitlements, free claims, and Razorpay GST invoices.
          </p>
        </div>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 rounded-xl bg-[#9CAF88] px-4 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#8ea07a] transition-all"
        >
          <span>Browse Question Papers (₹10)</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Transaction ID</th>
                <th className="p-4 font-semibold">Question Paper</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Access</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4] text-[#2E332D]">
              {purchases.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#758B62]">{tx.id}</td>
                  <td className="p-4 font-semibold text-[#263126]">{tx.paperName}</td>
                  <td className="p-4 text-[#73786E]">{tx.date}</td>
                  <td className="p-4 font-mono font-bold text-[#263126]">{tx.amount}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 font-bold text-[#758B62]">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <Link
                      href="/exam/neet-demo"
                      className="inline-flex items-center gap-1 font-bold text-[#758B62] hover:text-[#263126] transition-colors"
                    >
                      <span>Attempt Paper</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
