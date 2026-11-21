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
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Question Bank CMS</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Author, version, and publish mathematical and scientific questions with KaTeX support.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="rounded-xl border border-[#E6E5DE] bg-white px-3 py-2 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
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
            className="rounded-2xl border border-[#E6E5DE] bg-white p-6 space-y-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)] hover:border-[#9CAF88]/60 transition-colors"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE4] pb-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-[#758B62]">Q{idx + 1}</span>
                <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 text-[#263126] font-semibold">
                  {q.subjectName}
                </span>
                <span className="text-[#263126] font-semibold">{q.conceptName}</span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="rounded-full bg-[#E9EEE3] px-2.5 py-0.5 font-bold text-[#758B62]">
                  PUBLISHED
                </span>
                <span className="text-[#73786E]">
                  +{q.marks} / -{q.negativeMarks} Marks
                </span>
              </div>
            </div>

            <div className="text-sm text-[#263126] leading-relaxed">
              <MathText content={q.text} />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs">
              {q.options.map((opt) => (
                <div
                  key={opt.key}
                  className={`flex items-center gap-2.5 rounded-xl border p-2.5 ${
                    q.answerKey?.correctOptions?.includes(opt.key)
                      ? 'border-[#9CAF88] bg-[#E9EEE3] text-[#263126]'
                      : 'border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]'
                  }`}
                >
                  <span className="font-mono font-bold">{opt.key}.</span>
                  <MathText content={opt.text} />
                </div>
              ))}
            </div>

            {q.explanation && (
              <div className="rounded-xl bg-[#F7F5EF] p-4 text-xs text-[#73786E]">
                <strong className="text-[#758B62]">Explanation:</strong> {q.explanation.text}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
