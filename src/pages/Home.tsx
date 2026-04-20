import { Link } from "react-router-dom";
import { Bot, BarChart3, UtensilsCrossed, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const features = [
  { icon: Bot, title: "AI Meal Plans", desc: "Plans tailored to your age, weight, height and goal." },
  { icon: BarChart3, title: "Calorie Tracker", desc: "Log meals and track calories, protein, carbs and fats." },
  { icon: UtensilsCrossed, title: "Recipe Library", desc: "Browse healthy recipes filtered by your diet goal." },
];

const goals = [
  { emoji: "🔥", title: "Weight Loss", desc: "Calorie deficit with high-satiety foods", color: "border-l-fats bg-fats/10" },
  { emoji: "💪", title: "Muscle Gain", desc: "High protein plan for muscle building", color: "border-l-protein bg-protein/10" },
  { emoji: "🌱", title: "Vegan", desc: "Fully plant-based balanced meals", color: "border-l-primary bg-primary/10" },
  { emoji: "✨", title: "General Healthy", desc: "Balanced nutrition for overall wellness", color: "border-l-carbs bg-carbs/10" },
];

const Home = () => {
  return (
    <div className="container py-8 space-y-6">
      <section className="gradient-hero text-primary-foreground rounded-xl px-6 py-12 text-center shadow-elevated animate-fade-up">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">🥗 AI Smart Diet Planner</h1>
        <p className="opacity-90 mb-6 max-w-xl mx-auto">
          Enter your details and get a personalized meal plan tailored to your body and your goals.
        </p>
        <Button asChild size="lg" variant="secondary" className="font-semibold">
          <Link to="/planner">
            Get My Meal Plan <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </section>

      <section className="grid gap-4 sm:grid-cols-3">
        {features.map((f) => (
          <Card key={f.title} className="p-5 text-center border-t-4 border-t-primary shadow-card">
            <f.icon className="mx-auto h-7 w-7 text-primary mb-2" />
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-muted-foreground">{f.desc}</p>
          </Card>
        ))}
      </section>

      <Card className="p-6 shadow-card">
        <h2 className="text-lg font-semibold text-primary border-b-2 border-secondary pb-2 mb-4">
          Supported Diet Goals
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {goals.map((g) => (
            <div key={g.title} className={`rounded-md border-l-4 p-3 ${g.color}`}>
              <div className="font-semibold text-sm">{g.emoji} {g.title}</div>
              <div className="text-xs text-muted-foreground">{g.desc}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default Home;
