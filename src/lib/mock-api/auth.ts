import { MOCK_DELAY_MS } from "./constants"
import users from "../mock/users.json"

interface MockUser {
  id: string
  email: string
  name: string
  avatarUrl: string
}

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Mock sign-in — resolves after MOCK_DELAY_MS.fast with user data.
 * Any non-empty email + password combination succeeds (demo mode).
 * Rejects if email or password is empty.
 */
export async function mockSignIn(email: string, password: string): Promise<MockUser> {
  await delay(MOCK_DELAY_MS.fast)

  if (!email || !email.trim()) {
    throw new Error("Email is required")
  }
  if (!password || !password.trim()) {
    throw new Error("Password is required")
  }

  // Check if email matches a demo user
  const demoUser = users.find((u) => u.email === email)

  if (demoUser) {
    return {
      id: demoUser.id,
      email: demoUser.email,
      name: demoUser.name,
      avatarUrl: demoUser.avatarUrl,
    }
  }

  // For any other valid email, return a generic authenticated user
  const namePart = email.split("@")[0]
  const name = namePart
    .split(/[._-]/)
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")

  return {
    id: `user-${Date.now()}`,
    email,
    name,
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
  }
}

/**
 * Mock sign-up — resolves after MOCK_DELAY_MS.fast with new user data
 * and signup bonus credits.
 */
export async function mockSignUp(
  email: string,
  password: string
): Promise<MockUser & { bonusImageCredits: number; bonusSongCredits: number }> {
  await delay(MOCK_DELAY_MS.fast)

  if (!email || !email.trim()) {
    throw new Error("Email is required")
  }
  if (!password || !password.trim()) {
    throw new Error("Password is required")
  }

  const namePart = email.split("@")[0]
  const name = namePart
    .split(/[._-]/)
    .map((s: string) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")

  return {
    id: `user-${Date.now()}`,
    email,
    name,
    avatarUrl: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop",
    bonusImageCredits: 1,
    bonusSongCredits: 1,
  }
}

/**
 * Mock password reset — resolves after MOCK_DELAY_MS.fast with success confirmation.
 */
export async function mockResetPassword(email: string): Promise<{ success: boolean; message: string }> {
  await delay(MOCK_DELAY_MS.fast)

  if (!email || !email.trim()) {
    throw new Error("Email is required")
  }

  return {
    success: true,
    message: "Reset link sent — check your email",
  }
}
