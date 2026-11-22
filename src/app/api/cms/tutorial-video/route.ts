import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {
  getStoredTutorialVideoServer,
  saveStoredTutorialVideoServer,
  DEFAULT_TUTORIAL_VIDEO,
} from '@/lib/server/backendStore';
import { verifyServerAdminAccess } from '@/lib/admin/auth';
import { TutorialVideoConfig } from '@/types/admin';

export async function GET() {
  try {
    const config = getStoredTutorialVideoServer();
    return NextResponse.json({
      success: true,
      config: config || DEFAULT_TUTORIAL_VIDEO,
    });
  } catch (error) {
    console.error('Error fetching tutorial video config:', error);
    return NextResponse.json(
      { success: false, config: DEFAULT_TUTORIAL_VIDEO, error: 'Failed to load video configuration' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'cms.manage');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative access.' },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { title, enabled, subtitle, description, posterUrl } = body;

    const existing = getStoredTutorialVideoServer() || DEFAULT_TUTORIAL_VIDEO;

    const config: TutorialVideoConfig = {
      ...existing,
      enabled: enabled !== undefined ? Boolean(enabled) : existing.enabled,
      title: (title !== undefined ? title : existing.title).trim(),
      subtitle: (subtitle !== undefined ? subtitle : existing.subtitle || '').trim(),
      description: (description !== undefined ? description : existing.description || '').trim(),
      posterUrl: posterUrl !== undefined ? posterUrl : existing.posterUrl,
      updated_at: new Date().toISOString(),
    };

    saveStoredTutorialVideoServer(config);

    return NextResponse.json({
      success: true,
      message: 'Tutorial video configuration updated successfully.',
      config,
    });
  } catch (error: any) {
    console.error('Error saving tutorial video config:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authCheck = verifyServerAdminAccess(req, 'cms.manage');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative access.' },
        { status: 403 }
      );
    }

    const existing = getStoredTutorialVideoServer();
    if (existing?.fileName && existing.fileName !== 'meritwise-platform-walkthrough.mp4') {
      try {
        const filePath = path.join(process.cwd(), 'public', 'uploads', 'videos', existing.fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      } catch (err) {
        console.warn('Could not delete video file from disk:', err);
      }
    }

    // Set enabled to false and reset file metadata
    const disabledConfig: TutorialVideoConfig = {
      ...existing,
      enabled: false,
      videoUrl: '',
      fileName: undefined,
      storageKey: undefined,
      sizeBytes: 0,
      updated_at: new Date().toISOString(),
    };

    saveStoredTutorialVideoServer(disabledConfig);

    return NextResponse.json({
      success: true,
      message: 'Tutorial video removed successfully.',
      config: disabledConfig,
    });
  } catch (error: any) {
    console.error('Error removing tutorial video:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error during video deletion.' },
      { status: 500 }
    );
  }
}
