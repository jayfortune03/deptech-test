/*
  Warnings:

  - You are about to alter the column `gender` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `admin` MODIFY `gender` ENUM('Male', 'Female') NOT NULL;
