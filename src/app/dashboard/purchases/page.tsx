'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { CreditCard, CheckCircle2, FileText, ArrowRight, Shield, Receipt } from 'lucide-react';

interface PurchaseRecord {
  id: string;
  paperName: string;
  paperSlug: string;
  date: string;
  amount: string;
  status: string;
  type: string;
}

export default function StudentPurchasesPage() {
  const [purchases, setPurchases] = useState<PurchaseRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let list: PurchaseRecord[] = [];
      const stored = localStorage.getItem('fort_purchases');
      if (stored) {
        try {
          list = JSON.parse(stored);
        } catch {}
      }

      // Check entitlements if empty
      const storedEnt = localStorage.getItem('fort_entitlements');
      if (storedEnt && list.length === 0) {
        try {
          const parsed = JSON.parse(storedEnt);
          if (parsed.freePaperSlug) {
            list.push({
              id: `tx_free_${parsed.freePaperSlug.slice(0, 8)}`,
              paperName: parsed.freePaperSlug.replace(/-/g, ' ').toUpperCase(),
              paperSlug: parsed.freePaperSlug,
              date: new Date().toLocaleDateString(),
              amount: '₹0 (Free Claim)',
              status: 'Active',
              type: 'Complimentary Claim',
            });
          }
          if (Array.isArray(parsed.unlockedPapers)) {
            parsed.unlockedPapers.forEach((slug: string) => {
              if (slug !== parsed.freePaperSlug && !list.some((p) => p.paperSlug === slug)) {
                list.push({
                  id: `tx_rzp_${slug.slice(0, 8)}`,
                  paperName: slug.replace(/-/g, ' ').toUpperCase(),
                  paperSlug: slug,
                  date: new Date().toLocaleDateString(),
                  amount: '₹10.00',
                  status: 'Paid',
                  type: 'Standard Purchase',
                });
              }
            });
          }
        } catch {}
      }

      setPurchases(list);
      setLoading(false);
    }
  }, []);

  return (
    <div className="liquid-canvas min-h-screen py-6 px-4 sm:px-6 lg:px-8 space-y-8 max-w-7xl mx-auto relative">
      {/* Ambient Liquid Fluid Orbs */}
      <div className="liquid-fluid-backdrop">
        <div className="liquid-orb-glacier top-10 right-1/4 h-80 w-80 opacity-55" />
        <div className="liquid-orb-red bottom-10 left-1/4 h-72 w-72 opacity-20" />
      </div>

      {/* Header */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6]/80 pb-6">
        <div>
          <div className="glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full mb-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#E4002B]" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#66727D]">
              Monetization & Entitlements
            </span>
          </div>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            Purchased Papers & Receipts
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Immutable record of question paper entitlements, free claims, and payment receipts.
          </p>
        </div>

        <Link
          href="/dashboard/qp-prep"
          className="glass-racing-red inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold text-white shadow-md transition-transform hover:scale-[1.02]"
        >
          <FileText className="h-4 w-4" />
          <span>Browse Question Papers</span>
        </Link>
      </div>

      {!loading && purchases.length === 0 ? (
        <div className="relative z-10 glass-polar rounded-[32px] p-12 text-center space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#9CC6E0]/20 text-[#20252B]">
            <Receipt className="h-7 w-7" />
          </div>
          <div className="space-y-1">
            <h3 className="text-base font-bold font-sans text-[#20252B]">
              No Purchase Transactions Yet
            </h3>
            <p className="text-xs sm:text-sm text-[#66727D] max-w-md mx-auto leading-relaxed">
              When you unlock question papers or claim your complimentary free paper, your permanent access receipts will appear here.
            </p>
          </div>
          <div className="pt-2">
            <Link
              href="/dashboard/qp-prep"
              className="glass-polar inline-flex items-center gap-2 rounded-full px-7 py-3 text-xs font-bold text-[#20252B] transition-all hover:border-[#9CC6E0]"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="relative z-10 glass-polar rounded-[32px] shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4]/80 text-[#66727D]">
                <tr>
                  <th className="p-4 font-semibold">Transaction ID</th>
                  <th className="p-4 font-semibold">Question Paper</th>
                  <th className="p-4 font-semibold">Date</th>
                  <th className="p-4 font-semibold">Amount</th>
                  <th className="p-4 font-semibold">Type</th>
                  <th className="p-4 font-semibold">Status</th>
                  <th className="p-4 font-semibold text-right">Access</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE2E6]/80 text-[#20252B]">
                {purchases.map((tx) => (
                  <tr key={tx.id} className="hover:bg-white/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#20252B]">{tx.id}</td>
                    <td className="p-4 font-semibold text-[#20252B]">{tx.paperName}</td>
                    <td className="p-4 text-[#66727D]">{tx.date}</td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">{tx.amount}</td>
                    <td className="p-4 text-[#66727D]">{tx.type}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-[#9CC6E0]/20 border border-[#9CC6E0]/40 px-3 py-1 font-bold text-[#20252B] text-[11px]">
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <Link
                        href={`/exam/${tx.paperSlug}`}
                        className="inline-flex items-center gap-1 font-bold text-[#20252B] hover:text-[#E4002B] transition-colors"
                      >
                        <span>Attempt Paper</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
