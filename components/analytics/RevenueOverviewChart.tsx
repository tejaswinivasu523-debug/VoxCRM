"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { revenueByMonth } from "@/lib/data";

export function RevenueOverviewChart() {
  return (
    <div className="h-56">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={revenueByMonth} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#EFEFF6" />
          <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#9799AB", fontSize: 12 }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fill: "#9799AB", fontSize: 12 }} tickFormatter={(v) => `₹${v}L`} />
          <Tooltip
            formatter={(value: number) => [`₹${value}L`, "Revenue"]}
            contentStyle={{ borderRadius: 12, border: "1px solid #E9E9F2", fontSize: 12 }}
          />
          <Bar dataKey="revenue" fill="#7C6CF0" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
