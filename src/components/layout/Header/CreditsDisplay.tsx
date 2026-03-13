"use client";

import { Coins } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useCreditsStore } from "@/stores/credits.store";

export function CreditsDisplay() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const authHydrated = useAuthStore((s) => s.hasHydrated);
  const imageCredits = useCreditsStore((s) => s.imageCredits);
  const creditsHydrated = useCreditsStore((s) => s.hasHydrated);

  const isHydrated = authHydrated && creditsHydrated;

  // Skeleton pill — same dimensions, shown until hydrated
  if (!isHydrated) {
    return (
      <div
        style={{
          width: "80px",
          height: "28px",
          borderRadius: "14px",
          background: "var(--color-charcoal)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0.375rem",
        paddingLeft: "0.625rem",
        paddingRight: "0.75rem",
        paddingTop: "0.25rem",
        paddingBottom: "0.25rem",
        borderRadius: "14px",
        background: "var(--gradient-gold)",
      }}
    >
      <Coins
        size={14}
        style={{ color: "#1A1200", flexShrink: 0 }}
        aria-hidden="true"
      />
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.75rem",
          fontWeight: 400,
          color: "#1A1200",
          letterSpacing: "0.04em",
          whiteSpace: "nowrap",
        }}
      >
        {imageCredits} credits
      </span>
    </div>
  );
}
