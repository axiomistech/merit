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
    <div className="bg-[#F7F5EF] text-[#2E332D] min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#9CAF88]/40 bg-[#9CAF88]/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-[#3B4C30]">
            <Package className="h-3.5 w-3.5" />
            Curated Examination Products & Bundles
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold font-serif text-[#263126] tracking-tight">
            Transparent, Student-First Pricing
          </h1>
          <p className="text-sm sm:text-base text-[#73786E] leading-relaxed">
            Standard examination papers start at just <strong>₹10</strong>. Choose single paper tokens or full-length simulation series with printable A4 OMR sheets.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-[24px] border border-[#E6E5DE] bg-white p-7 shadow-[0_4px_20px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-6 hover:border-[#9CAF88] hover:shadow-[0_8px_30px_rgba(38,49,38,0.08)] transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[#F7F5EF] text-[#52584E] border border-[#E6E5DE]">
                    {p.paperType.replace('_', ' ')}
                  </span>
                  <span className="text-[11px] font-mono font-bold text-[#73786E]">
                    {p.accessValidityDays} Days
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-[#263126] leading-snug">{p.title}</h3>
                  <p className="mt-1 text-xs text-[#73786E] line-clamp-3 leading-relaxed">
                    {p.description}
                  </p>
                </div>

                <div className="flex items-baseline gap-2 pt-2 border-t border-[#ECEAE4]">
                  <span className="text-3xl font-bold font-mono text-[#263126]">₹{p.price}</span>
                  {p.originalPrice && (
                    <span className="text-xs text-[#A3A89E] line-through font-mono">
                      ₹{p.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#73786E] ml-auto">
                    {p.includedPapersCount} Full Test{p.includedPapersCount > 1 ? 's' : ''}
                  </span>
                </div>

                {/* Features list */}
                <div className="space-y-2 pt-2 text-xs text-[#52584E]">
                  {p.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#9CAF88] shrink-0 mt-0.5" />
                      <span className="text-[11px]">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[#ECEAE4]">
                <Link
                  href="/login"
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#263126] text-white text-xs font-semibold hover:bg-[#344034] transition-colors shadow-sm"
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
