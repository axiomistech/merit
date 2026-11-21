import { NextResponse } from 'next/server';
import { getStoredTests, saveStoredTests, AdminTestRecord } from '@/lib/admin/store';
import { SAMPLE_NEET_PAPER } from '@/data/seedData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get('exam');
    const paperType = searchParams.get('type');

    let tests = getStoredTests();
    if (!tests || tests.length === 0) {
      tests = [
        {
          id: 'paper_neet_mock_01',
          name: SAMPLE_NEET_PAPER.name,
          slug: SAMPLE_NEET_PAPER.slug,
          examSlug: 'neet',
          paperType: 'mock_exam',
          durationMinutes: SAMPLE_NEET_PAPER.durationMinutes,
          totalQuestions: SAMPLE_NEET_PAPER.totalQuestions,
          maxMarks: (SAMPLE_NEET_PAPER as any).maxMarks || 720,
          price: (SAMPLE_NEET_PAPER as any).price || 10,
          isFreeEligible: (SAMPLE_NEET_PAPER as any).isFreeEligible ?? true,
          status: 'published',
          questionIds: Array.from({ length: 180 }, (_, i) => `q_neet_${i + 1}`),
          created_at: '2026-01-01T00:00:00Z',
        },
        {
          id: 'paper_neet_pyq_2025',
          name: 'NEET 2025 Official Previous Year Paper (Shift 1)',
          slug: 'neet-2025-pyq-official',
          examSlug: 'neet',
          paperType: 'previous_year',
          durationMinutes: 200,
          totalQuestions: 180,
          maxMarks: 720,
          price: 10,
          isFreeEligible: false,
          status: 'published',
          questionIds: Array.from({ length: 180 }, (_, i) => `q_neet_pyq_${i + 1}`),
          created_at: '2026-01-01T00:00:00Z',
        },
        {
          id: 'paper_jee_mock_01',
          name: 'JEE Main 2026 Full Simulation Mock 1',
          slug: 'jee-main-2026-simulation-01',
          examSlug: 'jee-main',
          paperType: 'mock_exam',
          durationMinutes: 180,
          totalQuestions: 90,
          maxMarks: 300,
          price: 10,
          isFreeEligible: true,
          status: 'published',
          questionIds: Array.from({ length: 90 }, (_, i) => `q_jee_${i + 1}`),
          created_at: '2026-01-01T00:00:00Z',
        },
      ];
    }

    if (exam && exam !== 'all') {
      tests = tests.filter((t) => t.examSlug === exam);
    }
    if (paperType && paperType !== 'all') {
      tests = tests.filter((t) => t.paperType === paperType);
    }

    return NextResponse.json({
      success: true,
      total: tests.length,
      data: tests,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch tests' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    if (!body.name || !body.examSlug) {
      return NextResponse.json(
        { success: false, error: 'Test name and exam slug are required' },
        { status: 400 }
      );
    }

    const tests = getStoredTests();
    const newTest: AdminTestRecord = {
      id: `test_${Date.now()}`,
      name: body.name,
      slug: body.slug || body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      examSlug: body.examSlug,
      paperType: body.paperType || 'mock_exam',
      durationMinutes: Number(body.durationMinutes) || 180,
      totalQuestions: Number(body.totalQuestions) || 180,
      maxMarks: Number(body.maxMarks) || 720,
      price: Number(body.price) || 10,
      isFreeEligible: body.isFreeEligible !== undefined ? body.isFreeEligible : true,
      status: body.status || 'published',
      questionIds: body.questionIds || [],
      created_at: new Date().toISOString(),
    };

    const updated = [newTest, ...tests];
    saveStoredTests(updated);

    return NextResponse.json({
      success: true,
      data: newTest,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create test' },
      { status: 500 }
    );
  }
}
