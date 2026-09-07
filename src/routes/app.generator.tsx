import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Loader2, Sparkles, Wand2, Zap } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { AdCard } from "@/components/AdCard";
import { generateAds, type GeneratedAd, type Platform, type Tone } from "@/lib/advibe-data";
import { useAuth } from "@/contexts/AuthContext";

export const Route = createFileRoute("/app/generator")({
  head: () => ({
    meta: [
      { title: "Ad Generator — AdVibe AI" },
      {
        name: "description",
        content:
          "Generate scored ad variants with hooks, body copy and CTAs for TikTok, Meta, Google Search and YouTube Shorts.",
      },
      { property: "og:title", content: "Ad Generator — AdVibe AI" },
      {
        property: "og:description",
        content: "Describe your product and get platform-native ad variants with CTR estimates.",
      },
    ],
  }),
  component: Generator,
});

const tones: Tone[] = ["Viral", "Urgency", "Storytelling", "Professional"];
const platforms: Platform[] = ["TikTok", "Meta / Instagram", "Google Search", "YouTube Shorts"];

const seed = generateAds({
  product: "Lumen Sleep Mask",
  description: "A weighted, cooling sleep mask that blocks 100% of light.",
  audience: "burnt-out founders",
  tone: "Viral",
  platform: "TikTok",
});

function Generator() {
  const { consumeCredit, profile } = useAuth();
  const [product, setProduct] = useState("Lumen Sleep Mask");
  const [description, setDescription] = useState(
    "A weighted, cooling sleep mask that blocks 100% of light and helps you fall asleep in under 9 minutes.",
  );
  const [audience, setAudience] = useState("burnt-out founders aged 28-45");
  const [tone, setTone] = useState<Tone>("Viral");
  const [platform, setPlatform] = useState<Platform>("TikTok");
  const [count, setCount] = useState(3);
  const [loading, setLoading] = useState(false);
  const [ads, setAds] = useState<GeneratedAd[]>(seed);

  const run = async () => {
    const ok = await consumeCredit();
    if (!ok) return;

    setLoading(true);
    setTimeout(() => {
      setAds(generateAds({ product, description, audience, tone, platform, count }));
      setLoading(false);
      toast.success(`Generated ${count} variants (-1 credit) ✨`);
    }, 1200);
  };


  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Ad Generator</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          One brief in, scored platform-native variants out.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[380px_minmax(0,1fr)]">
        <div className="glass h-fit space-y-5 rounded-2xl p-5">
          <div className="space-y-2">
            <Label htmlFor="product">Product name</Label>
            <Input id="product" value={product} onChange={(e) => setProduct(e.target.value)} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="desc">Product description</Label>
            <Textarea
              id="desc"
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="aud">Target audience</Label>
            <Input id="aud" value={audience} onChange={(e) => setAudience(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
            <div className="space-y-2">
              <Label>Tone of voice</Label>
              <Select value={tone} onValueChange={(v) => setTone(v as Tone)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tones.map((t) => (
                    <SelectItem key={t} value={t}>
                      {t}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Platform</Label>
              <Select value={platform} onValueChange={(v) => setPlatform(v as Platform)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {platforms.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-3">
            <Label>Variants: {count}</Label>
            <Slider
              value={[count]}
              min={1}
              max={3}
              step={1}
              onValueChange={(v) => setCount(v[0] ?? 3)}
            />
          </div>
          <Button variant="gradient" size="lg" className="w-full" onClick={run} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating campaign…
              </>
            ) : (
              <>
                <Wand2 className="mr-2 h-4 w-4" /> Generate campaign
              </>
            )}
          </Button>
        </div>

        <div>
          <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="h-4 w-4 text-cyan" />
            {loading ? "Scoring variants…" : `${ads.length} variants ready`}
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            {loading
              ? Array.from({ length: count }).map((_, i) => (
                  <div key={i} className="glass h-64 animate-pulse rounded-2xl" />
                ))
              : ads.map((ad) => <AdCard key={ad.id} ad={ad} />)}
          </div>
        </div>
      </div>
    </div>
  );
}
