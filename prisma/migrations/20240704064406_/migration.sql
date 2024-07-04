/*
  Warnings:

  - You are about to drop the `siteadmin` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `siteadmin` DROP FOREIGN KEY `SiteAdmin_adminId_fkey`;

-- DropForeignKey
ALTER TABLE `siteadmin` DROP FOREIGN KEY `SiteAdmin_siteId_fkey`;

-- DropTable
DROP TABLE `siteadmin`;

-- CreateTable
CREATE TABLE `_AdminToSite` (
    `A` INTEGER NOT NULL,
    `B` INTEGER NOT NULL,

    UNIQUE INDEX `_AdminToSite_AB_unique`(`A`, `B`),
    INDEX `_AdminToSite_B_index`(`B`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `_AdminToSite` ADD CONSTRAINT `_AdminToSite_A_fkey` FOREIGN KEY (`A`) REFERENCES `Admin`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `_AdminToSite` ADD CONSTRAINT `_AdminToSite_B_fkey` FOREIGN KEY (`B`) REFERENCES `Site`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
