import { Search, PhoneCall } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { callHistory } from "@/lib/data";

export function CallHistoryTable() {
  return (
    <div className="rounded-2xl border border-surface-border bg-surface-card shadow-card overflow-hidden">
      <div className="flex items-center justify-between p-5 border-b border-surface-border">
        <div className="relative w-full max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint" />
          <input
            placeholder="Search calls..."
            className="w-full rounded-xl border border-surface-border bg-surface pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
        <select className="rounded-xl border border-surface-border bg-surface text-sm px-3 py-2 text-ink-soft">
          <option>All outcomes</option>
          <option>Interested</option>
          <option>Follow-up</option>
          <option>Not Interested</option>
        </select>
      </div>

      <div className="divide-y divide-surface-border">
        {callHistory.map((call) => (
          <div key={call.id} className="flex items-center justify-between gap-4 px-5 py-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="h-9 w-9 rounded-full bg-brand-50 text-brand-600 flex items-center justify-center shrink-0">
                <PhoneCall size={15} />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-ink truncate">{call.name}</p>
                <p className="text-xs text-ink-faint">{call.phone}</p>
              </div>
            </div>
            <div className="hidden sm:block text-xs text-ink-faint w-32">{call.timestamp}</div>
            <div className="text-sm text-ink-soft w-14 text-right">{call.duration}</div>
            <div className="w-28 flex justify-end">
              <Badge label={call.outcome} />
            </div>
            <button className="text-xs font-medium text-brand-600 whitespace-nowrap">
              View Transcript →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
