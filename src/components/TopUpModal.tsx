import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, Check, Sparkles, Loader2, CreditCard, ShieldCheck } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface TopUpModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function TopUpModal({ open, onOpenChange }: TopUpModalProps) {
  const { addCredits, profile } = useAuth();
  const [loading, setLoading] = useState(false);

  const handlePurchase = async () => {
    setLoading(true);
    // Simulate real payment checkout processing
    await new Promise((resolve) => setTimeout(resolve, 850));
    await addCredits(50);
    setLoading(false);
    onOpenChange(false);
    toast.success("Payment confirmed! ⚡ +50 AI Credits added to your account.");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="glass border-border sm:max-w-md p-6 bg-card text-foreground">
        <DialogHeader className="text-left">
          <div className="flex items-center gap-2">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-volt text-ground">
              <Zap className="h-4 w-4" />
            </span>
            <Badge variant="outline" className="border-border text-volt text-[11px] font-semibold">
              Instant Top-Up
            </Badge>
          </div>
          <DialogTitle className="mt-2 font-display text-xl font-bold tracking-tight text-foreground">
            Purchase AI Generation Credits
          </DialogTitle>
          <DialogDescription className="text-xs text-muted-foreground">
            Refill your studio credits for platform-native hooks, scoring, and copy generation.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-2 space-y-4">
          {/* Featured Plan Card */}
          <div className="rounded-xl border border-volt/50 bg-secondary/40 p-4 relative overflow-hidden shadow-lg shadow-volt/5">
            <div className="flex items-start justify-between">
              <div>
                <span className="rounded-md bg-volt text-ground text-[10px] font-bold px-2 py-0.5 uppercase tracking-wide">
                  Most Popular
                </span>
                <h4 className="mt-2 font-display text-base font-semibold text-foreground">
                  50 Pro AI Credits Pack
                </h4>
                <p className="text-xs text-muted-foreground mt-0.5">
                  50 generation briefs · Up to 150 ad copy variants
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted-foreground line-through">$12.00</p>
                <p className="font-display text-2xl font-bold text-volt">$4.99</p>
              </div>
            </div>

            <ul className="mt-3 space-y-2 border-t border-border/70 pt-3 text-xs text-muted-foreground">
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-volt shrink-0" />
                <span>TikTok, Meta, Google &amp; YouTube Shorts native models</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-volt shrink-0" />
                <span>AI Predicted CTR &amp; Viral Hook Angle scoring</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-volt shrink-0" />
                <span>Instant database sync to {profile ? profile.full_name : "your account"}</span>
              </li>
            </ul>
          </div>

          {/* Test Sandbox Payment Method Notice */}
          <div className="flex items-center justify-between rounded-lg border border-border bg-card/60 px-3.5 py-2.5 text-xs text-muted-foreground">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-volt" />
              <span className="text-foreground font-medium">Sandbox Test Payment</span>
            </div>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400">
              <ShieldCheck className="h-3.5 w-3.5" /> 1-Click Simulation
            </span>
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex flex-col gap-2">
            <Button
              className="w-full rounded-xl bg-volt text-ground font-semibold hover:bg-volt-dim text-xs py-5 transition-all shadow-md shadow-volt/20 cursor-pointer"
              disabled={loading}
              onClick={handlePurchase}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-ground" />
                  <span>Processing secure test payment...</span>
                </>
              ) : (
                <>
                  <Sparkles className="mr-1.5 h-4 w-4 text-ground" />
                  <span>Approve &amp; Pay $4.99 (+50 Credits)</span>
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer"
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
