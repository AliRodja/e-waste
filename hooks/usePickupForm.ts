"use client";

import { useState } from "react";
import { uploadPhoto, createPickup, type Pickup } from "@/lib/services/pickup-service";
import type { CreatePickupInput } from "@/schemas/pickup";

type Step = "idle" | "uploading" | "submitting";

export function usePickupForm() {
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(
    photo: File,
    rest: Omit<CreatePickupInput, "fotoUrl">
  ): Promise<Pickup | null> {
    setError(null);
    setFieldErrors({});

    setStep("uploading");
    const uploadResult = await uploadPhoto(photo);
    if (!uploadResult.success) {
      setStep("idle");
      setError(uploadResult.error);
      return null;
    }

    setStep("submitting");
    const pickupResult = await createPickup({ ...rest, fotoUrl: uploadResult.data.url });
    setStep("idle");

    if (!pickupResult.success) {
      setError(pickupResult.error);
      setFieldErrors(pickupResult.details ?? {});
      return null;
    }

    return pickupResult.data;
  }

  return {
    submit,
    isLoading: step !== "idle",
    step,
    error,
    fieldErrors,
  };
}
