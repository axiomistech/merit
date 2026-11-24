/**
 * Universal Scientific & Chemical Formula Parser
 * Detects chemical formulas, equations, coordination complexes, and scientific notation
 * and transforms them into KaTeX / mhchem syntax for upright scientific typesetting.
 */

// Common English words or acronyms that look like chemical formulas (e.g. In, As, He, At, No, Am, Be)
const NON_FORMULA_WORDS = new Set([
  'IN', 'AS', 'HE', 'AT', 'NO', 'AM', 'BE', 'SO', 'IF', 'OR', 'AN', 'IS', 'IT', 'BY', 'TO', 'ON', 'OF', 'ME'
]);

/**
 * Checks if a token matches a chemical formula pattern:
 * e.g. C6H5NO2, C12H10N2O, K3[AlF6], AlF3, H2SO4, SO4^2-, NH4+, Fe3+, [Fe(CN)6]3-, CuSO4.5H2O, sp3, 1s2 2s2 2p6
 */
export function isChemicalFormula(token: string): boolean {
  if (!token) return false;
  const trimmed = token.trim();
  if (trimmed.length < 2) return false;
  if (NON_FORMULA_WORDS.has(trimmed.toUpperCase())) return false;

  // Formula with coordination brackets e.g. K3[AlF6], [Fe(CN)6]3-
  if (/^[A-Z][a-z]?\d*\[[A-Z].*\]\d*[\+\-]?\d*$/.test(trimmed)) return true;

  // Orbital hybridization e.g. sp3, sp2, sp3d2, d2sp3
  if (/^(sp[1-3](d[1-5])?|d[1-2]sp[2-3]|d[1-9]|d10)$/.test(trimmed)) return true;

  // Standard chemical formula e.g. C6H5NO2, H2SO4, KMnO4, Al2O3, CH3CH2CH2Br
  if (/^([A-Z][a-z]?\d*){2,}(\^[\+\-]?\d*|[\+\-]\d*)?$/.test(trimmed)) {
    // Ensure it contains at least one number or lowercase element letter (avoid matching pure English uppercase like "ABCD")
    if (/\d/.test(trimmed) || /[a-z]/.test(trimmed)) {
      return true;
    }
  }

  // Hydrates e.g. CuSO4.5H2O
  if (/^[A-Z][a-z]?\d*[A-Z][a-z]?\d*[\.\·]\d*H2O$/.test(trimmed)) return true;

  return false;
}

/**
 * Checks if a string contains a chemical equation:
 * e.g. CH3CH2CH2Br + NaCN -> CH3CH2CH2CN + NaBr
 * e.g. H3BO3 + H2O <=> B(OH)4- + H+
 */
export function isChemicalEquation(text: string): boolean {
  if (!text) return false;
  return /(?:-->|->|—>|→|<=>|⇌)\s*[A-Z]/.test(text) && /\+/.test(text);
}

/**
 * Normalizes chemical equations into mhchem syntax
 */
export function formatChemicalEquation(equation: string): string {
  // Normalize arrow variants to -> or <=>
  let normalized = equation
    .replace(/—>/g, '->')
    .replace(/-->/g, '->')
    .replace(/→/g, '->')
    .replace(/⇌/g, '<=>');

  return `\\ce{${normalized}}`;
}

/**
 * Automatically wraps detected inline chemical formulas in \ce{...} for KaTeX mhchem
 */
export function autoFormatScientificText(text: string): string {
  if (!text) return '';

  // If text already has LaTeX ($...$ or $$...$$), keep those intact and only process outside
  const mathSegments: string[] = [];
  const placeholder = '___MATH_BLOCK___';

  let sanitized = text.replace(/(\$\$[\s\S]*?\$\$|\$[^\$\n]+?\$)/g, (match) => {
    mathSegments.push(match);
    return `${placeholder}${mathSegments.length - 1}___`;
  });

  // Handle chemical reactions
  if (isChemicalEquation(sanitized)) {
    sanitized = sanitized.replace(/([A-Z][A-Za-z0-9\[\]\(\)\s+_-]+?(?:->|-->|—>|→|<=>|⇌)\s*[A-Z][A-Za-z0-9\[\]\(\)\s+_-]+)/g, (match) => {
      return `$${formatChemicalEquation(match.trim())}$`;
    });
  }

  // Regex to detect standalone chemical formulas in prose:
  // e.g. C6H5NO2, C12H10N2O, K3[AlF6], AlF3, H2SO4, Sn/HCl, HNO2, SO4^2-, NH4+, Fe3+
  const formulaRegex = /\b([A-Z][a-z]?\d+[A-Za-z0-9\[\]\(\)\+\-]*|K3\[AlF6\]|AlF3|K\[AlF3H\]|K3\[AlF3H3\]|AlH3|XeF4|XeF2|BF3|PF3|CF4|SF4|SiF4)\b/g;

  sanitized = sanitized.replace(formulaRegex, (match) => {
    if (isChemicalFormula(match)) {
      return `$\\ce{${match}}$`;
    }
    return match;
  });

  // Re-inject math segments
  sanitized = sanitized.replace(/___MATH_BLOCK___(\d+)___/g, (_, index) => {
    return mathSegments[parseInt(index, 10)] || '';
  });

  return sanitized;
}
