import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Trash2, Eye, Calendar, Package, LogIn, LogOut, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import type { User } from "@supabase/supabase-js";

interface DeliveryPlan {
  id: string;
  route_name: string;
  depot: string;
  deliveries: string[];
  product: string;
  spoilage_risk: number;
  created_at: string;
}

interface SavedDeliveryPlansProps {
  currentConfig?: {
    depot: string;
    deliveries: string[];
    product: string;
    temp: number;
    priority: string;
  };
  optimized?: boolean;
}

const SavedDeliveryPlans = ({ currentConfig, optimized }: SavedDeliveryPlansProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [plans, setPlans] = useState<DeliveryPlan[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<DeliveryPlan | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setUser(data.session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (user) fetchPlans();
  }, [user]);

  const fetchPlans = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("delivery_plans")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setPlans(data as DeliveryPlan[]);
    setLoading(false);
  };

  const savePlan = async () => {
    if (!user || !currentConfig) return;
    const name = `${currentConfig.depot} → ${currentConfig.deliveries.join(", ")}`;
    const spoilage = Math.round(Math.random() * 8 + 4);
    const { error } = await supabase.from("delivery_plans").insert({
      user_id: user.id,
      route_name: name,
      depot: currentConfig.depot,
      deliveries: currentConfig.deliveries,
      product: currentConfig.product,
      temp_requirement: currentConfig.temp,
      priority: currentConfig.priority,
      spoilage_risk: spoilage,
    });
    if (error) {
      toast.error("Failed to save plan");
    } else {
      toast.success("Delivery plan saved!");
      fetchPlans();
    }
  };

  const deletePlan = async (id: string) => {
    const { error } = await supabase.from("delivery_plans").delete().eq("id", id);
    if (!error) {
      setPlans(plans.filter((p) => p.id !== id));
      toast.success("Plan deleted");
      if (selectedPlan?.id === id) setSelectedPlan(null);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthLoading(true);
    if (authMode === "signup") {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) toast.error(error.message);
      else toast.success("Check your email to verify your account!");
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) toast.error(error.message);
      else toast.success("Logged in!");
    }
    setAuthLoading(false);
    setShowAuth(false);
    setEmail("");
    setPassword("");
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setPlans([]);
    toast.success("Logged out");
  };

  return (
    <div className="bg-gradient-card border border-border rounded-xl p-6">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          <h2 className="text-lg font-semibold text-foreground">Saved Delivery Plans</h2>
        </div>
        {user ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground">{user.email}</span>
            <Button variant="ghost" size="sm" onClick={handleLogout} className="h-7 text-xs text-muted-foreground hover:text-foreground">
              <LogOut className="w-3 h-3 mr-1" /> Logout
            </Button>
          </div>
        ) : (
          <Button variant="outline" size="sm" onClick={() => setShowAuth(true)} className="h-7 text-xs border-primary/30 text-primary hover:bg-primary/10">
            <LogIn className="w-3 h-3 mr-1" /> Sign In to Save Plans
          </Button>
        )}
      </div>

      {/* Auth Form */}
      {showAuth && !user && (
        <form onSubmit={handleAuth} className="mb-5 p-4 rounded-lg border border-primary/20 bg-primary/5 space-y-3">
          <div className="flex gap-2 mb-2">
            <button type="button" onClick={() => setAuthMode("login")}
              className={`text-xs px-3 py-1 rounded-md font-medium ${authMode === "login" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground"}`}>
              Login
            </button>
            <button type="button" onClick={() => setAuthMode("signup")}
              className={`text-xs px-3 py-1 rounded-md font-medium ${authMode === "signup" ? "bg-primary/15 text-primary border border-primary/30" : "text-muted-foreground"}`}>
              Sign Up
            </button>
          </div>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6}
            className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-primary/40" />
          <div className="flex gap-2">
            <Button type="submit" size="sm" disabled={authLoading} className="bg-primary text-primary-foreground hover:bg-primary/90 text-xs">
              {authLoading ? "..." : authMode === "login" ? "Login" : "Sign Up"}
            </Button>
            <Button type="button" variant="ghost" size="sm" onClick={() => setShowAuth(false)} className="text-xs text-muted-foreground">
              Cancel
            </Button>
          </div>
        </form>
      )}

      {/* Save Button */}
      {user && optimized && currentConfig && (
        <Button onClick={savePlan} size="sm" className="mb-4 bg-primary/15 text-primary border border-primary/30 hover:bg-primary/20 text-xs">
          <Package className="w-3 h-3 mr-1.5" /> Save Current Route
        </Button>
      )}

      {/* Plans List */}
      {user ? (
        loading ? (
          <p className="text-xs text-muted-foreground">Loading plans...</p>
        ) : plans.length === 0 ? (
          <p className="text-xs text-muted-foreground py-4 text-center">No saved plans yet. Optimize a route and save it!</p>
        ) : (
          <div className="space-y-2">
            {plans.map((plan) => (
              <div key={plan.id} className="p-3.5 rounded-lg border border-border bg-secondary/30 hover:border-primary/20 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{plan.route_name}</p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {plan.depot}
                      </span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {new Date(plan.created_at).toLocaleDateString()}
                      </span>
                      <span className={`text-xs px-1.5 py-0.5 rounded font-medium ${plan.spoilage_risk > 10 ? "bg-warning/10 text-warning" : "bg-success/10 text-success"}`}>
                        {plan.spoilage_risk}% risk
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 shrink-0 ml-2">
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPlan(selectedPlan?.id === plan.id ? null : plan)} className="h-7 w-7 p-0 text-muted-foreground hover:text-primary">
                      <Eye className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => deletePlan(plan.id)} className="h-7 w-7 p-0 text-muted-foreground hover:text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
                {selectedPlan?.id === plan.id && (
                  <div className="mt-3 pt-3 border-t border-border text-xs text-muted-foreground space-y-1">
                    <p>Deliveries: <span className="text-foreground">{plan.deliveries.join(" → ")}</span></p>
                    <p>Product: <span className="text-foreground">{plan.product}</span></p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      ) : (
        <p className="text-xs text-muted-foreground py-4 text-center">Sign in to save and manage your delivery plans.</p>
      )}
    </div>
  );
};

export default SavedDeliveryPlans;
