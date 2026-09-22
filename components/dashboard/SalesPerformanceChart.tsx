"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { RevenuePoint } from "@/lib/types";

export function SalesPerformanceChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid vertical={false} stroke="#EFEFF6" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9799AB", fontSize: 12 }}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#9799AB", fontSize: 12 }}
            tickFormatter={(v) => `₹${v}L`}
          />
          <Tooltip
            formatter={(value: number) => [`₹${value}L`, "Revenue"]}
            contentStyle={{
              borderRadius: 12,
              border: "1px solid #E9E9F2",
              fontSize: 12,
            }}
          />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#7C6CF0"
            strokeWidth={2.5}
            dot={{ r: 3, fill: "#7C6CF0" }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
