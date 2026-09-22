"use client";

import { Bot, ArrowRight, User } from "lucide-react";
import { useState } from "react";

interface Message {
  role: "user" | "ai";
  text: string;
}

function generateReply(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("revenue") || p.includes("sales")) {
    return "Revenue is at ₹12.4L this month, up 24% from last week. Want a breakdown by product line?";
  }
  if (p.includes("lead")) {
    return "You have 186 new leads this week, 18% up from last week. 63 are AI-qualified as high intent.";
  }
  if (p.includes("email") || p.includes("draft")) {
    return "Sure — tell me the recipient and the goal of the email and I'll draft it for you.";
  }
  if (p.includes("call") || p.includes("voice")) {
    return "Your AI Voice Agent handled 5 calls today. 3 were marked Interested, 2 need follow-up.";
  }
  return "Got it — here's a quick take based on your current pipeline. Ask me about revenue, leads, or calls for more detail.";
}

export function AskAICard() {
  const [value, setValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [thinking, setThinking] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const prompt = value.trim();
    if (!prompt) return;
    setMessages((m) => [...m, { role: "user", text: prompt }]);
    setValue("");
    setThinking(true);
    setTimeout(() => {
      setMessages((m) => [...m, { role: "ai", text: generateReply(prompt) }]);
      setThinking(false);
    }, 700);
  }

  return (
    <div className="rounded-2xl bg-gradient-to-br from-brand-500 to-brand-700 p-5 text-white flex flex-col h-full">
      <div>
        <div className="h-9 w-9 rounded-xl bg-white/15 flex items-center justify-center mb-3">
          <Bot size={18} />
        </div>
        <p className="font-semibold">Ask AI Assistant</p>
        <p className="text-xs text-white/70 mt-1 leading-relaxed">
          Get insights, draft emails, analyze leads and more...
        </p>
      </div>

      {messages.length > 0 && (
        <div className="mt-3 flex-1 space-y-2 max-h-40 overflow-y-auto pr-1">
          {messages.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-xs">
              <span className="h-5 w-5 shrink-0 rounded-full bg-white/15 flex items-center justify-center">
                {m.role === "ai" ? <Bot size={11} /> : <User size={11} />}
              </span>
              <p className="text-white/90 leading-snug">{m.text}</p>
            </div>
          ))}
          {thinking && <p className="text-xs text-white/60 pl-7">Thinking...</p>}
        </div>
      )}

      <form className="mt-4 flex items-center gap-2" onSubmit={handleSubmit}>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 rounded-xl bg-white/15 placeholder:text-white/60 text-sm px-3 py-2 focus:outline-none focus:ring-2 focus:ring-white/40"
        />
        <button
          type="submit"
          aria-label="Send"
          className="h-9 w-9 shrink-0 rounded-xl bg-white text-brand-600 flex items-center justify-center disabled:opacity-50"
          disabled={!value.trim()}
        >
          <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
