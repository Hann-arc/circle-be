/*
  Warnings:

  - You are about to drop the column `parentId` on the `Thread` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Thread" DROP CONSTRAINT "Thread_parentId_fkey";

-- AlterTable
ALTER TABLE "Thread" DROP COLUMN "parentId";
