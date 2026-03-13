import type { LogEntry } from "@/types/monitoring";

const logBuffer: string[] = [];

function formatLogLine(entry: LogEntry): string {
  const d = entry.timestamp;
  const pad = (n: number) => String(n).padStart(2, "0");
  const ts = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
  return `[${ts}] ${entry.level} ${entry.message}`;
}

async function sendToBackend(level: string, message: string) {
  try {
    const endpoint = level.toLowerCase();
    console.log(`Sending log to backend: ${endpoint} - ${message}`);
    
    const response = await fetch(`http://localhost:5000/log/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });
    
    if (!response.ok) {
      console.error('Failed to send log to backend:', response.status, response.statusText);
    } else {
      console.log('Successfully sent log to backend');
    }
  } catch (error) {
    console.error('Error sending log to backend:', error);
  }
}

export function appendToLogFile(entry: LogEntry) {
  logBuffer.push(formatLogLine(entry));
  
  // Send log to backend
  sendToBackend(entry.level, entry.message);
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
