import { NextResponse } from 'next/server';
import {
  getStoredQuestionByIdServer,
  saveStoredQuestionServer,
  deleteStoredQuestionServer,
  StoredQuestion,
} from '@/lib/server/backendStore';
import { verifyServerAdminAccess } from '@/lib/admin/auth';

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const question = getStoredQuestionByIdServer(id);

    if (!question) {
      return NextResponse.json(
        { success: false, error: `Question '${id}' not found` },
        { status: 404 }
      );
    }

    const authCheck = verifyServerAdminAccess(req, 'questions.view');
    const isAdmin = authCheck.authorized;

    // Students cannot view unpublished questions or confidential answer keys
    if (!isAdmin) {
      if (question.status !== 'published') {
        return NextResponse.json(
          { success: false, error: 'Question not found' },
          { status: 404 }
        );
      }

      return NextResponse.json({
        success: true,
        data: {
          ...question,
          answerKey: { correctOptions: [] },
          explanation: undefined,
        },
      });
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
    const existing = getStoredQuestionByIdServer(id);

    if (!existing) {
      return NextResponse.json(
        { success: false, error: `Question '${id}' not found` },
        { status: 404 }
      );
    }

    const updated: StoredQuestion = {
      ...existing,
      ...body,
      id: existing.id,
      versionId: `qv_${Date.now()}_v${parseInt(existing.versionId.split('_v')[1] || '1', 10) + 1}`,
      updated_at: new Date().toISOString(),
    };

    const saveResult = saveStoredQuestionServer(updated);
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
      message: 'Question updated successfully.',
      data: updated,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to update question' },
      { status: 500 }
    );
  }
}

export async function DELETE(
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
    const deleted = deleteStoredQuestionServer(id);

    if (!deleted) {
      return NextResponse.json(
        { success: false, error: `Question '${id}' not found` },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: `Question '${id}' deleted successfully.`,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message || 'Failed to delete question' },
      { status: 500 }
    );
  }
}
