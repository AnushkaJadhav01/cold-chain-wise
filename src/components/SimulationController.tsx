import { motion } from "framer-motion";
import { Play, Pause, Radio } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  active: boolean;
  demoMode: boolean;
  onToggleSimulation: () => void;
  onToggleDemo: () => void;
}

const SimulationController = ({ active, demoMode, onToggleSimulation, onToggleDemo }: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 flex-wrap"
    >
      <Button
        onClick={onToggleSimulation}
        size="lg"
        className={`font-bold text-sm px-6 transition-all ${
          active
            ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground"
            : "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
        }`}
      >
        {active ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
        {active ? "Stop Simulation" : "Start AI Logistics Simulation"}
      </Button>

      <button
        onClick={onToggleDemo}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-all border ${
          demoMode
            ? "bg-primary/10 border-primary/30 text-primary"
            : "bg-secondary border-border text-muted-foreground hover:text-foreground"
        }`}
      >
        <Radio className="w-3.5 h-3.5" />
        Demo Mode {demoMode ? "ON" : "OFF"}
      </button>

      {active && (
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1.5 text-xs text-success"
        >
          <span className="w-2 h-2 rounded-full bg-success" />
          Simulation Running
        </motion.div>
      )}
    </motion.div>
  );
};

export default SimulationController;
