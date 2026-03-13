import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import type { MetricsSnapshot } from "@/types/monitoring";

const charts: { key: keyof MetricsSnapshot; label: string; color: string; unit: string }[] = [
  { key: "cpu", label: "CPU Usage", color: "hsl(217, 91%, 60%)", unit: "%" },
  { key: "memory", label: "Memory Usage", color: "hsl(160, 84%, 39%)", unit: "%" },
  { key: "requests", label: "Requests / min", color: "hsl(38, 92%, 50%)", unit: "" },
  { key: "errorRate", label: "Error Rate", color: "hsl(0, 84%, 60%)", unit: "%" },
];

export function MetricsCharts({ data }: { data: MetricsSnapshot[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
      {charts.map((c) => (
        <div key={c.key} className="rounded-lg border bg-card p-4">
          <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
            {c.label}
          </h3>
          <div className="h-36">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(215,21%,65%)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 10, fill: "hsl(215,21%,65%)" }} tickLine={false} axisLine={false} width={30} />
                <Tooltip
                  contentStyle={{ background: "hsl(217,33%,17%)", border: "1px solid hsl(217,33%,22%)", borderRadius: 4, fontSize: 12 }}
                  labelStyle={{ color: "hsl(215,21%,65%)" }}
                />
                <Line
                  type="monotone"
                  dataKey={c.key}
                  stroke={c.color}
                  strokeWidth={2}
                  dot={false}
                  isAnimationActive={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
