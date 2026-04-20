import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { recipes, goalLabels, type DietGoal } from "@/lib/recipes";
import { Clock, Flame } from "lucide-react";

const filters: ("all" | DietGoal)[] = ["all", "weight_loss", "muscle_gain", "vegan", "healthy"];

const tagStyle: Record<string, string> = {
  lowcal: "bg-[hsl(var(--tag-low-bg))] text-[hsl(var(--tag-low))]",
  protein: "bg-[hsl(var(--tag-protein-bg))] text-[hsl(var(--tag-protein))]",
  vegan: "bg-[hsl(var(--tag-vegan-bg))] text-[hsl(var(--tag-vegan))]",
};

const Recipes = () => {
  const [active, setActive] = useState<"all" | DietGoal>("all");
  const list = useMemo(
    () => (active === "all" ? recipes : recipes.filter((r) => r.goals.includes(active))),
    [active],
  );

  return (
    <div className="container py-8 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-primary">Recipe Library</h1>
        <p className="text-sm text-muted-foreground">Browse healthy recipes based on your diet goal.</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm transition-smooth",
              active === f
                ? "bg-primary text-primary-foreground border-primary font-semibold"
                : "bg-card border-border text-muted-foreground hover:border-primary hover:text-primary",
            )}
          >
            {goalLabels[f]}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {list.map((r) => (
          <Card key={r.name} className="overflow-hidden shadow-card hover:-translate-y-1 transition-smooth cursor-pointer">
            <div className="bg-secondary h-24 flex items-center justify-center text-4xl">{r.emoji}</div>
            <div className="p-3">
              <span className={cn("inline-block text-[10px] font-bold px-2 py-0.5 rounded mb-1.5", tagStyle[r.tag])}>
                {r.tagLabel}
              </span>
              <h4 className="font-semibold text-sm mb-1">{r.name}</h4>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{r.time}</span>
                <span className="flex items-center gap-1"><Flame className="h-3 w-3" />{r.calories} kcal</span>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Recipes;
