import type { LogEntry } from "@/types/monitoring";

const levelStyles: Record<string, string> = {
  INFO: "text-healthy bg-healthy/10",
  WARNING: "text-warning bg-warning/10",
  ERROR: "text-down bg-down/10",
};

function formatTimestamp(d: Date) {
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function ActivityFeed({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="rounded-lg border bg-card flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b">
        <span className="text-[11px] font-medium text-muted-foreground">Live Activity</span>
        <span className="text-[10px] font-mono text-muted-foreground tabular-nums">{logs.length} events</span>
      </div>
      <div className="flex-1 overflow-y-auto p-3 space-y-0.5 font-mono text-[11px] leading-5 max-h-72 bg-terminal rounded-b-lg">
        {logs.length === 0 && (
          <p className="text-muted-foreground px-1 py-4 text-center">Waiting for events…</p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex items-start gap-2 px-1 py-0.5 rounded hover:bg-accent/30 transition-colors">
            <span className="text-muted-foreground shrink-0 tabular-nums">{formatTimestamp(log.timestamp)}</span>
            <span className={`shrink-0 px-1.5 py-0 rounded text-[10px] font-semibold ${levelStyles[log.level]}`}>
              {log.level}
            </span>
            <span className="text-foreground/80">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
