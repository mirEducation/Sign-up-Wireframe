/**
 * Configurable delay constants (milliseconds) for mock API calls.
 * Simulates realistic async network latency for different operation types.
 */
export const MOCK_DELAY_MS = {
  /** Near-instant response — quick lookups, simple state reads */
  instant: 300,
  /** Standard API response — auth calls, credit checks */
  fast: 800,
  /** AI image generation simulation */
  imageGenerate: 4500,
  /** AI music composition simulation */
  musicGenerate: 7000,
  /** Payment processing simulation */
  payment: 1500,
} as const

export type MockDelayKey = keyof typeof MOCK_DELAY_MS
