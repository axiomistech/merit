'use client';

import React from 'react';
import { Delete, RotateCcw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VirtualNumericKeypadProps {
  value: string;
  onChange: (newValue: string) => void;
  onClear: () => void;
  disabled?: boolean;
}

export function VirtualNumericKeypad({
  value,
  onChange,
  onClear,
  disabled = false,
}: VirtualNumericKeypadProps) {
  const handleDigit = (digit: string) => {
    if (disabled) return;
    // Disallow multiple decimal points or negative signs anywhere except at start
    if (digit === '.' && value.includes('.')) return;
    if (digit === '-') {
      if (value.startsWith('-')) {
        onChange(value.slice(1));
      } else {
        onChange('-' + value);
      }
      return;
    }
    // Limit to reasonable integer/numerical length (max 10 chars)
    if (value.length >= 10) return;
    onChange(value + digit);
  };

  const handleBackspace = () => {
    if (disabled || value.length === 0) return;
    onChange(value.slice(0, -1));
  };

  const keys = [
    ['1', '2', '3'],
    ['4', '5', '6'],
    ['7', '8', '9'],
    ['.', '0', '-'],
  ];

  return (
    <div className="w-full max-w-xs rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-sm select-none">
      <div className="mb-2 flex items-center justify-between text-[11px] font-semibold text-[#66727D]">
        <span>Virtual Numeric Keypad</span>
        <span className="font-mono text-[10px] text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          NTA CBT Mandatory
        </span>
      </div>

      {/* Numerical display */}
      <div className="mb-3 flex h-12 items-center justify-between rounded-xl border-2 border-[#20252B] bg-[#F8F9FA] px-3 font-mono text-xl font-bold tracking-wider text-[#20252B]">
        <span>{value || <span className="text-[#A0AEC0] font-normal text-sm">Enter value...</span>}</span>
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="text-xs text-[#E4002B] hover:underline font-sans"
            title="Clear entered value"
          >
            Clear
          </button>
        )}
      </div>

      {/* Keypad Grid */}
      <div className="grid grid-cols-3 gap-1.5">
        {keys.map((row, rIdx) =>
          row.map((k) => (
            <button
              key={k}
              type="button"
              disabled={disabled}
              onClick={() => handleDigit(k)}
              className="flex h-11 items-center justify-center rounded-lg border border-[#DCE2E6] bg-[#F1F3F4] font-mono text-base font-bold text-[#20252B] hover:bg-[#E2E8F0] active:scale-95 transition-all disabled:opacity-50"
            >
              {k}
            </button>
          ))
        )}
      </div>

      {/* Control row */}
      <div className="mt-2 grid grid-cols-2 gap-1.5">
        <button
          type="button"
          disabled={disabled || !value}
          onClick={handleBackspace}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#DCE2E6] bg-[#F1F3F4] text-xs font-semibold text-[#20252B] hover:bg-[#E2E8F0] active:scale-95 transition-all disabled:opacity-40"
        >
          <Delete className="h-4 w-4" />
          <span>Backspace</span>
        </button>
        <button
          type="button"
          disabled={disabled || !value}
          onClick={onClear}
          className="flex h-10 items-center justify-center gap-1.5 rounded-lg border border-[#E4002B]/30 bg-[#FDEDF0] text-xs font-semibold text-[#E4002B] hover:bg-[#FDEDF0]/80 active:scale-95 transition-all disabled:opacity-40"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Clear All</span>
        </button>
      </div>

      <div className="mt-2.5 text-[10px] text-[#66727D] leading-tight">
        * As per NTA guidelines, physical keyboards are disabled. Enter the integer using mouse clicks. Rounded to nearest integer.
      </div>
    </div>
  );
}
