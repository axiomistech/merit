'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  Play,
  Layers,
  Shield,
  X,
  Edit2,
  Archive,
} from 'lucide-react';
import { AdminTestRecord } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminTestBuilderPage() {
  const [tests, setTests] = useState<AdminTestRecord[]>([
    {
      id: 'paper_neet_mock_01',
      name: 'FORT NEET (UG) Full Mock Simulation #1',
      slug: 'neet-full-mock-01',
      examSlug: 'neet',
      paperType: 'mock_exam',
      durationMinutes: 200,
      totalQuestions: 180,
      maxMarks: 720,
      price: 10,
      isFreeEligible: true,
      status: 'published',
      questionIds: ['q1', 'q2', 'q3'],
      created_at: '2026-01-01T00:00:00Z',
    },
    {
      id: 'paper_jm_mock_01',
      name: 'FORT JEE Main CBT Simulation #1',
      slug: 'jee-main-cbt-01',
      examSlug: 'jee-main',
      paperType: 'mock_exam',
      durationMinutes: 180,
      totalQuestions: 75,
      maxMarks: 300,
      price: 10,
      isFreeEligible: true,
      status: 'published',
      questionIds: ['q4', 'q5'],
      created_at: '2026-01-03T00:00:00Z',
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    examSlug: 'neet',
    paperType: 'mock_exam' as const,
    durationMinutes: 180,
    totalQuestions: 90,
    maxMarks: 360,
    price: 10,
    isFreeEligible: true,
    status: 'published' as const,
  });

  const handleCreateTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    const newTest: AdminTestRecord = {
      id: `paper_${Date.now().toString(36)}`,
      ...formData,
      questionIds: [],
      created_at: new Date().toISOString(),
    };

    setTests([newTest, ...tests]);
    logAdminAction('create_test_paper', 'test_paper', newTest.id, `Created test paper ${newTest.name}`);
    toast.success(`Test paper ${newTest.name} created and published.`);
    setShowModal(false);
  };

  const handleToggleStatus = (id: string, currentStatus: string) => {
    const nextStatus = currentStatus === 'published' ? 'paused' : 'published';
    setTests((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: nextStatus as any } : t))
    );
    logAdminAction('toggle_test_status', 'test_paper', id, `Changed status to ${nextStatus}`);
    toast.success(`Test paper status updated to ${nextStatus}.`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-3">
              <h3 className="text-lg font-bold font-sans text-[#20252B]">
                Configure New Test Paper
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#66727D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#66727D] font-medium">Test Paper Title</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                    })
                  }
                  placeholder="e.g. NEET Mechanics Chapter Test"
                  className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">Target Exam</label>
                  <select
                    value={formData.examSlug}
                    onChange={(e) => setFormData({ ...formData, examSlug: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                  >
                    <option value="neet">NEET (UG)</option>
                    <option value="jee-main">JEE Main</option>
                    <option value="jee-advanced">JEE Advanced</option>
                    <option value="upsc">UPSC CSE</option>
                    <option value="engineering">Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Test Type</label>
                  <select
                    value={formData.paperType}
                    onChange={(e) => setFormData({ ...formData, paperType: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                  >
                    <option value="mock_exam">Full Mock Examination</option>
                    <option value="chapter_test">Chapter Test</option>
                    <option value="subject_test">Subject Test</option>
                    <option value="previous_year">Previous Year Paper</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">Questions</label>
                  <input
                    type="number"
                    value={formData.totalQuestions}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        totalQuestions: Number(e.target.value),
                        maxMarks: Number(e.target.value) * 4,
                      })
                    }
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Duration (Mins)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Max Marks</label>
                  <input
                    type="number"
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#66727D] font-medium">Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#66727D] font-medium">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-[#DCE2E6] bg-white p-2.5 text-xs text-[#20252B]"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="paused">Paused</option>
                  </select>
                </div>
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
                  Publish Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Test Builder & Examination Composer
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Compose question papers, set section timers, configure negative marking, and manage publishing states.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>Compose New Test</span>
        </button>
      </div>

      {/* Tests Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {tests.map((test) => (
          <div
            key={test.id}
            className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 shadow-sm hover:border-[#20252B] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                  {test.examSlug}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    test.status === 'published'
                      ? 'bg-[#E9EEF1] text-[#20252B]'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  {test.status}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-bold font-sans text-[#20252B]">
                {test.name}
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F1F3F4] p-3 text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#66727D]">Questions</div>
                  <div className="font-mono font-bold text-[#20252B]">{test.totalQuestions}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Duration</div>
                  <div className="font-mono font-bold text-[#20252B]">{test.durationMinutes}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#66727D]">Max Marks</div>
                  <div className="font-mono font-bold text-[#20252B]">{test.maxMarks}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE2E6] flex items-center justify-between text-xs">
              <span className="text-[#66727D]">
                Price: <strong className="text-[#20252B] font-mono">₹{test.price}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(test.id, test.status)}
                  className={`font-semibold text-xs hover:underline ${
                    test.status === 'published' ? 'text-[#92400E]' : 'text-[#20252B]'
                  }`}
                >
                  {test.status === 'published' ? 'Pause' : 'Publish'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
