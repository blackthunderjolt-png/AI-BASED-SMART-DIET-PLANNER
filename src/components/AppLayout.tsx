import { Outlet } from "react-router-dom";
import { SiteNav } from "@/components/SiteNav";

export const AppLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SiteNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};
