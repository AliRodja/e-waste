import type { Metadata } from "next";
import { PickupForm } from "@/components/pickup/pickup-form";

export const metadata: Metadata = {
  title: "Ajukan Pickup — E-Waste",
  description: "Ajukan penjemputan limbah elektronik kamu.",
  openGraph: {
    title: "Ajukan Pickup — E-Waste",
    description: "Ajukan penjemputan limbah elektronik kamu.",
  },
};

export default function NewPickupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <PickupForm />
    </div>
  );
}
