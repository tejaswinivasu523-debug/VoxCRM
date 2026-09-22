import { topReps } from "@/lib/data";

export function TopRepsList() {
  return (
    <ol className="space-y-3">
      {topReps.map((rep, i) => (
        <li key={rep.name} className="flex items-center justify-between text-sm">
          <span className="flex items-center gap-2.5">
            <span className="h-5 w-5 rounded-full bg-surface text-ink-faint text-xs flex items-center justify-center font-medium">
              {i + 1}
            </span>
            <span className="text-ink">{rep.name}</span>
          </span>
          <span className="text-ink-faint text-xs">{rep.deals} deals</span>
        </li>
      ))}
    </ol>
  );
}
