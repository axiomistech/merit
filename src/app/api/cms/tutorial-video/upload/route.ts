import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { verifyServerAdminAccess } from '@/lib/admin/auth';
import {
  getStoredTutorialVideoServer,
  saveStoredTutorialVideoServer,
} from '@/lib/server/backendStore';
import { TutorialVideoConfig } from '@/types/admin';

// Maximum video upload size: 100 MB
const MAX_FILE_SIZE_BYTES = 100 * 1024 * 1024;

const ALLOWED_MIME_TYPES = new Set([
  'video/mp4',
  'video/webm',
  'video/quicktime',
  'video/x-m4v',
]);

const ALLOWED_EXTENSIONS = new Set(['.mp4', '.webm', '.mov', '.m4v']);

export async function POST(req: NextRequest) {
  try {
    // 1. Authenticate administrative access
    const authCheck = verifyServerAdminAccess(req, 'cms.manage');
    if (!authCheck.authorized) {
      return NextResponse.json(
        { success: false, error: authCheck.reason || 'Unauthorized administrative access.' },
        { status: 403 }
      );
    }

    // 2. Parse Multipart Form Data
    const formData = await req.formData();
    const file = formData.get('video') as File | null;
    const title = (formData.get('title') as string) || '';
    const subtitle = (formData.get('subtitle') as string) || '';
    const description = (formData.get('description') as string) || '';
    const enabledRaw = formData.get('enabled');
    const enabled = enabledRaw !== null ? enabledRaw === 'true' : true;

    if (!file || typeof file === 'string') {
      return NextResponse.json(
        { success: false, error: 'No video file provided in the upload request.' },
        { status: 400 }
      );
    }

    // 3. Validate File Size
    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        {
          success: false,
          error: `File size exceeds the 100MB limit. Current file size: ${(file.size / (1024 * 1024)).toFixed(1)}MB`,
        },
        { status: 400 }
      );
    }

    // 4. Validate MIME Type and Extension
    const fileExt = path.extname(file.name).toLowerCase();
    const mimeType = file.type || (fileExt === '.webm' ? 'video/webm' : 'video/mp4');

    if (!ALLOWED_EXTENSIONS.has(fileExt) && !ALLOWED_MIME_TYPES.has(mimeType)) {
      return NextResponse.json(
        {
          success: false,
          error: `Unsupported video format (${mimeType || fileExt}). Please upload an MP4 or WebM video.`,
        },
        { status: 400 }
      );
    }

    // 5. Generate Safe, Unique Storage Object Key
    const randomSuffix = crypto.randomBytes(6).toString('hex');
    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9_-]/g, '_')
      .slice(0, 30)
      .toLowerCase();
    const storedFileName = `tutorial_${Date.now()}_${cleanBaseName}_${randomSuffix}${fileExt || '.mp4'}`;
    const storageKey = `tutorial-videos/${storedFileName}`;

    // Target upload directory
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const targetFilePath = path.join(uploadDir, storedFileName);

    // 6. Write New Video to Storage
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(targetFilePath, buffer);

    // 7. Retrieve Previous Video Record Before Committing New One
    const previousConfig = getStoredTutorialVideoServer();
    const previousFileName = previousConfig?.fileName;

    // 8. Commit New Video Metadata to Database
    const newConfig: TutorialVideoConfig = {
      id: `vid_${Date.now()}`,
      enabled,
      videoUrl: `/api/videos/${storedFileName}`,
      storageKey,
      fileName: storedFileName,
      title: title.trim() || file.name.replace(/\.[^/.]+$/, '') || 'MERITWISE Platform Walkthrough & Tutorial',
      subtitle: subtitle.trim() || 'See how Meritwise works in action.',
      description: description.trim() || '',
      mimeType,
      sizeBytes: buffer.length,
      updated_at: new Date().toISOString(),
    };

    const saved = saveStoredTutorialVideoServer(newConfig);
    if (!saved) {
      // Rollback newly written file if database save fails
      try {
        if (fs.existsSync(targetFilePath)) fs.unlinkSync(targetFilePath);
      } catch {}
      return NextResponse.json(
        { success: false, error: 'Failed to record video metadata in database.' },
        { status: 500 }
      );
    }

    // 9. Safely Clean Up Old Active File (Only after new upload and save succeed)
    if (
      previousFileName &&
      previousFileName !== storedFileName &&
      previousFileName !== 'meritwise-platform-walkthrough.mp4'
    ) {
      try {
        const oldFilePath = path.join(uploadDir, previousFileName);
        if (fs.existsSync(oldFilePath)) {
          fs.unlinkSync(oldFilePath);
        }
      } catch (cleanErr) {
        console.warn('Could not remove previous video file from storage:', cleanErr);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Video uploaded and activated successfully.',
      config: newConfig,
    });
  } catch (error: any) {
    console.error('Error handling video upload:', error);
    return NextResponse.json(
      { success: false, error: error.message || 'Internal server error during video upload.' },
      { status: 500 }
    );
  }
}
