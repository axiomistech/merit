'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Layers,
  Save,
  CheckCircle2,
  Globe,
  Layout,
  ExternalLink,
  Eye,
  Video,
  PlaySquare,
  Trash2,
  AlertCircle,
  Upload,
  FileVideo,
  RefreshCw,
  Check,
  HardDrive,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CMSHomepageData, TutorialVideoConfig } from '@/types/admin';
import { getStoredCMSHomepage, saveStoredCMSHomepage } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminHomepageCMSPage() {
  const [data, setData] = useState<CMSHomepageData | null>(null);
  const [videoConfig, setVideoConfig] = useState<TutorialVideoConfig | null>(null);
  const [videoTitleInput, setVideoTitleInput] = useState('');
  const [videoSubtitleInput, setVideoSubtitleInput] = useState('');
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [savingVideo, setSavingVideo] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const hpData = getStoredCMSHomepage();
    setData(hpData);

    // Fetch latest server tutorial video config
    fetch('/api/cms/tutorial-video')
      .then((res) => res.json())
      .then((res) => {
        if (res.success && res.config) {
          const cfg = res.config as TutorialVideoConfig;
          setVideoConfig(cfg);
          setVideoTitleInput(cfg.title || 'MERITWISE Platform Walkthrough & Tutorial');
          setVideoSubtitleInput(cfg.subtitle || 'See how Meritwise works in action.');
          setVideoEnabled(Boolean(cfg.enabled));
        } else if (hpData.tutorialVideo) {
          setVideoConfig(hpData.tutorialVideo);
          setVideoTitleInput(hpData.tutorialVideo.title || 'MERITWISE Platform Walkthrough & Tutorial');
          setVideoSubtitleInput(hpData.tutorialVideo.subtitle || 'See how Meritwise works in action.');
          setVideoEnabled(Boolean(hpData.tutorialVideo.enabled));
        }
      })
      .catch(() => {
        if (hpData.tutorialVideo) {
          setVideoConfig(hpData.tutorialVideo);
          setVideoTitleInput(hpData.tutorialVideo.title || 'MERITWISE Platform Walkthrough & Tutorial');
          setVideoSubtitleInput(hpData.tutorialVideo.subtitle || 'See how Meritwise works in action.');
          setVideoEnabled(Boolean(hpData.tutorialVideo.enabled));
        }
      });
  }, []);

  const handleFileUpload = (file: File) => {
    const validExts = ['.mp4', '.webm', '.mov', '.m4v'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();
    const validMimes = ['video/mp4', 'video/webm', 'video/quicktime'];

    if (!validExts.includes(ext) && !validMimes.includes(file.type)) {
      setUploadError('Invalid format. Please upload an MP4 or WebM video file.');
      toast.error('Unsupported video format. Please upload an MP4 or WebM file.');
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      setUploadError('File size exceeds the 100MB limit.');
      toast.error('File size exceeds 100MB limit.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setUploadError(null);
    setUploadSuccess(null);

    const formData = new FormData();
    formData.append('video', file);
    formData.append('title', videoTitleInput || file.name.replace(/\.[^/.]+$/, ''));
    formData.append('subtitle', videoSubtitleInput);
    formData.append('enabled', String(videoEnabled));

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/cms/tutorial-video/upload');

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const res = JSON.parse(xhr.responseText);
          if (res.success && res.config) {
            setVideoConfig(res.config);
            setVideoTitleInput(res.config.title);
            setVideoSubtitleInput(res.config.subtitle || '');
            setVideoEnabled(res.config.enabled);
            setUploadSuccess(`"${file.name}" uploaded and published to homepage successfully!`);
            toast.success('Video uploaded and published successfully!');

            if (data) {
              const updated = { ...data, tutorialVideo: res.config };
              setData(updated);
              saveStoredCMSHomepage(updated);
            }

            logAdminAction({
              action: 'HOMEPAGE_CMS_UPDATED',
              resource_type: 'cms',
              change_summary: `Uploaded and activated tutorial video: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`,
            });
          } else {
            setUploadError(res.error || 'Upload failed');
            toast.error(res.error || 'Upload failed');
          }
        } catch {
          setUploadError('Invalid response from server.');
          toast.error('Invalid response from server.');
        }
      } else {
        try {
          const res = JSON.parse(xhr.responseText);
          setUploadError(res.error || `Upload failed with HTTP ${xhr.status}`);
          toast.error(res.error || 'Upload failed');
        } catch {
          setUploadError(`Upload failed with HTTP ${xhr.status}`);
          toast.error('Upload failed');
        }
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setUploadError('Network error during video upload. Please check connection and retry.');
      toast.error('Network error during video upload.');
    };

    xhr.send(formData);
  };

  const handleSaveVideoMetadata = async () => {
    setSavingVideo(true);
    setUploadError(null);
    setUploadSuccess(null);

    try {
      const res = await fetch('/api/cms/tutorial-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          enabled: videoEnabled,
          title: videoTitleInput.trim() || 'MERITWISE Platform Walkthrough & Tutorial',
          subtitle: videoSubtitleInput.trim() || 'See how Meritwise works in action.',
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to save video settings');
      }

      setVideoConfig(json.config);

      if (data) {
        const updated = { ...data, tutorialVideo: json.config };
        setData(updated);
        saveStoredCMSHomepage(updated);
      }

      logAdminAction({
        action: 'HOMEPAGE_CMS_UPDATED',
        resource_type: 'cms',
        change_summary: `Updated tutorial video metadata: "${videoTitleInput}" (enabled: ${videoEnabled})`,
      });

      toast.success('Video settings saved successfully.');
      setUploadSuccess('Video settings saved successfully.');
    } catch (err: any) {
      setUploadError(err.message || 'Error saving video settings.');
      toast.error(err.message || 'Error saving video settings.');
    } finally {
      setSavingVideo(false);
    }
  };

  const handleRemoveVideo = async () => {
    if (!confirm('Are you sure you want to remove the current tutorial video from the homepage?')) return;
    try {
      const res = await fetch('/api/cms/tutorial-video', {
        method: 'DELETE',
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Failed to remove video');
      }

      setVideoConfig(json.config);
      setVideoEnabled(false);

      if (data) {
        const updated = { ...data, tutorialVideo: json.config };
        setData(updated);
        saveStoredCMSHomepage(updated);
      }

      logAdminAction({
        action: 'HOMEPAGE_CMS_UPDATED',
        resource_type: 'cms',
        change_summary: 'Removed tutorial video from homepage',
      });

      toast.info('Tutorial video removed from homepage.');
      setUploadSuccess('Tutorial video removed from homepage.');
    } catch (err: any) {
      toast.error(err.message || 'Failed to remove video.');
    }
  };

  if (!data) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...data,
      tutorialVideo: videoConfig || data.tutorialVideo,
    };
    setData(updated);
    saveStoredCMSHomepage(updated);

    // Also sync video to server
    if (videoConfig) {
      fetch('/api/cms/tutorial-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(videoConfig),
      }).catch(() => {});
    }

    logAdminAction({
      action: 'HOMEPAGE_CMS_UPDATED',
      resource_type: 'cms',
      change_summary: `Updated homepage CMS copy and video settings`,
    });
    toast.success('Homepage CMS content saved and published.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-sans">Homepage CMS Editor</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Edit landing page hero copy, call-to-actions, top alert strip, and featured statistics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-[#DCE2E6] bg-white text-[#20252B] hover:bg-[#F1F3F4] transition-colors"
          >
            <Eye className="h-3.5 w-3.5" />
            Live Site
          </a>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 rounded-xl bg-[#20252B] px-5 py-2 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
          >
            <Save className="h-4 w-4" />
            Save Changes
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Hero Section */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
            <Layout className="h-4 w-4 text-[#9CC6E0]" />
            Hero Section Copy
          </h2>

          <div>
            <label className="block font-semibold text-xs text-[#20252B] mb-1">Hero Kicker Tagline</label>
            <input
              type="text"
              value={data.heroTagline}
              onChange={(e) => setData({ ...data, heroTagline: e.target.value })}
              className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs uppercase font-mono tracking-wider text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
            />
          </div>

          <div>
            <label className="block font-semibold text-xs text-[#20252B] mb-1">Master Headline</label>
            <input
              type="text"
              value={data.heroHeadline}
              onChange={(e) => setData({ ...data, heroHeadline: e.target.value })}
              className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-sm font-sans font-bold text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
            />
          </div>

          <div>
            <label className="block font-semibold text-xs text-[#20252B] mb-1">Subtext / Value Proposition</label>
            <textarea
              rows={3}
              value={data.heroSubtext}
              onChange={(e) => setData({ ...data, heroSubtext: e.target.value })}
              className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Primary CTA Label</label>
              <input
                type="text"
                value={data.primaryCtaText}
                onChange={(e) => setData({ ...data, primaryCtaText: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Primary CTA Link</label>
              <input
                type="text"
                value={data.primaryCtaLink}
                onChange={(e) => setData({ ...data, primaryCtaLink: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Secondary CTA Label</label>
              <input
                type="text"
                value={data.secondaryCtaText}
                onChange={(e) => setData({ ...data, secondaryCtaText: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Secondary CTA Link</label>
              <input
                type="text"
                value={data.secondaryCtaLink}
                onChange={(e) => setData({ ...data, secondaryCtaLink: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>
        </div>

        {/* Meritwise Tutorial Video (Native Player & File Storage) */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#DCE2E6] pb-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#8C6D3B]">
                <FileVideo className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
                  Meritwise Tutorial Video
                  <span
                    className={cn(
                      'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider',
                      videoEnabled && videoConfig?.videoUrl
                        ? 'bg-[#EBF7EE] text-[#1B662F]'
                        : videoConfig?.videoUrl
                        ? 'bg-[#FEF6E7] text-[#8C6D3B]'
                        : 'bg-[#F1F3F4] text-[#66727D]'
                    )}
                  >
                    <span
                      className={cn(
                        'h-1.5 w-1.5 rounded-full',
                        videoEnabled && videoConfig?.videoUrl
                          ? 'bg-[#1B662F]'
                          : videoConfig?.videoUrl
                          ? 'bg-[#8C6D3B]'
                          : 'bg-[#66727D]'
                      )}
                    />
                    {videoEnabled && videoConfig?.videoUrl
                      ? 'Active'
                      : videoConfig?.videoUrl
                      ? 'Disabled'
                      : 'No Video'}
                  </span>
                </h2>
                <p className="text-xs text-[#66727D]">
                  Custom HTML5 video stored in the platform storage. Streamed directly to candidates on the 3D Meritwise Card.
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs font-semibold text-[#20252B] cursor-pointer">
              <input
                type="checkbox"
                checked={videoEnabled}
                onChange={(e) => setVideoEnabled(e.target.checked)}
                className="h-4 w-4 rounded border-[#DCE2E6] text-[#121316] focus:ring-[#8C6D3B]"
              />
              <span>Enable Tutorial Video</span>
            </label>
          </div>

          {/* Hidden File Input for Direct Upload */}
          <input
            ref={fileInputRef}
            type="file"
            accept="video/mp4,video/webm,video/quicktime"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileUpload(file);
              e.target.value = '';
            }}
            className="hidden"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Column: Upload Dropzone & Metadata */}
            <div className="space-y-4">
              {/* Upload Dropzone */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => {
                  e.preventDefault();
                  const file = e.dataTransfer.files?.[0];
                  if (file) handleFileUpload(file);
                }}
                className={`border-2 border-dashed rounded-2xl p-5 text-center cursor-pointer transition-all ${
                  isUploading
                    ? 'border-[#8C6D3B] bg-[#FDFBF7]'
                    : 'border-[#DCE2E6] hover:border-[#8C6D3B] hover:bg-[#FDFBF7]/60 bg-[#FAFAFA]'
                }`}
              >
                <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-white shadow-xs border border-[#E4E4DF] text-[#8C6D3B] mb-2.5">
                  {isUploading ? (
                    <RefreshCw className="h-5 w-5 animate-spin" />
                  ) : (
                    <Upload className="h-5 w-5" />
                  )}
                </div>
                <p className="text-xs font-bold text-[#121316]">
                  {isUploading ? 'Uploading Video to Storage...' : 'Click to select or drag & drop video file'}
                </p>
                <p className="text-[11px] text-[#71717A] mt-1">
                  Supported formats: MP4 (H.264/AAC preferred) or WebM (Max: 100MB)
                </p>

                {/* Real-time Upload Progress Bar */}
                {isUploading && (
                  <div className="mt-4 space-y-1.5 text-left">
                    <div className="flex justify-between text-[11px] font-semibold text-[#20252B]">
                      <span>Uploading to Storage...</span>
                      <span>{uploadProgress}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#E4E4DF] overflow-hidden">
                      <div
                        className="h-full bg-[#121316] transition-all duration-150"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Status & Feedback Alerts */}
              {uploadSuccess && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-[#EBF7EE] border border-[#1B662F]/20 text-[12px] font-semibold text-[#1B662F]">
                  <Check className="h-4 w-4 shrink-0" />
                  <span>{uploadSuccess}</span>
                </div>
              )}

              {uploadError && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 border border-red-200 text-[12px] font-semibold text-red-700">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              {/* Currently Active Video File Details */}
              {videoConfig?.videoUrl && (
                <div className="p-3.5 rounded-xl border border-[#DCE2E6] bg-[#FAFAFA] space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-[#121316]">
                    <span className="flex items-center gap-1.5">
                      <HardDrive className="h-3.5 w-3.5 text-[#8C6D3B]" />
                      <span>Active Storage Asset</span>
                    </span>
                    <span className="font-mono text-[10px] text-[#71717A] bg-white px-2 py-0.5 rounded border border-[#E4E4DF]">
                      {videoConfig.mimeType || 'video/mp4'}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px] text-[#52525B]">
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px]">FILE NAME</span>
                      <span className="font-mono truncate block font-medium text-[#20252B]">
                        {videoConfig.fileName || 'meritwise-platform-walkthrough.mp4'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[#A1A1AA] block text-[10px]">FILE SIZE</span>
                      <span className="font-medium text-[#20252B]">
                        {videoConfig.sizeBytes
                          ? `${(videoConfig.sizeBytes / (1024 * 1024)).toFixed(2)} MB`
                          : 'Standard Asset'}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-xs text-[#20252B] mb-1">
                  Video Display Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. MERITWISE — PLATFORM WALKTHROUGH"
                  value={videoTitleInput}
                  onChange={(e) => setVideoTitleInput(e.target.value)}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#8C6D3B]"
                />
              </div>

              <div>
                <label className="block font-semibold text-xs text-[#20252B] mb-1">
                  Subtitle / Tagline
                </label>
                <input
                  type="text"
                  placeholder="e.g. See how Meritwise works in action."
                  value={videoSubtitleInput}
                  onChange={(e) => setVideoSubtitleInput(e.target.value)}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#8C6D3B]"
                />
              </div>

              <div className="pt-2 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveVideoMetadata}
                  disabled={savingVideo || isUploading}
                  className="flex items-center gap-2 rounded-xl bg-[#121316] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#27272A] transition-colors disabled:opacity-50"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{savingVideo ? 'Saving...' : 'Save Video Settings'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isUploading}
                  className="flex items-center gap-1.5 rounded-xl border border-[#DCE2E6] bg-white px-4 py-2.5 text-xs font-semibold text-[#121316] hover:bg-[#FAFAFA] transition-colors disabled:opacity-50"
                >
                  <Upload className="h-3.5 w-3.5 text-[#8C6D3B]" />
                  <span>{videoConfig?.videoUrl ? 'Replace Video' : 'Upload Video'}</span>
                </button>

                {videoConfig?.videoUrl && (
                  <button
                    type="button"
                    onClick={handleRemoveVideo}
                    disabled={isUploading}
                    className="flex items-center gap-1.5 rounded-xl border border-red-200 bg-red-50/50 px-3.5 py-2.5 text-xs font-semibold text-red-600 hover:bg-red-100/50 transition-colors disabled:opacity-50"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span>Remove</span>
                  </button>
                )}
              </div>
            </div>

            {/* Right Column: Native Player Live Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block font-semibold text-xs text-[#20252B]">
                  Native Player Live Preview
                </label>
                {videoConfig?.videoUrl && (
                  <span className="text-[11px] font-mono text-[#1B662F] bg-[#EBF7EE] px-2 py-0.5 rounded font-bold">
                    HTML5 Stream
                  </span>
                )}
              </div>

              <div className="relative aspect-video w-full rounded-xl border border-[#DCE2E6] bg-[#121316] overflow-hidden flex items-center justify-center shadow-inner">
                {videoConfig?.videoUrl ? (
                  <video
                    key={videoConfig.videoUrl}
                    src={videoConfig.videoUrl}
                    controls
                    preload="metadata"
                    playsInline
                    className="h-full w-full object-contain bg-[#121316]"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-[#A1A1AA]">
                    <Video className="h-8 w-8 mx-auto text-[#71717A]" />
                    <p className="text-xs font-medium">No video uploaded yet</p>
                    <p className="text-[11px] text-[#71717A]">
                      Select an MP4 or WebM video file to upload and preview live playback.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Top Banner Alert */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#20252B]">Top Banner Announcement Strip</h2>
              <p className="text-xs text-[#66727D]">Thin global banner strip displayed at the very top of MERITWISE.COM</p>
            </div>
            <input
              type="checkbox"
              checked={data.bannerEnabled}
              onChange={(e) => setData({ ...data, bannerEnabled: e.target.checked })}
              className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
            />
          </div>

          {data.bannerEnabled && (
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Banner Message</label>
              <input
                type="text"
                value={data.bannerMessage}
                onChange={(e) => setData({ ...data, bannerMessage: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          )}
        </div>

        {/* Highlighted Stats Counter */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <h2 className="text-base font-bold text-[#20252B]">Social Proof / Metric Counters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Metric 1</label>
              <input
                type="text"
                value={data.statsDisplay.studentsValue}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, studentsValue: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-2 text-xs font-bold text-[#20252B] mb-1"
              />
              <input
                type="text"
                value={data.statsDisplay.studentsLabel}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, studentsLabel: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-1.5 text-[11px] text-[#66727D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Metric 2</label>
              <input
                type="text"
                value={data.statsDisplay.questionsValue}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, questionsValue: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-2 text-xs font-bold text-[#20252B] mb-1"
              />
              <input
                type="text"
                value={data.statsDisplay.questionsLabel}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, questionsLabel: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-1.5 text-[11px] text-[#66727D]"
              />
            </div>

            <div>
              <label className="block font-semibold text-xs text-[#20252B] mb-1">Metric 3</label>
              <input
                type="text"
                value={data.statsDisplay.testsValue}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, testsValue: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-2 text-xs font-bold text-[#20252B] mb-1"
              />
              <input
                type="text"
                value={data.statsDisplay.testsLabel}
                onChange={(e) =>
                  setData({
                    ...data,
                    statsDisplay: { ...data.statsDisplay, testsLabel: e.target.value },
                  })
                }
                className="w-full rounded-lg border border-[#DCE2E6] p-1.5 text-[11px] text-[#66727D]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
