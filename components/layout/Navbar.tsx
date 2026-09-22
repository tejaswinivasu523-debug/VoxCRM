"use client";

import { Search, Sun, Bell, Menu } from "lucide-react";

export function Navbar({ onMenuClick }: { onMenuClick?: () => void }) {
  return (
    <header className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-surface-border bg-surface-card/80 backdrop-blur px-4 lg:px-6 py-3.5">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={onMenuClick}
          className="lg:hidden h-9 w-9 flex items-center justify-center rounded-lg border border-surface-border text-ink-soft"
          aria-label="Open menu"
        >
          <Menu size={18} />
        </button>
        <div className="relative w-full max-w-sm">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-faint"
          />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full rounded-xl border border-surface-border bg-surface pl-9 pr-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:outline-none focus:ring-2 focus:ring-brand-300"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="h-9 w-9 flex items-center justify-center rounded-lg border border-surface-border text-ink-soft hover:bg-surface"
          aria-label="Toggle theme"
        >
          <Sun size={17} />
        </button>
        <button
          className="relative h-9 w-9 flex items-center justify-center rounded-lg border border-surface-border text-ink-soft hover:bg-surface"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-bad" />
        </button>
        <div className="flex items-center gap-2 pl-2 border-l border-surface-border">
          <div className="h-9 w-9 rounded-full bg-brand-500 text-white flex items-center justify-center text-sm font-semibold">
            A
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-ink leading-none">Admin</p>
            <p className="text-xs text-ink-faint mt-0.5">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  );
}
