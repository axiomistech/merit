import { z } from 'zod';

export type ScientificBlockType =
  | 'text'
  | 'rich_text'
  | 'inline_math'
  | 'block_math'
  | 'chemical_formula'
  | 'chemical_reaction'
  | 'molecular_structure'
  | 'molecular_group'
  | 'polymer_structure'
  | 'reaction_mechanism'
  | 'scientific_diagram'
  | 'image'
  | 'svg'
  | 'table'
  | 'graph'
  | 'comparison_expression'
  | 'code'
  | 'source_question_image';

export type QuestionVerificationStatus =
  | 'pending_extraction'
  | 'extraction_in_progress'
  | 'extraction_completed'
  | 'scientific_content_incomplete'
  | 'encoding_error'
  | 'missing_source_asset'
  | 'requires_manual_verification'
  | 'verified'
  | 'published'
  | 'quarantined';

export interface QuestionSourceMetadata {
  examName?: string;
  examYear?: number;
  examSession?: string;
  paperCode?: string;
  originalQuestionNumber?: number;
  sourceDocName?: string;
  sourceDocSha256?: string;
  pageNumber?: number;
  boundingBox?: [number, number, number, number]; // [x1, y1, x2, y2]
  diagramBoundingBox?: [number, number, number, number];
  extractedAssetUrl?: string;
  rawExtractedText?: string;
  extractionConfidence?: number; // 0.0 to 1.0
  lastVerifiedAt?: string;
  verifiedBy?: string;
}

export interface MolecularGroupItem {
  id: string;
  label: string; // 'I', 'II', 'III' or 'A', 'B', 'C'
  assetUrl?: string;
  svg?: string;
  smiles?: string;
  name?: string;
  formula?: string;
  description?: string;
}

export interface PolymerStructureData {
  repeatingUnitFormula?: string;
  bracketNotation?: string; // e.g. "[-NH-(CH2)6-NH-CO-(CH2)4-CO-]n"
  index?: string; // 'n', '66', '6', etc.
  assetUrl?: string;
  svg?: string;
}

export interface ChemicalReactionData {
  reactantsText?: string;
  productsText?: string;
  reagentsAbove?: string;
  reagentsBelow?: string;
  arrowType?: 'forward' | 'equilibrium' | 'resonance' | 'reversible';
  mhchemExpression?: string;
  assetUrl?: string;
}

export interface ScientificContentBlock {
  id: string;
  type: ScientificBlockType;
  order: number;
  language?: 'en' | 'hi' | 'kn' | string;
  rawContent?: string;
  normalizedContent?: string;
  latex?: string;
  mhchem?: string;
  assetUrl?: string;
  svgContent?: string;
  molecularData?: {
    smiles?: string;
    molfile?: string;
    svg?: string;
    chemicalName?: string;
  };
  molecularGroupItems?: MolecularGroupItem[];
  polymerData?: PolymerStructureData;
  reactionData?: ChemicalReactionData;
  tableData?: {
    headers: string[];
    rows: string[][];
  };
  accessibilityDescription?: string;
  canZoom?: boolean;
}

export interface ScientificOption {
  key: string; // 'A', 'B', 'C', 'D'
  text?: string;
  latex?: string;
  mhchem?: string;
  assetUrl?: string;
  svgContent?: string;
  contentBlocks?: ScientificContentBlock[];
  accessibilityDescription?: string;
}

// Zod Schemas for Runtime Validation
export const ScientificContentBlockSchema = z.object({
  id: z.string(),
  type: z.enum([
    'text',
    'rich_text',
    'inline_math',
    'block_math',
    'chemical_formula',
    'chemical_reaction',
    'molecular_structure',
    'molecular_group',
    'polymer_structure',
    'reaction_mechanism',
    'scientific_diagram',
    'image',
    'svg',
    'table',
    'graph',
    'comparison_expression',
    'code',
    'source_question_image',
  ]),
  order: z.number().int().nonnegative(),
  language: z.string().optional(),
  rawContent: z.string().optional(),
  normalizedContent: z.string().optional(),
  latex: z.string().optional(),
  mhchem: z.string().optional(),
  assetUrl: z.string().optional(),
  svgContent: z.string().optional(),
  accessibilityDescription: z.string().optional(),
  canZoom: z.boolean().optional(),
});

export const ScientificOptionSchema = z.object({
  key: z.string(),
  text: z.string().optional(),
  latex: z.string().optional(),
  mhchem: z.string().optional(),
  assetUrl: z.string().optional(),
  svgContent: z.string().optional(),
  contentBlocks: z.array(ScientificContentBlockSchema).optional(),
  accessibilityDescription: z.string().optional(),
});
