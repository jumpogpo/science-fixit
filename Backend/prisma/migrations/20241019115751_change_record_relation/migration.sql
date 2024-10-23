/*
  Warnings:

  - A unique constraint covering the columns `[requestId]` on the table `MaintenanceRecord` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "MaintenanceRecord_requestId_key" ON "MaintenanceRecord"("requestId");
