import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export const Route = createFileRoute("/app/settings")({
  head: () => ({
    meta: [
      { title: "Settings — AdVibe AI" },
      {
        name: "description",
        content: "Manage your brand voice, workspace details and generation preferences.",
      },
      { property: "og:title", content: "Settings — AdVibe AI" },
      { property: "og:description", content: "Brand voice, workspace and generation preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const [autoScore, setAutoScore] = useState(true);
  const [emoji, setEmoji] = useState(true);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">Workspace and generation preferences.</p>
      </div>

      <div className="glass space-y-5 rounded-2xl p-5">
        <div className="space-y-2">
          <Label htmlFor="ws">Workspace name</Label>
          <Input id="ws" defaultValue="Lumen Growth Team" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="voice">Brand voice notes</Label>
          <Input id="voice" defaultValue="Warm, direct, never salesy. Short sentences." />
        </div>
        <div className="flex items-center justify-between gap-4 border-t border-border pt-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Auto-score every variant</p>
            <p className="text-xs text-muted-foreground">Runs the A/B scorer on generation.</p>
          </div>
          <Switch checked={autoScore} onCheckedChange={setAutoScore} />
        </div>
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="text-sm font-medium">Allow emoji in hooks</p>
            <p className="text-xs text-muted-foreground">Recommended for TikTok and Shorts.</p>
          </div>
          <Switch checked={emoji} onCheckedChange={setEmoji} />
        </div>
        <Button variant="gradient" onClick={() => toast.success("Settings saved")}>
          Save changes
        </Button>
      </div>

      <div className="glass flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5">
        <div>
          <p className="font-display font-semibold">Plan</p>
          <p className="text-sm text-muted-foreground">150 of 200 monthly credits remaining</p>
        </div>
        <Badge variant="glow">Pro · Yearly</Badge>
      </div>
    </div>
  );
}
