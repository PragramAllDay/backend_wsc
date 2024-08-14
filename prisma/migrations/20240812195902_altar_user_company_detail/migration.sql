-- AlterTable
ALTER TABLE "User" ADD COLUMN     "company" TEXT,
ADD COLUMN     "discount" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN     "is_vat" BOOLEAN DEFAULT true,
ADD COLUMN     "newsletter_subscription" BOOLEAN DEFAULT false,
ADD COLUMN     "regno" TEXT,
ADD COLUMN     "sales_agent_code" TEXT,
ADD COLUMN     "special_price" INTEGER DEFAULT 0,
ADD COLUMN     "vatno" TEXT,
ADD COLUMN     "website" TEXT;
