-- DropForeignKey
ALTER TABLE "MaintenanceRecord" DROP CONSTRAINT "MaintenanceRecord_requestId_fkey";

-- AddForeignKey
ALTER TABLE "MaintenanceRecord" ADD CONSTRAINT "MaintenanceRecord_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "MaintenanceRequest"("id") ON DELETE CASCADE ON UPDATE CASCADE;
