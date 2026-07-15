"use client";

import { useState } from "react";
import { uploadPhoto } from "@/lib/services/pickup-service";
import { verifyPickup, type Verification } from "@/lib/services/mitra-service";
import type { CreateVerificationInput } from "@/schemas/verification";

type Step = "idle" | "uploading" | "submitting";

export function useVerifyForm(pickupId: string) {
  const [step, setStep] = useState<Step>("idle");
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  async function submit(
    photo: File,
    rest: Omit<CreateVerificationInput, "fotoBuktiUrl">
  ): Promise<Verification | null> {
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
    const result = await verifyPickup(pickupId, {
      ...rest,
      fotoBuktiUrl: uploadResult.data.url,
    });
    setStep("idle");

    if (!result.success) {
      setError(result.error);
      setFieldErrors(result.details ?? {});
      return null;
    }

    return result.data;
  }

  return {
    submit,
    isLoading: step !== "idle",
    step,
    error,
    fieldErrors,
  };
}
