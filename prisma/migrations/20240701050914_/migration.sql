/*
  Warnings:

  - You are about to drop the column `textColor` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `textSize` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `textColor` on the `titlestyle` table. All the data in the column will be lost.
  - You are about to drop the column `textSize` on the `titlestyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contentstyle` DROP COLUMN `textColor`,
    DROP COLUMN `textSize`,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `mobileLineHeight` INTEGER NULL,
    ADD COLUMN `mobileSize` INTEGER NULL,
    ADD COLUMN `size` INTEGER NULL;

-- AlterTable
ALTER TABLE `titlestyle` DROP COLUMN `textColor`,
    DROP COLUMN `textSize`,
    ADD COLUMN `color` VARCHAR(191) NULL,
    ADD COLUMN `mobileLineHeight` INTEGER NULL,
    ADD COLUMN `mobileSize` INTEGER NULL,
    ADD COLUMN `size` INTEGER NULL;
