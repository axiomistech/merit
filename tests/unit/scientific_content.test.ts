import { describe, it, expect } from 'vitest';
import { isChemicalFormula, isChemicalEquation, autoFormatScientificText } from '@/lib/scientific/formulaParser';
import { normalizeLegacyHindi, splitBilingualText } from '@/lib/scientific/unicodeNormalizer';
import { normalizeSymbolFontGlyphs, normalizeVariableSubscripts, parseAlgebraicFraction, decontaminateStatement } from '@/lib/scientific/mathNormalizer';
import { validateQuestionIntegrity } from '@/lib/scientific/validation';
import { getStoredQuestionsServer, getStoredQuestionByIdServer } from '@/lib/server/backendStore';

describe('Universal Scientific Content Architecture', () => {
  it('correctly detects chemical formulas and rejects ordinary English words', () => {
    expect(isChemicalFormula('C6H5NO2')).toBe(true);
    expect(isChemicalFormula('C12H10N2O')).toBe(true);
    expect(isChemicalFormula('K3[AlF6]')).toBe(true);
    expect(isChemicalFormula('H2SO4')).toBe(true);
    expect(isChemicalFormula('sp3')).toBe(true);
    expect(isChemicalFormula('sp3d2')).toBe(true);

    // Common English words should NOT be recognized as formulas
    expect(isChemicalFormula('In')).toBe(false);
    expect(isChemicalFormula('As')).toBe(false);
    expect(isChemicalFormula('He')).toBe(false);
    expect(isChemicalFormula('At')).toBe(false);
    expect(isChemicalFormula('No')).toBe(false);
    expect(isChemicalFormula('Is')).toBe(false);
  });

  it('correctly auto-formats prose containing chemical formulas and reactions into KaTeX mhchem', () => {
    const text = 'Forms a compound with molecular formula C12H10N2O and reacts with Sn/HCl';
    const formatted = autoFormatScientificText(text);
    expect(formatted).toContain('$\\ce{C12H10N2O}$');

    const reactionText = 'Consider the reaction : CH3CH2CH2Br + NaCN -> CH3CH2CH2CN + NaBr';
    const formattedRxn = autoFormatScientificText(reactionText);
    expect(formattedRxn).toContain('\\ce{CH3CH2CH2Br + NaCN -> CH3CH2CH2CN + NaBr}');
  });

  it('normalizes legacy Kruti Dev Hindi font encodings into proper UTF-8 Devanagari', () => {
    const corrupted = 'vfHkfØ;k esa xSI rFha okrkoj.k';
    const normalized = normalizeLegacyHindi(corrupted);
    expect(normalized).toContain('अभिक्रिया');
    expect(normalized).toContain('गैस');
    expect(normalized).toContain('वातावरण');
  });

  it('separates bilingual examination text into distinct English and Hindi strings', () => {
    const raw = `The correct structure of compound A is :
अभिक्रिया में बनने वाले उत्पाद A की सही संरचना है -`;
    const { english, hindi } = splitBilingualText(raw);
    expect(english).toBe('The correct structure of compound A is :');
    expect(hindi).toContain('अभिक्रिया');
  });

  it('validates question integrity and flags detached labels or missing diagrams', () => {
    const corruptedQ = {
      id: 'test-q1',
      text: 'Which molecules exhibit tautomerism? O O O Ph Ph I II III',
      options: [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
      ],
      answerKey: { correctOptions: ['B'] },
    };

    const res = validateQuestionIntegrity(corruptedQ);
    expect(res.isValid).toBe(false);
    expect(res.issues.some((i) => i.includes('Detached atomic'))).toBe(true);
  });

  it('validates repaired official NEET questions in the backend store', () => {
    const allQuestions = getStoredQuestionsServer();
    expect(allQuestions.length).toBe(180);

    // Q1: Diazonium azo coupling
    const q1 = getStoredQuestionByIdServer('neet-2016-p2-q001');
    expect(q1).toBeDefined();
    expect(q1?.text).not.toContain('CONH2 CONH2');
    expect(q1?.text).toContain('\\ce{C12H10N2O}');
    expect(q1?.options[0].imageUrl).toBe('/assets/scientific/neet-phase-2/q1_opt_A.png');
    expect(q1?.options[2].imageUrl).toBe('/assets/scientific/neet-phase-2/q1_opt_C.png');

    // Q3: Selective hydrogenation with reaction diagram and options
    const q3 = getStoredQuestionByIdServer('neet-2016-p2-q003');
    expect(q3).toBeDefined();
    expect(q3?.text).not.toContain('vfHkfØ;k');
    expect(q3?.imageUrl).toBe('/assets/scientific/neet-phase-2/q3_reaction.png');
    expect(q3?.options[2].imageUrl).toBe('/assets/scientific/neet-phase-2/q3_opt_C.png');

    // Q4: Tautomerism and Bredt's rule with molecular group
    const q4 = getStoredQuestionByIdServer('neet-2016-p2-q004');
    expect(q4).toBeDefined();
    expect(q4?.text).not.toContain('O O O Ph Ph I II III');
    expect(q4?.imageUrl).toBe('/assets/scientific/neet-phase-2/q4_molecules.png');

    // Q5: Carboxylic acids strengths with molecular group
    const q5 = getStoredQuestionByIdServer('neet-2016-p2-q005');
    expect(q5).toBeDefined();
    expect(q5?.text).not.toContain('COOH COOH COOH');
    expect(q5?.imageUrl).toBe('/assets/scientific/neet-phase-2/q5_molecules.png');

    // Q23: Complex fluoride formation
    const q23 = getStoredQuestionByIdServer('neet-2016-p2-q023');
    expect(q23).toBeDefined();
    expect(q23?.text).toContain('\\ce{AlF3}');
    expect(q23?.options[2].text).toContain('\\ce{K3[AlF6]}');

    // Q39: Nylon 6,6 polymer structures
    const q39 = getStoredQuestionByIdServer('neet-2016-p2-q039');
    expect(q39).toBeDefined();
    expect(q39?.options[0].imageUrl).toBe('/assets/scientific/neet-phase-2/q39_opt_A.png');
    expect(q39?.options[0].text).not.toBe('C C');

    // Q143: Ideal diodes circuit
    const q143 = getStoredQuestionByIdServer('neet-2016-p2-q143');
    expect(q143).toBeDefined();
    expect(q143?.imageUrl).toBe('/assets/scientific/neet-phase-2/q143_diagram.png');

    // Q168: Capacitor with 4 dielectric slabs
    const q168 = getStoredQuestionByIdServer('neet-2016-p2-q168');
    expect(q168).toBeDefined();
    expect(q168?.imageUrl).toBe('/assets/scientific/neet-phase-2/q168_diagram.png');
    expect(q168?.options[0].text).toContain('\\frac{1}{k}');

    // Q158: Capillary rise densities and contact angles
    const q158 = getStoredQuestionByIdServer('neet-2016-p2-q158');
    expect(q158).toBeDefined();
    expect(q158?.text).not.toContain('≡ 1');
    expect(q158?.text).toContain('\\rho_1');
    expect(q158?.text).toContain('\\theta_1');
    expect(q158?.options[2].text).toBe('$0 \\le \\theta_1 < \\theta_2 < \\theta_3 < \\frac{\\pi}{2}$');
    expect(q158?.imageUrl).toBe('/assets/scientific/neet-phase-2/q158_options.png');

    // Q160: Newton law of cooling temperatures and fractions
    const q160 = getStoredQuestionByIdServer('neet-2016-p2-q160');
    expect(q160).toBeDefined();
    expect(q160?.text).not.toContain('7 3 4');
    expect(q160?.options[0].text).toBe('$T$');
    expect(q160?.options[1].text).toBe('$\\frac{7}{4}T$');
    expect(q160?.options[2].text).toBe('$\\frac{3}{2}T$');
    expect(q160?.options[3].text).toBe('$\\frac{4}{3}T$');

    // Q162: Refrigerator coefficient of performance
    const q162 = getStoredQuestionByIdServer('neet-2016-p2-q162');
    expect(q162).toBeDefined();
    expect(q162?.text).not.toContain('t1 ≡ t2');
    expect(q162?.text).toContain('$t_2\\,^\\circ\\mathrm{C}$');
    expect(q162?.text).toContain('$t_1\\,^\\circ\\mathrm{C}$');
    expect(q162?.options[2].text).toBe('$\\frac{t_1 + 273}{t_1 - t_2}$');

    // Q138: de-Broglie and cutoff wavelength
    const q138 = getStoredQuestionByIdServer('neet-2016-p2-q138');
    expect(q138).toBeDefined();
    expect(q138?.options[1].text).toBe('$\\lambda_0 = \\frac{2mc\\lambda^2}{h}$');

    // Q140: Hydrogen atom transitions
    const q140 = getStoredQuestionByIdServer('neet-2016-p2-q140');
    expect(q140).toBeDefined();
    expect(q140?.options[3].text).toBe('$\\frac{20}{7}\\lambda$');
  });

  it('recovers Symbol font PUA characters and legacy Greek glyphs into standard LaTeX', () => {
    const raw = '\uf070 > \uf0711 > \uf0712 > \uf0713 \uf0b3 0';
    const normalized = normalizeSymbolFontGlyphs(raw);
    expect(normalized).toBe('\\pi > \\theta1 > \\theta2 > \\theta3 \\ge 0');

    const rawGlyphs = ' 1 > 2 > 3 and 1, 2, 3 and ';
    const normGlyphs = normalizeSymbolFontGlyphs(rawGlyphs);
    expect(normGlyphs).toContain('\\rho');
    expect(normGlyphs).toContain('\\theta');
    expect(normGlyphs).toContain('\\lambda');
  });

  it('normalizes variable subscripts in physical equations and temperatures', () => {
    expect(normalizeVariableSubscripts('t1 °C and t2 ºC')).toBe('$t_1\\,^\\circ\\mathrm{C}$ and $t_2\\,^\\circ\\mathrm{C}$');
    expect(normalizeVariableSubscripts('m1 and m2 attached to rod')).toBe('m_1 and m_2 attached to rod');
    expect(normalizeVariableSubscripts('\\theta1, \\theta2, \\theta3')).toBe('\\theta_1, \\theta_2, \\theta_3');
    expect(normalizeVariableSubscripts('\\rho1, \\rho2, \\rho3')).toBe('\\rho_1, \\rho_2, \\rho_3');
  });

  it('converts plain-text algebraic fractions into proper LaTeX \\frac expressions', () => {
    expect(parseAlgebraicFraction('(t1 + 273) / (t1 - t2)')).toBe('\\frac{t_1 + 273}{t_1 - t_2}');
    expect(parseAlgebraicFraction('(a - f) / (1 + b)')).toBe('\\frac{a - f}{1 + b}');
    expect(parseAlgebraicFraction('P / (kT)')).toBe('\\frac{P}{kT}');
    expect(parseAlgebraicFraction('7/4 T')).toBe('\\frac{7}{4} T');
    expect(parseAlgebraicFraction('9/16 kg')).toBe('\\frac{9}{16}\\,\\mathrm{kg}');
    expect(parseAlgebraicFraction('2√n / (n + 1)²')).toBe('\\frac{2\\sqrt{n}}{(n + 1)^2}');
  });

  it('decontaminates question statements from trailing leaked fragments', () => {
    const rawQ162 = 'The temperature inside a refrigerator is t2 °C and the room temperature is t1 °C. The amount of heat delivered to the room for each joule of electrical energy consumed ideally will be t1 ≡ t2 t1 t1 ≡ 273 t2 ≡ 273';
    expect(decontaminateStatement(rawQ162)).toBe('The temperature inside a refrigerator is t2 °C and the room temperature is t1 °C. The amount of heat delivered to the room for each joule of electrical energy consumed ideally will be :');

    const rawQ160 = 'The temperature of the body at the end of next 10 minutes will be 7 3 4';
    expect(decontaminateStatement(rawQ160)).toBe('The temperature of the body at the end of next 10 minutes will be :');

    const rawQ158 = 'The angles of contact obey ≡ ≡';
    expect(decontaminateStatement(rawQ158)).toBe('The angles of contact obey :');
  });

  it('validation engine flags repeated equivalence signs, leaked option fragments, and degenerate options', () => {
    const qCorrupted = {
      id: 'bad-q',
      text: 'Capillary rise angles obey ≡ ≡',
      options: [
        { key: 'A', text: 'T' },
        { key: 'B', text: 'T' },
        { key: 'C', text: 'T' },
        { key: 'D', text: 'T' },
      ],
      answerKey: { correctOptions: ['C'] },
    };

    const res = validateQuestionIntegrity(qCorrupted);
    expect(res.isValid).toBe(false);
    expect(res.issues.some((i) => i.includes('repeated equivalence'))).toBe(true);
    expect(res.issues.some((i) => i.includes('Degenerate identical'))).toBe(true);
  });
});
