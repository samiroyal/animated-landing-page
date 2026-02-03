import React, { useEffect } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ParticleField from "@/components/ParticleField";
import NeonButton from "@/components/NeonButton";
import OrbitHero from "@/components/OrbitHero";
import { GlassCard, Section } from "@/components/Section";
import TokenBar from "@/components/TokenBar";
import { useMarketingActions } from "@/hooks/use-marketing-actions";
import {
  ArrowRight,
  BadgeCheck,
  CandlestickChart,
  Coins,
  Crown,
  Globe,
  Handshake,
  Link2,
  Rocket,
  Shield,
  Sparkles,
  Star,
  Swords,
  Trophy,
  Users,
  Wallet,
} from "lucide-react";

function Pill({
  icon,
  text,
  "data-testid": testId,
}: {
  icon: React.ReactNode;
  text: string;
  "data-testid"?: string;
}) {
  return (
    <div
      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs sm:text-sm text-muted-foreground"
      data-testid={testId}
    >
      <span className="text-primary/85">{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function Landing() {
  const { handleAction, scrollToId, open } = useMarketingActions();

  useEffect(() => {
    // Ensure dark class for this aesthetic
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-mesh grain">
      <Navbar />

      {/* Background layers */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <ParticleField
          className="absolute inset-0 opacity-[0.9]"
          tint="mixed"
          density={46}
          speed={0.22}
          data-testid="particles"
        />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(800px_500px_at_80%_25%,hsl(var(--primary)/0.10),transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(760px_520px_at_15%_35%,hsl(var(--secondary)/0.10),transparent_65%)]" />
      </div>

      {/* HERO */}
      <section id="hero" className="section-anchor relative pt-28 sm:pt-32 md:pt-36 pb-16 md:pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="flex flex-wrap gap-2" data-testid="hero-pills">
                <Pill icon={<Sparkles className="h-4 w-4" />} text="Dark-futuristic Solana energy" data-testid="pill-1" />
                <Pill icon={<Shield className="h-4 w-4" />} text="Community-first, trust-forward" data-testid="pill-2" />
                <Pill icon={<Coins className="h-4 w-4" />} text="Memecoin with real incentives" data-testid="pill-3" />
              </div>

              <motion.h1
                initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.98]"
                data-testid="hero-title"
              >
                <span className="text-shine">1PC Society</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="mt-4 text-lg md:text-xl text-foreground/90"
                data-testid="hero-tagline"
              >
                <span className="font-semibold">United.</span>{" "}
                <span className="font-semibold">Active.</span>{" "}
                <span className="font-semibold">Invested.</span>
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="mt-4 text-base md:text-lg text-muted-foreground max-w-xl"
                data-testid="hero-subtitle"
              >
                The community-powered memecoin on Solana — designed to reward contribution,
                amplify momentum, and build long-term conviction together.
              </motion.p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3 sm:items-center" data-testid="hero-ctas">
                <NeonButton
                  variant="primary"
                  size="lg"
                  onClick={() => handleAction("open_whitepaper")}
                  data-testid="btn-whitepaper"
                >
                  Whitepaper <Link2 className="h-5 w-5" />
                </NeonButton>

                <div className="flex items-center gap-2">
                  <NeonButton
                    variant="ghost"
                    size="md"
                    onClick={() => handleAction("open_x")}
                    data-testid="btn-x"
                    aria-label="Open X"
                  >
                    X
                  </NeonButton>
                  <NeonButton
                    variant="ghost"
                    size="md"
                    onClick={() => handleAction("open_telegram")}
                    data-testid="btn-telegram"
                    aria-label="Open Telegram"
                  >
                    Telegram
                  </NeonButton>
                </div>
              </div>

              <div className="mt-10">
                <div className="hairline" />
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3" data-testid="hero-stats">
                  {[
                    { k: "1B", v: "Total Supply" },
                    { k: "65%", v: "Liquidity Focus" },
                    { k: "Weekly", v: "Manager Payouts" },
                    { k: "10→1000", v: "Points → Tokens" },
                  ].map((s) => (
                    <div
                      key={s.v}
                      className="glass rounded-3xl p-4 border border-white/10 hover:shadow-[0_20px_70px_rgba(0,0,0,0.55)] transition-shadow"
                      data-testid={`stat-${s.v.replace(/\s+/g, "-").toLowerCase()}`}
                    >
                      <div className="text-xl md:text-2xl font-bold">{s.k}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{s.v}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <OrbitHero data-testid="hero-orbit" />
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    handleAction("nav_scroll", { id: "about" });
                    scrollToId("about");
                  }}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-2xl px-4 py-2"
                  data-testid="hero-scroll-next"
                >
                  Explore the Society ↓
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <Section
        id="about"
        eyebrow="About"
        title="What is 1PC Society?"
        subtitle="A memecoin is only as strong as the people behind it. 1PC Society is built for coordinated action, mutual trust, and momentum you can feel."
        data-testid="section-about"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
          <div className="lg:col-span-7">
            <GlassCard glow="none" className="h-full" data-testid="about-copy">
              <div className="prose prose-invert max-w-none prose-p:text-muted-foreground prose-strong:text-foreground">
                <p>
                  <strong>1PC Society (1PC)</strong> is a community-powered memecoin on Solana built around one core idea:
                  reward the behaviors that create lasting strength — showing up, helping others, and pushing the mission forward.
                </p>
                <p>
                  We’re not here for spectators. We’re building a culture of contribution — where energy becomes points, points become
                  tokens, and tokens become shared conviction.
                </p>
                <p>
                  If you’ve been looking for a project that actually <strong>moves together</strong>, welcome.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2" data-testid="about-badges">
                <Pill icon={<BadgeCheck className="h-4 w-4" />} text="Earn by contributing" />
                <Pill icon={<Globe className="h-4 w-4" />} text="Built on Solana" />
                <Pill icon={<Handshake className="h-4 w-4" />} text="For the People" />
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {[
              {
                title: "Community",
                desc: "A coordinated crew that moves as one.",
                icon: <Users className="h-5 w-5" />,
                glow: "green" as const,
              },
              {
                title: "Trust",
                desc: "Built on transparency + mutual respect.",
                icon: <Shield className="h-5 w-5" />,
                glow: "gold" as const,
              },
              {
                title: "Growth",
                desc: "Momentum through consistent action.",
                icon: <Rocket className="h-5 w-5" />,
                glow: "green" as const,
              },
              {
                title: "Decentralization",
                desc: "Community-led direction and rewards.",
                icon: <CandlestickChart className="h-5 w-5" />,
                glow: "gold" as const,
              },
            ].map((c) => (
              <GlassCard
                key={c.title}
                glow={c.glow}
                className="group"
                data-testid={`about-card-${c.title.toLowerCase()}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center shadow-[0_18px_70px_rgba(0,0,0,0.45)]">
                    <div className="text-primary">{c.icon}</div>
                  </div>
                  <div className="min-w-0">
                    <div className="text-lg font-bold">{c.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
                  </div>
                </div>
                <div className="mt-4 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                <div className="mt-4 text-xs text-muted-foreground">
                  Micro-interactions built in — hover for glow, no layout shift.
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* TOKENOMICS */}
      <Section
        id="tokenomics"
        eyebrow="Tokenomics"
        title="Supply & Allocation"
        subtitle="Total supply is fixed at 1,000,000,000 1PC — with allocations designed for liquidity strength and long-term rewards."
        data-testid="section-tokenomics"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-5">
            <GlassCard glow="green" data-testid="tokenomics-summary">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs tracking-[0.28em] uppercase text-muted-foreground">
                    Total Supply
                  </div>
                  <div className="mt-2 text-3xl md:text-4xl font-bold text-shine">
                    1,000,000,000 <span className="text-foreground">1PC</span>
                  </div>
                  <p className="mt-3 text-sm md:text-base text-muted-foreground">
                    Designed for deep liquidity and community incentives. Allocation bars animate as you scroll into view.
                  </p>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                  <Coins className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3" data-testid="tokenomics-mini-cards">
                {[
                  { label: "Network", value: "Solana" },
                  { label: "Ticker", value: "1PC" },
                  { label: "Focus", value: "Community" },
                  { label: "Ethos", value: "Earned Rewards" },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="rounded-2xl border border-white/10 bg-white/4 p-3"
                    data-testid={`tokenomics-mini-${i.label.toLowerCase()}`}
                  >
                    <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                      {i.label}
                    </div>
                    <div className="mt-1 font-semibold">{i.value}</div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 gap-4">
            <TokenBar
              label="Liquidity Pool"
              percent={65}
              amount="650,000,000 1PC"
              hue="green"
              data-testid="tokenbar-liquidity"
            />
            <TokenBar
              label="Rewards / Team"
              percent={17}
              amount="170,000,000 1PC"
              hue="gold"
              data-testid="tokenbar-rewards-team"
            />
            <TokenBar
              label="Presale"
              percent={7}
              amount="70,000,000 1PC"
              hue="cyan"
              data-testid="tokenbar-presale"
            />
            <TokenBar
              label="Reserve / DAO"
              percent={6}
              amount="60,000,000 1PC"
              hue="violet"
              data-testid="tokenbar-reserve-dao"
            />
          </div>
        </div>
      </Section>

      {/* REWARDS SYSTEM */}
      <Section
        id="rewards"
        eyebrow="Rewards"
        title="Community Rewards System"
        subtitle="Contribution is measurable. Activity becomes points — and points become tokens."
        data-testid="section-rewards"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          <div className="lg:col-span-4">
            <GlassCard glow="gold" data-testid="rewards-highlight">
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                  <Trophy className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <div className="text-xs tracking-[0.28em] uppercase text-muted-foreground">
                    Highlight
                  </div>
                  <div className="mt-2 text-xl md:text-2xl font-bold leading-tight">
                    For every <span className="text-shine">10 points</span> earned →
                    <span className="text-shine"> 1000 1PC</span> tokens at launch
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Built to reward real effort — recruiting, contests, social engagement, and more.
                  </p>
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/4 p-4">
                <div className="text-sm font-semibold">How it feels</div>
                <p className="mt-2 text-sm text-muted-foreground">
                  High-signal contribution loops. Clear incentives. A community that stays active.
                </p>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4" data-testid="rewards-cards">
              {[
                {
                  title: "Recruiting",
                  desc: "Bring aligned members into the Society.",
                  icon: <Users className="h-5 w-5" />,
                  glow: "green" as const,
                },
                {
                  title: "Contests",
                  desc: "Participate and win community challenges.",
                  icon: <Swords className="h-5 w-5" />,
                  glow: "gold" as const,
                },
                {
                  title: "Social Engagement",
                  desc: "Amplify the signal across platforms.",
                  icon: <Star className="h-5 w-5" />,
                  glow: "green" as const,
                },
                {
                  title: "Community Contribution",
                  desc: "Help, guide, build resources, support others.",
                  icon: <Handshake className="h-5 w-5" />,
                  glow: "gold" as const,
                },
                {
                  title: "Above & Beyond Commitment",
                  desc: "The extra mile gets noticed and rewarded.",
                  icon: <Sparkles className="h-5 w-5" />,
                  glow: "green" as const,
                },
              ].map((c) => (
                <GlassCard
                  key={c.title}
                  glow={c.glow}
                  className="group"
                  data-testid={`rewards-card-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                      <div className="text-primary">{c.icon}</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold">{c.title}</div>
                      <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
                    </div>
                  </div>
                  <div className="mt-5 h-[1px] bg-gradient-to-r from-transparent via-white/12 to-transparent" />
                  <div className="mt-4 text-xs text-muted-foreground">
                    Trackable. Rewarded. Community-aligned.
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* MANAGER INCENTIVES */}
      <Section
        id="managers"
        eyebrow="Incentives"
        title="Manager Incentives"
        subtitle="Leadership is rewarded — with weekly payouts and immediate boosts for stepping up."
        data-testid="section-managers"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-5">
            <GlassCard glow="green" data-testid="manager-copy">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs tracking-[0.28em] uppercase text-muted-foreground">
                    For Managers
                  </div>
                  <div className="mt-2 text-2xl md:text-3xl font-bold leading-tight">
                    Each member who becomes a manager receives:
                  </div>
                </div>
                <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                  <Crown className="h-6 w-6 text-primary" />
                </div>
              </div>

              <div className="mt-6 space-y-3" data-testid="manager-bullets">
                {[
                  { icon: <Coins className="h-4 w-4" />, label: "$10 SOL" },
                  { icon: <Sparkles className="h-4 w-4" />, label: "50 points" },
                  { icon: <Trophy className="h-4 w-4" />, label: "Weekly payouts on Fridays" },
                ].map((i) => (
                  <div
                    key={i.label}
                    className="rounded-2xl border border-white/10 bg-white/4 px-4 py-3 flex items-center gap-3"
                    data-testid={`manager-item-${i.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <span className="text-secondary">{i.icon}</span>
                    <span className="font-semibold">{i.label}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 text-sm text-muted-foreground">
                Managers keep the flywheel spinning — coordination, culture, and consistent energy.
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4" data-testid="manager-cards">
            {[
              {
                title: "Instant Boost",
                desc: "Start with SOL + points — leadership starts rewarded.",
                icon: <Rocket className="h-5 w-5" />,
                glow: "gold" as const,
              },
              {
                title: "Weekly Rhythm",
                desc: "Fridays are payout day — consistency matters.",
                icon: <CandlestickChart className="h-5 w-5" />,
                glow: "green" as const,
              },
              {
                title: "Clear Impact",
                desc: "Managers build systems, people, and momentum.",
                icon: <Globe className="h-5 w-5" />,
                glow: "gold" as const,
              },
              {
                title: "Culture Engine",
                desc: "Hold the line on values: United. Active. Invested.",
                icon: <Shield className="h-5 w-5" />,
                glow: "green" as const,
              },
            ].map((c) => (
              <GlassCard
                key={c.title}
                glow={c.glow}
                className="h-full"
                data-testid={`manager-card-${c.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="flex items-start gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                    <div className="text-primary">{c.icon}</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold">{c.title}</div>
                    <div className="mt-1 text-sm text-muted-foreground">{c.desc}</div>
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* JOIN CTA */}
      <Section
        id="join"
        eyebrow="Community"
        title="Join the Society"
        subtitle="Choose contribution over noise. Join the core crew and help build the next Solana wave."
        data-testid="section-join"
      >
        <div className="relative overflow-hidden rounded-[2rem] glass-strong border border-white/10 p-6 md:p-10 neon-outline-gold">
          <div className="absolute inset-0 bg-[radial-gradient(900px_450px_at_20%_30%,hsl(var(--primary)/0.16),transparent_60%),radial-gradient(820px_480px_at_80%_60%,hsl(var(--secondary)/0.14),transparent_60%)]" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-7" data-testid="join-copy">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-[0.22em] uppercase text-muted-foreground">
                <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_28px_hsl(var(--primary)/0.55)]" />
                Society Access
              </div>
              <h3 className="mt-5 text-2xl sm:text-3xl md:text-4xl leading-[1.05]" data-testid="join-title">
                For the People, By the People.
              </h3>
              <p className="mt-4 text-base md:text-lg text-muted-foreground max-w-2xl" data-testid="join-subtitle">
                Join Telegram to get plugged in, follow on X for updates, and connect your wallet when the app is ready
                (UI only for now).
              </p>

              <div className="mt-7 flex flex-col sm:flex-row gap-3" data-testid="join-buttons">
                <NeonButton
                  variant="primary"
                  size="lg"
                  onClick={() => {
                    handleAction("open_telegram");
                    open("#");
                  }}
                  data-testid="btn-join-telegram"
                >
                  Join Telegram <Users className="h-5 w-5" />
                </NeonButton>
                <NeonButton
                  variant="ghost"
                  size="lg"
                  onClick={() => {
                    handleAction("open_x");
                    open("#");
                  }}
                  data-testid="btn-follow-x"
                >
                  Follow on X <Star className="h-5 w-5" />
                </NeonButton>
                <NeonButton
                  variant="gold"
                  size="lg"
                  onClick={() => handleAction("connect_wallet")}
                  data-testid="btn-connect-wallet"
                >
                  Connect Wallet <Wallet className="h-5 w-5" />
                </NeonButton>
              </div>
            </div>

            <div className="lg:col-span-5" data-testid="join-panel">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
                {[
                  {
                    title: "Live Culture",
                    desc: "Active members, daily momentum.",
                    icon: <Sparkles className="h-5 w-5" />,
                  },
                  {
                    title: "Reward Loops",
                    desc: "Points → tokens. Clear incentives.",
                    icon: <Trophy className="h-5 w-5" />,
                  },
                  {
                    title: "Solana-native",
                    desc: "Fast, low-cost, high-energy.",
                    icon: <Coins className="h-5 w-5" />,
                  },
                  {
                    title: "Built Together",
                    desc: "Community voice matters.",
                    icon: <Handshake className="h-5 w-5" />,
                  },
                ].map((i) => (
                  <div
                    key={i.title}
                    className="rounded-3xl border border-white/10 bg-white/4 p-4 hover:bg-white/6 transition-colors"
                    data-testid={`join-feature-${i.title.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-2xl bg-white/6 border border-white/10 flex items-center justify-center">
                        <div className="text-primary">{i.icon}</div>
                      </div>
                      <div>
                        <div className="font-bold">{i.title}</div>
                        <div className="mt-1 text-sm text-muted-foreground">{i.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="relative z-10 py-12 md:py-16" data-testid="footer">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass rounded-3xl border border-white/10 p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div>
                <div className="text-lg md:text-xl font-bold text-shine" data-testid="footer-slogan">
                  For the People, By the People
                </div>
                <div className="mt-2 text-sm text-muted-foreground" data-testid="footer-meta">
                  © 1PC Society • Solana Network • All Rights Reserved
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2" data-testid="footer-links">
                <NeonButton
                  variant="ghost"
                  size="md"
                  onClick={() => handleAction("open_whitepaper")}
                  data-testid="footer-whitepaper"
                >
                  Whitepaper
                </NeonButton>
                <NeonButton
                  variant="ghost"
                  size="md"
                  onClick={() => handleAction("open_x")}
                  data-testid="footer-x"
                >
                  X
                </NeonButton>
                <NeonButton
                  variant="ghost"
                  size="md"
                  onClick={() => handleAction("open_telegram")}
                  data-testid="footer-telegram"
                >
                  Telegram
                </NeonButton>
              </div>
            </div>

            <div className="mt-7 hairline" />
            <div className="mt-6 text-xs text-muted-foreground" data-testid="footer-disclaimer">
              This site is a marketing landing page UI. Links are placeholders. No wallet functionality is executed.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
