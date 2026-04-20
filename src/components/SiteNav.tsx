import { Salad } from "lucide-react";
import { NavLink } from "@/components/NavLink";

const links = [
  { to: "/", label: "Home", end: true },
  { to: "/planner", label: "Planner" },
  { to: "/tracker", label: "Tracker" },
  { to: "/recipes", label: "Recipes" },
  { to: "/about", label: "About" },
];

export const SiteNav = () => {
  return (
    <header className="sticky top-0 z-50 gradient-hero shadow-elevated">
      <div className="container flex items-center justify-between py-3">
        <NavLink to="/" className="flex items-center gap-2 text-primary-foreground">
          <Salad className="h-5 w-5" />
          <span className="font-bold tracking-tight">AI Diet Planner</span>
        </NavLink>
        <nav className="flex flex-wrap items-center gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              className="rounded-md px-3 py-1.5 text-sm text-primary-foreground/80 hover:bg-white/15 hover:text-primary-foreground transition-smooth"
              activeClassName="bg-white/20 text-primary-foreground font-medium"
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
