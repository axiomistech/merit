import { NextResponse } from 'next/server';
import {
  getStoredPapersServer,
  saveStoredPaperServer,
  getStoredQuestionsServer,
  StoredPaper,
  validatePaperForSave,
} from '@/lib/server/backendStore';
import { verifyServerAdminAccess } from '@/lib/admin/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get('exam') || undefined;
    const paperType = searchParams.get('type') || undefined;
    const status = searchParams.get('status') || undefined;

    const authCheck = verifyServerAdminAccess(req, 'exams.view');
    const isAdmin = authCheck.authorized;

    // Students strictly receive only published papers from the database
    const effectiveStatus = isAdmin ? status : 'published';

    const papers = getStoredPapersServer({
      examSlug: exam,
      paperType,
      status: effectiveStatus,
    });

    return NextResponse.json({
      success: true,
      total: papers.length,
      data: papers,
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
    const authCheck = verifyServerAdminAccess(req, 'tests.create');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative action.' },
        { status: 401 }
      );
    }

    const body = await req.json();

    if (!body.name || !body.examSlug) {
      return NextResponse.json(
        { success: false, error: 'Question paper title and target examination are required.' },
        { status: 400 }
      );
    }

    const questionIds = Array.isArray(body.questionIds) ? body.questionIds : [];

    // Compute actual total marks from assigned questions
    const allQuestions = getStoredQuestionsServer();
    const assignedQuestions = questionIds
      .map((qid: string) => allQuestions.find((q) => q.id === qid))
      .filter((q: any): q is NonNullable<typeof q> => !!q);

    const computedTotalMarks = assignedQuestions.reduce((acc: number, q: any) => acc + (q.marks || 4), 0);

    const newPaper: StoredPaper = {
      id: body.id || `paper_${Date.now()}_${Math.random().toString(36).slice(2, 6)}`,
      name: body.name.trim(),
      slug:
        body.slug ||
        body.name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/^-|-$/g, ''),
      examSlug: body.examSlug,
      paperType: body.paperType || 'mock_exam',
      year: body.year ? Number(body.year) : new Date().getFullYear(),
      subject: body.subject || 'All Subjects',
      durationMinutes: Number(body.durationMinutes) || 180,
      totalQuestions: questionIds.length,
      maxMarks: computedTotalMarks > 0 ? computedTotalMarks : Number(body.maxMarks) || 720,
      markingScheme: body.markingScheme || '+4 for correct, -1 for incorrect, 0 for unattempted',
      hasOMR: body.hasOMR !== undefined ? body.hasOMR : true,
      price: Number(body.price) || 10,
      isFreeEligible: body.isFreeEligible !== undefined ? body.isFreeEligible : true,
      status: body.status || 'draft',
      instructions: Array.isArray(body.instructions) && body.instructions.length > 0
        ? body.instructions
        : [
            '1. Server-authoritative timer runs for the configured duration.',
            '2. Marking Scheme: Standard negative marking is applied automatically.',
            '3. Instant personalized vector A4 OMR answer sheet is generated upon submission.',
          ],
      sections: Array.isArray(body.sections) ? body.sections : [],
      questionIds,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      published_at: body.status === 'published' ? new Date().toISOString() : undefined,
      created_by: 'admin',
    };

    const saveResult = saveStoredPaperServer(newPaper);
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
      message: 'Question paper created and saved successfully.',
      data: newPaper,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create question paper' },
      { status: 500 }
    );
  }
}
