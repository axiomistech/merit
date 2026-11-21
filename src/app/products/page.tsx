'use client';

import React from 'react';
import Link from 'next/link';
import {
  Package,
  CheckCircle2,
  Clock,
  ArrowRight,
  Shield,
  Award,
  Sparkles,
} from 'lucide-react';
import { getStoredProducts } from '@/lib/admin/store';

export default function PublicProductsPage() {
  const products = getStoredProducts();

  return (
    <div className="bg-[#F1F3F4] text-[#20252B] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CC6E0]/40 bg-[#9CC6E0]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <Package className="h-3.5 w-3.5" />
            Curated Examination Products & Bundles
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#20252B] tracking-tight">
            Transparent, Student-First Pricing
          </h1>
          <p className="text-sm sm:text-base text-[#66727D] leading-relaxed">
            Standard examination papers start at just <strong>₹10</strong>. Choose single paper tokens or full-length simulation series with printable A4 OMR sheets.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-[24px] border border-[#DCE2E6] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CC6E0] hover:shadow-[0_8px_30px_rgba(38,49,38,0.08)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F1F3F4] text-[#52584E] border border-[#DCE2E6]">
                    {p.paperType.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#66727D]">
                    {p.accessValidityDays} Days
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#20252B] leading-snug">{p.title}</h3>
                  <p className="mt-1 text-xs text-[#66727D] line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-[#DCE2E6]">
                  <span className="text-3xl font-bold font-mono text-[#20252B]">₹{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-[#A3A89E] line-through font-mono">
                      ₹{p.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#66727D] ml-auto">
                    {p.includedPapersCount} Full Test{p.includedPapersCount > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 text-xs text-[#52584E]">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#9CC6E0] shrink-0 mt-0.5" />
                      <span className="text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#DCE2E6]">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#20252B] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
                >
                  Enroll & Practice
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
