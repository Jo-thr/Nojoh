/*
  Warnings:

  - Added the required column `color` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "color" TEXT NOT NULL;
