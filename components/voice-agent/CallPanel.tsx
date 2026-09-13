"use client";

import { useEffect, useRef, useState } from "react";
import { Mic, MicOff, Pause, Play, Grid3x3, PhoneOff, Phone } from "lucide-react";
import { Card } from "@/components/ui/Card";

function formatTime(totalSeconds: number) {
  const h = Math.floor(totalSeconds / 3600);
  const m = Math.floor((totalSeconds % 3600) / 60);
  const s = totalSeconds % 60;
  return [h, m, s].map((v) => String(v).padStart(2, "0")).join(":");
}

export function CallPanel() {
  const [seconds, setSeconds] = useState(167); // starts at 00:02:47 like the mock
  const [muted, setMuted] = useState(false);
  const [paused, setPaused] = useState(false);
  const [ended, setEnded] = useState(false);
  const [showKeypad, setShowKeypad] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (paused || ended) return;
    intervalRef.current = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [paused, ended]);

  function handleEndCall() {
    setEnded(true);
    setPaused(true);
  }

  function handleRestart() {
    setEnded(false);
    setPaused(false);
    setMuted(false);
    setSeconds(0);
  }

  return (
    <Card className="flex flex-col items-center text-center py-10">
      <div className="relative h-28 w-28 flex items-center justify-center mb-5">
        {!ended && (
          <>
            <span className="absolute inset-0 rounded-full bg-brand-500/10 animate-pulse" />
            <span className="absolute inset-3 rounded-full bg-brand-500/15" />
          </>
        )}
        <span
          className={`relative h-14 w-14 rounded-full flex items-center justify-center text-white ${
            ended ? "bg-bad" : "bg-brand-500"
          }`}
        >
          {ended ? <PhoneOff size={22} /> : muted ? <MicOff size={22} /> : <Mic size={22} />}
        </span>
      </div>

      <p className="text-sm font-semibold text-ink">
        {ended ? "Call ended" : paused ? "Call paused" : muted ? "Mic muted" : "AI Agent is speaking..."}
      </p>
      <p className="text-2xl font-bold text-ink mt-1 tabular-nums">{formatTime(seconds)}</p>

      <div className="flex items-center justify-center gap-1 mt-4 h-6">
        {[6, 12, 18, 10, 20, 8, 14, 22, 9, 16].map((h, i) => (
          <span
            key={i}
            className={`w-1 rounded-full ${ended || paused ? "bg-surface-border" : "bg-brand-300 animate-pulse"}`}
            style={{ height: `${h}px`, animationDelay: `${i * 80}ms` }}
          />
        ))}
      </div>

      {showKeypad && !ended && (
        <div className="grid grid-cols-3 gap-2 mt-6 w-48">
          {["1", "2", "3", "4", "5", "6", "7", "8", "9", "*", "0", "#"].map((k) => (
            <button
              key={k}
              className="h-10 rounded-lg border border-surface-border text-sm text-ink hover:bg-surface"
            >
              {k}
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4 mt-8">
        {!ended ? (
          <>
            <button
              onClick={() => setMuted((m) => !m)}
              className={`flex flex-col items-center gap-1.5 ${muted ? "text-brand-600" : "text-ink-soft"}`}
            >
              <span
                className={`h-11 w-11 rounded-full border flex items-center justify-center ${
                  muted ? "border-brand-500 bg-brand-50" : "border-surface-border"
                }`}
              >
                {muted ? <MicOff size={17} /> : <Mic size={17} />}
              </span>
              <span className="text-xs">{muted ? "Unmute" : "Mute"}</span>
            </button>
            <button
              onClick={() => setPaused((p) => !p)}
              className={`flex flex-col items-center gap-1.5 ${paused ? "text-brand-600" : "text-ink-soft"}`}
            >
              <span
                className={`h-11 w-11 rounded-full border flex items-center justify-center ${
                  paused ? "border-brand-500 bg-brand-50" : "border-surface-border"
                }`}
              >
                {paused ? <Play size={17} /> : <Pause size={17} />}
              </span>
              <span className="text-xs">{paused ? "Resume" : "Pause"}</span>
            </button>
            <button
              onClick={() => setShowKeypad((k) => !k)}
              className={`flex flex-col items-center gap-1.5 ${showKeypad ? "text-brand-600" : "text-ink-soft"}`}
            >
              <span
                className={`h-11 w-11 rounded-full border flex items-center justify-center ${
                  showKeypad ? "border-brand-500 bg-brand-50" : "border-surface-border"
                }`}
              >
                <Grid3x3 size={17} />
              </span>
              <span className="text-xs">Keypad</span>
            </button>
            <button onClick={handleEndCall} className="flex flex-col items-center gap-1.5 text-bad">
              <span className="h-11 w-11 rounded-full bg-bad flex items-center justify-center text-white">
                <PhoneOff size={17} />
              </span>
              <span className="text-xs">End Call</span>
            </button>
          </>
        ) : (
          <button
            onClick={handleRestart}
            className="flex items-center gap-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-medium px-4 py-2.5"
          >
            <Phone size={15} />
            Start New Call
          </button>
        )}
      </div>
    </Card>
  );
}
