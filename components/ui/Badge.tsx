import clsx from "clsx";

const styles: Record<string, string> = {
  Customer: "bg-good/10 text-good",
  Lead: "bg-info/10 text-info",
  Prospect: "bg-warn/10 text-warn",
  Interested: "bg-good/10 text-good",
  Neutral: "bg-ink/5 text-ink-soft",
  "Follow-up": "bg-brand-500/10 text-brand-600",
  "Not Interested": "bg-bad/10 text-bad",
  Won: "bg-good/10 text-good",
};

export function Badge({ label }: { label: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        styles[label] ?? "bg-ink/5 text-ink-soft"
      )}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {label}
    </span>
  );
}
