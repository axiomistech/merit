'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, FileText, CheckCircle2, Clock, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

export default function StudentUpscDashboardPage() {
  const [activeTab, setActiveTab] = useState<'prelims' | 'mains'>('mains');

  // Mains Answer Writing Studio State
  const samplePrompt = {
    paper: 'General Studies Paper II',
    marks: 15,
    wordLimit: 250,
    question:
      'Critically examine the constitutional significance of the Writ of Habeas Corpus in safeguarding individual liberty during emergencies. Illustrate with landmark judicial precedents.',
  };

  const [essayContent, setEssayContent] = useState('');
  const [autosaveStatus, setAutosaveStatus] = useState<'saved' | 'saving'>('saved');

  // Word & character counts
  const wordCount = essayContent.trim() ? essayContent.trim().split(/\s+/).length : 0;
  const charCount = essayContent.length;

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fort_upsc_mains_draft');
      if (saved) {
        setEssayContent(saved);
      }
    }
  }, []);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setEssayContent(text);
    setAutosaveStatus('saving');

    // Debounced autosave
    if (typeof window !== 'undefined') {
      localStorage.setItem('fort_upsc_mains_draft', text);
      setTimeout(() => {
        setAutosaveStatus('saved');
      }, 500);
    }
  };

  const handleSubmitAnswer = () => {
    if (wordCount < 50) {
      toast.error('Response too short. Please draft at least 50 words.');
      return;
    }
    toast.success('Descriptive answer submitted for rubric evaluation!');
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#263554] pb-6">
        <div>
          <span className="rounded bg-[#8B5CF6]/20 px-2 py-0.5 text-xs font-bold text-[#8B5CF6]">
            FORT UPSC Civil Services
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
            UPSC CSE Preparation Studio
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('mains')}
            className={`rounded-lg px-4 py-2 text-xs font-bold ${
              activeTab === 'mains' ? 'bg-[#6486C6] text-[#0B1020]' : 'bg-[#172033] text-[#A7B0C0]'
            }`}
          >
            Mains Answer Writing Studio
          </button>
          <button
            onClick={() => setActiveTab('prelims')}
            className={`rounded-lg px-4 py-2 text-xs font-bold ${
              activeTab === 'prelims' ? 'bg-[#6486C6] text-[#0B1020]' : 'bg-[#172033] text-[#A7B0C0]'
            }`}
          >
            Prelims GS & CSAT Tests
          </button>
        </div>
      </div>

      {activeTab === 'mains' ? (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Answer Writing Canvas */}
          <div className="lg:col-span-2 space-y-4">
            <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6">
              <div className="flex items-center justify-between border-b border-[#263554] pb-3 text-xs">
                <span className="font-bold text-[#6486C6]">{samplePrompt.paper}</span>
                <span className="text-[#A7B0C0]">
                  Max Marks: <strong>{samplePrompt.marks}</strong> • Limit:{' '}
                  <strong>{samplePrompt.wordLimit} Words</strong>
                </span>
              </div>

              <div className="mt-4 text-sm font-semibold leading-relaxed text-[#F5F7FB]">
                {samplePrompt.question}
              </div>
            </div>

            {/* Editor Area */}
            <div className="rounded-xl border border-[#263554] bg-[#11182A] p-4">
              <div className="flex items-center justify-between border-b border-[#263554] pb-2 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#F5F7FB]">
                    Words: <strong className={wordCount > 250 ? 'text-[#EF4444]' : 'text-[#10B981]'}>{wordCount}</strong> / 250
                  </span>
                  <span className="text-[#7C8799]">Chars: {charCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#10B981]" />
                  <span className="text-[11px] text-[#A7B0C0]">
                    {autosaveStatus === 'saving' ? 'Autosaving...' : 'Draft Saved'}
                  </span>
                </div>
              </div>

              <textarea
                value={essayContent}
                onChange={handleTextChange}
                rows={14}
                placeholder="Write your analytical response here. Follow introduction, body arguments with constitutional articles and landmark cases, and a forward-looking conclusion..."
                className="mt-3 w-full resize-none rounded-lg border border-[#263554] bg-[#0B1020] p-4 text-sm text-[#F5F7FB] placeholder-[#7C8799] focus:border-[#6486C6] focus:outline-none leading-relaxed font-sans"
              />

              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSubmitAnswer}
                  className="rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
                >
                  Submit for Rubric Evaluation
                </button>
              </div>
            </div>
          </div>

          {/* Rubric Criteria Guidelines */}
          <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6 space-y-4">
            <h3 className="text-sm font-bold text-[#F5F7FB]">Standard UPSC Rubric Criteria</h3>
            <p className="text-xs text-[#A7B0C0]">
              Examiners evaluate responses against 4 structured parameters:
            </p>

            <div className="space-y-3 text-xs">
              <div className="rounded-lg border border-[#263554] bg-[#172033] p-3">
                <strong className="text-[#6486C6]">1. Constitutional Accuracy (4 Marks)</strong>
                <p className="mt-1 text-[#A7B0C0]">
                  Cites Articles 32, 226, 359 and the 44th Constitutional Amendment Act, 1978.
                </p>
              </div>

              <div className="rounded-lg border border-[#263554] bg-[#172033] p-3">
                <strong className="text-[#6486C6]">2. Judicial Precedents (4 Marks)</strong>
                <p className="mt-1 text-[#A7B0C0]">
                  Analyzes ADM Jabalpur v. Shivkant Shukla (1976) and Justice K.S. Puttaswamy (2017).
                </p>
              </div>

              <div className="rounded-lg border border-[#263554] bg-[#172033] p-3">
                <strong className="text-[#6486C6]">3. Critical Structure & Flow (4 Marks)</strong>
                <p className="mt-1 text-[#A7B0C0]">
                  Clear division between historical stance, emergency misuse, and modern safeguard.
                </p>
              </div>

              <div className="rounded-lg border border-[#263554] bg-[#172033] p-3">
                <strong className="text-[#6486C6]">4. Concluding Vision (3 Marks)</strong>
                <p className="mt-1 text-[#A7B0C0]">
                  Balanced conclusion upholding substantive due process and rule of law.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border border-[#263554] bg-[#11182A] p-6">
          <h3 className="text-base font-bold text-[#F5F7FB]">UPSC Prelims General Studies Tests</h3>
          <p className="mt-2 text-xs text-[#A7B0C0]">
            Timed 100-question objective papers with -0.66 negative marking.
          </p>
          <div className="mt-6">
            <Link
              href="/exam/upsc-demo"
              className="rounded-lg bg-[#6486C6] px-5 py-2.5 text-xs font-bold text-[#0B1020]"
            >
              Start Prelims Paper 01
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
