import type { Metadata } from "next";
import { VerifyForm } from "@/components/mitra/verify-form";

export const metadata: Metadata = {
  title: "Verifikasi Pengajuan — E-Waste",
  description: "Verifikasi pengajuan pickup limbah elektronik.",
  openGraph: {
    title: "Verifikasi Pengajuan — E-Waste",
    description: "Verifikasi pengajuan pickup limbah elektronik.",
  },
};

export default async function VerifyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <VerifyForm pickupId={id} />
    </div>
  );
}
