"use client";

import { cn } from "@/lib/utils/cn";

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
  variant?: "obsidian" | "charcoal";
}

export function PageShell({
  children,
  className,
  variant = "obsidian",
}: PageShellProps) {
  const bgColor =
    variant === "charcoal"
      ? "var(--color-charcoal)"
      : "var(--color-obsidian)";

  return (
    <div
      className={cn("relative min-h-screen overflow-hidden", className)}
      style={{
        background: `radial-gradient(ellipse at 50% 0%, ${bgColor} 0%, #050507 100%)`,
        backgroundColor: "var(--color-obsidian)",
      }}
    >
      {/* Rose-gold ambient glow — upper right quadrant */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "60%",
          height: "60%",
          background:
            "radial-gradient(ellipse at top right, rgba(183, 110, 121, 0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Subtle mesh gradient overlay — rose gold + gold at low opacity */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 25% 75%, rgba(197, 165, 90, 0.04) 0%, transparent 60%), " +
            "radial-gradient(ellipse at 75% 25%, rgba(183, 110, 121, 0.05) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Page content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
