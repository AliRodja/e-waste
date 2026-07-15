"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useVerifyForm } from "@/hooks/useVerifyForm";
import type { CreateVerificationInput } from "@/schemas/verification";

const kondisiOptions: { value: CreateVerificationInput["kondisi"]; label: string }[] = [
  { value: "BAIK", label: "Baik" },
  { value: "RUSAK_RINGAN", label: "Rusak Ringan" },
  { value: "RUSAK_BERAT", label: "Rusak Berat" },
];

export function VerifyForm({ pickupId }: { pickupId: string }) {
  const router = useRouter();
  const { submit, isLoading, step, error, fieldErrors } = useVerifyForm(pickupId);

  const [jumlah, setJumlah] = useState("");
  const [kondisi, setKondisi] = useState<CreateVerificationInput["kondisi"] | "">("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [poinHasil, setPoinHasil] = useState<number | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!kondisi || !photo || !jumlah) return;

    const result = await submit(photo, { jumlah: Number(jumlah), kondisi });
    if (result) {
      setPoinHasil(result.poinDihasilkan);
      setTimeout(() => router.push("/mitra"), 1500);
    }
  }

  if (poinHasil !== null) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 className="size-10 text-green-600" />
          <p className="font-medium">Verifikasi berhasil!</p>
          <p className="text-sm text-muted-foreground">
            {poinHasil} poin ditambahkan ke akun pengguna. Mengalihkan...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Verifikasi Pengajuan</CardTitle>
        <CardDescription>Isi hasil pemeriksaan limbah elektronik.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="jumlah">Jumlah / Berat (kg)</Label>
            <Input
              id="jumlah"
              type="number"
              step="0.1"
              min="0"
              value={jumlah}
              onChange={(e) => setJumlah(e.target.value)}
              required
            />
            {fieldErrors.jumlah && (
              <p className="text-sm text-red-500">{fieldErrors.jumlah[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label>Kondisi Barang</Label>
            <Select
              value={kondisi}
              onValueChange={(v) => setKondisi(v as CreateVerificationInput["kondisi"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kondisi" />
              </SelectTrigger>
              <SelectContent>
                {kondisiOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="fotoBukti">Foto Bukti Verifikasi</Label>
            <Input
              id="fotoBukti"
              type="file"
              accept="image/*"
              onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
              required
            />
          </div>

          {error && <p className="text-sm text-red-500">{error}</p>}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                {step === "uploading" ? "Mengunggah foto..." : "Menyimpan..."}
              </>
            ) : (
              "Verifikasi & Selesaikan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
