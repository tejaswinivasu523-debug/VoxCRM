import { PipelineStage } from "@/lib/types";

export function LeadPipeline({ stages }: { stages: PipelineStage[] }) {
  return (
    <div className="space-y-4">
      {stages.map((stage) => (
        <div key={stage.id}>
          <div className="flex items-center justify-between text-sm mb-1.5">
            <span className="flex items-center gap-2 text-ink">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: stage.color }}
              />
              {stage.label}
            </span>
            <span className="text-ink-faint text-xs">
              {stage.count} &middot; {stage.percent}%
            </span>
          </div>
          <div className="h-1.5 rounded-full bg-surface">
            <div
              className="h-1.5 rounded-full"
              style={{
                width: `${Math.min(stage.percent * 3, 100)}%`,
                backgroundColor: stage.color,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
