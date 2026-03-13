import { useMonitoring } from "@/hooks/useMonitoring";
import { DashboardNavbar } from "@/components/dashboard/DashboardNavbar";
import { ServiceCard } from "@/components/dashboard/ServiceCard";
import { MetricsCharts } from "@/components/dashboard/MetricsCharts";
import { SimulationControls } from "@/components/dashboard/SimulationControls";
import { ActivityFeed } from "@/components/dashboard/ActivityFeed";

const Index = () => {
  const { services, logs, metrics, simulate } = useMonitoring();

  return (
    <div className="min-h-screen flex flex-col">
      <DashboardNavbar services={services} />

      <main className="flex-1 p-6 space-y-6 max-w-[1400px] mx-auto w-full">
        {/* Service Health Grid */}
        <section>
          <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-3">
            Service Health
          </h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {services.map((s) => (
              <ServiceCard key={s.name} service={s} />
            ))}
          </div>
        </section>

        {/* Metrics Charts */}
        <section>
          <h2 className="text-xs font-semibold tracking-wide text-muted-foreground uppercase mb-3">
            System Metrics
          </h2>
          <MetricsCharts data={metrics} />
        </section>

        {/* Controls & Feed */}
        <section className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <SimulationControls onSimulate={simulate} />
          <div className="lg:col-span-2">
            <ActivityFeed logs={logs} />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Index;
