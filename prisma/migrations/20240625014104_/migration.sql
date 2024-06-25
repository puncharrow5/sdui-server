-- CreateTable
CREATE TABLE `Footer` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `footerType` INTEGER NOT NULL,
    `logo` VARCHAR(191) NULL,
    `contentTop` VARCHAR(191) NULL,
    `phoneNumber` VARCHAR(191) NULL,
    `terms` VARCHAR(191) NULL,
    `contentBottom` VARCHAR(191) NULL,
    `backgroundColor` VARCHAR(191) NULL,
    `paddingTop` VARCHAR(191) NULL,
    `paddingBottom` VARCHAR(191) NULL,
    `textSize` INTEGER NULL,
    `textColor` VARCHAR(191) NULL,
    `lineHeight` INTEGER NULL,
    `siteId` INTEGER NULL,

    UNIQUE INDEX `Footer_siteId_key`(`siteId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Footer` ADD CONSTRAINT `Footer_siteId_fkey` FOREIGN KEY (`siteId`) REFERENCES `Site`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
