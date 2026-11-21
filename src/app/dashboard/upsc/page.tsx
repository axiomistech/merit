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
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-6">
        <div>
          <span className="rounded-lg bg-[#E9EEE3] px-2.5 py-1 text-xs font-bold text-[#758B62]">
            FORT UPSC Civil Services
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#263126]">
            UPSC CSE Preparation Studio
          </h1>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('mains')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'mains'
                ? 'bg-[#9CAF88] text-[#263126] shadow-soft'
                : 'bg-white text-[#73786E] border border-[#E6E5DE]'
            }`}
          >
            Mains Answer Writing Studio
          </button>
          <button
            onClick={() => setActiveTab('prelims')}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'prelims'
                ? 'bg-[#9CAF88] text-[#263126] shadow-soft'
                : 'bg-white text-[#73786E] border border-[#E6E5DE]'
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
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-7 shadow-soft">
              <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3 text-xs">
                <span className="font-bold text-[#758B62]">{samplePrompt.paper}</span>
                <span className="text-[#73786E]">
                  Max Marks: <strong className="text-[#263126]">{samplePrompt.marks}</strong> • Limit:{' '}
                  <strong className="text-[#263126]">{samplePrompt.wordLimit} Words</strong>
                </span>
              </div>

              <div className="mt-4 text-sm sm:text-base font-semibold leading-relaxed text-[#263126]">
                {samplePrompt.question}
              </div>
            </div>

            {/* Editor Area */}
            <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft space-y-3">
              <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-3 text-xs">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[#263126]">
                    Words:{' '}
                    <strong className={wordCount > 250 ? 'text-[#E8412C]' : 'text-[#758B62]'}>
                      {wordCount}
                    </strong>{' '}
                    / 250
                  </span>
                  <span className="text-[#92958D]">Chars: {charCount}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#9CAF88]" />
                  <span className="text-[11px] text-[#73786E] font-medium">
                    {autosaveStatus === 'saving' ? 'Autosaving...' : 'Draft Saved'}
                  </span>
                </div>
              </div>

              <textarea
                value={essayContent}
                onChange={handleTextChange}
                rows={14}
                placeholder="Write your analytical response here. Follow introduction, body arguments with constitutional articles and landmark cases, and a forward-looking conclusion..."
                className="w-full resize-none rounded-xl border border-[#E6E5DE] bg-[#F7F5EF]/50 p-4 text-sm text-[#2E332D] placeholder-[#92958D] focus:border-[#9CAF88] focus:bg-white focus:outline-none leading-relaxed font-sans transition-all"
              />

              <div className="flex justify-end pt-2">
                <button
                  onClick={handleSubmitAnswer}
                  className="rounded-xl bg-[#9CAF88] px-6 py-2.5 text-xs font-bold text-[#263126] hover:bg-[#8fa27a] shadow-soft"
                >
                  Submit for Rubric Evaluation
                </button>
              </div>
            </div>
          </div>

          {/* Rubric Criteria Guidelines */}
          <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-soft space-y-4">
            <h3 className="text-sm font-bold text-[#263126]">UPSC Evaluation Rubric</h3>
            <p className="text-xs text-[#73786E]">
              Responses are benchmarked against 4 structured dimensions:
            </p>

            <div className="space-y-3 text-xs">
              <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4">
                <strong className="text-[#758B62]">1. Constitutional Accuracy (4 Marks)</strong>
                <p className="mt-1 text-[#73786E]">
                  Cites Articles 32, 226, 359 and the 44th Constitutional Amendment Act, 1978.
                </p>
              </div>

              <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4">
                <strong className="text-[#758B62]">2. Judicial Precedents (4 Marks)</strong>
                <p className="mt-1 text-[#73786E]">
                  Analyzes ADM Jabalpur v. Shivkant Shukla (1976) and Justice K.S. Puttaswamy (2017).
                </p>
              </div>

              <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4">
                <strong className="text-[#758B62]">3. Critical Structure & Flow (4 Marks)</strong>
                <p className="mt-1 text-[#73786E]">
                  Clear division between historical stance, emergency misuse, and modern safeguard.
                </p>
              </div>

              <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] p-4">
                <strong className="text-[#758B62]">4. Concluding Vision (3 Marks)</strong>
                <p className="mt-1 text-[#73786E]">
                  Balanced conclusion upholding substantive due process and rule of law.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-8 shadow-soft">
          <h3 className="text-base font-bold text-[#263126]">UPSC Prelims General Studies Tests</h3>
          <p className="mt-2 text-xs text-[#73786E]">
            Timed 100-question objective papers with -0.66 negative marking.
          </p>
          <div className="mt-6">
            <Link
              href="/exam/upsc-demo"
              className="rounded-xl bg-[#9CAF88] px-6 py-2.5 text-xs font-bold text-[#263126] shadow-soft hover:bg-[#8fa27a]"
            >
              Start Prelims Paper 01
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
