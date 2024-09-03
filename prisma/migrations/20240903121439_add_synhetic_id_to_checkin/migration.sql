-- AlterTable
ALTER TABLE "CheckIn" ADD COLUMN     "syntheticPlaceId" TEXT,
ALTER COLUMN "isSynthetic" DROP NOT NULL;
