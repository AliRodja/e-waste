-- CreateEnum
CREATE TYPE "ItemCondition" AS ENUM ('BAIK', 'RUSAK_RINGAN', 'RUSAK_BERAT');

-- CreateTable
CREATE TABLE "Verification" (
    "id" TEXT NOT NULL,
    "pickupId" TEXT NOT NULL,
    "mitraId" TEXT NOT NULL,
    "jumlah" DOUBLE PRECISION NOT NULL,
    "kondisi" "ItemCondition" NOT NULL,
    "fotoBuktiUrl" TEXT NOT NULL,
    "poinDihasilkan" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Verification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Verification_pickupId_key" ON "Verification"("pickupId");

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_pickupId_fkey" FOREIGN KEY ("pickupId") REFERENCES "Pickup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Verification" ADD CONSTRAINT "Verification_mitraId_fkey" FOREIGN KEY ("mitraId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
