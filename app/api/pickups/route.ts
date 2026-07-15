import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createPickupSchema } from "@/schemas/pickup";

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = createPickupSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Validasi gagal",
        details: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 }
    );
  }

  const pickup = await prisma.pickup.create({
    data: { ...parsed.data, userId: session.user.id },
  });

  return NextResponse.json({ success: true, data: pickup }, { status: 201 });
}

export async function GET() {
  const session = await auth();
  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  const pickups = await prisma.pickup.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ success: true, data: pickups });
}
