import { NextResponse } from 'next/server';
import { getStoredQuestions, saveStoredQuestions } from '@/lib/admin/store';
import { verifyServerAdminAccess } from '@/lib/admin/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const questions = getStoredQuestions();
    const question = questions.find((q) => q.id === id || q.versionId === id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: `Question '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: question,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to fetch question' },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'questions.edit');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative action.' },
        { status: 401 }
      );
    }

    const { id } = await params;
    const body = await req.json();
    const questions = getStoredQuestions();
    const index = questions.findIndex((q) => q.id === id || q.versionId === id);

    if (index === -1) {
      return NextResponse.json(
        { success: false, error: `Question '${id}' not found` },
        { status: 404 }
      );
    }

    const updatedQ = {
      ...questions[index],
      ...body,
      updated_at: new Date().toISOString(),
    };

    questions[index] = updatedQ;
    saveStoredQuestions(questions);

    return NextResponse.json({
      success: true,
      data: updatedQ,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update question' },
      { status: 500 }
    );
  }
}
