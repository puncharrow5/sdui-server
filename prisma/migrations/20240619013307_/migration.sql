/*
  Warnings:

  - You are about to drop the column `contentStyle` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `titleStyle` on the `component` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `contentStyle`,
    DROP COLUMN `titleStyle`;

-- AlterTable
ALTER TABLE `header` ADD COLUMN `textSize` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `TitleStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `textSize` INTEGER NULL,
    `textColor` VARCHAR(191) NULL,
    `marginTop` INTEGER NULL,
    `marginBottom` INTEGER NULL,
    `marginRight` INTEGER NULL,
    `marginLeft` INTEGER NULL,
    `componentId` INTEGER NULL,

    UNIQUE INDEX `TitleStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContentStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `textSize` INTEGER NULL,
    `textColor` VARCHAR(191) NULL,
    `marginTop` INTEGER NULL,
    `marginBottom` INTEGER NULL,
    `marginRight` INTEGER NULL,
    `marginLeft` INTEGER NULL,
    `componentId` INTEGER NULL,

    UNIQUE INDEX `ContentStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `TitleStyle` ADD CONSTRAINT `TitleStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentStyle` ADD CONSTRAINT `ContentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
