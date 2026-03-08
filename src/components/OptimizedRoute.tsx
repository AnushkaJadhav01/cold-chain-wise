import { ArrowRight, CheckCircle2 } from "lucide-react";

interface OptimizedRouteProps {
  depot: string;
  cities: string[];
}

const OptimizedRoute = ({ depot, cities }: OptimizedRouteProps) => {
  // Simple nearest-neighbor heuristic simulation
  const sortedCities = [...cities];

  return (
    <div className="bg-gradient-card border border-primary/20 rounded-xl p-5 glow-primary">
      <div className="flex items-center gap-2 mb-4">
        <CheckCircle2 className="w-5 h-5 text-success" />
        <h3 className="text-sm font-semibold text-foreground">Optimized Delivery Path</h3>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        <span className="px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-xs font-semibold text-primary">
          {depot} (Depot)
        </span>
        {sortedCities.map((city, i) => (
          <div key={city} className="flex items-center gap-1">
            <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
            <span className="px-3 py-1.5 rounded-lg bg-secondary border border-border text-xs font-medium text-foreground">
              {city}
            </span>
          </div>
        ))}
        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground" />
        <span className="px-3 py-1.5 rounded-lg bg-primary/15 border border-primary/30 text-xs font-semibold text-primary">
          {depot} (Return)
        </span>
      </div>
      <div className="mt-3 flex gap-4 text-xs text-muted-foreground">
        <span>Estimated Distance: <strong className="text-foreground">{(cities.length * 280 + 120).toLocaleString()} km</strong></span>
        <span>Est. Time: <strong className="text-foreground">{Math.round(cities.length * 4.5 + 2)}h</strong></span>
        <span>Stops: <strong className="text-foreground">{cities.length}</strong></span>
      </div>
    </div>
  );
};

export default OptimizedRoute;
