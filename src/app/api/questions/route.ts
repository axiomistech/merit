import { NextResponse } from 'next/server';
import { getStoredQuestions, saveStoredQuestions, AdminQuestionRecord } from '@/lib/admin/store';
import { SAMPLE_NEET_QUESTIONS } from '@/data/seedData';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const exam = searchParams.get('exam');
    const subject = searchParams.get('subject');
    const chapter = searchParams.get('chapter');
    const difficulty = searchParams.get('difficulty');
    const status = searchParams.get('status');
    const query = searchParams.get('q');
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.max(1, Math.min(100, Number(searchParams.get('limit') || 20)));

    let questions = getStoredQuestions();
    if (!questions || questions.length === 0) {
      questions = SAMPLE_NEET_QUESTIONS.map((q) => ({
        id: q.id,
        versionId: q.versionId,
        examSlug: 'neet',
        subjectSlug: q.subjectSlug,
        subjectName: q.subjectName,
        chapterSlug: q.subjectSlug === 'physics' ? 'laws-of-motion' : 'chemical-bonding',
        conceptSlug: q.conceptSlug || '',
        conceptName: q.conceptName || '',
        questionType: q.questionType as any,
        difficulty: q.difficulty,
        marks: q.marks,
        negativeMarks: q.negativeMarks,
        status: 'published' as const,
        text: q.text,
        options: q.options,
        answerKey: q.answerKey || { correctOptions: ['B'] },
        explanation: q.explanation,
        created_at: '2026-01-01T00:00:00Z',
        updated_at: '2026-01-01T00:00:00Z',
      }));
    }

    if (exam && exam !== 'all') {
      questions = questions.filter((q) => q.examSlug === exam);
    }
    if (subject && subject !== 'all') {
      questions = questions.filter((q) => q.subjectSlug === subject);
    }
    if (chapter && chapter !== 'all') {
      questions = questions.filter((q) => q.chapterSlug === chapter);
    }
    if (difficulty && difficulty !== 'all') {
      questions = questions.filter((q) => q.difficulty === difficulty);
    }
    if (status && status !== 'all') {
      questions = questions.filter((q) => q.status === status);
    }
    if (query) {
      const qLower = query.toLowerCase();
      questions = questions.filter(
        (q) =>
          q.text.toLowerCase().includes(qLower) ||
          q.conceptName.toLowerCase().includes(qLower) ||
          q.subjectName.toLowerCase().includes(qLower)
      );
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
    const body = await req.json();

    if (!body.text || !body.subjectSlug) {
      return NextResponse.json(
        { success: false, error: 'Question text and subject are required.' },
        { status: 400 }
      );
    }

    const questions = getStoredQuestions();
    const newQuestion: AdminQuestionRecord = {
      id: `q_${Date.now()}`,
      versionId: `qv_${Date.now()}_v1`,
      examSlug: body.examSlug || 'neet',
      subjectSlug: body.subjectSlug,
      subjectName: body.subjectName || body.subjectSlug.toUpperCase(),
      chapterSlug: body.chapterSlug || 'laws-of-motion',
      conceptSlug: body.conceptSlug || 'laws-of-motion',
      conceptName: body.conceptName || 'Fundamental Principles',
      questionType: body.questionType || 'single_correct',
      difficulty: body.difficulty || 'medium',
      marks: Number(body.marks) || 4,
      negativeMarks: Number(body.negativeMarks) || -1,
      status: body.status || 'published',
      text: body.text,
      options: body.options || [
        { key: 'A', text: 'Option A' },
        { key: 'B', text: 'Option B' },
        { key: 'C', text: 'Option C' },
        { key: 'D', text: 'Option D' },
      ],
      answerKey: body.answerKey || { correctOptions: ['A'] },
      explanation: body.explanation || { text: 'Detailed solution will be added shortly.' },
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    };

    const updated = [newQuestion, ...questions];
    saveStoredQuestions(updated);

    return NextResponse.json({
      success: true,
      data: newQuestion,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to create question' },
      { status: 500 }
    );
  }
}
