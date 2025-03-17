/*
  Warnings:

  - A unique constraint covering the columns `[canonical]` on the table `Category` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[canonical]` on the table `SubCategory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canonical` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `canonical` to the `SubCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "canonical" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "SubCategory" ADD COLUMN     "canonical" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Category_canonical_key" ON "Category"("canonical");

-- CreateIndex
CREATE UNIQUE INDEX "SubCategory_canonical_key" ON "SubCategory"("canonical");
