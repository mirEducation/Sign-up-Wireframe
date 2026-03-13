import type { Metadata } from "next";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { SignInForm } from "@/components/features/auth/SignInForm";

export const metadata: Metadata = {
  title: "Sign In",
};

export default function SignInPage() {
  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
