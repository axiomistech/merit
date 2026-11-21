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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="rounded-full bg-[#E9EEE3] px-3 py-1 text-xs font-semibold text-[#758B62]">
                SUPPORT & GRIEVANCE
              </span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold text-[#263126] font-serif">
              Candidate Help & Ticket Desk
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-[#73786E]">
              Direct communication line to academic evaluators and technical engineering staff.
            </p>
          </div>

          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-xl bg-[#9CAF88] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm"
          >
            <Plus className="h-4 w-4" />
            <span>Open Support Ticket</span>
          </button>
        </div>

        {/* Existing Tickets List */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-[#758B62]">
            Your Support Inquiries
          </h2>

          <div className="rounded-2xl border border-[#E6E5DE] bg-white divide-y divide-[#ECEAE4] shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
            {tickets.map((t) => (
              <div key={t.id} className="p-5 flex flex-wrap items-center justify-between gap-4 hover:bg-[#F7F5EF]/60 transition-colors">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-[#758B62]">{t.id}</span>
                    <span className="rounded-full bg-[#F7F5EF] border border-[#E6E5DE] px-2 py-0.5 text-[10px] uppercase font-bold text-[#73786E]">
                      {t.category}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                        t.status === 'resolved'
                          ? 'bg-[#E9EEE3] text-[#758B62]'
                          : 'bg-[#FEF3C7] text-[#92400E]'
                      }`}
                    >
                      {t.status}
                    </span>
                  </div>
                  <h3 className="mt-2 text-sm font-bold text-[#263126]">{t.subject}</h3>
                  <div className="mt-1 text-[11px] text-[#92958D]">
                    Opened on {t.createdAt} • {t.messagesCount} message(s)
                  </div>
                </div>

                <div className="text-xs">
                  <span className="text-[#73786E]">Assigned to: </span>
                  <strong className="text-[#263126]">Academic Helpdesk</strong>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Ticket Modal */}
        {showCreateModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#263126]/50 backdrop-blur-sm p-4">
            <div className="w-full max-w-lg rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
                <h3 className="text-base font-bold text-[#263126]">Open Support Ticket</h3>
                <button onClick={() => setShowCreateModal(false)} className="text-[#92958D] hover:text-[#263126]">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <p className="mt-2 text-xs text-[#73786E]">
                Submit your inquiry regarding examinations, scoring, OMR, or payment transactions.
              </p>

              <form onSubmit={handleCreateTicket} className="mt-6 space-y-4 text-xs">
                <div>
                  <label className="block text-[#73786E] font-medium">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1.5 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-[#263126] focus:border-[#9CAF88] focus:outline-none"
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
                  <label className="block text-[#73786E] font-medium">Subject</label>
                  <input
                    type="text"
                    required
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Brief description of the issue"
                    className="mt-1.5 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-[#73786E] font-medium">Details & Explanation</label>
                  <textarea
                    rows={5}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide full details, question number or transaction order reference..."
                    className="mt-1.5 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-[#263126] placeholder-[#92958D] focus:border-[#9CAF88] focus:outline-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] py-2.5 font-semibold text-[#263126] hover:bg-[#E9EEE3]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-xl bg-[#9CAF88] py-2.5 font-bold text-white hover:bg-[#8ea07a] transition-colors shadow-sm"
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
