"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Skeleton } from "@/components/ui/Skeleton";
import { getLeads } from "@/lib/api";
import { Lead } from "@/lib/types";

function scoreColor(score: number) {
  if (score >= 75) return "#1FAE73";
  if (score >= 55) return "#F2A93B";
  return "#EF5B5B";
}

export function LeadsList() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeads()
      .then(setLeads)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card shadow-card overflow-hidden">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-ink-faint text-xs uppercase tracking-wide border-b border-surface-border">
            <th className="px-5 py-3 font-medium">Lead</th>
            <th className="px-5 py-3 font-medium">Source</th>
            <th className="px-5 py-3 font-medium">AI Score</th>
            <th className="px-5 py-3 font-medium">Status</th>
            <th className="px-5 py-3 font-medium">Owner</th>
          </tr>
        </thead>
        <tbody>
          {loading &&
            Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="border-b border-surface-border last:border-0">
                <td className="px-5 py-3.5">
                  <Skeleton className="h-4 w-32 mb-1.5" />
                  <Skeleton className="h-3 w-20" />
                </td>
                <td className="px-5 py-3.5"><Skeleton className="h-4 w-20" /></td>
                <td className="px-5 py-3.5"><Skeleton className="h-1.5 w-24" /></td>
                <td className="px-5 py-3.5"><Skeleton className="h-5 w-16 rounded-full" /></td>
                <td className="px-5 py-3.5"><Skeleton className="h-4 w-24" /></td>
              </tr>
            ))}

          {!loading &&
            leads.map((lead) => (
              <tr key={lead.id} className="border-b border-surface-border last:border-0 hover:bg-surface/60 fade-in">
                <td className="px-5 py-3.5">
                  <p className="font-medium text-ink">{lead.name}</p>
                  <p className="text-xs text-ink-faint">{lead.company}</p>
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{lead.source}</td>
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <div className="h-1.5 w-16 rounded-full bg-surface">
                      <div
                        className="h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${lead.score}%`, backgroundColor: scoreColor(lead.score) }}
                      />
                    </div>
                    <span className="text-xs font-medium text-ink-soft">{lead.score}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5">
                  <Badge label={lead.status === "Qualified" ? "Customer" : lead.status === "Contacted" ? "Follow-up" : "Lead"} />
                </td>
                <td className="px-5 py-3.5 text-ink-soft">{lead.owner}</td>
              </tr>
            ))}

          {!loading && leads.length === 0 && (
            <tr>
              <td colSpan={5} className="px-5 py-8 text-center text-ink-faint">
                No leads yet.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
