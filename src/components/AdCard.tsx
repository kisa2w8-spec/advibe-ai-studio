import { useState } from "react";
import { Copy, Star, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GeneratedAd } from "@/lib/advibe-data";
import { supabase } from "@/lib/supabase";

export function AdCard({
  ad,
  saved = false,
  onDeleted,
}: {
  ad: GeneratedAd;
  saved?: boolean;
  onDeleted?: (id: string) => void;
}) {
  const [isSaved, setIsSaved] = useState(saved);
  const [copied, setCopied] = useState(false);
  const [saving, setSaving] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(`${ad.hook}\n\n${ad.body}\n\n${ad.cta}`);
    setCopied(true);
    toast.success("Ad copy copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
  };

  const toggleSave = async () => {
    setSaving(true);
    try {
      if (isSaved) {
        // Delete from Supabase
        const { error } = await supabase.from("saved_ads").delete().eq("hook", ad.hook);
        if (!error) {
          setIsSaved(false);
          toast.success("Removed from Supabase library");
          onDeleted?.(ad.id);
        } else {
          toast.error(`Error removing: ${error.message}`);
        }
      } else {
        // Insert into Supabase
        const { error } = await supabase.from("saved_ads").insert({
          product_name: ad.hook.slice(0, 40),
          platform: ad.platform,
          tone: ad.tone,
          hook: ad.hook,
          body: ad.body,
          cta: ad.cta,
          ctr_score: ad.ctr,
        });

        if (!error) {
          setIsSaved(true);
          toast.success("Saved to Supabase database! 🚀");
        } else {
          toast.error(`Error saving: ${error.message}`);
        }
      }
    } catch (err: unknown) {
      console.error(err);
      toast.error("Failed to connect to database");
    } finally {
      setSaving(false);
    }
  };

  return (
    <article className="glass flex flex-col rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:glow">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="outline" className="border-border text-[11px]">
          {ad.platform}
        </Badge>
        <Badge variant="glow" className="text-[11px]">
          {ad.tone}
        </Badge>
        <span className="ml-auto text-xs text-muted-foreground">
          Est. CTR <span className="font-semibold text-cyan">{ad.ctr}%</span>
        </span>
      </div>

      <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">Hook</p>
      <h3 className="mt-1 font-display text-base font-semibold leading-snug">{ad.hook}</h3>

      <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">Body copy</p>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{ad.body}</p>

      <p className="mt-4 text-[10px] uppercase tracking-widest text-muted-foreground">
        Call to action
      </p>
      <p className="mt-1 text-sm font-medium">{ad.cta}</p>

      <div className="mt-5 flex items-center gap-2 border-t border-border pt-4">
        <Button variant="outline" size="sm" onClick={copy}>
          {copied ? <Check className="mr-1.5 h-3.5 w-3.5" /> : <Copy className="mr-1.5 h-3.5 w-3.5" />}
          Copy
        </Button>
        <Button
          variant={isSaved ? "gradient" : "ghost"}
          size="sm"
          disabled={saving}
          onClick={toggleSave}
        >
          {saving ? (
            <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" />
          ) : (
            <Star className={`mr-1.5 h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
          )}
          {isSaved ? "Saved in Cloud" : "Save to DB"}
        </Button>
      </div>
    </article>
  );
}
