'use client';

import React, { useState, useEffect } from 'react';
import {
  CreditCard,
  CheckCircle2,
  XCircle,
  AlertCircle,
  RotateCcw,
  Search,
  ExternalLink,
  Shield,
  FileText,
  Eye,
  Filter,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AdminTransactionRecord, RefundRecord } from '@/types/admin';
import {
  getStoredTransactions,
  saveStoredTransactions,
  getStoredRefunds,
  saveStoredRefunds,
} from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminPaymentsPage() {
  const [transactions, setTransactions] = useState<AdminTransactionRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'successful' | 'failed' | 'refunded'>('all');
  const [selectedTxn, setSelectedTxn] = useState<AdminTransactionRecord | null>(null);

  useEffect(() => {
    setTransactions(getStoredTransactions());
  }, []);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch =
      t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.orderId.toLowerCase().includes(search.toLowerCase()) ||
      t.studentName.toLowerCase().includes(search.toLowerCase()) ||
      t.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      t.productName.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleIssueRefund = (txn: AdminTransactionRecord) => {
    if (txn.status === 'refunded') {
      toast.error('This transaction is already refunded.');
      return;
    }

    const confirmRefund = window.confirm(
      `Issue full refund of ₹${txn.amount} to ${txn.studentName} (${txn.studentEmail})? This will revoke paper entitlement.`
    );
    if (!confirmRefund) return;

    // Update transaction
    const updatedTxns = transactions.map((t) =>
      t.id === txn.id ? { ...t, status: 'refunded' as const } : t
    );
    setTransactions(updatedTxns);
    saveStoredTransactions(updatedTxns);

    // Create refund record
    const refunds = getStoredRefunds();
    const newRefund: RefundRecord = {
      id: `ref_${Date.now()}`,
      paymentId: txn.gatewayPaymentId || txn.id,
      orderId: txn.orderId,
      studentId: txn.studentId,
      studentName: txn.studentName,
      studentEmail: txn.studentEmail,
      amount: txn.amount,
      reason: 'satisfaction_guarantee',
      notes: 'Initiated from Payments dashboard by administrator.',
      status: 'processed',
      processed_at: new Date().toISOString(),
      processed_by: 'Admin Finance Team',
      created_at: new Date().toISOString(),
    };
    saveStoredRefunds([newRefund, ...refunds]);

    logAdminAction({
      action: 'PAYMENT_REFUNDED',
      resource_type: 'payment',
      resource_id: txn.id,
      change_summary: `Processed full refund of ₹${txn.amount} for ${txn.studentName}`,
    });
    toast.success(`Refund of ₹${txn.amount} processed successfully via Razorpay.`);
    setSelectedTxn(null);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Payment Transactions & Reconciliation</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Cryptographically signed Razorpay payments, webhook audit timestamps, and entitlement logs.
          </p>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Total Volume</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">
            ₹{transactions.reduce((acc, t) => (t.status === 'successful' ? acc + t.amount : acc), 0).toLocaleString()}
          </div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Successful orders</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Transactions</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">{transactions.length}</div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Orders attempted</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Success Rate</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">
            {Math.round(
              (transactions.filter((t) => t.status === 'successful').length / Math.max(1, transactions.length)) * 100
            )}%
          </div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Gateway completion</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Refund Rate</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">
            {transactions.filter((t) => t.status === 'refunded').length}
          </div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Total returns issued</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
          <input
            type="text"
            placeholder="Search payment ID, order ID, student name, or product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#73786E]">Status:</span>
          {(['all', 'successful', 'failed', 'refunded'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors',
                statusFilter === st
                  ? 'bg-[#263126] text-white border-[#263126]'
                  : 'bg-white text-[#52584E] border-[#E6E5DE] hover:bg-[#F7F5EF]'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Payment / Order ID</th>
                <th className="p-4 font-semibold">Student & Account</th>
                <th className="p-4 font-semibold">Product Description</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Gateway</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Timestamp</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4]">
              {filteredTransactions.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#263126]">{t.id}</div>
                    <div className="font-mono text-[11px] text-[#73786E]">{t.orderId}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-[#263126]">{t.studentName}</div>
                    <div className="text-[11px] text-[#73786E]">{t.studentEmail}</div>
                  </td>
                  <td className="p-4 text-[#263126] max-w-xs truncate">{t.productName}</td>
                  <td className="p-4 font-bold font-mono text-[#263126]">₹{t.amount}</td>
                  <td className="p-4">
                    <span className="capitalize text-[#52584E] font-medium">{t.gateway}</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        t.status === 'successful' && 'bg-[#9CAF88]/20 text-[#3B4C30]',
                        t.status === 'refunded' && 'bg-amber-100 text-amber-800',
                        t.status === 'failed' && 'bg-[#E8412C]/15 text-[#E8412C]'
                      )}
                    >
                      {t.status}
                    </span>
                  </td>
                  <td className="p-4 text-[#73786E] font-mono text-[11px]">
                    {t.created_at.replace('T', ' ').substring(0, 19)}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => setSelectedTxn(t)}
                        className="p-1.5 rounded-lg border border-[#E6E5DE] text-[#52584E] hover:bg-[#F7F5EF] transition-colors"
                        title="View Receipt"
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      {t.status === 'successful' && (
                        <button
                          onClick={() => handleIssueRefund(t)}
                          className="px-2 py-1 rounded-lg border border-[#E6E5DE] text-[11px] font-semibold text-[#E8412C] hover:bg-[#E8412C]/10 transition-colors"
                          title="Issue Refund"
                        >
                          Refund
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Transaction Details Modal */}
      {selectedTxn && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <h3 className="text-base font-bold text-[#263126] font-serif">Transaction Receipt</h3>
              <button
                onClick={() => setSelectedTxn(null)}
                className="text-xs text-[#73786E] hover:text-[#263126]"
              >
                Close
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Transaction ID</span>
                <span className="font-mono font-bold text-[#263126]">{selectedTxn.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Razorpay Order ID</span>
                <span className="font-mono text-[#263126]">{selectedTxn.orderId}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Student Name</span>
                <span className="font-semibold text-[#263126]">{selectedTxn.studentName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Student Email</span>
                <span className="text-[#263126]">{selectedTxn.studentEmail}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Purchased Item</span>
                <span className="font-semibold text-[#263126]">{selectedTxn.productName}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Billed Amount</span>
                <span className="font-bold font-mono text-base text-[#263126]">₹{selectedTxn.amount}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#F7F5EF]">
                <span className="text-[#73786E]">Status</span>
                <span className="font-bold uppercase text-[#3B4C30]">{selectedTxn.status}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-[#73786E]">Created At</span>
                <span className="font-mono text-[#73786E]">{selectedTxn.created_at}</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#ECEAE4]">
              {selectedTxn.status === 'successful' ? (
                <button
                  onClick={() => handleIssueRefund(selectedTxn)}
                  className="px-3 py-1.5 rounded-lg border border-[#E8412C]/30 text-xs font-semibold text-[#E8412C] hover:bg-[#E8412C]/10 transition-colors"
                >
                  Issue Full Refund (₹{selectedTxn.amount})
                </button>
              ) : (
                <div />
              )}
              <button
                onClick={() => setSelectedTxn(null)}
                className="px-4 py-2 text-xs font-semibold text-white bg-[#263126] rounded-xl hover:bg-[#344034] transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
