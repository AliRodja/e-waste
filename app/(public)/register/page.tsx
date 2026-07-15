import type { Metadata } from "next";
import { RegisterForm } from "@/components/auth/register-form";

export const metadata: Metadata = {
  title: "Daftar Akun — E-Waste",
  description:
    "Buat akun E-Waste untuk mulai menyerahkan limbah elektronik dan mengumpulkan poin reward.",
  openGraph: {
    title: "Daftar Akun — E-Waste",
    description:
      "Buat akun E-Waste untuk mulai menyerahkan limbah elektronik dan mengumpulkan poin reward.",
  },
};

export default function RegisterPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <RegisterForm />
    </div>
  );
}
