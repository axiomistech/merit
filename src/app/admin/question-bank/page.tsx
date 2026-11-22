'use client';

import React, { useState, useEffect } from 'react';
import {
  FileText,
  Plus,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  Upload,
  Download,
  AlertTriangle,
  X,
  Edit2,
  Archive,
  Sparkles,
  HelpCircle,
} from 'lucide-react';
import {
  getStoredQuestions,
  saveStoredQuestions,
  AdminQuestionRecord,
} from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { MathText } from '@/components/ui/MathText';
import { toast } from 'sonner';

export default function AdminQuestionBankPage() {
  const [questions, setQuestions] = useState<AdminQuestionRecord[]>([]);
  const [search, setSearch] = useState('');
  const [filterSubject, setFilterSubject] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestionRecord | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [duplicateWarning, setDuplicateWarning] = useState<string | null>(null);

  // Question Form State
  const [formData, setFormData] = useState<{
    text: string;
    examSlug: string;
    subjectSlug: string;
    subjectName: string;
    conceptName: string;
    questionType: AdminQuestionRecord['questionType'];
    difficulty: AdminQuestionRecord['difficulty'];
    marks: number;
    negativeMarks: number;
    status: AdminQuestionRecord['status'];
    options: { key: string; text: string }[];
    correctOption: string;
    explanationText: string;
  }>({
    text: '',
    examSlug: 'neet',
    subjectSlug: 'physics',
    subjectName: 'Physics',
    conceptName: 'Laws of Motion & Friction',
    questionType: 'single_correct',
    difficulty: 'medium',
    marks: 4,
    negativeMarks: -1,
    status: 'published',
    options: [
      { key: 'A', text: '' },
      { key: 'B', text: '' },
      { key: 'C', text: '' },
      { key: 'D', text: '' },
    ],
    correctOption: 'B',
    explanationText: '',
  });

  // Bulk Import State
  const [importStep, setImportStep] = useState<1 | 2 | 3>(1);
  const [importJsonText, setImportJsonText] = useState('');
  const [parsedImportRows, setParsedImportRows] = useState<any[]>([]);
  const [importValidationErrors, setImportValidationErrors] = useState<string[]>([]);

  const loadQuestions = async () => {
    try {
      const res = await fetch('/api/questions?limit=500');
      const data = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setQuestions(data.data);
      } else {
        setQuestions([]);
      }
    } catch (err) {
      console.error('Failed to load questions:', err);
      setQuestions([]);
    }
  };

  useEffect(() => {
    loadQuestions();
  }, []);

  const handleOpenCreate = () => {
    setEditingQuestion(null);
    setDuplicateWarning(null);
    setFormData({
      text: '',
      examSlug: 'neet',
      subjectSlug: 'physics',
      subjectName: 'Physics',
      conceptName: 'Laws of Motion & Friction',
      questionType: 'single_correct',
      difficulty: 'medium',
      marks: 4,
      negativeMarks: -1,
      status: 'published',
      options: [
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' },
      ],
      correctOption: 'B',
      explanationText: '',
    });
    setShowCreateModal(true);
  };

  const handleOpenEdit = (q: AdminQuestionRecord) => {
    setEditingQuestion(q);
    setDuplicateWarning(null);
    setFormData({
      text: q.text,
      examSlug: q.examSlug,
      subjectSlug: q.subjectSlug,
      subjectName: q.subjectName,
      conceptName: q.conceptName,
      questionType: q.questionType,
      difficulty: q.difficulty,
      marks: q.marks,
      negativeMarks: q.negativeMarks,
      status: q.status,
      options: q.options || [
        { key: 'A', text: '' },
        { key: 'B', text: '' },
        { key: 'C', text: '' },
        { key: 'D', text: '' },
      ],
      correctOption: q.answerKey?.correctOptions?.[0] || 'B',
      explanationText: q.explanation?.text || '',
    });
    setShowCreateModal(true);
  };

  // Duplicate Check logic
  const handleTextChange = (text: string) => {
    setFormData({ ...formData, text });
    const normalized = text.toLowerCase().replace(/[^a-z0-9]/g, '');
    if (normalized.length > 20) {
      const match = questions.find(
        (q) =>
          q.id !== editingQuestion?.id &&
          q.text.toLowerCase().replace(/[^a-z0-9]/g, '').includes(normalized.slice(0, 40))
      );
      if (match) {
        setDuplicateWarning(`Potential duplicate detected: Matches Question #${match.id.slice(0, 8)}`);
      } else {
        setDuplicateWarning(null);
      }
    } else {
      setDuplicateWarning(null);
    }
  };

  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.text.trim()) {
      toast.error('Question statement cannot be empty.');
      return;
    }

    try {
      if (editingQuestion) {
        const payload = {
          text: formData.text,
          examSlug: formData.examSlug,
          subjectSlug: formData.subjectSlug,
          subjectName: formData.subjectName,
          conceptName: formData.conceptName,
          questionType: formData.questionType,
          difficulty: formData.difficulty,
          marks: formData.marks,
          negativeMarks: formData.negativeMarks,
          status: formData.status,
          options: formData.options,
          answerKey: { correctOptions: [formData.correctOption] },
          explanation: { text: formData.explanationText },
        };

        const res = await fetch(`/api/questions/${editingQuestion.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || 'Failed to update question');
        }

        logAdminAction('edit_question', 'question', editingQuestion.id, `Modified question text & options in ${formData.subjectName}`);
        toast.success('Question updated successfully.');
      } else {
        const payload = {
          examSlug: formData.examSlug,
          subjectSlug: formData.subjectSlug,
          subjectName: formData.subjectName,
          chapterSlug: formData.conceptName.toLowerCase().replace(/\s+/g, '-'),
          conceptSlug: formData.conceptName.toLowerCase().replace(/\s+/g, '-'),
          conceptName: formData.conceptName,
          questionType: formData.questionType,
          difficulty: formData.difficulty,
          marks: formData.marks,
          negativeMarks: formData.negativeMarks,
          status: formData.status,
          text: formData.text,
          options: formData.options,
          answerKey: { correctOptions: [formData.correctOption] },
          explanation: { text: formData.explanationText },
        };

        const res = await fetch('/api/questions', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });

        const data = await res.json();
        if (!res.ok || !data.success) {
          throw new Error(data.error || data.details?.join(', ') || 'Failed to create question');
        }

        logAdminAction('create_question', 'question', data.data?.id || 'new', `Created question in ${formData.subjectName}`);
        toast.success('New question authored and saved to database.');
      }

      await loadQuestions();
      setShowCreateModal(false);
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // Bulk Import Handlers
  const handleValidateImport = () => {
    try {
      const rows = JSON.parse(importJsonText);
      if (!Array.isArray(rows)) {
        throw new Error('Root JSON must be an array of questions');
      }

      const errors: string[] = [];
      rows.forEach((r, idx) => {
        if (!r.text) errors.push(`Row ${idx + 1}: Missing question statement text`);
        if (!r.options || r.options.length < 2) errors.push(`Row ${idx + 1}: Options must have at least 2 choices`);
        if (!r.correctOption && (!r.answerKey || !r.answerKey.correctOptions)) {
          errors.push(`Row ${idx + 1}: Missing correct answer option`);
        }
      });

      setImportValidationErrors(errors);
      setParsedImportRows(rows);
      setImportStep(2);
    } catch (err: any) {
      toast.error(err.message || 'Invalid JSON format');
    }
  };

  const handleConfirmImport = async () => {
    try {
      const formattedItems = parsedImportRows.map((r, idx) => ({
        id: `q_imp_${Date.now().toString(36)}_${idx}`,
        versionId: `qv_imp_${Date.now().toString(36)}_${idx}`,
        examSlug: r.examSlug || 'neet',
        subjectSlug: r.subjectSlug || 'physics',
        subjectName: r.subjectName || 'Physics',
        chapterSlug: r.chapterSlug || 'general',
        conceptName: r.conceptName || 'General Practice',
        questionType: r.questionType || 'single_correct',
        difficulty: r.difficulty || 'medium',
        marks: r.marks || 4,
        negativeMarks: r.negativeMarks !== undefined ? r.negativeMarks : -1,
        status: r.status || 'published',
        text: r.text,
        options: Array.isArray(r.options)
          ? r.options.map((opt: any, oIdx: number) => ({
              key: opt.key || String.fromCharCode(65 + oIdx),
              text: typeof opt === 'string' ? opt : opt.text,
            }))
          : [],
        answerKey: r.answerKey || { correctOptions: [r.correctOption || 'A'] },
        explanation: r.explanation || { text: 'Verified administrator solution.' },
      }));

      const res = await fetch('/api/questions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ questions: formattedItems }),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to import questions');
      }

      logAdminAction(
        'bulk_import_questions',
        'question_bank',
        `${formattedItems.length}_questions`,
        `Imported ${formattedItems.length} questions from JSON payload`
      );
      toast.success(`Successfully saved ${formattedItems.length} questions into persistent database!`);
      setShowImportModal(false);
      setImportStep(1);
      setImportJsonText('');
      await loadQuestions();
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const filtered = questions.filter((q) => {
    const matchSearch =
      q.text.toLowerCase().includes(search.toLowerCase()) ||
      q.conceptName.toLowerCase().includes(search.toLowerCase()) ||
      q.id.toLowerCase().includes(search.toLowerCase());
    const matchSub = filterSubject === 'all' || q.subjectSlug === filterSubject;
    const matchDiff = filterDifficulty === 'all' || q.difficulty === filterDifficulty;
    const matchStatus = filterStatus === 'all' || q.status === filterStatus;
    return matchSearch && matchSub && matchDiff && matchStatus;
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Create / Edit Question Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-2xl rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                {editingQuestion ? 'Edit Question Record' : 'Author New Mathematical Question'}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowPreview(!showPreview)}
                  className={`rounded-full px-3 py-1 text-xs font-semibold border transition-all ${
                    showPreview ? 'bg-[#20252B] text-white' : 'border-[#DCE2E6] bg-white text-[#66727D]'
                  }`}
                >
                  <Eye className="h-3.5 w-3.5 inline mr-1" />
                  <span>{showPreview ? 'Editor' : 'Live Preview'}</span>
                </button>
                <button onClick={() => setShowCreateModal(false)} className="text-[#66727D]">
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {duplicateWarning && (
              <div className="rounded-xl bg-[#FEF3C7] border border-[#FDE68A] p-3 flex items-center gap-2 text-xs text-[#92400E]">
                <AlertTriangle className="h-4 w-4 shrink-0" />
                <span>{duplicateWarning}</span>
              </div>
            )}

            {showPreview ? (
              <div className="rounded-2xl bg-[#F1F3F4] p-6 border border-[#DCE2E6] space-y-4">
                <div className="text-xs font-bold text-[#20252B] uppercase tracking-wider">
                  Live Student KaTeX Preview
                </div>
                <div className="text-sm text-[#20252B]">
                  <MathText content={formData.text || 'Question statement will render here...'} />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  {formData.options.map((opt) => (
                    <div
                      key={opt.key}
                      className={`rounded-xl border p-2.5 flex items-center gap-2 ${
                        opt.key === formData.correctOption
                          ? 'border-[#20252B] bg-[#E9EEF1] font-bold text-[#20252B]'
                          : 'border-[#DCE2E6] bg-white text-[#66727D]'
                      }`}
                    >
                      <span className="font-mono">{opt.key}.</span>
                      <MathText content={opt.text || `Option ${opt.key}`} />
                    </div>
                  ))}
                </div>
                {formData.explanationText && (
                  <div className="rounded-xl bg-white p-3 border border-[#DCE2E6] text-xs space-y-1">
                    <span className="font-bold text-[#20252B]">Solution:</span>
                    <div className="text-[#20252B]">
                      <MathText content={formData.explanationText} />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <form onSubmit={handleSaveQuestion} className="space-y-4 text-xs">
                <div>
                  <label className="block text-[#66727D] font-medium">
                    Question Statement (Supports KaTeX equations: e.g. $F = ma$)
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder="Enter question statement with standard markdown or LaTeX math..."
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[#66727D] font-medium">Subject</label>
                    <select
                      value={formData.subjectSlug}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          subjectSlug: e.target.value,
                          subjectName: e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1),
                        })
                      }
                      className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                    >
                      <option value="physics">Physics</option>
                      <option value="chemistry">Chemistry</option>
                      <option value="botany">Botany</option>
                      <option value="zoology">Zoology</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#66727D] font-medium">Difficulty</label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value as any })}
                      className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                    >
                      <option value="easy">Easy (+4 / -1)</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#66727D] font-medium">Concept / Topic</label>
                    <input
                      type="text"
                      value={formData.conceptName}
                      onChange={(e) => setFormData({ ...formData, conceptName: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                    />
                  </div>
                </div>

                {/* 4 Choices */}
                <div className="space-y-2">
                  <label className="block text-[#66727D] font-medium">Four Answer Choices</label>
                  <div className="grid grid-cols-2 gap-2">
                    {formData.options.map((opt, idx) => (
                      <div key={opt.key} className="flex items-center gap-2">
                        <span className="font-mono font-bold text-xs text-[#20252B]">{opt.key}:</span>
                        <input
                          type="text"
                          required
                          value={opt.text}
                          onChange={(e) => {
                            const next = [...formData.options];
                            next[idx].text = e.target.value;
                            setFormData({ ...formData, options: next });
                          }}
                          placeholder={`Option ${opt.key} text`}
                          className="flex-1 rounded-xl border border-[#DCE2E6] bg-white p-2 text-xs text-[#20252B]"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[#66727D] font-medium">Correct Option</label>
                    <select
                      value={formData.correctOption}
                      onChange={(e) => setFormData({ ...formData, correctOption: e.target.value })}
                      className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-bold"
                    >
                      <option value="A">Option A</option>
                      <option value="B">Option B</option>
                      <option value="C">Option C</option>
                      <option value="D">Option D</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[#66727D] font-medium">Publication Status</label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                      className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                    >
                      <option value="published">Published</option>
                      <option value="pending_review">Pending Review</option>
                      <option value="draft">Draft</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[#66727D] font-medium">Detailed Explanation</label>
                  <textarea
                    rows={2}
                    value={formData.explanationText}
                    onChange={(e) => setFormData({ ...formData, explanationText: e.target.value })}
                    placeholder="Step-by-step scientific solution..."
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                  />
                </div>

                <div className="pt-2 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm"
                  >
                    {editingQuestion ? 'Save Revision' : 'Publish Question'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Bulk Import Modal */}
      {showImportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-xl rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                Bulk Question Import (JSON / CSV)
              </h3>
              <button onClick={() => setShowImportModal(false)} className="text-[#66727D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            {importStep === 1 && (
              <div className="space-y-4 text-xs">
                <p className="text-[#66727D]">
                  Paste structured JSON array of questions. Every record is checked for question text, minimum 2 choices, valid correct keys, and marks.
                </p>

                <textarea
                  rows={8}
                  value={importJsonText}
                  onChange={(e) => setImportJsonText(e.target.value)}
                  placeholder={`[\n  {\n    "text": "What is the unit of electric flux?",\n    "subjectSlug": "physics",\n    "options": ["V·m", "N/C", "J/s", "T·m²"],\n    "correctOption": "A",\n    "marks": 4\n  }\n]`}
                  className="w-full rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 font-mono text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
                />

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowImportModal(false)}
                    className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleValidateImport}
                    className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm"
                  >
                    Validate Schema →
                  </button>
                </div>
              </div>
            )}

            {importStep === 2 && (
              <div className="space-y-4 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#20252B]">
                    Validation Summary: {parsedImportRows.length} questions parsed
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                      importValidationErrors.length === 0
                        ? 'bg-[#E9EEF1] text-[#20252B]'
                        : 'bg-[#FDEDF0] text-[#E4002B]'
                    }`}
                  >
                    {importValidationErrors.length === 0 ? 'Passed Schema Validation' : `${importValidationErrors.length} Errors`}
                  </span>
                </div>

                {importValidationErrors.length > 0 ? (
                  <div className="rounded-2xl bg-[#FDEDF0] p-4 text-xs text-[#E4002B] space-y-1 max-h-40 overflow-y-auto">
                    {importValidationErrors.map((err, idx) => (
                      <div key={idx}>• {err}</div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-2xl bg-[#E9EEF1] p-4 text-xs text-[#20252B] space-y-1">
                    ✓ All rows conform to question database schemas. Ready to import.
                  </div>
                )}

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setImportStep(1)}
                    className="flex-1 rounded-full border border-[#DCE2E6] py-2.5 font-semibold text-[#20252B]"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    disabled={importValidationErrors.length > 0}
                    onClick={handleConfirmImport}
                    className="flex-1 rounded-full bg-[#20252B] py-2.5 font-bold text-white shadow-sm disabled:opacity-50"
                  >
                    Confirm Import
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Question Bank CMS & Repository
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            KaTeX mathematical equation rendering, multi-type options, duplicate detection, and bulk import.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="inline-flex items-center gap-2 rounded-full border border-[#DCE2E6] bg-white px-5 py-2.5 text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] transition-all"
          >
            <Upload className="h-4 w-4" />
            <span>Bulk Import</span>
          </button>
          <button
            onClick={handleOpenCreate}
            className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
          >
            <Plus className="h-4 w-4" />
            <span>Author Question</span>
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3.5 top-3 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search questions by text or concept..."
            className="w-full rounded-full border border-[#DCE2E6] bg-white py-2 pl-10 pr-4 text-xs text-[#20252B] focus:border-[#20252B] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <select
            value={filterSubject}
            onChange={(e) => setFilterSubject(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B]"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="botany">Botany</option>
            <option value="zoology">Zoology</option>
          </select>

          <select
            value={filterDifficulty}
            onChange={(e) => setFilterDifficulty(e.target.value)}
            className="rounded-full border border-[#DCE2E6] bg-white px-3 py-1.5 text-xs text-[#20252B]"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
      </div>

      {/* Questions Listing */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="rounded-[24px] border border-[#DCE2E6] bg-white p-12 text-center text-[#66727D] shadow-sm space-y-2">
            <FileText className="h-8 w-8 mx-auto text-[#A1A1AA]" />
            <h3 className="text-base font-bold text-[#20252B]">Your question bank is empty.</h3>
            <p className="text-xs text-[#66727D]">
              Author a mathematical question using KaTeX or import validated questions via JSON/CSV.
            </p>
          </div>
        ) : (
          filtered.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-[24px] border border-[#DCE2E6] bg-white p-6 shadow-sm hover:border-[#20252B] transition-all space-y-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2E6] pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#20252B]">Q{idx + 1}.</span>
                <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-bold text-[#20252B]">
                  {q.subjectName}
                </span>
                <span className="text-[#20252B] font-semibold">{q.conceptName}</span>
                <span className="text-[#66727D]">({q.difficulty})</span>
              </div>

              <div className="flex items-center gap-3">
                <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                  {q.status}
                </span>
                <button
                  onClick={() => handleOpenEdit(q)}
                  className="rounded-full p-1.5 text-[#66727D] hover:bg-[#F1F3F4] hover:text-[#20252B]"
                  title="Edit Question"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="text-sm text-[#20252B] leading-relaxed">
              <MathText content={q.text} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {q.options?.map((opt) => {
                const isCorrect = q.answerKey?.correctOptions?.includes(opt.key);
                return (
                  <div
                    key={opt.key}
                    className={`rounded-xl border p-2.5 flex items-center gap-2 ${
                      isCorrect
                        ? 'border-[#20252B] bg-[#E9EEF1] font-bold text-[#20252B]'
                        : 'border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]'
                    }`}
                  >
                    <span className="font-mono">{opt.key}.</span>
                    <MathText content={opt.text} />
                    {isCorrect && (
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#20252B] ml-auto shrink-0" />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}
