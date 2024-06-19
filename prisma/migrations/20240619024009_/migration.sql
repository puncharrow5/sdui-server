/*
  Warnings:

  - You are about to drop the column `componentId` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `componentId` on the `titlestyle` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[titleStyleId]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[contentStyleId]` on the table `Component` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `contentStyleId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleStyleId` to the `Component` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `component` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `component` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `contentstyle` DROP FOREIGN KEY `ContentStyle_componentId_fkey`;

-- DropForeignKey
ALTER TABLE `titlestyle` DROP FOREIGN KEY `TitleStyle_componentId_fkey`;

-- AlterTable
ALTER TABLE `component` ADD COLUMN `contentStyleId` INTEGER NOT NULL,
    ADD COLUMN `titleStyleId` INTEGER NOT NULL,
    MODIFY `title` VARCHAR(191) NOT NULL,
    MODIFY `content` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `contentstyle` DROP COLUMN `componentId`;

-- AlterTable
ALTER TABLE `titlestyle` DROP COLUMN `componentId`;

-- CreateIndex
CREATE UNIQUE INDEX `Component_titleStyleId_key` ON `Component`(`titleStyleId`);

-- CreateIndex
CREATE UNIQUE INDEX `Component_contentStyleId_key` ON `Component`(`contentStyleId`);

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_titleStyleId_fkey` FOREIGN KEY (`titleStyleId`) REFERENCES `TitleStyle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Component` ADD CONSTRAINT `Component_contentStyleId_fkey` FOREIGN KEY (`contentStyleId`) REFERENCES `ContentStyle`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
