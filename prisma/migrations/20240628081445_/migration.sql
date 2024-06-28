-- CreateTable
CREATE TABLE `ComponentMobileStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `gap` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `ComponentMobileStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ComponentMobileStyle` ADD CONSTRAINT `ComponentMobileStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
