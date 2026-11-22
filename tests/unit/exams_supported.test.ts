import { describe, it, expect, beforeEach } from 'vitest';
import { getInitialExams, getStoredExams } from '@/lib/admin/store';
import { EXAMINATIONS } from '@/data/seedData';

describe('Supported Examinations - Strictly NEET, JEE Main, JEE Advanced, and GATE', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('EXAMINATIONS seed array contains strictly the 4 allowed examinations', () => {
    const slugs = EXAMINATIONS.map((e) => e.slug);
    expect(slugs).toEqual(['neet', 'jee-main', 'jee-advanced', 'gate']);
  });

  it('getInitialExams returns strictly 4 exams with canonical names without FORT or MERITWISE prefixes', () => {
    const exams = getInitialExams();
    expect(exams.length).toBe(4);
    const slugs = exams.map((e) => e.slug);
    expect(slugs).toEqual(['neet', 'jee-main', 'jee-advanced', 'gate']);

    for (const exam of exams) {
      expect(exam.name).not.toMatch(/^FORT\s+/i);
      expect(exam.name).not.toMatch(/^MERITWISE\s+/i);
      expect(exam.shortName).not.toMatch(/^FORT\s+/i);
    }

    const neet = exams.find((e) => e.slug === 'neet');
    expect(neet?.name).toBe('NEET (UG)');
    expect(neet?.defaultDurationMinutes).toBe(200);
    expect(neet?.defaultMarks).toBe(720);

    const gate = exams.find((e) => e.slug === 'gate');
    expect(gate?.name).toBe('GATE');
    expect(gate?.defaultDurationMinutes).toBe(180);
    expect(gate?.defaultMarks).toBe(100);
  });

  it('getStoredExams purges legacy exams (upsc, engineering, jee) from localStorage and strips FORT prefixes', () => {
    // Simulate old localStorage with legacy exams and FORT prefixes
    const legacyExams = [
      {
        id: 'exam_neet',
        slug: 'neet',
        name: 'FORT NEET (UG)',
        shortName: 'FORT NEET',
        category: 'medical',
        subjectsCount: 4,
        defaultDurationMinutes: 200,
        defaultMarks: 720,
        status: 'published',
      },
      {
        id: 'exam_jee-main',
        slug: 'jee-main',
        name: 'FORT JEE Main',
        shortName: 'FORT JEE Main',
        category: 'engineering',
        subjectsCount: 3,
        defaultDurationMinutes: 180,
        defaultMarks: 300,
        status: 'published',
      },
      {
        id: 'exam_jee-advanced',
        slug: 'jee-advanced',
        name: 'FORT JEE Advanced',
        shortName: 'FORT JEE Advanced',
        category: 'engineering',
        subjectsCount: 3,
        defaultDurationMinutes: 180,
        defaultMarks: 300,
        status: 'published',
      },
      {
        id: 'exam_upsc',
        slug: 'upsc',
        name: 'FORT UPSC Civil Services',
        shortName: 'FORT UPSC',
        category: 'civil_services',
        subjectsCount: 3,
        defaultDurationMinutes: 180,
        defaultMarks: 300,
        status: 'published',
      },
      {
        id: 'exam_engineering',
        slug: 'engineering',
        name: 'FORT Engineering Universities',
        shortName: 'FORT Engineering',
        category: 'university',
        subjectsCount: 4,
        defaultDurationMinutes: 180,
        defaultMarks: 300,
        status: 'published',
      },
    ];

    localStorage.setItem('fort_admin_exams', JSON.stringify(legacyExams));

    const sanitized = getStoredExams();
    const slugs = sanitized.map((e) => e.slug);
    expect(slugs).toEqual(['neet', 'jee-main', 'jee-advanced', 'gate']);

    // Ensure UPSC and Engineering Universities are purged
    expect(sanitized.find((e) => e.slug === 'upsc')).toBeUndefined();
    expect(sanitized.find((e) => e.slug === 'engineering')).toBeUndefined();

    // Ensure GATE was added
    expect(sanitized.find((e) => e.slug === 'gate')).toBeDefined();

    // Ensure FORT prefix is stripped
    const neet = sanitized.find((e) => e.slug === 'neet');
    expect(neet?.name).toBe('NEET (UG)');
    expect(neet?.shortName).toBe('NEET');

    const jm = sanitized.find((e) => e.slug === 'jee-main');
    expect(jm?.name).toBe('JEE Main');

    const ja = sanitized.find((e) => e.slug === 'jee-advanced');
    expect(ja?.name).toBe('JEE Advanced');

    // Ensure synchronized back to localStorage
    const storedInLs = JSON.parse(localStorage.getItem('fort_admin_exams') || '[]');
    expect(storedInLs.map((e: any) => e.slug)).toEqual(['neet', 'jee-main', 'jee-advanced', 'gate']);
  });
});
