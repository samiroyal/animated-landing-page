import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type TokenBarProps = {
  label: string;
  percent: number;
  amount: string;
  hue?: "green" | "gold" | "cyan" | "violet";
  "data-testid"?: string;
};

const hueClass: Record<NonNullable<TokenBarProps["hue"]>, string> = {
  green: "from-primary/95 to-primary/55",
  gold: "from-secondary/95 to-secondary/55",
  cyan: "from-accent/95 to-accent/55",
  violet: "from-violet-400/90 to-fuchsia-400/60",
};

export default function TokenBar({
  label,
  percent,
  amount,
  hue = "green",
  "data-testid": testId,
}: TokenBarProps) {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setInView(true);
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const width = useMemo(() => (inView ? `${percent}%` : "0%"), [inView, percent]);

  return (
    <div
      ref={wrapRef}
      className="rounded-3xl glass p-4 md:p-5 border border-white/10"
      data-testid={testId}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm md:text-base font-semibold">{label}</div>
          <div className="mt-1 text-xs text-muted-foreground">{amount}</div>
        </div>
        <div className="text-sm md:text-base font-bold tabular-nums">
          {percent}%
        </div>
      </div>

      <div className="mt-4 h-3 rounded-full bg-white/6 border border-white/10 overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full bg-gradient-to-r transition-[width] duration-[900ms] ease-[cubic-bezier(.22,1,.36,1)]",
            hueClass[hue],
          )}
          style={{ width }}
          aria-label={`${label} progress`}
        />
      </div>

      <div className="mt-3 flex items-center justify-between text-[11px] text-muted-foreground">
        <span>Allocation</span>
        <span className="tracking-wide">Supply: 1,000,000,000 1PC</span>
      </div>
    </div>
  );
}
