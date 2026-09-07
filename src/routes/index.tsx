import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Sparkles,
  Wand2,
  Flame,
  Target,
  BarChart3,
  ArrowRight,
  Check,
  Zap,
  LogIn,
  LogOut,
  UserCheck,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { AnimatedHero } from "@/components/ui/animated-hero";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AdVibe AI — AI-Powered Growth & Ad Creative Platform" },
      {
        name: "description",
        content:
          "Generate high-converting ad copy, viral hooks and CTAs for TikTok, Meta, Google and Shorts.",
      },
      { property: "og:title", content: "AdVibe AI — High-Converting Ads in Seconds" },
    ],
  }),
  component: Landing,
});

const rotating = [
  {
    hook: "POV: your skincare routine takes 40 seconds now",
    cta: "Shop the ritual →",
    ctr: 6.4,
  },
  { hook: "We cancelled 3 tools after switching to this", cta: "Start free trial", ctr: 5.1 },
  { hook: "Last 48 hours at launch pricing", cta: "Claim your spot →", ctr: 4.8 },
];

function Nav() {
  const { user, profile, signOut } = useAuth();
  const [authOpen, setAuthOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-ground/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
        <Link to="/" className="flex items-center gap-2.5">
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-volt text-ground font-bold">
            <Sparkles className="h-4 w-4" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight text-ink">AdVibe AI</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-ink">
            Features
          </a>
          <Link to="/onboarding" className="transition-colors hover:text-ink">
            Growth Funnel
          </Link>
          <a href="#pricing" className="transition-colors hover:text-ink">
            Pricing
          </a>
        </nav>

        <div className="flex items-center gap-3">
          {profile ? (
            <div className="flex items-center gap-2">
              <Button asChild variant="outline" size="sm" className="gap-2 border-border bg-card/60">
                <Link to="/app/settings">
                  <UserCheck className="h-3.5 w-3.5 text-volt" />
                  <span className="max-w-28 truncate text-xs font-medium text-ink">{profile.full_name}</span>
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive"
                onClick={() => signOut()}
                title="Sign Out"
              >
                <LogOut className="h-3.5 w-3.5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="gap-1.5 border-border bg-card/60 text-xs font-medium text-ink hover:border-volt/40"
              onClick={() => setAuthOpen(true)}
            >
              <LogIn className="h-3.5 w-3.5" />
              <span>Sign In</span>
            </Button>
          )}

          <Button asChild size="sm" className="bg-volt text-ground hover:bg-volt-dim font-semibold text-xs rounded-lg px-4">
            <Link to="/app/generator">Launch Studio</Link>
          </Button>
        </div>
      </div>

      <AuthModal open={authOpen} onOpenChange={setAuthOpen} />
    </header>
  );
}

function LivePreview() {
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState("");
  const current = rotating[i]!;

  useEffect(() => {
    setTyped("");
    let n = 0;
    const t = setInterval(() => {
      n += 1;
      setTyped(current.hook.slice(0, n));
      if (n >= current.hook.length) {
        clearInterval(t);
        setTimeout(() => setI((v) => (v + 1) % rotating.length), 2200);
      }
    }, 28);
    return () => clearInterval(t);
  }, [i, current.hook]);

  return (
    <div className="glass max-w-2xl mx-auto rounded-2xl p-5 border border-border sm:p-6">
      <div className="flex items-center justify-between gap-3 pb-3 border-b border-border/80">
        <div className="flex items-center gap-2 text-xs text-muted">
          <span className="h-2 w-2 rounded-full bg-volt animate-ping" />
          <span className="text-ink font-medium">Real-time Ad Generation Engine</span>
        </div>
        <Badge variant="outline" className="border-border text-[11px] text-muted">
          TikTok · Viral Angle
        </Badge>
      </div>
      <div className="mt-4 rounded-xl border border-border bg-surface p-4">
        <p className="text-[10px] uppercase tracking-widest text-muted">Generated Hook</p>
        <p className="mt-1 min-h-12 font-display text-base sm:text-lg leading-snug text-ink">
          {typed}
          <span className="ml-0.5 inline-block h-4 w-0.5 translate-y-0.5 bg-volt" />
        </p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <span className="rounded-lg bg-volt px-3 py-1 text-xs font-semibold text-ground">
            {current.cta}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-muted">
                Est. CTR <span className="font-bold text-volt">{current.ctr}%</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>Predicted from 50k+ scored ad variants</TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    icon: Wand2,
    title: "Multi-Platform Ad Gen",
    body: "One brief, native copy for TikTok, Meta, Google Search and YouTube Shorts — tuned to each algorithm's conversion triggers.",
  },
  {
    icon: Flame,
    title: "Viral Hook Finder",
    body: "Mines patterns from thousands of top-performing ads and automatically rewrites them around your product angle.",
  },
  {
    icon: Target,
    title: "Audience Objection Tuning",
    body: "Specify who you sell to and get angles tailored to counter objections and drive immediate purchase intent.",
  },
  {
    icon: BarChart3,
    title: "A/B Variant Scorer",
    body: "Every variant gets an estimated CTR and clarity score, so you launch only the top 3 instead of burning ad budget.",
  },
];

function Features() {
  return (
    <section id="features" className="px-5 py-20 border-t border-border/60">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-2xl mx-auto">
          <Badge variant="outline" className="mb-3 border-border text-volt text-xs">
            ⚡ Engineered for Media Buyers
          </Badge>
          <h2 className="font-display text-3xl font-bold sm:text-4xl text-ink">
            Everything your growth team needs, without the blank page
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:border-volt/40"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-card border border-border text-volt">
                <f.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-4 font-display text-base font-semibold text-ink">{f.title}</h3>
              <p className="mt-2 text-xs leading-relaxed text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  const [yearly, setYearly] = useState(true);
  const tiers = [
    {
      name: "Free Trial",
      price: 0,
      blurb: "Ideal for testing the workflow",
      perks: ["50 free AI credits", "All 4 ad platforms", "Viral Hook Finder", "Saved library & Supabase DB"],
      cta: "Start Free",
      featured: false,
    },
    {
      name: "Growth Pro",
      price: yearly ? 39 : 49,
      blurb: "For teams and media buyers shipping daily",
      perks: [
        "Unlimited generation credits",
        "Multi-account team workspaces",
        "A/B Variant Scorer & Analytics",
        "Direct export & webhooks",
        "Priority Claude 3.7 Sonnet pipeline",
      ],
      cta: "Upgrade to Pro",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="px-5 pb-24 pt-12 border-t border-border/60">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl text-ink">Simple, transparent pricing</h2>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card px-4 py-1.5 text-xs text-ink">
          <span className={yearly ? "text-muted" : "font-semibold"}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
          <span className={yearly ? "font-semibold text-volt" : "text-muted"}>Yearly</span>
          <span className="rounded-full bg-volt/20 text-volt px-2 py-0.5 text-[10px] font-bold">
            Save 20%
          </span>
        </div>
        <div className="mt-10 grid gap-6 text-left sm:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`glass rounded-2xl p-7 border ${t.featured ? "border-volt/50 shadow-lg shadow-volt/10" : "border-border"}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold text-ink">{t.name}</h3>
                {t.featured && (
                  <span className="rounded-full bg-volt text-ground text-[10px] font-bold px-2.5 py-0.5">
                    Most Popular
                  </span>
                )}
              </div>
              <p className="mt-1 text-xs text-muted">{t.blurb}</p>
              <p className="mt-5 font-display text-4xl font-bold text-ink">
                ${t.price}
                <span className="text-xs font-normal text-muted">
                  /mo{t.price > 0 && yearly ? ", billed yearly" : ""}
                </span>
              </p>
              <ul className="mt-6 space-y-3 text-xs">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-volt" />
                    <span className="text-ink">{p}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className={`mt-7 w-full rounded-xl font-semibold text-xs ${t.featured ? "bg-volt text-ground hover:bg-volt-dim" : "border-border bg-card text-ink hover:bg-secondary"}`}
                variant={t.featured ? "default" : "outline"}
                size="lg"
              >
                <Link to="/app/generator">{t.cta}</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Landing() {
  return (
    <div className="min-h-screen bg-ground text-ink">
      <Nav />
      <main>
        <AnimatedHero />
        <div className="px-4 pb-16">
          <LivePreview />
        </div>
        <Features />
        <Pricing />
      </main>
      <footer className="border-t border-border px-5 py-8 text-xs text-muted">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3">
          <span>© 2026 AdVibe AI · AI-First Growth Engine</span>
          <Link to="/onboarding" className="hover:text-ink">
            Interactive Funnel Demo →
          </Link>
        </div>
      </footer>
    </div>
  );
}
