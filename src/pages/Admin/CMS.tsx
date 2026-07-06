import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopBar } from '../../components/admin/AdminTopBar';
import api from '../../lib/api';
import { FileText, Plus, Edit, Trash, X, ToggleLeft, ToggleRight } from 'lucide-react';
import { cn } from '../../lib/utils';
import { PremiumButton } from '../../components/ui/PremiumButton';

interface CMSItem {
  id: string;
  slug: string;
  type: string;
  title: string;
  content: string;
  isActive: boolean;
  order: number;
}

export function AdminCMS() {
  const [cmsItems, setCmsItems] = useState<CMSItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<CMSItem | null>(null);

  // Form fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [type, setType] = useState('page');
  const [content, setContent] = useState('');
  const [isActive, setIsActive] = useState(true);
  const [order, setOrder] = useState('0');

  const fetchCMS = async () => {
    setIsLoading(true);
    try {
      const response = await api.get<{ items: CMSItem[] }>('/cms');
      setCmsItems(response.data.items);
    } catch (error) {
      console.error('Failed to load CMS list', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCMS();
  }, []);

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setType('page');
    setContent('');
    setIsActive(true);
    setOrder('0');
    setEditingItem(null);
  };

  const handleEdit = (item: CMSItem) => {
    setEditingItem(item);
    setTitle(item.title);
    setSlug(item.slug);
    setType(item.type);
    setContent(item.content);
    setIsActive(item.isActive);
    setOrder(item.order.toString());
    setIsModalOpen(true);
  };

  const handleDelete = async (item: CMSItem) => {
    if (!window.confirm(`Are you sure you want to delete ${item.title}?`)) return;
    try {
      await api.delete(`/cms/${item.id}`);
      setCmsItems(prev => prev.filter(c => c.id !== item.id));
    } catch (error) {
      alert('Failed to delete content');
    }
  };

  const toggleActive = async (item: CMSItem) => {
    try {
      const updatedStatus = !item.isActive;
      await api.put(`/cms/${item.id}`, { isActive: updatedStatus });
      setCmsItems(prev => prev.map(c => c.id === item.id ? { ...c, isActive: updatedStatus } : c));
    } catch (error) {
      alert('Failed to toggle status');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      title,
      slug,
      type,
      content,
      isActive,
      order: parseInt(order),
    };

    try {
      if (editingItem) {
        await api.put(`/cms/${editingItem.id}`, payload);
      } else {
        await api.post('/cms', payload);
      }
      setIsModalOpen(false);
      resetForm();
      fetchCMS();
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to save CMS block');
    }
  };

  return (
    <div className="min-h-screen bg-surface flex">
      <AdminSidebar />

      <div className="flex-1 ml-[260px]">
        <AdminTopBar title="Content Management System" />

        <main className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="font-headline text-2xl font-bold text-on-surface">Static Page Editor</h2>
              <p className="text-sm text-on-surface-variant mt-0.5 font-body">Publish, edit, and maintain custom platform content blocks</p>
            </div>
            <PremiumButton
              onClick={() => {
                resetForm();
                setIsModalOpen(true);
              }}
              variant="admin"
              size="md"
              className="flex items-center gap-2"
            >
              <Plus className="w-4 h-4" /> Create Content Block
            </PremiumButton>
          </div>

          {isLoading ? (
            <div className="text-center py-12 font-body text-on-surface-variant">Loading CMS blocks...</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {cmsItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface-container-lowest p-6 rounded-2xl shadow-ambient border border-outline-variant/10 flex items-start justify-between group hover:border-primary/20 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-primary/10 text-primary rounded-xl">
                      <FileText className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="font-headline font-bold text-base text-on-surface">{item.title}</h3>
                      <p className="text-xs text-on-surface-variant mt-0.5 font-body">
                        Slug: <span className="font-mono text-primary font-semibold">/{item.slug}</span> • Type: {item.type}
                      </p>
                      <p className="text-sm text-on-surface-variant mt-3 line-clamp-2 max-w-2xl leading-relaxed font-body">
                        {item.content.startsWith('{') ? '[Configuration Parameters]' : item.content}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => toggleActive(item)}
                      className={cn(
                        "p-1 rounded-full transition-colors",
                        item.isActive ? "text-primary" : "text-on-surface-variant/40"
                      )}
                      title={item.isActive ? 'Deactivate page' : 'Activate page'}
                    >
                      {item.isActive ? <ToggleRight className="w-8 h-8" /> : <ToggleLeft className="w-8 h-8" />}
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="p-2 hover:bg-surface-container-low rounded-xl text-on-surface-variant hover:text-primary transition-colors duration-200"
                      title="Edit Block"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(item)}
                      className="p-2 hover:bg-error/10 rounded-xl text-on-surface-variant hover:text-error transition-colors duration-200"
                      title="Delete Block"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </main>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest rounded-2xl w-full max-w-2xl shadow-ambient-lg p-6 border border-outline-variant/10 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-headline font-bold text-on-surface">
                {editingItem ? `Edit Content: ${editingItem.title}` : 'Create Content Block'}
              </h3>
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  resetForm();
                }}
                className="p-1.5 hover:bg-surface-container-low rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-on-surface" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Page Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-3 text-xs font-body text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="About Us"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Slug Identifier</label>
                  <input
                    type="text"
                    required
                    value={slug}
                    onChange={(e) => setSlug(e.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-3 text-xs font-body text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                    placeholder="about-us"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-3 text-xs font-body text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                  >
                    <option value="page">Standard Page</option>
                    <option value="settings">System Config</option>
                    <option value="faq">FAQ Row</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Display Order</label>
                  <input
                    type="number"
                    value={order}
                    onChange={(e) => setOrder(e.target.value)}
                    className="w-full bg-surface-container-low border-0 rounded-xl p-3 text-xs font-body text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-headline font-bold text-on-surface-variant uppercase tracking-wider">Content Markup / Value</label>
                <textarea
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-surface-container-low border-0 rounded-xl p-3 text-xs font-body text-on-surface focus:ring-1 focus:ring-primary focus:outline-none"
                  placeholder="Enter page body text or JSON config block..."
                  rows={8}
                />
              </div>

              <div className="flex items-center gap-2 py-2">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="rounded text-primary focus:ring-primary/20 border-outline-variant/30"
                />
                <label htmlFor="isActive" className="text-xs font-headline font-bold text-on-surface cursor-pointer select-none">
                  Publish (Active immediately)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-4 border-t border-outline-variant/10">
                <PremiumButton
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsModalOpen(false);
                    resetForm();
                  }}
                >
                  Cancel
                </PremiumButton>
                <PremiumButton
                  type="submit"
                  variant="admin"
                  size="sm"
                >
                  Save
                </PremiumButton>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
