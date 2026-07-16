"use client";

import { CheckCircle2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRewards } from "@/hooks/useRewards";

export function RewardList() {
  const { rewards, isLoading, error, redeem, redeemingId, redeemError, redeemedName } =
    useRewards();

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

  return (
    <div className="flex flex-col gap-4">
      {redeemedName && (
        <div className="flex items-center gap-2 rounded-lg border border-green-600/30 bg-green-600/10 px-4 py-3 text-sm text-green-700">
          <CheckCircle2 className="size-4" />
          Berhasil menukar &quot;{redeemedName}&quot;. Cek riwayat penukaran kamu.
        </div>
      )}
      {redeemError && <p className="text-sm text-red-500">{redeemError}</p>}

      {rewards.length === 0 ? (
        <p className="text-sm text-muted-foreground">Belum ada reward tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {rewards.map((reward) => (
            <Card key={reward.id}>
              <CardHeader>
                <CardTitle className="text-base">{reward.nama}</CardTitle>
                <CardDescription>{reward.deskripsi}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <Badge variant="secondary">{reward.poinDibutuhkan} poin</Badge>
                <Button
                  size="sm"
                  disabled={redeemingId === reward.id}
                  onClick={() => redeem(reward.id)}
                >
                  {redeemingId === reward.id ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Tukar"
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
