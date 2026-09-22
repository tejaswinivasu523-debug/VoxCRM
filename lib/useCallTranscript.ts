"use client";

import { useEffect, useRef, useState } from "react";
import { TranscriptLine } from "./types";

/**
 * Live call transcript via WebSocket.
 *
 * Set NEXT_PUBLIC_WS_URL (e.g. wss://api.example.com/ws) once the backend's
 * voice agent service exposes a socket at `${WS_URL}/calls/:callId/transcript`
 * that pushes JSON messages shaped like { speaker, text, time }.
 *
 * Until that exists, this hook transparently falls back to a simulated
 * stream so the screen still feels live during frontend development. The
 * component consuming this hook doesn't need to know which mode it's in —
 * it just gets `lines` that grow over time and a `status` to show a small
 * indicator.
 */

const WS_URL = process.env.NEXT_PUBLIC_WS_URL;

const SIMULATED_SCRIPT: Omit<TranscriptLine, "time">[] = [
  { speaker: "AI", text: "Hello! Thank you for calling ABC Solutions. How can I help you today?" },
  { speaker: "Customer", text: "Hi, I wanted to know more about your premium plan and pricing details." },
  { speaker: "AI", text: "Sure! I'd be happy to help you with that. Let me first understand your requirements a bit better." },
  { speaker: "Customer", text: "We have about 20 sales reps and need CRM plus call analytics." },
  { speaker: "AI", text: "Got it. Our premium plan covers unlimited call minutes and full analytics for teams up to 25 seats." },
  { speaker: "Customer", text: "That sounds good. What about the implementation timeline?" },
  { speaker: "AI", text: "Typical rollout takes 3 to 5 business days, including CRM data migration." },
];

export type TranscriptStatus = "connecting" | "live" | "simulated" | "closed";

function timestamp() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function useCallTranscript(callId: string) {
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [status, setStatus] = useState<TranscriptStatus>("connecting");

  useEffect(() => {
    let cancelled = false;
    let simTimer: ReturnType<typeof setInterval> | null = null;
    let simIndex = 0;
    const wentLive = { current: false };

    function startSimulation() {
      if (cancelled) return;
      setStatus("simulated");
      simTimer = setInterval(() => {
        if (simIndex >= SIMULATED_SCRIPT.length) {
          if (simTimer) clearInterval(simTimer);
          return;
        }
        const next = SIMULATED_SCRIPT[simIndex];
        simIndex += 1;
        setLines((prev) => [...prev, { ...next, time: timestamp() }]);
      }, 3000);
    }

    if (!WS_URL) {
      startSimulation();
      return () => {
        cancelled = true;
        if (simTimer) clearInterval(simTimer);
      };
    }

    let socket: WebSocket;
    try {
      socket = new WebSocket(`${WS_URL}/calls/${callId}/transcript`);
    } catch {
      startSimulation();
      return () => {
        cancelled = true;
        if (simTimer) clearInterval(simTimer);
      };
    }

    const connectTimeout = setTimeout(() => {
      if (socket.readyState !== WebSocket.OPEN) socket.close();
    }, 2500);

    socket.onopen = () => {
      clearTimeout(connectTimeout);
      wentLive.current = true;
      if (!cancelled) setStatus("live");
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data) as TranscriptLine;
        if (!cancelled) setLines((prev) => [...prev, data]);
      } catch {
        // ignore malformed frame
      }
    };

    socket.onerror = () => socket.close();

    socket.onclose = () => {
      clearTimeout(connectTimeout);
      if (cancelled) return;
      if (wentLive.current) {
        setStatus("closed");
      } else {
        startSimulation();
      }
    };

    return () => {
      cancelled = true;
      clearTimeout(connectTimeout);
      socket.close();
      if (simTimer) clearInterval(simTimer);
    };
  }, [callId]);

  return { lines, status };
}
