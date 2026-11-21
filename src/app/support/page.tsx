'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  HelpCircle,
  MessageSquare,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  Shield,
  X,
} from 'lucide-react';
import { toast } from 'sonner';

export default function SupportDeskPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [category, setCategory] = useState('examination');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');

  const [tickets, setTickets] = useState([
    {
      id: 'FORT-SUP-2026-000001',
      category: 'examination',
      subject: 'Inquiry regarding OMR PDF bubble resolution on mobile devices',
      status: 'resolved',
      createdAt: '2026-11-20',
      messagesCount: 2,
    },
  ]);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) {
      toast.error('Please provide a subject and detailed description.');
      return;
    }

    const newTicketId = `FORT-SUP-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newTicket = {
      id: newTicketId,
      category,
      subject,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      messagesCount: 1,
    };

    setTickets([newTicket, ...tickets]);
    setShowCreateModal(false);
    setSubject('');
    setDescription('');
    toast.success(`Support ticket ${newTicketId} created successfully.`);
  };

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E9EEF1] px-3 py-1 text-xs font-semibold text-[#20252B]">
                SUPPORT & GRIEVANCE
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-serif">
              Candidate Help & Ticket Desk
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
              Direct communication line to academic evaluators and technical engineering staff.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#9CC6E0] px-4 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#C90026] transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Open Support Ticket</span>
          </button>
        </div>

        {/* Existing Tickets List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#20252B]">
            Your Support Inquiries
          </h2>

          <div className="rounded-2xl border border-[#DCE2E6] bg-white divide-y divide-[#DCE2E6] shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-[#F1F3F4]/60 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#20252B]">{t.id}</span>
                    <span className="rounded-full bg-[#F1F3F4] border border-[#DCE2E6] px-2 py-0.5 text-[10px] uppercase font-bold text-[#66727D]">
                      {t.category}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === 'resolved'
                          ? 'bg-[#E9EEF1] text-[#20252B]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#20252B]">{t.subject}</h3>
                  <div className="mt-1 text-[11px] text-[#66727D]">
                    Opened on {t.createdAt} • {t.messagesCount} message(s)
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#66727D]">Assigned to: </span>
                  <strong className="text-[#20252B]">Academic Helpdesk</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#20252B]/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
                <h3 className="text-base font-bold text-[#20252B]">Open Support Ticket</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-[#66727D] hover:text-[#20252B]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-2 text-xs text-[#66727D]">
                Submit your inquiry regarding examinations, scoring, OMR, or payment transactions.
              </p>

              <form onSubmit={handleCreateTicket} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[#66727D] font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-[#20252B] focus:border-[#9CC6E0] focus:outline-none"
                  >
                    <option value="examination">Examination & Questions</option>
                    <option value="omr">OMR Sheet & Shading</option>
                    <option value="payment">Payment & Entitlements</option>
                    <option value="results">Scoring & Evaluation</option>
                    <option value="account">Account & Profile</option>
                    <option value="technical">Technical Bug or Issue</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[#66727D] font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the issue"
                    className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#66727D] font-medium">Details & Explanation</label>
                  <textarea
                    rows={5}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide full details, question number or transaction order reference..."
                    className="mt-1.5 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-[#20252B] placeholder-[#66727D] focus:border-[#9CC6E0] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] py-2.5 font-semibold text-[#20252B] hover:bg-[#E9EEF1]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#9CC6E0] py-2.5 font-bold text-[#20252B] hover:bg-[#C90026] transition-colors shadow-sm"
                  >
                    Submit Ticket
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
