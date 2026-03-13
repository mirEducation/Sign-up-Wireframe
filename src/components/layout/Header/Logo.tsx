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
          fontFamily: "var(--font-display)",
          fontSize: "1.5rem",
          fontWeight: 600,
          lineHeight: 1,
          background: "var(--gradient-rose-gold)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          letterSpacing: "0.02em",
        }}
      >
        Souvenote
      </span>
    </Link>
  );
}
