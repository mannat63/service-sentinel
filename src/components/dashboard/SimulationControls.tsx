import { Button } from "@/components/ui/button";
import { Play, Gauge, AlertTriangle, XCircle, Database, Zap, Flame } from "lucide-react";

const simulations = [
  { type: "normal", label: "Normal Operation", icon: Play },
  { type: "high-latency", label: "High Latency", icon: Gauge },
  { type: "warning", label: "Warning", icon: AlertTriangle },
  { type: "service-down", label: "Service Failure", icon: XCircle },
  { type: "database-failure", label: "Database Failure", icon: Database },
  { type: "api-error", label: "API Error", icon: Zap },
  { type: "critical-failure", label: "Critical Failure", icon: Flame, destructive: true },
];

export function SimulationControls({ onSimulate }: { onSimulate: (type: string) => void }) {
  return (
    <div className="rounded-lg border bg-card p-4">
      <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Simulation Controls
      </h3>
      <div className="grid grid-cols-2 gap-2">
        {simulations.map((s) => {
          const Icon = s.icon;
          return (
            <Button
              key={s.type}
              variant="outline"
              size="sm"
              className="justify-start gap-2 text-xs"
              onClick={() => onSimulate(s.type)}
            >
              <Icon className="h-3.5 w-3.5" />
              {s.label}
            </Button>
          );
        })}
      </div>
    </div>
  );
}
