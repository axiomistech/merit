'use client';

import React, { useMemo } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';

// Ensure KaTeX mhchem extension is loaded
if (typeof window !== 'undefined') {
  try {
    require('katex/contrib/mhchem');
  } catch {
    // Already loaded or bundled
  }
} else {
  try {
    require('katex/contrib/mhchem');
  } catch {
    // Server-side
  }
}

interface MathRendererProps {
  expression: string;
  displayMode?: boolean;
  className?: string;
}

export function MathRenderer({
  expression,
  displayMode = false,
  className = '',
}: MathRendererProps) {
  const html = useMemo(() => {
    if (!expression) return '';
    try {
      return katex.renderToString(expression, {
        displayMode,
        throwOnError: false,
        output: 'htmlAndMathml',
      });
    } catch {
      return expression;
    }
  }, [expression, displayMode]);

  return (
    <span
      className={displayMode ? `my-2 block overflow-x-auto text-center ${className}` : `inline-block px-0.5 align-middle ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
