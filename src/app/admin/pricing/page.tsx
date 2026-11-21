'use client';

import React, { useState } from 'react';
import { DollarSign, Shield, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminPricingPage() {
  const [standardPrice, setStandardPrice] = useState(10);
  const [allowFirstFree, setAllowFirstFree] = useState(true);

  const handleSavePricing = () => {
    toast.success('Monetization policies updated and audited.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-[#263126] font-serif">Pricing & Entitlement Configuration</h1>
        <p className="mt-1 text-xs text-[#73786E]">
          Centralized control of paper pricing, free entitlement eligibility, and currency rules.
        </p>
      </div>

      <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 sm:p-8 space-y-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-5">
          <div>
            <h3 className="text-sm font-bold text-[#263126]">Standard Question Paper Price</h3>
            <p className="text-xs text-[#73786E]">
              Price charged for subsequent full examination papers and custom mocks (in INR).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#73786E]">₹</span>
            <input
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(Number(e.target.value))}
              className="w-24 rounded-xl border border-[#E6E5DE] bg-white p-2.5 text-sm font-bold text-[#263126] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#ECEAE4] pb-5">
          <div>
            <h3 className="text-sm font-bold text-[#263126]">Complimentary First Paper Claim</h3>
            <p className="text-xs text-[#73786E]">
              Automatically grant one full examination paper free of cost to newly registered candidates.
            </p>
          </div>
          <input
            type="checkbox"
            checked={allowFirstFree}
            onChange={(e) => setAllowFirstFree(e.target.checked)}
            className="h-5 w-5 rounded border-[#E6E5DE] text-[#9CAF88] focus:ring-[#9CAF88]"
          />
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSavePricing}
            className="rounded-xl bg-[#9CAF88] px-6 py-2.5 text-xs font-bold text-white hover:bg-[#8ea07a] transition-all shadow-sm"
          >
            Save Pricing Rules
          </button>
        </div>
      </div>
    </div>
  );
}
