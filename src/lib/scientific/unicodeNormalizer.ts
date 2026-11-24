/**
 * Unicode and Legacy Font Normalizer
 * Corrects legacy non-Unicode font encodings (Kruti Dev / Chanakya / Walkman-Chanakya)
 * commonly found in Indian competitive exam PDFs (NEET, JEE, UPSC).
 */

const KRUTI_DEV_MAPPINGS: Record<string, string> = {
  'vfHkfØ;k': 'अभिक्रिया',
  'vfHkfØ;k,a': 'अभिक्रियाएं',
  'okrkoj.k': 'वातावरण',
  'dkcZu': 'कार्बन',
  ',FksukWyl': 'एथेनॉल',
  ',FksukWy': 'एथेनॉल',
  'xSI': 'गैस',
  'vk;u': 'आयन',
  'çksVkWu': 'प्रोटॉन',
  'U;wVªkWu': 'न्यूट्रॉन',
  'bysDVªkWu': 'इलेक्ट्रॉन',
  'fØ;k': 'क्रिया',
  'la?kV~V': 'संघट्ट',
  'rhoz': 'तीव्र',
  'pkyd': 'चालक',
  'izfrjks/k': 'प्रतिरोध',
  'foHko': 'विभव',
  'vkosX': 'आवेग',
  'rjax': 'तरंग',
  'pqaHkdh;': 'चुम्बकीय',
  'o`Rrkdkj': 'वृत्ताकार',
  'lafpr': 'संचित',
  'ÅtkZ': 'ऊर्जा',
};

/**
 * Normalizes corrupted Kruti Dev strings to modern UTF-8 Devanagari.
 */
export function normalizeLegacyHindi(text: string): string {
  if (!text) return '';
  let result = text;
  for (const [kruti, devanagari] of Object.entries(KRUTI_DEV_MAPPINGS)) {
    result = result.split(kruti).join(devanagari);
  }
  return result;
}

/**
 * Separates bilingual examination text (English + Hindi) into distinct clean strings.
 */
export function splitBilingualText(rawText: string): { english: string; hindi: string } {
  if (!rawText) return { english: '', hindi: '' };

  const normalized = normalizeLegacyHindi(rawText);
  const lines = normalized.split('\n');
  const enLines: string[] = [];
  const hiLines: string[] = [];

  // Devanagari Unicode range: \u0900-\u097F
  const devanagariRegex = /[\u0900-\u097F]/;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    if (devanagariRegex.test(trimmed)) {
      hiLines.push(trimmed);
    } else {
      enLines.push(trimmed);
    }
  }

  return {
    english: enLines.join(' ').replace(/\s{2,}/g, ' ').trim(),
    hindi: hiLines.join(' ').replace(/\s{2,}/g, ' ').trim(),
  };
}
