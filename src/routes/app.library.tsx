import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, Sparkles, Database } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdCard } from "@/components/AdCard";
import { savedLibrary, type GeneratedAd } from "@/lib/advibe-data";
import { supabase } from "@/lib/supabase";

export const Route = createFileRoute("/app/library")({
  head: () => ({
    meta: [
      { title: "Saved Library — AdVibe AI" },
      {
        name: "description",
        content: "Every ad variant you starred, grouped by platform and ready to relaunch.",
      },
      { property: "og:title", content: "Saved Library — AdVibe AI" },
      { property: "og:description", content: "Your starred ad variants, ready to relaunch." },
    ],
  }),
  component: Library,
});

function Library() {
  const [ads, setAds] = useState<GeneratedAd[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCloud, setIsCloud] = useState(false);

  const fetchAds = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("saved_ads")
        .select("*")
        .order("created_at", { ascending: false });

      if (error || !data || data.length === 0) {
        setAds(savedLibrary);
        setIsCloud(false);
      } else {
        const mapped: GeneratedAd[] = data.map((item) => ({
          id: item.id,
          platform: item.platform,
          tone: item.tone,
          hook: item.hook,
          body: item.body,
          cta: item.cta,
          ctr: Number(item.ctr_score) || 3.8,
        }));
        setAds(mapped);
        setIsCloud(true);
      }
    } catch (err) {
      console.error(err);
      setAds(savedLibrary);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAds();
  }, []);

  const handleDelete = (id: string) => {
    setAds((prev) => prev.filter((a) => a.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold sm:text-3xl">Saved Library</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Starred variants from your campaigns stored in Supabase.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
          <Database className="h-3.5 w-3.5 text-cyan" />
          <span>{isCloud ? "Connected to Supabase DB" : "Local preview data"}</span>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All ({ads.length})</TabsTrigger>
          <TabsTrigger value="top">Top CTR</TabsTrigger>
        </TabsList>

        {loading ? (
          <div className="flex h-40 items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-cyan" />
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-5 grid gap-5 md:grid-cols-2">
              {ads.map((ad) => (
                <AdCard key={ad.id} ad={ad} saved onDeleted={handleDelete} />
              ))}
            </TabsContent>
            <TabsContent value="top" className="mt-5 grid gap-5 md:grid-cols-2">
              {[...ads]
                .sort((a, b) => b.ctr - a.ctr)
                .slice(0, 4)
                .map((ad) => (
                  <AdCard key={ad.id} ad={ad} saved onDeleted={handleDelete} />
                ))}
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

