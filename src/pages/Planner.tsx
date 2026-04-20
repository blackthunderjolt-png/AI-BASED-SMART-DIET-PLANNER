import { useEffect, useRef, useState } from "react";
import { recipes } from "@/lib/recipes";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import type { DietGoal } from "@/lib/recipes";

const goals: { v: DietGoal; label: string }[] = [
  { v: "weight_loss", label: "🔥 Weight Loss" },
  { v: "muscle_gain", label: "💪 Muscle Gain" },
  { v: "vegan", label: "🌱 Vegan" },
  { v: "healthy", label: "✨ Healthy" },
];

const goalNames: Record<DietGoal, string> = {
  weight_loss: "Weight Loss",
  muscle_gain: "Muscle Gain",
  vegan: "Vegan",
  healthy: "General Healthy",
};

const tips = [
  { e: "🧠", t: "Analyzing your body metrics..." },
  { e: "🔥", t: "Calculating your calorie target..." },
  { e: "🥗", t: "Selecting the best foods for your goal..." },
  { e: "💪", t: "Optimizing your protein intake..." },
  { e: "📅", t: "Building your weekly schedule..." },
  { e: "✨", t: "Adding variety to your meals..." },
];

const steps = ["Reading profile", "Calculating calories", "Selecting meals", "Building plan"];

// Removed demoPlan - now inline in generate for unique across plan

const calcCalories = (weight: number, height: number, age: number, gender: string, activity: string, goal: DietGoal) => {
  const bmr = gender === "female"
    ? 10 * weight + 6.25 * height - 5 * age - 161
    : 10 * weight + 6.25 * height - 5 * age + 5;
  const mult: Record<string, number> = { sedentary: 1.2, light: 1.375, moderate: 1.55, active: 1.725 };
  let cals = bmr * (mult[activity] ?? 1.55);
  if (goal === "weight_loss") cals -= 400;
  if (goal === "muscle_gain") cals += 350;
  return Math.round(cals / 10) * 10;
};

const Planner = () => {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [activity, setActivity] = useState("moderate");
  const [duration, setDuration] = useState("7");
  const [goal, setGoal] = useState<DietGoal>("weight_loss");
  const [allergies, setAllergies] = useState("");

  const [loading, setLoading] = useState(false);
  const [tipIdx, setTipIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const [plan, setPlan] = useState<{ days: { day: number; meals: string[] }[]; cals: number } | null>(null);
  const resultRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading) return;
    const t1 = setInterval(() => setTipIdx((i) => (i + 1) % tips.length), 1500);
    const t2 = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 12 + 4, 95);
        setStepIdx(Math.min(Math.floor(next / 25), 3));
        return next;
      });
    }, 500);
    return () => { clearInterval(t1); clearInterval(t2); };
  }, [loading]);

  const generate = async () => {
    if (!age || !weight || !height) {
      toast.warning("Please enter age, weight and height");
      return;
    }
    setPlan(null);
    setProgress(0);
    setStepIdx(0);
    setTipIdx(0);
    setLoading(true);

    // Simulated generation (UI-only; real AI to be added later)
    await new Promise((r) => setTimeout(r, 2400));

    const cals = calcCalories(+weight, +height, +age, gender, activity, goal);
    const dayCount = +duration;
    
    // Generate unique meals across entire plan
    const filtered = recipes.filter(r => r.goals.includes(goal));
    let allMeals: string[];
    if (filtered.length === 0) {
      // Fallback hardcoded, repeat if needed for long plans
      const fallback: Record<DietGoal, string[]> = {
        weight_loss: ["Breakfast: Oats with banana — 300 kcal", "Lunch: Grilled chicken salad — 420 kcal", "Snack: Apple — 80 kcal", "Dinner: Baked fish with vegetables — 380 kcal"],
        muscle_gain: ["Breakfast: Eggs, toast & peanut butter — 550 kcal", "Lunch: Chicken rice bowl — 700 kcal", "Snack: Protein shake — 200 kcal", "Dinner: Beef with sweet potato — 650 kcal"],
        vegan: ["Breakfast: Smoothie bowl with fruits — 350 kcal", "Lunch: Lentil curry with rice — 500 kcal", "Snack: Hummus with vegetables — 180 kcal", "Dinner: Tofu stir fry — 450 kcal"],
        healthy: ["Breakfast: Avocado toast with eggs — 400 kcal", "Lunch: Mediterranean salad with chicken — 480 kcal", "Snack: Mixed nuts — 160 kcal", "Dinner: Grilled salmon with vegetables — 450 kcal"],
      };
      const fbMeals = fallback[goal];
      allMeals = Array(dayCount * 4).fill(0).flatMap(() => [...fbMeals]); // Repeat cycle for fallback
    } else {
      // Seeded shuffle full pool
      let seed = parseInt(new Date().toDateString().slice(-1)) * 31; // Daily seed
      const shuffled = [...filtered];
      for (let i = shuffled.length - 1; i > 0; i--) {
        seed = (seed * 9301 + 49297) % 233280;
        const j = Math.floor(seed / 233280 * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      // Take up to needed (unique), cycle if short
      const needed = dayCount * 4;
      const selected = shuffled.slice(0, needed);
      if (selected.length < needed) {
        // Cycle shuffle if insufficient
        const extra = Array(Math.ceil((needed - selected.length) / shuffled.length)).fill(shuffled).flat().slice(0, needed - selected.length);
        allMeals = [...selected.map(r => `${r.emoji} ${r.name} — ${r.calories} kcal`), ...extra.map(r => `${r.emoji} ${r.name} — ${r.calories} kcal`)];
      } else {
        allMeals = selected.map(r => `${r.emoji} ${r.name} — ${r.calories} kcal`);
      }
    }
    
    const days = Array.from({ length: dayCount }, (_, i) => ({
      day: i + 1,
      meals: allMeals.slice(i * 4, (i + 1) * 4),
    }));

    setProgress(100);
    setStepIdx(3);
    setTimeout(() => {
      setPlan({ days, cals });
      setLoading(false);
      toast.success("Plan generated!");
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
    }, 400);
  };

  return (
    <div className="container py-8 space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">AI Meal Planner</h1>
        <p className="text-sm text-muted-foreground">Fill in your details to get a personalized meal plan.</p>
      </div>

      <Card className="p-6 shadow-card">
        <h2 className="font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">Your Details</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label htmlFor="age">Age</Label>
            <Input id="age" type="number" placeholder="e.g. 25" value={age} onChange={(e) => setAge(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Gender</Label>
            <Select value={gender} onValueChange={setGender}>
              <SelectTrigger><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="weight">Weight (kg)</Label>
            <Input id="weight" type="number" placeholder="e.g. 65" value={weight} onChange={(e) => setWeight(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="height">Height (cm)</Label>
            <Input id="height" type="number" placeholder="e.g. 170" value={height} onChange={(e) => setHeight(e.target.value)} />
          </div>
          <div className="space-y-1.5">
            <Label>Activity Level</Label>
            <Select value={activity} onValueChange={setActivity}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="sedentary">Sedentary</SelectItem>
                <SelectItem value="light">Light (1–3x/week)</SelectItem>
                <SelectItem value="moderate">Moderate (3–5x/week)</SelectItem>
                <SelectItem value="active">Active (6–7x/week)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5">
            <Label>Plan Duration</Label>
            <Select value={duration} onValueChange={setDuration}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3-day plan</SelectItem>
                <SelectItem value="5">5-day plan</SelectItem>
                <SelectItem value="7">7-day plan</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label>Diet Goal</Label>
            <div className="flex flex-wrap gap-2">
              {goals.map((g) => (
                <button
                  key={g.v}
                  type="button"
                  onClick={() => setGoal(g.v)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm transition-smooth",
                    goal === g.v
                      ? "bg-primary text-primary-foreground border-primary font-semibold"
                      : "bg-background border-border text-muted-foreground hover:border-primary hover:text-primary"
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>
          <div className="space-y-1.5 sm:col-span-2">
            <Label htmlFor="allergies">Food Allergies (optional)</Label>
            <Input id="allergies" placeholder="e.g. nuts, dairy, gluten" value={allergies} onChange={(e) => setAllergies(e.target.value)} />
          </div>
        </div>
        <Button onClick={generate} disabled={loading} className="w-full mt-5 font-semibold">
          {loading ? "Generating..." : "Generate My Meal Plan"}
        </Button>
      </Card>

      {loading && (
        <Card className="p-6 text-center shadow-card animate-fade-up">
          <div className="text-4xl mb-2 animate-bob">{tips[tipIdx].e}</div>
          <div className="font-semibold text-sm mb-1">AI is creating your plan...</div>
          <div className="text-sm text-primary mb-3 transition-opacity">{tips[tipIdx].t}</div>
          <div className="bg-secondary rounded-full h-2 max-w-sm mx-auto overflow-hidden mb-3">
            <div className="h-full bg-primary transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <div className="flex justify-center gap-3 text-xs flex-wrap">
            {steps.map((s, i) => (
              <span key={s} className={cn(
                i < stepIdx && "text-primary font-semibold",
                i === stepIdx && "text-foreground font-semibold",
                i > stepIdx && "text-muted-foreground/60",
              )}>
                {s}
              </span>
            ))}
          </div>
        </Card>
      )}

      {plan && (
        <Card ref={resultRef} className="p-6 shadow-card animate-fade-up">
          <div className="flex items-center justify-between flex-wrap gap-2 mb-4">
            <h3 className="text-lg font-bold text-primary">{goalNames[goal]} Plan</h3>
            <Badge variant="secondary" className="text-primary font-semibold">~{plan.cals} kcal/day</Badge>
          </div>
          <div className="space-y-4">
            {plan.days.map((d) => (
              <div key={d.day}>
                <h4 className="font-semibold text-primary mb-1.5">Day {d.day}</h4>
                <ul className="space-y-1 text-sm text-foreground/80">
                  {d.meals.map((m, i) => {
                    const [label, rest] = m.split(":");
                    return (
                      <li key={i}>
                        <span className="font-semibold">{label}:</span>{rest}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Demo plan — connect AI in a future step for fully personalized day-by-day meals.
          </p>
        </Card>
      )}
    </div>
  );
};

export default Planner;
