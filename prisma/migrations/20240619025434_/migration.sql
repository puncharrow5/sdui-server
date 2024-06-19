/*
  Warnings:

  - You are about to drop the column `contentStyleId` on the `component` table. All the data in the column will be lost.
  - You are about to drop the column `titleStyleId` on the `component` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[componentId]` on the table `ContentStyle` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[componentId]` on the table `TitleStyle` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `componentId` to the `ContentStyle` table without a default value. This is not possible if the table is not empty.
  - Added the required column `componentId` to the `TitleStyle` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `Component_contentStyleId_fkey`;

-- DropForeignKey
ALTER TABLE `component` DROP FOREIGN KEY `Component_titleStyleId_fkey`;

-- AlterTable
ALTER TABLE `component` DROP COLUMN `contentStyleId`,
    DROP COLUMN `titleStyleId`,
    MODIFY `title` VARCHAR(191) NULL,
    MODIFY `content` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `contentstyle` ADD COLUMN `componentId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `titlestyle` ADD COLUMN `componentId` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `ContentStyle_componentId_key` ON `ContentStyle`(`componentId`);

-- CreateIndex
CREATE UNIQUE INDEX `TitleStyle_componentId_key` ON `TitleStyle`(`componentId`);

-- AddForeignKey
ALTER TABLE `TitleStyle` ADD CONSTRAINT `TitleStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContentStyle` ADD CONSTRAINT `ContentStyle_componentId_fkey` FOREIGN KEY (`componentId`) REFERENCES `Component`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
