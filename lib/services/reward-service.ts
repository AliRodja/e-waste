type ApiSuccess<T> = { success: true; data: T };
type ApiError = { success: false; error: string };
type ApiResponse<T> = ApiSuccess<T> | ApiError;

export interface Reward {
  id: string;
  nama: string;
  deskripsi: string;
  poinDibutuhkan: number;
  stok: number;
}

export interface Redemption {
  id: string;
  status: string;
  poinDipakai: number;
  reward: { nama: string };
}

export async function getRewards(): Promise<ApiResponse<Reward[]>> {
  const res = await fetch("/api/rewards");
  return res.json();
}

export async function redeemReward(rewardId: string): Promise<ApiResponse<Redemption>> {
  const res = await fetch(`/api/rewards/${rewardId}/redeem`, { method: "POST" });
  return res.json();
}
