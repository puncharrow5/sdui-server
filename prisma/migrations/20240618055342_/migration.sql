/*
  Warnings:

  - The values [Header] on the enum `Component_componentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `component` ADD COLUMN `contentStyle` VARCHAR(191) NULL,
    ADD COLUMN `titleStyle` VARCHAR(191) NULL,
    MODIFY `componentType` ENUM('Popup', 'Section', 'Footer') NOT NULL;

-- AlterTable
ALTER TABLE `site` ADD COLUMN `headerColor` VARCHAR(191) NULL,
    ADD COLUMN `headerLogo` VARCHAR(191) NULL;
