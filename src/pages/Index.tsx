import { useState } from "react";
import Header from "@/components/Header";
import DeliveryPlanner from "@/components/DeliveryPlanner";
import MetricsDashboard from "@/components/MetricsDashboard";
import RouteVisualization from "@/components/RouteVisualization";
import ComparisonPanel from "@/components/ComparisonPanel";
import RiskAnalysis from "@/components/RiskAnalysis";
import TechnologyPanel from "@/components/TechnologyPanel";
import AWSArchitecture from "@/components/AWSArchitecture";
import OptimizedRoute from "@/components/OptimizedRoute";

const Index = () => {
  const [config, setConfig] = useState({
    depot: "Nashik",
    deliveries: ["Mumbai", "Bangalore"],
    product: "Fruits",
    temp: 4,
    priority: "Standard",
  });
  const [optimized, setOptimized] = useState(false);

  const handleOptimize = (newConfig: typeof config) => {
    setConfig(newConfig);
    setOptimized(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-6 space-y-6">
        {/* Hero */}
        <div className="text-center py-8 bg-gradient-hero rounded-xl border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            <span className="text-gradient-primary">GAT-RL</span> Cold Chain Intelligence
          </h1>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            AI-driven multi-depot cold chain routing optimization using Graph Attention Networks 
            and Reinforcement Learning to reduce spoilage, delays, and energy consumption.
          </p>
        </div>

        {/* Metrics */}
        <MetricsDashboard />

        {/* Main Panel: Planner + Visualization */}
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-4">
            <DeliveryPlanner onOptimize={handleOptimize} />
          </div>
          <div className="col-span-8">
            <RouteVisualization depot={config.depot} cities={config.deliveries} optimized={optimized} />
          </div>
        </div>

        {/* Optimized Route */}
        {optimized && (
          <OptimizedRoute depot={config.depot} cities={config.deliveries} />
        )}

        {/* Comparison + Risk */}
        <div className="grid grid-cols-2 gap-6">
          <ComparisonPanel />
          <RiskAnalysis />
        </div>

        {/* Technology + AWS */}
        <div className="grid grid-cols-2 gap-6">
          <TechnologyPanel />
          <AWSArchitecture />
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
