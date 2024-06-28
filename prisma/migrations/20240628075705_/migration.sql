/*
  Warnings:

  - You are about to drop the column `paddingVeritcal` on the `mobileheader` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `mobileheader` DROP COLUMN `paddingVeritcal`,
    ADD COLUMN `paddingVertical` VARCHAR(191) NULL;
