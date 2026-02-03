import React from "react";
import { cn } from "@/lib/utils";

type NeonButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "gold" | "ghost";
  size?: "sm" | "md" | "lg";
};

export default function NeonButton({
  className,
  variant = "primary",
  size = "md",
  ...props
}: NeonButtonProps) {
  const base =
    "btn-glow focus-ring inline-flex items-center justify-center gap-2 rounded-2xl font-semibold transition-all duration-200 ease-out active:translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none";

  const sizes = {
    sm: "px-4 py-2.5 text-sm",
    md: "px-5 py-3 text-sm md:text-base",
    lg: "px-6 py-3.5 text-base md:text-lg",
  }[size];

  const variants = {
    primary:
      "text-primary-foreground bg-gradient-to-r from-primary/95 to-primary/70 shadow-[0_18px_60px_hsl(var(--primary)/0.18)] hover:shadow-[0_22px_72px_hsl(var(--primary)/0.24)] hover:-translate-y-0.5 border border-primary/20",
    gold:
      "text-secondary-foreground bg-gradient-to-r from-secondary/95 to-secondary/70 shadow-[0_18px_60px_hsl(var(--secondary)/0.14)] hover:shadow-[0_22px_72px_hsl(var(--secondary)/0.20)] hover:-translate-y-0.5 border border-secondary/20",
    ghost:
      "text-foreground/90 bg-white/5 hover:bg-white/8 border border-white/10 hover:border-white/20 shadow-[0_12px_40px_rgba(0,0,0,0.35)]",
  }[variant];

  return (
    <button
      {...props}
      className={cn(base, sizes, variants, className)}
    />
  );
}
