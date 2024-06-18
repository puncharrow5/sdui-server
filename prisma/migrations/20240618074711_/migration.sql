/*
  Warnings:

  - You are about to drop the column `style` on the `header` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `header` DROP COLUMN `style`,
    ADD COLUMN `backgroundColor` VARCHAR(191) NULL,
    ADD COLUMN `textColor` VARCHAR(191) NULL;
