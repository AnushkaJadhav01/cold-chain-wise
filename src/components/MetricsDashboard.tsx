import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { TrendingDown, Fuel, Clock, Leaf, Brain } from "lucide-react";

const metrics = [
  { label: "Spoilage Reduction", value: 37.2, suffix: "%", icon: TrendingDown, color: "text-success", glow: "glow-success", bg: "bg-success/10", border: "border-success/20" },
  { label: "Fuel Savings", value: 12.8, suffix: "%", icon: Fuel, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
  { label: "Delivery Efficiency", value: 23.5, suffix: "%", icon: Clock, color: "text-info", glow: "", bg: "bg-info/10", border: "border-info/20" },
  { label: "Carbon Reduction", value: 18.4, suffix: "%", icon: Leaf, color: "text-success", glow: "", bg: "bg-success/10", border: "border-success/20" },
  { label: "AI Confidence", value: 94.7, suffix: "%", icon: Brain, color: "text-primary", glow: "glow-primary", bg: "bg-primary/10", border: "border-primary/20" },
];

const AnimatedCounter = ({ value, suffix }: { value: number; suffix: string }) => {
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
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();
    const animate = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(parseFloat((eased * value).toFixed(1)));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [inView, value]);

  return <span ref={ref}>{display}{suffix}</span>;
};

const MetricsDashboard = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {metrics.map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
          className={`bg-gradient-card border ${m.border} rounded-xl p-5 ${m.glow} transition-all hover:scale-[1.02]`}
        >
          <div className={`w-10 h-10 rounded-lg ${m.bg} flex items-center justify-center mb-3`}>
            <m.icon className={`w-5 h-5 ${m.color}`} />
          </div>
          <p className={`text-2xl font-bold ${m.color}`}>
            <AnimatedCounter value={m.value} suffix={m.suffix} />
          </p>
          <p className="text-xs text-muted-foreground mt-1">{m.label}</p>
        </motion.div>
      ))}
    </div>
  );
};

export default MetricsDashboard;
