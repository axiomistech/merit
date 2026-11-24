'use client';

import React from 'react';
import { MolecularGroupItem } from '@/types/scientific';
import { MolecularStructureRenderer } from './MolecularStructureRenderer';

interface MolecularGroupRendererProps {
  items?: MolecularGroupItem[];
  assetUrl?: string; // composite image asset if items are rendered as a unified group
  caption?: string;
  isDarkMode?: boolean;
  className?: string;
}

export function MolecularGroupRenderer({
  items = [],
  assetUrl,
  caption,
  isDarkMode = false,
  className = '',
}: MolecularGroupRendererProps) {
  // If a unified group asset image exists (e.g. Molecules I, II, III as a single crop)
  if (assetUrl) {
    return (
      <div className={`my-4 flex flex-col items-center justify-center ${className}`}>
        <div
          className={`rounded-xl border p-3 shadow-xs max-w-full overflow-x-auto ${
            isDarkMode ? 'bg-white/95 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          <img
            src={assetUrl}
            alt={caption || 'Molecular structure comparison group'}
            className="max-h-56 object-contain"
            loading="lazy"
          />
        </div>
        {caption && (
          <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">
            {caption}
          </span>
        )}
      </div>
    );
  }

  if (!items || items.length === 0) return null;

  return (
    <div className={`my-4 flex flex-col items-center ${className}`}>
      {/* Clean horizontal arrangement on desktop with responsive wrapping on mobile */}
      <div className="flex flex-wrap items-end justify-center gap-6 sm:gap-8 max-w-full">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center">
            <MolecularStructureRenderer
              assetUrl={item.assetUrl}
              svgContent={item.svg}
              chemicalName={item.name}
              isDarkMode={isDarkMode}
              canZoom={true}
            />
            {/* Permanently pinned label underneath */}
            <div className="mt-2 text-center font-bold text-sm tracking-wide text-gray-800 dark:text-gray-200">
              {item.label}
            </div>
            {item.description && (
              <span className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5">
                {item.description}
              </span>
            )}
          </div>
        ))}
      </div>

      {caption && (
        <span className="mt-2.5 text-xs font-medium text-gray-500 dark:text-gray-400">
          {caption}
        </span>
      )}
    </div>
  );
}
