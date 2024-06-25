/*
  Warnings:

  - You are about to drop the column `phoneNumber` on the `footer` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `footer` DROP COLUMN `phoneNumber`,
    ADD COLUMN `helpCenter` VARCHAR(191) NULL;
