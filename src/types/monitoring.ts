export type ServiceStatus = "healthy" | "warning" | "down";
export type LogLevel = "INFO" | "WARNING" | "ERROR";

export interface ServiceHealth {
  name: string;
  status: ServiceStatus;
  lastChecked: Date;
  latency: number;
  errorCount: number;
}

export interface LogEntry {
  timestamp: Date;
  level: LogLevel;
  service: string;
  message: string;
}

export interface MetricsSnapshot {
  time: string;
  cpu: number;
  memory: number;
  requests: number;
  errorRate: number;
}
