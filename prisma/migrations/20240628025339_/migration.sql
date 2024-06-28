/*
  Warnings:

  - Added the required column `childType` to the `Child` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `child` ADD COLUMN `childType` ENUM('BOX', 'IMAGE') NOT NULL;
