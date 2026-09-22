"use client";

import { useEffect, useState } from "react";
import { Plus, X, Loader2 } from "lucide-react";
import { getDeals, createDeal } from "@/lib/api";
import { DealColumn } from "@/lib/types";
import { Skeleton } from "@/components/ui/Skeleton";

export function DealsBoard() {
  const [columns, setColumns] = useState<DealColumn[]>([]);
  const [loading, setLoading] = useState(true);
  const [addingTo, setAddingTo] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ company: "", value: "", owner: "" });

  useEffect(() => {
    getDeals()
      .then(setColumns)
      .finally(() => setLoading(false));
  }, []);

  function openAdd(colId: string) {
    setAddingTo(colId);
    setForm({ company: "", value: "", owner: "" });
  }

  async function submitAdd(e: React.FormEvent, colId: string) {
    e.preventDefault();
    if (!form.company.trim()) return;
    setSaving(true);
    const newDeal = await createDeal(colId, {
      company: form.company.trim(),
      value: form.value.trim() ? `₹${form.value.trim()}` : "₹0",
      owner: form.owner.trim() || "Unassigned",
    });
    setColumns((prev) =>
      prev.map((col) =>
        col.id === colId ? { ...col, deals: [newDeal, ...col.deals] } : col
      )
    );
    setSaving(false);
    setAddingTo(null);
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-surface-border bg-surface-card shadow-card p-4 space-y-3">
            <Skeleton className="h-4 w-24 mb-1" />
            {Array.from({ length: 3 }).map((_, j) => (
              <div key={j} className="rounded-xl border border-surface-border p-3.5 space-y-2">
                <Skeleton className="h-4 w-32" />
                <div className="flex items-center justify-between">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-3 w-12" />
                </div>
                <Skeleton className="h-3 w-20" />
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {columns.map((col) => (
        <div key={col.id} className="rounded-2xl border border-surface-border bg-surface-card shadow-card p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span className="h-2 w-2 rounded-full" style={{ backgroundColor: col.color }} />
              {col.label}
              <span className="text-ink-faint font-normal">({col.deals.length})</span>
            </span>
          </div>

          <div className="space-y-3">
            {col.deals.map((deal) => (
              <div
                key={deal.id}
                className="rounded-xl border border-surface-border p-3.5 hover:shadow-card transition-shadow fade-in"
              >
                <p className="text-sm font-medium text-ink">{deal.company}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold" style={{ color: col.color }}>
                    {deal.value}
                  </span>
                  <span className="text-xs text-ink-faint">{deal.date}</span>
                </div>
                <p className="text-xs text-ink-faint mt-2">{deal.owner}</p>
              </div>
            ))}

            {addingTo === col.id ? (
              <form
                onSubmit={(e) => submitAdd(e, col.id)}
                className="rounded-xl border border-surface-border p-3 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-ink-soft">New deal</span>
                  <button type="button" onClick={() => setAddingTo(null)} className="text-ink-faint">
                    <X size={14} />
                  </button>
                </div>
                <input
                  autoFocus
                  required
                  placeholder="Company name"
                  value={form.company}
                  onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
                  className="w-full rounded-lg border border-surface-border bg-surface px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
                <input
                  placeholder="Value (e.g. 80,000)"
                  value={form.value}
                  onChange={(e) => setForm((f) => ({ ...f, value: e.target.value }))}
                  className="w-full rounded-lg border border-surface-border bg-surface px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
                <input
                  placeholder="Owner"
                  value={form.owner}
                  onChange={(e) => setForm((f) => ({ ...f, owner: e.target.value }))}
                  className="w-full rounded-lg border border-surface-border bg-surface px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
                />
                <button
                  type="submit"
                  disabled={saving}
                  className="w-full rounded-lg bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-medium py-1.5 flex items-center justify-center gap-2"
                >
                  {saving && <Loader2 size={14} className="animate-spin" />}
                  {saving ? "Saving..." : "Add"}
                </button>
              </form>
            ) : (
              <button
                onClick={() => openAdd(col.id)}
                className="w-full flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-surface-border text-ink-faint text-sm py-2.5 hover:border-brand-300 hover:text-brand-600"
              >
                <Plus size={15} />
                Add Deal
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
