/*
  Warnings:

  - You are about to drop the column `collection` on the `SizeChart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SizeChart" DROP COLUMN "collection",
ADD COLUMN     "canonicalCollection" TEXT;
