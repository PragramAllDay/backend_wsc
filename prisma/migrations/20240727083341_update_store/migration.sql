/*
  Warnings:

  - You are about to drop the column `side_banner_Secondary` on the `Store` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Store" DROP COLUMN "side_banner_Secondary",
ADD COLUMN     "side_banner_secondary" TEXT;
