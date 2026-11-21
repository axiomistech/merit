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
          <div className="w-full max-w-lg rounded-[28px] border border-[#E6E5DE] bg-white p-6 sm:p-8 shadow-2xl my-8 space-y-4">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3">
              <h3 className="text-lg font-bold font-serif text-[#263126]">
                Configure New Test Paper
              </h3>
              <button onClick={() => setShowModal(false)} className="text-[#92958D]">
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTest} className="space-y-4 text-xs">
              <div>
                <label className="block text-[#73786E] font-medium">Test Paper Title</label>
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
                  className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#73786E] font-medium">Target Exam</label>
                  <select
                    value={formData.examSlug}
                    onChange={(e) => setFormData({ ...formData, examSlug: e.target.value })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126]"
                  >
                    <option value="neet">NEET (UG)</option>
                    <option value="jee-main">JEE Main</option>
                    <option value="jee-advanced">JEE Advanced</option>
                    <option value="upsc">UPSC CSE</option>
                    <option value="engineering">Engineering</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[#73786E] font-medium">Test Type</label>
                  <select
                    value={formData.paperType}
                    onChange={(e) => setFormData({ ...formData, paperType: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126]"
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
                  <label className="block text-[#73786E] font-medium">Questions</label>
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
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#73786E] font-medium">Duration (Mins)</label>
                  <input
                    type="number"
                    value={formData.durationMinutes}
                    onChange={(e) => setFormData({ ...formData, durationMinutes: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#73786E] font-medium">Max Marks</label>
                  <input
                    type="number"
                    value={formData.maxMarks}
                    onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126] font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[#73786E] font-medium">Price (INR)</label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[#73786E] font-medium">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="mt-1 w-full rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-xs text-[#263126]"
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
                  className="flex-1 rounded-full border border-[#E6E5DE] py-2.5 font-semibold text-[#263126]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 rounded-full bg-[#263126] py-2.5 font-bold text-white shadow-sm"
                >
                  Publish Test
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-serif text-[#263126]">
            Test Builder & Examination Composer
          </h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Compose question papers, set section timers, configure negative marking, and manage publishing states.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-full bg-[#263126] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
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
            className="rounded-[28px] border border-[#E6E5DE] bg-white p-6 shadow-sm hover:border-[#263126] transition-all flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-[#E9EEE3] px-3 py-1 font-mono text-[10px] font-bold text-[#758B62] uppercase">
                  {test.examSlug}
                </span>
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase ${
                    test.status === 'published'
                      ? 'bg-[#E9EEE3] text-[#758B62]'
                      : 'bg-[#FEF3C7] text-[#92400E]'
                  }`}
                >
                  {test.status}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-bold font-serif text-[#263126]">
                {test.name}
              </h3>

              <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-[#F7F5EF] p-3 text-center text-xs">
                <div>
                  <div className="text-[10px] text-[#73786E]">Questions</div>
                  <div className="font-mono font-bold text-[#263126]">{test.totalQuestions}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#73786E]">Duration</div>
                  <div className="font-mono font-bold text-[#263126]">{test.durationMinutes}m</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#73786E]">Max Marks</div>
                  <div className="font-mono font-bold text-[#758B62]">{test.maxMarks}</div>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#ECEAE4] flex items-center justify-between text-xs">
              <span className="text-[#73786E]">
                Price: <strong className="text-[#263126] font-mono">₹{test.price}</strong>
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleToggleStatus(test.id, test.status)}
                  className={`font-semibold text-xs hover:underline ${
                    test.status === 'published' ? 'text-[#92400E]' : 'text-[#758B62]'
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
