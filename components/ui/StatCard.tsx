import { LucideIcon } from "lucide-react";
import { Card } from "./Card";
import clsx from "clsx";

export function StatCard({
  icon: Icon,
  iconColor,
  label,
  value,
  delta,
  deltaLabel,
  positive,
}: {
  icon: LucideIcon;
  iconColor: string;
  label: string;
  value: string;
  delta: string;
  deltaLabel: string;
  positive?: boolean;
}) {
  const isPositive = positive ?? (delta.startsWith("+") || delta.startsWith("\u2191"));
  return (
    <Card className="flex flex-col gap-3">
      <div
        className="h-9 w-9 rounded-xl flex items-center justify-center"
        style={{ backgroundColor: `${iconColor}1A` }}
      >
        <Icon size={18} color={iconColor} />
      </div>
      <div>
        <p className="text-xs text-ink-faint">{label}</p>
        <p className="text-2xl font-bold text-ink mt-0.5">{value}</p>
      </div>
      <p className="text-xs">
        <span className={clsx("font-semibold", isPositive ? "text-good" : "text-bad")}>
          {delta}
        </span>{" "}
        <span className="text-ink-faint">{deltaLabel}</span>
      </p>
    </Card>
  );
}
