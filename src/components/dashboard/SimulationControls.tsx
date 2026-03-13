import { Button } from "@/components/ui/button";
import { Play, Gauge, AlertTriangle, XCircle, Database, Zap, Flame } from "lucide-react";

const simulations = [
  { type: "normal", label: "Normal", icon: Play },
  { type: "high-latency", label: "High Latency", icon: Gauge },
  { type: "warning", label: "Warning", icon: AlertTriangle },
  { type: "service-down", label: "Service Down", icon: XCircle },
  { type: "database-failure", label: "DB Failure", icon: Database },
  { type: "api-error", label: "API Error", icon: Zap },
];

export function SimulationControls({ onSimulate }: { onSimulate: (type: string) => void }) {
  return (
    <div className="rounded-lg border bg-card">
      <div className="px-4 py-3 border-b">
        <span className="text-[11px] font-medium text-muted-foreground">Simulation</span>
      </div>
      <div className="p-3 space-y-1.5">
        <div className="grid grid-cols-2 gap-1.5">
          {simulations.map((s) => {
            const Icon = s.icon;
            return (
              <Button
                key={s.type}
                variant="ghost"
                size="sm"
                className="justify-start gap-2 text-[11px] h-8 text-secondary-foreground hover:text-foreground"
                onClick={() => onSimulate(s.type)}
              >
                <Icon className="h-3 w-3 shrink-0" />
                {s.label}
              </Button>
            );
          })}
        </div>
        <Button
          variant="destructive"
          size="sm"
          className="w-full gap-2 text-[11px] h-8 mt-1"
          onClick={() => onSimulate("critical-failure")}
        >
          <Flame className="h-3 w-3" />
          Critical Failure
        </Button>
      </div>
    </div>
  );
}
