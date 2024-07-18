/*
  Warnings:

  - You are about to drop the column `store_id` on the `StoreSocialMedia` table. All the data in the column will be lost.
  - Made the column `store_social_media_id` on table `Store` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "StoreSocialMedia" DROP CONSTRAINT "StoreSocialMedia_store_id_fkey";

-- DropIndex
DROP INDEX "StoreSocialMedia_store_id_key";

-- AlterTable
ALTER TABLE "Store" ALTER COLUMN "store_social_media_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "StoreSocialMedia" DROP COLUMN "store_id";

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_store_social_media_id_fkey" FOREIGN KEY ("store_social_media_id") REFERENCES "StoreSocialMedia"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
