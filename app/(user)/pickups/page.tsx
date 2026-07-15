import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PickupList } from "@/components/pickup/pickup-list";

export const metadata: Metadata = {
  title: "Riwayat Pickup — E-Waste",
  description: "Riwayat pengajuan pickup limbah elektronik kamu.",
  openGraph: {
    title: "Riwayat Pickup — E-Waste",
    description: "Riwayat pengajuan pickup limbah elektronik kamu.",
  },
};

export default function PickupsPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Riwayat Pickup</h1>
        <Button render={<Link href="/pickups/new" />} nativeButton={false}>
          Ajukan Baru
        </Button>
      </div>
      <PickupList />
    </div>
  );
}
