import { describe, it, expect } from 'vitest';
import { SAMPLE_NEET_PAPER, SAMPLE_NEET_QUESTIONS, getFullNeet180Questions } from '@/data/seedData';
import {
  getStoredPapersServer,
  getStoredPaperBySlugServer,
  getStoredQuestionsServer,
  getStoredQuestionByIdServer,
} from '@/lib/server/backendStore';
import { GET as getTestsRoute } from '@/app/api/tests/route';

describe('Official NEET Phase-2 (Code: BB-QQ-XX) Paper & Questions', () => {
  it('validates the official NEET paper configuration (180 questions, 720 marks, 180 mins)', () => {
    expect(SAMPLE_NEET_PAPER).not.toBeNull();
    expect(SAMPLE_NEET_PAPER.slug).toBe('neet-phase-2-code-bb-qq-xx');
    expect(SAMPLE_NEET_PAPER.totalQuestions).toBe(180);
    expect(SAMPLE_NEET_PAPER.totalMarks).toBe(720);
    expect(SAMPLE_NEET_PAPER.durationMinutes).toBe(180);
    expect(SAMPLE_NEET_PAPER.sections.length).toBe(3);

    // Section 1: Chemistry (1 - 45)
    const chemSec = SAMPLE_NEET_PAPER.sections.find((s) => s.subjectSlug === 'chemistry');
    expect(chemSec).toBeDefined();
    expect(chemSec?.questionIndices.length).toBe(45);
    expect(chemSec?.questionIndices[0]).toBe(1);
    expect(chemSec?.questionIndices[44]).toBe(45);

    // Section 2: Biology (46 - 135)
    const bioSec = SAMPLE_NEET_PAPER.sections.find((s) => s.subjectSlug === 'biology');
    expect(bioSec).toBeDefined();
    expect(bioSec?.questionIndices.length).toBe(90);
    expect(bioSec?.questionIndices[0]).toBe(46);
    expect(bioSec?.questionIndices[89]).toBe(135);

    // Section 3: Physics (136 - 180)
    const phySec = SAMPLE_NEET_PAPER.sections.find((s) => s.subjectSlug === 'physics');
    expect(phySec).toBeDefined();
    expect(phySec?.questionIndices.length).toBe(45);
    expect(phySec?.questionIndices[0]).toBe(136);
    expect(phySec?.questionIndices[44]).toBe(180);
  });

  it('validates all 180 official NEET questions data integrity and options', () => {
    expect(SAMPLE_NEET_QUESTIONS.length).toBe(180);
    expect(getFullNeet180Questions().length).toBe(180);

    const validOptionKeys = ['A', 'B', 'C', 'D'];

    SAMPLE_NEET_QUESTIONS.forEach((q, idx) => {
      expect(q.displayNumber).toBe(idx + 1);
      expect(q.text.length).toBeGreaterThan(10);
      expect(q.options.length).toBe(4);
      expect(q.marks).toBe(4);
      expect(q.negativeMarks).toBe(1);
      expect(q.answerKey?.correctOptions).toBeDefined();
      expect(q.answerKey?.correctOptions?.length).toBe(1);
      expect(validOptionKeys).toContain(q.answerKey?.correctOptions?.[0]);
      expect(q.explanation?.text).toBeDefined();
      expect(q.explanation?.text.length).toBeGreaterThan(0);
    });

    // Sample checks for specific questions from the official paper
    // Q1: Nitrogen compound A reacts with Sn/HCl -> Nitrobenzene (C)
    const q1 = SAMPLE_NEET_QUESTIONS[0];
    expect(q1.answerKey?.correctOptions).toEqual(['C']);
    expect(q1.options[2].text).toContain('Nitrobenzene');

    // Q2: CH3CH2CH2Br + NaCN -> Fastest in DMF (D)
    const q2 = SAMPLE_NEET_QUESTIONS[1];
    expect(q2.answerKey?.correctOptions).toEqual(['D']);
    expect(q2.options[3].text).toContain('dimethylformamide');

    // Q46: Ligase joins plasmid and foreign DNA (A)
    const q46 = SAMPLE_NEET_QUESTIONS[45];
    expect(q46.answerKey?.correctOptions).toEqual(['A']);
    expect(q46.options[0].text).toContain('ligase');

    // Q136: Distance of distinct vision correcting lens -0.25 diopter (C)
    const q136 = SAMPLE_NEET_QUESTIONS[135];
    expect(q136.answerKey?.correctOptions).toEqual(['C']);
    expect(q136.options[2].text).toContain('–0.25');

    // Q180: Interference pattern ratio 2√n / (n+1) (C)
    const q180 = SAMPLE_NEET_QUESTIONS[179];
    expect(q180.answerKey?.correctOptions).toEqual(['C']);
    expect(q180.options[2].text).toContain('2√n');
  });

  it('validates persistent database storage in backendStore for the paper and questions', () => {
    const paper = getStoredPaperBySlugServer('neet-phase-2-code-bb-qq-xx');
    expect(paper).toBeDefined();
    expect(paper?.name).toBe('NEET Phase-2 (Code: BB-QQ-XX) Official Paper');
    expect(paper?.totalQuestions).toBe(180);
    expect(paper?.maxMarks).toBe(720);
    expect(paper?.questionIds.length).toBe(180);

    const allQuestions = getStoredQuestionsServer();
    expect(allQuestions.length).toBeGreaterThanOrEqual(180);

    const firstQ = getStoredQuestionByIdServer('neet-2016-p2-q001');
    expect(firstQ).toBeDefined();
    expect(firstQ?.marks).toBe(4);
    expect(firstQ?.negativeMarks).toBe(1);
    expect(firstQ?.subjectSlug).toBe('chemistry');
  });

  it('serves the NEET paper via GET /api/tests?exam=neet&status=published', async () => {
    const req = new Request('http://localhost:3000/api/tests?exam=neet&status=published');
    const res = await getTestsRoute(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(Array.isArray(json.data)).toBe(true);

    const neetPaper = json.data.find((p: any) => p.slug === 'neet-phase-2-code-bb-qq-xx');
    expect(neetPaper).toBeDefined();
    expect(neetPaper.totalQuestions).toBe(180);
    expect(neetPaper.maxMarks).toBe(720);
    expect(neetPaper.durationMinutes).toBe(180);
    expect(neetPaper.hasOMR).toBe(true);
  });
});
