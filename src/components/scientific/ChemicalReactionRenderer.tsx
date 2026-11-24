'use client';

import React from 'react';
import { ChemicalReactionData } from '@/types/scientific';
import { MathRenderer } from './MathRenderer';

interface ChemicalReactionRendererProps {
  data?: ChemicalReactionData;
  assetUrl?: string;
  equationText?: string;
  isDarkMode?: boolean;
  className?: string;
}

export function ChemicalReactionRenderer({
  data,
  assetUrl,
  equationText,
  isDarkMode = false,
  className = '',
}: ChemicalReactionRendererProps) {
  const url = data?.assetUrl || assetUrl;

  if (url) {
    return (
      <div className={`my-4 flex flex-col items-center justify-center ${className}`}>
        <div
          className={`rounded-xl border p-3 shadow-xs max-w-full overflow-x-auto ${
            isDarkMode ? 'bg-white/95 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <img
            src={url}
            alt="Chemical reaction mechanism"
            className="max-h-48 object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  // If mhchem or equation string is available
  const eq = data?.mhchemExpression || equationText;
  if (eq) {
    const katexExpr = eq.startsWith('\\ce{') ? eq : `\\ce{${eq}}`;
    return (
      <div className={`my-3 overflow-x-auto text-center ${className}`}>
        <MathRenderer expression={katexExpr} displayMode={true} />
      </div>
    );
  }

  // If structured reactants, reagents and products
  if (data?.reactantsText || data?.productsText) {
    const arrow =
      data.arrowType === 'equilibrium'
        ? '<=>'
        : data.arrowType === 'resonance'
        ? '<->'
        : '->';
    const reagents = data.reagentsAbove
      ? `[${data.reagentsAbove}][${data.reagentsBelow || ''}]`
      : '';
    const formula = `\\ce{${data.reactantsText || ''} ${arrow}${reagents} ${data.productsText || ''}}`;

    return (
      <div className={`my-3 overflow-x-auto text-center ${className}`}>
        <MathRenderer expression={formula} displayMode={true} />
      </div>
    );
  }

  return null;
}
