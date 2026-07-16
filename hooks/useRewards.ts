"use client";

import { useEffect, useState } from "react";
import { getRewards, redeemReward, type Reward } from "@/lib/services/reward-service";

export function useRewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [redeemingId, setRedeemingId] = useState<string | null>(null);
  const [redeemError, setRedeemError] = useState<string | null>(null);
  const [redeemedName, setRedeemedName] = useState<string | null>(null);

  function fetchRewards() {
    setIsLoading(true);
    getRewards().then((result) => {
      setIsLoading(false);
      if (!result.success) {
        setError(result.error);
        return;
      }
      setRewards(result.data);
    });
  }

  useEffect(() => {
    fetchRewards();
  }, []);

  async function redeem(rewardId: string) {
    setRedeemingId(rewardId);
    setRedeemError(null);
    setRedeemedName(null);

    const result = await redeemReward(rewardId);
    setRedeemingId(null);

    if (!result.success) {
      setRedeemError(result.error);
      return;
    }

    setRedeemedName(result.data.reward.nama);
    fetchRewards();
  }

  return { rewards, isLoading, error, redeem, redeemingId, redeemError, redeemedName };
}
