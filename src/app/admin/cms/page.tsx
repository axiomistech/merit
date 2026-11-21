'use client';

import React, { useState, useEffect } from 'react';
import {
  Layers,
  Save,
  CheckCircle2,
  Globe,
  Layout,
  ExternalLink,
  Eye,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CMSHomepageData } from '@/types/admin';
import { getStoredCMSHomepage, saveStoredCMSHomepage } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminHomepageCMSPage() {
  const [data, setData] = useState<CMSHomepageData | null>(null);

  useEffect(() => {
    setData(getStoredCMSHomepage());
  }, []);

  if (!data) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredCMSHomepage(data);
    logAdminAction({
      action: 'HOMEPAGE_CMS_UPDATED',
      resource_type: 'cms',
      change_summary: `Updated homepage headline "${data.heroHeadline}" and banner settings`,
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

        {/* Top Banner Alert */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-[#20252B]">Top Banner Announcement Strip</h2>
              <p className="text-xs text-[#66727D]">Thin global banner strip displayed at the very top of FORTLEARNING.COM</p>
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
