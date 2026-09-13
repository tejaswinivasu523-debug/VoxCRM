"use client";

import { useEffect, useState } from "react";
import { Target, TrendingUp, Clock, Sparkles } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Skeleton } from "@/components/ui/Skeleton";
import { LeadsList } from "@/components/leads/LeadsList";
import { getLeadsStats } from "@/lib/api";
import { LeadsStats } from "@/lib/types";

function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card shadow-card p-5 space-y-3">
      <Skeleton className="h-9 w-9 rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

export default function LeadsPage() {
  const [stats, setStats] = useState<LeadsStats | null>(null);

  useEffect(() => {
    getLeadsStats().then(setStats);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Leads</h1>
        <p className="text-sm text-ink-faint mt-1">
          Track and prioritize leads using AI-driven scoring.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {!stats ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <div className="contents fade-in">
            <StatCard icon={Target} iconColor="#3E8BFF" label="Total Leads" value={stats.totalLeads} delta={stats.totalLeadsDelta} deltaLabel="from last week" />
            <StatCard icon={TrendingUp} iconColor="#1FAE73" label="Qualified" value={stats.qualified} delta={stats.qualifiedDelta} deltaLabel="from last week" />
            <StatCard icon={Clock} iconColor="#F2A93B" label="Avg. Response Time" value={stats.avgResponseTime} delta={stats.avgResponseTimeDelta} deltaLabel="from last week" positive />
            <StatCard icon={Sparkles} iconColor="#7C6CF0" label="AI Qualified" value={stats.aiQualified} delta={stats.aiQualifiedDelta} deltaLabel="from last week" />
          </div>
        )}
      </div>

      <LeadsList />
    </div>
  );
}
