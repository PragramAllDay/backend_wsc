-- CreateTable
CREATE TABLE "Category" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "sub_title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "meta_title" TEXT,
    "meta_description" TEXT,
    "meta_keywords" TEXT[],
    "schema_markup" TEXT,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "image_primary" TEXT NOT NULL,
    "image_secondary" TEXT,
    "icon_primary" TEXT NOT NULL,
    "icon_secondary" TEXT,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "parent_id" TEXT,
    "menu_sort" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_title_key" ON "Category"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Category_sub_title_key" ON "Category"("sub_title");

-- CreateIndex
CREATE INDEX "Category_sub_title_idx" ON "Category"("sub_title");

-- CreateIndex
CREATE INDEX "Category_title_idx" ON "Category" USING HASH ("title");

-- CreateIndex
CREATE INDEX "Store_slug_vat_number_registration_number_telephone_fax_idx" ON "Store"("slug", "vat_number", "registration_number", "telephone", "fax");

-- CreateIndex
CREATE INDEX "Store_title_idx" ON "Store" USING HASH ("title");

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
