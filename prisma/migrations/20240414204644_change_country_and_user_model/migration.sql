/*
  Warnings:

  - You are about to drop the column `country_id` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_country_id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "country_id";