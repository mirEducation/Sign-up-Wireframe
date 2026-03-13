"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

const NAV_ITEMS = [
  { key: "create" as const, href: "/create" },
  { key: "templates" as const, href: "/templates" },
  { key: "dashboard" as const, href: "/dashboard" },
];

export function NavLinks() {
  const t = useTranslations("header.nav");
  const pathname = usePathname();

  return (
    <nav
      className="hidden lg:flex"
      style={{ gap: "2rem", alignItems: "center" }}
    >
      {NAV_ITEMS.map(({ key, href }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={key}
            href={href}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.875rem",
              fontWeight: 400,
              color: isActive
                ? "var(--color-rose-gold)"
                : "var(--color-silver)",
              textDecoration: "none",
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              transition: "color 0.2s ease",
              position: "relative",
              paddingBottom: "2px",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--color-rose-gold)";
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.color = "var(--color-silver)";
              }
            }}
          >
            {t(key)}
            {isActive && (
              <span
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  background: "var(--gradient-rose-gold)",
                }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
