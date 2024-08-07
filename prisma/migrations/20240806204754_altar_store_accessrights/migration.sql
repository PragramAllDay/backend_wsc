/*
  Warnings:

  - You are about to drop the column `menu_sort` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `logo_primary` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `logo_secondary` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `side_banner_Secondary` on the `Store` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Store` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[store_name]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[meta_title]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[store_card_payment_id]` on the table `Store` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permalink` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoice_serial_number` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `logo` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_description` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meta_title` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `schema_markup` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `spermalink` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_card_payment_id` to the `Store` table without a default value. This is not possible if the table is not empty.
  - Added the required column `store_name` to the `Store` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Store_title_idx";

-- DropIndex
DROP INDEX "Store_title_key";

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "menu_sort",
ADD COLUMN     "permalink" TEXT NOT NULL,
ADD COLUMN     "sort_order" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Store" DROP COLUMN "logo_primary",
DROP COLUMN "logo_secondary",
DROP COLUMN "side_banner_Secondary",
DROP COLUMN "title",
ADD COLUMN     "commission_percentage" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "country_id" TEXT NOT NULL,
ADD COLUMN     "dropship" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "invoice_serial_number" TEXT NOT NULL,
ADD COLUMN     "logo" TEXT NOT NULL,
ADD COLUMN     "meta_description" TEXT NOT NULL,
ADD COLUMN     "meta_title" TEXT NOT NULL,
ADD COLUMN     "minimum_order" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
ADD COLUMN     "rent_per_month" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
ADD COLUMN     "schema_markup" TEXT NOT NULL,
ADD COLUMN     "side_banner_secondary" TEXT,
ADD COLUMN     "sort" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "spermalink" VARCHAR(300) NOT NULL,
ADD COLUMN     "state_id" TEXT NOT NULL,
ADD COLUMN     "store_card_payment_id" TEXT NOT NULL,
ADD COLUMN     "store_name" VARCHAR(250) NOT NULL;

-- AlterTable
ALTER TABLE "UserAccessRight" ADD COLUMN     "cash_register_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cc_receipt_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cc_sale_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cc_sale_report_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "cheque_to_supplier_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "credit_note_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dropship_back_order_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "dropship_order_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expenditure_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "expenditure_payment_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "make_receipt_cc_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "make_receipt_web_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "purchase_order_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "sale_agent_report_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "stock_log_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_analytics_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_credit_note_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_debit_note_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_invoice_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_ledger_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_orders_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "supplier_payment_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "web_receipt_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "web_sale_report_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wholesale_back_order_module" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "wholesale_order_module" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "StoreCardPaymentDetail" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "detail" JSONB NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StoreCardPaymentDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_name_key" ON "Store"("store_name");

-- CreateIndex
CREATE UNIQUE INDEX "Store_meta_title_key" ON "Store"("meta_title");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_card_payment_id_key" ON "Store"("store_card_payment_id");

-- CreateIndex
CREATE INDEX "Store_meta_title_idx" ON "Store" USING HASH ("meta_title");

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_store_card_payment_id_fkey" FOREIGN KEY ("store_card_payment_id") REFERENCES "StoreCardPaymentDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
