import type { PickupCategory } from "@/app/generated/prisma/client";

export const POIN_RATE_PER_KG: Record<PickupCategory, number> = {
  HP_LAPTOP: 100,
  BATERAI: 150,
  KABEL: 50,
  PERALATAN_RUMAH_TANGGA: 30,
  LAINNYA: 20,
};

export function hitungPoin(kategori: PickupCategory, jumlahKg: number): number {
  return Math.round(POIN_RATE_PER_KG[kategori] * jumlahKg);
}
