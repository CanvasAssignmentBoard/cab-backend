/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Tasks` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Tasks` table. All the data in the column will be lost.
  - Added the required column `dueAt` to the `Tasks` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignmentID" TEXT NOT NULL,
    "dueAt" TEXT NOT NULL
);
INSERT INTO "new_Tasks" ("assignmentID", "id", "name", "status") SELECT "assignmentID", "id", "name", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
