"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import { Button } from "@/components/ui/Button";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { CreditsDisplay } from "./CreditsDisplay";
import { LanguageToggle } from "./LanguageToggle";
import { CurrencyToggle } from "./CurrencyToggle";
import { UserMenu } from "./UserMenu";
import { MobileMenu } from "./MobileMenu";

const AUTH_ROUTES = ["/sign-in", "/sign-up", "/reset-password"];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const pathname = usePathname();

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 16);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Hide header on auth screens — those have their own cinematic layout
  // (placed after all hooks to satisfy Rules of Hooks)
  if (AUTH_ROUTES.includes(pathname)) return null;

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: "64px",
        display: "flex",
        alignItems: "center",
        padding: "0 1.5rem",
        transition: "background 0.3s ease, backdrop-filter 0.3s ease, border-color 0.3s ease",
        background: scrolled
          ? "rgba(26, 26, 46, 0.85)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--color-border-metallic)"
          : "1px solid transparent",
      }}
    >
      {/* Left: Logo */}
      <div style={{ flex: "0 0 auto" }}>
        <Logo />
      </div>

      {/* Center: Nav links */}
      <div
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <NavLinks />
      </div>

      {/* Right: Controls cluster */}
      <div
        style={{
          flex: "0 0 auto",
          display: "flex",
          alignItems: "center",
          gap: "0.75rem",
        }}
      >
        {/* Always visible toggles */}
        <div className="hidden lg:flex" style={{ alignItems: "center", gap: "0.75rem" }}>
          <LanguageToggle />
          <CurrencyToggle />
        </div>

        {/* Auth-gated right cluster */}
        {!hasHydrated ? (
          // Skeleton while hydrating — prevent flash
          <div
            style={{
              width: "120px",
              height: "28px",
              borderRadius: "14px",
              background: "var(--color-charcoal)",
              animation: "pulse 1.5s ease-in-out infinite",
            }}
            className="hidden lg:block"
          />
        ) : isAuthenticated ? (
          // Authenticated: credits pill + user menu
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "0.75rem" }}>
            <CreditsDisplay />
            <UserMenu />
          </div>
        ) : (
          // Unauthenticated: Sign In + Get Started
          <div className="hidden lg:flex" style={{ alignItems: "center", gap: "0.625rem" }}>
            <Link href="/sign-in" style={{ textDecoration: "none" }}>
              <Button variant="ghost" size="sm">
                Sign In
              </Button>
            </Link>
            <Link href="/sign-up" style={{ textDecoration: "none" }}>
              <Button variant="rose-gold" size="sm">
                Get Started
              </Button>
            </Link>
          </div>
        )}

        {/* Mobile hamburger */}
        <MobileMenu />
      </div>
    </header>
  );
}
