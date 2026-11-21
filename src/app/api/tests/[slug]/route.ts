import { NextResponse } from 'next/server';
import { getStoredTests } from '@/lib/admin/store';
import { SAMPLE_NEET_PAPER, getFullNeet180Questions } from '@/data/seedData';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const tests = getStoredTests();
    const test = tests.find((t) => t.slug === slug || t.id === slug);

    if (!test && slug !== SAMPLE_NEET_PAPER.slug) {
      return NextResponse.json(
        { success: false, error: `Test '${slug}' not found` },
        { status: 404 }
      );
    }

    const samplePaper = SAMPLE_NEET_PAPER as any;
    const testData = test || {
      id: 'paper_neet_mock_01',
      name: SAMPLE_NEET_PAPER.name,
      slug: SAMPLE_NEET_PAPER.slug,
      examSlug: 'neet',
      paperType: 'mock_exam',
      durationMinutes: SAMPLE_NEET_PAPER.durationMinutes,
      totalQuestions: SAMPLE_NEET_PAPER.totalQuestions,
      maxMarks: samplePaper.maxMarks || 720,
      price: samplePaper.price || 10,
      isFreeEligible: samplePaper.isFreeEligible ?? true,
      status: 'published',
    };

    return NextResponse.json({
      success: true,
      data: {
        ...testData,
        instructions:
          '1. The test contains 180 questions divided into Physics, Chemistry, Botany, and Zoology.\n2. Marking Scheme: +4 marks for correct response, -1 mark for incorrect response, 0 for unattempted.\n3. Automatic personalized NEET A4 OMR sheet is generated upon submission.',
        sections: [
          { name: 'Physics', questionsCount: 45, maxMarks: 180 },
          { name: 'Chemistry', questionsCount: 45, maxMarks: 180 },
          { name: 'Botany', questionsCount: 45, maxMarks: 180 },
          { name: 'Zoology', questionsCount: 45, maxMarks: 180 },
        ],
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch test details' },
      { status: 500 }
    );
  }
}
