"use client";

import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      style={{
        textDecoration: "none",
        display: "inline-block",
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-logo)",
          fontSize: "2rem",
          fontWeight: 400,
          lineHeight: 1,
          background: "var(--gradient-gold)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.01em",
          filter: "drop-shadow(0 2px 4px rgba(197, 165, 90, 0.3))",
        }}
      >
        Souvenote
      </span>
    </Link>
  );
}
