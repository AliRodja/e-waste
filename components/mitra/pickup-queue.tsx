"use client";

import Link from "next/link";
import { Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useMitraPickups } from "@/hooks/useMitraPickups";

const kategoriLabel: Record<string, string> = {
  HP_LAPTOP: "HP / Laptop",
  BATERAI: "Baterai",
  KABEL: "Kabel",
  PERALATAN_RUMAH_TANGGA: "Peralatan Rumah Tangga",
  LAINNYA: "Lainnya",
};

export function PickupQueue() {
  const { pickups, isLoading, error } = useMitraPickups();

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <Loader2 className="size-6 animate-spin" />
      </div>
    );
  }

  if (error) {
    return <p className="text-sm text-red-500">{error}</p>;
  }

  if (pickups.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        Tidak ada pengajuan yang perlu diproses saat ini.
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {pickups.map((pickup) => (
        <Card key={pickup.id}>
          <CardContent className="flex items-start gap-4 py-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={pickup.fotoUrl}
              alt={kategoriLabel[pickup.kategori] ?? pickup.kategori}
              className="size-16 rounded object-cover"
            />
            <div className="flex flex-1 flex-col gap-1">
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {kategoriLabel[pickup.kategori] ?? pickup.kategori}
                </p>
                <Badge>{pickup.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{pickup.deskripsi}</p>
              <p className="text-xs text-muted-foreground">
                {pickup.alamat} · dari {pickup.user.name}
              </p>
            </div>
            <Button
              render={<Link href={`/mitra/${pickup.id}/verify`} />}
              nativeButton={false}
              size="sm"
            >
              Verifikasi
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
