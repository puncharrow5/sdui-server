/*
  Warnings:

  - You are about to drop the column `headerColor` on the `site` table. All the data in the column will be lost.
  - You are about to drop the column `headerLogo` on the `site` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `site` DROP COLUMN `headerColor`,
    DROP COLUMN `headerLogo`;

-- CreateTable
CREATE TABLE `Header` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `style` VARCHAR(191) NULL,
    `logo` VARCHAR(191) NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `Header_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Header` ADD CONSTRAINT `Header_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
