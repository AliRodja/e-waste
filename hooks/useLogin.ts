"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function login(email: string, password: string) {
    setIsLoading(true);
    setError(null);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setIsLoading(false);

    if (!result || result.error) {
      setError("Email atau password salah");
      return false;
    }

    return true;
  }

  return { login, isLoading, error };
}
