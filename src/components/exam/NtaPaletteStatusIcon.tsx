'use client';

import React from 'react';
import { Check } from 'lucide-react';
import { QuestionPaletteStatus } from '@/types/exam';
import { cn } from '@/lib/utils';

interface NtaPaletteStatusIconProps {
  status: QuestionPaletteStatus;
  number?: number;
  isCurrent?: boolean;
  className?: string;
  onClick?: () => void;
}

export function NtaPaletteStatusIcon({
  status,
  number,
  isCurrent = false,
  className,
  onClick,
}: NtaPaletteStatusIconProps) {
  // Common container styling
  const baseClasses =
    'relative flex items-center justify-center font-mono text-xs font-bold transition-transform active:scale-95 cursor-pointer select-none';

  // 1. Not Visited: White rectangle with gray border and dark text
  if (status === 'not_visited') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Question ${number}, Not Visited`}
        className={cn(
          baseClasses,
          'h-8 w-8 rounded-md border border-[#C5D0D6] bg-white text-[#4A5568] hover:border-[#718096]',
          isCurrent && 'ring-2 ring-[#20252B] ring-offset-1',
          className
        )}
      >
        {number}
      </button>
    );
  }

  // 2. Not Answered: Orange-Red pentagon / polygon with white text
  if (status === 'not_answered') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Question ${number}, Not Answered`}
        className={cn(
          baseClasses,
          'h-8 w-8 rounded-md bg-[#E4002B] text-white shadow-sm hover:bg-[#C90026]',
          isCurrent && 'ring-2 ring-[#20252B] ring-offset-1',
          className
        )}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {number}
      </button>
    );
  }

  // 3. Answered: Green polygon with white text
  if (status === 'answered') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Question ${number}, Answered`}
        className={cn(
          baseClasses,
          'h-8 w-8 rounded-md bg-[#2E7D32] text-white shadow-sm hover:bg-[#1B5E20]',
          isCurrent && 'ring-2 ring-[#20252B] ring-offset-1',
          className
        )}
        style={{
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        }}
      >
        {number}
      </button>
    );
  }

  // 4. Marked for Review (without answer): Purple / Violet circular shape (NOT evaluated)
  if (status === 'marked_for_review') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Question ${number}, Marked for Review without answer`}
        className={cn(
          baseClasses,
          'h-8 w-8 rounded-full bg-[#673AB7] text-white shadow-sm hover:bg-[#512DA8]',
          isCurrent && 'ring-2 ring-[#20252B] ring-offset-1',
          className
        )}
      >
        {number}
      </button>
    );
  }

  // 5. Answered and Marked for Review: Purple circular shape with small green badge at bottom-right (EVALUATED)
  if (status === 'answered_and_marked_for_review') {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Question ${number}, Answered and Marked for Review (Evaluated)`}
        className={cn(
          baseClasses,
          'h-8 w-8 rounded-full bg-[#673AB7] text-white shadow-sm hover:bg-[#512DA8]',
          isCurrent && 'ring-2 ring-[#20252B] ring-offset-1',
          className
        )}
      >
        {number}
        <span
          className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center rounded-sm bg-[#2E7D32] text-[8px] text-white ring-1 ring-white"
          title="Will be considered for evaluation"
        >
          <Check className="h-2 w-2 stroke-[3]" />
        </span>
      </button>
    );
  }

  return null;
}
