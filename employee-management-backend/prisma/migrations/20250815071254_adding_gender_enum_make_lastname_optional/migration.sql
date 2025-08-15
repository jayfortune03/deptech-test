/*
  Warnings:

  - You are about to alter the column `gender` on the `employee` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `employee` MODIFY `lastName` VARCHAR(191) NULL,
    MODIFY `gender` ENUM('Male', 'Female') NOT NULL;
