import { NextResponse } from 'next/server';
import { EXAMINATIONS } from '@/data/seedData';
import { getStoredExams } from '@/lib/admin/store';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');

    // Get active exams from admin store or seed data
    let exams = getStoredExams();
    if (!exams || exams.length === 0) {
      exams = EXAMINATIONS.map((e) => ({
        id: `exam_${e.slug}`,
        slug: e.slug,
        name: e.name,
        shortName: e.shortName,
        category: e.category,
        description: e.description,
        tagline: e.tagline,
        subjectsCount: e.subjects.length,
        questionsCount: 0,
        publishedTestsCount: 0,
        status: 'published' as const,
        defaultDurationMinutes: e.slug === 'neet' ? 200 : 180,
        defaultMarks: e.slug === 'neet' ? 720 : 300,
        negativeMarkingScheme: e.slug === 'neet' ? '+4 / -1' : '+4 / -1 / 0',
        created_at: '2026-01-01T00:00:00Z',
      }));
    }

    if (category && category !== 'all') {
      exams = exams.filter((e) => e.category === category);
    }

    return NextResponse.json({
      success: true,
      total: exams.length,
      data: exams,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch examinations' },
      { status: 500 }
    );
  }
}
