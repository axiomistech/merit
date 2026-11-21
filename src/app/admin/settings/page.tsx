'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Save,
  CheckCircle2,
  Shield,
  AlertTriangle,
  Clock,
  Lock,
  Globe,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { PlatformSystemSettings } from '@/types/admin';
import { getStoredSettings, saveStoredSettings } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<PlatformSystemSettings | null>(null);

  useEffect(() => {
    setSettings(getStoredSettings());
  }, []);

  if (!settings) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    saveStoredSettings(settings);
    logAdminAction({
      action: 'SYSTEM_SETTINGS_UPDATED',
      resource_type: 'system_settings',
      change_summary: `Updated platform settings. Maintenance mode: ${settings.maintenanceMode ? 'ACTIVE' : 'OFF'}`,
    });
    toast.success('Platform configuration saved and applied.');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Platform System Settings</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Global configuration, examination marking defaults, session limits, and maintenance controls.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-5 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Save className="h-4 w-4" />
          Save Configuration
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Maintenance Mode Alert Box */}
        <div
          className={cn(
            'rounded-2xl border p-6 transition-all',
            settings.maintenanceMode
              ? 'border-[#E4002B] bg-[#E4002B]/5 shadow-[0_2px_12px_rgba(232,65,44,0.1)]'
              : 'border-[#DCE2E6] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)]'
          )}
        >
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={cn(
                    'h-4 w-4',
                    settings.maintenanceMode ? 'text-[#E4002B]' : 'text-[#66727D]'
                  )}
                />
                <h2 className="text-base font-bold text-[#20252B]">System Maintenance Mode</h2>
              </div>
              <p className="text-xs text-[#66727D] mt-0.5 max-w-xl">
                When active, non-admin visitors will see a scheduled maintenance notice. Test executions and payment transactions will be safely locked.
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.maintenanceMode}
                onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E4002B]"></div>
            </label>
          </div>

          {settings.maintenanceMode && (
            <div className="mt-4 pt-4 border-t border-[#E4002B]/20">
              <label className="block font-semibold text-xs text-[#20252B] mb-1">
                Notice Displayed to Students
              </label>
              <input
                type="text"
                value={settings.maintenanceNotice}
                onChange={(e) => setSettings({ ...settings, maintenanceNotice: e.target.value })}
                className="w-full rounded-xl border border-[#E4002B]/40 bg-white p-2.5 text-xs text-[#20252B] focus:outline-none"
              />
            </div>
          )}
        </div>

        {/* General Identity */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
            <Globe className="h-4 w-4 text-[#9CC6E0]" />
            Organization & Contact
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Site Title</label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Brand Tagline</label>
              <input
                type="text"
                value={settings.brandTagline}
                onChange={(e) => setSettings({ ...settings, brandTagline: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Official Support Email</label>
              <input
                type="email"
                value={settings.supportEmail}
                onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Primary Currency</label>
              <input
                type="text"
                value={settings.defaultCurrency}
                onChange={(e) => setSettings({ ...settings, defaultCurrency: e.target.value })}
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>
        </div>

        {/* Security & Examination Defaults */}
        <div className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] space-y-4 text-xs">
          <h2 className="text-base font-bold text-[#20252B] flex items-center gap-2">
            <Shield className="h-4 w-4 text-[#9CC6E0]" />
            Security & Examination Defaults
          </h2>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Session Timeout (Mins)</label>
              <input
                type="number"
                min={15}
                value={settings.sessionTimeoutMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, sessionTimeoutMinutes: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Default Duration (Mins)</label>
              <input
                type="number"
                min={10}
                value={settings.defaultTestDurationMinutes}
                onChange={(e) =>
                  setSettings({ ...settings, defaultTestDurationMinutes: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
            <div>
              <label className="block font-semibold text-[#20252B] mb-1">Max Login Attempts</label>
              <input
                type="number"
                min={3}
                value={settings.maxLoginAttemptsBeforeLock}
                onChange={(e) =>
                  setSettings({ ...settings, maxLoginAttemptsBeforeLock: Number(e.target.value) })
                }
                className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
              />
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between border-t border-[#DCE2E6]">
            <div>
              <div className="font-semibold text-[#20252B]">Allow New Student Registrations</div>
              <div className="text-[11px] text-[#66727D]">Temporarily freeze new account creation if overloaded</div>
            </div>
            <input
              type="checkbox"
              checked={settings.allowNewRegistrations}
              onChange={(e) => setSettings({ ...settings, allowNewRegistrations: e.target.checked })}
              className="h-4 w-4 rounded border-[#DCE2E6] text-[#20252B] focus:ring-[#9CC6E0]"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
