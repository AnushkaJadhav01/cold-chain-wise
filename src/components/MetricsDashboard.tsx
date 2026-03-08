import { TrendingDown, Fuel, Clock, Leaf, Brain } from "lucide-react";

const metrics = [
  { label: "Spoilage Reduction", value: "37.2%", icon: TrendingDown, color: "text-success", glow: "glow-success", bg: "bg-success/10", border: "border-success/20" },
  { label: "Fuel Savings", value: "12.8%", icon: Fuel, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Delivery Efficiency", value: "23.5%", icon: Clock, color: "text-info", glow: "", bg: "bg-info/10", border: "border-info/20" },
  { label: "Carbon Reduction", value: "18.4%", icon: Leaf, color: "text-success", glow: "", bg: "bg-success/10", border: "border-success/20" },
  { label: "AI Confidence", value: "94.7%", icon: Brain, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
];

const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-5 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className={`bg-gradient-card border ${m.border} rounded-xl p-5 ${m.glow} transition-all hover:scale-[1.02]`}>
          <div className={`w-10 h-10 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
            <m.icon className={`w-5 h-5 ${m.color}`} />
          </div>
          <p className={`text-2xl font-bold ${m.color}`}>{m.value}</p>
          <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
        </div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
