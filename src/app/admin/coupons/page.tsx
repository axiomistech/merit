'use client';

import React, { useState, useEffect } from 'react';
import {
  Tag,
  Plus,
  Search,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Percent,
  DollarSign,
  TrendingUp,
  X,
  Edit,
  Trash2,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { CouponItem } from '@/types/admin';
import { getStoredCoupons, saveStoredCoupons } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminCouponsPage() {
  const [coupons, setCoupons] = useState<CouponItem[]>([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'paused' | 'expired'>('all');
  const [showModal, setShowModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<CouponItem | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    code: string;
    name: string;
    description: string;
    discount_type: CouponItem['discount_type'];
    discount_value: number;
    applicable_exams: string;
    min_purchase_amount: number;
    max_discount_amount: number;
    total_limit: number;
    per_user_limit: number;
    starts_at: string;
    expires_at: string;
    status: CouponItem['status'];
  }>({
    code: '',
    name: '',
    description: '',
    discount_type: 'percentage',
    discount_value: 20,
    applicable_exams: 'all',
    min_purchase_amount: 50,
    max_discount_amount: 100,
    total_limit: 500,
    per_user_limit: 1,
    starts_at: '2026-11-21',
    expires_at: '2026-12-31',
    status: 'active',
  });

  useEffect(() => {
    setCoupons(getStoredCoupons());
  }, []);

  const filteredCoupons = coupons.filter((c) => {
    const matchesSearch =
      c.code.toLowerCase().includes(search.toLowerCase()) ||
      c.name.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleOpenCreate = () => {
    setEditingCoupon(null);
    setFormData({
      code: '',
      name: '',
      description: '',
      discount_type: 'percentage',
      discount_value: 20,
      applicable_exams: 'all',
      min_purchase_amount: 50,
      max_discount_amount: 100,
      total_limit: 500,
      per_user_limit: 1,
      starts_at: '2026-11-21',
      expires_at: '2026-12-31',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (c: CouponItem) => {
    setEditingCoupon(c);
    setFormData({
      code: c.code,
      name: c.name,
      description: c.description || '',
      discount_type: c.discount_type,
      discount_value: c.discount_value,
      applicable_exams: c.applicable_exams.join(','),
      min_purchase_amount: c.min_purchase_amount,
      max_discount_amount: c.max_discount_amount || 0,
      total_limit: c.total_limit,
      per_user_limit: c.per_user_limit,
      starts_at: c.starts_at.split('T')[0],
      expires_at: c.expires_at.split('T')[0],
      status: c.status,
    });
    setShowModal(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = formData.code.trim().toUpperCase();
    if (!cleanCode) {
      toast.error('Coupon code is required.');
      return;
    }

    const applicableList = formData.applicable_exams
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);

    if (editingCoupon) {
      const updated = coupons.map((c) => {
        if (c.id === editingCoupon.id) {
          return {
            ...c,
            code: cleanCode,
            name: formData.name,
            description: formData.description,
            discount_type: formData.discount_type,
            discount_value: Number(formData.discount_value),
            applicable_exams: applicableList.length > 0 ? applicableList : ['all'],
            min_purchase_amount: Number(formData.min_purchase_amount),
            max_discount_amount: Number(formData.max_discount_amount),
            total_limit: Number(formData.total_limit),
            per_user_limit: Number(formData.per_user_limit),
            starts_at: `${formData.starts_at}T00:00:00Z`,
            expires_at: `${formData.expires_at}T23:59:59Z`,
            status: formData.status,
          };
        }
        return c;
      });
      setCoupons(updated);
      saveStoredCoupons(updated);
      logAdminAction({
        action: 'COUPON_UPDATED',
        resource_type: 'coupon',
        resource_id: editingCoupon.id,
        change_summary: `Updated coupon promo code ${cleanCode}`,
      });
      toast.success(`Coupon ${cleanCode} updated successfully.`);
    } else {
      const newCoupon: CouponItem = {
        id: `cpn_${Date.now()}`,
        code: cleanCode,
        name: formData.name,
        description: formData.description,
        discount_type: formData.discount_type,
        discount_value: Number(formData.discount_value),
        applicable_exams: applicableList.length > 0 ? applicableList : ['all'],
        min_purchase_amount: Number(formData.min_purchase_amount),
        max_discount_amount: Number(formData.max_discount_amount),
        total_limit: Number(formData.total_limit),
        used_count: 0,
        per_user_limit: Number(formData.per_user_limit),
        starts_at: `${formData.starts_at}T00:00:00Z`,
        expires_at: `${formData.expires_at}T23:59:59Z`,
        status: formData.status,
        revenue_generated: 0,
      };
      const updated = [newCoupon, ...coupons];
      setCoupons(updated);
      saveStoredCoupons(updated);
      logAdminAction({
        action: 'COUPON_CREATED',
        resource_type: 'coupon',
        resource_id: newCoupon.id,
        change_summary: `Created promo code ${cleanCode} with ${newCoupon.discount_type === 'percentage' ? newCoupon.discount_value + '%' : '₹' + newCoupon.discount_value} discount`,
      });
      toast.success(`New coupon code ${cleanCode} activated.`);
    }
    setShowModal(false);
  };

  const handleToggleStatus = (c: CouponItem) => {
    const nextStatus: CouponItem['status'] = c.status === 'active' ? 'paused' : 'active';
    const updated = coupons.map((item) =>
      item.id === c.id ? { ...item, status: nextStatus } : item
    );
    setCoupons(updated);
    saveStoredCoupons(updated);
    logAdminAction({
      action: 'COUPON_STATUS_CHANGED',
      resource_type: 'coupon',
      resource_id: c.id,
      change_summary: `Changed ${c.code} status to ${nextStatus}`,
    });
    toast.info(`Coupon ${c.code} is now ${nextStatus}`);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#263126] font-serif">Coupons & Promotional Discounts</h1>
          <p className="mt-1 text-xs text-[#73786E]">
            Configure campaign discount codes, redemption velocity limits, and track generated revenue.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-[#263126] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create New Coupon
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#E6E5DE] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#73786E]" />
          <input
            type="text"
            placeholder="Search coupon code or campaign name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#E6E5DE] bg-[#F7F5EF] pl-10 pr-4 py-2 text-xs text-[#263126] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CAF88]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#73786E]">Status:</span>
          {(['all', 'active', 'paused', 'expired'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg border capitalize transition-colors',
                statusFilter === st
                  ? 'bg-[#263126] text-white border-[#263126]'
                  : 'bg-white text-[#52584E] border-[#E6E5DE] hover:bg-[#F7F5EF]'
              )}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Coupons Table */}
      <div className="rounded-2xl border border-[#E6E5DE] bg-white shadow-[0_2px_8px_rgba(38,49,38,0.04)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[#E6E5DE] bg-[#F7F5EF] text-[#73786E]">
              <tr>
                <th className="p-4 font-semibold">Code & Campaign</th>
                <th className="p-4 font-semibold">Discount</th>
                <th className="p-4 font-semibold">Redemptions</th>
                <th className="p-4 font-semibold">Attributed Sales</th>
                <th className="p-4 font-semibold">Validity Window</th>
                <th className="p-4 font-semibold">Status</th>
                <th className="p-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ECEAE4]">
              {filteredCoupons.map((c) => (
                <tr key={c.id} className="hover:bg-[#F7F5EF]/60 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded bg-[#F7F5EF] border border-[#E6E5DE] font-mono font-bold text-xs text-[#263126]">
                        {c.code}
                      </span>
                      <span className="font-semibold text-[#263126]">{c.name}</span>
                    </div>
                    {c.description && (
                      <div className="text-[11px] text-[#73786E] mt-0.5">{c.description}</div>
                    )}
                  </td>
                  <td className="p-4 font-bold text-[#263126]">
                    {c.discount_type === 'percentage' ? `${c.discount_value}% OFF` : `₹${c.discount_value} OFF`}
                    <span className="block text-[10px] font-normal text-[#73786E]">
                      Min. spend ₹{c.min_purchase_amount}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="font-bold text-[#263126]">
                      {c.used_count} / {c.total_limit}
                    </div>
                    <div className="w-24 bg-[#E6E5DE] h-1.5 rounded-full mt-1 overflow-hidden">
                      <div
                        className="bg-[#263126] h-full rounded-full"
                        style={{ width: `${Math.min(100, (c.used_count / c.total_limit) * 100)}%` }}
                      />
                    </div>
                  </td>
                  <td className="p-4 font-bold font-mono text-[#263126]">
                    ₹{c.revenue_generated.toLocaleString()}
                  </td>
                  <td className="p-4 text-[11px] text-[#73786E]">
                    <div>Start: {c.starts_at.split('T')[0]}</div>
                    <div>Exp: {c.expires_at.split('T')[0]}</div>
                  </td>
                  <td className="p-4">
                    <span
                      className={cn(
                        'inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider',
                        c.status === 'active' && 'bg-[#9CAF88]/20 text-[#3B4C30]',
                        c.status === 'paused' && 'bg-amber-100 text-amber-800',
                        c.status === 'expired' && 'bg-[#73786E]/15 text-[#73786E]'
                      )}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleToggleStatus(c)}
                        className="px-2.5 py-1 rounded-lg border border-[#E6E5DE] text-[11px] font-semibold text-[#52584E] hover:bg-[#F7F5EF] transition-colors"
                      >
                        {c.status === 'active' ? 'Pause' : 'Activate'}
                      </button>
                      <button
                        onClick={() => handleOpenEdit(c)}
                        className="p-1.5 rounded-lg border border-[#E6E5DE] text-[#52584E] hover:bg-[#F7F5EF] transition-colors"
                      >
                        <Edit className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCoupons.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-[#73786E]">
                    No promotional coupons found matching filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-xl rounded-2xl border border-[#E6E5DE] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#ECEAE4] pb-4">
              <h3 className="text-lg font-bold text-[#263126] font-serif">
                {editingCoupon ? 'Edit Coupon Code' : 'Create New Coupon Code'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#73786E] hover:bg-[#F7F5EF] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveCoupon} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. FORTNEET50"
                    value={formData.code}
                    onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono font-bold tracking-wider text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Campaign Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NEET 2026 Launch Offer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Discount Type</label>
                  <select
                    value={formData.discount_type}
                    onChange={(e) =>
                      setFormData({ ...formData, discount_type: e.target.value as any })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  >
                    <option value="percentage">Percentage Discount (%)</option>
                    <option value="fixed">Fixed Amount Discount (₹)</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">
                    Value ({formData.discount_type === 'percentage' ? '%' : '₹'})
                  </label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={formData.discount_value}
                    onChange={(e) => setFormData({ ...formData, discount_value: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono font-bold text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Min. Order (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.min_purchase_amount}
                    onChange={(e) =>
                      setFormData({ ...formData, min_purchase_amount: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Max Uses Limit</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.total_limit}
                    onChange={(e) => setFormData({ ...formData, total_limit: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Per User Cap</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.per_user_limit}
                    onChange={(e) =>
                      setFormData({ ...formData, per_user_limit: Number(e.target.value) })
                    }
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs font-mono text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Start Date</label>
                  <input
                    type="date"
                    required
                    value={formData.starts_at}
                    onChange={(e) => setFormData({ ...formData, starts_at: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#263126] mb-1">Expiration Date</label>
                  <input
                    type="date"
                    required
                    value={formData.expires_at}
                    onChange={(e) => setFormData({ ...formData, expires_at: e.target.value })}
                    className="w-full rounded-xl border border-[#E6E5DE] p-2.5 text-xs text-[#263126] focus:outline-none focus:border-[#9CAF88]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-[#ECEAE4] pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-[#52584E] hover:text-[#263126]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold text-white bg-[#263126] rounded-xl hover:bg-[#344034] transition-colors"
                >
                  {editingCoupon ? 'Save Changes' : 'Activate Coupon'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
