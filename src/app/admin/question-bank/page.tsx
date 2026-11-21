'use client';

import React, { useState } from 'react';
import { BookOpen, Plus, Search, Filter, CheckCircle2 } from 'lucide-react';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';
import { MathText } from '@/components/ui/MathText';

export default function AdminQuestionBankPage() {
  const [questions, setQuestions] = useState(SAMPLE_NEET_QUESTIONS);
  const [selectedSubject, setSelectedSubject] = useState('all');

  const filtered = selectedSubject === 'all'
    ? questions
    : questions.filter((q) => q.subjectSlug === selectedSubject);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#F5F7FB]">Question Bank CMS</h1>
          <p className="text-xs text-[#A7B0C0]">
            Author, version, and publish mathematical and scientific questions with KaTeX support.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-xl border border-[#1D2940] bg-[#0B1020] px-3 py-2 text-xs text-[#F5F7FB] focus:outline-none"
          >
            <option value="all">All Subjects</option>
            <option value="physics">Physics</option>
            <option value="chemistry">Chemistry</option>
            <option value="botany">Botany</option>
            <option value="zoology">Zoology</option>
          </select>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((q, idx) => (
          <div
            key={q.id}
            className="rounded-xl border border-[#1D2940] bg-[#0B1020] p-6 space-y-4 hover:border-[#6486C6]/50 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#1D2940] pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#6486C6]">Q{idx + 1}</span>
                <span className="rounded bg-[#11182A] px-2 py-0.5 text-[#A7B0C0]">
                  {q.subjectName}
                </span>
                <span className="text-[#F5F7FB] font-semibold">{q.conceptName}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="rounded bg-[#10B981]/20 px-2 py-0.5 font-bold text-[#10B981]">
                  PUBLISHED
                </span>
                <span className="text-[#A7B0C0]">
                  +{q.marks} / -{q.negativeMarks} Marks
                </span>
              </div>
            </div>

            <div className="text-sm text-[#F5F7FB]">
              <MathText content={q.text} />
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              {q.options.map((opt) => (
                <div
                  key={opt.key}
                  className={`flex items-center gap-2 rounded-lg border p-2.5 ${
                    q.answerKey?.correctOptions?.includes(opt.key)
                      ? 'border-[#10B981] bg-[#10B981]/10 text-[#10B981]'
                      : 'border-[#1D2940] bg-[#11182A] text-[#A7B0C0]'
                  }`}
                >
                  <span className="font-mono font-bold">{opt.key}.</span>
                  <MathText content={opt.text} />
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="rounded-lg bg-[#11182A] p-3 text-xs text-[#A7B0C0]">
                <strong className="text-[#6486C6]">Explanation:</strong> {q.explanation.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
