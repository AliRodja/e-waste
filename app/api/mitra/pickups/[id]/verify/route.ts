import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { createVerificationSchema } from "@/schemas/verification";
import { hitungPoin } from "@/lib/poin";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ success: false, error: "Belum login" }, { status: 401 });
  }

  if (session.user.role !== "MITRA") {
    return NextResponse.json(
      { success: false, error: "Hanya mitra yang bisa memverifikasi" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const body = await request.json();
  const parsed = createVerificationSchema.safeParse(body);

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

  const pickup = await prisma.pickup.findUnique({ where: { id } });

  if (!pickup) {
    return NextResponse.json(
      { success: false, error: "Pengajuan tidak ditemukan" },
      { status: 404 }
    );
  }

  if (pickup.status !== "DIAJUKAN") {
    return NextResponse.json(
      { success: false, error: "Pengajuan ini sudah diproses" },
      { status: 409 }
    );
  }

  const { jumlah, kondisi, fotoBuktiUrl } = parsed.data;
  const poinDihasilkan = hitungPoin(pickup.kategori, jumlah);

  const verification = await prisma.$transaction(async (tx) => {
    const created = await tx.verification.create({
      data: {
        pickupId: pickup.id,
        mitraId: session.user.id,
        jumlah,
        kondisi,
        fotoBuktiUrl,
        poinDihasilkan,
      },
    });

    await tx.pickup.update({
      where: { id: pickup.id },
      data: { status: "SELESAI" },
    });

    await tx.user.update({
      where: { id: pickup.userId },
      data: { poin: { increment: poinDihasilkan } },
    });

    return created;
  });

  return NextResponse.json({ success: true, data: verification }, { status: 201 });
}
