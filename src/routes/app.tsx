import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { useState } from "react";
import {
  Sparkles,
  Wand2,
  Star,
  BarChart3,
  Settings,
  Plus,
  LogIn,
  LogOut,
  User,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

export const Route = createFileRoute("/app")({
  component: AppLayout,
});

const nav = [
  { to: "/app/generator", label: "Ad Generator", icon: Wand2 },
  { to: "/app/library", label: "Saved Library", icon: Star },
  { to: "/app/analytics", label: "Analytics", icon: BarChart3 },
  { to: "/app/settings", label: "Admin & Settings", icon: Settings },
] as const;

function AppLayout() {
  const { user, profile, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);

  const credits = profile?.credits ?? 50;
  const maxCredits = 50;

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
                <Badge
                  variant="glow"
                  className="cursor-pointer whitespace-nowrap"
                  onClick={() => !profile && setAuthModalOpen(true)}
                >
                  <Sparkles className="mr-1 h-3 w-3 text-cyan" />
                  {credits} / {maxCredits} Credits
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                {profile
                  ? `Live balance for ${profile.full_name}`
                  : "Click to sign in and keep your balance"}
              </TooltipContent>
            </Tooltip>

            <Button asChild variant="gradient" size="sm">
              <Link to="/app/generator">
                <Plus className="mr-1 h-4 w-4" /> New campaign
              </Link>
            </Button>

            {profile ? (
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-2 border-border/80 bg-surface/50 px-2 sm:px-3"
                    >
                      <Avatar className="h-6 w-6 border border-border">
                        <AvatarImage
                          src={
                            profile.avatar_url ||
                            `https://api.dicebear.com/7.x/bottts/svg?seed=${profile.id}`
                          }
                          alt={profile.full_name}
                        />
                        <AvatarFallback>
                          {profile.full_name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="hidden max-w-[120px] truncate text-xs font-medium sm:inline-block">
                        {profile.full_name}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="glass w-60" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-semibold leading-none">{profile.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{profile.email}</p>
                        <p className="mt-1 text-[11px] text-cyan font-mono">{profile.plan} Plan</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link to="/app/settings" className="flex items-center cursor-pointer">
                        <User className="mr-2 h-4 w-4" />
                        <span>Account & Admin</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => setAuthModalOpen(true)}
                      className="cursor-pointer"
                    >
                      <Sparkles className="mr-2 h-4 w-4 text-cyan" />
                      <span>Switch Account Persona</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => signOut()}
                      className="cursor-pointer text-destructive focus:text-destructive"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sign Out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                  onClick={() => signOut()}
                  title="Sign out of current account"
                >
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                className="gap-1.5"
                onClick={() => setAuthModalOpen(true)}
              >
                <LogIn className="h-3.5 w-3.5" />
                <span>Sign In / Register</span>
              </Button>
            )}
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
              {n.label.split(" ")[0]}
            </Link>
          ))}
        </div>
      </nav>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}

