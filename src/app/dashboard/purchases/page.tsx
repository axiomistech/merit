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
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-6">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#20252B]">
            Monetization & Entitlements
          </span>
          <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold text-[#20252B] font-sans">
            Purchased Papers & Receipts
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-[#66727D]">
            Immutable record of question paper entitlements, free claims, and payment receipts.
          </p>
        </div>

        <Link
          href="/papers"
          className="inline-flex items-center gap-2 rounded-full bg-[#E4002B] px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-[#C90026] transition-all"
        >
          <FileText className="h-4 w-4" />
          <span>Browse Question Papers</span>
        </Link>
      </div>

      {!loading && purchases.length === 0 ? (
        <div className="rounded-[28px] border border-[#DCE2E6] bg-white p-12 text-center shadow-soft space-y-4">
          <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-2xl bg-[#F1F3F4] text-[#66727D]">
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
              href="/papers"
              className="inline-flex items-center gap-2 rounded-full bg-[#20252B] px-6 py-2.5 text-xs font-bold text-white shadow-soft hover:bg-[#20252B]/90 transition-all"
            >
              <span>Explore Question Papers</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      ) : (
        <div className="rounded-[24px] border border-[#DCE2E6] bg-white shadow-soft overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
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
              <tbody className="divide-y divide-[#DCE2E6] text-[#20252B]">
                {purchases.map((tx) => (
                  <tr key={tx.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                    <td className="p-4 font-mono font-bold text-[#20252B]">{tx.id}</td>
                    <td className="p-4 font-semibold text-[#20252B]">{tx.paperName}</td>
                    <td className="p-4 text-[#66727D]">{tx.date}</td>
                    <td className="p-4 font-mono font-bold text-[#20252B]">{tx.amount}</td>
                    <td className="p-4 text-[#66727D]">{tx.type}</td>
                    <td className="p-4">
                      <span className="rounded-full bg-[#E9EEF1] px-2.5 py-0.5 font-bold text-[#20252B]">
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
