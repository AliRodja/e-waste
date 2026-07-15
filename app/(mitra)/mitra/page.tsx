import type { Metadata } from "next";
import { PickupQueue } from "@/components/mitra/pickup-queue";

export const metadata: Metadata = {
  title: "Dashboard Mitra — E-Waste",
  description: "Daftar pengajuan pickup yang perlu diverifikasi mitra.",
  openGraph: {
    title: "Dashboard Mitra — E-Waste",
    description: "Daftar pengajuan pickup yang perlu diverifikasi mitra.",
  },
};

export default function MitraDashboardPage() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-2xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-semibold">Dashboard Mitra</h1>
      <PickupQueue />
    </div>
  );
}
