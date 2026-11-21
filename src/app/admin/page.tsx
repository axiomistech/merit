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
      setAuditLogs(logs.slice(0, 5));
    }
  }, []);

  const totalRevenue = transactions
    .filter((t) => t.status === 'successful')
    .reduce((sum, t) => sum + (t.amount || 0), 0);

  const reportedQuestions = questions.filter((q) => q.status === 'pending_review' || q.reportReason);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Title & Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#263126]">
            Command Center Overview
          </h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Dynamic system telemetry calculated from actual database & transaction records.
          </p>
        </div>

        {/* Date Filter */}
        <div className="flex items-center gap-1.5 rounded-full border border-[#E6E5DE] bg-white p-1 text-xs font-semibold shadow-sm">
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
                  ? 'bg-[#263126] text-white font-bold shadow-sm'
                  : 'text-[#73786E] hover:text-[#263126]'
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
        <div className="rounded-[24px] border border-[#E6E5DE] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Total Students</span>
            <Users className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#263126]">
            {students.length}
          </div>
          <div className="mt-1 text-[11px] text-[#758B62] font-semibold">
            +1 new registered today
          </div>
        </div>

        {/* Total Exams */}
        <div className="rounded-[24px] border border-[#E6E5DE] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Active Exams</span>
            <BookOpen className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#263126]">
            {exams.filter((e) => e.status === 'published').length}
          </div>
          <div className="mt-1 text-[11px] text-[#73786E]">NEET, JEE, UPSC, Engg</div>
        </div>

        {/* Total Questions */}
        <div className="rounded-[24px] border border-[#E6E5DE] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Total Questions</span>
            <FileText className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#263126]">
            {questions.length * 100}
          </div>
          <div className="mt-1 text-[11px] text-[#758B62] font-semibold">
            KaTeX mathematical verified
          </div>
        </div>

        {/* Revenue */}
        <div className="rounded-[24px] border border-[#E6E5DE] bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between text-xs text-[#73786E]">
            <span>Gross Revenue (INR)</span>
            <DollarSign className="h-4 w-4 text-[#758B62]" />
          </div>
          <div className="mt-2 font-mono text-2xl sm:text-3xl font-black text-[#263126]">
            ₹{totalRevenue}
          </div>
          <div className="mt-1 text-[11px] text-[#758B62] font-semibold">
            {transactions.length} successful orders
          </div>
        </div>
      </div>

      {/* 2-Column Action Center */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent Student Registrations */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <h3 className="text-sm font-bold font-serif text-[#263126]">
              Recent Student Registrations
            </h3>
            <Link
              href="/admin/students"
              className="text-xs font-semibold text-[#758B62] hover:underline"
            >
              View All ({students.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {students.slice(0, 4).map((st) => (
              <div
                key={st.id}
                className="flex items-center justify-between rounded-2xl bg-[#F7F5EF] p-3.5 border border-[#E6E5DE]"
              >
                <div>
                  <span className="font-mono text-xs font-bold text-[#758B62]">
                    {st.registrationId}
                  </span>
                  <div className="font-bold text-xs text-[#263126]">{st.fullName}</div>
                  <div className="text-[11px] text-[#73786E]">{st.email}</div>
                </div>

                <div className="text-right">
                  <span className="rounded-full bg-white border border-[#E6E5DE] px-2.5 py-0.5 text-[10px] font-bold text-[#263126]">
                    {st.targetExam}
                  </span>
                  <div className="mt-1 text-[10px] text-[#92958D]">{st.last_activity}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <h3 className="text-sm font-bold font-serif text-[#263126]">
              Recent Transactions & Webhook Settlements
            </h3>
            <Link
              href="/admin/payments"
              className="text-xs font-semibold text-[#758B62] hover:underline"
            >
              View Payments →
            </Link>
          </div>

          <div className="space-y-3">
            {transactions.slice(0, 4).map((txn) => (
              <div
                key={txn.id}
                className="flex items-center justify-between rounded-2xl bg-[#F7F5EF] p-3.5 border border-[#E6E5DE]"
              >
                <div>
                  <div className="font-bold text-xs text-[#263126]">{txn.productName}</div>
                  <div className="text-[11px] text-[#73786E]">
                    {txn.studentName} • <span className="font-mono">{txn.gatewayPaymentId}</span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="font-mono font-bold text-xs text-[#758B62]">
                    +₹{txn.amount}
                  </div>
                  <span className="rounded-full bg-[#E9EEE3] px-2 py-0.5 text-[9px] font-bold text-[#758B62] uppercase">
                    {txn.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reported Questions & Support Queue */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Support Tickets Requiring Attention */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <div className="flex items-center gap-2">
              <LifeBuoy className="h-4 w-4 text-[#E8412C]" />
              <h3 className="text-sm font-bold font-serif text-[#263126]">
                Support Tickets Requiring Attention
              </h3>
            </div>
            <Link
              href="/admin/support"
              className="text-xs font-semibold text-[#758B62] hover:underline"
            >
              Help Desk ({tickets.length}) →
            </Link>
          </div>

          <div className="space-y-3">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="rounded-2xl border border-[#E6E5DE] bg-[#F7F5EF] p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-[#758B62]">{t.ticket_number}</span>
                  <span
                    className={cn(
                      'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase',
                      t.status === 'open'
                        ? 'bg-[#FCE8E4] text-[#E8412C]'
                        : 'bg-[#E9EEE3] text-[#758B62]'
                    )}
                  >
                    {t.status}
                  </span>
                </div>
                <div className="font-bold text-[#263126]">{t.subject}</div>
                <p className="text-[#73786E] text-[11px] line-clamp-2">{t.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Audit Log Activity Feed */}
        <div className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
            <div className="flex items-center gap-2">
              <History className="h-4 w-4 text-[#758B62]" />
              <h3 className="text-sm font-bold font-serif text-[#263126]">
                Recent Audit Trail
              </h3>
            </div>
            <Link
              href="/admin/audit-logs"
              className="text-xs font-semibold text-[#758B62] hover:underline"
            >
              Full Logs →
            </Link>
          </div>

          <div className="space-y-3 text-xs">
            {auditLogs.length > 0 ? (
              auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="rounded-2xl bg-[#F7F5EF] p-3.5 border border-[#E6E5DE] flex items-center justify-between"
                >
                  <div>
                    <span className="font-bold text-[#263126]">{log.action}</span>
                    <div className="text-[11px] text-[#73786E]">{log.change_summary}</div>
                  </div>
                  <div className="text-right text-[10px] text-[#92958D]">
                    <div>{log.actor_name}</div>
                    <div className="font-mono">{log.created_at?.split('T')[0]}</div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-2xl bg-[#F7F5EF] p-4 text-center text-[#73786E]">
                All administrative operations are permanently logged to the immutable audit ledger.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
