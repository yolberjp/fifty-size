/*
  Warnings:

  - A unique constraint covering the columns `[canonical]` on the table `Colletion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canonical` to the `Colletion` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Colletion" ADD COLUMN     "canonical" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Colletion_canonical_key" ON "Colletion"("canonical");
