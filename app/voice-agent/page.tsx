"use client";

import { CallPanel } from "@/components/voice-agent/CallPanel";
import { LiveTranscript } from "@/components/voice-agent/LiveTranscript";
import { CallInfoPanel } from "@/components/voice-agent/CallInfoPanel";
import { useCallTranscript } from "@/lib/useCallTranscript";

export default function VoiceAgentPage() {
  const { lines, status } = useCallTranscript("current");

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-ink flex items-center gap-2">
            AI Voice Agent
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-good bg-good/10 px-2.5 py-1 rounded-full">
              <span className="h-1.5 w-1.5 rounded-full bg-good" />
              Online
            </span>
          </h1>
          <p className="text-sm text-ink-faint mt-1">Live call in progress.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="xl:col-span-2 space-y-4">
          <CallPanel />
          <LiveTranscript lines={lines} status={status} />
        </div>
        <CallInfoPanel transcript={lines} />
      </div>
    </div>
  );
}

