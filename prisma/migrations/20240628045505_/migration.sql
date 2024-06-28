-- CreateTable
CREATE TABLE `MobileHeader` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `logo` VARCHAR(191) NULL,
    `logoSize` VARCHAR(191) NULL,
    `height` INTEGER NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `textSize` INTEGER NULL,
    `textColor` VARCHAR(191) NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `MobileHeader_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MobileHeader` ADD CONSTRAINT `MobileHeader_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
