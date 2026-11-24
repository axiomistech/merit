/**
 * Automated Scientific Question Integrity Validation Engine
 * Audits questions for missing diagrams, detached labels, broken formulas, duplicate options,
 * and font corruption.
 */

import { QuestionVerificationStatus } from '@/types/scientific';

export interface QuestionValidationResult {
  isValid: boolean;
  status: QuestionVerificationStatus;
  issues: string[];
  autoRepairable: boolean;
}

export interface QuestionToValidate {
  id: string;
  text: string;
  imageUrl?: string;
  options: { key: string; text: string; imageUrl?: string }[];
  contentBlocks?: any[];
  answerKey?: {
    correctOptions?: string[];
  };
}

export function validateQuestionIntegrity(q: QuestionToValidate): QuestionValidationResult {
  const issues: string[] = [];
  let status: QuestionVerificationStatus = 'verified';

  const text = q.text || '';
  const options = q.options || [];

  // 1. Check for detached labels in question text
  if (/\b(O\s+O\s+O\s+Ph|COOH\s+COOH\s+COOH|CONH2\s+CONH2)\b/.test(text)) {
    issues.push('Detached atomic/functional labels found in question statement');
    status = 'scientific_content_incomplete';
  }

  // 2. Check for missing diagrams when diagrams/circuits/graphs/molecules are referenced
  const referencesDiagram = /\b(given circuit|in the circuit|following circuit|given graph|in the given figure|shown in the figure|following structures represent|molecules can exhibit tautomerism|strengths of the carboxylic acids)\b/i.test(text);
  const hasVisualContent = Boolean(
    q.imageUrl ||
    (q.contentBlocks && q.contentBlocks.some((b) => ['scientific_diagram', 'image', 'molecular_group', 'chemical_reaction', 'polymer_structure'].includes(b.type))) ||
    options.some((o) => o.imageUrl)
  );

  if (referencesDiagram && !hasVisualContent) {
    issues.push('Question statement references a diagram, graph, circuit, or molecular structures, but no visual asset is attached');
    status = 'missing_source_asset';
  }

  // 3. Check for legacy non-Unicode font encodings (e.g. Kruti Dev mojibake)
  if (/vfHkfØ;k|xSl|okrkoj.k|dkcZu|,FksukWyl|vk;u|çksVkWu/.test(text)) {
    issues.push('Corrupted legacy non-Unicode Hindi font encodings detected in question text');
    status = 'encoding_error';
  }

  // 4. Check for duplicate options
  const optionTexts = options.map((o) => (o.text || '').trim()).filter(Boolean);
  const uniqueOptionTexts = new Set(optionTexts);
  const hasOptionImages = options.some((o) => Boolean(o.imageUrl));

  if (!hasOptionImages && optionTexts.length > 0 && uniqueOptionTexts.size < optionTexts.length) {
    issues.push('Duplicate answer option text detected without differentiating graphical assets');
    status = 'scientific_content_incomplete';
  }

  // 5. Check for flattened polymer structures or empty options like 'C C'
  const hasFlattenedOption = options.some((o) => !o.imageUrl && /^C\s+C(\s+C)*$/i.test(o.text.trim()));
  if (hasFlattenedOption) {
    issues.push('Answer options contain flattened atomic fragments (e.g. "C C") indicating missing polymer structures');
    status = 'scientific_content_incomplete';
  }

  // 6. Check for valid answer key
  if (!q.answerKey?.correctOptions || q.answerKey.correctOptions.length === 0) {
    issues.push('Missing or empty answer key mapping');
    status = 'scientific_content_incomplete';
  }

  // 7. Check option count
  if (options.length < 2) {
    issues.push(`Insufficient answer options: expected at least 2, found ${options.length}`);
    status = 'scientific_content_incomplete';
  }

  const isValid = issues.length === 0;

  return {
    isValid,
    status: isValid ? 'published' : status,
    issues,
    autoRepairable: issues.every((i) =>
      i.includes('Detached atomic') ||
      i.includes('Corrupted legacy') ||
      i.includes('without differentiating graphical assets')
    ),
  };
}
