'use client';

import React, { useState, useEffect } from 'react';
import {
  FileCode,
  Edit,
  Save,
  CheckCircle2,
  Clock,
  ExternalLink,
  X,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CMSStaticPage } from '@/types/admin';
import { getStoredCMSPages, saveStoredCMSPages } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminCMSPagesPage() {
  const [pages, setPages] = useState<CMSStaticPage[]>([]);
  const [editingPage, setEditingPage] = useState<CMSStaticPage | null>(null);
  const [contentMarkdown, setContentMarkdown] = useState('');

  useEffect(() => {
    setPages(getStoredCMSPages());
  }, []);

  const handleOpenEdit = (p: CMSStaticPage) => {
    setEditingPage(p);
    setContentMarkdown(p.contentMarkdown);
  };

  const handleSavePage = () => {
    if (!editingPage) return;

    const updated = pages.map((item) => {
      if (item.id === editingPage.id) {
        return {
          ...item,
          contentMarkdown,
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return item;
    });

    setPages(updated);
    saveStoredCMSPages(updated);
    logAdminAction({
      action: 'CMS_PAGE_UPDATED',
      resource_type: 'cms_page',
      resource_id: editingPage.slug,
      change_summary: `Updated legal / static page "${editingPage.title}" (/${editingPage.slug})`,
    });
    toast.success(`Page "${editingPage.title}" updated successfully.`);
    setEditingPage(null);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Legal & Static Content Pages</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Edit Terms of Service, Privacy Policy, Refund Policy, and Academic Honor Code guidelines.
          </p>
        </div>
      </div>

      {/* Pages Table */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Page Title</th>
                <th className="p-4 font-semibold">Route Slug</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Last Modified</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4]">
              {pages.map((p) => (
                <tr key={p.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4 font-bold text-[#263126]">{p.title}</td>
                  <td className="p-4 font-mono text-[#73786E]">/{p.slug}</td>
                  <td className="p-4 capitalize font-medium text-[#52584E]">{p.category}</td>
                  <td className="p-4 font-mono text-[#73786E]">{p.lastUpdated}</td>
                  <td className="p-4">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase bg-[#9CAF88]/20 text-[#3B4C30]">
                      {p.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleOpenEdit(p)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E6E5DE] text-xs font-semibold text-[#263126] hover:bg-[#F7F5EF] transition-colors"
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit Content
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Markdown Editor Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl my-8 space-y-5">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#263126] font-serif">
                  Edit Content: {editingPage.title}
                </h3>
                <div className="text-xs text-[#73786E] font-mono">Route: /{editingPage.slug}</div>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="rounded-lg p-2 text-[#73786E] hover:bg-[#F7F5EF] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div>
              <label className="block font-semibold text-xs text-[#263126] mb-1">
                Markdown / HTML Content Body
              </label>
              <textarea
                rows={16}
                value={contentMarkdown}
                onChange={(e) => setContentMarkdown(e.target.value)}
                className="w-full font-mono text-xs rounded-xl border border-[#E6E5DE] p-3 text-[#263126] focus:outline-none focus:border-[#9CAF88] bg-[#F7F5EF]/40"
              />
            </div>

            <div className="flex items-center justify-between border-t border-[#ECEAE4] pt-4">
              <button
                type="button"
                onClick={() => setEditingPage(null)}
                className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#263126]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSavePage}
                className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#263126] rounded-xl hover:bg-[#344034] transition-colors"
              >
                <Save className="h-4 w-4" />
                Save & Publish Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
