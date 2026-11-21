'use client';

import React from 'react';
import { CreditCard, CheckCircle2, Shield, Search } from 'lucide-react';

export default function AdminPaymentsPage() {
  const transactions = [
    {
      id: 'pay_rzp_881923',
      orderId: 'order_rzp_9901',
      student: 'Aarav Sharma (FORT-26-000001)',
      amount: '₹10.00',
      status: 'successful',
      gateway: 'Razorpay UPI',
      date: '2026-11-21 14:32:00',
    },
    {
      id: 'pay_rzp_881924',
      orderId: 'order_rzp_9902',
      student: 'Priya Iyer (FORT-26-000002)',
      amount: '₹10.00',
      status: 'successful',
      gateway: 'Razorpay Cards',
      date: '2026-11-21 15:10:12',
    },
  ];

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#F5F7FB]">Payment Transactions & Reconciliation</h1>
          <p className="text-xs text-[#A7B0C0]">
            Cryptographically verified Razorpay orders, webhook receipts, and entitlement logs.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-[#1D2940] bg-[#11182A] text-[#A7B0C0]">
            <tr>
              <th className="p-4">Payment ID</th>
              <th className="p-4">Order ID</th>
              <th className="p-4">Student</th>
              <th className="p-4">Amount</th>
              <th className="p-4">Gateway</th>
              <th className="p-4">Status</th>
              <th className="p-4">Timestamp</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1D2940]">
            {transactions.map((tx) => (
              <tr key={tx.id} className="hover:bg-[#11182A]/50">
                <td className="p-4 font-mono font-bold text-[#6486C6]">{tx.id}</td>
                <td className="p-4 font-mono text-[#A7B0C0]">{tx.orderId}</td>
                <td className="p-4 font-semibold text-[#F5F7FB]">{tx.student}</td>
                <td className="p-4 font-mono font-bold text-[#F5F7FB]">{tx.amount}</td>
                <td className="p-4">{tx.gateway}</td>
                <td className="p-4">
                  <span className="rounded bg-[#10B981]/20 px-2 py-0.5 text-[10px] font-bold text-[#10B981] uppercase">
                    {tx.status}
                  </span>
                </td>
                <td className="p-4 text-[#A7B0C0]">{tx.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
