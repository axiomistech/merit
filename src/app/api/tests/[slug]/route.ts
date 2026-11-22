import { NextResponse } from 'next/server';
import {
  getStoredPaperBySlugServer,
  saveStoredPaperServer,
  deleteStoredPaperServer,
  getStoredQuestionByIdServer,
  StoredPaper,
} from '@/lib/server/backendStore';
import { verifyServerAdminAccess } from '@/lib/admin/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const { searchParams } = new URL(req.url);
    const includeQuestions = searchParams.get('includeQuestions') === 'true';

    const paper = getStoredPaperBySlugServer(slug);

    if (!paper) {
      return NextResponse.json(
        { success: false, error: `Question paper '${slug}' not found` },
        { status: 404 }
      );
    }

    const authCheck = verifyServerAdminAccess(req, 'exams.view');
    const isAdmin = authCheck.authorized;

    // Students cannot view unpublished papers
    if (!isAdmin && paper.status !== 'published') {
      return NextResponse.json(
        { success: false, error: 'Question paper not available or unpublished' },
        { status: 404 }
      );
    }

    let questions: any[] = [];
    if (includeQuestions && paper.questionIds && paper.questionIds.length > 0) {
      questions = paper.questionIds
        .map((qid, idx) => {
          const q = getStoredQuestionByIdServer(qid);
          if (!q) return null;

          // If not admin, sanitize: remove confidential answerKey and explanation
          if (!isAdmin) {
            return {
              id: q.id,
              versionId: q.versionId,
              displayNumber: idx + 1,
              questionType: q.questionType,
              examSlug: q.examSlug,
              subjectSlug: q.subjectSlug,
              subjectName: q.subjectName,
              chapterSlug: q.chapterSlug,
              conceptName: q.conceptName,
              difficulty: q.difficulty,
              marks: q.marks,
              negativeMarks: q.negativeMarks,
              text: q.text,
              imageUrl: q.imageUrl,
              options: q.options,
            };
          }

          return {
            ...q,
            displayNumber: idx + 1,
          };
        })
        .filter(Boolean);
    }

    return NextResponse.json({
      success: true,
      data: {
        ...paper,
        questions: includeQuestions ? questions : undefined,
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch test details' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'tests.edit');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative action.' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const body = await req.json();
    const existing = getStoredPaperBySlugServer(slug);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Question paper '${slug}' not found` },
        { status: 404 }
      );
    }

    const updated: StoredPaper = {
      ...existing,
      ...body,
      id: existing.id,
      slug: existing.slug,
      updated_at: new Date().toISOString(),
      published_at:
        body.status === 'published' && existing.status !== 'published'
          ? new Date().toISOString()
          : existing.published_at,
    };

    const saveResult = saveStoredPaperServer(updated);
    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question paper validation failed',
          details: saveResult.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Question paper updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update question paper' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'tests.edit');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative action.' },
        { status: 401 }
      );
    }

    const { slug } = await params;
    const deleted = deleteStoredPaperServer(slug);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Question paper '${slug}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Question paper '${slug}' deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete question paper' },
      { status: 500 }
    );
  }
}
