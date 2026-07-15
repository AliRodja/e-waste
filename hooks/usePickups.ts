"use client";

import { useEffect, useState } from "react";
import { getPickups, type Pickup } from "@/lib/services/pickup-service";

export function usePickups() {
  const [pickups, setPickups] = useState<Pickup[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    getPickups().then((result) => {
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
