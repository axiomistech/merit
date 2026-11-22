'use client';

import React, { useState } from 'react';
import { Clock, Plus, Layers, ShieldCheck, Play, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminMockTestsPage() {
  const [seriesList, setSeriesList] = useState<any[]>([]);

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <h1 className="text-2xl font-bold font-sans text-[#20252B]">
            Mock Test Series Management
          </h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Curate full-length mock series, schedule nationwide test windows, and monitor candidate participation.
          </p>
        </div>

        <button
          onClick={() => toast.info('Opened new test series creator')}
          className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-5 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-black transition-all"
        >
          <Plus className="h-4 w-4" />
          <span>New Test Series</span>
        </button>
      </div>

      <div className="space-y-6">
        {seriesList.length === 0 ? (
          <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-12 text-center text-[#66727D] shadow-sm space-y-2">
            <Layers className="h-8 w-8 mx-auto text-[#A1A1AA]" />
            <h3 className="text-base font-bold text-[#20252B]">No mock test series configured yet.</h3>
            <p className="text-xs text-[#66727D]">
              Click New Test Series above to assemble and schedule structured examination series.
            </p>
          </div>
        ) : (
          seriesList.map((ser) => (
            <div
              key={ser.id}
              className="rounded-[28px] border border-[#DCE2E6] bg-white p-6 sm:p-8 shadow-sm space-y-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
                <div>
                  <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-mono text-[10px] font-bold text-[#20252B] uppercase">
                    {ser.exam} SERIES
                  </span>
                  <h3 className="mt-2 text-xl font-bold font-sans text-[#20252B]">
                    {ser.title}
                  </h3>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono">
                  <span className="text-[#66727D]">
                    Attempts: <strong className="text-[#20252B]">{ser.totalAttempts}</strong>
                  </span>
                  <span className="rounded-full bg-[#E9EEF1] px-3 py-1 font-bold text-[#20252B]">
                    {ser.status}
                  </span>
                </div>
              </div>

              {/* Papers list */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {ser.papers.map((p: any, idx: number) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#DCE2E6] bg-[#F1F3F4] p-4 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-[#20252B]">{p.name}</div>
                      <div className="text-[11px] text-[#66727D] mt-0.5">
                        {p.qs} Questions • {p.marks} Marks
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#20252B]">
                        {p.attempts}
                      </span>{' '}
                      <span className="text-[10px] text-[#66727D]">attempts</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
