"use client";

import { useEffect, useRef } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { TranscriptLine } from "@/lib/types";
import { TranscriptStatus } from "@/lib/useCallTranscript";

function StatusPill({ status }: { status: TranscriptStatus }) {
  if (status === "connecting") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-faint animate-pulse" />
        Connecting...
      </span>
    );
  }
  if (status === "live") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-good">
        <span className="h-1.5 w-1.5 rounded-full bg-good animate-pulse" />
        Live
      </span>
    );
  }
  if (status === "simulated") {
    return (
      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-brand-600">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500 animate-pulse" />
        Live (demo feed)
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-ink-faint">
      <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
      Ended
    </span>
  );
}

export function LiveTranscript({
  lines,
  status,
}: {
  lines: TranscriptLine[];
  status: TranscriptStatus;
}) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines.length]);

  return (
    <Card>
      <CardHeader title="Live Transcript" action={<StatusPill status={status} />} />
      <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
        {lines.length === 0 && (
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="flex items-start gap-3">
                <Skeleton className="h-7 w-7 rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        )}

        {lines.map((line, i) => (
          <div key={i} className="flex items-start gap-3 fade-in">
            <div
              className={`h-7 w-7 shrink-0 rounded-full flex items-center justify-center text-[10px] font-semibold text-white ${
                line.speaker === "AI" ? "bg-brand-500" : "bg-info"
              }`}
            >
              {line.speaker === "AI" ? "AI" : "C"}
            </div>
            <div className="flex-1">
              <p className="text-xs font-medium text-ink-soft mb-0.5">
                {line.speaker === "AI" ? "AI Agent" : "Customer"}
              </p>
              <p className="text-sm text-ink leading-relaxed">{line.text}</p>
            </div>
            <span className="text-xs text-ink-faint whitespace-nowrap">{line.time}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
    </Card>
  );
}
