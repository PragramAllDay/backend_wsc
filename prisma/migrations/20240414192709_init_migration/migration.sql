-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPERADMIN', 'STORE_OWNER', 'STORE_MANAGER', 'CUSTOMER');

-- CreateEnum
CREATE TYPE "Title" AS ENUM ('MR', 'MS', 'MRS', 'MISS', 'MASTER', 'MADAM');

-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('MALE', 'FEMALE', 'RATHER_NOT_SAY');

-- CreateTable
CREATE TABLE "Country" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "short_code" CHAR(2) NOT NULL,
    "code" CHAR(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Country_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "State" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "country_id" TEXT NOT NULL,

    CONSTRAINT "State_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "City" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "country_id" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,

    CONSTRAINT "City_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT,
    "last_name" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "dob" TIMESTAMP(3) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "title" "Title" NOT NULL,
    "gender" "Gender" NOT NULL DEFAULT 'RATHER_NOT_SAY',
    "telephone" TEXT,
    "image_uri" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "country_id" TEXT,
    "city_id" TEXT,
    "user_access_right_id" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserAccessRight" (
    "id" TEXT NOT NULL,
    "category_module" BOOLEAN NOT NULL DEFAULT false,
    "product_module" BOOLEAN NOT NULL DEFAULT false,
    "attribute_module" BOOLEAN NOT NULL DEFAULT false,
    "cms_module" BOOLEAN NOT NULL DEFAULT false,
    "newsletter_module" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UserAccessRight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserMetaData" (
    "id" TEXT NOT NULL,
    "ip_address" TEXT,
    "client" TEXT,
    "os" TEXT,
    "last_access" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "UserMetaData_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Store" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "vat_number" TEXT NOT NULL,
    "registration_number" TEXT NOT NULL,
    "logo_primary" TEXT NOT NULL,
    "logo_secondary" TEXT,
    "icon_primary" TEXT NOT NULL,
    "icon_secondary" TEXT,
    "banner_primary" TEXT NOT NULL,
    "banner_secondary" TEXT,
    "side_banner_primary" TEXT,
    "side_banner_Secondary" TEXT,
    "telephone" TEXT NOT NULL,
    "fax" TEXT NOT NULL,
    "address_primary" TEXT NOT NULL,
    "address_secondary" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "zip" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "owner_id" TEXT NOT NULL,
    "country_id" TEXT NOT NULL,
    "state_id" TEXT NOT NULL,
    "city_id" TEXT NOT NULL,
    "store_paypal_detail_id" TEXT NOT NULL,
    "store_social_media_id" TEXT,

    CONSTRAINT "Store_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StorePaypalDetail" (
    "id" TEXT NOT NULL,
    "store_paypal_email" TEXT NOT NULL,
    "store_paypal_api_username" TEXT NOT NULL,
    "store_paypal_api_password" TEXT NOT NULL,
    "store_paypal_api_signature" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StorePaypalDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StoreSocialMedia" (
    "id" TEXT NOT NULL,
    "store_facebook" TEXT NOT NULL,
    "store_twitter" TEXT NOT NULL,
    "store_google_plus" TEXT NOT NULL,
    "store_pinterest" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "store_id" TEXT,

    CONSTRAINT "StoreSocialMedia_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Country_name_key" ON "Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Country_short_code_key" ON "Country"("short_code");

-- CreateIndex
CREATE UNIQUE INDEX "Country_code_key" ON "Country"("code");

-- CreateIndex
CREATE INDEX "Country_name_idx" ON "Country" USING HASH ("name");

-- CreateIndex
CREATE INDEX "State_name_idx" ON "State" USING HASH ("name");

-- CreateIndex
CREATE INDEX "City_name_idx" ON "City" USING HASH ("name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_telephone_key" ON "User"("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_access_right_id_key" ON "User"("user_access_right_id");

-- CreateIndex
CREATE INDEX "User_first_name_idx" ON "User"("first_name");

-- CreateIndex
CREATE INDEX "User_telephone_idx" ON "User" USING HASH ("telephone");

-- CreateIndex
CREATE UNIQUE INDEX "Store_title_key" ON "Store"("title");

-- CreateIndex
CREATE UNIQUE INDEX "Store_slug_key" ON "Store"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Store_vat_number_key" ON "Store"("vat_number");

-- CreateIndex
CREATE UNIQUE INDEX "Store_registration_number_key" ON "Store"("registration_number");

-- CreateIndex
CREATE UNIQUE INDEX "Store_owner_id_key" ON "Store"("owner_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_paypal_detail_id_key" ON "Store"("store_paypal_detail_id");

-- CreateIndex
CREATE UNIQUE INDEX "Store_store_social_media_id_key" ON "Store"("store_social_media_id");

-- CreateIndex
CREATE UNIQUE INDEX "StoreSocialMedia_store_id_key" ON "StoreSocialMedia"("store_id");

-- AddForeignKey
ALTER TABLE "State" ADD CONSTRAINT "State_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "City" ADD CONSTRAINT "City_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_access_right_id_fkey" FOREIGN KEY ("user_access_right_id") REFERENCES "UserAccessRight"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserMetaData" ADD CONSTRAINT "UserMetaData_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_country_id_fkey" FOREIGN KEY ("country_id") REFERENCES "Country"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_state_id_fkey" FOREIGN KEY ("state_id") REFERENCES "State"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_city_id_fkey" FOREIGN KEY ("city_id") REFERENCES "City"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Store" ADD CONSTRAINT "Store_store_paypal_detail_id_fkey" FOREIGN KEY ("store_paypal_detail_id") REFERENCES "StorePaypalDetail"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StoreSocialMedia" ADD CONSTRAINT "StoreSocialMedia_store_id_fkey" FOREIGN KEY ("store_id") REFERENCES "Store"("store_social_media_id") ON DELETE SET NULL ON UPDATE CASCADE;
