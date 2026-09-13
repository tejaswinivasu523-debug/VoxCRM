"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, AudioLines } from "lucide-react";
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
  Settings,
} from "lucide-react";

const NAV = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/contacts", label: "Contacts", icon: Users },
  { href: "/leads", label: "Leads", icon: Target },
  { href: "/deals", label: "Deals", icon: Handshake },
  { href: "/voice-agent", label: "AI Voice Agent", icon: Mic },
  { href: "/call-history", label: "Call History", icon: PhoneCall },
  { href: "/tasks", label: "Tasks & Follow-ups", icon: CheckSquare },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function MobileSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <aside className="absolute left-0 top-0 h-full w-72 bg-sidebar text-white/80 flex flex-col">
        <div className="flex items-center justify-between px-5 py-5">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-brand-500 flex items-center justify-center">
              <AudioLines size={18} className="text-white" />
            </div>
            <p className="text-white font-semibold">VoxCRM</p>
          </div>
          <button onClick={onClose} aria-label="Close menu" className="text-white/60">
            <X size={20} />
          </button>
        </div>
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {NAV.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={clsx(
                  "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm",
                  active ? "bg-brand-500 text-white" : "text-white/60 hover:bg-white/5"
                )}
              >
                <Icon size={17} />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
