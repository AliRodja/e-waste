import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { RewardList } from "@/components/reward/reward-list";

export const metadata: Metadata = {
  title: "Tukar Poin — E-Waste",
  description: "Tukarkan poin kamu dengan reward menarik.",
  openGraph: {
    title: "Tukar Poin — E-Waste",
    description: "Tukarkan poin kamu dengan reward menarik.",
  },
};

export default async function RewardsPage() {
  const session = await auth();
  const user = session?.user
    ? await prisma.user.findUnique({
        where: { id: session.user.id },
        select: { poin: true },
      })
    : null;

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-3xl flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Tukar Poin</h1>
        <p className="text-sm text-muted-foreground">
          Poin kamu: <span className="font-semibold text-foreground">{user?.poin ?? 0}</span>
        </p>
      </div>
      <RewardList />
    </div>
  );
}
