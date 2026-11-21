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
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Payment Transactions & Reconciliation</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Cryptographically verified Razorpay orders, webhook receipts, and entitlement logs.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Payment ID</th>
                <th className="p-4 font-semibold">Order ID</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Gateway</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4] text-[#2E332D]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#758B62]">{tx.id}</td>
                  <td className="p-4 font-mono text-[#73786E]">{tx.orderId}</td>
                  <td className="p-4 font-semibold text-[#263126]">{tx.student}</td>
                  <td className="p-4 font-mono font-bold text-[#263126]">{tx.amount}</td>
                  <td className="p-4 text-[#73786E]">{tx.gateway}</td>
                  <td className="p-4">
                    <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[10px] font-bold text-[#758B62] uppercase">
                      {tx.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#73786E]">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
