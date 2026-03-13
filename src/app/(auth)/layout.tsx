import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s | Souvenote",
    default: "Souvenote",
  },
  description: "Create premium greeting cards with music — a luxury gifting experience",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Auth layout does NOT include the global header —
  // auth screens are their own cinematic experience.
  // The root layout (with Header) is bypassed via the route group pattern
  // by NOT including Header here; the Header is added in the root layout
  // but auth pages have their own full-screen treatment via AuthShell.
  return <>{children}</>;
}
