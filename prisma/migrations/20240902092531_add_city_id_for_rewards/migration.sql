-- AlterTable
ALTER TABLE "Reward" ADD COLUMN     "cityId" TEXT;

-- AddForeignKey
ALTER TABLE "Reward" ADD CONSTRAINT "Reward_cityId_fkey" FOREIGN KEY ("cityId") REFERENCES "City"("id") ON DELETE SET NULL ON UPDATE CASCADE;
