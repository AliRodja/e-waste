import type { RegisterInput } from "@/schemas/auth";

type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: string; details?: Record<string, string[]> };
type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface RegisteredUser {
  id: string;
  name: string;
  email: string;
  role: "USER" | "MITRA" | "ADMIN";
  poin: number;
  createdAt: string;
}

export async function registerUser(
  input: RegisterInput
): Promise<ApiResponse<RegisteredUser>> {
  const res = await fetch("/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}
