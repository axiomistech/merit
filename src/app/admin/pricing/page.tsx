'use client';

import React, { useState, useEffect } from 'react';
import {
  DollarSign,
  Shield,
  CheckCircle2,
  AlertCircle,
  Save,
  HelpCircle,
  Tag,
  Percent,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PricingRule } from '@/types/admin';
import { getStoredPricingRules, saveStoredPricingRules } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminPricingPage() {
  const [rules, setRules] = useState<PricingRule[]>([]);
  const [allowFirstFree, setAllowFirstFree] = useState(true);
  const [bulkDiscountTier1, setBulkDiscountTier1] = useState(15); // 5+ tests
  const [bulkDiscountTier2, setBulkDiscountTier2] = useState(25); // 10+ tests

  useEffect(() => {
    setRules(getStoredPricingRules());
  }, []);

  const handleUpdateRule = (id: string, updates: Partial<PricingRule>) => {
    const updated = rules.map((r) => (r.id === id ? { ...r, ...updates } : r));
    setRules(updated);
  };

  const handleSaveAll = () => {
    saveStoredPricingRules(rules);
    logAdminAction({
      action: 'PRICING_RULES_UPDATED',
      resource_type: 'pricing_policy',
      change_summary: `Updated pricing rules across ${rules.length} tiers. Complimentary first test: ${allowFirstFree ? 'ON' : 'OFF'}`,
    });
    toast.success('Monetization policies updated and audited successfully.');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Pricing & Entitlement Configuration</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Centralized policy controls for per-paper pricing, complimentary first attempts, volume bundle discounts, and evaluation surcharges.
          </p>
        </div>
        <button
          onClick={handleSaveAll}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Save className="h-4 w-4" />
          Save All Changes
        </button>
      </div>

      {/* Global Entitlement Controls */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-5">
        <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
          <Shield className="h-4 w-4 text-[#9CC6E0]" />
          Platform Entitlement Rules
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE2E6] pb-5">
          <div className="max-w-xl">
            <h3 className="text-xs font-bold text-[#20252B]">Complimentary First Full Paper Claim</h3>
            <p className="text-xs text-[#66727D] mt-0.5">
              Automatically grant 1 complimentary full simulation token to every newly authenticated student account without requiring credit card or payment entry.
            </p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={allowFirstFree}
              onChange={(e) => setAllowFirstFree(e.target.checked)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#20252B]"></div>
          </label>
        </div>

        {/* Volume Discount Policies */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
          <div className="rounded-xl border border-[#DCE2E6] p-4 bg-[#F1F3F4]/40 space-y-2">
            <div className="text-xs font-bold text-[#20252B] flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-[#66727D]" />
              Pack Discount Tier 1 (5+ Papers)
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={50}
                value={bulkDiscountTier1}
                onChange={(e) => setBulkDiscountTier1(Number(e.target.value))}
                className="w-20 rounded-lg border border-[#DCE2E6] bg-white px-2.5 py-1.5 text-xs font-bold font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
              <span className="text-xs text-[#66727D]">% off applied at checkout</span>
            </div>
          </div>

          <div className="rounded-xl border border-[#DCE2E6] p-4 bg-[#F1F3F4]/40 space-y-2">
            <div className="text-xs font-bold text-[#20252B] flex items-center gap-1.5">
              <Percent className="h-3.5 w-3.5 text-[#66727D]" />
              Pack Discount Tier 2 (10+ Papers)
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={0}
                max={60}
                value={bulkDiscountTier2}
                onChange={(e) => setBulkDiscountTier2(Number(e.target.value))}
                className="w-20 rounded-lg border border-[#DCE2E6] bg-white px-2.5 py-1.5 text-xs font-bold font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
              <span className="text-xs text-[#66727D]">% off applied at checkout</span>
            </div>
          </div>
        </div>
      </div>

      {/* Exam-Specific Pricing Tiers */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="p-5 border-b border-[#DCE2E6]">
          <h2 className="text-base font-bold text-[#20252B]">Exam-Tier Specific Pricing & Surcharges</h2>
          <p className="text-xs text-[#66727D] mt-0.5">
            Configure per-paper baseline fees, evaluator surcharges (e.g. UPSC descriptive handwriting review), and custom discount allowances.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-4 font-semibold">Examination Tier</th>
                <th className="p-4 font-semibold">Base Price / Paper</th>
                <th className="p-4 font-semibold">1st Test Free</th>
                <th className="p-4 font-semibold">Descriptive Review Surcharge</th>
                <th className="p-4 font-semibold">Bundle Discount</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {rules.map((r) => (
                <tr key={r.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[#20252B]">{r.examName}</div>
                    <div className="font-mono text-[10px] text-[#66727D]">{r.examSlug}</div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#66727D]">₹</span>
                      <input
                        type="number"
                        min={0}
                        value={r.basePrice}
                        onChange={(e) => handleUpdateRule(r.id, { basePrice: Number(e.target.value) })}
                        className="w-16 rounded-lg border border-[#DCE2E6] bg-white p-1 text-xs font-mono font-bold text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <input
                      type="checkbox"
                      checked={r.firstPaperFree}
                      onChange={(e) => handleUpdateRule(r.id, { firstPaperFree: e.target.checked })}
                      className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
                    />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-[#66727D]">+₹</span>
                      <input
                        type="number"
                        min={0}
                        value={r.descriptiveEvaluationSurcharge}
                        onChange={(e) =>
                          handleUpdateRule(r.id, { descriptiveEvaluationSurcharge: Number(e.target.value) })
                        }
                        className="w-16 rounded-lg border border-[#DCE2E6] bg-white p-1 text-xs font-mono font-bold text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                      />
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1">
                      <input
                        type="number"
                        min={0}
                        max={50}
                        value={r.bundleDiscountPercent}
                        onChange={(e) =>
                          handleUpdateRule(r.id, { bundleDiscountPercent: Number(e.target.value) })
                        }
                        className="w-14 rounded-lg border border-[#DCE2E6] bg-white p-1 text-xs font-mono font-bold text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                      />
                      <span className="text-[#66727D]">%</span>
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    <button
                      onClick={() => handleUpdateRule(r.id, { isActive: !r.isActive })}
                      className={cn(
                        'px-2.5 py-1 text-[11px] font-semibold rounded-lg border transition-colors',
                        r.isActive
                          ? 'bg-[#9CC6E0]/20 text-[#3B4C30] border-[#9CC6E0]/30'
                          : 'bg-[#66727D]/15 text-[#66727D] border-[#DCE2E6]'
                      )}
                    >
                      {r.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
