import { Activity } from "lucide-react";
import type { ServiceHealth } from "@/types/monitoring";

interface Props {
  services: ServiceHealth[];
}

export function DashboardNavbar({ services }: Props) {
  const allHealthy = services.every((s) => s.status === "healthy");
  const downCount = services.filter((s) => s.status === "down").length;
  const hasWarning = services.some((s) => s.status === "warning");
  const statusLabel = downCount > 2 ? "CRITICAL" : downCount > 0 ? "DEGRADED" : hasWarning ? "PARTIAL ISSUES" : "ALL SYSTEMS OPERATIONAL";
  const statusColor = downCount > 2 ? "bg-destructive" : downCount > 0 ? "bg-down" : hasWarning ? "bg-warning" : "bg-healthy";

  return (
    <header className="flex items-center justify-between border-b px-6 py-3">
      <div className="flex items-center gap-3">
        <Activity className="h-5 w-5 text-primary" />
        <h1 className="text-base font-semibold tracking-tight">Service Health Monitor</h1>
      </div>
      <div className="flex items-center gap-4">
        <span className="font-mono text-xs text-muted-foreground">
          {new Date().toLocaleTimeString("en-US", { hour12: false })}
        </span>
        <div className="flex items-center gap-2">
          <span className={`h-2 w-2 rounded-full ${statusColor} animate-pulse-dot`} />
          <span className="text-xs font-medium tracking-wide">{statusLabel}</span>
        </div>
      </div>
    </header>
  );
}
