/*
  Warnings:

  - You are about to drop the column `heigth` on the `children` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `children` DROP COLUMN `heigth`,
    ADD COLUMN `height` VARCHAR(191) NULL;
