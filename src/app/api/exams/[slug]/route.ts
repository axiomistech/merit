import { NextResponse } from 'next/server';
import { EXAMINATIONS } from '@/data/seedData';
import { getStoredExams } from '@/lib/admin/store';
import { getStoredPapersServer } from '@/lib/server/backendStore';

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
    const publishedPapers = getStoredPapersServer({ examSlug: slug, status: 'published' });

    return NextResponse.json({
      success: true,
      data: {
        ...exam,
        subjects: seedExam ? seedExam.subjects : [],
        publishedPapers,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch examination' },
      { status: 500 }
    );
  }
}
