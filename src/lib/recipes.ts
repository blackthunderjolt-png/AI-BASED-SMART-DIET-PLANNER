export type DietGoal = "weight_loss" | "muscle_gain" | "vegan" | "healthy";

export type RecipeTag = "lowcal" | "protein" | "vegan";

export interface Recipe {
  name: string;
  emoji: string;
  time: string;
  calories: number;
  tag: RecipeTag;
  tagLabel: string;
  goals: DietGoal[];
}

export const recipes: Recipe[] = [
  { name: "Greek Yogurt Parfait", emoji: "🍓", time: "5 min", calories: 320, tag: "lowcal", tagLabel: "LOW CAL", goals: ["weight_loss", "healthy"] },
  { name: "Turkey Wrap", emoji: "🌯", time: "10 min", calories: 350, tag: "lowcal", tagLabel: "LOW CAL", goals: ["weight_loss", "healthy"] },
  { name: "Veggie Soup", emoji: "🥣", time: "15 min", calories: 250, tag: "lowcal", tagLabel: "LOW CAL", goals: ["weight_loss"] },
  { name: "Cottage Cheese Bowl", emoji: "🧀", time: "5 min", calories: 300, tag: "protein", tagLabel: "PROTEIN", goals: ["weight_loss", "healthy"] },
  { name: "Chicken Rice Bowl", emoji: "🍗", time: "25 min", calories: 620, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain"] },
  { name: "Beef Stir Fry", emoji: "🥩", time: "20 min", calories: 650, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain", "healthy"] },
  { name: "Tuna Salad", emoji: "🥗", time: "10 min", calories: 450, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain", "weight_loss"] },
  { name: "Protein Pancakes", emoji: "🥞", time: "15 min", calories: 550, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain"] },
  { name: "Tofu Stir Fry", emoji: "🥢", time: "20 min", calories: 400, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "weight_loss"] },
  { name: "Quinoa Veggie Bowl", emoji: "🥗", time: "30 min", calories: 480, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "healthy"] },
  { name: "Lentil Dal", emoji: "🍲", time: "35 min", calories: 450, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "healthy"] },
  { name: "Black Bean Tacos", emoji: "🌮", time: "20 min", calories: 490, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "healthy"] },
  { name: "Chickpea Curry", emoji: "🍛", time: "25 min", calories: 420, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "weight_loss"] },
  { name: "Tempeh Bowl", emoji: "🍚", time: "20 min", calories: 460, tag: "protein", tagLabel: "VEGAN", goals: ["vegan", "muscle_gain"] },
  { name: "Baked Salmon", emoji: "🐟", time: "20 min", calories: 520, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain", "healthy"] },
  { name: "Avocado Egg Toast", emoji: "🥑", time: "10 min", calories: 420, tag: "lowcal", tagLabel: "LOW CAL", goals: ["healthy", "weight_loss"] },
  { name: "Grilled Chicken Salad", emoji: "🥗", time: "15 min", calories: 380, tag: "lowcal", tagLabel: "LOW CAL", goals: ["weight_loss", "healthy"] },
  { name: "Protein Oatmeal", emoji: "🥣", time: "10 min", calories: 580, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain"] },
  { name: "Mediterranean Salad", emoji: "🫒", time: "10 min", calories: 380, tag: "lowcal", tagLabel: "LOW CAL", goals: ["healthy", "weight_loss"] },
  { name: "Egg White Omelette", emoji: "🍳", time: "10 min", calories: 280, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain", "weight_loss"] },
  { name: "Fruit Smoothie Bowl", emoji: "🫐", time: "5 min", calories: 320, tag: "vegan", tagLabel: "VEGAN", goals: ["vegan", "healthy"] },
  { name: "Shrimp Skewers", emoji: "🍤", time: "15 min", calories: 400, tag: "protein", tagLabel: "PROTEIN", goals: ["muscle_gain", "weight_loss"] },
  { name: "Sweet Potato Fries", emoji: "🍠", time: "30 min", calories: 450, tag: "lowcal", tagLabel: "LOW CAL", goals: ["healthy"] },
  { name: "Kale Smoothie", emoji: "🥬", time: "5 min", calories: 250, tag: "lowcal", tagLabel: "LOW CAL", goals: ["weight_loss", "vegan"] },
];

export const goalLabels: Record<DietGoal | "all", string> = {
  all: "All",
  weight_loss: "🔥 Weight Loss",
  muscle_gain: "💪 Muscle Gain",
  vegan: "🌱 Vegan",
  healthy: "✨ Healthy",
};
