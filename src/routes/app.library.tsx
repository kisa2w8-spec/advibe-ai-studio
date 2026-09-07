import { createFileRoute } from "@tanstack/react-router";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AdCard } from "@/components/AdCard";
import { savedLibrary } from "@/lib/advibe-data";

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
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold sm:text-3xl">Saved Library</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Starred variants from your past campaigns.
        </p>
      </div>
      <Tabs defaultValue="all">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="top">Top CTR</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="mt-5 grid gap-5 md:grid-cols-2">
          {savedLibrary.map((ad) => (
            <AdCard key={ad.id} ad={ad} saved />
          ))}
        </TabsContent>
        <TabsContent value="top" className="mt-5 grid gap-5 md:grid-cols-2">
          {[...savedLibrary]
            .sort((a, b) => b.ctr - a.ctr)
            .slice(0, 2)
            .map((ad) => (
              <AdCard key={ad.id} ad={ad} saved />
            ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
