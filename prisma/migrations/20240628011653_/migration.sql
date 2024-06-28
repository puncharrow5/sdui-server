/*
  Warnings:

  - You are about to drop the column `lineHeight` on the `childstyle` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `childstyle` table. All the data in the column will be lost.
  - You are about to drop the column `textSize` on the `childstyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `childstyle` DROP COLUMN `lineHeight`,
    DROP COLUMN `textColor`,
    DROP COLUMN `textSize`,
    ADD COLUMN `border` VARCHAR(191) NULL,
    ADD COLUMN `borderRadius` VARCHAR(191) NULL;
