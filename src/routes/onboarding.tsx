import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Rocket,
  Music2,
  Briefcase,
  Instagram,
  Search,
  Youtube,
  Check,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Build your growth blueprint — AdVibe AI" },
      {
        name: "description",
        content:
          "Answer two quick questions and AdVibe AI builds a personalised ad growth blueprint for your goal and channels.",
      },
      { property: "og:title", content: "Build your growth blueprint — AdVibe AI" },
      {
        property: "og:description",
        content: "A guided funnel that tailors AdVibe AI to your goal, channels and audience.",
      },
    ],
  }),
  component: Onboarding,
});

const goals = [
  { id: "ecom", label: "Scale E-commerce", icon: ShoppingBag, hint: "DTC brands & catalogues" },
  { id: "saas", label: "Grow SaaS", icon: Rocket, hint: "Trials, demos, activation" },
  { id: "tiktok", label: "TikTok Shop", icon: Music2, hint: "Creator-led commerce" },
  { id: "agency", label: "Agency Client Work", icon: Briefcase, hint: "Multi-brand workflows" },
];

const channels = [
  { id: "tiktok", label: "TikTok", icon: Music2 },
  { id: "meta", label: "Meta / Instagram", icon: Instagram },
  { id: "google", label: "Google Search", icon: Search },
  { id: "shorts", label: "YouTube Shorts", icon: Youtube },
];

const checks = [
  "Analysing your growth goal",
  "Matching winning hook patterns",
  "Scoring channel-native formats",
  "Assembling your creative blueprint",
];

function Onboarding() {
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState<string | null>(null);
  const [picked, setPicked] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (step !== 3) return;
    setProgress(0);
    const t = setInterval(() => setProgress((p) => (p >= 100 ? 100 : p + 2)), 60);
    return () => clearInterval(t);
  }, [step]);

  const done = progress >= 100;
  const goalLabel = goals.find((g) => g.id === goal)?.label ?? "Growth";

  return (
    <div className="aurora min-h-screen px-5 py-10">
      <div className="mx-auto max-w-3xl">
        <Link to="/" className="mb-10 flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-brand glow">
            <Sparkles className="h-5 w-5 text-primary-foreground" />
          </span>
          <span className="font-display text-lg font-bold">AdVibe AI</span>
        </Link>

        <div className="mb-8 flex items-center gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${
                s <= step ? "bg-gradient-brand" : "bg-secondary"
              }`}
            />
          ))}
        </div>

        {step === 1 && (
          <div className="animate-fade-in">
            <Badge variant="glow">Step 1 of 3</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              What is your primary goal?
            </h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`glass rounded-2xl p-6 text-left transition-all duration-200 hover:-translate-y-0.5 ${
                    goal === g.id ? "border-violet/60 glow" : ""
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-brand">
                    <g.icon className="h-5 w-5 text-primary-foreground" />
                  </span>
                  <p className="mt-4 font-display font-semibold">{g.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{g.hint}</p>
                </button>
              ))}
            </div>
            <Button
              variant="gradient"
              size="lg"
              className="mt-8"
              disabled={!goal}
              onClick={() => setStep(2)}
            >
              Continue <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        )}

        {step === 2 && (
          <div className="animate-fade-in">
            <Badge variant="glow">Step 2 of 3</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              Select target advertising channels
            </h1>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {channels.map((c) => {
                const on = picked.includes(c.id);
                return (
                  <button
                    key={c.id}
                    onClick={() =>
                      setPicked((p) => (on ? p.filter((x) => x !== c.id) : [...p, c.id]))
                    }
                    className={`glass flex items-center gap-4 rounded-2xl p-5 text-left transition-all duration-200 ${
                      on ? "border-violet/60 glow" : ""
                    }`}
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-surface">
                      <c.icon className="h-5 w-5 text-cyan" />
                    </span>
                    <span className="min-w-0 flex-1 truncate font-medium">{c.label}</span>
                    {on && <Check className="h-5 w-5 shrink-0 text-cyan" />}
                  </button>
                );
              })}
            </div>
            <div className="mt-8 flex gap-3">
              <Button variant="outline" size="lg" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="gradient"
                size="lg"
                disabled={picked.length === 0}
                onClick={() => setStep(3)}
              >
                Generate blueprint <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-fade-in">
            <Badge variant="glow">Step 3 of 3</Badge>
            <h1 className="mt-4 font-display text-3xl font-bold sm:text-4xl">
              {done ? "Your growth blueprint is ready" : "Generating your custom growth blueprint…"}
            </h1>
            <div className="glass mt-8 rounded-3xl p-6 sm:p-8">
              <Progress value={progress} className="h-2" />
              <ul className="mt-6 space-y-3">
                {checks.map((c, i) => {
                  const reached = progress > (i + 1) * 24;
                  return (
                    <li key={c} className="flex items-center gap-3 text-sm">
                      <span
                        className={`grid h-6 w-6 shrink-0 place-items-center rounded-full transition-colors ${
                          reached ? "bg-gradient-brand" : "bg-secondary"
                        }`}
                      >
                        {reached ? (
                          <Check className="h-3.5 w-3.5 text-primary-foreground" />
                        ) : (
                          <span className="h-1.5 w-1.5 rounded-full bg-muted-foreground" />
                        )}
                      </span>
                      <span className={reached ? "text-foreground" : "text-muted-foreground"}>
                        {c}
                      </span>
                    </li>
                  );
                })}
              </ul>

              {done && (
                <div className="mt-8 animate-fade-in rounded-2xl border border-border bg-surface/50 p-6">
                  <p className="text-xs uppercase tracking-widest text-muted-foreground">
                    Personalised dashboard preview
                  </p>
                  <p className="mt-2 font-display text-xl font-semibold">
                    {goalLabel} blueprint · {picked.length} channel
                    {picked.length === 1 ? "" : "s"}
                  </p>
                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    {[
                      ["24", "starter ad variants"],
                      ["6", "hook angles matched"],
                      ["4.6x", "projected ROAS"],
                    ].map(([v, l]) => (
                      <div key={l} className="rounded-xl border border-border bg-card/60 p-4">
                        <p className="font-display text-2xl font-bold text-gradient">{v}</p>
                        <p className="text-xs text-muted-foreground">{l}</p>
                      </div>
                    ))}
                  </div>
                  <Button asChild variant="gradient" size="lg" className="mt-6 w-full sm:w-auto">
                    <Link to="/app/generator">
                      Enter dashboard <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
