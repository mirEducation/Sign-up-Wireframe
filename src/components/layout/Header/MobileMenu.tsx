"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useAuthStore } from "@/stores/auth.store";
import { useLocaleStore } from "@/stores/locale.store";
import { Button } from "@/components/ui/Button";

type Language = "en" | "fr" | "es";

const NAV_ITEMS = [
  { label: "Create", href: "/create" },
  { label: "Templates", href: "/templates" },
  { label: "Dashboard", href: "/dashboard" },
];

const LANG_LABELS: Record<Language, string> = { en: "EN", fr: "FR", es: "ES" };

const overlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

function StaggerItem({
  children,
  index,
  reduced,
}: {
  children: React.ReactNode;
  index: number;
  reduced: boolean;
}) {
  if (reduced) return <div>{children}</div>;
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: {
          delay: index * 0.06,
          duration: 0.3,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        },
      }}
      exit={{ opacity: 0, x: -10, transition: { duration: 0.15 } }}
    >
      {children}
    </motion.div>
  );
}

export function MobileMenu() {
  const [open, setOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion() ?? false;
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const signOut = useAuthStore((s) => s.signOut);
  const language = useLocaleStore((s) => s.language);
  const currency = useLocaleStore((s) => s.currency);
  const setLanguage = useLocaleStore((s) => s.setLanguage);
  const setCurrency = useLocaleStore((s) => s.setCurrency);
  const router = useRouter();

  function close() {
    setOpen(false);
  }

  function handleSignOut() {
    signOut();
    close();
    router.push("/");
  }

  return (
    <>
      {/* Hamburger button — visible only below lg */}
      <button
        className="flex lg:hidden"
        onClick={() => setOpen(true)}
        style={{
          background: "transparent",
          border: "none",
          cursor: "pointer",
          color: "var(--color-silver)",
          padding: "0.25rem",
        }}
        aria-label="Open menu"
      >
        <Menu size={24} />
      </button>

      {/* Full-screen overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-overlay"
            variants={overlayVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            style={{
              position: "fixed",
              inset: 0,
              background: "var(--color-obsidian)",
              zIndex: 200,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Close button */}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1.25rem 1.5rem",
              }}
            >
              <button
                onClick={close}
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-silver)",
                  padding: "0.25rem",
                }}
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

            {/* Nav content */}
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                padding: "2rem",
                gap: "0",
              }}
            >
              {/* Nav links */}
              {NAV_ITEMS.map(({ label, href }, i) => (
                <StaggerItem key={href} index={i} reduced={shouldReduceMotion}>
                  <Link
                    href={href}
                    onClick={close}
                    style={{
                      display: "block",
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(2rem, 8vw, 3rem)",
                      fontWeight: 400,
                      color: "var(--color-text-body)",
                      textDecoration: "none",
                      lineHeight: 1.3,
                      padding: "0.375rem 0",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--color-rose-gold-highlight)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--color-text-body)";
                    }}
                  >
                    {label}
                  </Link>
                </StaggerItem>
              ))}

              {/* Divider */}
              <StaggerItem index={NAV_ITEMS.length} reduced={shouldReduceMotion}>
                <div
                  style={{
                    height: "1px",
                    background: "var(--color-border-metallic)",
                    margin: "1.5rem 0",
                  }}
                />
              </StaggerItem>

              {/* Language + Currency row */}
              <StaggerItem index={NAV_ITEMS.length + 1} reduced={shouldReduceMotion}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1.5rem" }}>
                  {(["en", "fr", "es"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        fontWeight: lang === language ? 700 : 400,
                        color:
                          lang === language
                            ? "var(--color-gold)"
                            : "var(--color-silver)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {LANG_LABELS[lang]}
                    </button>
                  ))}
                  <span style={{ color: "var(--color-border-metallic)" }}>·</span>
                  <button
                    onClick={() => setCurrency(currency === "CAD" ? "USD" : "CAD")}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      fontWeight: 600,
                      color: "var(--color-silver)",
                      background: "transparent",
                      border: "1px solid var(--color-border-metallic)",
                      borderRadius: "14px",
                      padding: "0.25rem 0.625rem",
                      cursor: "pointer",
                      letterSpacing: "0.08em",
                    }}
                  >
                    {currency}
                  </button>
                </div>
              </StaggerItem>

              {/* Auth section */}
              <StaggerItem index={NAV_ITEMS.length + 2} reduced={shouldReduceMotion}>
                {isAuthenticated ? (
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "var(--color-text-muted)",
                        margin: 0,
                      }}
                    >
                      {user?.name} · {user?.email}
                    </p>
                    <button
                      onClick={handleSignOut}
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: "0.875rem",
                        color: "rgba(183, 110, 121, 0.9)",
                        background: "transparent",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        padding: 0,
                      }}
                    >
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                    <Button
                      variant="ghost"
                      size="lg"
                      onClick={() => {
                        close();
                        router.push("/sign-in");
                      }}
                      style={{ width: "100%" }}
                    >
                      Sign In
                    </Button>
                    <Button
                      variant="gold"
                      size="lg"
                      onClick={() => {
                        close();
                        router.push("/sign-up");
                      }}
                      style={{ width: "100%" }}
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </StaggerItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
