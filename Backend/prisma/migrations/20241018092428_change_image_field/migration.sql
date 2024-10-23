/*
  Warnings:

  - You are about to drop the column `imagePath` on the `MaintenanceRequest` table. All the data in the column will be lost.
  - Added the required column `imageFileName` to the `MaintenanceRequest` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenanceRequest" DROP COLUMN "imagePath",
ADD COLUMN     "imageFileName" TEXT NOT NULL;