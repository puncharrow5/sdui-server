/*
  Warnings:

  - You are about to drop the `children` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `children` DROP FOREIGN KEY `Children_componentId_fkey`;

-- DropTable
DROP TABLE `children`;

-- CreateTable
CREATE TABLE `Child` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `image` VARCHAR(191) NULL,
    `width` VARCHAR(191) NULL,
    `height` VARCHAR(191) NULL,
    `margin` VARCHAR(191) NULL,
    `isDelete` BOOLEAN NOT NULL DEFAULT false,
    `componentId` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Child` ADD CONSTRAINT `Child_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
