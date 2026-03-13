import { useMonitoring } from "@/hooks/useMonitoring";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { MetricsCharts } from "@/components/dashboard/MetricsCharts";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const Index = () => {
  const { services, logs, metrics, simulate, downloadLogFile } = useMonitoring();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar services={services} />

      <main className="flex-1 px-6 py-5 space-y-5 max-w-[1400px] mx-auto w-full">
        {/* Service Health */}
        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-[11px] font-medium text-muted-foreground">Services</h2>
            <span className="text-[10px] font-mono text-muted-foreground tabular-nums">
              {services.filter(s => s.status === "healthy").length}/{services.length} healthy
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-5">
            {services.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section>
          <h2 className="text-[11px] font-medium text-muted-foreground mb-3">Metrics</h2>
          <MetricsCharts data={metrics} />
        </section>

        {/* Controls & Feed */}
        <section className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <div className="space-y-3">
            <SimulationControls onSimulate={simulate} />
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-[11px] h-8"
              onClick={downloadLogFile}
            >
              <Download className="h-3 w-3" />
              Export app.log
            </Button>
          </div>
          <div className="lg:col-span-2">
            <ActivityFeed logs={logs} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
