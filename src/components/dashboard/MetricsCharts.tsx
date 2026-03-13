import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from "recharts";
import type { MetricsSnapshot } from "@/types/monitoring";

const charts: { key: keyof MetricsSnapshot; label: string; color: string; gradient: string; unit: string }[] = [
  { key: "cpu", label: "CPU Usage", color: "hsl(210, 100%, 56%)", gradient: "cpu", unit: "%" },
  { key: "memory", label: "Memory", color: "hsl(152, 69%, 45%)", gradient: "memory", unit: "%" },
  { key: "requests", label: "Requests / min", color: "hsl(36, 100%, 50%)", gradient: "requests", unit: "" },
  { key: "errorRate", label: "Error Rate", color: "hsl(0, 72%, 51%)", gradient: "errorRate", unit: "%" },
];

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-md border bg-card px-3 py-2 shadow-lg">
      <p className="text-[10px] text-muted-foreground mb-1">{label}</p>
      <p className="text-xs font-mono font-medium">{payload[0].value}</p>
    </div>
  );
}

export function MetricsCharts({ data }: { data: MetricsSnapshot[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
      {charts.map((c) => (
        <div key={c.key} className="rounded-lg border bg-card p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-medium text-muted-foreground">{c.label}</span>
            {data.length > 0 && (
              <span className="font-mono text-xs font-semibold tabular-nums" style={{ color: c.color }}>
                {data[data.length - 1][c.key]}{c.unit}
              </span>
            )}
          </div>
          <div className="h-32">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id={`fill-${c.gradient}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={c.color} stopOpacity={0.2} />
                    <stop offset="100%" stopColor={c.color} stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 16%, 16%)" vertical={false} />
                <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(220,10%,42%)" }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fontSize: 9, fill: "hsl(220,10%,42%)" }} tickLine={false} axisLine={false} width={30} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey={c.key}
                  stroke={c.color}
                  strokeWidth={1.5}
                  fill={`url(#fill-${c.gradient})`}
                  dot={false}
                  isAnimationActive={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      ))}
    </div>
  );
}
