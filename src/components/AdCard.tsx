import { useState } from "react";
import { Copy, Star, Check } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GeneratedAd } from "@/lib/advibe-data";

export function AdCard({ ad, saved = false }: { ad: GeneratedAd; saved?: boolean }) {
  const [isSaved, setIsSaved] = useState(saved);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard?.writeText(`${ad.hook}\n\n${ad.body}\n\n${ad.cta}`);
    setCopied(true);
    toast.success("Ad copy copied to clipboard");
    setTimeout(() => setCopied(false), 1600);
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
          onClick={() => {
            setIsSaved((v) => !v);
            toast(isSaved ? "Removed from library" : "Saved to library");
          }}
        >
          <Star className={`mr-1.5 h-3.5 w-3.5 ${isSaved ? "fill-current" : ""}`} />
          {isSaved ? "Saved" : "Save"}
        </Button>
      </div>
    </article>
  );
}
