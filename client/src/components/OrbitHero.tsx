import React, { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type OrbitHeroProps = {
  className?: string;
  "data-testid"?: string;
};

export default function OrbitHero({ className, "data-testid": testId }: OrbitHeroProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      setParallax({ x: nx, y: ny });
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", () => setParallax({ x: 0, y: 0 }));
    return () => {
      el.removeEventListener("pointermove", onMove);
    };
  }, []);

  const t1 = useMemo(
    () => `translate3d(${parallax.x * 8}px, ${parallax.y * 8}px, 0)`,
    [parallax],
  );
  const t2 = useMemo(
    () => `translate3d(${parallax.x * -12}px, ${parallax.y * -10}px, 0)`,
    [parallax],
  );
  const t3 = useMemo(
    () => `translate3d(${parallax.x * 16}px, ${parallax.y * -14}px, 0)`,
    [parallax],
  );

  return (
    <div
      ref={ref}
      className={cn("relative h-[360px] sm:h-[420px] md:h-[520px] w-full", className)}
      data-testid={testId}
    >
      {/* Rings */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          className="absolute h-[280px] w-[280px] sm:h-[340px] sm:w-[340px] md:h-[420px] md:w-[420px] rounded-full border border-white/10"
          style={{ transform: t1 }}
        />
        <div
          className="absolute h-[220px] w-[220px] sm:h-[280px] sm:w-[280px] md:h-[360px] md:w-[360px] rounded-full border border-white/10"
          style={{ transform: t2 }}
        />
        <div
          className="absolute h-[160px] w-[160px] sm:h-[220px] sm:w-[220px] md:h-[280px] md:w-[280px] rounded-full border border-white/10"
          style={{ transform: t3 }}
        />
      </div>

      {/* Orbs */}
      <div className="absolute inset-0">
        <div
          className="absolute left-[18%] top-[18%] h-16 w-16 rounded-3xl bg-gradient-to-br from-primary/35 via-white/5 to-transparent border border-white/10 blur-[0px] shadow-[0_0_0_1px_rgba(0,0,0,0.2),0_18px_60px_rgba(0,0,0,0.55)] floaty"
          style={{ transform: t1 }}
        />
        <div
          className="absolute right-[14%] top-[30%] h-12 w-12 rounded-3xl bg-gradient-to-br from-secondary/30 via-white/5 to-transparent border border-white/10 shadow-[0_18px_70px_rgba(0,0,0,0.55)] floaty-slow"
          style={{ transform: t2 }}
        />
        <div
          className="absolute left-[26%] bottom-[18%] h-10 w-10 rounded-2xl bg-gradient-to-br from-accent/30 via-white/5 to-transparent border border-white/10 shadow-[0_18px_70px_rgba(0,0,0,0.55)] floaty"
          style={{ transform: t3 }}
        />

        {/* Central "core" */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="relative h-36 w-36 sm:h-44 sm:w-44 md:h-52 md:w-52 rounded-[2.25rem] glass-strong neon-outline overflow-hidden scanlines">
            <div className="absolute inset-0 bg-[radial-gradient(120px_120px_at_30%_20%,hsl(var(--primary)/0.38),transparent_60%),radial-gradient(140px_140px_at_70%_70%,hsl(var(--secondary)/0.26),transparent_65%)]" />
            <div className="absolute inset-0 ring-1 ring-white/10" />
            <div className="relative h-full w-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs tracking-[0.34em] uppercase text-muted-foreground">
                  1PC
                </div>
                <div className="mt-1 text-2xl sm:text-3xl md:text-4xl font-bold text-shine">
                  Society
                </div>
                <div className="mt-2 text-[11px] sm:text-xs text-muted-foreground">
                  Solana • Community Powered
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* subtle glows */}
        <div className="absolute -inset-8 bg-[radial-gradient(520px_320px_at_40%_55%,hsl(var(--primary)/0.10),transparent_60%),radial-gradient(460px_320px_at_70%_35%,hsl(var(--secondary)/0.08),transparent_60%)] blur-2xl opacity-80" />
      </div>
    </div>
  );
}
