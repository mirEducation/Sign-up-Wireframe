"use client";

import { useState, useRef, useEffect } from "react";
import { useLocaleStore } from "@/stores/locale.store";

type Language = "en" | "fr" | "es";

const LANG_LABELS: Record<Language, string> = {
  en: "EN",
  fr: "FR",
  es: "ES",
};

export function LanguageToggle() {
  const language = useLocaleStore((s) => s.language);
  const setLanguage = useLocaleStore((s) => s.setLanguage);
  const hasHydrated = useLocaleStore((s) => s.hasHydrated);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  if (!hasHydrated) {
    return (
      <div
        style={{
          width: "40px",
          height: "28px",
          borderRadius: "6px",
          background: "var(--color-charcoal)",
          animation: "pulse 1.5s ease-in-out infinite",
        }}
      />
    );
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          fontWeight: 500,
          letterSpacing: "0.08em",
          color: "var(--color-silver)",
          background: "transparent",
          border: "1px solid var(--color-border-metallic)",
          borderRadius: "6px",
          padding: "0.25rem 0.5rem",
          cursor: "pointer",
          transition: "color 0.2s ease, border-color 0.2s ease",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--color-rose-gold)";
          e.currentTarget.style.borderColor = "var(--color-rose-gold)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--color-silver)";
          e.currentTarget.style.borderColor = "var(--color-border-metallic)";
        }}
        aria-label="Language selector"
        aria-expanded={open}
      >
        {LANG_LABELS[language]}
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            right: 0,
            minWidth: "80px",
            background: "var(--color-charcoal)",
            border: "1px solid var(--color-border-metallic)",
            borderRadius: "8px",
            overflow: "hidden",
            zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {(["en", "fr", "es"] as Language[]).map((lang) => (
            <button
              key={lang}
              onClick={() => {
                setLanguage(lang);
                setOpen(false);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 0.75rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: lang === language ? 500 : 400,
                letterSpacing: "0.06em",
                color:
                  lang === language
                    ? "var(--color-rose-gold)"
                    : "var(--color-silver)",
                background:
                  lang === language
                    ? "rgba(183, 110, 121, 0.08)"
                    : "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (lang !== language) {
                  e.currentTarget.style.background = "rgba(183, 110, 121, 0.05)";
                  e.currentTarget.style.color = "var(--color-rose-gold)";
                }
              }}
              onMouseLeave={(e) => {
                if (lang !== language) {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.color = "var(--color-silver)";
                }
              }}
            >
              {LANG_LABELS[lang]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
