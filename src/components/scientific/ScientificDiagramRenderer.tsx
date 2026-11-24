'use client';

import React, { useState } from 'react';
import { Maximize2, X } from 'lucide-react';

interface ScientificDiagramRendererProps {
  assetUrl?: string;
  svgContent?: string;
  caption?: string;
  altText?: string;
  canZoom?: boolean;
  isDarkMode?: boolean;
  className?: string;
}

export function ScientificDiagramRenderer({
  assetUrl,
  svgContent,
  caption,
  altText = 'Scientific diagram',
  canZoom = true,
  isDarkMode = false,
  className = '',
}: ScientificDiagramRendererProps) {
  const [isZoomOpen, setIsZoomOpen] = useState(false);

  if (!assetUrl && !svgContent) return null;

  return (
    <>
      <div className={`my-4 flex flex-col items-center justify-center group ${className}`}>
        {/* Theme-aware neutral container so black diagrams remain legible in dark mode */}
        <div
          className={`relative rounded-xl border p-3 shadow-xs max-w-full overflow-hidden transition-all ${
            isDarkMode ? 'bg-white/95 border-gray-700' : 'bg-white border-gray-200'
          }`}
        >
          {svgContent ? (
            <div
              className="max-w-full overflow-hidden"
              dangerouslySetInnerHTML={{ __html: svgContent }}
            />
          ) : assetUrl ? (
            <img
              src={assetUrl}
              alt={altText}
              className="max-h-72 sm:max-h-80 max-w-full object-contain select-none"
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
              title="Expand diagram"
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 hover:bg-white text-gray-700 shadow-xs opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          )}
        </div>

        {caption && (
          <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400 text-center max-w-md">
            {caption}
          </span>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs"
          onClick={() => setIsZoomOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white rounded-2xl p-6 shadow-2xl overflow-auto"
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
                  alt={altText}
                  className="max-h-[80vh] max-w-full object-contain"
                />
              ) : svgContent ? (
                <div dangerouslySetInnerHTML={{ __html: svgContent }} />
              ) : null}
              {caption && (
                <span className="mt-4 font-semibold text-sm text-gray-700">{caption}</span>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
