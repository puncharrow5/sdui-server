/*
  Warnings:

  - Made the column `componentId` on table `children` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `children` DROP FOREIGN KEY `Children_componentId_fkey`;

-- AlterTable
ALTER TABLE `children` MODIFY `componentId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Children` ADD CONSTRAINT `Children_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
