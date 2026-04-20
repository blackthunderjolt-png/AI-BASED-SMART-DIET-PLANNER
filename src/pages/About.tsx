import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const About = () => {
  return (
    <div className="container py-8 space-y-5 max-w-3xl">
      <div>
        <h1 className="text-2xl font-bold text-primary">About This Project</h1>
        <p className="text-sm text-muted-foreground">AI Smart Diet Planner</p>
      </div>

      <Card className="p-6 shadow-card space-y-5">
        <section>
          <h2 className="font-semibold text-primary mb-2">Project Overview</h2>
          <p className="text-sm text-foreground/80 leading-relaxed">
            The AI Smart Diet Planner is a web application that helps you build personalized meal plans
            based on your age, weight, height, activity level and fitness goal — and then track your daily
            calories and macros as you eat.
          </p>
        </section>

        <section>
          <h2 className="font-semibold text-primary mb-2">Features</h2>
          <ul className="text-sm text-foreground/80 leading-relaxed list-disc pl-5 space-y-1">
            <li>Personalized meal plan generator</li>
            <li>Support for Weight Loss, Muscle Gain, Vegan and Healthy goals</li>
            <li>Daily calorie & macronutrient tracker</li>
            <li>Recipe library with diet-type filters</li>
            <li>Clean, mobile-friendly interface</li>
          </ul>
        </section>

        <section>
          <h2 className="font-semibold text-primary mb-2">Built With</h2>
          <div className="flex flex-wrap gap-2">
            {["React", "TypeScript", "Tailwind CSS", "shadcn/ui"].map((t) => (
              <Badge key={t} variant="secondary" className="text-primary font-semibold">{t}</Badge>
            ))}
          </div>
        </section>
      </Card>
    </div>
  );
};

export default About;
