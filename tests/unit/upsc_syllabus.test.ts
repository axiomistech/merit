import { describe, it, expect } from 'vitest';
import {
  UPSC_PRELIMS_GS1_SYLLABUS,
  UPSC_PRELIMS_CSAT_SYLLABUS,
  UPSC_MAINS_GS_PAPERS,
  UPSC_MAINS_OPTIONALS,
  UPSC_SYLLABUS_OVERVIEW,
  UPSC_EXAM_PATTERN,
} from '@/data/upscSyllabusData';
import { GET as getSyllabusRoute } from '@/app/api/syllabus/route';

describe('UPSC Civil Services Examination Official Syllabus Integrity', () => {
  it('covers all official Prelims units for General Studies and CSAT', () => {
    expect(UPSC_PRELIMS_GS1_SYLLABUS.units.length).toBe(7);
    expect(UPSC_PRELIMS_CSAT_SYLLABUS.units.length).toBe(7);

    // Verify key GS1 subjects
    const gs1Slugs = UPSC_PRELIMS_GS1_SYLLABUS.units.map((u) => u.slug);
    expect(gs1Slugs).toContain('current-affairs');
    expect(gs1Slugs).toContain('indian-history-national-movement');
    expect(gs1Slugs).toContain('geography-india-world');
    expect(gs1Slugs).toContain('indian-polity-governance');
    expect(gs1Slugs).toContain('economy-social-development');
    expect(gs1Slugs).toContain('environment-ecology-climate');
    expect(gs1Slugs).toContain('general-science-technology');

    // Verify CSAT modules
    const csatSlugs = UPSC_PRELIMS_CSAT_SYLLABUS.units.map((u) => u.slug);
    expect(csatSlugs).toContain('reading-comprehension');
    expect(csatSlugs).toContain('logical-reasoning');
    expect(csatSlugs).toContain('basic-numeracy');
    expect(csatSlugs).toContain('data-interpretation');
  });

  it('covers all 4 General Studies Mains papers with 60 official syllabus modules', () => {
    expect(UPSC_MAINS_GS_PAPERS.length).toBe(4);

    const gs1 = UPSC_MAINS_GS_PAPERS.find((p) => p.paperCode === 'GS-1');
    const gs2 = UPSC_MAINS_GS_PAPERS.find((p) => p.paperCode === 'GS-2');
    const gs3 = UPSC_MAINS_GS_PAPERS.find((p) => p.paperCode === 'GS-3');
    const gs4 = UPSC_MAINS_GS_PAPERS.find((p) => p.paperCode === 'GS-4');

    expect(gs1?.modules.length).toBe(12);
    expect(gs2?.modules.length).toBe(20);
    expect(gs3?.modules.length).toBe(20);
    expect(gs4?.modules.length).toBe(8);

    const totalModules = (gs1?.modules.length || 0) + (gs2?.modules.length || 0) + (gs3?.modules.length || 0) + (gs4?.modules.length || 0);
    expect(totalModules).toBe(60);

    // Verify critical themes in GS-2 and GS-4
    const gs2Titles = gs2?.modules.map((m) => m.title);
    expect(gs2Titles?.some((t) => t.includes('Basic Structure'))).toBe(true);
    expect(gs2Titles?.some((t) => t.includes('Representation of People’s Act'))).toBe(true);

    const gs4Titles = gs4?.modules.map((m) => m.title);
    expect(gs4Titles?.some((t) => t.includes('Emotional Intelligence'))).toBe(true);
    expect(gs4Titles?.some((t) => t.includes('Probity in Governance'))).toBe(true);
  });

  it('validates the 3-stage examination blueprint and marks architecture', () => {
    expect(UPSC_SYLLABUS_OVERVIEW.stages.length).toBe(3);
    expect(UPSC_SYLLABUS_OVERVIEW.totalMeritMarks).toBe(2025);

    const prelims = UPSC_SYLLABUS_OVERVIEW.stages[0];
    expect(prelims.totalMarks).toBe(400);

    const mains = UPSC_SYLLABUS_OVERVIEW.stages[1];
    expect(mains.totalMarks).toBe(1750);

    const interview = UPSC_SYLLABUS_OVERVIEW.stages[2];
    expect(interview.totalMarks).toBe(275);
  });

  it('serves official UPSC hierarchy from /api/syllabus?exam=upsc', async () => {
    const req = new Request('http://localhost:3000/api/syllabus?exam=upsc');
    const res = await getSyllabusRoute(req);
    expect(res.status).toBe(200);

    const json = await res.json();
    expect(json.success).toBe(true);
    expect(json.data.exam.slug).toBe('upsc');
    expect(json.data.subjects.length).toBe(2);
    expect(json.data.mainsPapers.length).toBe(4);
    expect(json.data.optionals.length).toBeGreaterThanOrEqual(10);
  });

  it('validates UPSC CSE Prelims & Mains Exam Pattern Matrix with exact statutory notes', () => {
    const prelims = UPSC_EXAM_PATTERN.prelims;
    expect(prelims.totalMarks).toBe(400);
    expect(prelims.papers.length).toBe(2);

    // Paper I
    const gs1 = prelims.papers[0];
    expect(gs1.questionCount).toBe(100);
    expect(gs1.totalMarks).toBe(200);
    expect(gs1.marksPerQuestion).toBe(2.0);
    expect(gs1.negativeDeduction).toBe(0.66);
    expect(gs1.isQualifying).toBe(false);

    // Paper II (CSAT)
    const csat = prelims.papers[1];
    expect(csat.questionCount).toBe(80);
    expect(csat.totalMarks).toBe(200);
    expect(csat.marksPerQuestion).toBe(2.5);
    expect(csat.negativeDeduction).toBe(0.83);
    expect(csat.isQualifying).toBe(true);
    expect(csat.qualifyingPercentage).toBe(33);
    expect(csat.qualifyingMarks).toBe(66);

    // Statutory Notes
    expect(prelims.notes.length).toBe(3);
    expect(prelims.notes[0]).toContain('minimum qualifying marks fixed at 33%');
    expect(prelims.notes[1]).toContain('multiple choice, objective type');
    expect(prelims.notes[2]).toContain('mandatory for the candidate to appear in both the Papers');

    // Mains
    const mains = UPSC_EXAM_PATTERN.mains;
    expect(mains.qualifyingPapers.length).toBe(2);
    expect(mains.qualifyingPapers[0].marks).toBe(300);
    expect(mains.qualifyingPapers[1].marks).toBe(300);

    expect(mains.meritPapers.length).toBe(7);
    const sumMeritMarks = mains.meritPapers.reduce((sum, p) => sum + p.marks, 0);
    expect(sumMeritMarks).toBe(1750);
    expect(mains.subtotalWritten).toBe(1750);
    expect(mains.interviewMarks).toBe(275);
    expect(mains.grandTotal).toBe(2025);
  });
});
