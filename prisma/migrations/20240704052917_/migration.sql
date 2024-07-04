-- DropForeignKey
ALTER TABLE `admin` DROP FOREIGN KEY `Admin_roleId_fkey`;

-- AlterTable
ALTER TABLE `admin` MODIFY `roleId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `Admin` ADD CONSTRAINT `Admin_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
