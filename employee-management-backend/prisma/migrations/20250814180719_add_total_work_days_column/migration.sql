/*
  Warnings:

  - Added the required column `totalWorkDays` to the `Leave` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `leave` ADD COLUMN `totalWorkDays` INTEGER NOT NULL;
