/*
  Warnings:

  - You are about to drop the column `spriteUrl` on the `Person` table. All the data in the column will be lost.
  - You are about to drop the column `votedAgainstId` on the `Vote` table. All the data in the column will be lost.
  - You are about to drop the column `votedForId` on the `Vote` table. All the data in the column will be lost.
  - Added the required column `image` to the `Person` table without a default value. This is not possible if the table is not empty.
  - Added the required column `againstId` to the `Vote` table without a default value. This is not possible if the table is not empty.
  - Added the required column `votedId` to the `Vote` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `Vote_votedAgainstId_idx` ON `Vote`;

-- DropIndex
DROP INDEX `Vote_votedForId_idx` ON `Vote`;

-- AlterTable
ALTER TABLE `Person` DROP COLUMN `spriteUrl`,
    ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Vote` DROP COLUMN `votedAgainstId`,
    DROP COLUMN `votedForId`,
    ADD COLUMN `againstId` INTEGER NOT NULL,
    ADD COLUMN `votedId` INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX `Vote_votedId_idx` ON `Vote`(`votedId`);

-- CreateIndex
CREATE INDEX `Vote_againstId_idx` ON `Vote`(`againstId`);
