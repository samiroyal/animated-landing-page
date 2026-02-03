import React, { useEffect, useMemo, useRef } from "react";

type ParticleFieldProps = {
  className?: string;
  density?: number; // ~ particles per 1000px width
  speed?: number; // base velocity
  tint?: "green" | "gold" | "mixed";
  interactive?: boolean;
  "data-testid"?: string;
};

type P = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  hue: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function ParticleField({
  className,
  density = 42,
  speed = 0.22,
  tint = "mixed",
  interactive = true,
  "data-testid": testId,
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef<{ x: number; y: number; active: boolean }>({
    x: 0,
    y: 0,
    active: false,
  });

  const palette = useMemo(() => {
    const green = [154, 165, 175];
    const gold = [42, 48, 55];
    const cyan = [182, 190, 200];
    if (tint === "green") return green;
    if (tint === "gold") return gold;
    return [...green, ...gold, ...cyan];
  }, [tint]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      width = Math.floor(rect.width);
      height = Math.floor(rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();

    const particleCount = clamp(Math.floor((width / 1000) * density), 26, 120);
    const particles: P[] = Array.from({ length: particleCount }).map(() => {
      const hue = palette[Math.floor(Math.random() * palette.length)];
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.9 + Math.random() * 2.0,
        vx: (Math.random() - 0.5) * speed,
        vy: (Math.random() - 0.5) * speed,
        a: 0.18 + Math.random() * 0.28,
        hue,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // soft vignette
      const vg = ctx.createRadialGradient(
        width * 0.5,
        height * 0.55,
        0,
        width * 0.5,
        height * 0.55,
        Math.max(width, height) * 0.75,
      );
      vg.addColorStop(0, "rgba(0,0,0,0)");
      vg.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vg;
      ctx.fillRect(0, 0, width, height);

      // connections + particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // motion
        p.x += p.vx;
        p.y += p.vy;

        // subtle pointer drift
        if (interactive && pointerRef.current.active) {
          const dx = pointerRef.current.x - p.x;
          const dy = pointerRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = clamp(1 - dist / 220, 0, 1);
          p.x -= (dx / (dist || 1)) * influence * 0.28;
          p.y -= (dy / (dist || 1)) * influence * 0.28;
        }

        // wrap
        if (p.x < -40) p.x = width + 40;
        if (p.x > width + 40) p.x = -40;
        if (p.y < -40) p.y = height + 40;
        if (p.y > height + 40) p.y = -40;

        // connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist2 = dx * dx + dy * dy;
          const max = 150 * 150;
          if (dist2 < max) {
            const t = 1 - dist2 / max;
            ctx.strokeStyle = `hsla(${(p.hue + q.hue) / 2} 95% 62% / ${0.06 * t})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }

        // particle glow
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 10);
        g.addColorStop(0, `hsla(${p.hue} 95% 62% / ${p.a})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 10, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `hsla(${p.hue} 95% 62% / ${p.a + 0.12})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    frameRef.current = requestAnimationFrame(draw);

    const onResize = () => resize();

    window.addEventListener("resize", onResize);

    const onMove = (e: PointerEvent) => {
      if (!interactive) return;
      const rect = canvas.getBoundingClientRect();
      pointerRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        active: true,
      };
    };
    const onLeave = () => {
      pointerRef.current.active = false;
    };

    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    return () => {
      window.removeEventListener("resize", onResize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [density, interactive, palette, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      data-testid={testId}
    />
  );
}
