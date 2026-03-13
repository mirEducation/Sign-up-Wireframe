"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

interface AuthShellProps {
  children: React.ReactNode;
  className?: string;
}

export function AuthShell({ children, className }: AuthShellProps) {
  const t = useTranslations("auth");

  return (
    <div
      className={cn("min-h-screen flex", className)}
      style={{ background: "var(--color-obsidian)" }}
    >
      {/* LEFT SIDE: Atmospheric brand visual — hidden on mobile */}
      <div
        className="hidden lg:flex"
        style={{
          flex: "0 0 50%",
          maxWidth: "50%",
          position: "relative",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          background: "var(--color-obsidian)",
          padding: "3rem",
        }}
      >
        {/* Rose-gold radial glow — center-left */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-60%, -50%)",
            width: "70%",
            height: "70%",
            background:
              "radial-gradient(ellipse at center, rgba(183, 110, 121, 0.18) 0%, rgba(197, 165, 90, 0.06) 45%, transparent 75%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Mesh gradient overlay */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(197, 165, 90, 0.06) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 80% 20%, rgba(183, 110, 121, 0.05) 0%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Brand content */}
        <div
          style={{
            position: "relative",
            zIndex: 1,
            textAlign: "center",
            maxWidth: "380px",
          }}
        >
          {/* Logo */}
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(2.5rem, 4vw, 3.5rem)",
              fontWeight: 600,
              lineHeight: 1.05,
              background: "var(--gradient-rose-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              letterSpacing: "0.02em",
            }}
          >
            Souvenote
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 300,
              color: "var(--color-text-muted)",
              lineHeight: 1.6,
              letterSpacing: "0.02em",
            }}
          >
            {t("tagline")}
          </p>
        </div>
      </div>

      {/* RIGHT SIDE: Form area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2.5rem 1.5rem",
          position: "relative",
        }}
      >
        {/* Dark glass surface panel */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "var(--color-charcoal)",
            borderRadius: "16px 0 0 16px",
            padding: "2.5rem 2rem",
          }}
          className="lg:rounded-l-2xl"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
