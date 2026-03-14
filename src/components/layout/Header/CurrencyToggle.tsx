"use client";

import { useLocaleStore } from "@/stores/locale.store";

export function CurrencyToggle() {
  const currency = useLocaleStore((s) => s.currency);
  const setCurrency = useLocaleStore((s) => s.setCurrency);
  const hasHydrated = useLocaleStore((s) => s.hasHydrated);

  if (!hasHydrated) {
    return (
      <div
        style={{
          width: "48px",
          height: "28px",
          borderRadius: "14px",
          background: "var(--color-charcoal)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    );
  }

  return (
    <button
      onClick={() => setCurrency(currency === "CAD" ? "USD" : "CAD")}
      style={{
        fontFamily: "var(--font-body)",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        color: "var(--color-silver)",
        background: "transparent",
        border: "1px solid var(--color-border-metallic)",
        borderRadius: "14px",
        padding: "0.25rem 0.625rem",
        cursor: "pointer",
        transition: "color 0.2s ease, border-color 0.2s ease",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "var(--color-bronze)";
        e.currentTarget.style.borderColor = "var(--color-bronze)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "var(--color-silver)";
        e.currentTarget.style.borderColor = "var(--color-border-metallic)";
      }}
      aria-label={`Switch to ${currency === "CAD" ? "USD" : "CAD"}`}
    >
      {currency}
    </button>
  );
}
