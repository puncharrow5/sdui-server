/*
  Warnings:

  - The values [FOOTER] on the enum `Component_componentType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `component` MODIFY `componentType` ENUM('POPUP', 'SECTION', 'INQUIRY') NOT NULL;
