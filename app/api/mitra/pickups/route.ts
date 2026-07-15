import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  if (session.user.role !== "MITRA") {
    return NextResponse.json(
      { success: false, error: "Hanya mitra yang bisa mengakses ini" },
      { status: 403 }
    );
  }

  const pickups = await prisma.pickup.findMany({
    where: { status: "DIAJUKAN" },
    include: { user: { select: { name: true } } },
    orderBy: { createdAt: "asc" },
  });

  return NextResponse.json({ success: true, data: pickups });
}
