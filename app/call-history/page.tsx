import { CallHistoryTable } from "@/components/voice-agent/CallHistoryTable";

export default function CallHistoryPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-ink">Call History</h1>
        <p className="text-sm text-ink-faint mt-1">
          Every AI voice agent call, with outcome and transcript.
        </p>
      </div>
      <CallHistoryTable />
    </div>
  );
}
