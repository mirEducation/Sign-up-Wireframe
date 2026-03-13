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
import { useAuthStore } from "@/stores/auth.store";
import { mockSignIn } from "@/lib/mock-api/auth";

const signInSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type SignInFormData = z.infer<typeof signInSchema>;

export function SignInForm() {
  const t = useTranslations("auth.signIn");
  const [isLoading, setIsLoading] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const signIn = useAuthStore((s) => s.signIn);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  async function onSubmit(data: SignInFormData) {
    setIsLoading(true);
    setServerError(null);

    try {
      await mockSignIn(data.email, data.password);
      signIn(data.email);
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
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.75rem, 4vw, 2.25rem)",
            fontWeight: 600,
            color: "var(--color-text-body)",
            lineHeight: 1.2,
            margin: 0,
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
          autoComplete="current-password"
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

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link
            href="/reset-password"
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = "var(--color-rose-gold)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = "var(--color-text-muted)";
            }}
          >
            {t("forgotPassword")}
          </Link>
        </div>

        <Button
          type="submit"
          variant="rose-gold"
          size="lg"
          disabled={isLoading}
          style={{ width: "100%", marginTop: "0.25rem" }}
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
        {t("noAccount")}{" "}
        <Link
          href="/sign-up"
          style={{
            color: "var(--color-rose-gold)",
            textDecoration: "none",
            fontWeight: 500,
          }}
        >
          {t("signUpLink")}
        </Link>
      </p>
    </FadeIn>
  );
}
