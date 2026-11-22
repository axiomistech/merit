import { NextResponse } from 'next/server';
import {
  getStoredQuestionsServer,
  saveStoredQuestionServer,
  StoredQuestion,
  validateQuestionForSave,
} from '@/lib/server/backendStore';
import { verifyServerAdminAccess } from '@/lib/admin/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get('exam') || undefined;
    const subject = searchParams.get('subject') || undefined;
    const chapter = searchParams.get('chapter') || undefined;
    const difficulty = searchParams.get('difficulty') || undefined;
    const status = searchParams.get('status') || undefined;
    const query = searchParams.get('q') || undefined;
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.max(1, Math.min(200, Number(searchParams.get('limit') || 50)));

    const authCheck = verifyServerAdminAccess(req, 'questions.view');
    const isAdmin = authCheck.authorized;

    let questions = getStoredQuestionsServer({
      examSlug: exam,
      subjectSlug: subject,
      chapterSlug: chapter,
      difficulty,
      status: isAdmin ? status : 'published', // Non-admins can strictly only view published questions
      search: query,
    });

    // If not admin, sanitize: confidential answerKey and explanation must never be exposed
    if (!isAdmin) {
      questions = questions.map((q) => ({
        ...q,
        answerKey: { correctOptions: [] },
        explanation: undefined,
      }));
    }

    const total = questions.length;
    const startIndex = (page - 1) * limit;
    const paginated = questions.slice(startIndex, startIndex + limit);

    return NextResponse.json({
      success: true,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      data: paginated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'questions.create');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative action.' },
        { status: 401 }
      );
    }

    const body = await req.json();

    // Support batch import or single creation
    if (Array.isArray(body.questions)) {
      const results: StoredQuestion[] = [];
      const validationErrors: { index: number; errors: string[] }[] = [];

      for (let i = 0; i < body.questions.length; i++) {
        const item = body.questions[i];
        const newQuestion: StoredQuestion = {
          id: item.id || `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
          versionId: item.versionId || `qv_${Date.now()}_v1`,
          examSlug: item.examSlug,
          subjectSlug: item.subjectSlug,
          subjectName: item.subjectName || item.subjectSlug?.toUpperCase(),
          chapterSlug: item.chapterSlug || '',
          unitName: item.unitName || '',
          topic: item.topic || '',
          conceptSlug: item.conceptSlug || '',
          conceptName: item.conceptName || '',
          questionType: item.questionType || 'single_correct',
          difficulty: item.difficulty || 'medium',
          marks: Number(item.marks) || 4,
          negativeMarks: item.negativeMarks !== undefined ? Number(item.negativeMarks) : -1,
          status: item.status || 'draft',
          text: item.text,
          imageUrl: item.imageUrl,
          options: item.options || [],
          answerKey: item.answerKey || { correctOptions: [] },
          explanation: item.explanation,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          created_by: 'admin',
        };

        const val = validateQuestionForSave(newQuestion);
        if (!val.valid) {
          validationErrors.push({ index: i, errors: val.errors });
        } else {
          saveStoredQuestionServer(newQuestion);
          results.push(newQuestion);
        }
      }

      if (validationErrors.length > 0) {
        return NextResponse.json(
          {
            success: false,
            message: `Failed to import ${validationErrors.length} questions due to validation errors.`,
            validationErrors,
            importedCount: results.length,
            imported: results,
          },
          { status: 400 }
        );
      }

      return NextResponse.json({
        success: true,
        message: `Successfully created/imported ${results.length} questions.`,
        data: results,
      });
    }

    // Single Question Creation
    const newQuestion: StoredQuestion = {
      id: body.id || `q_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      versionId: body.versionId || `qv_${Date.now()}_v1`,
      examSlug: body.examSlug,
      subjectSlug: body.subjectSlug,
      subjectName: body.subjectName || body.subjectSlug?.toUpperCase(),
      chapterSlug: body.chapterSlug || '',
      unitName: body.unitName || '',
      topic: body.topic || '',
      conceptSlug: body.conceptSlug || '',
      conceptName: body.conceptName || '',
      questionType: body.questionType || 'single_correct',
      difficulty: body.difficulty || 'medium',
      marks: Number(body.marks) || 4,
      negativeMarks: body.negativeMarks !== undefined ? Number(body.negativeMarks) : -1,
      status: body.status || 'draft',
      text: body.text,
      imageUrl: body.imageUrl,
      options: body.options || [],
      answerKey: body.answerKey || { correctOptions: [] },
      explanation: body.explanation,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      created_by: 'admin',
    };

    const saveResult = saveStoredQuestionServer(newQuestion);
    if (!saveResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Question validation failed',
          details: saveResult.errors,
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Question saved successfully.',
      data: newQuestion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create question' },
      { status: 500 }
    );
  }
}
