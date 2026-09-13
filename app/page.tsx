"use client";

import { useEffect, useState } from "react";
import { Users, Target, IndianRupee, Percent } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { SalesPerformanceChart } from "@/components/dashboard/SalesPerformanceChart";
import { LeadPipeline } from "@/components/dashboard/LeadPipeline";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { AskAICard } from "@/components/dashboard/AskAICard";
import { getDashboardSummary } from "@/lib/api";
import { DashboardSummary } from "@/lib/types";

function StatCardSkeleton() {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card shadow-card p-5 space-y-3">
      <Skeleton className="h-9 w-9 rounded-xl" />
      <div className="space-y-1.5">
        <Skeleton className="h-3 w-20" />
        <Skeleton className="h-6 w-24" />
      </div>
      <Skeleton className="h-3 w-28" />
    </div>
  );
}

function ActivitySkeleton() {
  return (
    <div className="space-y-4">
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className="space-y-1.5">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-3 w-2/3" />
        </div>
      ))}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardSummary | null>(null);

  useEffect(() => {
    getDashboardSummary().then(setData);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Good morning, Admin 👋</h1>
        <p className="text-sm text-ink-faint mt-1">
          Here&apos;s what&apos;s happening with your business today.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {!data ? (
          Array.from({ length: 4 }).map((_, i) => <StatCardSkeleton key={i} />)
        ) : (
          <div className="contents fade-in">
            <StatCard
              icon={Users}
              iconColor="#3E8BFF"
              label="Total Contacts"
              value={data.stats.totalContacts}
              delta={data.stats.contactsDelta}
              deltaLabel="from last week"
            />
            <StatCard
              icon={Target}
              iconColor="#7C6CF0"
              label="New Leads"
              value={data.stats.newLeads}
              delta={data.stats.leadsDelta}
              deltaLabel="from last week"
            />
            <StatCard
              icon={IndianRupee}
              iconColor="#1FAE73"
              label="Revenue"
              value={data.stats.revenue}
              delta={data.stats.revenueDelta}
              deltaLabel="from last week"
            />
            <StatCard
              icon={Percent}
              iconColor="#F2A93B"
              label="Conversion Rate"
              value={data.stats.conversionRate}
              delta={data.stats.conversionDelta}
              deltaLabel="from last week"
            />
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader
            title="Sales Performance"
            subtitle="Revenue generated (last 6 months)"
            action={
              <span className="text-xs font-medium text-brand-600 bg-brand-50 px-3 py-1.5 rounded-lg">
                Revenue
              </span>
            }
          />
          {!data ? (
            <Skeleton className="h-64 w-full" />
          ) : (
            <div className="fade-in">
              <SalesPerformanceChart data={data.revenueByMonth} />
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Lead Pipeline" action={<a href="/leads" className="text-xs text-brand-600 font-medium">View all →</a>} />
          {!data ? (
            <div className="space-y-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full" />
              ))}
            </div>
          ) : (
            <div className="fade-in">
              <LeadPipeline stages={data.pipeline} />
            </div>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader title="Recent Activities" action={<a href="/tasks" className="text-xs text-brand-600 font-medium">View all →</a>} />
          {!data ? <ActivitySkeleton /> : (
            <div className="fade-in">
              <ActivityList items={data.recentActivities} />
            </div>
          )}
        </Card>

        <Card>
          <CardHeader title="Upcoming Follow-ups" action={<a href="/tasks" className="text-xs text-brand-600 font-medium">View all →</a>} />
          {!data ? <ActivitySkeleton /> : (
            <div className="fade-in">
              <ActivityList items={data.upcomingFollowUps} />
            </div>
          )}
        </Card>

        <AskAICard />
      </div>
    </div>
  );
}

