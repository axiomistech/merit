'use client';

import React, { useState, useEffect } from 'react';
import {
  ScanLine,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Eye,
  Check,
  X,
  UploadCloud,
  FileText,
  RotateCcw,
  Sparkles,
  Download,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { OMRVerificationRecord } from '@/types/admin';
import { getStoredOMRRecords, saveStoredOMRRecords } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminOMRPage() {
  const [records, setRecords] = useState<OMRVerificationRecord[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'requires_review' | 'verified' | 'flagged'>('all');
  const [activeTab, setActiveTab] = useState<'queue' | 'template_preview' | 'upload_scan'>('queue');

  // Verification modal
  const [selectedRecord, setSelectedRecord] = useState<OMRVerificationRecord | null>(null);
  const [editingBubbles, setEditingBubbles] = useState<{ [qNum: number]: string }>({});

  useEffect(() => {
    setRecords(getStoredOMRRecords());
  }, []);

  const filteredRecords = records.filter((r) => {
    const matchesSearch =
      r.candidateName.toLowerCase().includes(search.toLowerCase()) ||
      r.candidateRegistrationId.toLowerCase().includes(search.toLowerCase()) ||
      r.rollNumberEntered.includes(search);
    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenReview = (rec: OMRVerificationRecord) => {
    setSelectedRecord(rec);
    const initial: { [qNum: number]: string } = {};
    rec.bubbles.forEach((b) => {
      if (b.resolvedBubble) {
        initial[b.qNum] = b.resolvedBubble;
      } else if (b.detectedBubble) {
        initial[b.qNum] = b.detectedBubble;
      }
    });
    setEditingBubbles(initial);
  };

  const handleBubbleSelect = (qNum: number, choice: string) => {
    setEditingBubbles((prev) => ({
      ...prev,
      [qNum]: prev[qNum] === choice ? '' : choice,
    }));
  };

  const handleCommitVerification = () => {
    if (!selectedRecord) return;
    const updated = records.map((r) => {
      if (r.id === selectedRecord.id) {
        return {
          ...r,
          status: 'verified' as const,
          ambiguousCount: 0,
          reviewerName: 'Admin Evaluator',
          reviewNotes: 'Manually inspected and verified. Ambiguities resolved.',
          bubbles: r.bubbles.map((b) => ({
            ...b,
            resolvedBubble: editingBubbles[b.qNum] || b.detectedBubble,
            isAmbiguous: false,
          })),
        };
      }
      return r;
    });

    setRecords(updated);
    saveStoredOMRRecords(updated);
    logAdminAction({
      action: 'OMR_VERIFICATION_COMMITTED',
      resource_type: 'omr_sheet',
      resource_id: selectedRecord.id,
      change_summary: `Verified OMR for ${selectedRecord.candidateName} (${selectedRecord.candidateRegistrationId})`,
    });
    toast.success(`OMR verified and official marks published for ${selectedRecord.candidateName}`);
    setSelectedRecord(null);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Page Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-sans">OMR Answer Sheet Management</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Optical mark verification studio, NEET 180-Q A4 template manager, and ambiguous bubble resolution queue.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveTab('queue')}
            className={cn(
              'px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors',
              activeTab === 'queue'
                ? 'bg-[#20252B] text-white border-[#20252B]'
                : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
            )}
          >
            Verification Queue ({records.filter((r) => r.status === 'requires_review').length})
          </button>
          <button
            onClick={() => setActiveTab('template_preview')}
            className={cn(
              'px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors',
              activeTab === 'template_preview'
                ? 'bg-[#20252B] text-white border-[#20252B]'
                : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
            )}
          >
            NEET A4 Master Template
          </button>
          <button
            onClick={() => setActiveTab('upload_scan')}
            className={cn(
              'px-3.5 py-2 text-xs font-semibold rounded-xl border transition-colors',
              activeTab === 'upload_scan'
                ? 'bg-[#20252B] text-white border-[#20252B]'
                : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
            )}
          >
            <UploadCloud className="inline-block h-3.5 w-3.5 mr-1" />
            Upload Scanned OMR
          </button>
        </div>
      </div>

      {/* TAB 1: VERIFICATION QUEUE */}
      {activeTab === 'queue' && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
            <div className="relative flex-1 min-w-[260px]">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
              <input
                type="text"
                placeholder="Search candidate name, reg ID, or roll number..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] pl-10 pr-4 py-2 text-xs text-[#20252B] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-[#66727D]">Status:</span>
              {(['all', 'requires_review', 'verified', 'flagged'] as const).map((st) => (
                <button
                  key={st}
                  onClick={() => setStatusFilter(st)}
                  className={cn(
                    'px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors',
                    statusFilter === st
                      ? 'bg-[#20252B] text-white border-[#20252B]'
                      : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
                  )}
                >
                  {st.replace('_', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
                  <tr>
                    <th className="p-4 font-semibold">Candidate</th>
                    <th className="p-4 font-semibold">Paper & Booklet</th>
                    <th className="p-4 font-semibold">Roll No.</th>
                    <th className="p-4 font-semibold">Extracted Score</th>
                    <th className="p-4 font-semibold">Ambiguities</th>
                    <th className="p-4 font-semibold">Status</th>
                    <th className="p-4 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#DCE2E6]">
                  {filteredRecords.map((r) => (
                    <tr key={r.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-[#20252B]">{r.candidateName}</div>
                        <div className="font-mono text-[11px] text-[#66727D]">{r.candidateRegistrationId}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#20252B]">{r.testPaperName}</div>
                        <div className="text-[11px] font-mono text-[#66727D]">Booklet Code: {r.testBookletCode}</div>
                      </td>
                      <td className="p-4 font-mono font-medium text-[#20252B]">{r.rollNumberEntered}</td>
                      <td className="p-4 font-bold text-[#20252B]">
                        {r.autoExtractedScore} / 720
                        <span className="block text-[10px] font-normal text-[#66727D]">
                          {Math.round((r.autoExtractedScore / 720) * 100)}% accuracy
                        </span>
                      </td>
                      <td className="p-4">
                        {r.ambiguousCount > 0 ? (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#E4002B]/10 text-[#E4002B]">
                            <AlertTriangle className="h-3 w-3" />
                            {r.ambiguousCount} Flagged
                          </span>
                        ) : (
                          <span className="text-[#66727D]">0 Clean</span>
                        )}
                      </td>
                      <td className="p-4">
                        <span
                          className={cn(
                            'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                            r.status === 'verified' && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                            r.status === 'requires_review' && 'bg-amber-100 text-amber-800',
                            r.status === 'flagged' && 'bg-[#E4002B]/15 text-[#E4002B]'
                          )}
                        >
                          {r.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button
                          onClick={() => handleOpenReview(r)}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#DCE2E6] bg-white text-xs font-semibold text-[#20252B] hover:bg-[#F1F3F4] transition-colors"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          Inspect & Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredRecords.length === 0 && (
                    <tr>
                      <td colSpan={7} className="p-12 text-center text-[#66727D]">
                        No OMR records found matching criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* TAB 2: MASTER TEMPLATE PREVIEW */}
      {activeTab === 'template_preview' && (
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-4">
            <div>
              <h2 className="text-lg font-bold text-[#20252B]">NEET 180-Question Official Master Template</h2>
              <p className="text-xs text-[#66727D]">
                Accurate A4 print layout: 4 vertical answer columns, Roll number 10-digit bubble grid, Test Booklet Code, Barcode, and Declaration box.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2.5 py-1 bg-[#9CC6E0]/20 text-[#3B4C30] font-bold rounded-lg">
                Active Specification: NTA 2026
              </span>
            </div>
          </div>

          {/* Master sheet miniature schematic */}
          <div className="max-w-3xl mx-auto border-2 border-[#C97A7E] rounded-xl p-5 bg-[#FAF9F5] shadow-sm font-mono text-[11px] text-[#20252B] space-y-4">
            <div className="flex items-center justify-between border-b border-[#C97A7E] pb-3">
              <div className="font-bold text-sm tracking-wider">FORT Learning — NEET OMR ANSWER SHEET</div>
              <div className="text-[10px] text-[#66727D]">Standard A4 (210mm × 297mm) Vector Output</div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-[#C97A7E] p-3 rounded bg-white">
                <div className="font-bold text-center text-xs mb-2">ROLL NUMBER (10 DIGITS)</div>
                <div className="grid grid-cols-10 gap-1 text-[9px] text-center">
                  {Array.from({ length: 10 }).map((_, c) => (
                    <div key={c} className="space-y-1">
                      <div className="border border-[#C97A7E] py-0.5 font-bold">1</div>
                      {Array.from({ length: 10 }).map((_, d) => (
                        <div
                          key={d}
                          className={cn(
                            'w-3.5 h-3.5 mx-auto rounded-full border border-[#C97A7E] flex items-center justify-center text-[7px]',
                            d === 1 ? 'bg-[#20252B] text-white font-bold' : 'text-[#66727D]'
                          )}
                        >
                          {d}
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="border border-[#C97A7E] p-3 rounded bg-white space-y-3">
                <div className="font-bold text-center text-xs">TEST BOOKLET CODE</div>
                <div className="flex items-center justify-center gap-4 text-sm font-bold">
                  {['A', 'B', 'C', 'D'].map((code) => (
                    <div key={code} className="text-center">
                      <div
                        className={cn(
                          'w-6 h-6 rounded-full border border-[#C97A7E] flex items-center justify-center mx-auto text-xs',
                          code === 'A' ? 'bg-[#20252B] text-white' : ''
                        )}
                      >
                        {code}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#C97A7E] pt-3 text-center">
                  <div className="font-bold text-[10px] text-[#66727D]">BARCODE SERIAL</div>
                  <div className="bg-[#20252B] text-white font-mono text-[9px] py-1 px-3 rounded inline-block mt-1">
                    |||||||| |||||| |||||||| FORT-26-XXXX
                  </div>
                </div>
              </div>

              <div className="border border-[#C97A7E] p-3 rounded bg-white space-y-2 text-[10px]">
                <div className="font-bold text-xs">CANDIDATE DECLARATION</div>
                <div className="text-[9px] text-[#66727D]">
                  I declare that particulars on this OMR sheet are mine and correct. Circles darkened represent my genuine responses.
                </div>
                <div className="border border-dashed border-[#C97A7E] p-2 rounded text-center text-[9px] text-[#A3A89E]">
                  Candidate's Signature in Running Handwriting
                </div>
              </div>
            </div>

            {/* 4 Answer Columns */}
            <div className="border border-[#C97A7E] p-3 rounded bg-white">
              <div className="text-center font-bold text-xs mb-2">
                4-COLUMN ANSWER MATRIX (QUESTIONS 1 TO 180)
              </div>
              <div className="grid grid-cols-4 gap-3 text-[10px]">
                {[
                  { range: 'Q. 1 - 45 (Physics)', start: 1, end: 5 },
                  { range: 'Q. 46 - 90 (Chemistry)', start: 46, end: 50 },
                  { range: 'Q. 91 - 135 (Botany)', start: 91, end: 95 },
                  { range: 'Q. 136 - 180 (Zoology)', start: 136, end: 140 },
                ].map((col, idx) => (
                  <div key={idx} className="border border-[#DCE2E6] p-2 rounded space-y-1.5">
                    <div className="font-bold text-[10px] text-center bg-[#F1F3F4] py-0.5 rounded text-[#20252B]">
                      {col.range}
                    </div>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between text-[9px]">
                        <span className="font-bold w-6">{col.start + i}.</span>
                        {['1', '2', '3', '4'].map((opt) => (
                          <div
                            key={opt}
                            className={cn(
                              'w-4 h-4 rounded-full border border-[#C97A7E] flex items-center justify-center text-[8px]',
                              opt === '2' && i % 2 === 0 ? 'bg-[#20252B] text-white font-bold' : 'text-[#66727D]'
                            )}
                          >
                            {opt}
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="text-center text-[8px] text-[#A3A89E] pt-1">... continuing to 45 questions</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: UPLOAD SCANNED OMR */}
      {activeTab === 'upload_scan' && (
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-8 shadow-[0_2px_8px_rgba(38,49,38,0.04)] max-w-2xl mx-auto text-center space-y-4">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#9CC6E0]/15 text-[#3B4C30]">
            <UploadCloud className="h-7 w-7" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-[#20252B]">Upload Scanned OMR Batch</h2>
            <p className="mt-1 text-xs text-[#66727D]">
              Upload 300 DPI high-contrast grayscale or RGB scans (PDF, TIFF, JPEG). Our optical recognition engine parses roll numbers, booklet codes, and bubble fills.
            </p>
          </div>

          <div className="border-2 border-dashed border-[#DCE2E6] rounded-2xl p-8 hover:border-[#9CC6E0] transition-colors cursor-pointer bg-[#F1F3F4]/50">
            <FileText className="h-8 w-8 mx-auto text-[#66727D] mb-2" />
            <div className="text-xs font-semibold text-[#20252B]">Drag and drop scanned OMR files here</div>
            <div className="text-[11px] text-[#66727D] mt-1">Supports up to 50 sheets per batch (max 100MB)</div>
            <button
              onClick={() => toast.info('Demo upload simulator ready. Auto-detection engine is active.')}
              className="mt-4 px-4 py-2 bg-[#20252B] text-white text-xs font-semibold rounded-xl hover:bg-[#344034] transition-colors"
            >
              Select Files from Computer
            </button>
          </div>
        </div>
      )}

      {/* INSPECT & VERIFY MODAL */}
      {selectedRecord && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-4xl rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <div>
                <h3 className="text-lg font-bold text-[#20252B] font-sans">
                  OMR Verification Studio — {selectedRecord.candidateName}
                </h3>
                <div className="flex items-center gap-3 text-xs text-[#66727D] mt-0.5">
                  <span>Reg ID: <strong className="font-mono text-[#20252B]">{selectedRecord.candidateRegistrationId}</strong></span>
                  <span>Roll: <strong className="font-mono text-[#20252B]">{selectedRecord.rollNumberEntered}</strong></span>
                  <span>Booklet: <strong className="font-bold text-[#20252B]">{selectedRecord.testBookletCode}</strong></span>
                  <span>Extracted: <strong className="font-bold text-[#20252B]">{selectedRecord.autoExtractedScore}/720</strong></span>
                </div>
              </div>
              <button
                onClick={() => setSelectedRecord(null)}
                className="rounded-lg p-2 text-[#66727D] hover:bg-[#F1F3F4] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {selectedRecord.ambiguousCount > 0 && (
              <div className="flex items-start gap-3 rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900">
                <AlertTriangle className="h-4 w-4 shrink-0 text-amber-700 mt-0.5" />
                <div>
                  <div className="font-bold">Attention Required: {selectedRecord.ambiguousCount} Ambiguous Bubble(s)</div>
                  <div className="mt-0.5 text-amber-800">{selectedRecord.reviewNotes}</div>
                </div>
              </div>
            )}

            {/* Bubble Grid Inspection */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-[#20252B]">
                Question Response Bubbles (Click to confirm or override detected bubble)
              </div>
              <div className="max-h-80 overflow-y-auto rounded-xl border border-[#DCE2E6] p-4 bg-[#F1F3F4]/40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                {selectedRecord.bubbles.map((b) => (
                  <div
                    key={b.qNum}
                    className={cn(
                      'p-2.5 rounded-lg border text-xs bg-white transition-all',
                      b.isAmbiguous ? 'border-amber-400 ring-2 ring-amber-300/40 bg-amber-50/40' : 'border-[#DCE2E6]'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-bold text-[#20252B]">Q.{b.qNum}</span>
                      {b.isAmbiguous ? (
                        <span className="text-[10px] text-amber-700 font-semibold">Low confidence</span>
                      ) : (
                        <span className="text-[10px] text-[#66727D]">{(b.confidence * 100).toFixed(0)}%</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between gap-1">
                      {['1', '2', '3', '4'].map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => handleBubbleSelect(b.qNum, opt)}
                          className={cn(
                            'w-6 h-6 rounded-full border text-[11px] font-bold transition-all',
                            editingBubbles[b.qNum] === opt
                              ? 'bg-[#20252B] text-white border-[#20252B]'
                              : 'bg-white text-[#52584E] border-[#DCE2E6] hover:border-[#9CC6E0]'
                          )}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-[#DCE2E6] pt-4">
              <button
                type="button"
                onClick={() => setSelectedRecord(null)}
                className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#20252B]"
              >
                Cancel
              </button>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCommitVerification}
                  className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#20252B] rounded-xl hover:bg-[#344034] transition-colors"
                >
                  <CheckCircle2 className="h-4 w-4" />
                  Commit & Publish Official Score
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
