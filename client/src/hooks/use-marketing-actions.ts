// Frontend-only landing page: no API calls.
// Centralize UI actions for analytics-friendly wiring and testability.

export type MarketingAction =
  | "launch_app"
  | "open_whitepaper"
  | "open_x"
  | "open_telegram"
  | "connect_wallet"
  | "nav_scroll";

export function useMarketingActions() {
  const open = (href: string) => {
    // Placeholder navigation - do not open new windows in tests by default
    // Keep it deterministic and wired.
    if (!href || href === "#") {
      // no-op but explicit
      return;
    }
    window.open(href, "_blank", "noopener,noreferrer");
  };

  const handleAction = (action: MarketingAction, payload?: Record<string, unknown>) => {
    // Wire point for future analytics. Keep side-effect as console.debug.
    // eslint-disable-next-line no-console
    console.debug("[1PC] action:", action, payload ?? {});

    if (action === "open_x") {
      open("https://x.com/1pcchief");
    } else if (action === "open_telegram") {
      open("https://t.me/+2pV5_funiQg4ZWNh");
    }
  };

  const scrollToId = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return {
    open,
    handleAction,
    scrollToId,
  };
}
