/*
  Warnings:

  - Added the required column `projectId` to the `Milestone` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Milestone" ADD COLUMN     "projectId" TEXT NOT NULL;
ALTER TABLE "Project" ADD COLUMN     "sprint" INTEGER NOT NULL;


-- AddForeignKey
ALTER TABLE "Milestone" ADD CONSTRAINT "Milestone_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
