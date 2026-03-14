"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { mockResetPassword } from "@/lib/mock-api/auth";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetFormData = z.infer<typeof resetSchema>;

export function ResetPasswordForm() {
  const t = useTranslations("auth.reset");
  const tAuth = useTranslations("auth");
  const [step, setStep] = useState<"form" | "confirmation">("form");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotion();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  async function onSubmit(data: ResetFormData) {
    setIsLoading(true);
    setServerError(null);

    try {
      await mockResetPassword(data.email);
      setStep("confirmation");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  const transitionProps = shouldReduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 10 },
        animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
        exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
      };

  return (
    <FadeIn>
      <AnimatePresence mode="wait">
        {step === "form" ? (
          <motion.div key="form" {...transitionProps}>
            <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  fontWeight: 500,
                  color: "var(--color-text-body)",
                  lineHeight: 1.2,
                  margin: 0,
                }}
              >
                {t("title")}
              </h1>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-muted)",
                  marginTop: "0.625rem",
                  marginBottom: 0,
                  lineHeight: 1.6,
                }}
              >
                {t("subtitle")}
              </p>
            </div>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
              noValidate
            >
              <Input
                {...register("email")}
                type="email"
                label={t("email")}
                placeholder="hello@souvenote.com"
                error={errors.email?.message}
                autoComplete="email"
              />

              {serverError && (
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "0.8125rem",
                    color: "rgba(183, 110, 121, 0.9)",
                    margin: 0,
                  }}
                >
                  {serverError}
                </p>
              )}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                disabled={isLoading}
                style={{ width: "100%", marginTop: "0.5rem" }}
              >
                {isLoading ? t("submitting") : t("submit")}
              </Button>
            </form>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.8125rem",
                color: "var(--color-text-muted)",
                textAlign: "center",
                marginTop: "1.5rem",
                marginBottom: 0,
              }}
            >
              <Link
                href="/sign-in"
                style={{
                  color: "var(--color-rose-gold)",
                  textDecoration: "none",
                  fontWeight: 600,
                }}
              >
                {tAuth("backToSignIn")}
              </Link>
            </p>
          </motion.div>
        ) : (
          <motion.div key="confirmation" {...transitionProps}>
            <div style={{ textAlign: "center" }}>
              {/* Check icon — gold themed */}
              <div
                style={{
                  width: "56px",
                  height: "56px",
                  borderRadius: "50%",
                  background: "rgba(205, 127, 50, 0.12)",
                  border: "1px solid rgba(205, 127, 50, 0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin: "0 auto 1.5rem",
                }}
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="var(--color-bronze)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
                  fontWeight: 500,
                  color: "var(--color-text-body)",
                  lineHeight: 1.2,
                  marginBottom: "0.75rem",
                }}
              >
                {t("confirmation")}
              </h1>

              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.65,
                  marginBottom: "2rem",
                }}
              >
                {t("confirmationDetail")}
              </p>

              <Link
                href="/sign-in"
                style={{
                  display: "inline-block",
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-rose-gold)",
                  textDecoration: "none",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                {tAuth("backToSignIn")}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </FadeIn>
  );
}
