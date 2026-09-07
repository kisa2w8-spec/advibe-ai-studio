import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  Database,
  Key,
  PlusCircle,
  Shield,
  UserCheck,
  Zap,
  LogIn,
  LogOut,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Account & Admin Settings — AdVibe AI" },
      {
        name: "description",
        content: "Manage your brand voice, Supabase user profile, credits and workspace settings.",
      },
      { property: "og:title", content: "Account & Admin — AdVibe AI" },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const { user, profile, addCredits, signOut } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [autoScore, setAutoScore] = useState(true);
  const [emoji, setEmoji] = useState(true);
  const [wsName, setWsName] = useState(profile?.full_name || "Lumen Growth Team");

  const handleAddCredits = async () => {
    await addCredits(50);
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Admin & Workspace</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage Supabase connection, user authentication and AI generation controls.
        </p>
      </div>

      {/* 1. Supabase User / Account Card */}
      <div className="glass space-y-4 rounded-2xl p-6 border border-white/10">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-brand glow text-white">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-semibold">
                {user ? (profile?.full_name || "Active Member") : "Guest Mode (Local)"}
              </h2>
              <p className="text-xs text-muted-foreground">
                {user ? user.email : "Not logged into Supabase Auth yet"}
              </p>
            </div>
          </div>

          <div>
            {user ? (
              <Button variant="outline" size="sm" onClick={() => signOut()}>
                <LogOut className="mr-1.5 h-3.5 w-3.5" /> Sign Out
              </Button>
            ) : (
              <Button variant="gradient" size="sm" onClick={() => setAuthModalOpen(true)}>
                <LogIn className="mr-1.5 h-3.5 w-3.5" /> Sign In / Register
              </Button>
            )}
          </div>
        </div>

        {user && (
          <div className="grid grid-cols-1 gap-3 rounded-xl bg-secondary/30 p-4 sm:grid-cols-3 text-xs">
            <div>
              <span className="text-muted-foreground block">User UUID:</span>
              <span className="font-mono truncate block text-[11px] text-cyan">{user.id}</span>
            </div>
            <div>
              <span className="text-muted-foreground block">Role & Plan:</span>
              <span className="font-medium text-foreground">
                {profile?.role || "Owner"} · {profile?.plan || "Pro"}
              </span>
            </div>
            <div>
              <span className="text-muted-foreground block">Auth Provider:</span>
              <span className="font-mono text-[11px] text-muted-foreground">supabase-auth / email</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. Credits & Balance Engine */}
      <div className="glass flex flex-col justify-between gap-4 rounded-2xl p-6 sm:flex-row sm:items-center">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-cyan" />
            <h3 className="font-display font-semibold">AI Credits Balance</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            Current balance: <span className="font-bold text-foreground">{profile?.credits ?? 50}</span> / 50 monthly credits
          </p>
          <p className="text-xs text-muted-foreground">1 generation brief = 1 credit</p>
        </div>

        <Button variant="outline" size="sm" className="gap-1.5" onClick={handleAddCredits}>
          <PlusCircle className="h-4 w-4 text-cyan" />
          <span>Top up +50 Test Credits</span>
        </Button>
      </div>

      {/* 3. Database Schema Status */}
      <div className="glass space-y-4 rounded-2xl p-6">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-cyan" />
          <h3 className="font-display font-semibold">Supabase Cloud Status</h3>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-xl border border-border/60 bg-background/50 p-3.5">
            <p className="text-xs text-muted-foreground">Target Instance</p>
            <p className="font-mono text-xs font-semibold text-foreground truncate mt-0.5">
              ozsshipryxfnouwppfot.supabase.co
            </p>
          </div>
          <div className="rounded-xl border border-border/60 bg-background/50 p-3.5">
            <p className="text-xs text-muted-foreground">Active Tables</p>
            <p className="text-xs font-semibold text-cyan mt-0.5">
              `saved_ads` · `profiles` · `auth.users`
            </p>
          </div>
        </div>
      </div>

      {/* 4. Generation Preferences */}
      <div className="glass space-y-5 rounded-2xl p-6">
        <h3 className="font-display font-semibold">Workspace Settings</h3>
        <div className="space-y-2">
          <Label htmlFor="ws">Workspace name</Label>
          <Input id="ws" value={wsName} onChange={(e) => setWsName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice">Brand voice notes</Label>
          <Input id="voice" defaultValue="Punchy, viral, zero fluff. Optimized for high ROAS." />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Auto-score every variant</p>
            <p className="text-xs text-muted-foreground">Runs the CTR scorer on generation.</p>
          </div>
          <Switch checked={autoScore} onCheckedChange={setAutoScore} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Allow emoji in hooks</p>
            <p className="text-xs text-muted-foreground">Recommended for TikTok and Reels.</p>
          </div>
          <Switch checked={emoji} onCheckedChange={setEmoji} />
        </div>
        <Button variant="gradient" onClick={() => toast.success("Settings saved successfully!")}>
          Save changes
        </Button>
      </div>

      <AuthModal open={authModalOpen} onOpenChange={setAuthModalOpen} />
    </div>
  );
}

