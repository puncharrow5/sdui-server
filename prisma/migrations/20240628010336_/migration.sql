/*
  Warnings:

  - You are about to drop the column `height` on the `child` table. All the data in the column will be lost.
  - You are about to drop the column `image` on the `child` table. All the data in the column will be lost.
  - You are about to drop the column `margin` on the `child` table. All the data in the column will be lost.
  - You are about to drop the column `width` on the `child` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `child` DROP COLUMN `height`,
    DROP COLUMN `image`,
    DROP COLUMN `margin`,
    DROP COLUMN `width`,
    ADD COLUMN `content` VARCHAR(191) NULL;

-- CreateTable
CREATE TABLE `ChildStyle` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `width` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `padding` VARCHAR(191) NULL,
    `background` VARCHAR(191) NULL,
    `backgroundType` ENUM('COLOR', 'IMAGE') NULL,
    `textSize` INTEGER NULL,
    `textColor` VARCHAR(191) NULL,
    `lineHeight` INTEGER NULL,
    `childId` INTEGER NOT NULL,

    UNIQUE INDEX `ChildStyle_childId_key`(`childId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ChildStyle` ADD CONSTRAINT `ChildStyle_childId_fkey` FOREIGN KEY (`childId`) REFERENCES `Child`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
