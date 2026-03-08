import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/components/Header";
import DeliveryPlanner from "@/components/DeliveryPlanner";
import MetricsDashboard from "@/components/MetricsDashboard";
import InteractiveMap from "@/components/InteractiveMap";
import ComparisonPanel from "@/components/ComparisonPanel";
import RiskAnalysis from "@/components/RiskAnalysis";
import TechnologyPanel from "@/components/TechnologyPanel";
import AWSArchitecture from "@/components/AWSArchitecture";
import OptimizedRoute from "@/components/OptimizedRoute";
import BeforeAfterComparison from "@/components/BeforeAfterComparison";
import AIInsightsPanel from "@/components/AIInsightsPanel";
import ColdChainMonitoring from "@/components/ColdChainMonitoring";
import SavedDeliveryPlans from "@/components/SavedDeliveryPlans";
import AISpoilagePrediction from "@/components/AISpoilagePrediction";
import RealTimeAlertFeed from "@/components/RealTimeAlertFeed";
import SimulationController from "@/components/SimulationController";
import { useSimulation } from "@/hooks/useSimulation";
import { Brain } from "lucide-react";

const Index = () => {
  const [config, setConfig] = useState({
    depot: "Nashik",
    deliveries: ["Mumbai", "Bangalore"],
    product: "Fruits",
    temp: 4,
    priority: "Standard",
  });
  const [optimized, setOptimized] = useState(false);
  const [optimizing, setOptimizing] = useState(false);
  const { simulationActive, demoMode, shipments, toggleSimulation, toggleDemo } = useSimulation();

  const handleOptimize = (newConfig: typeof config) => {
    setConfig(newConfig);
    setOptimized(false);
    setOptimizing(true);
    setTimeout(() => {
      setOptimizing(false);
      setOptimized(true);
    }, 2200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container py-6 space-y-6">
        {/* Hero + Simulation Controls */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center py-8 bg-gradient-hero rounded-xl border border-border"
        >
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-gradient-primary">GAT-RL</span> Cold Chain Intelligence
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-5">
            AI-driven multi-depot cold chain routing optimization using Graph Attention Networks
            and Reinforcement Learning to reduce spoilage, delays, and energy consumption.
          </p>
          <div className="flex justify-center">
            <SimulationController
              active={simulationActive}
              demoMode={demoMode}
              onToggleSimulation={toggleSimulation}
              onToggleDemo={toggleDemo}
            />
          </div>
        </motion.div>

        {/* Metrics */}
        <MetricsDashboard simulationActive={simulationActive} />

        {/* Main Panel: Planner + Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <DeliveryPlanner onOptimize={handleOptimize} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-8 relative"
          >
            <InteractiveMap
              depot={config.depot}
              cities={config.deliveries}
              optimized={optimized}
              simulationActive={simulationActive}
              shipments={shipments}
            />

            {/* Loading Overlay */}
            <AnimatePresence>
              {optimizing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-background/80 backdrop-blur-sm rounded-xl z-10"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    className="w-12 h-12 rounded-full border-2 border-primary/20 border-t-primary mb-4"
                  />
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-2"
                  >
                    <Brain className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-foreground">AI Optimizing Route...</span>
                  </motion.div>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-xs text-muted-foreground mt-2"
                  >
                    Analyzing graph attention weights & reward signals
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Optimized Route */}
        <AnimatePresence>
          {optimized && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <OptimizedRoute depot={config.depot} cities={config.deliveries} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* AI Spoilage Prediction + Alert Feed */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <AISpoilagePrediction simulationActive={simulationActive} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <RealTimeAlertFeed simulationActive={simulationActive} />
          </motion.div>
        </div>

        {/* Before vs After */}
        <BeforeAfterComparison />

        {/* AI Insights + Cold Chain Monitoring */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <AIInsightsPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <ColdChainMonitoring />
          </motion.div>
        </div>

        {/* Comparison + Risk */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <ComparisonPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <RiskAnalysis />
          </motion.div>
        </div>

        {/* Saved Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5 }}
        >
          <SavedDeliveryPlans currentConfig={config} optimized={optimized} />
        </motion.div>

        {/* Technology + AWS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <TechnologyPanel />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            <AWSArchitecture />
          </motion.div>
        </div>

        {/* Footer */}
        <footer className="text-center py-6 border-t border-border">
          <p className="text-xs text-muted-foreground">
            GAT-RL Cold Chain Intelligence Platform • AI-Powered Logistics Optimization • Built for Enterprise Scale
          </p>
        </footer>
      </main>
    </div>
  );
};

export default Index;
