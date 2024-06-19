/*
  Warnings:

  - Made the column `componentId` on table `contentstyle` required. This step will fail if there are existing NULL values in that column.
  - Made the column `componentId` on table `titlestyle` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `contentstyle` DROP FOREIGN KEY `ContentStyle_componentId_fkey`;

-- DropForeignKey
ALTER TABLE `titlestyle` DROP FOREIGN KEY `TitleStyle_componentId_fkey`;

-- AlterTable
ALTER TABLE `contentstyle` MODIFY `componentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `titlestyle` MODIFY `componentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `TitleStyle` ADD CONSTRAINT `TitleStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentStyle` ADD CONSTRAINT `ContentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
