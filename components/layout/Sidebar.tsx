"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import {
  LayoutDashboard,
  Users,
  Target,
  Handshake,
  Mic,
  PhoneCall,
  CheckSquare,
  BarChart3,
  Sparkles,
  Settings,
  AudioLines,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/leads", label: "Leads", icon: Target },
  { href: "/deals", label: "Deals", icon: Handshake },
  { href: "/voice-agent", label: "AI Voice Agent", icon: Mic, live: true },
  { href: "/call-history", label: "Call History", icon: PhoneCall },
  { href: "/tasks", label: "Tasks & Follow-ups", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 shrink-0 flex-col bg-sidebar text-white/80 min-h-screen sticky top-0">
      <div className="flex items-center gap-2 px-6 py-6">
        <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
          <AudioLines size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-semibold leading-none">VoxCRM</p>
          <p className="text-[11px] text-white/40 mt-1">AI-Powered. People-Centered.</p>
        </div>
      </div>

      <nav className="flex-1 px-3 mt-2 space-y-1">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
                active
                  ? "bg-brand-500 text-white"
                  : "text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <span className="flex items-center gap-3">
                <Icon size={17} />
                {item.label}
              </span>
              {item.live && (
                <span className="text-[10px] font-semibold bg-good/20 text-good px-2 py-0.5 rounded-full">
                  Live
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="px-3 pb-3">
        <Link
          href="/settings"
          className={clsx(
            "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors",
            pathname === "/settings"
              ? "bg-brand-500 text-white"
              : "text-white/60 hover:bg-white/5 hover:text-white"
          )}
        >
          <Settings size={17} />
          Settings
        </Link>
      </div>

      <div className="m-3 rounded-2xl bg-sidebar-light border border-sidebar-border p-4">
        <Sparkles size={18} className="text-brand-300 mb-2" />
        <p className="text-white text-sm font-semibold">Upgrade to Pro</p>
        <p className="text-xs text-white/40 mt-1 leading-relaxed">
          Get advanced AI insights, more call minutes and priority support.
        </p>
        <button className="w-full mt-3 rounded-lg bg-brand-500 hover:bg-brand-600 transition-colors text-white text-sm font-medium py-2">
          Upgrade
        </button>
      </div>
    </aside>
  );
}
