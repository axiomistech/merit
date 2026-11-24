'use client';

import React from 'react';
import { PolymerStructureData } from '@/types/scientific';
import { MathRenderer } from './MathRenderer';

interface PolymerStructureRendererProps {
  data?: PolymerStructureData;
  assetUrl?: string;
  notation?: string;
  index?: string;
  isDarkMode?: boolean;
  className?: string;
}

export function PolymerStructureRenderer({
  data,
  assetUrl,
  notation,
  index = 'n',
  isDarkMode = false,
  className = '',
}: PolymerStructureRendererProps) {
  const url = data?.assetUrl || assetUrl;
  const bracketNotation = data?.bracketNotation || notation;
  const repeatingIndex = data?.index || index;

  if (url) {
    return (
      <div className={`inline-flex flex-col items-center ${className}`}>
        <div
          className={`rounded-lg border p-2 shadow-xs ${
            isDarkMode ? 'bg-white/95 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <img
            src={url}
            alt={`Polymer structure with repeating index ${repeatingIndex}`}
            className="max-h-36 max-w-full object-contain"
            loading="lazy"
          />
        </div>
      </div>
    );
  }

  if (bracketNotation) {
    // Render using KaTeX \ce{...} or mathematical bracket typesetting
    const katexFormula = `\\left[ \\ce{${bracketNotation.replace(/^\[|\][n\d]*$/g, '')}} \\right]_{${repeatingIndex}}`;
    return (
      <div className={`inline-block my-1 font-mono ${className}`}>
        <MathRenderer expression={katexFormula} displayMode={false} />
      </div>
    );
  }

  return null;
}
