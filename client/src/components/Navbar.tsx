import React, { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import NeonButton from "@/components/NeonButton";
import { useMarketingActions } from "@/hooks/use-marketing-actions";
import { Menu, X } from "lucide-react";

const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "tokenomics", label: "Tokenomics" },
  { id: "rewards", label: "Rewards" },
  { id: "managers", label: "Managers" },
  { id: "join", label: "Join" },
];

export default function Navbar() {
  const [location] = useLocation();
  const { scrollToId, handleAction } = useMarketingActions();
  const [active, setActive] = useState<string>("hero");
  const [open, setOpen] = useState(false);

  const isHome = useMemo(() => location === "/" || location === "", [location]);

  useEffect(() => {
    if (!isHome) return;

    const observers: IntersectionObserver[] = [];
    const ids = sections.map((s) => s.id);

    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        (entries) => {
          for (const e of entries) {
            if (e.isIntersecting) {
              setActive(id);
            }
          }
        },
        { root: null, threshold: 0.35 },
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [isHome]);

  const go = (id: string) => {
    handleAction("nav_scroll", { id });
    setOpen(false);
    scrollToId(id);
  };

  return (
    <div className="fixed top-3 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass rounded-3xl px-4 sm:px-5 py-3 flex items-center justify-between gap-3 border border-white/10">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              onClick={(e) => {
                if (isHome) {
                  e.preventDefault();
                  go("hero");
                }
              }}
              className="group inline-flex items-center gap-3"
              data-testid="nav-logo"
            >
              <span className="relative h-9 w-9 rounded-2xl bg-gradient-to-br from-primary/25 via-white/5 to-secondary/15 border border-white/10 shadow-[0_12px_50px_rgba(0,0,0,0.5)]">
                <span className="absolute inset-0 rounded-2xl ring-1 ring-primary/20" />
                <span className="absolute inset-0 rounded-2xl blur-xl bg-primary/15 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </span>
              <div className="leading-tight">
                <div className="text-sm sm:text-base font-bold tracking-tight">
                  1PC Society
                </div>
                <div className="text-[11px] text-muted-foreground -mt-0.5 hidden sm:block">
                  Solana memecoin community
                </div>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center gap-2">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => go(s.id)}
                className={cn(
                  "px-3 py-2 rounded-2xl text-sm font-semibold transition-all duration-200 focus-ring",
                  "hover:bg-white/7",
                  active === s.id
                    ? "bg-white/8 border border-white/12 text-foreground"
                    : "text-muted-foreground border border-transparent",
                )}
                data-testid={`nav-link-${s.id}`}
              >
                {s.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => handleAction("open_x")}
              data-testid="nav-x"
              aria-label="X"
            >
              X
            </NeonButton>
            <NeonButton
              variant="ghost"
              size="sm"
              onClick={() => handleAction("open_telegram")}
              data-testid="nav-telegram"
              aria-label="Telegram"
            >
              TG
            </NeonButton>

            <button
              className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 hover:bg-white/8 transition-colors focus-ring"
              onClick={() => setOpen((v) => !v)}
              data-testid="nav-mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden mt-3 glass rounded-3xl p-3 border border-white/10">
            <div className="grid grid-cols-2 gap-2">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => go(s.id)}
                  className={cn(
                    "px-3 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 focus-ring",
                    "hover:bg-white/7 text-left",
                    active === s.id
                      ? "bg-white/8 border border-white/12"
                      : "bg-white/4 border border-white/10 text-muted-foreground",
                  )}
                  data-testid={`nav-mobile-link-${s.id}`}
                >
                  {s.label}
                </button>
              ))}
              <NeonButton
                variant="ghost"
                size="md"
                onClick={() => handleAction("open_x")}
                data-testid="nav-mobile-x"
              >
                X
              </NeonButton>
              <NeonButton
                variant="ghost"
                size="md"
                onClick={() => handleAction("open_telegram")}
                data-testid="nav-mobile-telegram"
              >
                Telegram
              </NeonButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
