import type { CreatePickupInput } from "@/schemas/pickup";

type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: string; details?: Record<string, string[]> };
type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Pickup {
  id: string;
  kategori: string;
  deskripsi: string;
  fotoUrl: string;
  alamat: string;
  status: "DIAJUKAN" | "DIPROSES" | "DIJEMPUT" | "SELESAI";
  createdAt: string;
}

export async function uploadPhoto(file: File): Promise<ApiResponse<{ url: string }>> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  return res.json();
}

export async function createPickup(
  input: CreatePickupInput
): Promise<ApiResponse<Pickup>> {
  const res = await fetch("/api/pickups", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });

  return res.json();
}

export async function getPickups(): Promise<ApiResponse<Pickup[]>> {
  const res = await fetch("/api/pickups");
  return res.json();
}
