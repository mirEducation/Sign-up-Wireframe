import { create } from "zustand"
import { persist } from "zustand/middleware"

interface CreditsState {
  imageCredits: number
  songCredits: number
  hasHydrated: boolean
  deductImageCredit: () => void
  deductSongCredit: () => void
  addCredits: (image: number, song: number) => void
  setHasHydrated: (value: boolean) => void
}

export const useCreditsStore = create<CreditsState>()(
  persist(
    (set) => ({
      // Realistic demo balance — signup bonus (not 0, not round)
      imageCredits: 3,
      songCredits: 1,
      hasHydrated: false,

      deductImageCredit: () => {
        set((state) => ({
          imageCredits: Math.max(0, state.imageCredits - 1),
        }))
      },

      deductSongCredit: () => {
        set((state) => ({
          songCredits: Math.max(0, state.songCredits - 1),
        }))
      },

      addCredits: (image: number, song: number) => {
        set((state) => ({
          imageCredits: state.imageCredits + image,
          songCredits: state.songCredits + song,
        }))
      },

      setHasHydrated: (value: boolean) => {
        set({ hasHydrated: value })
      },
    }),
    {
      name: "souvenote-credits",
      partialize: (state) => ({
        imageCredits: state.imageCredits,
        songCredits: state.songCredits,
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true)
        }
      },
    }
  )
)
