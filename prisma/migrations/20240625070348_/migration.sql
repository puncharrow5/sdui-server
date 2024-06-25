-- CreateTable
CREATE TABLE `Children` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `image` VARCHAR(191) NULL,
    `width` VARCHAR(191) NULL,
    `heigth` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `componentId` INTEGER NULL,

    UNIQUE INDEX `Children_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Children` ADD CONSTRAINT `Children_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
