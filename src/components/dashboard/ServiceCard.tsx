import type { ServiceHealth } from "@/types/monitoring";
import { Wifi, WifiOff, AlertTriangle } from "lucide-react";

const statusConfig = {
  healthy: { color: "text-healthy", bg: "bg-healthy", dot: "bg-healthy", icon: Wifi, label: "Healthy" },
  warning: { color: "text-warning", bg: "bg-warning", dot: "bg-warning", icon: AlertTriangle, label: "Warning" },
  down: { color: "text-down", bg: "bg-down", dot: "bg-down", icon: WifiOff, label: "Down" },
};

export function ServiceCard({ service }: { service: ServiceHealth }) {
  const cfg = statusConfig[service.status];
  const Icon = cfg.icon;

  return (
    <div className="rounded-lg border bg-card p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-medium">{service.name}</span>
        <span className={`h-2.5 w-2.5 rounded-full ${cfg.dot} animate-pulse-dot`} />
      </div>
      <div className="flex items-center gap-2 mb-3">
        <Icon className={`h-4 w-4 ${cfg.color}`} />
        <span className={`text-xs font-semibold ${cfg.color}`}>{cfg.label}</span>
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <span className="text-muted-foreground">Latency</span>
          <p className="font-mono font-medium">{service.latency}ms</p>
        </div>
        <div>
          <span className="text-muted-foreground">Errors</span>
          <p className={`font-mono font-medium ${service.errorCount > 0 ? "text-down" : ""}`}>
            {service.errorCount}
          </p>
        </div>
      </div>
      <p className="mt-2 text-[10px] text-muted-foreground font-mono">
        Checked {service.lastChecked.toLocaleTimeString("en-US", { hour12: false })}
      </p>
    </div>
  );
}
