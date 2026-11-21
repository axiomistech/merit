'use client';

import React, { useState, useEffect } from 'react';
import {
  RotateCcw,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  FileText,
  DollarSign,
  Shield,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { RefundRecord } from '@/types/admin';
import { getStoredRefunds, saveStoredRefunds } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminRefundsPage() {
  const [refunds, setRefunds] = useState<RefundRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'processed' | 'pending_approval' | 'rejected'>('all');

  useEffect(() => {
    setRefunds(getStoredRefunds());
  }, []);

  const filteredRefunds = refunds.filter((r) => {
    const matchesSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentEmail.toLowerCase().includes(search.toLowerCase()) ||
      r.paymentId.toLowerCase().includes(search.toLowerCase()) ||
      r.orderId.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleApproveRefund = (ref: RefundRecord) => {
    const confirm = window.confirm(`Approve refund of ₹${ref.amount} for ${ref.studentName}?`);
    if (!confirm) return;

    const updated = refunds.map((item) => {
      if (item.id === ref.id) {
        return {
          ...item,
          status: 'processed' as const,
          processed_at: new Date().toISOString(),
          processed_by: 'Finance Super Admin',
        };
      }
      return item;
    });

    setRefunds(updated);
    saveStoredRefunds(updated);
    logAdminAction({
      action: 'REFUND_APPROVED',
      resource_type: 'refund',
      resource_id: ref.id,
      change_summary: `Approved refund of ₹${ref.amount} for ${ref.studentName}`,
    });
    toast.success(`Refund of ₹${ref.amount} approved and settled.`);
  };

  const handleRejectRefund = (ref: RefundRecord) => {
    const reason = window.prompt('Enter rejection reason for audit log:');
    if (reason === null) return;

    const updated = refunds.map((item) => {
      if (item.id === ref.id) {
        return {
          ...item,
          status: 'rejected' as const,
          notes: `${item.notes || ''} [Rejected: ${reason}]`,
          processed_at: new Date().toISOString(),
          processed_by: 'Finance Super Admin',
        };
      }
      return item;
    });

    setRefunds(updated);
    saveStoredRefunds(updated);
    logAdminAction({
      action: 'REFUND_REJECTED',
      resource_type: 'refund',
      resource_id: ref.id,
      change_summary: `Rejected refund of ₹${ref.amount} for ${ref.studentName}. Reason: ${reason}`,
    });
    toast.info(`Refund request rejected.`);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Refund Management & Audit</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Inspect refund requests, process Razorpay reversals, and manage credit reconciliation.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#66727D] uppercase tracking-wider">Total Processed</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#20252B]">
            ₹{refunds.reduce((acc, r) => (r.status === 'processed' ? acc + r.amount : acc), 0)}
          </div>
          <div className="text-[10px] text-[#66727D] mt-0.5">Settled back to original source</div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#66727D] uppercase tracking-wider">Pending Review</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#E4002B]">
            {refunds.filter((r) => r.status === 'pending_approval').length}
          </div>
          <div className="text-[10px] text-[#66727D] mt-0.5">Awaiting finance approval</div>
        </div>

        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#66727D] uppercase tracking-wider">Average Settlement</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#20252B]">&lt; 2 Hours</div>
          <div className="text-[10px] text-[#66727D] mt-0.5">Automated Razorpay processing</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            placeholder="Search student name, email, payment ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] pl-10 pr-4 py-2 text-xs text-[#20252B] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CC6E0]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#66727D]">Status:</span>
          {(['all', 'processed', 'pending_approval', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors',
                statusFilter === st
                  ? 'bg-[#20252B] text-white border-[#20252B]'
                  : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
              )}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-4 font-semibold">Refund ID & Order</th>
                <th className="p-4 font-semibold">Candidate</th>
                <th className="p-4 font-semibold">Amount</th>
                <th className="p-4 font-semibold">Reason & Notes</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Processed Details</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filteredRefunds.map((r) => (
                <tr key={r.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                  <td className="p-4">
                    <div className="font-mono font-bold text-[#20252B]">{r.id}</div>
                    <div className="font-mono text-[10px] text-[#66727D]">{r.paymentId}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-[#20252B]">{r.studentName}</div>
                    <div className="text-[11px] text-[#66727D]">{r.studentEmail}</div>
                  </td>
                  <td className="p-4 font-bold font-mono text-base text-[#20252B]">₹{r.amount}</td>
                  <td className="p-4 max-w-xs">
                    <div className="font-semibold text-[#20252B] capitalize">
                      {r.reason.replace('_', ' ')}
                    </div>
                    {r.notes && <div className="text-[11px] text-[#66727D] mt-0.5 line-clamp-2">{r.notes}</div>}
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        r.status === 'processed' && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                        r.status === 'pending_approval' && 'bg-amber-100 text-amber-800',
                        r.status === 'rejected' && 'bg-[#E4002B]/15 text-[#E4002B]'
                      )}
                    >
                      {r.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 text-[11px] text-[#66727D]">
                    {r.processed_by ? (
                      <>
                        <div className="text-[#20252B] font-medium">{r.processed_by}</div>
                        <div className="font-mono text-[10px]">{r.processed_at?.split('T')[0]}</div>
                      </>
                    ) : (
                      <span className="italic">Awaiting action</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    {r.status === 'pending_approval' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleApproveRefund(r)}
                          className="px-2.5 py-1 rounded-lg bg-[#20252B] text-white text-[11px] font-semibold hover:bg-[#344034] transition-colors"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleRejectRefund(r)}
                          className="px-2.5 py-1 rounded-lg border border-[#DCE2E6] text-[11px] font-semibold text-[#E4002B] hover:bg-[#E4002B]/10 transition-colors"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-[11px] text-[#A3A89E]">Completed</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRefunds.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#66727D]">
                    No refund records found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
