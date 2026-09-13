"use client";

import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { leadSources } from "@/lib/data";

export function LeadSourcesDonut() {
  const total = leadSources.reduce((sum, s) => sum + s.value, 0);

  return (
    <div className="flex items-center gap-5">
      <div className="h-32 w-32 shrink-0 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={leadSources}
              dataKey="value"
              innerRadius={38}
              outerRadius={58}
              paddingAngle={2}
              stroke="none"
            >
              {leadSources.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <p className="text-lg font-bold text-ink leading-none">{total}</p>
          <p className="text-[10px] text-ink-faint mt-0.5">Leads</p>
        </div>
      </div>

      <ul className="space-y-2 text-sm">
        {leadSources.map((s) => (
          <li key={s.name} className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
            <span className="text-ink-soft">{s.name}</span>
            <span className="text-ink-faint text-xs">{s.value}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
