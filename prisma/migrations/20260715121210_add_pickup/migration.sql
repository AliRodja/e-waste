-- CreateEnum
CREATE TYPE "PickupCategory" AS ENUM ('HP_LAPTOP', 'BATERAI', 'KABEL', 'PERALATAN_RUMAH_TANGGA', 'LAINNYA');

-- CreateEnum
CREATE TYPE "PickupStatus" AS ENUM ('DIAJUKAN', 'DIPROSES', 'DIJEMPUT', 'SELESAI');

-- CreateTable
CREATE TABLE "Pickup" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "kategori" "PickupCategory" NOT NULL,
    "deskripsi" TEXT NOT NULL,
    "fotoUrl" TEXT NOT NULL,
    "alamat" TEXT NOT NULL,
    "status" "PickupStatus" NOT NULL DEFAULT 'DIAJUKAN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pickup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pickup" ADD CONSTRAINT "Pickup_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
