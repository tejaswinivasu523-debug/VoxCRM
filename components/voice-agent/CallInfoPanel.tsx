import { Info, TrendingUp, ArrowRight } from "lucide-react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { TranscriptLine, CallSummary } from "@/lib/types";

function deriveSummary(lines: TranscriptLine[]): CallSummary {
  if (lines.length === 0) {
    return {
      intent: "Assessing Interest",
      sentiment: "Neutral",
      nextAction: "Waiting for conversation to begin",
      summary: "The call hasn't produced any transcript yet.",
    };
  }

  const customerText = lines
    .filter((l) => l.speaker === "Customer")
    .map((l) => l.text.toLowerCase())
    .join(" ");

  let intent = "Assessing Interest";
  let sentiment: CallSummary["sentiment"] = "Neutral";
  let nextAction = "Continue the conversation";

  if (customerText.includes("pricing") || customerText.includes("plan")) {
    intent = "High Purchase Intent";
    sentiment = "Interested";
    nextAction = "Schedule a follow-up call";
  }
  if (customerText.includes("timeline") || customerText.includes("implementation")) {
    nextAction = "Send implementation timeline doc";
  }
  if (customerText.includes("not interested") || customerText.includes("no thanks")) {
    intent = "Low Purchase Intent";
    sentiment = "Not Interested";
    nextAction = "Log outcome and close";
  }

  return {
    intent,
    sentiment,
    nextAction,
    summary:
      "Customer is interested in the premium plan. Asked about pricing, features and implementation timeline.",
  };
}

export function CallInfoPanel({ transcript }: { transcript: TranscriptLine[] }) {
  const summary = deriveSummary(transcript);

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader title="Call Information" action={<Info size={15} className="text-ink-faint" />} />
        <dl className="space-y-3 text-sm">
          {[
            ["Customer", "Rahul Sharma"],
            ["Phone", "+91 98765 43210"],
            ["Start Time", "10 Jun 2026, 10:42 AM"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-center justify-between">
              <dt className="text-ink-faint">{k}</dt>
              <dd className="text-ink font-medium">{v}</dd>
            </div>
          ))}
          <div className="flex items-center justify-between">
            <dt className="text-ink-faint">Status</dt>
            <dd>
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-good">
                <span className="h-1.5 w-1.5 rounded-full bg-good animate-pulse" />
                In Progress
              </span>
            </dd>
          </div>
        </dl>
      </Card>

      <Card>
        <CardHeader title="AI Summary" />
        <p className="text-sm text-ink-soft leading-relaxed transition-opacity duration-300">
          {summary.summary}
        </p>
        <div className="mt-4 space-y-2.5 text-sm">
          <div className="flex items-center justify-between">
            <span className="text-ink-faint flex items-center gap-1.5">
              <TrendingUp size={14} /> Intent
            </span>
            <span
              className={`text-xs font-medium px-2.5 py-1 rounded-full transition-colors ${
                summary.sentiment === "Interested"
                  ? "bg-good/10 text-good"
                  : summary.sentiment === "Not Interested"
                  ? "bg-bad/10 text-bad"
                  : "bg-ink/5 text-ink-soft"
              }`}
            >
              {summary.intent}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-faint">Sentiment</span>
            <Badge label={summary.sentiment} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-ink-faint">Next Action</span>
            <span className="text-xs font-medium text-ink text-right max-w-[140px]">{summary.nextAction}</span>
          </div>
        </div>
        <button className="mt-4 text-xs font-medium text-brand-600 flex items-center gap-1">
          View Full Analysis <ArrowRight size={13} />
        </button>
      </Card>
    </div>
  );
}
