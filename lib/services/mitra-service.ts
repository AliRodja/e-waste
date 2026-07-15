import type { CreateVerificationInput } from "@/schemas/verification";

type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: string; details?: Record<string, string[]> };
type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface MitraPickup {
  id: string;
  kategori: string;
  deskripsi: string;
  fotoUrl: string;
  alamat: string;
  status: string;
  createdAt: string;
  user: { name: string };
}

export interface Verification {
  id: string;
  poinDihasilkan: number;
}

export async function getMitraPickups(): Promise<ApiResponse<MitraPickup[]>> {
  const res = await fetch("/api/mitra/pickups");
  return res.json();
}

export async function verifyPickup(
  pickupId: string,
  input: CreateVerificationInput
): Promise<ApiResponse<Verification>> {
  const res = await fetch(`/api/mitra/pickups/${pickupId}/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}
