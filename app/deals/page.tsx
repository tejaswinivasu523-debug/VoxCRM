import { DealsBoard } from "@/components/deals/DealsBoard";

export default function DealsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-ink">Sales Pipeline</h1>
          <p className="text-sm text-ink-faint mt-1">
            Drag deals across stages as they progress.
          </p>
        </div>
      </div>
      <DealsBoard />
    </div>
  );
}
