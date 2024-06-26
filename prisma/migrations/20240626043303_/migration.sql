/*
  Warnings:

  - You are about to drop the column `marginBottom` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginLeft` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginRight` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginTop` on the `contentstyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginBottom` on the `titlestyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginLeft` on the `titlestyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginRight` on the `titlestyle` table. All the data in the column will be lost.
  - You are about to drop the column `marginTop` on the `titlestyle` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `contentstyle` DROP COLUMN `marginBottom`,
    DROP COLUMN `marginLeft`,
    DROP COLUMN `marginRight`,
    DROP COLUMN `marginTop`,
    ADD COLUMN `lineHeight` INTEGER NULL,
    ADD COLUMN `margin` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `titlestyle` DROP COLUMN `marginBottom`,
    DROP COLUMN `marginLeft`,
    DROP COLUMN `marginRight`,
    DROP COLUMN `marginTop`,
    ADD COLUMN `lineHeight` INTEGER NULL,
    ADD COLUMN `margin` VARCHAR(191) NULL;
