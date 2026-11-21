'use client';

import React, { useState, useEffect } from 'react';
import {
  LifeBuoy,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  MessageSquare,
  User,
  Shield,
  Filter,
  X,
  Send,
  Lock,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SupportTicketItem } from '@/types/admin';
import { getStoredSupportTickets, saveStoredSupportTickets } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminSupportPage() {
  const [tickets, setTickets] = useState<SupportTicketItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [selectedTicket, setSelectedTicket] = useState<SupportTicketItem | null>(null);

  // Reply state
  const [replyText, setReplyText] = useState('');
  const [internalNoteText, setInternalNoteText] = useState('');

  useEffect(() => {
    setTickets(getStoredSupportTickets());
  }, []);

  const filteredTickets = tickets.filter((t) => {
    const matchesSearch =
      t.ticket_number.toLowerCase().includes(search.toLowerCase()) ||
      t.student_name.toLowerCase().includes(search.toLowerCase()) ||
      t.student_registration_id.toLowerCase().includes(search.toLowerCase()) ||
      t.subject.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleOpenTicket = (t: SupportTicketItem) => {
    setSelectedTicket(t);
    setReplyText('');
    setInternalNoteText('');
  };

  const handleSendReply = () => {
    if (!selectedTicket || !replyText.trim()) return;

    const updated = tickets.map((item) => {
      if (item.id === selectedTicket.id) {
        return {
          ...item,
          status: 'waiting_for_student' as const,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    setTickets(updated);
    saveStoredSupportTickets(updated);
    logAdminAction({
      action: 'SUPPORT_TICKET_REPLIED',
      resource_type: 'support_ticket',
      resource_id: selectedTicket.ticket_number,
      change_summary: `Replied to student on ticket ${selectedTicket.ticket_number}`,
    });

    toast.success(`Reply emailed to ${selectedTicket.student_email}`);
    setSelectedTicket((prev) => (prev ? { ...prev, status: 'waiting_for_student' } : null));
    setReplyText('');
  };

  const handleAddInternalNote = () => {
    if (!selectedTicket || !internalNoteText.trim()) return;

    const note = `[${new Date().toISOString().substring(11, 16)}]: ${internalNoteText.trim()}`;
    const updated = tickets.map((item) => {
      if (item.id === selectedTicket.id) {
        return {
          ...item,
          internal_notes: [...(item.internal_notes || []), note],
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    setTickets(updated);
    saveStoredSupportTickets(updated);
    toast.info('Staff internal note logged.');
    setSelectedTicket((prev) =>
      prev ? { ...prev, internal_notes: [...(prev.internal_notes || []), note] } : null
    );
    setInternalNoteText('');
  };

  const handleResolveTicket = (ticketId: string) => {
    const updated = tickets.map((item) => {
      if (item.id === ticketId) {
        return {
          ...item,
          status: 'resolved' as const,
          updated_at: new Date().toISOString(),
        };
      }
      return item;
    });

    setTickets(updated);
    saveStoredSupportTickets(updated);
    logAdminAction({
      action: 'SUPPORT_TICKET_RESOLVED',
      resource_type: 'support_ticket',
      resource_id: ticketId,
      change_summary: `Resolved support ticket ${ticketId}`,
    });
    toast.success('Support ticket marked as resolved.');
    if (selectedTicket?.id === ticketId) {
      setSelectedTicket((prev) => (prev ? { ...prev, status: 'resolved' } : null));
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Support Helpdesk & Triage</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Resolve student inquiry tickets, question errors, payment claims, and OMR discrepancy reports.
          </p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Open Tickets</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#E8412C]">
            {tickets.filter((t) => t.status === 'open' || t.status === 'new').length}
          </div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Require initial triage</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">In Progress</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">
            {tickets.filter((t) => t.status === 'in_progress').length}
          </div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Under staff evaluation</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Avg Response Time</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#263126]">18 mins</div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Within 2h SLA standard</div>
        </div>

        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
          <div className="text-[11px] font-semibold text-[#73786E] uppercase tracking-wider">Resolution Rate</div>
          <div className="mt-1 text-2xl font-bold font-mono text-[#3B4C30]">96.4%</div>
          <div className="text-[10px] text-[#73786E] mt-0.5">Candidate satisfaction</div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
          <input
            type="text"
            placeholder="Search ticket #, student name, registration ID, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#73786E]">Status:</span>
          {['all', 'new', 'open', 'in_progress', 'resolved'].map((st) => (
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

      {/* Tickets Table */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Ticket #</th>
                <th className="p-4 font-semibold">Student & ID</th>
                <th className="p-4 font-semibold">Subject & Category</th>
                <th className="p-4 font-semibold">Priority</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold">Updated</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4]">
              {filteredTickets.map((t) => (
                <tr key={t.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-mono font-bold text-[#263126]">{t.ticket_number}</td>
                  <td className="p-4">
                    <div className="font-semibold text-[#263126]">{t.student_name}</div>
                    <div className="font-mono text-[10px] text-[#73786E]">{t.student_registration_id}</div>
                  </td>
                  <td className="p-4 max-w-sm">
                    <div className="font-semibold text-[#263126] truncate">{t.subject}</div>
                    <div className="text-[10px] font-mono uppercase text-[#73786E] mt-0.5">
                      {t.category.replace('_', ' ')}
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        t.priority === 'urgent' && 'bg-[#E8412C]/15 text-[#E8412C]',
                        t.priority === 'high' && 'bg-amber-100 text-amber-800',
                        t.priority === 'normal' && 'bg-[#9CAF88]/20 text-[#3B4C30]',
                        t.priority === 'low' && 'bg-[#73786E]/15 text-[#73786E]'
                      )}
                    >
                      {t.priority}
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        t.status === 'resolved' && 'bg-[#9CAF88]/20 text-[#3B4C30]',
                        t.status === 'in_progress' && 'bg-blue-100 text-blue-800',
                        t.status === 'waiting_for_student' && 'bg-purple-100 text-purple-800',
                        (t.status === 'new' || t.status === 'open') && 'bg-amber-100 text-amber-800'
                      )}
                    >
                      {t.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[11px] text-[#73786E]">
                    {t.updated_at.split('T')[0]}
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenTicket(t)}
                      className="px-3 py-1.5 rounded-lg border border-[#E6E5DE] text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF] transition-colors"
                    >
                      Open Ticket
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#73786E]">
                    No tickets found matching criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Ticket Drawer Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-3xl rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-sm text-[#263126]">
                    {selectedTicket.ticket_number}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                    {selectedTicket.category.replace('_', ' ')}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[#263126] mt-1">{selectedTicket.subject}</h3>
                <div className="text-xs text-[#73786E]">
                  From: {selectedTicket.student_name} ({selectedTicket.student_registration_id}) — {selectedTicket.student_email}
                </div>
              </div>
              <button
                onClick={() => setSelectedTicket(null)}
                className="rounded-lg p-2 text-[#73786E] hover:bg-[#F7F5EF] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Description */}
            <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF]/50 p-4 text-xs text-[#263126] leading-relaxed">
              <div className="font-semibold text-[#73786E] text-[10px] uppercase mb-1">Candidate Inquiry:</div>
              {selectedTicket.description}
            </div>

            {/* Internal Staff Notes */}
            {selectedTicket.internal_notes && selectedTicket.internal_notes.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 space-y-1.5 text-xs text-amber-900">
                <div className="font-bold text-[10px] uppercase flex items-center gap-1 text-amber-800">
                  <Lock className="h-3 w-3" />
                  Internal Staff Notes (Hidden from Student):
                </div>
                {selectedTicket.internal_notes.map((note, idx) => (
                  <div key={idx} className="font-mono text-[11px] text-amber-950">
                    • {note}
                  </div>
                ))}
              </div>
            )}

            {/* Staff Reply Box */}
            <div className="space-y-3 pt-2 border-t border-[#ECEAE4]">
              <div>
                <label className="block text-xs font-bold text-[#263126] mb-1">Reply to Student</label>
                <textarea
                  rows={3}
                  placeholder="Type official response sent to candidate's registered email..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                />
                <div className="flex justify-end mt-1.5">
                  <button
                    onClick={handleSendReply}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-[#263126] text-white text-xs font-semibold rounded-lg hover:bg-[#344034] transition-colors"
                  >
                    <Send className="h-3 w-3" />
                    Send Email Reply
                  </button>
                </div>
              </div>

              {/* Add Staff Note */}
              <div className="pt-2 border-t border-[#ECEAE4]">
                <label className="block text-[11px] font-bold text-[#73786E] mb-1">
                  Add Internal Staff Note
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="e.g. Verified transaction id on Razorpay portal. Resolved."
                    value={internalNoteText}
                    onChange={(e) => setInternalNoteText(e.target.value)}
                    className="flex-1 rounded-xl border border-[#E6E5DE] p-2 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                  <button
                    onClick={handleAddInternalNote}
                    className="px-3 py-1.5 rounded-xl border border-[#E6E5DE] text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF] transition-colors"
                  >
                    Save Note
                  </button>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-[#ECEAE4] pt-4">
              <button
                type="button"
                onClick={() => setSelectedTicket(null)}
                className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#263126]"
              >
                Close
              </button>
              {selectedTicket.status !== 'resolved' && (
                <button
                  type="button"
                  onClick={() => handleResolveTicket(selectedTicket.id)}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#9CAF88] rounded-xl hover:bg-[#8ea07a] transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Mark Ticket as Resolved
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
