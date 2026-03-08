import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Fuel, Clock, Leaf, Brain, Apple, HeartPulse } from "lucide-react";

interface MetricsDashboardProps {
  simulationActive?: boolean;
}

const baseMetrics = [
  { label: "Spoilage Reduction", value: 37.2, suffix: "%", icon: TrendingDown, color: "text-success", glow: "glow-success", bg: "bg-success/10", border: "border-success/20" },
  { label: "Fuel Savings", value: 12.8, suffix: "%", icon: Fuel, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Delivery Efficiency", value: 23.5, suffix: "%", icon: Clock, color: "text-info", glow: "", bg: "bg-info/10", border: "border-info/20" },
  { label: "Carbon Reduction", value: 18.4, suffix: "%", icon: Leaf, color: "text-success", glow: "", bg: "bg-success/10", border: "border-success/20" },
  { label: "AI Confidence", value: 94.7, suffix: "%", icon: Brain, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Food Saved", value: 12480, suffix: " kg", icon: Apple, color: "text-warning", glow: "glow-warning", bg: "bg-warning/10", border: "border-warning/20" },
  { label: "Cold Chain Health", value: 92, suffix: "/100", icon: HeartPulse, color: "text-success", glow: "glow-success", bg: "bg-success/10", border: "border-success/20" },
];

const AnimatedCounter = ({ value, suffix, simulationActive }: { value: number; suffix: string; simulationActive?: boolean }) => {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setInView(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    const duration = 1200;
    const startTime = performance.now();
    const startVal = display;
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = startVal + (value - startVal) * eased;
      setDisplay(value >= 100 ? Math.round(current) : parseFloat(current.toFixed(1)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{value >= 1000 ? display.toLocaleString() : display}{suffix}</span>;
};

const MetricsDashboard = ({ simulationActive = false }: MetricsDashboardProps) => {
  const [metrics, setMetrics] = useState(baseMetrics);

  useEffect(() => {
    if (!simulationActive) return;
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: m.label === "Food Saved"
          ? m.value + Math.floor(Math.random() * 50)
          : m.label === "Cold Chain Health"
          ? Math.min(100, Math.max(80, m.value + (Math.random() - 0.5) * 3))
          : Math.min(99, Math.max(5, m.value + (Math.random() - 0.45) * 2)),
      })));
    }, 4000);
    return () => clearInterval(interval);
  }, [simulationActive]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.07, ease: "easeOut" }}
          className={`bg-gradient-card border ${m.border} rounded-xl p-4 ${m.glow} transition-all hover:scale-[1.03] hover:border-primary/30`}
        >
          <div className={`w-9 h-9 rounded-lg ${m.bg} flex items-center justify-center mb-2`}>
            <m.icon className={`w-4 h-4 ${m.color}`} />
          </div>
          <p className={`text-xl font-bold ${m.color}`}>
            <AnimatedCounter value={m.value} suffix={m.suffix} simulationActive={simulationActive} />
          </p>
          <p className="text-[10px] text-muted-foreground mt-1 leading-tight">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
