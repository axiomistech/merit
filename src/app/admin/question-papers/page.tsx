'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Plus,
  CheckCircle2,
  AlertCircle,
  Clock,
  Trash2,
  Edit2,
  Eye,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Layers,
  Sparkles,
  Shield,
  X,
  Search,
  Filter,
  Check,
} from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { MathText } from '@/components/ui/MathText';

interface StoredQuestionOption {
  key: string;
  text: string;
}

interface QuestionBankItem {
  id: string;
  versionId: string;
  examSlug: string;
  subjectSlug: string;
  subjectName: string;
  chapterSlug?: string;
  conceptName?: string;
  questionType: string;
  difficulty: string;
  marks: number;
  negativeMarks: number;
  status: string;
  text: string;
  options: StoredQuestionOption[];
}

interface PaperItem {
  id: string;
  name: string;
  slug: string;
  examSlug: string;
  paperType: 'mock_exam' | 'previous_year' | 'chapter_test' | 'subject_test';
  year: number;
  subject: string;
  durationMinutes: number;
  totalQuestions: number;
  maxMarks: number;
  markingScheme: string;
  hasOMR: boolean;
  price: number;
  isFreeEligible: boolean;
  status: 'draft' | 'pending_review' | 'approved' | 'published' | 'archived';
  instructions: string[];
  sections: { name: string; questionsCount: number; maxMarks: number }[];
  questionIds: string[];
  created_at: string;
  published_at?: string;
}

export default function AdminQuestionPapersPage() {
  const [papers, setPapers] = useState<PaperItem[]>([]);
  const [questionBank, setQuestionBank] = useState<QuestionBankItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [filterExam, setFilterExam] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Builder Modal State
  const [showBuilder, setShowBuilder] = useState(false);
  const [editingPaper, setEditingPaper] = useState<PaperItem | null>(null);
  const [builderStep, setBuilderStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    slug: string;
    examSlug: string;
    paperType: 'mock_exam' | 'previous_year' | 'chapter_test' | 'subject_test';
    year: number;
    durationMinutes: number;
    price: number;
    isFreeEligible: boolean;
    hasOMR: boolean;
    markingScheme: string;
    instructionsText: string;
    status: 'draft' | 'published';
    selectedQuestionIds: string[];
  }>({
    name: '',
    slug: '',
    examSlug: 'neet',
    paperType: 'mock_exam',
    year: new Date().getFullYear(),
    durationMinutes: 180,
    price: 10,
    isFreeEligible: true,
    hasOMR: true,
    markingScheme: '+4 for correct, -1 for incorrect, 0 for unattempted',
    instructionsText:
      '1. Server-authoritative timer runs for the configured duration.\n2. Marking Scheme: Standard negative marking is applied automatically.\n3. Instant personalized vector A4 OMR answer sheet is generated upon submission.',
    status: 'draft',
    selectedQuestionIds: [],
  });

  // Question Selector filter in Builder
  const [qbSubjectFilter, setQbSubjectFilter] = useState('all');
  const [qbSearch, setQbSearch] = useState('');

  // Validation Results in Builder
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Load Papers and Question Bank from server API
  const loadData = async () => {
    setLoading(true);
    try {
      const [papersRes, qbRes] = await Promise.all([
        fetch('/api/tests'),
        fetch('/api/questions?limit=200'),
      ]);

      const papersData = await papersRes.json();
      const qbData = await qbRes.json();

      if (papersData.success && Array.isArray(papersData.data)) {
        setPapers(papersData.data);
      } else {
        setPapers([]);
      }

      if (qbData.success && Array.isArray(qbData.data)) {
        setQuestionBank(qbData.data);
      } else {
        setQuestionBank([]);
      }
    } catch (err) {
      console.error('Failed to load papers or question bank:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Filter papers for list view
  const filteredPapers = papers.filter((p) => {
    if (filterExam !== 'all' && p.examSlug !== filterExam) return false;
    if (filterStatus !== 'all' && p.status !== filterStatus) return false;
    if (searchQuery.trim() === '') return true;
    const q = searchQuery.toLowerCase();
    return p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
  });

  // Calculate live marks of selected questions
  const selectedQuestions = formData.selectedQuestionIds
    .map((qid) => questionBank.find((q) => q.id === qid))
    .filter((q): q is QuestionBankItem => !!q);

  const calculatedTotalMarks = selectedQuestions.reduce((acc, q) => acc + (q.marks || 4), 0);

  const handleOpenCreate = () => {
    setEditingPaper(null);
    setValidationErrors([]);
    setValidationSuccess(false);
    setBuilderStep(1);
    setFormData({
      name: '',
      slug: '',
      examSlug: 'neet',
      paperType: 'mock_exam',
      year: new Date().getFullYear(),
      durationMinutes: 200,
      price: 10,
      isFreeEligible: true,
      hasOMR: true,
      markingScheme: '+4 for correct, -1 for incorrect, 0 for unattempted',
      instructionsText:
        '1. Server-authoritative timer runs for the configured duration.\n2. Marking Scheme: Standard negative marking is applied automatically.\n3. Instant personalized vector A4 OMR answer sheet is generated upon submission.',
      status: 'draft',
      selectedQuestionIds: [],
    });
    setShowBuilder(true);
  };

  const handleOpenEdit = (paper: PaperItem) => {
    setEditingPaper(paper);
    setValidationErrors([]);
    setValidationSuccess(false);
    setBuilderStep(1);
    setFormData({
      name: paper.name,
      slug: paper.slug,
      examSlug: paper.examSlug,
      paperType: paper.paperType,
      year: paper.year || new Date().getFullYear(),
      durationMinutes: paper.durationMinutes || 180,
      price: paper.price !== undefined ? paper.price : 10,
      isFreeEligible: paper.isFreeEligible !== undefined ? paper.isFreeEligible : true,
      hasOMR: paper.hasOMR !== undefined ? paper.hasOMR : true,
      markingScheme: paper.markingScheme || '+4 for correct, -1 for incorrect, 0 for unattempted',
      instructionsText: paper.instructions?.join('\n') || '',
      status: paper.status === 'published' ? 'published' : 'draft',
      selectedQuestionIds: paper.questionIds || [],
    });
    setShowBuilder(true);
  };

  // Toggle question selection
  const handleToggleQuestion = (qid: string) => {
    setFormData((prev) => {
      const exists = prev.selectedQuestionIds.includes(qid);
      const next = exists
        ? prev.selectedQuestionIds.filter((id) => id !== qid)
        : [...prev.selectedQuestionIds, qid];
      return { ...prev, selectedQuestionIds: next };
    });
  };

  // Move Question Up
  const handleMoveUp = (index: number) => {
    if (index === 0) return;
    setFormData((prev) => {
      const copy = [...prev.selectedQuestionIds];
      const temp = copy[index];
      copy[index] = copy[index - 1];
      copy[index - 1] = temp;
      return { ...prev, selectedQuestionIds: copy };
    });
  };

  // Move Question Down
  const handleMoveDown = (index: number) => {
    if (index >= formData.selectedQuestionIds.length - 1) return;
    setFormData((prev) => {
      const copy = [...prev.selectedQuestionIds];
      const temp = copy[index];
      copy[index] = copy[index + 1];
      copy[index + 1] = temp;
      return { ...prev, selectedQuestionIds: copy };
    });
  };

  // Strict Validation Before Save/Publish
  const validatePaperConfiguration = (targetStatus: 'draft' | 'published'): boolean => {
    const errors: string[] = [];

    if (!formData.name.trim()) {
      errors.push('Paper title is required.');
    }

    if (!formData.examSlug) {
      errors.push('Target examination must be specified.');
    }

    if (!formData.durationMinutes || formData.durationMinutes <= 0) {
      errors.push('Duration must be greater than zero minutes.');
    }

    if (targetStatus === 'published') {
      if (formData.selectedQuestionIds.length === 0) {
        errors.push('Cannot publish paper with 0 questions. Please add questions in Step 2.');
      }

      // Check if all selected questions exist and are approved/published
      const missingIds = formData.selectedQuestionIds.filter(
        (qid) => !questionBank.some((q) => q.id === qid)
      );
      if (missingIds.length > 0) {
        errors.push(`Paper references ${missingIds.length} question(s) not found in database.`);
      }

      const draftQuestions = formData.selectedQuestionIds
        .map((qid) => questionBank.find((q) => q.id === qid))
        .filter((q) => q && q.status === 'draft');
      if (draftQuestions.length > 0) {
        errors.push(`Paper contains ${draftQuestions.length} draft question(s). All questions must be approved or published.`);
      }
    }

    setValidationErrors(errors);
    setValidationSuccess(errors.length === 0);
    return errors.length === 0;
  };

  // Save Paper (Draft or Published)
  const handleSavePaper = async (targetStatus: 'draft' | 'published') => {
    const isValid = validatePaperConfiguration(targetStatus);
    if (!isValid) {
      toast.error('Validation failed. Please review errors before continuing.');
      setBuilderStep(3);
      return;
    }

    try {
      const payload = {
        id: editingPaper?.id,
        name: formData.name.trim(),
        slug:
          formData.slug.trim() ||
          formData.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, ''),
        examSlug: formData.examSlug,
        paperType: formData.paperType,
        year: Number(formData.year) || new Date().getFullYear(),
        durationMinutes: Number(formData.durationMinutes),
        price: Number(formData.price),
        isFreeEligible: formData.isFreeEligible,
        hasOMR: formData.hasOMR,
        markingScheme: formData.markingScheme,
        instructions: formData.instructionsText.split('\n').filter((l) => l.trim().length > 0),
        status: targetStatus,
        questionIds: formData.selectedQuestionIds,
      };

      const url = editingPaper ? `/api/tests/${editingPaper.slug}` : '/api/tests';
      const method = editingPaper ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      if (!res.ok || !resData.success) {
        throw new Error(resData.error || resData.details?.join(', ') || 'Failed to save paper');
      }

      toast.success(
        targetStatus === 'published'
          ? `Question Paper "${payload.name}" published successfully!`
          : `Draft saved successfully.`
      );

      setShowBuilder(false);
      loadData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Toggle Publish / Unpublish Status
  const handleToggleStatus = async (paper: PaperItem) => {
    const nextStatus = paper.status === 'published' ? 'draft' : 'published';
    try {
      const res = await fetch(`/api/tests/${paper.slug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to update status');
      }
      toast.success(`Paper status changed to ${nextStatus}.`);
      loadData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Delete Paper
  const handleDeletePaper = async (paper: PaperItem) => {
    if (!confirm(`Are you sure you want to delete paper "${paper.name}"?`)) return;
    try {
      const res = await fetch(`/api/tests/${paper.slug}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete paper');
      }
      toast.success(`Paper "${paper.name}" deleted.`);
      loadData();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto text-[#20252B]">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              Admin Content Engine
            </span>
            <span className="glass-pill rounded-full px-3 py-1 font-mono text-[10px] font-bold text-[#20252B]">
              DATABASE-AUTHORITATIVE
            </span>
          </div>
          <h1 className="mt-2 text-2xl sm:text-3xl font-extrabold font-sans text-[#20252B]">
            Question Paper Builder
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Assemble official examination papers exclusively from validated database questions. Configure duration, pricing, blueprints, and publication lifecycle.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleOpenCreate}
            className="glass-racing-red inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-[#E4002B]/20 transition-transform hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Paper</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-polar rounded-2xl p-3 shadow-xs">
        <div className="flex flex-wrap items-center gap-3">
          {/* Exam Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#66727D] font-bold uppercase tracking-wider text-[10px]">Exam:</span>
            <select
              value={filterExam}
              onChange={(e) => setFilterExam(e.target.value)}
              className="rounded-xl border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:outline-none"
            >
              <option value="all">All Examinations</option>
              <option value="neet">NEET (UG)</option>
              <option value="jee-main">JEE Main</option>
              <option value="jee-advanced">JEE Advanced</option>
              <option value="gate">GATE</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#66727D] font-bold uppercase tracking-wider text-[10px]">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:outline-none"
            >
              <option value="all">All Lifecycle States</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
              <option value="archived">Archived</option>
            </select>
          </div>
        </div>

        {/* Search */}
        <div className="relative max-w-xs w-full">
          <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-[#66727D]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search papers by name..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-1.5 pl-8 pr-4 text-xs text-[#20252B] focus:outline-none"
          />
        </div>
      </div>

      {/* Papers Table */}
      <div className="rounded-[28px] border border-[#DCE2E6] bg-white shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-[#66727D]">
            <div className="inline-block h-6 w-6 animate-spin rounded-full border-2 border-[#20252B] border-t-transparent mb-2" />
            <div>Loading verified question papers...</div>
          </div>
        ) : filteredPapers.length === 0 ? (
          <div className="p-16 text-center space-y-3">
            <div className="h-12 w-12 mx-auto rounded-2xl bg-[#9CC6E0]/30 flex items-center justify-center text-[#20252B]">
              <FileText className="h-6 w-6 stroke-[2]" />
            </div>
            <h3 className="text-base font-bold font-sans text-[#20252B]">
              No Question Papers Found
            </h3>
            <p className="text-xs text-[#66727D] max-w-md mx-auto leading-relaxed">
              No examination papers have been created yet. Click <span className="font-bold">Create New Paper</span> above to assemble an authentic paper from the Question Bank.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleOpenCreate}
                className="inline-flex items-center gap-1.5 rounded-full bg-[#20252B] px-5 py-2 text-xs font-bold text-white hover:bg-black transition-all"
              >
                <Plus className="h-3.5 w-3.5" />
                <span>Create Paper Now</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
                <tr>
                  <th className="p-4 font-semibold">Title & Slug</th>
                  <th className="p-4 font-semibold">Curriculum</th>
                  <th className="p-4 font-semibold">Questions</th>
                  <th className="p-4 font-semibold">Duration</th>
                  <th className="p-4 font-semibold">Max Marks</th>
                  <th className="p-4 font-semibold">Pricing</th>
                  <th className="p-4 font-semibold">Lifecycle Status</th>
                  <th className="p-4 font-semibold text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE2E6] text-[#20252B]">
                {filteredPapers.map((paper) => (
                  <tr key={paper.id} className="hover:bg-[#F1F3F4]/50 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-[#20252B]">{paper.name}</div>
                      <div className="font-mono text-[10px] text-[#66727D] mt-0.5">{paper.slug}</div>
                    </td>
                    <td className="p-4">
                      <span className="glass-pill px-2.5 py-0.5 text-[10px] font-bold text-[#20252B] uppercase">
                        {paper.examSlug}
                      </span>
                    </td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">
                      {paper.questionIds?.length || paper.totalQuestions || 0} Qs
                    </td>
                    <td className="p-4 font-mono text-[#66727D]">
                      {paper.durationMinutes}m
                    </td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">
                      {paper.maxMarks}
                    </td>
                    <td className="p-4">
                      {paper.price === 0 || paper.isFreeEligible ? (
                        <span className="text-[11px] font-bold text-emerald-600">Free Claim</span>
                      ) : (
                        <span className="font-mono text-[11px] font-bold text-[#20252B]">₹{paper.price}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={cn(
                          'rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase',
                          paper.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : paper.status === 'draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-zinc-100 text-zinc-800'
                        )}
                      >
                        {paper.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(paper)}
                          className={cn(
                            'rounded-lg px-2.5 py-1 text-[11px] font-bold transition-colors',
                            paper.status === 'published'
                              ? 'text-amber-700 bg-amber-50 hover:bg-amber-100'
                              : 'text-emerald-700 bg-emerald-50 hover:bg-emerald-100'
                          )}
                        >
                          {paper.status === 'published' ? 'Unpublish' : 'Publish'}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleOpenEdit(paper)}
                          className="rounded-lg p-1.5 text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]"
                          title="Edit Paper in Builder"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeletePaper(paper)}
                          className="rounded-lg p-1.5 text-[#66727D] hover:bg-red-50 hover:text-[#E4002B]"
                          title="Delete Paper"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* ==================================================================== */}
      {/* FULL INTERACTIVE QUESTION PAPER BUILDER MODAL                        */}
      {/* ==================================================================== */}
      {showBuilder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm overflow-y-auto animate-in fade-in duration-200">
          <div className="glass-polar w-full max-w-4xl rounded-[36px] p-6 sm:p-8 shadow-2xl space-y-6 my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header & Steps Bar */}
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div>
                <span className="glass-pill px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-[#66727D]">
                  Paper Builder Studio
                </span>
                <h2 className="text-xl font-bold font-sans text-[#20252B] mt-1">
                  {editingPaper ? `Edit Paper: ${editingPaper.name}` : 'Assemble New Question Paper'}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setShowBuilder(false)}
                className="rounded-full p-2 text-[#66727D] hover:bg-white/60 hover:text-[#20252B]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 3 Steps Navigation */}
            <div className="grid grid-cols-3 gap-2 border-b border-[#DCE2E6] pb-4">
              <button
                type="button"
                onClick={() => setBuilderStep(1)}
                className={cn(
                  'rounded-xl p-2.5 text-xs font-bold transition-all text-left flex items-center gap-2',
                  builderStep === 1
                    ? 'bg-[#20252B] text-white shadow-sm'
                    : 'bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
              >
                <span className="font-mono text-sm">01</span>
                <span>Metadata & Rules</span>
              </button>

              <button
                type="button"
                onClick={() => setBuilderStep(2)}
                className={cn(
                  'rounded-xl p-2.5 text-xs font-bold transition-all text-left flex items-center gap-2',
                  builderStep === 2
                    ? 'bg-[#20252B] text-white shadow-sm'
                    : 'bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
              >
                <span className="font-mono text-sm">02</span>
                <span>Select Questions ({formData.selectedQuestionIds.length})</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  validatePaperConfiguration('published');
                  setBuilderStep(3);
                }}
                className={cn(
                  'rounded-xl p-2.5 text-xs font-bold transition-all text-left flex items-center gap-2',
                  builderStep === 3
                    ? 'bg-[#20252B] text-white shadow-sm'
                    : 'bg-[#F1F3F4] text-[#66727D] hover:text-[#20252B]'
                )}
              >
                <span className="font-mono text-sm">03</span>
                <span>Audit & Publish</span>
              </button>
            </div>

            {/* STEP 1: METADATA & CONFIGURATION */}
            {builderStep === 1 && (
              <div className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">
                      Paper Title <span className="text-[#E4002B]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. NEET (UG) 2025 Official May Shift"
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">
                      Target Examination <span className="text-[#E4002B]">*</span>
                    </label>
                    <select
                      value={formData.examSlug}
                      onChange={(e) => setFormData({ ...formData, examSlug: e.target.value })}
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:outline-none"
                    >
                      <option value="neet">NEET (UG)</option>
                      <option value="jee-main">JEE Main</option>
                      <option value="jee-advanced">JEE Advanced</option>
                      <option value="gate">GATE</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">
                      Duration (Minutes) <span className="text-[#E4002B]">*</span>
                    </label>
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs font-mono text-[#20252B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">Year / Designation</label>
                    <input
                      type="number"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: Number(e.target.value) })}
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs font-mono text-[#20252B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">Paper Type</label>
                    <select
                      value={formData.paperType}
                      onChange={(e) => setFormData({ ...formData, paperType: e.target.value as any })}
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:outline-none"
                    >
                      <option value="mock_exam">Mock Exam</option>
                      <option value="previous_year">Official PYQ</option>
                      <option value="subject_test">Subject Test</option>
                      <option value="chapter_test">Chapter Test</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="font-bold text-[#20252B] block mb-1">Pricing (INR)</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                      className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs font-mono text-[#20252B] focus:outline-none"
                    />
                  </div>

                  <div className="flex items-center gap-6 pt-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFreeEligible}
                        onChange={(e) => setFormData({ ...formData, isFreeEligible: e.target.checked })}
                        className="rounded border-[#DCE2E6]"
                      />
                      <span className="font-bold text-[#20252B]">Eligible for 1-Free Paper Claim</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.hasOMR}
                        onChange={(e) => setFormData({ ...formData, hasOMR: e.target.checked })}
                        className="rounded border-[#DCE2E6]"
                      />
                      <span className="font-bold text-[#20252B]">Vector A4 OMR Simulation</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-[#20252B] block mb-1">Paper Instructions</label>
                  <textarea
                    rows={3}
                    value={formData.instructionsText}
                    onChange={(e) => setFormData({ ...formData, instructionsText: e.target.value })}
                    className="w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:outline-none font-mono"
                  />
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(2)}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#20252B] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition-all"
                  >
                    <span>Next: Select Questions</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: QUESTION SELECTOR */}
            {builderStep === 2 && (
              <div className="space-y-4 text-xs">
                {/* Stats Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-[#F1F3F4] p-3 text-xs">
                  <div className="flex items-center gap-4">
                    <div>
                      <span className="text-[#66727D]">Selected Questions:</span>{' '}
                      <span className="font-mono font-bold text-[#20252B] text-sm">
                        {formData.selectedQuestionIds.length}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#66727D]">Calculated Marks:</span>{' '}
                      <span className="font-mono font-bold text-[#20252B] text-sm">
                        {calculatedTotalMarks}
                      </span>
                    </div>
                  </div>

                  {formData.selectedQuestionIds.length === 0 && (
                    <span className="text-[11px] font-bold text-[#E4002B]">
                      At least 1 question is required before publication.
                    </span>
                  )}
                </div>

                {/* Filters */}
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase text-[#66727D]">Discipline:</span>
                    <select
                      value={qbSubjectFilter}
                      onChange={(e) => setQbSubjectFilter(e.target.value)}
                      className="rounded-xl border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs font-semibold text-[#20252B] focus:outline-none"
                    >
                      <option value="all">All Disciplines</option>
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="botany">Botany</option>
                      <option value="zoology">Zoology</option>
                      <option value="mathematics">Mathematics</option>
                      <option value="general-studies">General Studies</option>
                    </select>
                  </div>

                  <div className="relative max-w-xs w-full">
                    <Search className="absolute left-3 top-2 h-3.5 w-3.5 text-[#66727D]" />
                    <input
                      type="text"
                      value={qbSearch}
                      onChange={(e) => setQbSearch(e.target.value)}
                      placeholder="Filter question text..."
                      className="w-full rounded-full border border-[#DCE2E6] bg-white py-1.5 pl-8 pr-4 text-xs text-[#20252B] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Questions List from Question Bank */}
                <div className="border border-[#DCE2E6] rounded-2xl max-h-96 overflow-y-auto divide-y divide-[#DCE2E6] bg-white">
                  {questionBank.length === 0 ? (
                    <div className="p-8 text-center text-xs text-[#66727D] space-y-2">
                      <p>The Question Bank is empty. No questions have been authored by an administrator yet.</p>
                      <Link
                        href="/admin/question-bank"
                        target="_blank"
                        className="inline-flex items-center gap-1 font-bold text-[#20252B] hover:text-[#E4002B]"
                      >
                        <span>Open Question Bank to Author Questions ↗</span>
                      </Link>
                    </div>
                  ) : (
                    questionBank
                      .filter((q) => {
                        if (qbSubjectFilter !== 'all' && q.subjectSlug !== qbSubjectFilter) return false;
                        if (qbSearch && !q.text.toLowerCase().includes(qbSearch.toLowerCase())) return false;
                        return true;
                      })
                      .map((q) => {
                        const isSelected = formData.selectedQuestionIds.includes(q.id);
                        return (
                          <div
                            key={q.id}
                            onClick={() => handleToggleQuestion(q.id)}
                            className={cn(
                              'p-3 flex items-start gap-3 cursor-pointer transition-colors',
                              isSelected ? 'bg-[#9CC6E0]/20' : 'hover:bg-[#F1F3F4]/60'
                            )}
                          >
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => {}} // handled by parent div
                              className="mt-1 rounded border-[#DCE2E6]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="glass-pill px-2 py-0.5 text-[9px] font-bold uppercase text-[#20252B]">
                                  {q.subjectName}
                                </span>
                                <span className="text-[10px] font-mono text-[#66727D]">
                                  +{q.marks} / {q.negativeMarks}
                                </span>
                                <span className="text-[10px] text-[#66727D]">{q.difficulty}</span>
                              </div>
                              <div className="text-xs text-[#20252B] font-medium line-clamp-2">
                                <MathText text={q.text} />
                              </div>
                            </div>
                          </div>
                        );
                      })
                  )}
                </div>

                <div className="flex items-center justify-between pt-4">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(1)}
                    className="rounded-full px-5 py-2.5 text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
                  >
                    Back to Metadata
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      validatePaperConfiguration('published');
                      setBuilderStep(3);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full bg-[#20252B] px-6 py-2.5 text-xs font-bold text-white hover:bg-black transition-all"
                  >
                    <span>Next: Audit & Order</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AUDIT, REORDER & PUBLISH */}
            {builderStep === 3 && (
              <div className="space-y-4 text-xs">
                {/* Validation Banner */}
                {validationErrors.length > 0 ? (
                  <div className="rounded-2xl border border-red-200 bg-red-50 p-4 space-y-1.5">
                    <div className="flex items-center gap-2 text-xs font-bold text-red-800">
                      <AlertCircle className="h-4 w-4" />
                      <span>Publication Validation Issues Detected:</span>
                    </div>
                    <ul className="list-disc list-inside text-xs text-red-700 space-y-0.5">
                      {validationErrors.map((err, idx) => (
                        <li key={idx}>{err}</li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 flex items-center gap-2 text-xs font-bold text-emerald-800">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Configuration Validated! This paper meets all regulatory standards for publication.</span>
                  </div>
                )}

                {/* Reordering List */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#20252B]">
                      Question Sequence ({formData.selectedQuestionIds.length} Questions)
                    </span>
                    <span className="text-[11px] text-[#66727D]">
                      Total Calculated Marks: <strong className="font-mono text-[#20252B]">{calculatedTotalMarks}</strong>
                    </span>
                  </div>

                  <div className="border border-[#DCE2E6] rounded-2xl max-h-72 overflow-y-auto divide-y divide-[#DCE2E6] bg-white">
                    {formData.selectedQuestionIds.length === 0 ? (
                      <div className="p-8 text-center text-xs text-[#66727D]">
                        No questions selected. Go to Step 2 to select questions from the Question Bank.
                      </div>
                    ) : (
                      formData.selectedQuestionIds.map((qid, idx) => {
                        const q = questionBank.find((item) => item.id === qid);
                        if (!q) return null;
                        return (
                          <div key={qid} className="p-3 flex items-center justify-between gap-3 text-xs">
                            <div className="flex items-center gap-3 min-w-0">
                              <span className="font-mono font-bold text-[#66727D] w-6">
                                Q.{idx + 1}
                              </span>
                              <div className="truncate">
                                <span className="font-semibold text-[#20252B]">{q.subjectName}:</span>{' '}
                                <span className="text-[#66727D]">{q.text.slice(0, 80)}...</span>
                              </div>
                            </div>

                            <div className="flex items-center gap-1 shrink-0">
                              <button
                                type="button"
                                onClick={() => handleMoveUp(idx)}
                                disabled={idx === 0}
                                className="rounded p-1 text-[#66727D] hover:bg-[#F1F3F4] disabled:opacity-30"
                              >
                                <ArrowUp className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleMoveDown(idx)}
                                disabled={idx === formData.selectedQuestionIds.length - 1}
                                className="rounded p-1 text-[#66727D] hover:bg-[#F1F3F4] disabled:opacity-30"
                              >
                                <ArrowDown className="h-3.5 w-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleToggleQuestion(qid)}
                                className="rounded p-1 text-red-500 hover:bg-red-50 ml-1"
                                title="Remove from paper"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </div>
                          </div>
                        );
                      })
                    )}
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-[#DCE2E6]">
                  <button
                    type="button"
                    onClick={() => setBuilderStep(2)}
                    className="rounded-full px-5 py-2.5 text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
                  >
                    Back to Question Selection
                  </button>

                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleSavePaper('draft')}
                      className="rounded-full border border-[#DCE2E6] bg-white px-5 py-2.5 text-xs font-bold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
                    >
                      Save as Draft
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSavePaper('published')}
                      disabled={validationErrors.length > 0}
                      className="glass-racing-red inline-flex items-center gap-2 rounded-full px-7 py-2.5 text-xs font-bold text-white shadow-lg shadow-[#E4002B]/25 transition-transform hover:scale-[1.02] disabled:opacity-50"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                      <span>Validate & Publish Paper</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
