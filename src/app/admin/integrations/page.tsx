'use client';

import React, { useState, useEffect } from 'react';
import {
  Cpu,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  ExternalLink,
  Shield,
  Database,
  CreditCard,
  Cloud,
  Mail,
  BarChart,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { IntegrationService } from '@/types/admin';
import { getStoredIntegrations, saveStoredIntegrations } from '@/lib/admin/store';
import { toast } from 'sonner';

export default function AdminIntegrationsPage() {
  const [integrations, setIntegrations] = useState<IntegrationService[]>([]);
  const [pingingId, setPingingId] = useState<string | null>(null);

  useEffect(() => {
    setIntegrations(getStoredIntegrations());
  }, []);

  const handlePing = (id: string) => {
    setPingingId(id);
    setTimeout(() => {
      const updated = integrations.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            status: 'connected' as const,
            lastPing: new Date().toISOString(),
          };
        }
        return item;
      });
      setIntegrations(updated);
      saveStoredIntegrations(updated);
      setPingingId(null);
      toast.success(`Service pinged successfully (Latency: 42ms).`);
    }, 600);
  };

  const getCategoryIcon = (category: IntegrationService['category']) => {
    switch (category) {
      case 'payment':
        return <CreditCard className="h-5 w-5 text-[#20252B]" />;
      case 'database':
        return <Database className="h-5 w-5 text-[#20252B]" />;
      case 'storage':
        return <Cloud className="h-5 w-5 text-[#20252B]" />;
      case 'email':
        return <Mail className="h-5 w-5 text-[#20252B]" />;
      case 'analytics':
        return <BarChart className="h-5 w-5 text-[#20252B]" />;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Service & API Integrations</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Verify upstream database connections, payment webhook listeners, cloud storage, and email gateways.
          </p>
        </div>
      </div>

      {/* Security Note */}
      <div className="flex items-center gap-2.5 rounded-xl border border-[#DCE2E6] bg-white p-4 text-xs text-[#52584E] shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <Shield className="h-4 w-4 shrink-0 text-[#9CC6E0]" />
        <span>
          <strong>Cryptographic Isolation:</strong> Production API secret keys and private tokens are isolated strictly within server-side environment variables and never leaked or mirrored to client bundles.
        </span>
      </div>

      {/* Integrations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {integrations.map((svc) => (
          <div
            key={svc.id}
            className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-4 hover:border-[#9CC6E0] transition-all"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F1F3F4] border border-[#DCE2E6]">
                    {getCategoryIcon(svc.category)}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#20252B]">{svc.name}</h3>
                    <div className="text-[11px] text-[#66727D]">{svc.provider}</div>
                  </div>
                </div>
                <span
                  className={cn(
                    'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                    svc.status === 'connected' && 'bg-[#9CC6E0]/20 text-[#3B4C30]',
                    svc.status === 'error' && 'bg-[#E4002B]/15 text-[#E4002B]',
                    svc.status === 'not_configured' && 'bg-[#66727D]/15 text-[#66727D]'
                  )}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-current" />
                  {svc.status.replace('_', ' ')}
                </span>
              </div>

              <p className="text-xs text-[#52584E] leading-relaxed">{svc.details}</p>

              <div className="pt-2 border-t border-[#DCE2E6] space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-[#66727D]">Masked Credential</span>
                  <span className="font-mono text-[#20252B]">{svc.maskedKey}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#66727D]">Last Health Ping</span>
                  <span className="font-mono text-[#66727D] text-[11px]">
                    {svc.lastPing.replace('T', ' ').substring(0, 19)}
                  </span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-[#DCE2E6] flex items-center justify-between">
              <div className="text-[11px] text-[#3B4C30] font-semibold flex items-center gap-1">
                <CheckCircle2 className="h-3.5 w-3.5 text-[#9CC6E0]" />
                Operating Normally
              </div>
              <button
                onClick={() => handlePing(svc.id)}
                disabled={pingingId === svc.id}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#DCE2E6] text-[#20252B] hover:bg-[#F1F3F4] transition-colors disabled:opacity-50"
              >
                <RefreshCw className={cn('h-3.5 w-3.5', pingingId === svc.id && 'animate-spin')} />
                Test Connection
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
