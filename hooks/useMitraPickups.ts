"use client";

import { useEffect, useState } from "react";
import { getMitraPickups, type MitraPickup } from "@/lib/services/mitra-service";

export function useMitraPickups() {
  const [pickups, setPickups] = useState<MitraPickup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getMitraPickups().then((result) => {
      if (cancelled) return;
      setIsLoading(false);

      if (!result.success) {
        setError(result.error);
        return;
      }

      setPickups(result.data);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  return { pickups, isLoading, error };
}
