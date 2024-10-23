/*
  Warnings:

  - Added the required column `imageFileName` to the `MaintenanceRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MaintenanceRecord" ADD COLUMN     "imageFileName" TEXT NOT NULL;
