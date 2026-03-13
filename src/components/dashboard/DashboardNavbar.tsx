import { Activity, Circle } from "lucide-react";
import type { ServiceHealth } from "@/types/monitoring";

interface Props {
  services: ServiceHealth[];
}

export function DashboardNavbar({ services }: Props) {
  const downCount = services.filter((s) => s.status === "down").length;
  const hasWarning = services.some((s) => s.status === "warning");
  const statusLabel = downCount > 2 ? "Critical" : downCount > 0 ? "Degraded" : hasWarning ? "Partial Issues" : "Operational";
  const statusColor = downCount > 2 ? "text-down" : downCount > 0 ? "text-down" : hasWarning ? "text-warning" : "text-healthy";
  const dotColor = downCount > 2 ? "fill-down text-down" : downCount > 0 ? "fill-down text-down" : hasWarning ? "fill-warning text-warning" : "fill-healthy text-healthy";

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b">
      <div className="flex items-center justify-between px-6 py-3 max-w-[1400px] mx-auto w-full">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary/10">
            <Activity className="h-4 w-4 text-primary" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold tracking-tight leading-none">Service Health Monitor</span>
            <span className="text-[10px] text-muted-foreground mt-0.5">Infrastructure Overview</span>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <span className="font-mono text-xs text-muted-foreground tabular-nums">
            {new Date().toLocaleTimeString("en-US", { hour12: false })}
          </span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-secondary">
            <Circle className={`h-2 w-2 ${dotColor} animate-pulse-dot`} />
            <span className={`text-[11px] font-medium ${statusColor}`}>{statusLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
}
