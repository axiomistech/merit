'use client';

import React, { useMemo } from 'react';
import { ScientificContentBlock } from '@/types/scientific';
import { autoFormatScientificText } from '@/lib/scientific/formulaParser';
import { MathRenderer } from './MathRenderer';
import { MolecularStructureRenderer } from './MolecularStructureRenderer';
import { MolecularGroupRenderer } from './MolecularGroupRenderer';
import { PolymerStructureRenderer } from './PolymerStructureRenderer';
import { ChemicalReactionRenderer } from './ChemicalReactionRenderer';
import { ScientificDiagramRenderer } from './ScientificDiagramRenderer';

interface ScientificContentRendererProps {
  contentBlocks?: ScientificContentBlock[];
  content?: string;
  text?: string;
  imageUrl?: string;
  isDarkMode?: boolean;
  className?: string;
}

export function ScientificContentRenderer({
  contentBlocks,
  content,
  text,
  imageUrl,
  isDarkMode = false,
  className = '',
}: ScientificContentRendererProps) {
  // 1. Structured Content Blocks Mode
  if (contentBlocks && contentBlocks.length > 0) {
    const sortedBlocks = [...contentBlocks].sort((a, b) => a.order - b.order);

    return (
      <div className={`space-y-3 leading-relaxed ${className}`}>
        {sortedBlocks.map((block) => {
          switch (block.type) {
            case 'block_math':
              return (
                <MathRenderer
                  key={block.id}
                  expression={block.latex || block.rawContent || ''}
                  displayMode={true}
                />
              );

            case 'inline_math':
              return (
                <MathRenderer
                  key={block.id}
                  expression={block.latex || block.rawContent || ''}
                  displayMode={false}
                />
              );

            case 'chemical_formula': {
              const expr = block.mhchem || (block.rawContent ? `\\ce{${block.rawContent}}` : '');
              return <MathRenderer key={block.id} expression={expr} displayMode={false} />;
            }

            case 'chemical_reaction':
              return (
                <ChemicalReactionRenderer
                  key={block.id}
                  data={block.reactionData}
                  assetUrl={block.assetUrl}
                  equationText={block.rawContent}
                  isDarkMode={isDarkMode}
                />
              );

            case 'molecular_structure':
              return (
                <div key={block.id} className="my-2 flex justify-center">
                  <MolecularStructureRenderer
                    assetUrl={block.assetUrl}
                    svgContent={block.svgContent}
                    chemicalName={block.molecularData?.chemicalName}
                    canZoom={block.canZoom ?? true}
                    isDarkMode={isDarkMode}
                  />
                </div>
              );

            case 'molecular_group':
              return (
                <MolecularGroupRenderer
                  key={block.id}
                  items={block.molecularGroupItems}
                  assetUrl={block.assetUrl}
                  caption={block.accessibilityDescription}
                  isDarkMode={isDarkMode}
                />
              );

            case 'polymer_structure':
              return (
                <div key={block.id} className="my-2 flex justify-center">
                  <PolymerStructureRenderer
                    data={block.polymerData}
                    assetUrl={block.assetUrl}
                    isDarkMode={isDarkMode}
                  />
                </div>
              );

            case 'scientific_diagram':
            case 'image':
            case 'svg':
            case 'graph':
              return (
                <ScientificDiagramRenderer
                  key={block.id}
                  assetUrl={block.assetUrl}
                  svgContent={block.svgContent}
                  caption={block.accessibilityDescription}
                  canZoom={block.canZoom ?? true}
                  isDarkMode={isDarkMode}
                />
              );

            case 'text':
            case 'rich_text':
            default:
              return (
                <AutoScientificText
                  key={block.id}
                  text={block.normalizedContent || block.rawContent || ''}
                  className="inline"
                />
              );
          }
        })}

        {imageUrl && (
          <ScientificDiagramRenderer
            assetUrl={imageUrl}
            isDarkMode={isDarkMode}
            canZoom={true}
          />
        )}
      </div>
    );
  }

  // 2. Unstructured Fallback Mode (Full backward-compatible string handling)
  const rawText = content ?? text ?? '';

  return (
    <div className={`leading-relaxed ${className}`}>
      <AutoScientificText text={rawText} />
      {imageUrl && (
        <ScientificDiagramRenderer
          assetUrl={imageUrl}
          isDarkMode={isDarkMode}
          canZoom={true}
        />
      )}
    </div>
  );
}

/**
 * Parses raw text, detects chemical formulas, equations, and KaTeX math blocks,
 * and renders them with KaTeX / mhchem and clean typography.
 */
export function AutoScientificText({
  text,
  className = '',
}: {
  text: string;
  className?: string;
}) {
  const renderedElements = useMemo(() => {
    if (!text) return null;

    // Apply chemical formula and reaction auto-formatting
    const formatted = autoFormatScientificText(text);

    // Split on $$...$$ and $...$
    const regex = /(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g;
    const parts = formatted.split(regex);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const math = part.slice(2, -2).trim();
        return <MathRenderer key={index} expression={math} displayMode={true} />;
      }
      if (part.startsWith('$') && part.endsWith('$')) {
        const math = part.slice(1, -1).trim();
        return <MathRenderer key={index} expression={math} displayMode={false} />;
      }
      return <span key={index}>{part}</span>;
    });
  }, [text]);

  return <span className={className}>{renderedElements}</span>;
}
