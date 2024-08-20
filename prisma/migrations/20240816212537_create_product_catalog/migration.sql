-- CreateEnum
CREATE TYPE "PackedAs" AS ENUM ('PAIR', 'PEICES');

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "product_name" VARCHAR(500) NOT NULL,
    "permalink" VARCHAR(500) NOT NULL DEFAULT '',
    "sku" VARCHAR(255) NOT NULL,
    "product_code" TEXT NOT NULL,
    "measuring_unit" VARCHAR(255) NOT NULL DEFAULT '',
    "packed_as" "PackedAs" NOT NULL,
    "product_range" VARCHAR(255) NOT NULL DEFAULT '',
    "custom_code" TEXT NOT NULL,
    "vat" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "length" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "isle_no" TEXT NOT NULL,
    "short_description" TEXT NOT NULL,
    "full_description" TEXT NOT NULL,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "is_special" BOOLEAN NOT NULL DEFAULT false,
    "free_shipping" BOOLEAN NOT NULL DEFAULT false,
    "keywords" TEXT,
    "related_products" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "title" TEXT NOT NULL,
    "meta_description" TEXT NOT NULL,
    "view" VARCHAR(130) NOT NULL DEFAULT 'Default',
    "meta_keywords" VARCHAR(255) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT NOT NULL,
    "supplier_id" TEXT NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_varients" (
    "id" TEXT NOT NULL,
    "sku" VARCHAR(255) NOT NULL DEFAULT '',
    "barcode" VARCHAR(255) NOT NULL DEFAULT '',
    "supplier_sku" VARCHAR(255) NOT NULL DEFAULT '',
    "supplier_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "length" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "width" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "height" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "weight" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ds_normal_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ds_list_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "ds_your_price" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "quantity" BIGINT NOT NULL DEFAULT 0,
    "minimum_order" INTEGER NOT NULL DEFAULT 0,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "orderby" INTEGER NOT NULL DEFAULT 0,
    "packed_quantity" INTEGER NOT NULL DEFAULT 0,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "product_varients_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductImages" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,

    CONSTRAINT "ProductImages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ProductCategories" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProductAttributes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VarientAttributes" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_VarientAttributeValues" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE INDEX "products_id_idx" ON "products"("id");

-- CreateIndex
CREATE INDEX "products_store_id_idx" ON "products"("store_id");

-- CreateIndex
CREATE INDEX "products_sku_idx" ON "products"("sku");

-- CreateIndex
CREATE INDEX "product_varients_id_idx" ON "product_varients"("id");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductCategories_AB_unique" ON "_ProductCategories"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductCategories_B_index" ON "_ProductCategories"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProductAttributes_AB_unique" ON "_ProductAttributes"("A", "B");

-- CreateIndex
CREATE INDEX "_ProductAttributes_B_index" ON "_ProductAttributes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VarientAttributes_AB_unique" ON "_VarientAttributes"("A", "B");

-- CreateIndex
CREATE INDEX "_VarientAttributes_B_index" ON "_VarientAttributes"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_VarientAttributeValues_AB_unique" ON "_VarientAttributeValues"("A", "B");

-- CreateIndex
CREATE INDEX "_VarientAttributeValues_B_index" ON "_VarientAttributeValues"("B");

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_supplier_id_fkey" FOREIGN KEY ("supplier_id") REFERENCES "suppliers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "product_varients" ADD CONSTRAINT "product_varients_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductImages" ADD CONSTRAINT "ProductImages_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductCategories" ADD CONSTRAINT "_ProductCategories_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductAttributes" ADD CONSTRAINT "_ProductAttributes_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProductAttributes" ADD CONSTRAINT "_ProductAttributes_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VarientAttributes" ADD CONSTRAINT "_VarientAttributes_A_fkey" FOREIGN KEY ("A") REFERENCES "Attribute"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VarientAttributes" ADD CONSTRAINT "_VarientAttributes_B_fkey" FOREIGN KEY ("B") REFERENCES "product_varients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VarientAttributeValues" ADD CONSTRAINT "_VarientAttributeValues_A_fkey" FOREIGN KEY ("A") REFERENCES "attribute_values"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_VarientAttributeValues" ADD CONSTRAINT "_VarientAttributeValues_B_fkey" FOREIGN KEY ("B") REFERENCES "product_varients"("id") ON DELETE CASCADE ON UPDATE CASCADE;
