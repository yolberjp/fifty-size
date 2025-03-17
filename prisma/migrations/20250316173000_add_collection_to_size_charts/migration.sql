/*
  Warnings:

  - The primary key for the `SizeChartCategory` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `collectionId` to the `SizeChartCategory` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "SizeChart" ADD COLUMN     "collection" TEXT;

-- AlterTable
ALTER TABLE "SizeChartCategory" DROP CONSTRAINT "SizeChartCategory_pkey",
ADD COLUMN     "collectionId" INTEGER NOT NULL,
ADD CONSTRAINT "SizeChartCategory_pkey" PRIMARY KEY ("sizeChartId", "categoryId", "subCategoryId", "collectionId");

-- CreateTable
CREATE TABLE "Colletion" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Colletion_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SizeChartCategory" ADD CONSTRAINT "SizeChartCategory_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Colletion"("id") ON DELETE CASCADE ON UPDATE CASCADE;
