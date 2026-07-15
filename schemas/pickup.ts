import { z } from "zod";

export const pickupCategoryEnum = z.enum([
  "HP_LAPTOP",
  "BATERAI",
  "KABEL",
  "PERALATAN_RUMAH_TANGGA",
  "LAINNYA",
]);

export const createPickupSchema = z.object({
  kategori: pickupCategoryEnum,
  deskripsi: z.string().min(10, "Deskripsi minimal 10 karakter"),
  fotoUrl: z.url("URL foto tidak valid"),
  alamat: z.string().min(10, "Alamat minimal 10 karakter"),
});

export type CreatePickupInput = z.infer<typeof createPickupSchema>;
