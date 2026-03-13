import { create } from "zustand"
import { persist } from "zustand/middleware"

type Language = "en" | "fr" | "es"
type Currency = "CAD" | "USD"

interface LocaleState {
  language: Language
  currency: Currency
  hasHydrated: boolean
  setLanguage: (language: Language) => void
  setCurrency: (currency: Currency) => void
  setHasHydrated: (value: boolean) => void
}

export const useLocaleStore = create<LocaleState>()(
  persist(
    (set) => ({
      language: "en",
      currency: "CAD",
      hasHydrated: false,

      setLanguage: (language: Language) => {
        // Write cookie for next-intl server-side reading
        if (typeof document !== "undefined") {
          document.cookie = `locale=${language};path=/;max-age=31536000`
        }
        set({ language })
      },

      setCurrency: (currency: Currency) => {
        set({ currency })
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value })
      },
    }),
    {
      name: "souvenote-locale",
      partialize: (state) => ({
        language: state.language,
        currency: state.currency,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)
