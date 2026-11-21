'use client';

import React, { useState, useEffect } from 'react';
import {
  Megaphone,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Clock,
  Edit,
  Trash2,
  X,
  Layout,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnnouncementBanner } from '@/types/admin';
import { getStoredAnnouncements, saveStoredAnnouncements } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<AnnouncementBanner[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingBanner, setEditingBanner] = useState<AnnouncementBanner | null>(null);

  // Form
  const [formData, setFormData] = useState<{
    title: string;
    content: string;
    badgeText: string;
    bannerType: AnnouncementBanner['bannerType'];
    targetExam: AnnouncementBanner['targetExam'];
    placement: AnnouncementBanner['placement'];
    startDate: string;
    endDate: string;
    dismissible: boolean;
    isActive: boolean;
  }>({
    title: '',
    content: '',
    badgeText: 'Important',
    bannerType: 'info',
    targetExam: 'all',
    placement: 'header_top',
    startDate: '2026-11-21',
    endDate: '2026-12-31',
    dismissible: true,
    isActive: true,
  });

  useEffect(() => {
    setAnnouncements(getStoredAnnouncements());
  }, []);

  const filteredAnnouncements = announcements.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.content.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingBanner(null);
    setFormData({
      title: '',
      content: '',
      badgeText: 'Notice',
      bannerType: 'info',
      targetExam: 'all',
      placement: 'header_top',
      startDate: '2026-11-21',
      endDate: '2026-12-31',
      dismissible: true,
      isActive: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (b: AnnouncementBanner) => {
    setEditingBanner(b);
    setFormData({
      title: b.title,
      content: b.content,
      badgeText: b.badgeText || '',
      bannerType: b.bannerType,
      targetExam: b.targetExam,
      placement: b.placement,
      startDate: b.startDate.split('T')[0],
      endDate: b.endDate.split('T')[0],
      dismissible: b.dismissible,
      isActive: b.isActive,
    });
    setShowModal(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.content) {
      toast.error('Title and message content are required.');
      return;
    }

    if (editingBanner) {
      const updated = announcements.map((a) => {
        if (a.id === editingBanner.id) {
          return {
            ...a,
            title: formData.title,
            content: formData.content,
            badgeText: formData.badgeText,
            bannerType: formData.bannerType,
            targetExam: formData.targetExam,
            placement: formData.placement,
            startDate: `${formData.startDate}T00:00:00Z`,
            endDate: `${formData.endDate}T23:59:59Z`,
            dismissible: formData.dismissible,
            isActive: formData.isActive,
          };
        }
        return a;
      });
      setAnnouncements(updated);
      saveStoredAnnouncements(updated);
      logAdminAction({
        action: 'ANNOUNCEMENT_UPDATED',
        resource_type: 'announcement',
        resource_id: editingBanner.id,
        change_summary: `Updated announcement banner "${formData.title}"`,
      });
      toast.success('Announcement updated.');
    } else {
      const newBanner: AnnouncementBanner = {
        id: `ann_${Date.now()}`,
        title: formData.title,
        content: formData.content,
        badgeText: formData.badgeText,
        bannerType: formData.bannerType,
        targetExam: formData.targetExam,
        placement: formData.placement,
        startDate: `${formData.startDate}T00:00:00Z`,
        endDate: `${formData.endDate}T23:59:59Z`,
        dismissible: formData.dismissible,
        isActive: formData.isActive,
        created_at: new Date().toISOString(),
      };
      const updated = [newBanner, ...announcements];
      setAnnouncements(updated);
      saveStoredAnnouncements(updated);
      logAdminAction({
        action: 'ANNOUNCEMENT_CREATED',
        resource_type: 'announcement',
        resource_id: newBanner.id,
        change_summary: `Created announcement banner "${newBanner.title}"`,
      });
      toast.success('New announcement banner live.');
    }
    setShowModal(false);
  };

  const handleToggleActive = (b: AnnouncementBanner) => {
    const updated = announcements.map((a) =>
      a.id === b.id ? { ...a, isActive: !a.isActive } : a
    );
    setAnnouncements(updated);
    saveStoredAnnouncements(updated);
    logAdminAction({
      action: 'ANNOUNCEMENT_TOGGLED',
      resource_type: 'announcement',
      resource_id: b.id,
      change_summary: `${!b.isActive ? 'Activated' : 'Deactivated'} banner "${b.title}"`,
    });
    toast.info(`Banner is now ${!b.isActive ? 'Active' : 'Inactive'}`);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Platform Announcements & Banners</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Broadcast top alert strips, dashboard cards, and exam notices with scheduling controls.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-[#263126] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Announcement
        </button>
      </div>

      {/* Announcements List */}
      <div className="space-y-4">
        {filteredAnnouncements.map((b) => (
          <div
            key={b.id}
            className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#9CAF88] transition-all"
          >
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                    b.bannerType === 'alert' && 'bg-[#E8412C]/15 text-[#E8412C]',
                    b.bannerType === 'warning' && 'bg-amber-100 text-amber-800',
                    b.bannerType === 'success' && 'bg-[#9CAF88]/20 text-[#3B4C30]',
                    b.bannerType === 'info' && 'bg-[#263126]/10 text-[#263126]'
                  )}
                >
                  {b.badgeText || b.bannerType}
                </span>
                <span className="text-[11px] font-semibold text-[#52584E] bg-[#F7F5EF] px-2 py-0.5 rounded border border-[#E6E5DE]">
                  Target: {b.targetExam.toUpperCase()}
                </span>
                <span className="text-[11px] text-[#73786E] font-mono">
                  Placement: {b.placement.replace('_', ' ')}
                </span>
              </div>
              <h3 className="font-bold text-sm text-[#263126]">{b.title}</h3>
              <p className="text-xs text-[#73786E] leading-relaxed">{b.content}</p>
              <div className="text-[10px] text-[#73786E] font-mono">
                Active: {b.startDate.split('T')[0]} to {b.endDate.split('T')[0]}
              </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-2 shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-[#ECEAE4]">
              <button
                onClick={() => handleToggleActive(b)}
                className={cn(
                  'px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors',
                  b.isActive
                    ? 'bg-[#9CAF88]/20 text-[#3B4C30] border-[#9CAF88]/30'
                    : 'bg-[#73786E]/15 text-[#73786E] border-[#E6E5DE]'
                )}
              >
                {b.isActive ? 'Active' : 'Inactive'}
              </button>
              <button
                onClick={() => handleOpenEdit(b)}
                className="p-1.5 rounded-lg border border-[#E6E5DE] text-[#52584E] hover:bg-[#F7F5EF] transition-colors"
              >
                <Edit className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <h3 className="text-lg font-bold text-[#263126] font-serif">
                {editingBanner ? 'Edit Announcement' : 'Create New Announcement'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#73786E] hover:bg-[#F7F5EF] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBanner} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Badge Text</label>
                  <input
                    type="text"
                    placeholder="e.g. Important, Offer, Alert"
                    value={formData.badgeText}
                    onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Banner Type</label>
                  <select
                    value={formData.bannerType}
                    onChange={(e) =>
                      setFormData({ ...formData, bannerType: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  >
                    <option value="info">Info (Charcoal)</option>
                    <option value="success">Success (Sage Green)</option>
                    <option value="warning">Warning (Amber)</option>
                    <option value="alert">Alert (Tomato Red)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#263126] mb-1">Headline</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Official NEET 2026 Bulletin Released"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#263126] mb-1">Banner Message</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Full text rendered inside the banner..."
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Placement</label>
                  <select
                    value={formData.placement}
                    onChange={(e) =>
                      setFormData({ ...formData, placement: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  >
                    <option value="header_top">Header Top (Global Strip)</option>
                    <option value="dashboard_top">Student Dashboard Top</option>
                    <option value="exam_portal">Exam Practice Portal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Target Exam</label>
                  <select
                    value={formData.targetExam}
                    onChange={(e) =>
                      setFormData({ ...formData, targetExam: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  >
                    <option value="all">All Exams</option>
                    <option value="neet">NEET Only</option>
                    <option value="jee">JEE Main / Adv Only</option>
                    <option value="upsc">UPSC Only</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">End Date</label>
                  <input
                    type="date"
                    required
                    value={formData.endDate}
                    onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#ECEAE4] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#263126]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#263126] rounded-xl hover:bg-[#344034] transition-colors"
                >
                  {editingBanner ? 'Save Changes' : 'Publish Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
