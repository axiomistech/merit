'use client';

import React from 'react';
import { ScientificContentRenderer } from '@/components/scientific/ScientificContentRenderer';

interface MathTextProps {
  content?: string;
  text?: string;
  imageUrl?: string;
  className?: string;
  isDarkMode?: boolean;
}

/**
 * Universal Scientific MathText Component
 * Backward-compatible drop-in replacement that uses the centralized ScientificContentRenderer
 * with KaTeX and mhchem extensions for chemical formulas, molecular structures, and mathematical typesetting.
 */
export function MathText({ content, text, imageUrl, className = '', isDarkMode = false }: MathTextProps) {
  return (
    <ScientificContentRenderer
      content={content}
      text={text}
      imageUrl={imageUrl}
      className={className}
      isDarkMode={isDarkMode}
    />
  );
}

export default MathText;
