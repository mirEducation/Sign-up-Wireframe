"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ChevronDown } from "lucide-react";
import { useAuthStore } from "@/stores/auth.store";
import { useCreditsStore } from "@/stores/credits.store";

export function UserMenu() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const addCredits = useCreditsStore((s) => s.addCredits);
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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

  if (!hasHydrated || !isAuthenticated) return null;

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "??";

  function handleSignOut() {
    signOut();
    // Reset credits to defaults on sign out
    addCredits(-999, -999); // will be clamped to 0 by store, then reset
    // Actually reset by using the store's internal defaults — sign out and reload
    setOpen(false);
    router.push("/");
  }

  return (
    <div ref={containerRef} style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.375rem",
          background: "transparent",
          border: "none",
          cursor: "pointer",
          padding: "0.25rem",
        }}
        aria-label="User menu"
        aria-expanded={open}
      >
        {/* Avatar circle */}
        <div
          style={{
            width: "32px",
            height: "32px",
            borderRadius: "50%",
            background: "var(--gradient-rose-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "#2A1A14",
              letterSpacing: "0.05em",
            }}
          >
            {initials}
          </span>
        </div>
        <ChevronDown
          size={14}
          style={{
            color: "var(--color-silver)",
            transition: "transform 0.2s ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
        />
      </button>

      {open && (
        <div
          style={{
            position: "absolute",
            top: "calc(100% + 8px)",
            right: 0,
            minWidth: "160px",
            background: "var(--color-charcoal)",
            border: "1px solid var(--color-border-metallic)",
            borderRadius: "10px",
            overflow: "hidden",
            zIndex: 100,
            boxShadow: "0 8px 24px rgba(0,0,0,0.4)",
          }}
        >
          {/* User info header */}
          <div
            style={{
              padding: "0.625rem 0.875rem",
              borderBottom: "1px solid var(--color-border-metallic)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 500,
                color: "var(--color-text-body)",
                margin: 0,
              }}
            >
              {user?.name}
            </p>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.6875rem",
                color: "var(--color-text-muted)",
                margin: 0,
                marginTop: "2px",
              }}
            >
              {user?.email}
            </p>
          </div>

          {/* Menu items */}
          {[
            { label: "Dashboard", href: "/dashboard" },
            { label: "Settings", href: "/settings" },
          ].map(({ label, href }) => (
            <button
              key={label}
              onClick={() => {
                setOpen(false);
                router.push(href);
              }}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 0.875rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "var(--color-silver)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease, color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(183, 110, 121, 0.05)";
                e.currentTarget.style.color = "var(--color-rose-gold)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = "var(--color-silver)";
              }}
            >
              {label}
            </button>
          ))}

          <div style={{ borderTop: "1px solid var(--color-border-metallic)" }}>
            <button
              onClick={handleSignOut}
              style={{
                display: "block",
                width: "100%",
                textAlign: "left",
                padding: "0.5rem 0.875rem",
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                fontWeight: 400,
                color: "rgba(183, 110, 121, 0.9)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(183, 110, 121, 0.08)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
