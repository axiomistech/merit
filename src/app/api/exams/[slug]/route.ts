import { NextResponse } from 'next/server';
import { EXAMINATIONS, SAMPLE_NEET_PAPER } from '@/data/seedData';
import { getStoredExams } from '@/lib/admin/store';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const allExams = getStoredExams();
    const exam = allExams.find((e) => e.slug === slug) || EXAMINATIONS.find((e) => e.slug === slug);

    if (!exam) {
      return NextResponse.json(
        { success: false, error: `Examination '${slug}' not found` },
        { status: 404 }
      );
    }

    const seedExam = EXAMINATIONS.find((e) => e.slug === slug);

    return NextResponse.json({
      success: true,
      data: {
        ...exam,
        subjects: seedExam ? seedExam.subjects : [],
        samplePaper: slug === 'neet' ? SAMPLE_NEET_PAPER : null,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch examination' },
      { status: 500 }
    );
  }
}
