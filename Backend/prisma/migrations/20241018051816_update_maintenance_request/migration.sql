/*
  Warnings:

  - Added the required column `building` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `equipment` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `floor` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imagePath` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `room` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenanceRequest" ADD COLUMN     "building" TEXT NOT NULL,
ADD COLUMN     "equipment" TEXT NOT NULL,
ADD COLUMN     "floor" INTEGER NOT NULL,
ADD COLUMN     "imagePath" TEXT NOT NULL,
ADD COLUMN     "room" TEXT NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'PENDING';
