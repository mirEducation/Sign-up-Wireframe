import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Jost,
  JetBrains_Mono,
} from "next/font/google";
import "../styles/globals.css";
import { IntlProvider } from "@/components/providers/IntlProvider";
import { Header } from "@/components/layout/Header";

const cormorantGaramond = Cormorant_Garamond({
  variable: "--loaded-font-display",
  subsets: ["latin"],
  weight: ["300", "600"],
  display: "optional",
  preload: true,
});

const jost = Jost({
  variable: "--loaded-font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "optional",
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--loaded-font-mono",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: false,
});

export const metadata: Metadata = {
  title: "Souvenote",
  description:
    "Create premium greeting cards with music — a luxury gifting experience",
};

// Load messages server-side — default to "en" (locale switching happens
// client-side via locale.store which also writes a cookie for future server reads)
async function loadMessages(locale: string) {
  try {
    const messages = (await import(`../i18n/messages/${locale}.json`)).default;
    return messages;
  } catch {
    const messages = (await import(`../i18n/messages/en.json`)).default;
    return messages;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Default locale for SSR — client store takes over immediately after hydration
  const locale = "en";
  const messages = await loadMessages(locale);

  return (
    <html
      lang={locale}
      className={`${cormorantGaramond.variable} ${jost.variable} ${jetbrainsMono.variable}`}
    >
      <body className="antialiased">
        <IntlProvider initialLocale={locale} initialMessages={messages}>
          <Header />
          {children}
        </IntlProvider>
      </body>
    </html>
  );
}
