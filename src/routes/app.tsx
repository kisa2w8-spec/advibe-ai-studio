import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { Sparkles, Wand2, Star, BarChart3, Settings, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app/generator", label: "Ad Generator", icon: Wand2 },
  { to: "/app/library", label: "Saved Library", icon: Star },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Settings", icon: Settings },
] as const;

function AppLayout() {
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
        <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 sm:flex sm:justify-between">
          <Link to="/" className="flex min-w-0 items-center gap-2.5">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-gradient-brand glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </span>
            <span className="truncate font-display font-bold">AdVibe AI</span>
          </Link>
          <div className="flex items-center gap-2 sm:gap-3">
            <Tooltip>
              <TooltipTrigger asChild>
                <Badge variant="glow" className="whitespace-nowrap">
                  150 / 200 Credits
                </Badge>
              </TooltipTrigger>
              <TooltipContent>Credits reset on the 1st of each month</TooltipContent>
            </Tooltip>
            <Button asChild variant="gradient" size="sm">
              <Link to="/app/generator">
                <Plus className="mr-1 h-4 w-4" /> New campaign
              </Link>
            </Button>
            <Avatar className="h-8 w-8 shrink-0 border border-border">
              <AvatarImage
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=faces"
                alt="Maya Ortiz"
              />
              <AvatarFallback>MO</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl gap-6 px-4 py-6">
        <aside className="hidden w-56 shrink-0 lg:block">
          <nav className="glass sticky top-24 space-y-1 rounded-2xl p-3">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeProps={{ className: "bg-gradient-brand text-primary-foreground" }}
                inactiveProps={{ className: "text-muted-foreground hover:bg-secondary" }}
                className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors"
              >
                <n.icon className="h-4 w-4 shrink-0" />
                {n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1 pb-24 lg:pb-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/90 backdrop-blur-xl lg:hidden">
        <div className="grid grid-cols-4">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-muted-foreground" }}
              className="flex flex-col items-center gap-1 py-2.5 text-[11px]"
            >
              <n.icon className="h-4 w-4" />
              {n.label.split(" ")[1] ?? n.label}
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
}
