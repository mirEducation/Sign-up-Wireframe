import { getRequestConfig } from "next-intl/server"

export default getRequestConfig(async () => {
  // Read locale from cookie (written by locale.store.ts setLanguage)
  // Default to "en" if no cookie is set
  let locale = "en"

  if (typeof globalThis.Request !== "undefined") {
    // Server-side: we'd read from cookies via headers in middleware
    // For now, default to "en" and let client-side Zustand store handle switching
    locale = "en"
  }

  // Validate locale to prevent path traversal
  const supportedLocales = ["en", "fr", "es"]
  if (!supportedLocales.includes(locale)) {
    locale = "en"
  }

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default,
  }
})
