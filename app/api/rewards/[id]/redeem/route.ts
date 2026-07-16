import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  const { id } = await params;

  const reward = await prisma.reward.findUnique({ where: { id } });

  if (!reward) {
    return NextResponse.json(
      { success: false, error: "Reward tidak ditemukan" },
      { status: 404 }
    );
  }

  if (reward.stok <= 0) {
    return NextResponse.json(
      { success: false, error: "Stok reward habis" },
      { status: 409 }
    );
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });

  if (!user || user.poin < reward.poinDibutuhkan) {
    return NextResponse.json(
      { success: false, error: "Poin kamu tidak cukup" },
      { status: 400 }
    );
  }

  const redemption = await prisma.$transaction(async (tx) => {
    const created = await tx.redemption.create({
      data: {
        userId: user.id,
        rewardId: reward.id,
        poinDipakai: reward.poinDibutuhkan,
      },
      include: { reward: { select: { nama: true } } },
    });

    await tx.user.update({
      where: { id: user.id },
      data: { poin: { decrement: reward.poinDibutuhkan } },
    });

    await tx.reward.update({
      where: { id: reward.id },
      data: { stok: { decrement: 1 } },
    });

    return created;
  });

  return NextResponse.json({ success: true, data: redemption }, { status: 201 });
}
