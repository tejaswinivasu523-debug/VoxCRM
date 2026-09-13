"use client";

import { useState, useEffect } from "react";
import { Search, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Modal } from "@/components/ui/Modal";
import { Skeleton } from "@/components/ui/Skeleton";
import { getContacts, createContact } from "@/lib/api";
import { Contact, Status } from "@/lib/types";

const TABS: { label: string; value: Status | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Customers", value: "Customer" },
  { label: "Leads", value: "Lead" },
  { label: "Prospects", value: "Prospect" },
];

export function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<Status | "All">("All");
  const [query, setQuery] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", phone: "", status: "Lead" as Status });

  // Load contacts from the backend on mount (falls back to mock data if the
  // API isn't reachable yet — see lib/api.ts).
  useEffect(() => {
    getContacts()
      .then(setContacts)
      .finally(() => setLoading(false));
  }, []);

  async function handleAddContact(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name.trim()) return;
    setSaving(true);
    const created = await createContact({
      name: form.name.trim(),
      company: form.company.trim() || "—",
      phone: form.phone.trim() || "—",
      status: form.status,
    });
    setContacts((prev) => [created, ...prev]);
    setForm({ name: "", company: "", phone: "", status: "Lead" });
    setSaving(false);
    setModalOpen(false);
  }

  const filtered = contacts.filter((c) => {
    const matchesTab = tab === "All" || c.status === tab;
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.company.toLowerCase().includes(query.toLowerCase());
    return matchesTab && matchesQuery;
  });

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card shadow-card overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between p-5 border-b border-surface-border">
        <div className="flex items-center gap-1 bg-surface rounded-xl p-1 w-fit">
          {TABS.map((t) => (
            <button
              key={t.value}
              onClick={() => setTab(t.value)}
              className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                tab === t.value
                  ? "bg-white text-ink shadow-sm font-medium"
                  : "text-ink-faint"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search contacts..."
              className="rounded-xl border border-surface-border bg-surface pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            />
          </div>
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-1.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-3.5 py-2"
          >
            <Plus size={15} />
            Add Contact
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-ink-faint text-xs uppercase tracking-wide border-b border-surface-border">
              <th className="px-5 py-3 font-medium">Name</th>
              <th className="px-5 py-3 font-medium">Company</th>
              <th className="px-5 py-3 font-medium">Phone</th>
              <th className="px-5 py-3 font-medium">Status</th>
              <th className="px-5 py-3 font-medium">Last Contact</th>
            </tr>
          </thead>
          <tbody>
            {loading &&
              Array.from({ length: 5 }).map((_, i) => (
                <tr key={i} className="border-b border-surface-border last:border-0">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-8 w-8 rounded-full" />
                      <Skeleton className="h-4 w-28" />
                    </div>
                  </td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-24" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-28" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-5 w-20 rounded-full" /></td>
                  <td className="px-5 py-3.5"><Skeleton className="h-4 w-16" /></td>
                </tr>
              ))}
            {!loading && filtered.map((c) => (
              <tr key={c.id} className="border-b border-surface-border last:border-0 hover:bg-surface/60 fade-in">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-3">
                    <div
                      className="h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-semibold"
                      style={{ backgroundColor: c.avatarColor }}
                    >
                      {c.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <span className="font-medium text-ink">{c.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{c.company}</td>
                <td className="px-5 py-3.5 text-ink-soft">{c.phone}</td>
                <td className="px-5 py-3.5">
                  <Badge label={c.status} />
                </td>
                <td className="px-5 py-3.5 text-ink-faint">{c.lastContact}</td>
              </tr>
            ))}
            {!loading && filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-ink-faint">
                  No contacts match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between px-5 py-3.5 border-t border-surface-border text-sm">
        <span className="text-ink-faint">Showing {filtered.length} of {contacts.length}</span>
        <div className="flex items-center gap-1">
          <button className="h-8 w-8 rounded-lg border border-surface-border flex items-center justify-center text-ink-faint">
            <ChevronLeft size={15} />
          </button>
          <button className="h-8 w-8 rounded-lg bg-brand-500 text-white text-xs font-medium">1</button>
          <button className="h-8 w-8 rounded-lg border border-surface-border text-xs">2</button>
          <button className="h-8 w-8 rounded-lg border border-surface-border text-xs">3</button>
          <button className="h-8 w-8 rounded-lg border border-surface-border flex items-center justify-center text-ink-faint">
            <ChevronRight size={15} />
          </button>
        </div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Add Contact">
        <form onSubmit={handleAddContact} className="space-y-3">
          <div>
            <label className="text-xs text-ink-faint">Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="w-full mt-1 rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
              placeholder="Rahul Sharma"
            />
          </div>
          <div>
            <label className="text-xs text-ink-faint">Company</label>
            <input
              value={form.company}
              onChange={(e) => setForm((f) => ({ ...f, company: e.target.value }))}
              className="w-full mt-1 rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
              placeholder="ABC Pvt Ltd"
            />
          </div>
          <div>
            <label className="text-xs text-ink-faint">Phone</label>
            <input
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="w-full mt-1 rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="text-xs text-ink-faint">Status</label>
            <select
              value={form.status}
              onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Status }))}
              className="w-full mt-1 rounded-xl border border-surface-border bg-surface px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
            >
              <option value="Lead">Lead</option>
              <option value="Prospect">Prospect</option>
              <option value="Customer">Customer</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-xl bg-brand-500 hover:bg-brand-600 disabled:opacity-60 text-white text-sm font-medium py-2.5 mt-2 flex items-center justify-center gap-2"
          >
            {saving && <Loader2 size={15} className="animate-spin" />}
            {saving ? "Saving..." : "Add Contact"}
          </button>
        </form>
      </Modal>
    </div>
  );
}
