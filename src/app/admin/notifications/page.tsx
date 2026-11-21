'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  Plus,
  Search,
  Send,
  Users,
  AlertCircle,
  CheckCircle2,
  Clock,
  Trash2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { InAppNotification } from '@/types/admin';
import { getStoredNotifications, saveStoredNotifications } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState<InAppNotification[]>([]);
  const [search, setSearch] = useState('');
  const [showComposeModal, setShowComposeModal] = useState(false);

  // Form
  const [formData, setFormData] = useState<{
    title: string;
    message: string;
    targetAudience: InAppNotification['targetAudience'];
    priority: InAppNotification['priority'];
    actionUrl: string;
  }>({
    title: '',
    message: '',
    targetAudience: 'all_students',
    priority: 'normal',
    actionUrl: '/dashboard',
  });

  useEffect(() => {
    setNotifications(getStoredNotifications());
  }, []);

  const filteredNotifications = notifications.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.message.toLowerCase().includes(search.toLowerCase())
  );

  const handleSendNotification = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.message) {
      toast.error('Title and message are required.');
      return;
    }

    const newNotif: InAppNotification = {
      id: `notif_${Date.now()}`,
      title: formData.title,
      message: formData.message,
      targetAudience: formData.targetAudience,
      priority: formData.priority,
      actionUrl: formData.actionUrl,
      sentAt: new Date().toISOString(),
      sentBy: 'Super Admin',
      readCount: 0,
      deliveredCount: 4218,
      status: 'sent',
    };

    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveStoredNotifications(updated);

    logAdminAction({
      action: 'NOTIFICATION_SENT',
      resource_type: 'notification',
      resource_id: newNotif.id,
      change_summary: `Dispatched notification "${formData.title}" to ${formData.targetAudience.replace('_', ' ')}`,
    });

    toast.success(`Notification broadcasted to ${formData.targetAudience.replace('_', ' ')}`);
    setShowComposeModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    saveStoredNotifications(updated);
    logAdminAction({
      action: 'NOTIFICATION_DELETED',
      resource_type: 'notification',
      resource_id: id,
      change_summary: `Removed notification ${id}`,
    });
    toast.info('Notification archived.');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">In-App Notification Dispatcher</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Broadcast announcements, mock test alerts, and critical advisories to students in real time.
          </p>
        </div>
        <button
          onClick={() => setShowComposeModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Send className="h-4 w-4" />
          Compose Notification
        </button>
      </div>

      {/* Search Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            placeholder="Search notifications by title or message..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] pl-10 pr-4 py-2 text-xs text-[#20252B] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CC6E0]"
          />
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="divide-y divide-[#DCE2E6]">
          {filteredNotifications.map((n) => (
            <div key={n.id} className="p-5 hover:bg-[#F1F3F4]/50 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span
                    className={cn(
                      'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                      n.priority === 'urgent' && 'bg-[#E4002B]/15 text-[#E4002B]',
                      n.priority === 'high' && 'bg-amber-100 text-amber-800',
                      n.priority === 'normal' && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                      n.priority === 'low' && 'bg-[#66727D]/15 text-[#66727D]'
                    )}
                  >
                    {n.priority}
                  </span>
                  <span className="text-[11px] font-semibold text-[#52584E] bg-[#F1F3F4] px-2 py-0.5 rounded border border-[#DCE2E6]">
                    Audience: {n.targetAudience.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] text-[#66727D] font-mono">
                    {n.sentAt.split('T')[0]}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#20252B]">{n.title}</h3>
                <p className="text-xs text-[#66727D] leading-relaxed">{n.message}</p>
                {n.actionUrl && (
                  <div className="text-[11px] font-mono text-[#9CC6E0]">Link: {n.actionUrl}</div>
                )}
              </div>

              <div className="flex items-center md:flex-col md:items-end justify-between gap-2 shrink-0">
                <div className="text-right">
                  <div className="text-xs font-bold text-[#20252B]">
                    {n.readCount} / {n.deliveredCount} read
                  </div>
                  <div className="text-[10px] text-[#66727D]">
                    {Math.round((n.readCount / Math.max(1, n.deliveredCount)) * 100)}% engagement
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  className="p-1.5 rounded-lg border border-[#DCE2E6] text-[#66727D] hover:text-[#E4002B] hover:bg-[#E4002B]/10 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
          {filteredNotifications.length === 0 && (
            <div className="p-12 text-center text-[#66727D] text-xs">
              No notifications dispatched matching criteria.
            </div>
          )}
        </div>
      </div>

      {/* Compose Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <h3 className="text-lg font-bold text-[#20252B] font-serif">Compose In-App Notification</h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="rounded-lg p-2 text-[#66727D] hover:bg-[#F1F3F4] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSendNotification} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Target Cohort</label>
                <select
                  value={formData.targetAudience}
                  onChange={(e) =>
                    setFormData({ ...formData, targetAudience: e.target.value as any })
                  }
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                >
                  <option value="all_students">All Students (4,218 Candidates)</option>
                  <option value="neet_aspirants">NEET (UG) Medical Aspirants</option>
                  <option value="jee_aspirants">JEE Main / Advanced Aspirants</option>
                  <option value="upsc_aspirants">UPSC Civil Services Aspirants</option>
                  <option value="inactive_students">Inactive (No practice in 7 days)</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Priority</label>
                  <select
                    value={formData.priority}
                    onChange={(e) =>
                      setFormData({ ...formData, priority: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  >
                    <option value="normal">Normal</option>
                    <option value="high">High</option>
                    <option value="urgent">Urgent</option>
                    <option value="low">Low</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Action Link (Optional)</label>
                  <input
                    type="text"
                    value={formData.actionUrl}
                    onChange={(e) => setFormData({ ...formData, actionUrl: e.target.value })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. All-India NEET Mock 3 Live This Weekend"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Notification Body</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide concise instructions or advisory information..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div className="flex items-center justify-between border-t border-[#DCE2E6] pt-4">
                <button
                  type="button"
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#20252B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#20252B] rounded-xl hover:bg-[#344034] transition-colors"
                >
                  Send Immediately
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
