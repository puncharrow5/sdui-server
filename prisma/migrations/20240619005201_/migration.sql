/*
  Warnings:

  - The values [Popup,Section,Inquiry,Footer] on the enum `Component_componentType` will be removed. If these variants are still used in the database, this will fail.
  - The values [Color,Image] on the enum `Component_backgroundType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `component` MODIFY `componentType` ENUM('POPUP', 'SECTION', 'INQUIRY', 'FOOTER') NOT NULL,
    MODIFY `backgroundType` ENUM('COLOR', 'IMAGE') NULL;
