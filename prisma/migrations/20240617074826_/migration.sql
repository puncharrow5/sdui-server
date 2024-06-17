/*
  Warnings:

  - You are about to drop the column `siteId` on the `admin` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_siteId_fkey`;

-- AlterTable
ALTER TABLE `admin` DROP COLUMN `siteId`;

-- CreateTable
CREATE TABLE `SiteAdmin` (
    `siteId` INTEGER NOT NULL,
    `adminId` INTEGER NOT NULL,

    PRIMARY KEY (`siteId`, `adminId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `SiteAdmin` ADD CONSTRAINT `SiteAdmin_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `SiteAdmin` ADD CONSTRAINT `SiteAdmin_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `Admin`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
