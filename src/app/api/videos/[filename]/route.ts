import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { Readable } from 'stream';

const MIME_MAP: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.webm': 'video/webm',
  '.mov': 'video/quicktime',
  '.m4v': 'video/mp4',
  '.ogg': 'video/ogg',
  '.ogv': 'video/ogg',
};

function getSafeFilePath(filename: string): string | null {
  const sanitized = path.basename(filename);
  if (!sanitized || sanitized.includes('..')) return null;
  const filePath = path.join(process.cwd(), 'public', 'uploads', 'videos', sanitized);
  return filePath;
}

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const filePath = getSafeFilePath(filename);

    const safeName = path.basename(filename);
    if (!filePath || !fs.existsSync(filePath)) {
      // Gracefully redirect to static CDN route if serverless filesystem doesn't have the file
      return NextResponse.redirect(new URL(`/uploads/videos/${safeName}`, req.url), 307);
    }

    const stat = fs.statSync(filePath);
    const totalSize = stat.size;
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'video/mp4';

    const range = req.headers.get('range');

    if (range) {
      // Range header format: bytes=start-end (e.g. bytes=0- or bytes=100-500)
      const parts = range.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : totalSize - 1;

      if (start >= totalSize || end >= totalSize || start > end) {
        return new Response(null, {
          status: 416, // Range Not Satisfiable
          headers: {
            'Content-Range': `bytes */${totalSize}`,
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      const chunkSize = end - start + 1;
      const fileStream = fs.createReadStream(filePath, { start, end });
      const webStream = Readable.toWeb(fileStream);

      return new Response(webStream as any, {
        status: 206, // Partial Content
        headers: {
          'Content-Range': `bytes ${start}-${end}/${totalSize}`,
          'Accept-Ranges': 'bytes',
          'Content-Length': String(chunkSize),
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=31536000, immutable',
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // Full video delivery (no range requested)
    const fileStream = fs.createReadStream(filePath);
    const webStream = Readable.toWeb(fileStream);

    return new Response(webStream as any, {
      status: 200,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Length': String(totalSize),
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch (error: any) {
    console.error('Error streaming video:', error);
    return NextResponse.json(
      { success: false, error: 'Internal video streaming error' },
      { status: 500 }
    );
  }
}

export async function HEAD(
  req: NextRequest,
  context: { params: Promise<{ filename: string }> }
) {
  try {
    const { filename } = await context.params;
    const filePath = getSafeFilePath(filename);

    if (!filePath || !fs.existsSync(filePath)) {
      return new Response(null, { status: 404 });
    }

    const stat = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_MAP[ext] || 'video/mp4';

    return new Response(null, {
      status: 200,
      headers: {
        'Accept-Ranges': 'bytes',
        'Content-Length': String(stat.size),
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=31536000, immutable',
        'Access-Control-Allow-Origin': '*',
      },
    });
  } catch {
    return new Response(null, { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, HEAD, OPTIONS',
      'Access-Control-Allow-Headers': 'Range, Content-Type',
    },
  });
}
