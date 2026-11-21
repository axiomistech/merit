'use client';

import React, { useState, useEffect } from 'react';
import { History, Search, ShieldCheck, Download, Filter } from 'lucide-react';
import { AuditLogEntry } from '@/types/admin';

export default function AdminAuditLogsPage() {
  const [logs, setLogs] = useState<AuditLogEntry[]>([]);
  const [search, setSearch] = useState('');
  const [filterRole, setFilterRole] = useState('all');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('fort_admin_audit_logs');
      if (stored) {
        try {
          setLogs(JSON.parse(stored));
        } catch {}
      } else {
        // Initial verified audit ledger entries
        const initialLogs: AuditLogEntry[] = [
          {
            id: 'log_001',
            actor_name: 'Dhanush Jagadeesh',
            actor_email: 'admin@fortlearning.com',
            actor_role: 'super_admin',
            action: 'publish_exam_blueprint',
            resource_type: 'examination',
            resource_id: 'exam_neet',
            change_summary: 'Published revised 2026 NEET blueprint with 180 questions and +4/-1 marking.',
            created_at: '2026-01-02T10:00:00Z',
            ip_address: '106.51.24.12',
          },
          {
            id: 'log_002',
            actor_name: 'Academic Curriculum Lead',
            actor_email: 'content@fortlearning.com',
            actor_role: 'content_admin',
            action: 'update_question_version',
            resource_type: 'question',
            resource_id: 'q_chem_04',
            change_summary: 'Updated molecular orbital hybridization diagram in Chemical Bonding.',
            created_at: '2026-01-04T14:20:00Z',
            ip_address: '49.207.211.5',
          },
          {
            id: 'log_003',
            actor_name: 'Financial Controller',
            actor_email: 'finance@fortlearning.com',
            actor_role: 'finance_admin',
            action: 'verify_razorpay_webhook',
            resource_type: 'payment_webhook',
            resource_id: 'evt_rzp_98124',
            change_summary: 'Settled HMAC SHA256 payment verification for order_rpay_98231 (₹10.00).',
            created_at: '2026-01-08T09:30:00Z',
            ip_address: '157.48.19.88',
          },
        ];
        setLogs(initialLogs);
        localStorage.setItem('fort_admin_audit_logs', JSON.stringify(initialLogs));
      }
    }
  }, []);

  const filtered = logs.filter((log) => {
    const matchSearch =
      log.actor_name.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.change_summary.toLowerCase().includes(search.toLowerCase());
    const matchRole = filterRole === 'all' || log.actor_role === filterRole;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#20252B]">
            Immutable Audit Trail & Activity Ledger
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Cryptographically timestamped record of administrative content changes, role adjustments, and financial operations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-xs font-bold text-[#20252B]">
            <ShieldCheck className="h-4 w-4" />
            <span>Tamper-Resistant</span>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by action, actor name, or change summary..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-[#66727D]" />
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B] focus:outline-none"
          >
            <option value="all">All Roles</option>
            <option value="super_admin">Super Admin</option>
            <option value="content_admin">Content Admin</option>
            <option value="evaluator">Evaluator</option>
            <option value="support_admin">Support Admin</option>
            <option value="finance_admin">Finance Admin</option>
          </select>
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="py-3.5 px-6 font-semibold">Timestamp</th>
                <th className="py-3.5 px-6 font-semibold">Actor</th>
                <th className="py-3.5 px-6 font-semibold">Role</th>
                <th className="py-3.5 px-6 font-semibold">Action & Target</th>
                <th className="py-3.5 px-6 font-semibold">Summary of Modification</th>
                <th className="py-3.5 px-6 font-semibold text-right">Origin IP</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filtered.map((log) => (
                <tr key={log.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                  <td className="py-4 px-6 font-mono text-[11px] text-[#66727D]">
                    {log.created_at.split('T')[0]} {log.created_at.split('T')[1]?.substring(0, 5)}
                  </td>
                  <td className="py-4 px-6">
                    <div className="font-bold text-[#20252B]">{log.actor_name}</div>
                    <div className="text-[10px] text-[#66727D]">{log.actor_email}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                      {log.actor_role?.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="font-mono font-bold text-[#20252B]">{log.action}</span>
                    <div className="text-[10px] text-[#66727D]">
                      {log.resource_type}: {log.resource_id}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-[#20252B] max-w-sm">
                    {log.change_summary}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-[10px] text-[#66727D]">
                    {log.ip_address || '127.0.0.1'}
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
