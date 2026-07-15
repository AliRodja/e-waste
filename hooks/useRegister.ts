"use client";

import { useState } from "react";
import { registerUser, type RegisteredUser } from "@/lib/services/auth-service";
import type { RegisterInput } from "@/schemas/auth";

export function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function register(input: RegisterInput): Promise<RegisteredUser | null> {
    setIsLoading(true);
    setError(null);
    setFieldErrors({});

    const result = await registerUser(input);
    setIsLoading(false);

    if (!result.success) {
      setError(result.error);
      setFieldErrors(result.details ?? {});
      return null;
    }

    return result.data;
  }

  return { register, isLoading, error, fieldErrors };
}
