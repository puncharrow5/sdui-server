-- CreateTable
CREATE TABLE `MobileChild` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `childType` ENUM('BOX', 'IMAGE') NOT NULL,
    `title` VARCHAR(191) NULL,
    `content` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `componentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `MobileChildStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NULL,
    `border` VARCHAR(191) NULL,
    `borderRadius` VARCHAR(191) NULL,
    `mobileChildId` INTEGER NOT NULL,

    UNIQUE INDEX `MobileChildStyle_mobileChildId_key`(`mobileChildId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `MobileChild` ADD CONSTRAINT `MobileChild_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `MobileChildStyle` ADD CONSTRAINT `MobileChildStyle_mobileChildId_fkey` FOREIGN KEY (`mobileChildId`) REFERENCES `MobileChild`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
