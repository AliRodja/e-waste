import { z } from "zod";

export const itemConditionEnum = z.enum(["BAIK", "RUSAK_RINGAN", "RUSAK_BERAT"]);

export const createVerificationSchema = z.object({
  jumlah: z.coerce.number().positive("Jumlah/berat harus lebih dari 0"),
  kondisi: itemConditionEnum,
  fotoBuktiUrl: z.url("URL foto bukti tidak valid"),
});

export type CreateVerificationInput = z.infer<typeof createVerificationSchema>;
