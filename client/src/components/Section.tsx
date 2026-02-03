import React from "react";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const child: Variants = {
  hidden: { opacity: 0, y: 18, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Section({
  id,
  className,
  children,
  eyebrow,
  title,
  subtitle,
  "data-testid": testId,
}: {
  id: string;
  className?: string;
  children: React.ReactNode;
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  "data-testid"?: string;
}) {
  return (
    <section id={id} className={cn("section-anchor relative py-16 md:py-24", className)} data-testid={testId}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {(eyebrow || title || subtitle) && (
            <div className="max-w-3xl">
              {eyebrow && (
                <motion.p variants={child} className="text-xs tracking-[0.28em] uppercase text-primary/85">
                  {eyebrow}
                </motion.p>
              )}
              {title && (
                <motion.h2 variants={child} className="mt-3 text-3xl md:text-4xl lg:text-5xl leading-[1.05]">
                  {title}
                </motion.h2>
              )}
              {subtitle && (
                <motion.p variants={child} className="mt-4 text-base md:text-lg text-muted-foreground">
                  {subtitle}
                </motion.p>
              )}
            </div>
          )}

          <motion.div variants={child} className="mt-10">
            {children}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

export function GlassCard({
  className,
  children,
  glow = "green",
  "data-testid": testId,
}: {
  className?: string;
  children: React.ReactNode;
  glow?: "green" | "gold" | "none";
  "data-testid"?: string;
}) {
  return (
    <div
      className={cn(
        "glass-strong rounded-3xl p-6 md:p-7 transition-all duration-300",
        glow === "green" && "neon-outline",
        glow === "gold" && "neon-outline-gold",
        "hover:shadow-[0_22px_80px_rgba(0,0,0,0.55)]",
        className,
      )}
      data-testid={testId}
    >
      {children}
    </div>
  );
}
