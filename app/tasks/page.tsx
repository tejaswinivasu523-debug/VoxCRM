import { Card, CardHeader } from "@/components/ui/Card";
import { ActivityList } from "@/components/dashboard/ActivityList";
import { recentActivities, upcomingFollowUps } from "@/lib/data";

export default function TasksPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Tasks &amp; Follow-ups</h1>
        <p className="text-sm text-ink-faint mt-1">Everything on your plate, in one view.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader title="Recent Activities" />
          <ActivityList items={recentActivities} />
        </Card>
        <Card>
          <CardHeader title="Upcoming Follow-ups" />
          <ActivityList items={upcomingFollowUps} />
        </Card>
      </div>
    </div>
  );
}
