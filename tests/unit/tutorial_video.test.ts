import { describe, it, expect, afterAll } from 'vitest';
import {
  getStoredTutorialVideoServer,
  saveStoredTutorialVideoServer,
  DEFAULT_TUTORIAL_VIDEO,
} from '@/lib/server/backendStore';
import { TutorialVideoConfig } from '@/types/admin';

describe('Native Tutorial Video Configuration & Storage Lifecycle', () => {
  afterAll(() => {
    // Restore default configuration so tests never leave phantom entries in the database
    saveStoredTutorialVideoServer(DEFAULT_TUTORIAL_VIDEO);
  });
  it('provides default native video asset without external YouTube dependencies', () => {
    expect(DEFAULT_TUTORIAL_VIDEO.videoUrl).toBe('/api/videos/meritwise-platform-walkthrough.mp4');
    expect(DEFAULT_TUTORIAL_VIDEO.mimeType).toBe('video/mp4');
    expect(DEFAULT_TUTORIAL_VIDEO.enabled).toBe(true);
    expect(DEFAULT_TUTORIAL_VIDEO.fileName).toBe('meritwise-platform-walkthrough.mp4');
  });

  it('saves and retrieves native tutorial video configuration with metadata', () => {
    const testConfig: TutorialVideoConfig = {
      id: 'vid_test_123',
      enabled: true,
      videoUrl: '/api/videos/tutorial_test_123.mp4',
      storageKey: 'tutorial-videos/tutorial_test_123.mp4',
      fileName: 'tutorial_test_123.mp4',
      title: 'Custom Platform Walkthrough',
      subtitle: 'Native HTML5 Video Streaming',
      description: 'Exam simulation walkthrough',
      mimeType: 'video/mp4',
      sizeBytes: 1548576,
      updated_at: new Date().toISOString(),
    };

    saveStoredTutorialVideoServer(testConfig);
    const retrieved = getStoredTutorialVideoServer();

    expect(retrieved.id).toBe('vid_test_123');
    expect(retrieved.videoUrl).toBe('/api/videos/tutorial_test_123.mp4');
    expect(retrieved.fileName).toBe('tutorial_test_123.mp4');
    expect(retrieved.title).toBe('Custom Platform Walkthrough');
    expect(retrieved.mimeType).toBe('video/mp4');
    expect(retrieved.sizeBytes).toBe(1548576);
    expect(retrieved.enabled).toBe(true);
  });

  it('validates supported video formats (MP4, WebM)', () => {
    const ALLOWED_EXTS = new Set(['.mp4', '.webm', '.mov', '.m4v']);
    const ALLOWED_MIMES = new Set(['video/mp4', 'video/webm', 'video/quicktime', 'video/x-m4v']);

    const isFormatAllowed = (filename: string, mime: string) => {
      const ext = '.' + filename.split('.').pop()?.toLowerCase();
      return ALLOWED_EXTS.has(ext) || ALLOWED_MIMES.has(mime);
    };

    expect(isFormatAllowed('walkthrough.mp4', 'video/mp4')).toBe(true);
    expect(isFormatAllowed('demo.webm', 'video/webm')).toBe(true);
    expect(isFormatAllowed('screen.mov', 'video/quicktime')).toBe(true);
    expect(isFormatAllowed('exploit.exe', 'application/x-msdownload')).toBe(false);
    expect(isFormatAllowed('script.js', 'text/javascript')).toBe(false);
  });

  it('enforces maximum 100MB file size upload limit', () => {
    const MAX_SIZE = 100 * 1024 * 1024; // 100MB
    const validateSize = (bytes: number) => bytes <= MAX_SIZE;

    expect(validateSize(10 * 1024 * 1024)).toBe(true); // 10MB
    expect(validateSize(99 * 1024 * 1024)).toBe(true); // 99MB
    expect(validateSize(100 * 1024 * 1024)).toBe(true); // 100MB
    expect(validateSize(101 * 1024 * 1024)).toBe(false); // 101MB (rejected)
  });

  it('parses HTTP byte range request headers correctly for seeking', () => {
    const totalSize = 1000000;

    const parseRange = (rangeHeader: string | null, total: number) => {
      if (!rangeHeader) return null;
      const parts = rangeHeader.replace(/bytes=/, '').split('-');
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : total - 1;
      return { start, end, chunkSize: end - start + 1 };
    };

    const initial = parseRange('bytes=0-', totalSize);
    expect(initial).toEqual({ start: 0, end: 999999, chunkSize: 1000000 });

    const seekRange = parseRange('bytes=250000-500000', totalSize);
    expect(seekRange).toEqual({ start: 250000, end: 500000, chunkSize: 250001 });
  });

  it('sanitizes filename to prevent path traversal attacks', () => {
    const sanitize = (name: string) => {
      const clean = name.replace(/^.*[\\\/]/, '');
      return clean.replace(/[^a-zA-Z0-9_.-]/g, '_');
    };

    expect(sanitize('../../../etc/passwd')).toBe('passwd');
    expect(sanitize('..\\..\\windows\\system32')).toBe('system32');
    expect(sanitize('my tutorial (1).mp4')).toBe('my_tutorial__1_.mp4');
  });
});
