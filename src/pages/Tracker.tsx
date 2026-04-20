import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { toast } from "sonner";

interface Food {
  name: string;
  cal: number;
  prot: number;
  carbs: number;
  fats: number;
}

const TARGETS = { cal: 2000, prot: 150, carbs: 250, fats: 65 };

const Tracker = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [name, setName] = useState("");
  const [cal, setCal] = useState("");
  const [prot, setProt] = useState("");

  const totals = foods.reduce(
    (s, f) => ({ cal: s.cal + f.cal, prot: s.prot + f.prot, carbs: s.carbs + f.carbs, fats: s.fats + f.fats }),
    { cal: 0, prot: 0, carbs: 0, fats: 0 },
  );

  const add = () => {
    const c = parseInt(cal);
    if (!name.trim() || !c) {
      toast.warning("Enter food name and calories");
      return;
    }
    const p = parseInt(prot) || 0;
    setFoods((prev) => [
      ...prev,
      { name: name.trim(), cal: c, prot: p, carbs: Math.round((c * 0.45) / 4), fats: Math.round((c * 0.25) / 9) },
    ]);
    setName(""); setCal(""); setProt("");
    toast.success("Meal added");
  };

  const remove = (i: number) => setFoods((prev) => prev.filter((_, idx) => idx !== i));

  const pct = Math.min(totals.cal / TARGETS.cal, 1);
  const ringDeg = pct * 360;

  return (
    <div className="container py-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Daily Calorie Tracker</h1>
        <p className="text-sm text-muted-foreground">Log your meals and track your nutrition for today.</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <Card className="p-5 shadow-card">
          <h3 className="font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">Today's Summary</h3>
          <div
            className="w-32 h-32 rounded-full mx-auto mb-4 flex items-center justify-center transition-all"
            style={{ background: `conic-gradient(hsl(var(--primary)) ${ringDeg}deg, hsl(var(--secondary)) ${ringDeg}deg)` }}
          >
            <div className="w-24 h-24 bg-card rounded-full flex flex-col items-center justify-center">
              <div className="text-xl font-bold text-primary">{totals.cal}</div>
              <div className="text-[10px] text-muted-foreground">/ {TARGETS.cal} kcal</div>
            </div>
          </div>

          {([
            { label: "Protein", value: totals.prot, target: TARGETS.prot, color: "bg-protein" },
            { label: "Carbs", value: totals.carbs, target: TARGETS.carbs, color: "bg-carbs" },
            { label: "Fats", value: totals.fats, target: TARGETS.fats, color: "bg-fats" },
          ] as const).map((m) => (
            <div key={m.label} className="mb-3">
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span>{m.label}</span>
                <span className="text-muted-foreground font-normal">{m.value}g / {m.target}g</span>
              </div>
              <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                <div className={`h-full ${m.color} transition-all duration-500`} style={{ width: `${Math.min((m.value / m.target) * 100, 100)}%` }} />
              </div>
            </div>
          ))}
        </Card>

        <Card className="p-5 shadow-card">
          <h3 className="font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">Log a Meal</h3>
          <div className="flex flex-wrap gap-2 mb-4">
            <Input placeholder="Food name (e.g. Rice)" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 min-w-[140px]" />
            <Input type="number" placeholder="Calories" value={cal} onChange={(e) => setCal(e.target.value)} className="w-24" />
            <Input type="number" placeholder="Protein g" value={prot} onChange={(e) => setProt(e.target.value)} className="w-24" />
            <Button onClick={add} className="font-semibold"><Plus className="h-4 w-4 mr-1" />Add</Button>
          </div>

          {foods.length === 0 ? (
            <div className="text-center text-sm text-muted-foreground py-6">No meals logged yet.</div>
          ) : (
            <ul className="divide-y">
              {foods.map((f, i) => (
                <li key={i} className="flex items-center justify-between py-2.5 animate-fade-up">
                  <div>
                    <div className="font-semibold text-sm">{f.name}</div>
                    <div className="text-xs text-muted-foreground">P:{f.prot}g · C:{f.carbs}g · F:{f.fats}g</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-primary font-semibold text-sm">{f.cal} kcal</span>
                    <button onClick={() => remove(i)} className="text-muted-foreground hover:text-destructive p-1 rounded transition-smooth" aria-label="Remove">
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  );
};

export default Tracker;
