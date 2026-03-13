import type { ServiceHealth } from "@/types/monitoring";
import { Circle, TrendingUp, TrendingDown, Minus } from "lucide-react";

const statusConfig = {
  healthy: { color: "text-healthy", dot: "fill-healthy text-healthy", label: "Healthy", trend: TrendingUp },
  warning: { color: "text-warning", dot: "fill-warning text-warning", label: "Warning", trend: Minus },
  down: { color: "text-down", dot: "fill-down text-down", label: "Down", trend: TrendingDown },
};

export function ServiceCard({ service }: { service: ServiceHealth }) {
  const cfg = statusConfig[service.status];
  const TrendIcon = cfg.trend;

  return (
    <div className={`group relative rounded-lg border bg-card p-4 transition-colors hover:bg-accent/50 ${
      service.status === "down" ? "border-down/30" : service.status === "warning" ? "border-warning/20" : "border-border"
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <p className="text-[13px] font-medium text-foreground">{service.name}</p>
          <div className="flex items-center gap-1.5 mt-1">
            <Circle className={`h-1.5 w-1.5 ${cfg.dot}`} />
            <span className={`text-[11px] font-medium ${cfg.color}`}>{cfg.label}</span>
          </div>
        </div>
        <TrendIcon className={`h-3.5 w-3.5 ${cfg.color} opacity-60`} />
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-auto">
        <div>
          <p className="text-[10px] text-muted-foreground">Latency</p>
          <p className="font-mono text-xs font-medium tabular-nums">{service.latency}<span className="text-muted-foreground ml-0.5">ms</span></p>
        </div>
        <div>
          <p className="text-[10px] text-muted-foreground">Errors</p>
          <p className={`font-mono text-xs font-medium tabular-nums ${service.errorCount > 0 ? "text-down" : ""}`}>
            {service.errorCount}
          </p>
        </div>
      </div>
      <p className="mt-2.5 text-[10px] text-muted-foreground font-mono tabular-nums">
        {service.lastChecked.toLocaleTimeString("en-US", { hour12: false })}
      </p>
    </div>
  );
}
