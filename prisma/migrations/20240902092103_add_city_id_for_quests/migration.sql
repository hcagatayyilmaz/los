-- AlterTable
ALTER TABLE "HideAndSeek" ADD COLUMN     "cityId" TEXT;

-- AlterTable
ALTER TABLE "Quiz" ADD COLUMN     "cityId" TEXT;

-- AddForeignKey
ALTER TABLE "HideAndSeek" ADD CONSTRAINT "HideAndSeek_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quiz" ADD CONSTRAINT "Quiz_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
