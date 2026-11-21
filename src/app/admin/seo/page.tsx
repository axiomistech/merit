'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  Save,
  CheckCircle2,
  Globe,
  Share2,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformSEOSettings } from '@/types/admin';
import { getStoredSEO, saveStoredSEO } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminSEOPage() {
  const [seo, setSeo] = useState<PlatformSEOSettings | null>(null);

  useEffect(() => {
    setSeo(getStoredSEO());
  }, []);

  if (!seo) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSEO(seo);
    logAdminAction({
      action: 'SEO_SETTINGS_UPDATED',
      resource_type: 'seo',
      change_summary: `Updated SEO meta tags and social card settings for FORT Learning`,
    });
    toast.success('SEO metadata and social sharing tags updated.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Search Engine Optimization (SEO)</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Configure title tags, meta descriptions, social graph previews, and structured schema.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#263126] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Save className="h-4 w-4" />
          Save SEO Settings
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* SERP Search Preview */}
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-3">
          <h2 className="text-xs font-bold uppercase text-[#73786E] tracking-wider flex items-center gap-1.5">
            <Search className="h-3.5 w-3.5" />
            Google SERP Snippet Preview
          </h2>
          <div className="rounded-xl border border-[#E6E5DE] bg-[#F7F5EF]/40 p-4 font-sans space-y-1">
            <div className="text-xs text-[#202124] flex items-center gap-1.5 font-mono">
              <span className="text-xs">https://fortlearning.com</span>
            </div>
            <div className="text-base text-[#1a0dab] hover:underline cursor-pointer font-medium leading-snug">
              {seo.metaTitle}
            </div>
            <div className="text-xs text-[#4d5156] leading-relaxed line-clamp-2">
              {seo.metaDescription}
            </div>
          </div>
        </div>

        {/* Core Meta Fields */}
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#263126]">Primary Meta Tags</h2>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#263126]">Default Meta Title</label>
              <span className="text-[10px] text-[#73786E] font-mono">{seo.metaTitle.length} / 60 chars</span>
            </div>
            <input
              type="text"
              value={seo.metaTitle}
              onChange={(e) => setSeo({ ...seo, metaTitle: e.target.value })}
              className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="font-semibold text-[#263126]">Default Meta Description</label>
              <span className="text-[10px] text-[#73786E] font-mono">{seo.metaDescription.length} / 160 chars</span>
            </div>
            <textarea
              rows={3}
              value={seo.metaDescription}
              onChange={(e) => setSeo({ ...seo, metaDescription: e.target.value })}
              className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>

          <div>
            <label className="block font-semibold text-[#263126] mb-1">Keywords (Comma Separated)</label>
            <input
              type="text"
              value={seo.metaKeywords}
              onChange={(e) => setSeo({ ...seo, metaKeywords: e.target.value })}
              className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
            />
          </div>
        </div>

        {/* Social Graph Fields */}
        <div className="rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#263126] flex items-center gap-2">
            <Share2 className="h-4 w-4 text-[#9CAF88]" />
            Social Graph & Open Graph (OG)
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#263126] mb-1">OG Image URL</label>
              <input
                type="text"
                value={seo.ogImageUrl}
                onChange={(e) => setSeo({ ...seo, ogImageUrl: e.target.value })}
                className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#263126] mb-1">Twitter / X Handle</label>
              <input
                type="text"
                value={seo.twitterHandle}
                onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#263126] mb-1">Canonical Base URL</label>
              <input
                type="text"
                value={seo.canonicalBaseUrl}
                onChange={(e) => setSeo({ ...seo, canonicalBaseUrl: e.target.value })}
                className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
              />
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl border border-[#E6E5DE] bg-[#F7F5EF]/40 mt-5">
              <div>
                <div className="font-semibold text-[#263126]">JSON-LD Schema Markup</div>
                <div className="text-[10px] text-[#73786E]">Inject EducationalOrganization schema</div>
              </div>
              <input
                type="checkbox"
                checked={seo.structuredDataEnabled}
                onChange={(e) => setSeo({ ...seo, structuredDataEnabled: e.target.checked })}
                className="h-4 w-4 rounded border-[#E6E5DE] text-[#263126] focus:ring-[#9CAF88]"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
