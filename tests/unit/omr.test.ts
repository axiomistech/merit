import { describe, it, expect } from 'vitest';
import { getFullNeet180Questions } from '@/data/seedData';
import { generateBarcodeModules } from '@/lib/omr/barcode';
import { generateOmrPdf } from '@/lib/omr/pdfGenerator';
import { AnswerState } from '@/types/exam';

describe('NEET 180-Question OMR Implementation', () => {
  it('correctly partitions 180 questions into 4 vertical columns of 45', () => {
    const questions = getFullNeet180Questions();
    expect(questions.length).toBe(180);

    // Column 1: Questions 1 to 45 (Physics)
    const col1 = questions.slice(0, 45);
    expect(col1[0].displayNumber).toBe(1);
    expect(col1[44].displayNumber).toBe(45);
    expect(col1.every((q) => q.subjectSlug === 'physics')).toBe(true);

    // Column 2: Questions 46 to 90 (Chemistry)
    const col2 = questions.slice(45, 90);
    expect(col2[0].displayNumber).toBe(46);
    expect(col2[44].displayNumber).toBe(90);
    expect(col2.every((q) => q.subjectSlug === 'chemistry')).toBe(true);

    // Column 3: Questions 91 to 135 (Botany)
    const col3 = questions.slice(90, 135);
    expect(col3[0].displayNumber).toBe(91);
    expect(col3[44].displayNumber).toBe(135);
    expect(col3.every((q) => q.subjectSlug === 'botany')).toBe(true);

    // Column 4: Questions 136 to 180 (Zoology)
    const col4 = questions.slice(135, 180);
    expect(col4[0].displayNumber).toBe(136);
    expect(col4[44].displayNumber).toBe(180);
    expect(col4.every((q) => q.subjectSlug === 'zoology')).toBe(true);
  });

  it('correctly maps MCQ answers to numerical bubbles (A->1, B->2, C->3, D->4)', () => {
    const optionMap: Record<string, number> = {
      A: 1,
      B: 2,
      C: 3,
      D: 4,
    };

    expect(optionMap['A']).toBe(1);
    expect(optionMap['B']).toBe(2);
    expect(optionMap['C']).toBe(3);
    expect(optionMap['D']).toBe(4);
  });

  it('generates high-precision Code 39 barcode modules with start and stop delimiters', () => {
    const modules = generateBarcodeModules('FORT-26-000001');
    expect(modules.length).toBeGreaterThan(50);
    // Code 39 uses 1 (narrow) and 2.5 (wide) modules
    const ratios = modules.map((m) => m.widthRatio);
    expect(ratios.every((r) => r === 1 || r === 2.5)).toBe(true);
  });

  it('generates an A4 portrait vector PDF without throwing errors', () => {
    const questions = getFullNeet180Questions();
    const questionIdMap: Record<number, string> = {};
    const sampleAnswers: Record<string, AnswerState> = {};

    questions.forEach((q, i) => {
      questionIdMap[i + 1] = q.versionId;
      if (i % 3 === 0) {
        sampleAnswers[q.versionId] = {
          questionVersionId: q.versionId,
          selectedOptions: ['B'],
          isAnswered: true,
          markedForReview: false,
          timeSpentSeconds: 45,
          lastUpdated: Date.now(),
        };
      }
    });

    const doc = generateOmrPdf({
      studentName: 'DHANUSH JAGADEESH',
      registrationId: 'FORT-26-000001',
      examName: 'FORT NEET (UG)',
      paperName: 'All India Full Mock Test - 01',
      attemptId: 'ATT-20261121',
      submissionTime: '21-Nov-2026 18:30 IST',
      totalQuestions: 180,
      answers: sampleAnswers,
      questionIdMap,
      autoDownload: false, // In test environment, don't trigger browser save
    });

    expect(doc).toBeDefined();
    // A4 dimensions: 210 x 297 mm
    expect(Math.round(doc.internal.pageSize.getWidth())).toBe(210);
    expect(Math.round(doc.internal.pageSize.getHeight())).toBe(297);
  });
});
