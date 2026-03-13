import type { LogEntry } from "@/types/monitoring";

const levelColors: Record<string, string> = {
  INFO: "text-healthy",
  WARNING: "text-warning",
  ERROR: "text-down",
};

function formatTimestamp(d: Date) {
  return d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });
}

export function ActivityFeed({ logs }: { logs: LogEntry[] }) {
  return (
    <div className="rounded-lg border bg-terminal p-4 flex flex-col h-full">
      <h3 className="mb-3 text-xs font-semibold tracking-wide text-muted-foreground uppercase">
        Live Activity Feed
      </h3>
      <div className="flex-1 overflow-y-auto space-y-0.5 font-mono text-[11px] leading-5 max-h-64">
        {logs.length === 0 && (
          <p className="text-muted-foreground">Waiting for events...</p>
        )}
        {logs.map((log, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-muted-foreground shrink-0">[{formatTimestamp(log.timestamp)}]</span>
            <span className={`shrink-0 w-14 ${levelColors[log.level]}`}>{log.level}</span>
            <span className="text-foreground">{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
