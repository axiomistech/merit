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
        <h1 className="text-2xl font-black text-[#F5F7FB]">Pricing & Entitlement Configuration</h1>
        <p className="text-xs text-[#A7B0C0]">
          Centralized control of paper pricing, free entitlement eligibility, and currency rules.
        </p>
      </div>

      <div className="rounded-xl border border-[#1D2940] bg-[#0B1020] p-6 space-y-6">
        <div className="flex items-center justify-between border-b border-[#1D2940] pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F5F7FB]">Standard Question Paper Price</h3>
            <p className="text-xs text-[#A7B0C0]">
              Price charged for non-free full examination papers and custom mocks (in INR).
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#A7B0C0]">₹</span>
            <input
              type="number"
              value={standardPrice}
              onChange={(e) => setStandardPrice(Number(e.target.value))}
              className="w-24 rounded-lg border border-[#1D2940] bg-[#11182A] p-2 text-sm font-bold text-[#F5F7FB] focus:outline-none focus:border-[#6486C6]"
            />
          </div>
        </div>

        <div className="flex items-center justify-between border-b border-[#1D2940] pb-4">
          <div>
            <h3 className="text-sm font-bold text-[#F5F7FB]">Complimentary First Paper Claim</h3>
            <p className="text-xs text-[#A7B0C0]">
              Automatically grant one full examination paper free of cost to newly registered students.
            </p>
          </div>
          <input
            type="checkbox"
            checked={allowFirstFree}
            onChange={(e) => setAllowFirstFree(e.target.checked)}
            className="h-5 w-5 rounded border-[#1D2940] bg-[#11182A] text-[#6486C6]"
          />
        </div>

        <div className="flex justify-end">
          <button
            onClick={handleSavePricing}
            className="rounded-xl bg-[#6486C6] px-6 py-2.5 text-xs font-bold text-[#0B1020] hover:bg-[#7b9bd7]"
          >
            Save Pricing Rules
          </button>
        </div>
      </div>
    </div>
  );
}
