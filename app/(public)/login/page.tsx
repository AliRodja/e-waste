import type { Metadata } from "next";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Masuk — E-Waste",
  description: "Masuk ke akun E-Waste kamu untuk mulai menyerahkan limbah elektronik.",
  openGraph: {
    title: "Masuk — E-Waste",
    description: "Masuk ke akun E-Waste kamu untuk mulai menyerahkan limbah elektronik.",
  },
};

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <LoginForm />
    </div>
  );
}
