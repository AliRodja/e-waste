"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { usePickupForm } from "@/hooks/usePickupForm";
import type { CreatePickupInput } from "@/schemas/pickup";

const kategoriOptions: { value: CreatePickupInput["kategori"]; label: string }[] = [
  { value: "HP_LAPTOP", label: "HP / Laptop" },
  { value: "BATERAI", label: "Baterai" },
  { value: "KABEL", label: "Kabel" },
  { value: "PERALATAN_RUMAH_TANGGA", label: "Peralatan Rumah Tangga" },
  { value: "LAINNYA", label: "Lainnya" },
];

export function PickupForm() {
  const router = useRouter();
  const { submit, isLoading, step, error, fieldErrors } = usePickupForm();

  const [kategori, setKategori] = useState<CreatePickupInput["kategori"] | "">("");
  const [deskripsi, setDeskripsi] = useState("");
  const [alamat, setAlamat] = useState("");
  const [photo, setPhoto] = useState<File | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!kategori || !photo) return;

    const result = await submit(photo, { kategori, deskripsi, alamat });
    if (result) {
      setSuccess(true);
      setTimeout(() => router.push("/pickups"), 1200);
    }
  }

  if (success) {
    return (
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col items-center gap-3 py-8 text-center">
          <CheckCircle2 className="size-10 text-green-600" />
          <p className="font-medium">Pengajuan berhasil dibuat!</p>
          <p className="text-sm text-muted-foreground">Mengalihkan ke riwayat...</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Ajukan Pickup</CardTitle>
        <CardDescription>
          Isi detail limbah elektronik yang ingin kamu serahkan.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label>Kategori</Label>
            <Select
              value={kategori}
              onValueChange={(v) => setKategori(v as CreatePickupInput["kategori"])}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Pilih kategori limbah" />
              </SelectTrigger>
              <SelectContent>
                {kategoriOptions.map((opt) => (
                  <SelectItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="deskripsi">Deskripsi</Label>
            <Textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
              placeholder="Contoh: 2 unit HP rusak layar pecah"
              required
            />
            {fieldErrors.deskripsi && (
              <p className="text-sm text-red-500">{fieldErrors.deskripsi[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="alamat">Alamat Penjemputan</Label>
            <Textarea
              id="alamat"
              value={alamat}
              onChange={(e) => setAlamat(e.target.value)}
              placeholder="Jl. Merdeka No. 10, Jakarta Pusat"
              required
            />
            {fieldErrors.alamat && (
              <p className="text-sm text-red-500">{fieldErrors.alamat[0]}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="photo">Foto Limbah</Label>
            <Input
              id="photo"
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
              "Ajukan"
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
