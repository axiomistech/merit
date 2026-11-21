'use client';

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Plus,
  Search,
  Send,
  CheckCircle2,
  Clock,
  Eye,
  MousePointer,
  Trash2,
  X,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EmailCampaign } from '@/types/admin';
import { getStoredCampaigns, saveStoredCampaigns } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminCampaignsPage() {
  const [campaigns, setCampaigns] = useState<EmailCampaign[]>([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    subject: string;
    previewText: string;
    targetSegment: string;
  }>({
    name: '',
    subject: '',
    previewText: '',
    targetSegment: 'All Registered Candidates (4,218)',
  });

  useEffect(() => {
    setCampaigns(getStoredCampaigns());
  }, []);

  const filteredCampaigns = campaigns.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.subject.toLowerCase().includes(search.toLowerCase())
  );

  const handleCreateCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.subject) {
      toast.error('Campaign name and subject line are required.');
      return;
    }

    const newCampaign: EmailCampaign = {
      id: `camp_${Date.now()}`,
      name: formData.name,
      subject: formData.subject,
      previewText: formData.previewText,
      targetSegment: formData.targetSegment,
      recipientsCount: 4218,
      openRatePercent: 0,
      clickRatePercent: 0,
      status: 'sent',
      sentAt: new Date().toISOString(),
      created_at: new Date().toISOString(),
    };

    const updated = [newCampaign, ...campaigns];
    setCampaigns(updated);
    saveStoredCampaigns(updated);

    logAdminAction({
      action: 'EMAIL_CAMPAIGN_LAUNCHED',
      resource_type: 'email_campaign',
      resource_id: newCampaign.id,
      change_summary: `Sent email broadcast "${formData.name}" to ${formData.targetSegment}`,
    });

    toast.success(`Campaign "${formData.name}" queued and delivering via SMTP gateway.`);
    setShowModal(false);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Email Campaign Center</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Targeted email re-engagement, weekly diagnostic progress digests, and mock exam invitations.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Mail className="h-4 w-4" />
          Compose Email Campaign
        </button>
      </div>

      {/* Campaigns Table */}
      <div className="rounded-2xl border border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#DCE2E6] bg-[#F1F3F4] text-[#66727D]">
              <tr>
                <th className="p-4 font-semibold">Campaign & Subject</th>
                <th className="p-4 font-semibold">Target Cohort</th>
                <th className="p-4 font-semibold">Recipients</th>
                <th className="p-4 font-semibold">Open Rate</th>
                <th className="p-4 font-semibold">Click Rate</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Sent Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DCE2E6]">
              {filteredCampaigns.map((c) => (
                <tr key={c.id} className="hover:bg-[#F1F3F4]/60 transition-colors">
                  <td className="p-4">
                    <div className="font-bold text-[#20252B]">{c.name}</div>
                    <div className="text-[11px] text-[#52584E] mt-0.5">{c.subject}</div>
                    {c.previewText && (
                      <div className="text-[10px] text-[#66727D] italic mt-0.5">{c.previewText}</div>
                    )}
                  </td>
                  <td className="p-4 text-[#52584E] font-medium">{c.targetSegment}</td>
                  <td className="p-4 font-mono font-bold text-[#20252B]">{c.recipientsCount.toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-[#20252B]">
                    {c.openRatePercent > 0 ? `${c.openRatePercent}%` : '—'}
                  </td>
                  <td className="p-4 font-mono font-bold text-[#20252B]">
                    {c.clickRatePercent > 0 ? `${c.clickRatePercent}%` : '—'}
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        c.status === 'sent' && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                        c.status === 'sending' && 'bg-amber-100 text-amber-800',
                        c.status === 'draft' && 'bg-[#66727D]/15 text-[#66727D]'
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right font-mono text-[11px] text-[#66727D]">
                    {c.sentAt ? c.sentAt.split('T')[0] : 'Draft'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Compose Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <h3 className="text-lg font-bold text-[#20252B] font-serif">Compose Email Campaign</h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#66727D] hover:bg-[#F1F3F4] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleCreateCampaign} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Campaign Internal Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEET 2026 Countdown & Mock 3 Announcement"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Email Subject Line</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Take the official NEET 2026 Mock #3 with printable OMR"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Preview / Preheader Text</label>
                <input
                  type="text"
                  placeholder="e.g. Instant diagnostic analysis and percentile ranking available."
                  value={formData.previewText}
                  onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Target Segment</label>
                <select
                  value={formData.targetSegment}
                  onChange={(e) => setFormData({ ...formData, targetSegment: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                >
                  <option value="All Registered Candidates (4,218)">All Registered Candidates (4,218)</option>
                  <option value="NEET 2026 Aspirants (2,150)">NEET 2026 Aspirants (2,150)</option>
                  <option value="JEE Main Candidates (1,220)">JEE Main Candidates (1,220)</option>
                  <option value="Inactive in last 14 days (640)">Inactive in last 14 days (640)</option>
                </select>
              </div>

              <div className="flex items-center justify-between border-t border-[#DCE2E6] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#20252B]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#20252B] rounded-xl hover:bg-[#344034] transition-colors"
                >
                  Launch Campaign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
