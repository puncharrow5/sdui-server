/*
  Warnings:

  - You are about to drop the column `background` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `backgroundType` on the `component` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `component` DROP COLUMN `background`,
    DROP COLUMN `backgroundType`;

-- CreateTable
CREATE TABLE `ComponentStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `height` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `gap` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NULL,
    `componentId` INTEGER NOT NULL,

    UNIQUE INDEX `ComponentStyle_componentId_key`(`componentId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ComponentStyle` ADD CONSTRAINT `ComponentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
