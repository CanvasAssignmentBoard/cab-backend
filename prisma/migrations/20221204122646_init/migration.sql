/*
  Warnings:

  - Added the required column `description` to the `Board` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdAt` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Tasks` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `Assignment` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Board" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "owner" TEXT NOT NULL
);
INSERT INTO "new_Board" ("id", "name", "owner") SELECT "id", "name", "owner" FROM "Board";
DROP TABLE "Board";
ALTER TABLE "new_Board" RENAME TO "Board";
CREATE TABLE "new_Tasks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "assignmentID" TEXT NOT NULL,
    "createdAt" TEXT NOT NULL,
    "updatedAt" TEXT NOT NULL
);
INSERT INTO "new_Tasks" ("assignmentID", "id", "name", "status") SELECT "assignmentID", "id", "name", "status" FROM "Tasks";
DROP TABLE "Tasks";
ALTER TABLE "new_Tasks" RENAME TO "Tasks";
CREATE TABLE "new_Assignment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "canvasId" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "boardId" TEXT NOT NULL
);
INSERT INTO "new_Assignment" ("boardId", "canvasId", "id") SELECT "boardId", "canvasId", "id" FROM "Assignment";
DROP TABLE "Assignment";
ALTER TABLE "new_Assignment" RENAME TO "Assignment";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
