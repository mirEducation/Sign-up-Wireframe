import { create } from "zustand"
import { persist } from "zustand/middleware"

interface User {
  email: string
  name: string
  avatarUrl: string | null
}

interface AuthState {
  isAuthenticated: boolean
  user: User | null
  hasHydrated: boolean
  signIn: (email: string) => void
  signOut: () => void
  setHasHydrated: (value: boolean) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      isAuthenticated: false,
      user: null,
      hasHydrated: false,

      signIn: (email: string) => {
        // Derive a display name from the email
        const namePart = email.split("@")[0]
        const name = namePart
          .split(/[._-]/)
          .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
          .join(" ")

        set({
          isAuthenticated: true,
          user: {
            email,
            name,
            avatarUrl: null,
          },
        })
      },

      signOut: () => {
        set({ isAuthenticated: false, user: null })
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value })
      },
    }),
    {
      name: "souvenote-auth",
      partialize: (state) => ({
        isAuthenticated: state.isAuthenticated,
        user: state.user,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)
