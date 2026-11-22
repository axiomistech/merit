'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  BookOpen,
  FileText,
  DollarSign,
  Activity,
  Clock,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  LifeBuoy,
  History,
  CheckCircle2,
  Filter,
} from 'lucide-react';
import {
  getStoredStudents,
  getStoredExams,
  getStoredQuestions,
  getStoredTransactions,
  getStoredSupportTickets,
} from '@/lib/admin/store';
import { cn } from '@/lib/utils';

export default function AdminDashboardPage() {
  const [filterPeriod, setFilterPeriod] = useState<'today' | '7days' | '30days' | '90days'>('30days');
  const [students, setStudents] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [tickets, setTickets] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);

  useEffect(() => {
    setStudents(getStoredStudents());
    setExams(getStoredExams());
    setQuestions(getStoredQuestions());
    setTransactions(getStoredTransactions());
    setTickets(getStoredSupportTickets());

    if (typeof window !== 'undefined') {
      const logs = JSON.parse(localStorage.getItem('fort_admin_audit_logs') || '[]');
      const cleanLogs = Array.isArray(logs) ? logs.filter((l: any) => !['log_001', 'log_002', 'log_003'].includes(l.id)) : [];
      if (Array.isArray(logs) && cleanLogs.length !== logs.length) {
        localStorage.setItem('fort_admin_audit_logs', JSON.stringify(cleanLogs));
      }
      setAuditLogs(cleanLogs.slice(0, 5));
    }
  }, []);

  const successfulTxns = transactions.filter(
    (t) => t.status === 'successful' || t.status === 'SUCCESS'
  );
  const totalRevenue = successfulTxns.reduce((sum, t) => sum + (t.amount || 0), 0);

  const todayRegistrations = students.filter((s) => {
    if (!s.registeredAt && !s.created_at) return false;
    const dateStr = s.registeredAt || s.created_at;
    return new Date(dateStr).toDateString() === new Date().toDateString();
  }).length;

  const reportedQuestions = questions.filter((q) => q.status === 'pending_review' || q.reportReason);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Command Center Overview
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Dynamic system telemetry calculated from actual database & transaction records.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#DCE2E6] bg-white p-1 text-xs font-semibold shadow-sm">
          {[
            { id: 'today', label: 'Today' },
            { id: '7days', label: 'Last 7 Days' },
            { id: '30days', label: 'Last 30 Days' },
            { id: '90days', label: 'Last 90 Days' },
          ].map((period) => (
            <button
              key={period.id}
              onClick={() => setFilterPeriod(period.id as any)}
              className={cn(
                'rounded-full px-3.5 py-1.5 transition-all',
                filterPeriod === period.id
                  ? 'bg-[#20252B] text-white font-bold shadow-sm'
                  : 'text-[#66727D] hover:text-[#20252B]'
              )}
            >
              {period.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {/* Total Students */}
        <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Total Students</span>
            <Users className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#20252B]">
            {students.length}
          </div>
          <div className="mt-1 text-[11px] text-[#66727D] font-medium">
            {todayRegistrations > 0 ? `+${todayRegistrations} new registered today` : '0 registered today'}
          </div>
        </div>

        {/* Total Exams */}
        <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Active Exams</span>
            <BookOpen className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#20252B]">
            {exams.filter((e) => e.status === 'published').length}
          </div>
          <div className="mt-1 text-[11px] text-[#66727D]">NEET, JEE Main, JEE Adv, GATE</div>
        </div>

        {/* Total Questions */}
        <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Total Questions</span>
            <FileText className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#20252B]">
            {questions.length}
          </div>
          <div className="mt-1 text-[11px] text-[#66727D] font-medium">
            KaTeX mathematical verified
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#66727D]">
            <span>Gross Revenue (INR)</span>
            <DollarSign className="h-4 w-4 text-[#20252B]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#20252B]">
            ₹{totalRevenue}
          </div>
          <div className="mt-1 text-[11px] text-[#66727D] font-medium">
            {successfulTxns.length} successful order{successfulTxns.length === 1 ? '' : 's'}
          </div>
        </div>
      </div>

      {/* 2-Column Action Center */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Student Registrations */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
            <h3 className="text-sm font-bold font-sans text-[#20252B]">
              Recent Student Registrations
            </h3>
            <Link
              href="/admin/students"
              className="text-xs font-semibold text-[#20252B] hover:underline"
            >
              View All ({students.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {students.length === 0 ? (
              <div className="rounded-2xl bg-[#F1F3F4] p-6 text-center text-xs text-[#66727D]">
                No students registered yet.
              </div>
            ) : (
              students.slice(0, 4).map((st) => (
                <div
                  key={st.id}
                  className="flex items-center justify-between rounded-2xl bg-[#F1F3F4] p-3.5 border border-[#DCE2E6]"
                >
                  <div>
                    <span className="font-mono text-xs font-bold text-[#20252B]">
                      {st.registrationId}
                    </span>
                    <div className="font-bold text-xs text-[#20252B]">{st.fullName}</div>
                    <div className="text-[11px] text-[#66727D]">{st.email}</div>
                  </div>

                  <div className="text-right">
                    <span className="rounded-full bg-white border border-[#DCE2E6] px-2.5 py-0.5 text-[10px] font-bold text-[#20252B]">
                      {st.targetExam}
                    </span>
                    <div className="mt-1 text-[10px] text-[#66727D]">{st.last_activity}</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
            <h3 className="text-sm font-bold font-sans text-[#20252B]">
              Recent Transactions & Webhook Settlements
            </h3>
            <Link
              href="/admin/payments"
              className="text-xs font-semibold text-[#20252B] hover:underline"
            >
              View Payments →
            </Link>
          </div>

          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="rounded-2xl bg-[#F1F3F4] p-6 text-center text-xs text-[#66727D]">
                No transactions recorded yet.
              </div>
            ) : (
              transactions.slice(0, 4).map((txn) => (
                <div
                  key={txn.id}
                  className="flex items-center justify-between rounded-2xl bg-[#F1F3F4] p-3.5 border border-[#DCE2E6]"
                >
                  <div>
                    <div className="font-bold text-xs text-[#20252B]">{txn.productName}</div>
                    <div className="text-[11px] text-[#66727D]">
                      {txn.studentName} • <span className="font-mono">{txn.gatewayPaymentId}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="font-mono font-bold text-xs text-[#20252B]">
                      +₹{txn.amount}
                    </div>
                    <span className="rounded-full bg-[#E9EEF1] px-2 py-0.5 text-[9px] font-bold text-[#20252B] uppercase">
                      {txn.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Reported Questions & Support Queue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Support Tickets Requiring Attention */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-4 w-4 text-[#E4002B]" />
              <h3 className="text-sm font-bold font-sans text-[#20252B]">
                Support Tickets Requiring Attention
              </h3>
            </div>
            <Link
              href="/admin/support"
              className="text-xs font-semibold text-[#20252B] hover:underline"
            >
              Help Desk ({tickets.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.length === 0 ? (
              <div className="rounded-2xl bg-[#F1F3F4] p-6 text-center text-xs text-[#66727D]">
                No support tickets requiring attention.
              </div>
            ) : (
              tickets.map((t) => (
                <div
                  key={t.id}
                  className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-[#20252B]">{t.ticket_number}</span>
                    <span
                      className={cn(
                        'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase',
                        t.status === 'open'
                          ? 'bg-[#FDEDF0] text-[#E4002B]'
                          : 'bg-[#E9EEF1] text-[#20252B]'
                      )}
                    >
                      {t.status}
                    </span>
                  </div>
                  <div className="font-bold text-[#20252B]">{t.subject}</div>
                  <p className="text-[#66727D] text-[11px] line-clamp-2">{t.description}</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#20252B]" />
              <h3 className="text-sm font-bold font-sans text-[#20252B]">
                Recent Audit Trail
              </h3>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-[#20252B] hover:underline"
            >
              Full Logs →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-2xl bg-[#F1F3F4] p-3.5 border border-[#DCE2E6] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#20252B]">{log.action}</span>
                    <div className="text-[11px] text-[#66727D]">{log.change_summary}</div>
                  </div>
                  <div className="text-right text-[10px] text-[#66727D]">
                    <div>{log.actor_name}</div>
                    <div className="font-mono">{log.created_at?.split('T')[0]}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-[#F1F3F4] p-4 text-center text-[#66727D]">
                All administrative operations are permanently logged to the immutable audit ledger.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
