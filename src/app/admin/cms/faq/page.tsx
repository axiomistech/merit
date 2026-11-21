'use client';

import React, { useState, useEffect } from 'react';
import {
  HelpCircle,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CMSFAQItem } from '@/types/admin';
import { getStoredCMSFAQs, saveStoredCMSFAQs } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminCMSFAQPage() {
  const [faqs, setFaqs] = useState<CMSFAQItem[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<CMSFAQItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    category: CMSFAQItem['category'];
    question: string;
    answer: string;
    sortOrder: number;
    isPublished: boolean;
  }>({
    category: 'general',
    question: '',
    answer: '',
    sortOrder: 1,
    isPublished: true,
  });

  useEffect(() => {
    setFaqs(getStoredCMSFAQs());
  }, []);

  const filteredFaqs = faqs.filter((f) => {
    const matchesSearch =
      f.question.toLowerCase().includes(search.toLowerCase()) ||
      f.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || f.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingFaq(null);
    setFormData({
      category: 'general',
      question: '',
      answer: '',
      sortOrder: faqs.length + 1,
      isPublished: true,
    });
    setShowModal(true);
  };

  const handleOpenEdit = (f: CMSFAQItem) => {
    setEditingFaq(f);
    setFormData({
      category: f.category,
      question: f.question,
      answer: f.answer,
      sortOrder: f.sortOrder,
      isPublished: f.isPublished,
    });
    setShowModal(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.question || !formData.answer) {
      toast.error('Question and answer are required.');
      return;
    }

    if (editingFaq) {
      const updated = faqs.map((f) => (f.id === editingFaq.id ? { ...f, ...formData } : f));
      setFaqs(updated);
      saveStoredCMSFAQs(updated);
      logAdminAction({
        action: 'CMS_FAQ_UPDATED',
        resource_type: 'faq',
        resource_id: editingFaq.id,
        change_summary: `Updated FAQ question "${formData.question.substring(0, 40)}..."`,
      });
      toast.success('FAQ updated.');
    } else {
      const newFaq: CMSFAQItem = {
        id: `faq_${Date.now()}`,
        ...formData,
      };
      const updated = [...faqs, newFaq];
      setFaqs(updated);
      saveStoredCMSFAQs(updated);
      logAdminAction({
        action: 'CMS_FAQ_CREATED',
        resource_type: 'faq',
        resource_id: newFaq.id,
        change_summary: `Created new FAQ in category ${newFaq.category}`,
      });
      toast.success('New FAQ added.');
    }
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    const updated = faqs.filter((f) => f.id !== id);
    setFaqs(updated);
    saveStoredCMSFAQs(updated);
    toast.info('FAQ item removed.');
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Frequently Asked Questions (FAQ)</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Manage student help center queries, examination simulation details, and OMR guidelines.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-[#263126] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Add Question
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
          <input
            type="text"
            placeholder="Search questions or answers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#73786E]">Category:</span>
          {['all', 'general', 'exams', 'omr', 'payments', 'technical'].map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors',
                categoryFilter === cat
                  ? 'bg-[#263126] text-white border-[#263126]'
                  : 'bg-white text-[#52584E] border-[#E6E5DE] hover:bg-[#F7F5EF]'
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* FAQ Items */}
      <div className="space-y-4">
        {filteredFaqs.map((f) => (
          <div
            key={f.id}
            className="rounded-2xl border border-[#E6E5DE] bg-white p-5 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-2 hover:border-[#9CAF88] transition-all"
          >
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                {f.category}
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(f)}
                  className="p-1.5 rounded-lg border border-[#E6E5DE] text-[#52584E] hover:bg-[#F7F5EF] transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-1.5 rounded-lg border border-[#E6E5DE] text-[#73786E] hover:text-[#E8412C] hover:bg-[#E8412C]/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
            <h3 className="font-bold text-sm text-[#263126]">{f.question}</h3>
            <p className="text-xs text-[#73786E] leading-relaxed">{f.answer}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <h3 className="text-lg font-bold text-[#263126] font-serif">
                {editingFaq ? 'Edit FAQ Item' : 'Add New FAQ Item'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#73786E] hover:bg-[#F7F5EF] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveFaq} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  >
                    <option value="general">General</option>
                    <option value="exams">Exams & Syllabus</option>
                    <option value="omr">OMR Sheet</option>
                    <option value="payments">Billing & Payments</option>
                    <option value="technical">Technical & Account</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Display Order</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.sortOrder}
                    onChange={(e) => setFormData({ ...formData, sortOrder: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#263126] mb-1">Question</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. How does the authentic printable NEET OMR sheet work?"
                  value={formData.question}
                  onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#263126] mb-1">Detailed Answer</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write clear, friendly explanation..."
                  value={formData.answer}
                  onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                  className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                />
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
                  {editingFaq ? 'Save Changes' : 'Publish FAQ'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
