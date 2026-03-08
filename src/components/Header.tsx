import { Snowflake, Activity } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center glow-primary">
            <Snowflake className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight text-foreground">GAT-RL Cold Chain Intelligence</h1>
            <p className="text-xs text-muted-foreground">AI-Powered Logistics Optimization</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/20">
            <Activity className="w-3 h-3 text-success" />
            <span className="text-xs font-medium text-success">System Online</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
