import { IndianRupee, Percent } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { Card, CardHeader } from "@/components/ui/Card";
import { RevenueOverviewChart } from "@/components/analytics/RevenueOverviewChart";
import { LeadSourcesDonut } from "@/components/analytics/LeadSourcesDonut";
import { TopRepsList } from "@/components/analytics/TopRepsList";

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Analytics</h1>
          <p className="text-sm text-ink-faint mt-1">Last 6 months performance overview.</p>
        </div>
        <select className="rounded-xl border border-surface-border bg-surface-card text-sm px-3 py-2 text-ink-soft">
          <option>Last 6 Months</option>
          <option>Last 3 Months</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <StatCard icon={IndianRupee} iconColor="#1FAE73" label="Total Revenue" value="₹12.4L" delta="↑ 24%" deltaLabel="vs last period" />
        <StatCard icon={Percent} iconColor="#7C6CF0" label="Conversion Rate" value="8.7%" delta="↑ 2.1%" deltaLabel="vs last period" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <Card className="xl:col-span-2">
          <CardHeader title="Revenue Overview" />
          <RevenueOverviewChart />
        </Card>
        <Card>
          <CardHeader title="Lead Sources" />
          <LeadSourcesDonut />
        </Card>
      </div>

      <Card>
        <CardHeader title="Top Sales Reps" />
        <TopRepsList />
      </Card>
    </div>
  );
}
