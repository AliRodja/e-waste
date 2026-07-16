import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  const rewards = await prisma.reward.findMany({
    where: { stok: { gt: 0 } },
    orderBy: { poinDibutuhkan: "asc" },
  });

  return NextResponse.json({ success: true, data: rewards });
}
