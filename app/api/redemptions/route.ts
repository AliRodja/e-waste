import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  const redemptions = await prisma.redemption.findMany({
    where: { userId: session.user.id },
    include: { reward: { select: { nama: true } } },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: redemptions });
}
