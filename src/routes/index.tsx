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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AdVibe AI — Turn Ideas into High-Converting Ads in Seconds" },
      {
        name: "description",
        content:
          "AI ad copy and growth creative generator for marketing teams, media buyers and creators. Generate hooks, body copy and CTAs for TikTok, Meta, Google and Shorts.",
      },
      { property: "og:title", content: "AdVibe AI — High-Converting Ads in Seconds" },
      {
        property: "og:description",
        content:
          "Generate platform-native ad copy with viral hooks, audience targeting and A/B variant scoring.",
      },
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
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 sm:flex sm:justify-between">
        <Link to="/" className="flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-brand glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="truncate font-display text-lg font-bold">AdVibe AI</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          <a href="#features" className="transition-colors hover:text-foreground">
            Features
          </a>
          <Link to="/onboarding" className="transition-colors hover:text-foreground">
            Funnel Demo
          </Link>
          <a href="#pricing" className="transition-colors hover:text-foreground">
            Pricing
          </a>
        </nav>
        <Button asChild variant="gradient" size="sm">
          <Link to="/app/generator">Launch App</Link>
        </Button>
      </div>
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
    <div className="glass rounded-3xl p-5 glow sm:p-6">
      <div className="flex items-center justify-between gap-3 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="h-2.5 w-2.5 rounded-full bg-cyan" />
          Live generation
        </div>
        <Badge variant="outline" className="border-border text-[11px]">
          TikTok · Viral
        </Badge>
      </div>
      <div className="rounded-2xl border border-border bg-surface/60 p-4">
        <p className="text-[11px] uppercase tracking-widest text-muted-foreground">Hook</p>
        <p className="mt-1 min-h-14 font-display text-lg leading-snug">
          {typed}
          <span className="ml-0.5 inline-block h-5 w-0.5 translate-y-1 bg-violet" />
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
          <span className="rounded-full bg-gradient-brand px-3 py-1.5 text-xs font-semibold text-primary-foreground">
            {current.cta}
          </span>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="text-xs text-muted-foreground">
                Est. CTR <span className="font-semibold text-cyan">{current.ctr}%</span>
              </span>
            </TooltipTrigger>
            <TooltipContent>Predicted from 50k+ scored ad variants</TooltipContent>
          </Tooltip>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {["Hook score", "Clarity", "Scroll-stop"].map((label, idx) => (
          <div key={label} className="rounded-xl border border-border bg-card/60 p-3">
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-gradient-brand transition-all duration-700"
                style={{ width: `${68 + ((i + idx) % 3) * 10}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const creators = [
  {
    name: "Maya Ortiz",
    role: "Media buyer, 8-fig DTC",
    img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&h=160&fit=crop&crop=faces",
  },
  {
    name: "Dev Rao",
    role: "Growth lead, SaaS",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces",
  },
  {
    name: "Lina Chen",
    role: "TikTok Shop creator",
    img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&h=160&fit=crop&crop=faces",
  },
  {
    name: "Tom Fischer",
    role: "Agency founder",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces",
  },
];

function Hero() {
  return (
    <section className="aurora relative overflow-hidden px-5 pb-20 pt-16 sm:pt-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Badge variant="glow" className="mb-6">
            <Zap className="mr-1.5 h-3.5 w-3.5" /> Powered by GPT-4o &amp; Claude 3.5
          </Badge>
          <h1 className="font-display text-4xl font-extrabold leading-[1.05] sm:text-6xl">
            Turn ideas into <span className="text-gradient">high-converting ads</span> in seconds
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            AdVibe AI writes platform-native hooks, body copy and CTAs for every channel you buy
            on — then scores each variant before you spend a cent.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild variant="gradient" size="lg">
              <Link to="/onboarding">
                Build my growth blueprint <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/app/generator">Open the generator</Link>
            </Button>
          </div>
          <div className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-border pt-6">
            {[
              ["4.2x", "ROAS boost"],
              ["50k+", "ads generated"],
              ["12 min", "avg. campaign build"],
            ].map(([v, l]) => (
              <div key={l}>
                <p className="font-display text-2xl font-bold text-gradient">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-3">
            <div className="flex -space-x-3">
              {creators.map((c) => (
                <img
                  key={c.name}
                  src={c.img}
                  alt={`${c.name}, ${c.role}`}
                  loading="lazy"
                  className="h-10 w-10 rounded-full border-2 border-background object-cover"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              Trusted by media buyers &amp; creators shipping daily
            </p>
          </div>
        </div>
        <div className="animate-float">
          <LivePreview />
        </div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Wand2,
    title: "Multi-Platform Ad Gen",
    body: "One brief, native copy for TikTok, Meta, Google Search and YouTube Shorts — each with the right length, tone and format.",
  },
  {
    icon: Flame,
    title: "Viral Hook Finder",
    body: "Mines patterns from thousands of scroll-stopping openers and rewrites them around your product angle.",
  },
  {
    icon: Target,
    title: "Audience Targeting",
    body: "Describe who you sell to and get language, objections and proof points tuned to that exact segment.",
  },
  {
    icon: BarChart3,
    title: "A/B Variant Scorer",
    body: "Every variant gets an estimated CTR and clarity score, so you launch the best three instead of all twelve.",
  },
];

function Features() {
  return (
    <section id="features" className="px-5 py-20">
      <div className="mx-auto max-w-6xl">
        <h2 className="max-w-2xl font-display text-3xl font-bold sm:text-4xl">
          Everything a growth team needs, minus the blank page
        </h2>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <div
              key={f.title}
              className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:glow"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand">
                <f.icon className="h-5 w-5 text-primary-foreground" />
              </span>
              <h3 className="mt-5 font-display text-base font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
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
      name: "Free",
      price: 0,
      blurb: "For testing the waters",
      perks: ["20 credits / month", "2 platforms", "Basic hook library", "CTR estimates"],
      cta: "Start free",
      featured: false,
    },
    {
      name: "Pro",
      price: yearly ? 39 : 49,
      blurb: "For teams buying every day",
      perks: [
        "Unlimited credits",
        "All 4 platforms",
        "Viral Hook Finder + A/B scorer",
        "Saved library & analytics",
        "Brand voice memory",
      ],
      cta: "Upgrade to Pro",
      featured: true,
    },
  ];

  return (
    <section id="pricing" className="px-5 pb-24 pt-8">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="font-display text-3xl font-bold sm:text-4xl">Simple, honest pricing</h2>
        <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-border bg-card/60 px-4 py-2 text-sm">
          <span className={yearly ? "text-muted-foreground" : "font-semibold"}>Monthly</span>
          <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
          <span className={yearly ? "font-semibold" : "text-muted-foreground"}>Yearly</span>
          <Badge variant="glow" className="ml-1">
            Save 20%
          </Badge>
        </div>
        <div className="mt-10 grid gap-5 text-left sm:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`glass rounded-3xl p-7 ${t.featured ? "border-violet/40 glow" : ""}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-display text-lg font-semibold">{t.name}</h3>
                {t.featured && <Badge variant="glow">Most popular</Badge>}
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
              <p className="mt-5 font-display text-4xl font-bold">
                ${t.price}
                <span className="text-sm font-normal text-muted-foreground">
                  /mo{t.price > 0 && yearly ? ", billed yearly" : ""}
                </span>
              </p>
              <ul className="mt-6 space-y-3 text-sm">
                {t.perks.map((p) => (
                  <li key={p} className="flex items-start gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan" />
                    <span className="text-muted-foreground">{p}</span>
                  </li>
                ))}
              </ul>
              <Button
                asChild
                className="mt-7 w-full"
                variant={t.featured ? "gradient" : "outline"}
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
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <Features />
        <Pricing />
      </main>
      <footer className="border-t border-border px-5 py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>© 2026 AdVibe AI</span>
          <Link to="/onboarding" className="hover:text-foreground">
            Funnel demo
          </Link>
        </div>
      </footer>
    </div>
  );
}
