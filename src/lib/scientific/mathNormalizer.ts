/**
 * MERITWISE Universal Mathematical Symbol, Greek Character & Algebraic Normalizer
 *
 * Provides comprehensive recovery and transformation of:
 * - Symbol font PUA glyphs (\uf070 -> \pi, \uf071 -> \theta, etc.)
 * - Legacy font mojibake (e.g. repeated equivalence signs '≡' into \rho, \theta, \le, \ge)
 * - Variable index subscripts (t1 -> t_1, t2 -> t_2, T1 -> T_1, m1 -> m_1, etc.)
 * - Plain-text fractions to LaTeX \frac{num}{den}
 * - Scientific units (\mathrm{kg\,m^{-3}}, ^\circ\mathrm{C}, etc.)
 * - Decontamination of question statements from trailing leaked fragments
 */

// Mapping of Symbol font Unicode Private Use Area (PUA) characters to LaTeX
const SYMBOL_FONT_MAP: Record<string, string> = {
  '\uf020': ' ',
  '\uf02b': '+',
  '\uf02d': '-',
  '\uf028': '(',
  '\uf029': ')',
  '\uf05b': '[',
  '\uf05d': ']',
  '\uf03d': '=',
  '\uf03c': '<',
  '\uf03e': '>',
  '\uf061': '\\alpha',
  '\uf062': '\\beta',
  '\uf063': '\\chi',
  '\uf064': '\\delta',
  '\uf065': '\\varepsilon',
  '\uf066': '\\phi',
  '\uf067': '\\gamma',
  '\uf068': '\\eta',
  '\uf069': '\\iota',
  '\uf06a': '\\varphi',
  '\uf06b': '\\kappa',
  '\uf06c': '\\lambda',
  '\uf06d': '\\mu',
  '\uf06e': '\\nu',
  '\uf06f': 'o',
  '\uf070': '\\pi',
  '\uf071': '\\theta',
  '\uf072': '\\rho',
  '\uf073': '\\sigma',
  '\uf074': '\\tau',
  '\uf075': '\\upsilon',
  '\uf076': '\\varpi',
  '\uf077': '\\omega',
  '\uf078': '\\xi',
  '\uf079': '\\psi',
  '\uf07a': '\\zeta',
  '\uf041': 'A',
  '\uf042': 'B',
  '\uf043': '\\chi',
  '\uf044': '\\Delta',
  '\uf045': 'E',
  '\uf046': '\\Phi',
  '\uf047': '\\Gamma',
  '\uf048': 'H',
  '\uf049': 'I',
  '\uf04b': 'K',
  '\uf04c': '\\Lambda',
  '\uf04d': 'M',
  '\uf04e': 'N',
  '\uf04f': 'O',
  '\uf050': '\\Pi',
  '\uf051': '\\Theta',
  '\uf052': 'P',
  '\uf053': '\\Sigma',
  '\uf054': 'T',
  '\uf055': '\\Upsilon',
  '\uf057': '\\Omega',
  '\uf058': '\\Xi',
  '\uf059': '\\Psi',
  '\uf0a3': '\\le',
  '\uf0b3': '\\ge',
  '\uf0b0': '^\\circ',
  '\uf0b1': '\\pm',
  '\uf0a5': '\\infty',
  '\uf0d7': '\\times',
  '\uf0b8': '\\div',
  '\uf0b9': '\\ne',
  '\uf02f': '/',
};

// Legacy Greek font direct glyph mapping
const GREEK_GLYPH_MAP: Record<string, string> = {
  '': '\\rho',
  '': '\\theta',
  '': '\\lambda',
  '': '\\pi',
  '': '\\omega',
  '': '\\mu',
  '': '\\alpha',
  '': '\\beta',
  '': '\\gamma',
  '': '\\Delta',
  '': '\\le',
  '': '\\ge',
  '': 'I',
  '': '\\Omega',
};

/**
 * Normalizes Symbol font PUA characters and legacy Greek characters into standard LaTeX
 */
export function normalizeSymbolFontGlyphs(text: string): string {
  if (!text) return '';
  let result = text;

  // Replace Symbol font PUA
  for (const [pua, latex] of Object.entries(SYMBOL_FONT_MAP)) {
    result = result.split(pua).join(latex);
  }

  // Replace raw legacy glyphs
  for (const [glyph, latex] of Object.entries(GREEK_GLYPH_MAP)) {
    result = result.split(glyph).join(latex);
  }

  return result;
}

/**
 * Decontaminates question statements from known leaked trailing fragments
 */
export function decontaminateStatement(statement: string): string {
  if (!statement) return '';
  let cleaned = statement;

  // Remove leaked option numerators/denominators at the end
  // e.g. "t1 ≡ t2 t1 t1 ≡ 273 t2 ≡ 273"
  cleaned = cleaned.replace(/\s*t[12]\s*≡\s*t[12]\s*t1\s*t1\s*≡\s*273\s*t2\s*≡\s*273\s*$/, ' :');

  // Remove leaked numbers at end of Newton law of cooling question: "7 3 4"
  cleaned = cleaned.replace(/\s+7\s+3\s+4\s*$/, ' :');

  // Remove stray equivalence signs at end: "≡ ≡" or "≡≡"
  cleaned = cleaned.replace(/\s*(?:[≡=]\s*){2,}$/, ' :');

  // Remove leaked option labels e.g. "CONH2 CONH2", "O O O Ph Ph I II III", "COOH COOH COOH O O I II III"
  cleaned = cleaned.replace(/\s*CONH2\s+CONH2\s*$/, ' :');
  cleaned = cleaned.replace(/\s*O\s+O\s+O\s+Ph\s+Ph\s+I\s+II\s+III\s*$/, ' :');
  cleaned = cleaned.replace(/\s*COOH\s+COOH\s+COOH\s+O\s+O\s+I\s+II\s+III\s*$/, ' :');

  // Remove Hindi Kruti Dev leaked string at end of Q45
  cleaned = cleaned.replace(/\s*nh\s+x;h\s+vfHkfØ;k.*$/, '');

  // Clean double spaces and normalize final punctuation
  cleaned = cleaned.replace(/\s{2,}/g, ' ').trim();
  if (cleaned.endsWith(': :')) {
    cleaned = cleaned.slice(0, -2);
  }

  return cleaned;
}

/**
 * Normalizes variable subscripts in scientific context
 * E.g.: t1 -> t_1, t2 -> t_2, T1 -> T_1, m1 -> m_1, m2 -> m_2, rho1 -> \rho_1, etc.
 */
export function normalizeVariableSubscripts(text: string): string {
  if (!text) return '';

  return text
    // Temperature variables with degree Celsius
    .replace(/\bt1\s*º?\s*C\b/gi, '$t_1\\,^\\circ\\mathrm{C}$')
    .replace(/\bt2\s*º?\s*C\b/gi, '$t_2\\,^\\circ\\mathrm{C}$')
    .replace(/\bt1\s*°C\b/gi, '$t_1\\,^\\circ\\mathrm{C}$')
    .replace(/\bt2\s*°C\b/gi, '$t_2\\,^\\circ\\mathrm{C}$')
    // Greek variables with indices: \theta1 -> \theta_1, \rho1 -> \rho_1
    .replace(/\\(theta|rho|lambda|mu|omega|sigma|epsilon|phi)([1-4])\b/g, '\\$1_$2')
    // Normal variables with digit: m1 -> m_1, m2 -> m_2, R1 -> R_1, R2 -> R_2, v1 -> v_1, v2 -> v_2, t1 -> t_1, t2 -> t_2
    .replace(/\b([mMRvIEFLxtT])([1-4])\b/g, '$1_$2')
    // Special constants: lambda0 -> \lambda_0, g0 -> g_0
    .replace(/\b(lambda0|\\lambda0)\b/g, '\\lambda_0')
    .replace(/\bg0\b/g, 'g_0');
}

/**
 * Converts plain text algebraic fraction expressions into LaTeX \frac{num}{den}
 * E.g.: "(t1 + 273) / (t1 - t2)" -> "\frac{t_1 + 273}{t_1 - t_2}"
 *       "(a - f) / (1 + b)" -> "\frac{a - f}{1 + b}"
 *       "P / (kT)" -> "\frac{P}{kT}"
 */
export function parseAlgebraicFraction(expr: string): string {
  if (!expr || typeof expr !== 'string') return '';
  const trimmed = expr.trim();

  // Pattern 1: (expr1) / (expr2)
  const parenParen = /^\(([^()]+)\)\s*\/\s*\(([^()]+)\)$/;
  const match1 = trimmed.match(parenParen);
  if (match1) {
    const num = normalizeVariableSubscripts(match1[1].trim());
    const den = normalizeVariableSubscripts(match1[2].trim());
    return `\\frac{${num}}{${den}}`;
  }

  // Pattern 2: (expr1) / den (where den is single token or expression without parens)
  const parenSimple = /^\(([^()]+)\)\s*\/\s*([^()]+)$/;
  const match2 = trimmed.match(parenSimple);
  if (match2) {
    const num = normalizeVariableSubscripts(match2[1].trim());
    const den = normalizeVariableSubscripts(match2[2].trim());
    return `\\frac{${num}}{${den}}`;
  }

  // Pattern 3: num / (expr2) (where num is single token or simple expression)
  const simpleParen = /^([^()\/]+)\s*\/\s*\(([^()]+)\)$/;
  const match3 = trimmed.match(simpleParen);
  if (match3) {
    const num = normalizeVariableSubscripts(match3[1].trim());
    const den = normalizeVariableSubscripts(match3[2].trim());
    return `\\frac{${num}}{${den}}`;
  }

  // Pattern 4: Number fraction with variable e.g. "7/4 T" or "3/2 T" or "9/16 kg"
  const numFracVar = /^(\d+)\s*\/\s*(\d+)\s*([A-Za-z\^º°]+.*)?$/;
  const match4 = trimmed.match(numFracVar);
  if (match4) {
    const num = match4[1];
    const den = match4[2];
    const rest = match4[3] ? match4[3].trim() : '';
    if (rest === 'kg' || rest === 'm/s' || rest === 'J') {
      return `\\frac{${num}}{${den}}\\,\\mathrm{${rest}}`;
    }
    return `\\frac{${num}}{${den}}${rest ? ` ${rest}` : ''}`;
  }

  // Pattern 5: simple / simple e.g. "P / (kT)" or "Pm / (kT)"
  const simpleSimple = /^([A-Za-z0-9\s]+)\s*\/\s*([A-Za-z0-9\s]+)$/;
  const match5 = trimmed.match(simpleSimple);
  if (match5 && !trimmed.includes('http')) {
    const num = normalizeVariableSubscripts(match5[1].trim());
    const den = normalizeVariableSubscripts(match5[2].trim());
    return `\\frac{${num}}{${den}}`;
  }

  // Pattern 6: Square root fractions e.g. "2√n / (n + 1)²"
  if (trimmed.includes('√') || trimmed.includes('\\sqrt')) {
    const sqrtMatch = trimmed.match(/^(.*)\s*\/\s*(.*)$/);
    if (sqrtMatch) {
      let num = sqrtMatch[1].replace(/√([A-Za-z0-9]+)/g, '\\sqrt{$1}').trim();
      let den = sqrtMatch[2].replace(/²/, '^2').replace(/³/g, '^3').trim();
      return `\\frac{${num}}{${den}}`;
    }
  }

  return normalizeVariableSubscripts(trimmed);
}

/**
 * Universal mathematical formatting pipeline
 */
export function formatMathematicalExpression(text: string): string {
  if (!text) return '';

  // 1. Symbol font and Greek normalizations
  let processed = normalizeSymbolFontGlyphs(text);

  // 2. Variable index normalization
  processed = normalizeVariableSubscripts(processed);

  // 3. Algebraic fraction parser if expression contains division slash
  if (processed.includes('/') && !processed.includes('://')) {
    processed = parseAlgebraicFraction(processed);
  }

  return processed;
}
