import type { Metadata } from "next";
import { AuthShell } from "@/components/features/auth/AuthShell";
import { SignUpForm } from "@/components/features/auth/SignUpForm";

export const metadata: Metadata = {
  title: "Create Account",
};

export default function SignUpPage() {
  return (
    <AuthShell>
      <SignUpForm />
    </AuthShell>
  );
}
