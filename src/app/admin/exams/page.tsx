'use client';

import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  X,
  Edit2,
  Archive,
  Eye,
  Layers,
  Sparkles,
} from 'lucide-react';
import { getStoredExams, saveStoredExams, AdminExamRecord } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminExamsPage() {
  const [exams, setExams] = useState<AdminExamRecord[]>([]);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingExam, setEditingExam] = useState<AdminExamRecord | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    shortName: string;
    slug: string;
    category: AdminExamRecord['category'];
    description: string;
    tagline: string;
    defaultDurationMinutes: number;
    defaultMarks: number;
    negativeMarkingScheme: string;
    status: AdminExamRecord['status'];
  }>({
    name: '',
    shortName: '',
    slug: '',
    category: 'medical',
    description: '',
    tagline: '',
    defaultDurationMinutes: 180,
    defaultMarks: 300,
    negativeMarkingScheme: '+4 / -1',
    status: 'published',
  });

  useEffect(() => {
    setExams(getStoredExams());
  }, []);

  const handleOpenCreate = () => {
    setEditingExam(null);
    setFormData({
      name: '',
      shortName: '',
      slug: '',
      category: 'medical',
      description: '',
      tagline: '',
      defaultDurationMinutes: 180,
      defaultMarks: 300,
      negativeMarkingScheme: '+4 / -1',
      status: 'published',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (exam: AdminExamRecord) => {
    setEditingExam(exam);
    setFormData({
      name: exam.name,
      shortName: exam.shortName,
      slug: exam.slug,
      category: exam.category,
      description: exam.description,
      tagline: exam.tagline,
      defaultDurationMinutes: exam.defaultDurationMinutes,
      defaultMarks: exam.defaultMarks,
      negativeMarkingScheme: exam.negativeMarkingScheme,
      status: exam.status,
    });
    setShowModal(true);
  };

  const handleSaveExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) return;

    let updated: AdminExamRecord[];
    if (editingExam) {
      updated = exams.map((ex) =>
        ex.id === editingExam.id
          ? {
              ...ex,
              ...formData,
            }
          : ex
      );
      logAdminAction('edit_exam', 'examination', editingExam.slug, `Updated configuration for ${formData.name}`);
      toast.success(`Exam ${formData.name} updated successfully.`);
    } else {
      const newExam: AdminExamRecord = {
        id: `exam_${formData.slug}`,
        ...formData,
        subjectsCount: 3,
        questionsCount: 0,
        publishedTestsCount: 0,
        created_at: new Date().toISOString(),
      };
      updated = [newExam, ...exams];
      logAdminAction('create_exam', 'examination', newExam.slug, `Created new exam program ${newExam.name}`);
      toast.success(`Exam ${formData.name} created successfully.`);
    }

    setExams(updated);
    saveStoredExams(updated);
    setShowModal(false);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'archived' : 'published';
    const updated = exams.map((ex) => (ex.id === id ? { ...ex, status: nextStatus as any } : ex));
    setExams(updated);
    saveStoredExams(updated);
    logAdminAction('toggle_exam_status', 'examination', id, `Changed status to ${nextStatus}`);
    toast.success(`Exam status updated to ${nextStatus}`);
  };

  const filtered = exams.filter((e) => {
    const matchSearch =
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.slug.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoryFilter === 'all' || e.category === categoryFilter;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-serif text-[#20252B]">
                {editingExam ? 'Edit Examination' : 'Create Examination Program'}
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#66727D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExam} className="mt-4 space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">Exam Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. FORT GATE CS"
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Short Code *</label>
                  <input
                    type="text"
                    required
                    value={formData.shortName}
                    onChange={(e) => setFormData({ ...formData, shortName: e.target.value })}
                    placeholder="e.g. GATE"
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">URL Slug *</label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                    placeholder="e.g. gate-cs"
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono focus:border-[#20252B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                  >
                    <option value="medical">Medical (NEET)</option>
                    <option value="engineering">Engineering (JEE / GATE)</option>
                    <option value="civil_services">Civil Services (UPSC)</option>
                    <option value="university">University Semester</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[#66727D] font-medium">Tagline</label>
                <input
                  type="text"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                  placeholder="One sentence positioning statement"
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[#66727D] font-medium">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Full syllabus & blueprint details"
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">Duration (Mins)</label>
                  <input
                    type="number"
                    value={formData.defaultDurationMinutes}
                    onChange={(e) => setFormData({ ...formData, defaultDurationMinutes: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono focus:border-[#20252B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Total Marks</label>
                  <input
                    type="number"
                    value={formData.defaultMarks}
                    onChange={(e) => setFormData({ ...formData, defaultMarks: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono focus:border-[#20252B] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Marking Scheme</label>
                  <input
                    type="text"
                    value={formData.negativeMarkingScheme}
                    onChange={(e) => setFormData({ ...formData, negativeMarkingScheme: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono focus:border-[#20252B] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[#66727D] font-medium">Publication Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                >
                  <option value="published">Published (Visible in student portal)</option>
                  <option value="draft">Draft (Admin internal only)</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="pt-2 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm"
                >
                  {editingExam ? 'Save Changes' : 'Create Exam'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#20252B]">
            Examination Management
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Configure official exam blueprints, marking schemes, duration, and publishing parameters.
          </p>
        </div>

        <button
          onClick={handleOpenCreate}
          className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>New Examination</span>
        </button>
      </div>

      {/* Search and Category Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exam name or slug..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="h-4 w-4 text-[#66727D]" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B] focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="medical">Medical</option>
            <option value="engineering">Engineering</option>
            <option value="civil_services">Civil Services</option>
            <option value="university">University</option>
          </select>
        </div>
      </div>

      {/* Exam Listing Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((exam) => (
          <div
            key={exam.id}
            className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm hover:border-[#20252B] transition-all flex flex-col justify-between space-y-5"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                  {exam.category}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    exam.status === 'published'
                      ? 'bg-[#E9EEF1] text-[#20252B]'
                      : 'bg-[#F1F3F4] text-[#66727D]'
                  }`}
                >
                  {exam.status}
                </span>
              </div>

              <h3 className="mt-4 text-lg font-bold font-serif text-[#20252B]">
                {exam.name}
              </h3>
              <p className="mt-1 text-xs text-[#66727D] line-clamp-2">
                {exam.description}
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F3F4] p-3 text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#66727D]">Subjects</div>
                  <div className="font-mono font-bold text-[#20252B]">{exam.subjectsCount}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Duration</div>
                  <div className="font-mono font-bold text-[#20252B]">{exam.defaultDurationMinutes}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Max Marks</div>
                  <div className="font-mono font-bold text-[#20252B]">{exam.defaultMarks}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE2E6] flex items-center justify-between text-xs">
              <span className="font-mono text-[11px] text-[#66727D]">/{exam.slug}</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleOpenEdit(exam)}
                  className="rounded-full p-2 text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]"
                  title="Edit Exam"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => handleToggleStatus(exam.id, exam.status)}
                  className="rounded-full p-2 text-[#66727D] hover:bg-[#FDEDF0] hover:text-[#E4002B]"
                  title={exam.status === 'published' ? 'Archive Exam' : 'Publish Exam'}
                >
                  <Archive className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
