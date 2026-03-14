"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useTranslations } from "next-intl";
import { FadeIn } from "@/components/motion/FadeIn";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Badge } from "@/components/ui/Badge";
import { useAuthStore } from "@/stores/auth.store";
import { useCreditsStore } from "@/stores/credits.store";
import { mockSignUp } from "@/lib/mock-api/auth";

const signUpSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const t = useTranslations("auth.signUp");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const signIn = useAuthStore((s) => s.signIn);
  const addCredits = useCreditsStore((s) => s.addCredits);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
  });

  async function onSubmit(data: SignUpFormData) {
    setIsLoading(true);
    setServerError(null);

    try {
      await mockSignUp(data.email, data.password);
      signIn(data.email);
      // Signup bonus: 1 free card + 1 free song credit
      addCredits(1, 1);
      router.push("/");
    } catch (err) {
      setServerError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <FadeIn>
      <div style={{ marginBottom: "1.75rem", textAlign: "center" }}>
        <Badge
          variant="bronze"
          style={{
            fontSize: "0.8125rem",
            padding: "0.4rem 0.875rem",
            marginBottom: "1.25rem",
            display: "inline-block",
          }}
        >
          {t("bonus")}
        </Badge>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 500,
            color: "var(--color-text-body)",
            lineHeight: 1.2,
            marginTop: "0.75rem",
            marginBottom: 0,
          }}
        >
          {t("title")}
        </h1>
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

        <Input
          {...register("password")}
          type="password"
          label={t("password")}
          placeholder="••••••••"
          error={errors.password?.message}
          autoComplete="new-password"
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
        {t("alreadyHaveAccount")}{" "}
        <Link
          href="/sign-in"
          style={{
            color: "var(--color-rose-gold)",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          {t("signInLink")}
        </Link>
      </p>
    </FadeIn>
  );
}
