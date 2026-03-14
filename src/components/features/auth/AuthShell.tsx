"use client";

import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils/cn";

interface AuthShellProps {
  children: React.ReactNode;
  className?: string;
}

/* Sparkle dot component — small metallic stars that float */
function Sparkle({
  top,
  left,
  size,
  delay,
  color,
}: {
  top: string;
  left: string;
  size: number;
  delay: string;
  color: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: color,
        boxShadow: `0 0 ${size * 2}px ${color}`,
        animation: "sparkle-float 4s ease-in-out infinite",
        animationDelay: delay,
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}

/* Diamond sparkle shape */
function DiamondSparkle({
  top,
  left,
  size,
  delay,
}: {
  top: string;
  left: string;
  size: number;
  delay: string;
}) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        top,
        left,
        width: `${size}px`,
        height: `${size}px`,
        animation: "sparkle-drift 5s ease-in-out infinite",
        animationDelay: delay,
        pointerEvents: "none",
        zIndex: 2,
      }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size}
        height={size}
        fill="none"
        stroke="rgba(245, 232, 176, 0.7)"
        strokeWidth="1.5"
      >
        <path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-4.5L6 21l1.5-7.5L2 9h7z" />
      </svg>
    </div>
  );
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
        {/* Gold radial glow — center */}
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
              "radial-gradient(ellipse at center, rgba(197, 165, 90, 0.18) 0%, rgba(183, 110, 121, 0.06) 45%, transparent 75%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Mesh gradient overlay — gold + bronze warm tones */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 20% 80%, rgba(205, 127, 50, 0.06) 0%, transparent 55%), " +
              "radial-gradient(ellipse at 80% 20%, rgba(197, 165, 90, 0.05) 0%, transparent 55%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Floating sparkle particles */}
        {/* Gold sparkles */}
        <Sparkle top="15%" left="20%" size={4} delay="0s" color="rgba(245, 232, 176, 0.8)" />
        <Sparkle top="40%" left="85%" size={4} delay="1.5s" color="rgba(232, 212, 138, 0.7)" />
        {/* Rose-gold sparkles */}
        <Sparkle top="25%" left="75%" size={3} delay="1.2s" color="rgba(240, 200, 204, 0.7)" />
        <Sparkle top="70%" left="80%" size={3} delay="2.0s" color="rgba(212, 160, 167, 0.6)" />
        {/* Silver sparkle */}
        <Sparkle top="60%" left="15%" size={5} delay="0.6s" color="rgba(216, 217, 221, 0.5)" />
        {/* Bronze sparkles */}
        <Sparkle top="85%" left="35%" size={3} delay="0.3s" color="rgba(232, 168, 106, 0.7)" />
        <Sparkle top="50%" left="10%" size={3} delay="2.4s" color="rgba(205, 127, 50, 0.5)" />
        <DiamondSparkle top="30%" left="25%" size={16} delay="0.8s" />
        <DiamondSparkle top="65%" left="70%" size={14} delay="2.5s" />
        <DiamondSparkle top="20%" left="60%" size={12} delay="1.8s" />

        {/* Brand content */}
        <div
          style={{
            position: "relative",
            zIndex: 3,
            textAlign: "center",
            maxWidth: "380px",
          }}
        >
          {/* Logo — gold cursive */}
          <div
            style={{
              fontFamily: "var(--font-logo)",
              fontSize: "clamp(3rem, 5vw, 4.5rem)",
              fontWeight: 400,
              lineHeight: 1.05,
              background: "var(--gradient-gold)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "1rem",
              letterSpacing: "0.01em",
              filter: "drop-shadow(0 4px 8px rgba(197, 165, 90, 0.3))",
            }}
          >
            Souvenote
          </div>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              fontWeight: 400,
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
        {/* Dark glass surface panel with gold glow border */}
        <div
          style={{
            width: "100%",
            maxWidth: "420px",
            background: "var(--color-charcoal)",
            borderRadius: "20px 0 0 20px",
            padding: "2.5rem 2rem",
          }}
          className="lg:rounded-l-2xl glow-card"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
