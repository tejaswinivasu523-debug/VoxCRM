import { Activity } from "@/lib/types";

export function ActivityList({ items }: { items: Activity[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item.id} className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm text-ink font-medium leading-snug">{item.title}</p>
            <p className="text-xs text-ink-faint mt-0.5">{item.subtitle}</p>
          </div>
          {item.time && (
            <span className="text-xs text-ink-faint whitespace-nowrap">{item.time}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
