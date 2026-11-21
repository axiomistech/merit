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
    <div className="bg-[#0B1020] text-[#F5F7FB] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded bg-[#6486C6]/20 px-2 py-0.5 text-xs font-bold text-[#6486C6]">
                SUPPORT & GRIEVANCE
              </span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
              Candidate Help & Ticket Desk
            </h1>
            <p className="text-xs text-[#A7B0C0]">
              Direct communication line to academic evaluators and technical engineering staff.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#6486C6] px-4 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            <Plus className="h-4 w-4" />
            <span>Open Support Ticket</span>
          </button>
        </div>

        {/* Existing Tickets List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#6486C6]">
            Your Support Inquiries
          </h2>

          <div className="rounded-xl border border-[#263554] bg-[#11182A] divide-y divide-[#263554] overflow-hidden">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#6486C6]">{t.id}</span>
                    <span className="rounded bg-[#172033] px-2 py-0.5 text-[10px] uppercase font-bold text-[#A7B0C0]">
                      {t.category}
                    </span>
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === 'resolved'
                          ? 'bg-[#10B981]/20 text-[#10B981]'
                          : 'bg-amber-400/20 text-amber-300'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#F5F7FB]">{t.subject}</h3>
                  <div className="mt-1 text-[11px] text-[#7C8799]">
                    Opened on {t.createdAt} • {t.messagesCount} message(s)
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#A7B0C0]">Assigned to: </span>
                  <strong className="text-[#F5F7FB]">Academic Helpdesk</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#263554] bg-[#11182A] p-6 shadow-2xl">
              <h3 className="text-base font-bold text-[#F5F7FB]">Open Support Ticket</h3>
              <p className="mt-1 text-xs text-[#A7B0C0]">
                Submit your inquiry regarding examinations, scoring, OMR, or payment transactions.
              </p>

              <form onSubmit={handleCreateTicket} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[#A7B0C0] font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] focus:outline-none"
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
                  <label className="block text-[#A7B0C0] font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the issue"
                    className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] placeholder-[#7C8799] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#A7B0C0] font-medium">Details & Explanation</label>
                  <textarea
                    rows={5}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide full details, question number or transaction order reference..."
                    className="mt-1 w-full rounded-lg border border-[#263554] bg-[#172033] p-2.5 text-[#F5F7FB] placeholder-[#7C8799] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-xl border border-[#263554] bg-[#172033] py-2.5 font-semibold text-[#F5F7FB]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#6486C6] py-2.5 font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
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
