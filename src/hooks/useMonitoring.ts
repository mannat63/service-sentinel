import { useState, useEffect, useCallback, useRef } from "react";
import type { ServiceHealth, LogEntry, MetricsSnapshot, LogLevel } from "@/types/monitoring";

const SERVICE_NAMES = ["Authentication", "Payment", "Database", "Notification", "Search"];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const formatTime = (d: Date) =>
  d.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" });

const createLog = (level: LogLevel, service: string, message: string): LogEntry => ({
  timestamp: new Date(),
  level,
  service,
  message,
});

const initialServices: ServiceHealth[] = SERVICE_NAMES.map((name) => ({
  name,
  status: "healthy",
  lastChecked: new Date(),
  latency: Math.round(randomBetween(10, 80)),
  errorCount: 0,
}));

export function useMonitoring() {
  const [services, setServices] = useState<ServiceHealth[]>(initialServices);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState<MetricsSnapshot[]>([]);
  const logsRef = useRef(logs);
  logsRef.current = logs;

  const addLog = useCallback((entry: LogEntry) => {
    setLogs((prev) => [entry, ...prev].slice(0, 200));
  }, []);

  const updateService = useCallback((name: string, updates: Partial<ServiceHealth>) => {
    setServices((prev) =>
      prev.map((s) => (s.name === name ? { ...s, ...updates, lastChecked: new Date() } : s))
    );
  }, []);

  // Periodic health check every 10s
  useEffect(() => {
    const interval = setInterval(() => {
      addLog(createLog("INFO", "System", "Service health check completed"));
      const allOk = Math.random() > 0.2;
      if (allOk) {
        addLog(createLog("INFO", "System", "All services operational"));
      } else {
        const svc = SERVICE_NAMES[Math.floor(Math.random() * SERVICE_NAMES.length)];
        const isWarning = Math.random() > 0.4;
        if (isWarning) {
          updateService(svc, { status: "warning", latency: Math.round(randomBetween(200, 500)) });
          addLog(createLog("WARNING", svc, `${svc} latency above threshold`));
        } else {
          updateService(svc, { status: "down", errorCount: Math.round(randomBetween(1, 5)) });
          addLog(createLog("ERROR", svc, `${svc} service unreachable`));
        }
        // Auto-recover after a few seconds
        setTimeout(() => {
          updateService(svc, { status: "healthy", latency: Math.round(randomBetween(10, 80)), errorCount: 0 });
          addLog(createLog("INFO", svc, `${svc} service recovered`));
        }, 8000);
      }
    }, 10000);
    return () => clearInterval(interval);
  }, [addLog, updateService]);

  // Metrics every 3s
  useEffect(() => {
    const pushMetric = () => {
      setMetrics((prev) => {
        const snap: MetricsSnapshot = {
          time: formatTime(new Date()),
          cpu: Math.round(randomBetween(15, 65)),
          memory: Math.round(randomBetween(40, 75)),
          requests: Math.round(randomBetween(100, 500)),
          errorRate: parseFloat(randomBetween(0, 3).toFixed(1)),
        };
        return [...prev.slice(-19), snap];
      });
    };
    pushMetric();
    const id = setInterval(pushMetric, 3000);
    return () => clearInterval(id);
  }, []);

  const simulate = useCallback(
    (type: string) => {
      switch (type) {
        case "normal":
          SERVICE_NAMES.forEach((s) =>
            updateService(s, { status: "healthy", latency: Math.round(randomBetween(10, 60)), errorCount: 0 })
          );
          addLog(createLog("INFO", "System", "Normal operation simulation triggered"));
          addLog(createLog("INFO", "System", "All services restored to healthy"));
          break;
        case "high-latency":
          SERVICE_NAMES.forEach((s) =>
            updateService(s, { latency: Math.round(randomBetween(300, 900)) })
          );
          addLog(createLog("WARNING", "System", "High latency simulation triggered"));
          addLog(createLog("WARNING", "Database", "Database latency above threshold"));
          break;
        case "warning": {
          const svc = SERVICE_NAMES[Math.floor(Math.random() * SERVICE_NAMES.length)];
          updateService(svc, { status: "warning", latency: Math.round(randomBetween(200, 500)) });
          addLog(createLog("WARNING", svc, `${svc} service showing degraded performance`));
          break;
        }
        case "service-down": {
          const svc = SERVICE_NAMES[Math.floor(Math.random() * SERVICE_NAMES.length)];
          updateService(svc, { status: "down", latency: 0, errorCount: Math.round(randomBetween(5, 20)) });
          addLog(createLog("ERROR", svc, `${svc} service connection failed`));
          break;
        }
        case "database-failure":
          updateService("Database", { status: "down", latency: 0, errorCount: Math.round(randomBetween(10, 30)) });
          addLog(createLog("ERROR", "Database", "Database service unreachable"));
          addLog(createLog("ERROR", "Database", "Connection pool exhausted"));
          break;
        case "api-error":
          updateService("Payment", { status: "down", errorCount: Math.round(randomBetween(3, 12)) });
          addLog(createLog("ERROR", "Payment", "Payment API request failed"));
          addLog(createLog("ERROR", "Payment", "HTTP 503 Service Unavailable"));
          break;
      }
    },
    [addLog, updateService]
  );

  return { services, logs, metrics, simulate };
}
