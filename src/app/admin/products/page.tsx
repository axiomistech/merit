'use client';

import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Search,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Tag,
  DollarSign,
  Clock,
  BookOpen,
  X,
  TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ProductPackage } from '@/types/admin';
import { getStoredProducts, saveStoredProducts } from '@/lib/admin/store';
import { logAdminAction } from '@/lib/admin/auth';
import { toast } from 'sonner';

export default function AdminProductsPage() {
  const [products, setProducts] = useState<ProductPackage[]>([]);
  const [search, setSearch] = useState('');
  const [examFilter, setExamFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<ProductPackage | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    title: string;
    slug: string;
    examSlug: string;
    paperType: ProductPackage['paperType'];
    description: string;
    price: number;
    originalPrice: number;
    includedPapersCount: number;
    accessValidityDays: number;
    featuresString: string;
    status: ProductPackage['status'];
  }>({
    title: '',
    slug: '',
    examSlug: 'neet',
    paperType: 'mock_series',
    description: '',
    price: 99,
    originalPrice: 199,
    includedPapersCount: 10,
    accessValidityDays: 365,
    featuresString: 'Full NTA simulation\nInstant printable OMR\nDetailed explanations',
    status: 'active',
  });

  useEffect(() => {
    setProducts(getStoredProducts());
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.slug.toLowerCase().includes(search.toLowerCase());
    const matchesExam = examFilter === 'all' || p.examSlug === examFilter;
    return matchesSearch && matchesExam;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      examSlug: 'neet',
      paperType: 'mock_series',
      description: '',
      price: 99,
      originalPrice: 199,
      includedPapersCount: 10,
      accessValidityDays: 365,
      featuresString: 'Full simulation\nInstant printable OMR\nDetailed explanations',
      status: 'active',
    });
    setShowModal(true);
  };

  const handleOpenEdit = (p: ProductPackage) => {
    setEditingProduct(p);
    setFormData({
      title: p.title,
      slug: p.slug,
      examSlug: p.examSlug,
      paperType: p.paperType,
      description: p.description,
      price: p.price,
      originalPrice: p.originalPrice || p.price * 2,
      includedPapersCount: p.includedPapersCount,
      accessValidityDays: p.accessValidityDays,
      featuresString: p.features.join('\n'),
      status: p.status,
    });
    setShowModal(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Title and Slug are required.');
      return;
    }

    const featureList = formData.featuresString
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingProduct) {
      const updated = products.map((p) => {
        if (p.id === editingProduct.id) {
          return {
            ...p,
            title: formData.title,
            slug: formData.slug,
            examSlug: formData.examSlug,
            paperType: formData.paperType,
            description: formData.description,
            price: Number(formData.price),
            originalPrice: Number(formData.originalPrice),
            includedPapersCount: Number(formData.includedPapersCount),
            accessValidityDays: Number(formData.accessValidityDays),
            features: featureList,
            status: formData.status,
          };
        }
        return p;
      });
      setProducts(updated);
      saveStoredProducts(updated);
      logAdminAction({
        action: 'PRODUCT_UPDATED',
        resource_type: 'product_package',
        resource_id: editingProduct.id,
        change_summary: `Updated product package ${formData.title}`,
      });
      toast.success('Product package updated successfully');
    } else {
      const newProduct: ProductPackage = {
        id: `prod_${Date.now()}`,
        title: formData.title,
        slug: formData.slug,
        examSlug: formData.examSlug,
        paperType: formData.paperType,
        description: formData.description,
        price: Number(formData.price),
        originalPrice: Number(formData.originalPrice),
        includedPapersCount: Number(formData.includedPapersCount),
        accessValidityDays: Number(formData.accessValidityDays),
        features: featureList,
        status: formData.status,
        salesCount: 0,
        created_at: new Date().toISOString(),
      };
      const updated = [newProduct, ...products];
      setProducts(updated);
      saveStoredProducts(updated);
      logAdminAction({
        action: 'PRODUCT_CREATED',
        resource_type: 'product_package',
        resource_id: newProduct.id,
        change_summary: `Created product package ${newProduct.title} for ₹${newProduct.price}`,
      });
      toast.success('New product package published');
    }
    setShowModal(false);
  };

  const handleToggleStatus = (p: ProductPackage) => {
    const nextStatus: ProductPackage['status'] = p.status === 'active' ? 'inactive' : 'active';
    const updated = products.map((item) =>
      item.id === p.id ? { ...item, status: nextStatus } : item
    );
    setProducts(updated);
    saveStoredProducts(updated);
    logAdminAction({
      action: 'PRODUCT_STATUS_CHANGED',
      resource_type: 'product_package',
      resource_id: p.id,
      change_summary: `Changed ${p.title} status to ${nextStatus}`,
    });
    toast.info(`Product status updated to ${nextStatus}`);
  };

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#20252B] font-serif">Products & Paper Packs</h1>
          <p className="mt-1 text-xs text-[#66727D]">
            Manage test series bundles, individual paper tokens, validity duration, and catalog pricing.
          </p>
        </div>
        <button
          onClick={handleOpenCreate}
          className="flex items-center gap-2 rounded-xl bg-[#20252B] px-4 py-2.5 text-xs font-semibold text-white hover:bg-[#344034] transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Product Pack
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-[#DCE2E6] bg-white p-4 shadow-[0_2px_8px_rgba(38,49,38,0.04)]">
        <div className="relative flex-1 min-w-[260px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#66727D]" />
          <input
            type="text"
            placeholder="Search products by title or slug..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-[#DCE2E6] bg-[#F1F3F4] pl-10 pr-4 py-2 text-xs text-[#20252B] placeholder-[#A3A89E] focus:outline-none focus:border-[#9CC6E0]"
          />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#66727D]">Exam:</span>
          {['all', 'neet', 'jee-main', 'jee-advanced', 'upsc-cse'].map((ex) => (
            <button
              key={ex}
              onClick={() => setExamFilter(ex)}
              className={cn(
                'px-3 py-1.5 text-xs font-medium rounded-lg border uppercase transition-colors',
                examFilter === ex
                  ? 'bg-[#20252B] text-white border-[#20252B]'
                  : 'bg-white text-[#52584E] border-[#DCE2E6] hover:bg-[#F1F3F4]'
              )}
            >
              {ex}
            </button>
          ))}
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((p) => (
          <div
            key={p.id}
            className="rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-[0_2px_8px_rgba(38,49,38,0.04)] flex flex-col justify-between space-y-4 hover:border-[#9CC6E0] transition-all"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#F1F3F4] text-[#52584E] border border-[#DCE2E6]">
                  {p.paperType.replace('_', ' ')}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase px-2 py-0.5 rounded-full',
                    p.status === 'active' ? 'bg-[#9CC6E0]/20 text-[#3B4C30]' : 'bg-[#66727D]/15 text-[#66727D]'
                  )}
                >
                  {p.status}
                </span>
              </div>
              <h3 className="font-bold text-base text-[#20252B] leading-snug">{p.title}</h3>
              <p className="mt-1 text-xs text-[#66727D] line-clamp-2">{p.description}</p>

              <div className="mt-4 flex items-baseline gap-2">
                <span className="text-2xl font-bold font-mono text-[#20252B]">₹{p.price}</span>
                {p.originalPrice && (
                  <span className="text-xs text-[#A3A89E] line-through font-mono">₹{p.originalPrice}</span>
                )}
                <span className="text-[11px] text-[#66727D] ml-auto">
                  {p.includedPapersCount} Paper{p.includedPapersCount > 1 ? 's' : ''}
                </span>
              </div>

              <div className="mt-4 pt-3 border-t border-[#DCE2E6] space-y-1.5 text-xs text-[#52584E]">
                <div className="flex items-center gap-1.5 text-[11px]">
                  <Clock className="h-3.5 w-3.5 text-[#66727D]" />
                  <span>{p.accessValidityDays} days validity from purchase</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px]">
                  <TrendingUp className="h-3.5 w-3.5 text-[#9CC6E0]" />
                  <span><strong>{p.salesCount}</strong> students enrolled</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#DCE2E6]">
              <button
                onClick={() => handleToggleStatus(p)}
                className="text-xs font-semibold text-[#66727D] hover:text-[#20252B]"
              >
                {p.status === 'active' ? 'Deactivate' : 'Activate'}
              </button>
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => handleOpenEdit(p)}
                  className="p-1.5 rounded-lg border border-[#DCE2E6] text-[#52584E] hover:bg-[#F1F3F4] transition-colors"
                >
                  <Edit className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Create / Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm overflow-y-auto">
          <div className="w-full max-w-2xl rounded-2xl border border-[#DCE2E6] bg-white p-6 shadow-2xl my-8 space-y-6">
            <div className="flex items-center justify-between border-b border-[#DCE2E6] pb-4">
              <h3 className="text-lg font-bold text-[#20252B] font-serif">
                {editingProduct ? 'Edit Product Pack' : 'Create New Product Pack'}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-2 text-[#66727D] hover:bg-[#F1F3F4] transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NEET 2026 Ultimate Mock Series (10 Papers)"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">URL Slug</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. neet-2026-ultimate-mock-series"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Exam</label>
                  <select
                    value={formData.examSlug}
                    onChange={(e) => setFormData({ ...formData, examSlug: e.target.value })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  >
                    <option value="neet">NEET (UG)</option>
                    <option value="jee-main">JEE Main</option>
                    <option value="jee-advanced">JEE Advanced</option>
                    <option value="upsc-cse">UPSC CSE</option>
                    <option value="all">All Exams</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Price (INR ₹)</label>
                  <input
                    type="number"
                    required
                    min={0}
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={formData.originalPrice}
                    onChange={(e) => setFormData({ ...formData, originalPrice: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-[#20252B] mb-1">Included Papers</label>
                  <input
                    type="number"
                    min={1}
                    value={formData.includedPapersCount}
                    onChange={(e) => setFormData({ ...formData, includedPapersCount: Number(e.target.value) })}
                    className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs font-mono text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#20252B] mb-1">Included Features (1 per line)</label>
                <textarea
                  rows={3}
                  value={formData.featuresString}
                  onChange={(e) => setFormData({ ...formData, featuresString: e.target.value })}
                  className="w-full rounded-xl border border-[#DCE2E6] p-2.5 text-xs text-[#20252B] focus:outline-none focus:border-[#9CC6E0]"
                />
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
                  {editingProduct ? 'Save Changes' : 'Publish Product Pack'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
