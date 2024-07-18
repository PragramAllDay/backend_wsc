/*
  Warnings:

  - You are about to drop the column `country_id` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `state_id` on the `Store` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_country_id_fkey";

-- DropForeignKey
ALTER TABLE "Store" DROP CONSTRAINT "Store_state_id_fkey";

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "country_id",
DROP COLUMN "state_id";
