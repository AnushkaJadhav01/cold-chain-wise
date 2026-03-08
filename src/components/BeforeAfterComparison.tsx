import { ArrowRight, TrendingDown, Clock, AlertTriangle, Fuel, Zap } from "lucide-react";

const BeforeAfterComparison = () => {
  return (
    <div className="bg-gradient-card border border-border rounded-xl p-6">
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Before vs After AI Optimization</h2>
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] gap-4 items-stretch">
        {/* Traditional */}
        <div className="p-5 rounded-xl border border-warning/20 bg-warning/5 space-y-4">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-warning" />
            <h3 className="text-sm font-bold text-warning">Traditional Routing</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Delivery Time</span>
              </div>
              <span className="text-sm font-bold text-warning">9 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Spoilage Risk</span>
              </div>
              <span className="text-sm font-bold text-warning">26%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Fuel Cost</span>
              </div>
              <span className="text-sm font-bold text-warning">₹12,400</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Route Efficiency</span>
              </div>
              <span className="text-sm font-bold text-warning">62%</span>
            </div>
          </div>
          <ul className="space-y-1.5 pt-2 border-t border-border">
            <li className="text-xs text-muted-foreground flex items-center gap-1.5">• Static route planning</li>
            <li className="text-xs text-muted-foreground flex items-center gap-1.5">• Higher spoilage risk</li>
            <li className="text-xs text-muted-foreground flex items-center gap-1.5">• Longer delivery time</li>
          </ul>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <ArrowRight className="w-8 h-8 text-primary animate-pulse" />
            <span className="text-xs font-bold text-primary">AI</span>
          </div>
        </div>

        {/* AI Optimized */}
        <div className="p-5 rounded-xl border border-primary/20 bg-primary/5 space-y-4 glow-primary">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <h3 className="text-sm font-bold text-primary">AI Optimized (GAT-RL)</h3>
          </div>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Delivery Time</span>
              </div>
              <span className="text-sm font-bold text-primary">6 hours</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Spoilage Risk</span>
              </div>
              <span className="text-sm font-bold text-success">8%</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <Fuel className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Fuel Cost</span>
              </div>
              <span className="text-sm font-bold text-success">₹8,900</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-secondary/40 border border-border">
              <div className="flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Route Efficiency</span>
              </div>
              <span className="text-sm font-bold text-success">94%</span>
            </div>
          </div>
          <ul className="space-y-1.5 pt-2 border-t border-border">
            <li className="text-xs text-primary/80 flex items-center gap-1.5">• Dynamic optimized route</li>
            <li className="text-xs text-primary/80 flex items-center gap-1.5">• Reduced spoilage risk</li>
            <li className="text-xs text-primary/80 flex items-center gap-1.5">• Improved delivery efficiency</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default BeforeAfterComparison;
