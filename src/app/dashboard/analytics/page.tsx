'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, TrendingUp, CheckCircle2, Clock, AlertTriangle } from 'lucide-react';

export default function StudentAnalyticsPage() {
  const subjectAccuracy = [
    { name: 'Physics', accuracy: 75, questions: 45, timePerQ: '85s' },
    { name: 'Chemistry', accuracy: 80, questions: 45, timePerQ: '65s' },
    { name: 'Botany', accuracy: 92, questions: 45, timePerQ: '45s' },
    { name: 'Zoology', accuracy: 84, questions: 45, timePerQ: '50s' },
  ];

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div className="border-b border-[#263554] pb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6486C6]">
          Diagnostic Intelligence
        </span>
        <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#F5F7FB]">
          Speed, Accuracy & Mastery Analytics
        </h1>
        <p className="text-xs text-[#A7B0C0]">
          Calculated from your submitted attempts under simulation conditions.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {subjectAccuracy.map((sub) => (
          <div key={sub.name} className="rounded-xl border border-[#263554] bg-[#11182A] p-5 space-y-3">
            <div className="flex justify-between items-center">
              <h3 className="text-base font-bold text-[#F5F7FB]">{sub.name}</h3>
              <span className="font-mono text-sm font-bold text-[#10B981]">{sub.accuracy}%</span>
            </div>

            <div className="h-2 w-full rounded-full bg-[#172033]">
              <div
                className="h-2 rounded-full bg-[#10B981]"
                style={{ width: `${sub.accuracy}%` }}
              />
            </div>

            <div className="flex justify-between text-xs text-[#A7B0C0] pt-1">
              <span>{sub.questions} Questions</span>
              <span>Avg: {sub.timePerQ}/Q</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
