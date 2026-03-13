"use client";

import { useEffect, useState } from "react";
import { NextIntlClientProvider } from "next-intl";
import { useLocaleStore } from "@/stores/locale.store";

import en from "@/i18n/messages/en.json";
import fr from "@/i18n/messages/fr.json";
import es from "@/i18n/messages/es.json";

const allMessages: Record<string, typeof en> = { en, fr, es };

export function IntlProvider({
  initialLocale,
  initialMessages,
  children,
}: {
  initialLocale: string;
  initialMessages: typeof en;
  children: React.ReactNode;
}) {
  const storeLanguage = useLocaleStore((s) => s.language);
  const hasHydrated = useLocaleStore((s) => s.hasHydrated);

  // Before hydration, use server-provided values. After, follow the store.
  const locale = hasHydrated ? storeLanguage : initialLocale;
  const messages = hasHydrated ? allMessages[locale] ?? en : initialMessages;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
