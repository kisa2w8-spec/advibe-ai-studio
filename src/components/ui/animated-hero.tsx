import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Sparkles, Wand2, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

function AnimatedHero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(
    () => [
      "high-converting",
      "viral TikTok",
      "scroll-stopping",
      "revenue-driven",
      "irresistible",
    ],
    []
  );

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2400);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full relative overflow-hidden pt-12 pb-16 lg:pt-20 lg:pb-24">
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center">
        <div className="h-[380px] w-[600px] rounded-full bg-volt/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          {/* Top Pill / Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="gap-2 rounded-full border-border/80 bg-card/60 px-4 py-1.5 text-xs text-foreground backdrop-blur-md transition-colors hover:border-volt/50 hover:bg-card"
            >
              <Link to="/onboarding">
                <span className="flex h-2 w-2 rounded-full bg-volt animate-pulse" />
                <span className="font-medium text-foreground">
                  ⚡ Powered by GPT-4o &amp; Claude 3.7 Sonnet
                </span>
                <MoveRight className="h-3.5 w-3.5 text-volt" />
              </Link>
            </Button>
          </motion.div>

          {/* Dynamic Headline */}
          <div className="flex flex-col gap-3 max-w-4xl">
            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-ink leading-[1.1]">
              <span>Turn raw ideas into</span>
              <span className="relative flex w-full justify-center overflow-hidden text-center min-h-[1.25em] py-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-extrabold text-volt"
                    initial={{ opacity: 0, y: 60 }}
                    transition={{ type: "spring", stiffness: 60, damping: 14 }}
                    animate={
                      titleNumber === index
                        ? {
                            y: 0,
                            opacity: 1,
                          }
                        : {
                            y: titleNumber > index ? -60 : 60,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
              <span>ads in seconds</span>
            </h1>

            <p className="mx-auto mt-2 max-w-2xl text-base sm:text-lg leading-relaxed text-muted font-normal">
              AdVibe AI engineers platform-native hooks, body copy and high-ROAS CTAs for
              TikTok, Meta, Google and YouTube Shorts — scored before you spend a single dollar.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            <Button
              asChild
              size="lg"
              className="gap-2.5 rounded-xl bg-volt text-ground font-semibold hover:bg-volt-dim px-6 transition-all duration-200 shadow-lg shadow-volt/20 hover:scale-[1.02]"
            >
              <Link to="/onboarding">
                Build growth blueprint <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="gap-2 rounded-xl border-border bg-card/80 text-ink hover:bg-secondary hover:text-foreground px-6"
            >
              <Link to="/app/generator">
                <Wand2 className="h-4 w-4 text-volt" /> Open Studio
              </Link>
            </Button>
          </div>

          {/* Metrics Social Proof */}
          <div className="mt-8 grid grid-cols-3 gap-6 sm:gap-12 border-t border-border/80 pt-6 max-w-lg">
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-volt">4.2x</p>
              <p className="text-xs text-muted">ROAS boost</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-ink">50k+</p>
              <p className="text-xs text-muted">ads generated</p>
            </div>
            <div>
              <p className="font-display text-2xl sm:text-3xl font-bold text-ink">12 min</p>
              <p className="text-xs text-muted">avg campaign build</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export { AnimatedHero };
