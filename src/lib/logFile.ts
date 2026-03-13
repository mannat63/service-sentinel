import type { LogEntry } from "@/types/monitoring";

const logBuffer: string[] = [];

function formatLogLine(entry: LogEntry): string {
  const d = entry.timestamp;
  const pad = (n: number) => String(n).padStart(2, "0");
  const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return `[${ts}] ${entry.level} ${entry.message}`;
}

export function appendToLogFile(entry: LogEntry) {
  logBuffer.push(formatLogLine(entry));
}

export function downloadLogFile() {
  const content = logBuffer.join("\n") + "\n";
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "app.log";
  a.click();
  URL.revokeObjectURL(url);
}
