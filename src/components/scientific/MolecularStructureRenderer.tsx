'use client';

import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface MolecularStructureRendererProps {
  assetUrl?: string;
  svgContent?: string;
  chemicalName?: string;
  label?: string;
  className?: string;
  canZoom?: boolean;
  altText?: string;
  isDarkMode?: boolean;
}

export function MolecularStructureRenderer({
  assetUrl,
  svgContent,
  chemicalName,
  label,
  className = '',
  canZoom = true,
  altText,
  isDarkMode = false,
}: MolecularStructureRendererProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!assetUrl && !svgContent) {
    return null;
  }

  const containerBg = isDarkMode
    ? 'bg-white/95 text-gray-900 border-gray-700'
    : 'bg-white text-gray-900 border-gray-200';

  return (
    <>
      <div className={`relative inline-flex flex-col items-center group ${className}`}>
        <div
          className={`relative rounded-lg border p-2 shadow-xs transition-transform hover:scale-[1.01] ${containerBg}`}
        >
          {svgContent ? (
            <div
              className="max-w-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : assetUrl ? (
            <img
              src={assetUrl}
              alt={altText || chemicalName || label || 'Molecular structure'}
              className="max-h-48 max-w-full object-contain select-none"
              loading="lazy"
            />
          ) : null}

          {canZoom && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setIsZoomOpen(true);
              }}
              title="Zoom structure"
              className="absolute top-1.5 right-1.5 p-1 rounded-md bg-white/80 hover:bg-white text-gray-700 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {label && (
          <span className="mt-1.5 font-semibold text-xs text-gray-600 dark:text-gray-300">
            {label}
          </span>
        )}
      </div>

      {/* Lightbox / Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-3xl max-h-[90vh] bg-white rounded-2xl p-6 shadow-2xl overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsZoomOpen(false)}
              className="absolute top-3 right-3 p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="flex flex-col items-center">
              {assetUrl ? (
                <img
                  src={assetUrl}
                  alt={altText || label || 'Zoomed molecular structure'}
                  className="max-h-[75vh] object-contain"
                />
              ) : svgContent ? (
                <div dangerouslySetInnerHTML={{ __html: svgContent }} />
              ) : null}
              {label && <span className="mt-4 font-bold text-base text-gray-800">{label}</span>}
              {chemicalName && (
                <span className="text-sm text-gray-500 mt-1">{chemicalName}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
